import { CheckCircle2, Clock3, TriangleAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/types/trade";

const toneIcon = {
  success: CheckCircle2,
  warning: TriangleAlert,
  info: Clock3
};

const toneClass = {
  success: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/25 bg-amber-400/10 text-amber-200",
  info: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200"
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const Icon = toneIcon[item.tone];
          return (
            <div key={item.id} className="flex gap-3">
              <div className={cn("mt-1 rounded-full border p-1.5", toneClass[item.tone])}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.action}</p>
                <p className="text-sm leading-5 text-muted-foreground">{item.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
