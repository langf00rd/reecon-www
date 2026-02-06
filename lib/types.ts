import { ReconResultStatus, StatementType } from "./enums";

export interface Statement {
  id: string;
  created_dt: string;
  updated_dt: string;
  processed_dt: string;
  statement_dt: string;
  balance: string;
  currency: string;
  upload_by: string;
  type: StatementType;
}

export interface ReconResult {
  id: string;
  created_dt: string;
  updated_dt: string;
  notes: string;
  status: ReconResultStatus;
}

export interface XlsxResult {
  [key: string]: Record<string, unknown>[];
}
