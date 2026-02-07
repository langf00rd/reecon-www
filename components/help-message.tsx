import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function HelpMessage(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start bg-neutral-200/40 font-medium border p-1.5 px-2 rounded-md gap-2",
        props.className,
      )}
    >
      {/*<div className="relative top-1">
        <Info size={16} />
      </div>*/}
      {props.children}
    </p>
  );
}
