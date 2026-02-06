import { ReconResultStatus, TransactionType } from "./enums";

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
  internal: CanonicalTransaction;
  provider?: CanonicalTransaction;
  status: ReconResultStatus;
  rule?: ReconRule["name"];
}

export interface XlsxResult {
  [key: string]: Record<string, unknown>[];
}

export interface ReconRule {
  name: string;
  buildKey: (tx: CanonicalTransaction) => string | null;
  match: (a: CanonicalTransaction, b: CanonicalTransaction) => boolean;
}
