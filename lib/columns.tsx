import { ColumnDef } from "@tanstack/react-table";
import { CanonicalTransaction } from "./types";

export const CANONICAL_COLUMNS: ColumnDef<CanonicalTransaction>[] = [
  {
    id: "id",
    header: "ID",
  },
  {
    id: "created_dt",
    header: "Date",
  },
  {
    id: "amount",
    header: "Amount",
  },
  {
    id: "reference",
    header: "Reference",
  },
];
