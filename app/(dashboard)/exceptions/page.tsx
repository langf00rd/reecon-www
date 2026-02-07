"use client";

import ButtonPopover from "@/components/button-popover";
import { HorizontalDashedLine } from "@/components/dashed-line";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/hooks/use-app-context";
import { RECON_STATUS_DEFS } from "@/lib/content";
import { ReconResultStatus } from "@/lib/enums";
import { Check, HelpCircle, Info, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { groupedReconResults, reconRules } = useAppContext();
  const statuses = Object.values(ReconResultStatus);

  const [selectedStatus, setSelectedStatus] = useState<ReconResultStatus>(
    ReconResultStatus.AMBIGUOUS,
  );

  function getNumberOfExceptions(status: ReconResultStatus): number {
    return groupedReconResults?.[status]?.length || 0;
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

      <div className="flex items-center w-full justify-between">
        <div>
          <Select
            value={selectedStatus}
            onValueChange={(a) => setSelectedStatus(a as ReconResultStatus)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}{" "}
                    <Badge variant="destructive">
                      {getNumberOfExceptions(status)}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            className="bg-white w-100"
            placeholder="Search..."
            prefixIcon={<Search size={12} />}
          />
        </div>
      </div>

      <p className="flex items-start bg-neutral-200/40 border p-2 px-3 rounded-sm gap-2">
        <div className="relative top-1">
          <Info size={16} />
        </div>
        {RECON_STATUS_DEFS[selectedStatus]}
      </p>

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

      <div className="grid grid-cols-3 gap-4">
        {groupedReconResults?.[selectedStatus]?.map((item, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col h-full gap-4 justify-between">
              <div className="space-y-3">
                <h3 className="uppercase text-foreground/70!">Internal</h3>
                {Object.entries({ ...item.internal, raw: undefined }).map(
                  ([key, value]) => {
                    if (!value) return;
                    return (
                      <p key={key} className="text-sm">
                        <code className="font-medium uppercase">
                          {key.replaceAll("_", " ")}
                        </code>{" "}
                        <span className="text-foreground">{value}</span>
                      </p>
                    );
                  },
                )}
              </div>
              <HorizontalDashedLine />
              <div className="space-y-3">
                <h3 className="uppercase text-foreground/70!">Provider</h3>
                {Object.entries({ ...item.provider, raw: undefined }).map(
                  ([key, value]) => {
                    if (!value) return;
                    return (
                      <p key={key} className="text-sm">
                        <code className="font-medium uppercase">
                          {key.replaceAll("_", " ")}
                        </code>{" "}
                        <span className="text-foreground">{value}</span>
                      </p>
                    );
                  },
                )}
              </div>
              <HorizontalDashedLine />

              {item.rule && (
                <div className="space-y-3">
                  <h3 className="uppercase text-foreground/70!">RULE</h3>
                  <HoverCard openDelay={100} closeDelay={200}>
                    <HoverCardTrigger>
                      <p className="flex cursor-help items-center gap-1">
                        {reconRules.find((rule) => rule.id === item.rule)?.name}
                        <HelpCircle size={14} className="opacity-50" />
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      {
                        reconRules.find((rule) => rule.id === item.rule)
                          ?.description
                      }
                    </HoverCardContent>
                  </HoverCard>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <ButtonPopover
                buttonProps={{
                  variant: "outline",
                }}
                label="Export"
                items={[]}
              />
              <Button variant="outline">
                Mark as Resolved
                <Check />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
