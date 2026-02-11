"use client";

import ButtonPopover from "@/components/button-popover";
import { DataTable } from "@/components/data-table";
import Header from "@/components/header";
import HelpMessage from "@/components/help-message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppContext } from "@/hooks/use-app-context";
import { RECON_STATUS_DEFS } from "@/lib/content";
import { ReconResultStatus } from "@/lib/enums";
import { buildColumns } from "@/lib/utils";
import { Upload } from "lucide-react";

export default function Home() {
  const { groupedReconResults } = useAppContext();

  function getPercentage(status: ReconResultStatus): number {
    if (!groupedReconResults) return 0;
    const count = groupedReconResults[status]?.length ?? 0;
    const total = Object.values(groupedReconResults).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  }

  return (
    <div className="space-y-6">
      <Header
        title="Exceptions"
        slotRight={
          groupedReconResults &&
          Object.keys(groupedReconResults).length > 0 && (
            <ButtonPopover
              label="Export"
              items={[
                {
                  label: "CSV",
                },
                {
                  label: "XLSX",
                },
              ]}
            />
          )
        }
      />

      {groupedReconResults && Object.keys(groupedReconResults).length === 0 && (
        <Empty>
          <EmptyContent>
            <EmptyTitle>No data to display</EmptyTitle>
            <EmptyDescription>
              Run a recon job to generate exceptions you can view here.
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      )}

      {groupedReconResults && Object.keys(groupedReconResults).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-md opacity-50">Reconciliation Results</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(ReconResultStatus).map((a, index) => {
              const percentage = getPercentage(a);
              const data = groupedReconResults?.[a];
              return (
                <Card key={index} className="@container/card">
                  <CardHeader>
                    <CardTitle className="capitalize text-[16px]">
                      {a.replaceAll("_", " ").toLowerCase()}
                    </CardTitle>
                    <CardAction>
                      <Badge variant="outline">
                        {data?.length || 0} records{" "}
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="opacity-40">Created by</p>
                      <p>Langford Quarshie</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="opacity-40">Records percentage</p>
                        <p>{percentage}%</p>
                      </div>
                      <div>
                        <p className="opacity-40">Process time</p>
                        <p>00m 00s</p>
                      </div>
                    </div>
                    {data && (
                      <div className="flex justify-between">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="ghost"
                              className="text-blue-500 pl-0 hover:bg-transparent"
                            >
                              Show transactions
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-[80vw]!">
                            <SheetHeader>
                              <SheetTitle className="capitalize">
                                {a.replaceAll("_", " ").toLowerCase()}
                              </SheetTitle>
                            </SheetHeader>
                            <div className="p-5 space-y-4">
                              <HelpMessage>{RECON_STATUS_DEFS[a]}</HelpMessage>
                              {(() => {
                                const _data = data.map((a) => ({
                                  internal_id: a.internal?.id,
                                  provider_id: a.provider?.id,
                                  ...a.internal,
                                }));
                                return (
                                  <Card>
                                    <CardContent>
                                      <DataTable
                                        searchKey="id"
                                        data={_data}
                                        columns={buildColumns(_data)}
                                      />
                                    </CardContent>
                                  </Card>
                                );
                              })()}
                            </div>
                            <SheetFooter className="items-end">
                              <Button size="lg" disabled className="w-fit">
                                <Upload />
                                Export records
                              </Button>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                        <Button variant="secondary" disabled className="w-fit">
                          <Upload />
                          Export records
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
