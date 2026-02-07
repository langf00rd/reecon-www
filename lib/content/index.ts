import { ReconResultStatus } from "../enums";

export const RECON_STATUS_DEFS = {
  [ReconResultStatus.MATCHED]:
    "Internal and provider transactions that matched 1:1 based on reconciliation rules",
  [ReconResultStatus.AMBIGUOUS]:
    "Internal transactions with multiple potential provider matches - manual review required",
  [ReconResultStatus.MISSING]:
    "Internal transactions with no matching provider record - may indicate failed or pending transactions",
  [ReconResultStatus.UNEXPECTED]:
    "Provider transactions with no matching internal record - may indicate direct integrations or bypassed systems",
};
