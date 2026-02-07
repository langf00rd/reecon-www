import { LucideIcon } from "lucide-react";
import { ReconResultStatus, ReconRuleOperator, TransactionType } from "./enums";

export interface CanonicalTransaction {
  id: string;
  created_dt: string;
  updated_dt?: string;
  processed_dt?: string;
  amount: number;
  currency?: string;
  upload_by?: string; // user id
  source_type?: TransactionType;
  source_name?: string; // MTN, Bank X, ...
  reference: string;
  raw?: Record<string, unknown>;
}

export interface ReconResult {
  internal?: CanonicalTransaction;
  provider?: CanonicalTransaction;
  status: ReconResultStatus;
  rule?: ReconRule["name"];
  candidates?: string[];
}

export interface XlsxResult {
  [key: string]: Record<string, unknown>[];
}

// export interface ReconRule extends Partial<CanonicalReconRule> {
//   formula?: string;
//   buildKey: (tx: CanonicalTransaction) => string | null;
//   match: (a: CanonicalTransaction, b: CanonicalTransaction) => boolean;
// }

export interface ReconRule {
  id: string;
  name: string;
  description?: string;
  priority: number; // lower = stricter
  enabled: boolean;
  conditions: RuleCondition[];
}

export interface RuleCondition {
  left: keyof CanonicalTransaction;
  operator: ReconRuleOperator;
  right?: keyof CanonicalTransaction;
  value?: string | number;
}

// export interface CanonicalReconRule {
//   id: string;
//   name: string;
//   description?: string;
//   priority: number;
//   enabled: boolean;
//   conditions: CanonicalReconRuleCondition[];
// }

export interface CanonicalReconRuleCondition {
  left: keyof CanonicalTransaction;
  operator: ReconRuleOperator;
  right?: keyof CanonicalTransaction;
  value?: string | number;
}

export interface AppSidebarMenu {
  main: AppSidebarMenuItem[];
  secondary: AppSidebarMenuItem[];
}

export interface AppSidebarMenuItem {
  label: string;
  url: string;
  icon: LucideIcon;
  enabled: boolean;
  children?: AppSidebarMenuItem[];
}
