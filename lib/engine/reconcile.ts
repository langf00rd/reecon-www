import { ReconResultStatus, ReconRuleOperator } from "../enums";
import {
  CanonicalTransaction,
  ReconResult,
  ReconRule,
  RuleCondition,
} from "../types";

/**
 * core reconciliation engine
 */
export function reconcile(
  internalTxs: CanonicalTransaction[],
  providerTxs: CanonicalTransaction[],
  rules: ReconRule[],
): ReconResult[] {
  const results: ReconResult[] = [];

  const consumedInternal = new Set<string>();
  const consumedProvider = new Set<string>();

  // sort active/enables rules by priority (lower = stricter)
  const activeRules = rules
    .filter((r) => r.enabled)
    .sort((a, b) => a.priority - b.priority);

  // build provider indexes per rule
  const providerIndexes = new Map<
    string,
    Map<string, CanonicalTransaction[]>
  >();

  for (const rule of activeRules) {
    providerIndexes.set(rule.id, indexProviders(providerTxs, rule));
  }

  // phase 1: reconcile internals
  for (const internal of internalTxs) {
    if (consumedInternal.has(internal.id)) continue;

    let resolved: { rule: ReconRule; provider: CanonicalTransaction } | null =
      null;

    let ambiguity: {
      rule: ReconRule;
      providers: CanonicalTransaction[];
    } | null = null;

    for (const rule of activeRules) {
      const index = providerIndexes.get(rule.id)!;
      const key = buildKeyFromRule(rule, internal);

      const candidates =
        key && index.has(key)
          ? index.get(key)!
          : providerTxs.filter(
              (p) =>
                !consumedProvider.has(p.id) && ruleMatches(rule, internal, p),
            );

      const viable = candidates.filter((p) => !consumedProvider.has(p.id));

      if (viable.length === 1) {
        resolved = { rule, provider: viable[0] };
        break;
      }

      // track ambiguity but continue — stricter rules may resolve
      if (viable.length > 1 && !ambiguity) {
        ambiguity = { rule, providers: viable };
      }
    }

    if (resolved) {
      consumedInternal.add(internal.id);
      consumedProvider.add(resolved.provider.id);

      results.push({
        internal,
        provider: resolved.provider,
        status: ReconResultStatus.MATCHED,
        rule: resolved.rule.id,
      });
      continue;
    }

    if (ambiguity) {
      consumedInternal.add(internal.id);

      results.push({
        internal,
        status: ReconResultStatus.AMBIGUOUS,
        rule: ambiguity.rule.id,
        candidates: ambiguity.providers.map((p) => p.id),
      });
      continue;
    }

    // no matches at all
    consumedInternal.add(internal.id);
    results.push({
      internal,
      status: ReconResultStatus.MISSING,
    });
  }

  // phase 2: unexpected providers
  for (const provider of providerTxs) {
    if (!consumedProvider.has(provider.id)) {
      results.push({
        provider,
        status: ReconResultStatus.UNEXPECTED,
      });
    }
  }

  return results;
}

/**
 * build deterministic index key from rule conditions
 *
 * only safe EQUALS conditions participate
 */
function buildKeyFromRule(
  rule: ReconRule,
  tx: CanonicalTransaction,
): string | null {
  const parts: string[] = [];
  for (const c of rule.conditions) {
    if (c.operator !== ReconRuleOperator.EQUALS) return null;
    if (!c.right) return null;
    const value = tx[c.left];
    if (value === undefined || value === null) return null;
    parts.push(`${c.left}:${String(value)}`);
  }
  return parts.length ? parts.join("|") : null;
}

/**
 * tndex provider transactions based on rule conditions for fast lookup
 */
function indexProviders(
  providerTxs: CanonicalTransaction[],
  rule: ReconRule,
): Map<string, CanonicalTransaction[]> {
  const index = new Map<string, CanonicalTransaction[]>();
  for (const tx of providerTxs) {
    const key = buildKeyFromRule(rule, tx);
    if (!key) continue;
    const bucket = index.get(key) || [];
    bucket.push(tx);
    index.set(key, bucket);
  }
  return index;
}

/**
 * rule evaluation (single source of truth)
 */
function ruleMatches(
  rule: ReconRule,
  internal: CanonicalTransaction,
  provider: CanonicalTransaction,
): boolean {
  return rule.conditions.every((c) => evaluateCondition(c, internal, provider));
}

/**
 * condition evaluation
 */
function evaluateCondition(
  condition: RuleCondition,
  internal: CanonicalTransaction,
  provider: CanonicalTransaction,
): boolean {
  const left = internal[condition.left];
  if (left === undefined || left === null) return false;

  const right =
    condition.right !== undefined ? provider[condition.right] : condition.value;

  if (right === undefined || right === null) return false;

  switch (condition.operator) {
    case ReconRuleOperator.EQUALS:
      return String(left) === String(right);

    case ReconRuleOperator.ABS_DIFF_LTE:
      return Math.abs(Number(left) - Number(right)) <= Number(condition.value);

    case ReconRuleOperator.DATE_WITHIN_DAYS: {
      const diffMs = Math.abs(
        new Date(String(left)).getTime() - new Date(String(right)).getTime(),
      );
      return diffMs <= Number(condition.value) * 86400000;
    }

    default:
      return false;
  }
}
