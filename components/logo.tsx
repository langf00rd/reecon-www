import { Asterisk } from "lucide-react";

export function Logo(props: { size?: number }) {
  return (
    <div
      className={`hover:opacity-75 cursor-pointer transition-colors bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg`}
      style={{
        width: props.size || "30px",
        height: props.size || "30px",
      }}
    >
      <Asterisk className="size-4" />
    </div>
  );
}
