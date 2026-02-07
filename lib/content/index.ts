import { ReconResultStatus } from "../enums";

export const RECON_STATUS_DEFS = {
  [ReconResultStatus.MATCHED]:
    "Transactions that have been successfully matched 1:1 between internal and provider records using reconciliation rules",
  [ReconResultStatus.AMBIGUOUS]:
    "Transactions where multiple provider records match the same internal transaction, making it unclear which is the correct match",
  [ReconResultStatus.MISSING]:
    "Internal transactions that have no corresponding provider record - potentially failed or pending transactions",
  [ReconResultStatus.UNEXPECTED]:
    "Provider transactions that exist but have no corresponding internal record - possibly direct integrations or system bypass",
};
