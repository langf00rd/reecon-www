"use client";

import ButtonPopover from "@/components/button-popover";
import { DataTable } from "@/components/data-table";
import NormalizationDialog from "@/components/dialogs/normalization";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyTitle } from "@/components/ui/empty";
import { useAppContext } from "@/hooks/use-app-context";
import { reconcile } from "@/lib/engine/reconcile";
import { TransactionType } from "@/lib/enums";
import { ROUTES } from "@/lib/routes";
import { CanonicalTransaction } from "@/lib/types";
import { buildColumns, readExcelFile } from "@/lib/utils";
import { RefreshCcw, SpellCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface FileContent {
  data: Record<string, unknown>[];
  fileName: string;
}

export default function Page() {
  const router = useRouter();
  const { setReconResult, reconRules } = useAppContext();
  const internalFilePickerRef = useRef<HTMLInputElement>(null);
  const providerFilePickerRef = useRef<HTMLInputElement>(null);
  const [filesContent, setFilesContent] = useState({
    internal: {} as FileContent,
    provider: {} as FileContent,
  });
  const [normalizedData, setNormalizedData] = useState({
    internal: [] as CanonicalTransaction[],
    provider: [] as CanonicalTransaction[],
  });
  const [isNormalizationDialogOpen, setIsNormalizationDialogOpen] = useState({
    internal: false,
    provider: false,
  });

  const allFilesSelected =
    !!filesContent.internal.fileName && !!filesContent.provider.fileName;

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

  function handleRunRecon() {
    try {
      if (
        normalizedData.internal.length === 0 ||
        normalizedData.provider.length === 0
      ) {
        toast.error(
          "Please upload and normalize both internal and provider files",
        );
        return;
      }
      const internalData = normalizedData.internal;
      const providerData = normalizedData.provider;
      const reconResult = reconcile(internalData, providerData, reconRules);
      setReconResult(reconResult);
      router.push(ROUTES.exceptions);
    } catch (err) {
      toast.error((err as Error).message);
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
                // show internal normalization dialog
                setIsNormalizationDialogOpen({
                  ...isNormalizationDialogOpen,
                  internal: true,
                });
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
                // show provider normalization dialog
                setIsNormalizationDialogOpen({
                  ...isNormalizationDialogOpen,
                  provider: true,
                });
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
                <Button className="bg-primary" onClick={handleRunRecon}>
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
                  <NormalizationDialog
                    open={isNormalizationDialogOpen[key]}
                    onOpenChange={(a) =>
                      setIsNormalizationDialogOpen({
                        ...isNormalizationDialogOpen,
                        [key]: a,
                      })
                    }
                    type={key.toUpperCase() as TransactionType}
                    keys={Object.keys(content.data[0])}
                    transactions={content.data}
                    onNormalizedData={(a) =>
                      setNormalizedData({
                        ...normalizedData,
                        [key]: a,
                      })
                    }
                  >
                    <Button
                      size="sm"
                      className="bg-white border shadow-xs"
                      variant="secondary"
                    >
                      <SpellCheck /> Normalize fields
                    </Button>
                  </NormalizationDialog>
                  {/*<Button size="icon-xs" variant="destructive-secondary">
                    <Trash2 />
                  </Button>*/}
                </div>
              </CardHeader>
              <CardContent className="border-t -mt-4 pt-5">
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
            <EmptyTitle>
              Upload both internal and provider files to start reconciliation
            </EmptyTitle>
          </EmptyContent>
        </Empty>
      )}
    </>
  );
}
