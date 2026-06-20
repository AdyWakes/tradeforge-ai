import { heatmapCells } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

function riskClass(risk: number) {
  if (risk > 60) return "bg-red-400/25 text-red-100 border-red-400/30";
  if (risk > 40) return "bg-amber-400/20 text-amber-100 border-amber-400/30";
  return "bg-emerald-400/16 text-emerald-100 border-emerald-400/30";
}

export function RiskHeatmap() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {heatmapCells.map((cell) => (
        <div
          key={cell.route}
          className={cn("rounded-md border p-4", riskClass(cell.risk))}
        >
          <p className="text-sm font-medium">{cell.route}</p>
          <div className="mt-3 h-2 rounded-full bg-black/25">
            <div
              className="h-full rounded-full bg-current"
              style={{ width: `${cell.risk}%` }}
            />
          </div>
          <p className="mt-2 text-xs opacity-80">Route risk {cell.risk}/100</p>
        </div>
      ))}
    </div>
  );
}
