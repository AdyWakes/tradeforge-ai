import * as React from "react";

import { cn } from "@/lib/utils";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number;
  tone?: "success" | "warning" | "danger" | "info";
};

const toneClasses = {
  success: "from-emerald-300 to-cyan-300",
  warning: "from-amber-300 to-orange-300",
  danger: "from-red-300 to-rose-300",
  info: "from-cyan-300 to-blue-300"
};

function Progress({
  className,
  value,
  tone = "success",
  ...props
}: ProgressProps) {
  return (
    <div
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-white/10", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-all duration-500",
          toneClasses[tone]
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export { Progress };
