"use client";

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
import { Check, Info, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { groupedReconResults } = useAppContext();
  const statuses = Object.values(ReconResultStatus);

  const [selectedStatus, setSelectedStatus] = useState<ReconResultStatus>(
    ReconResultStatus.AMBIGUOUS,
  );

  function getNumberOfExceptions(status: ReconResultStatus): number {
    return groupedReconResults?.[status]?.length || 0;
  }

  return (
    <div className="space-y-6">
      <Header title="Exceptions" />

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
            <CardContent className="space-y-4">
              <p>{new Date().toLocaleString().substring(0, 8)}</p>

              <hr />

              <div className="space-y-2">
                <h3 className="uppercase">Internal</h3>
                {Object.entries({ ...item.internal, raw: undefined }).map(
                  ([key, value]) => {
                    if (!value) return;
                    return (
                      <p key={key} className="text-sm">
                        <span className="">{key.replaceAll("_", " ")}</span>:{" "}
                        {value}
                      </p>
                    );
                  },
                )}
              </div>

              <hr />

              <div className="space-y-2">
                <h3 className="uppercase">Provider</h3>
                {Object.entries({ ...item.provider, raw: undefined }).map(
                  ([key, value]) => {
                    if (!value) return;
                    return (
                      <p key={key} className="text-sm">
                        <span className="">{key.replaceAll("_", " ")}</span>:{" "}
                        {value}
                      </p>
                    );
                  },
                )}
              </div>

              <hr />

              {item.rule && <p>RULE: {item.rule}</p>}
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                Mark as Resolved
                <Check />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/*
      <DataTable
        columns={CANONICAL_COLUMNS}
        data={groupedReconResults?.[selectedStatus] || []}
      />*/}

      <div>
        {/*{Object.keys(groupedReconResults).map((key) => (
          <div key={key}>
            <h2>{key}</h2>
            {groupedReconResults[key].map((a, index) => (
              <div key={index}>
                <p>{new Date().toLocaleString().substring(0, 8)}</p>
                <p>{JSON.stringify(a.internal)}</p>
              </div>
            ))}
          </div>
        ))}*/}
      </div>
    </div>
  );
}
