import { ReconResultStatus, ReconRuleOperator } from "../enums";
import {
  CanonicalReconRule,
  CanonicalTransaction,
  ReconResult,
  ReconRule,
} from "../types";
import { RECON_RULES } from "./rules";

export function reconcile(
  internalTxs: CanonicalTransaction[],
  providerTxs: CanonicalTransaction[],
  rules: ReconRule[] = RECON_RULES,
): ReconResult[] {
  const results: ReconResult[] = [];
  const consumedProviderIds = new Set<string>();

  // pre-build indexes per rule
  const ruleIndexes = rules.map((rule) => {
    const index = new Map<string, CanonicalTransaction[]>();
    for (const tx of providerTxs) {
      const key = rule.buildKey(tx);
      if (!key) continue;
      const bucket = index.get(key);
      if (bucket) bucket.push(tx);
      else index.set(key, [tx]);
    }
    return index;
  });

  console.log("ruleIndexes", ruleIndexes);

  // match internal txs
  for (const internalTx of internalTxs) {
    let matched = false;

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const index = ruleIndexes[i];

      const key = rule.buildKey(internalTx);
      if (!key) continue;

      const candidates = index.get(key);
      if (!candidates) continue;

      const available = candidates.filter(
        (tx) => !consumedProviderIds.has(tx.id),
      );

      if (available.length === 1) {
        const providerTx = available[0];
        consumedProviderIds.add(providerTx.id);
        results.push({
          internal: internalTx,
          provider: providerTx,
          status: ReconResultStatus.MATCHED,
          rule: rule.id,
        });
        matched = true;
        break;
      }

      if (available.length > 1) {
        results.push({
          internal: internalTx,
          status: ReconResultStatus.AMBIGUOUS,
          rule: rule.id,
        });
        matched = true;
        break;
      }
    }

    if (!matched) {
      results.push({
        internal: internalTx,
        status: ReconResultStatus.MISSING,
      });
    }
  }

  // remaining provider txs are unexpected
  for (const tx of providerTxs) {
    if (!consumedProviderIds.has(tx.id)) {
      results.push({
        internal: tx,
        status: ReconResultStatus.UNEXPECTED,
      });
    }
  }

  return results;
}

export function convertCanonicalReconRulesToReconRules(
  canonicalRules: CanonicalReconRule[],
): ReconRule[] {
  return canonicalRules.map((rule) => ({
    ...rule,
    buildKey: (tx: CanonicalTransaction): string | null => {
      // build a unique key based on the rule's conditions
      const keyParts: string[] = [];
      for (const condition of rule.conditions) {
        const leftValue = tx[condition.left];
        // skip if the required field is missing
        if (leftValue === undefined || leftValue === null) {
          return null;
        }
        keyParts.push(String(leftValue));
      }

      return keyParts.length > 0 ? keyParts.join("|") : null;
    },

    match: (a: CanonicalTransaction, b: CanonicalTransaction): boolean => {
      // Check if all conditions match between transactions a and b
      return rule.conditions.every((condition) => {
        const leftValueA = a[condition.left];

        // get the comparison value for transaction b
        let compareValue: any;
        if (condition.right !== undefined) {
          compareValue = b[condition.right];
        } else if (condition.value !== undefined) {
          compareValue = condition.value;
        } else {
          return false;
        }

        // apply the operator
        switch (condition.operator) {
          // case "==":
          case ReconRuleOperator.EQUALS:
            return leftValueA == compareValue;
          // case "===":
          // case "strictEquals":
          //   return leftValueA === compareValue;
          // case "!=":
          // case "notEquals":
          //   return leftValueA != compareValue;
          // case "!==":
          // case "strictNotEquals":
          //   return leftValueA !== compareValue;
          // case ">":
          // case "greaterThan":
          //   return Number(leftValueA) > Number(compareValue);
          // case ">=":
          // case "greaterThanOrEqual":
          //   return Number(leftValueA) >= Number(compareValue);
          // case "<":
          // case "lessThan":
          //   return Number(leftValueA) < Number(compareValue);
          // case "<=":
          // case "lessThanOrEqual":
          //   return Number(leftValueA) <= Number(compareValue);
          // case "contains":
          //   return String(leftValueA).includes(String(compareValue));
          // case "startsWith":
          //   return String(leftValueA).startsWith(String(compareValue));
          // case "endsWith":
          //   return String(leftValueA).endsWith(String(compareValue));
          default:
            return false;
        }
      });
    },
  }));
}
