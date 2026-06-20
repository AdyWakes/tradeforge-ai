import { CheckCircle2, Circle, Loader2, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { EscrowContract } from "@/types/trade";

const stateIcon = {
  complete: CheckCircle2,
  current: Loader2,
  pending: Circle,
  blocked: TriangleAlert
};

export function EscrowTimeline({ contract }: { contract: EscrowContract }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{contract.id.toUpperCase()}</p>
          <p className="text-sm text-muted-foreground">
            {contract.buyer}
            {" -> "}
            {contract.supplier}
          </p>
        </div>
        <Badge
          variant={
            contract.status === "Released"
              ? "default"
              : contract.status === "Under Review"
                ? "warning"
                : "info"
          }
        >
          {contract.status}
        </Badge>
      </div>
      <div className="mt-5 space-y-4">
        {contract.timeline.map((item) => {
          const Icon = stateIcon[item.state];
          return (
            <div key={`${contract.id}-${item.label}`} className="flex gap-3">
              <div className="mt-0.5">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
