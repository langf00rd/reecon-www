import {
  CopyCheck,
  FileQuestionMark,
  FileSearchCorner,
  FileUp,
  FileXCorner,
  LayoutList,
  SearchCheck,
  UserCheck,
  Zap,
} from "lucide-react";
import { RECON_STATUS_DEFS } from ".";
import { ReconResultStatus } from "../enums";

export const RECON_HELP = [
  {
    title: "Upload transaction data",
    description: "Attach your internal ledger and provider transaction files",
    icon: FileUp,
  },
  {
    title: "Review & validate data",
    description:
      "Preview records, detect missing fields, and confirm data integrity",
    icon: SearchCheck,
  },
  {
    title: "Normalize data fields",
    description: "Map different schemas into a canonical transaction structure",
    icon: LayoutList,
  },
  {
    title: "Run reconciliation",
    description:
      "Apply predefined matching rules to compare internal and external records",
    icon: Zap,
  },
  {
    title: "Review results",
    description:
      "Analyze matched transactions, unmatched records, and exceptions",
    icon: UserCheck,
  },
];

export const EXCEPTIONS_HELP = [
  {
    title: `${ReconResultStatus.MATCHED.toLowerCase()} records`,
    description: RECON_STATUS_DEFS.MATCHED,
    icon: CopyCheck,
  },
  {
    title: `${ReconResultStatus.MISSING.toLowerCase()} records`,
    description: RECON_STATUS_DEFS.MISSING,
    icon: FileXCorner,
  },
  {
    title: `${ReconResultStatus.UNEXPECTED.toLowerCase()} records`,
    description: RECON_STATUS_DEFS.UNEXPECTED,
    icon: FileQuestionMark,
  },
  {
    title: `${ReconResultStatus.AMBIGUOUS.toLowerCase()} records`,
    description: RECON_STATUS_DEFS.AMBIGUOUS,
    icon: FileSearchCorner,
  },
];
