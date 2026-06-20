import { Building2 } from "lucide-react";

import { companies } from "@/lib/demo-data";
import { formatCompact } from "@/lib/utils";

export function GlobalCommerceMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-[#07111a] bg-fintech-grid fintech-grid p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.12),transparent_45%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 100 60">
        <path
          d="M4 31 C18 15 27 18 38 28 S61 45 75 31 S91 18 97 28"
          fill="none"
          stroke="rgba(52,211,153,0.55)"
          strokeDasharray="2 2"
        />
        <path
          d="M20 42 C35 30 49 18 63 28 S80 43 92 35"
          fill="none"
          stroke="rgba(34,211,238,0.55)"
          strokeDasharray="2 2"
        />
      </svg>
      {companies.map((company) => (
        <div
          key={company.id}
          className="absolute z-10 min-w-36 rounded-md border border-white/10 bg-black/55 p-3 backdrop-blur"
          style={{
            left: `${company.coordinates.x}%`,
            top: `${company.coordinates.y}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Building2 className="h-4 w-4 text-primary" />
            {company.name}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {company.location} - {formatCompact(company.monthlyVolume)}/mo
          </p>
        </div>
      ))}
    </div>
  );
}
