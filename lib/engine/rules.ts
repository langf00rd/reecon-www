import { ReconRuleOperator } from "../enums";
import { CanoniCalReconRule, ReconRule } from "../types";

const EXACT_RULE: ReconRule = {
  name: "exact_reference_amount_currency",
  description: "Exact match on reference, amount, and currency",
  formula: "reference = amount = currency",
  buildKey: (tx) =>
    tx.reference ? `${tx.reference}|${tx.amount}|${tx.currency}` : null,
  match: (a, b) =>
    a.reference === b.reference &&
    a.amount === b.amount &&
    a.currency === b.currency,
};

const AMOUNT_DATE_RULE: ReconRule = {
  name: "amount_currency_date_window",
  description: "Match on amount, currency, and date within a window",
  formula: "amount = currency",
  buildKey: (tx) => `${tx.amount}|${tx.currency}`,
  match: (a, b) => {
    if (a.amount !== b.amount) return false;
    if (a.currency !== b.currency) return false;
    const d1 = new Date(a.created_dt).getTime();
    const d2 = new Date(b.created_dt).getTime();
    return Math.abs(d1 - d2) <= 86400000; // 1 day
  },
};

const TOLERANT_AMOUNT_RULE: ReconRule = {
  name: "amount_tolerance_currency",
  description: "Match on amount and currency within a tolerance",
  formula: "amount = currency + tolerance",
  buildKey: (tx) => `${tx.currency}`,
  match: (a, b) =>
    a.currency === b.currency && Math.abs(a.amount - b.amount) <= 0.01,
};

export const RECON_RULES: ReconRule[] = [
  EXACT_RULE,
  AMOUNT_DATE_RULE,
  TOLERANT_AMOUNT_RULE,
];

export const DEFAULT_RECON_RULES: CanoniCalReconRule[] = [
  {
    id: "exact_reference_amount_currency",
    name: "Exact reference, amount, and currency",
    description: "Match on exact reference, amount, and currency",
    priority: 1,
    enabled: true,
    conditions: [
      {
        left: "reference",
        operator: ReconRuleOperator.EQUALS,
        right: "reference",
      },
      { left: "amount", operator: ReconRuleOperator.EQUALS, right: "amount" },
      {
        left: "currency",
        operator: ReconRuleOperator.EQUALS,
        right: "currency",
      },
    ],
  },
  {
    id: "amount_tolerance_currency",
    name: "Amount tolerance + currency",
    description: "Match on amount and currency within a tolerance",
    priority: 3,
    enabled: true,
    conditions: [
      {
        left: "currency",
        operator: ReconRuleOperator.EQUALS,
        right: "currency",
      },
      { left: "amount", operator: ReconRuleOperator.ABS_DIFF_LTE, value: 1.0 },
    ],
  },
];
