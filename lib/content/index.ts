import { ReconResultStatus } from "../enums";

export const RECON_STATUS_DEFS = {
  [ReconResultStatus.MATCHED]:
    "Internal and provider transactions that matched 1:1 based on reconciliation rules",
  [ReconResultStatus.MULTIPLE_MATCHES]:
    "Internal transactions with multiple potential provider matches - manual review required",
  [ReconResultStatus.MISSING_FROM_PROVIDER]:
    "Internal transactions with no matching provider record - may indicate failed or pending transactions",
  [ReconResultStatus.EXTRA_IN_PROVIDER]:
    "Provider transactions with no matching internal record - may indicate direct integrations or bypassed systems",
};

export const APP_NAME = "reecon";
