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
import { Empty, EmptyContent, EmptyTitle } from "@/components/ui/empty";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppContext } from "@/hooks/use-app-context";
import { HelpCircle, PlusIcon, SquareFunction } from "lucide-react";

export default function Page() {
  const { reconRules } = useAppContext();
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

      {reconRules.length === 0 && (
        <Empty>
          <EmptyContent>
            <EmptyTitle>
              You have no rules yet. Create a new rule to start reconciliation.
            </EmptyTitle>
          </EmptyContent>
        </Empty>
      )}

      <div className="space-y-8 flex min-h-[90%] flex-col items-center">
        {reconRules.length > 0 && (
          <div className="absolute left-[50%] w-px h-[80vh] flex-1 border border-dashed" />
        )}
        {reconRules.map((rule, index) => (
          <Card key={index} className="relative w-125">
            <CardContent>
              <CardHeader>
                <CardTitle>{rule.name}</CardTitle>
                <CardDescription>{rule.description}</CardDescription>
                <CardAction>
                  <Badge variant={rule.enabled ? "default" : "destructive"}>
                    {rule.enabled ? "Enabled" : "Disabled"}
                  </Badge>
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
