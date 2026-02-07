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
import { ReconRuleOperator } from "@/lib/enums";
import { CanonicalTransaction } from "@/lib/types";
import { ReactNode } from "react";
import { Button } from "../ui/button";
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
  function handleSave() {
    // Implement save logic here
  }

  return (
    <Dialog>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Recon Rule</DialogTitle>
          <DialogDescription>
            This rule will be applied to reconciliations
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSave}>
          <fieldset>
            <Label>Name</Label>
            <Input className="bg-white" />
          </fieldset>
          <fieldset>
            <Label>Description</Label>
            <Textarea className="bg-white" />
          </fieldset>
          <fieldset className="flex items-center gap-2">
            <Label>Enable</Label>
            <Switch />
          </fieldset>
          <fieldset>
            <Label>Conditions</Label>
            <div className="flex items-center gap-4">
              <KeySelect />
              <OperatorSelect />
              <KeySelect />
            </div>
          </fieldset>
        </form>
        <DialogFooter>
          <Button>Save rule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function KeySelect() {
  const canonicalTransaction: Partial<CanonicalTransaction> = {
    amount: 0,
    created_dt: "",
    id: "",
    reference: "",
  };
  const keys = Object.keys(canonicalTransaction);
  return (
    <Select>
      <SelectTrigger className="w-full bg-white">
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

function OperatorSelect() {
  const keys = Object.keys(ReconRuleOperator);
  return (
    <Select>
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
