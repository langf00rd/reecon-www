"use client";

import ButtonPopover from "@/components/button-popover";
import { DataTable } from "@/components/data-table";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyTitle } from "@/components/ui/empty";
import { buildColumns, readExcelFile } from "@/lib/utils";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface FileContent {
  data: Record<string, unknown>[];
  fileName: string;
}

export default function Page() {
  const internalFilePickerRef = useRef<HTMLInputElement>(null);
  const providerFilePickerRef = useRef<HTMLInputElement>(null);
  const [filesContent, setFilesContent] = useState({
    internal: {} as FileContent,
    provider: {} as FileContent,
  });

  const allFilesSelected =
    filesContent.internal.fileName && filesContent.provider.fileName;

  async function handleUploadFile(type: "internal" | "provider") {
    try {
      const filePickerRef =
        type === "internal" ? internalFilePickerRef : providerFilePickerRef;
      filePickerRef.current?.click();
      const file = filePickerRef.current?.files?.[0];
      if (!file) return;
      const workbook = await readExcelFile(file);
      const objectIndexKey = Object.keys(workbook)[0];
      const workbookData = workbook[objectIndexKey];
      setFilesContent({
        ...filesContent,
        [type]: {
          data: workbookData,
          fileName: file.name,
        },
      });
    } catch (err) {
      toast.error(
        `An error occurred while uploading the file. ${(err as Error).message}`,
      );
    }
  }

  return (
    <>
      <Header
        title="Reconciliation"
        slotRight={
          <>
            <input
              type="file"
              name="internal"
              hidden
              accept=".xlsx,.xls,.xlsm,.csv,.ods"
              ref={internalFilePickerRef}
              onChange={() => {
                handleUploadFile("internal");
              }}
            />
            <input
              type="file"
              name="provider"
              accept=".xlsx,.xls,.xlsm,.csv,.ods"
              hidden
              ref={providerFilePickerRef}
              onChange={() => {
                handleUploadFile("provider");
              }}
            />
            <div className="space-x-4">
              <ButtonPopover
                label="Upload files"
                items={[
                  {
                    label: "Internal ledger",
                    onClick: () => {
                      internalFilePickerRef.current?.click();
                    },
                  },
                  {
                    label: "Provider transactions",
                    onClick: () => {
                      providerFilePickerRef.current?.click();
                    },
                  },
                ]}
              />
              {allFilesSelected && (
                <Button className="bg-primary">
                  Run Reconciliation
                  <RefreshCcw />
                </Button>
              )}
            </div>
          </>
        }
      />

      <div className="space-y-10">
        {Object.entries(filesContent).map(([key, content]) => {
          if (!content.fileName) return;
          return (
            <Card key={key} className="pt-0">
              <CardHeader className="h-14 rounded-t-xl flex bg-background items-center justify-between">
                <CardTitle className="capitalize p-0">{key} Ledger</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-white text-foreground border border-black/20 shadow-xs">
                    {content.fileName}
                  </Badge>
                  <Button size="icon-xs" variant="destructive-secondary">
                    <Trash2 />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="border-t -mt-6 pt-5">
                <DataTable
                  data={content.data}
                  columns={buildColumns(content.data)}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!allFilesSelected && (
        <Empty>
          <EmptyContent>
            <EmptyTitle>Upload files to start reconciliation</EmptyTitle>
          </EmptyContent>
        </Empty>
      )}
    </>
  );
}
