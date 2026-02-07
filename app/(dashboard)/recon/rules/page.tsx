"use client";

import ReconRuleDialog from "@/components/dialogs/rule";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DEFAULT_RECON_RULES } from "@/lib/engine/rules";
import { HelpCircle, PlusIcon, SquareFunction } from "lucide-react";

export default function Page() {
  return (
    <>
      <Header
        title="Reconciliation Rules"
        slotRight={
          <ReconRuleDialog>
            <Button>
              <PlusIcon />
              New rule
            </Button>
          </ReconRuleDialog>
        }
      />
      <div className="space-y-8 flex min-h-[90%] flex-col items-center">
        <div className="absolute left-[50%] w-px h-[80vh] flex-1 border border-dashed" />
        {DEFAULT_RECON_RULES.map((rule, index) => (
          <Card key={index} className="relative w-125">
            <CardContent>
              <CardHeader>
                <CardTitle>{rule.name}</CardTitle>
                <CardDescription>{rule.description}</CardDescription>
                <CardAction>
                  <Badge>{rule.enabled ? "Enabled" : "Disabled"}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="mt-2">
                <Collapsible>
                  <CollapsibleTrigger className="opacity-50 gap-1 cursor-pointer flex items-center">
                    <SquareFunction size={16} /> Toggle conditions
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-3 rounded-md shadow-sm pt-3 border p-3 bg-background w-fit">
                    {rule.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <code className="bg-white!">{condition.left}</code>
                        <Tooltip>
                          <TooltipTrigger>
                            <small className="cursor-help flex items-center gap-1">
                              {condition.operator}{" "}
                              <HelpCircle className="opacity-50" size={12} />
                            </small>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                        <code className="bg-white!">
                          {condition.value ?? condition.right}
                        </code>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
