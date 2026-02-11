import { ColumnDef } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import { XlsxResult } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * get xlsx file content
 */
export function readExcelFile(file: File): Promise<XlsxResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result || !(result instanceof ArrayBuffer)) {
        reject(new Error("Failed to read file"));
        return;
      }
      const data = new Uint8Array(result);
      const workbook = XLSX.read(data, { type: "array" });
      const xlsxResult = {} as XlsxResult;
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        xlsxResult[sheetName] = XLSX.utils.sheet_to_json(sheet, {
          defval: null,
        });
      }
      resolve(xlsxResult);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * dynamically builds data table columns based on the data provided
 */
export function buildColumns(data: Record<string, unknown>[]) {
  const columns: ColumnDef<Record<string, unknown>, unknown>[] = [];
  const indexObject = data[0];
  if (!indexObject) return columns;
  const keys = Object.keys(indexObject);
  Array.from(keys).forEach((key) => {
    if (key.toLowerCase() === "raw") return;
    columns.push({
      accessorKey: key,
      header: key.replaceAll("_", " ").toLowerCase(),
      cell: ({ row }) => {
        return row.getValue(key) || "--";
      },
    });
  });

  return columns;
}
