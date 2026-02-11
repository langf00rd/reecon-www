export enum HelpSidebarKeys {
  RECON = "recon",
}

export enum ReconResultStatus {
  MATCHED = "MATCHED",
  MULTIPLE_MATCHES = "MULTIPLE_MATCHES", // AMBIGIOUS
  MISSING_FROM_PROVIDER = "MISSING_FROM_PROVIDER", // MISSING
  EXTRA_IN_PROVIDER = "EXTRA_IN_PROVIDER", // UNEXPECTED
}

export enum TransactionType {
  INTERNAL = "INTERNAL",
  PROVIDER = "PROVIDER",
}

export enum ReconRuleOperator {
  EQUALS = "EQUALS",
  ABS_DIFF_LTE = "ABS_DIFF_LTE",
  DATE_WITHIN_DAYS = "DATE_WITHIN_DAYS",
}
