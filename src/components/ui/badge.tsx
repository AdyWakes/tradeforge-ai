import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-emerald-400/30 bg-emerald-400/12 text-emerald-200",
        secondary: "border-white/10 bg-white/10 text-slate-200",
        warning: "border-amber-400/30 bg-amber-400/12 text-amber-200",
        danger: "border-red-400/30 bg-red-400/12 text-red-200",
        info: "border-cyan-400/30 bg-cyan-400/12 text-cyan-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
