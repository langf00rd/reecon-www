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
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/hooks/use-app-context";
import { ReconRuleOperator } from "@/lib/enums";
import { CanonicalReconRuleCondition, CanonicalTransaction } from "@/lib/types";
import { PlusIcon, XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { HorizontalDashedLine } from "../dashed-line";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function ReconRuleDialog(props: { children: ReactNode }) {
  const { reconRules, setReconRules } = useAppContext();
  const [open, setOpen] = useState(false);
  const [conditions, setConditions] = useState<CanonicalReconRuleCondition[]>(
    [],
  );
  const [currentCondition, setCurrentCondition] =
    useState<CanonicalReconRuleCondition | null>(null);
  const [isEnteringValue, setIsEnteringValue] = useState(false);

  function handleSave(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const name = formData.get("name") as string;
    const enabled = (formData.get("enabled") as string) === "on";
    const description = formData.get("description") as string;

    if (conditions.length === 0) {
      toast.error("Please add at least one condition");
      return;
    }

    setReconRules([
      ...reconRules,
      {
        id: crypto.randomUUID(),
        name,
        enabled,
        description,
        conditions: conditions,
        priority: 0,
      },
    ]);
    setOpen(false);
    setConditions([]);
    setCurrentCondition(null);
  }

  function handleAddCondition() {
    if (!currentCondition?.left || !currentCondition?.operator) {
      toast.error("Please select field and operator");
      return;
    }
    if (!currentCondition?.right && !currentCondition?.value) {
      toast.error("Please select a field or enter a value");
      return;
    }
    setConditions([
      ...conditions,
      currentCondition as CanonicalReconRuleCondition,
    ]);
    setCurrentCondition(null);
    setIsEnteringValue(false);
  }

  function handleRemoveCondition(index: number) {
    setConditions(conditions.filter((_, i) => i !== index));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Recon Rule</DialogTitle>
          <DialogDescription>
            This rule will be applied to reconciliations
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-8" onSubmit={handleSave}>
          <div className="space-y-4">
            <fieldset>
              <Label>Name</Label>
              <Input name="name" className="bg-white" />
            </fieldset>
            <fieldset>
              <Label>Description</Label>
              <Textarea name="description" className="bg-white" />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <Label>Enable</Label>
              <Switch name="enabled" />
            </fieldset>
          </div>

          <fieldset className="flex gap-2 flex-col">
            <Label>Conditions</Label>

            {/* display existing conditions */}
            <div className="flex items-center justify-between">
              <small className="pr-2">Internal field</small>
              <HorizontalDashedLine />
              <small className="pr-2">Operator</small>
              <HorizontalDashedLine />
              <small className="pr-2">Provider field/value</small>
            </div>

            {conditions.length > 0 && (
              <div className="space-y-2 mb-4">
                {conditions.map((a, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-2 py-1 bg-white rounded-md shadow-xs border"
                  >
                    <div className="flex-1 flex justify-between text-sm">
                      <code>{a.left}</code>
                      <code>{a.operator}</code>{" "}
                      <code>{a.right || a.value}</code>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveCondition(index)}
                    >
                      <XIcon />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex -mt-5 items-center gap-4">
              <KeySelect
                onChange={(a) =>
                  setCurrentCondition({
                    ...currentCondition,
                    left: a,
                  } as CanonicalReconRuleCondition)
                }
              />
              <OperatorSelect
                onChange={(a) =>
                  setCurrentCondition({
                    ...currentCondition,
                    operator: a,
                  } as CanonicalReconRuleCondition)
                }
              />
              <div className="space-y-2 mt-5">
                {isEnteringValue ? (
                  <Input
                    className="w-30 bg-white"
                    placeholder="Enter value..."
                    value={currentCondition?.value || ""}
                    onChange={(a) =>
                      setCurrentCondition({
                        ...currentCondition,
                        value: a.target.value,
                        right: undefined,
                      } as CanonicalReconRuleCondition)
                    }
                  />
                ) : (
                  <KeySelect
                    onChange={(a) => {
                      setCurrentCondition({
                        ...currentCondition,
                        value: undefined,
                        right: a,
                      } as CanonicalReconRuleCondition);
                    }}
                  />
                )}
                <div className="flex items-center gap-1 justify-end">
                  <Label>Use value</Label>
                  <Checkbox
                    className="bg-white"
                    checked={isEnteringValue}
                    onCheckedChange={(a) => setIsEnteringValue(Boolean(a))}
                  />
                </div>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCondition}
            >
              <PlusIcon /> Add Condition
            </Button>
          </fieldset>
          <DialogFooter>
            <Button>Save rule</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function KeySelect(props: {
  onChange: (value: keyof CanonicalTransaction) => void;
}) {
  const canonicalTransaction: Partial<CanonicalTransaction> = {
    id: "",
    amount: 0,
    created_dt: "",
    reference: "",
  };
  const keys = Object.keys(canonicalTransaction);
  return (
    <Select
      required
      onValueChange={(value) =>
        props.onChange(value as keyof CanonicalTransaction)
      }
    >
      <SelectTrigger className="min-w-30 bg-white">
        <SelectValue placeholder="Select field" />
      </SelectTrigger>
      <SelectContent>
        {keys.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function OperatorSelect(props: {
  onChange: (value: ReconRuleOperator) => void;
}) {
  const keys = Object.keys(ReconRuleOperator);
  return (
    <Select
      required
      onValueChange={(value) => props.onChange(value as ReconRuleOperator)}
    >
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder="Select operator" />
      </SelectTrigger>
      <SelectContent>
        {keys.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
