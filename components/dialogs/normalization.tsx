"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { batchNormalize } from "@/lib/engine/normalizer";
import { TransactionType } from "@/lib/enums";
import { CanonicalTransaction } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";

export default function NormalizationDialog(props: {
  keys: string[];
  open: boolean;
  children: React.ReactNode;
  type: TransactionType;
  transactions: Record<string, unknown>[];
  onOpenChange: (open: boolean) => void;
  onNormalizedData: (data: Partial<CanonicalTransaction>[]) => void;
}) {
  const [map, setMap] = useState<{ [key: string]: string }>({});

  const canonicalTransaction: Partial<CanonicalTransaction> = {
    amount: 0,
    created_dt: "",
    id: "",
    reference: "",
    currency: "",
  };

  function handleNormalization() {
    const normalizedData = batchNormalize(map, props.transactions);
    props.onNormalizedData(normalizedData);
    props.onOpenChange(false);
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="space-y-6">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>
            Match {props.type.toLowerCase()} file fields to our standard fields
          </DialogTitle>
          <DialogDescription>
            Tell us which columns in your file represent amounts, references,
            dates, and other details. This step ensures transactions from
            different sources can be compared accurately during reconciliation
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          {Object.keys(canonicalTransaction).map((key) => (
            <div key={key} className="space-y-4">
              <label className="capitalize">
                {key.replaceAll("_", " ").replace("dt", "timestamp")}
              </label>
              <Select onValueChange={(a) => setMap({ ...map, [key]: a })}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {props.keys.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </form>
        {Object.keys(map).length > 0 && (
          <div className="space-y-2">
            <h3>Preview</h3>
            <div className="flex items-center justify-between">
              <small className="pr-2">Standard field</small>
              <div className="w-full flex-1 border border-dashed" />
              <small className="pr-2">Source file column</small>
            </div>
            <ul className="bg-white space-y-2 p-4 rounded-md h-fit shadow-xs border">
              {Object.entries(map).map(([key, value]) => (
                <li
                  key={key}
                  className="flex text-sm items-center justify-between"
                >
                  <code>{key.replaceAll("_", " ")}</code>
                  <div className="w-full flex-1 border border-dashed" />
                  <code>{value}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
        <DialogFooter className="justify-between">
          <Button type="submit" onClick={handleNormalization}>
            Save mapping
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
