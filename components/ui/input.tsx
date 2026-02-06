import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  prefixIcon?: React.ReactNode;
}

function Input({ className, type, prefixIcon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {prefixIcon && (
        <div
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
            "text-muted-foreground transition-opacity",
            props.value ? "opacity-50" : "opacity-100",
          )}
        >
          {prefixIcon}
        </div>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground placeholder:text-sm selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30 border-input h-9 w-full rounded-md border bg-background",
          "px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow]",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          prefixIcon && "pl-8",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
