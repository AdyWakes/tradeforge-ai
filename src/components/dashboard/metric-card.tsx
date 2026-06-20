import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  tone?: "success" | "warning" | "info";
};

const toneClass = {
  success: "text-emerald-200 bg-emerald-400/10 border-emerald-400/20",
  warning: "text-amber-200 bg-amber-400/10 border-amber-400/20",
  info: "text-cyan-200 bg-cyan-400/10 border-cyan-400/20"
};

export function MetricCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "success"
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-normal text-white">
              {value}
            </p>
          </div>
          <div className={cn("rounded-md border p-2.5", toneClass[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-4 text-xs text-emerald-200">{delta}</p>
      </CardContent>
    </Card>
  );
}
