import { Progress } from "@/components/ui/progress";
import { trustScoreFactors } from "@/lib/demo-data";

export function TrustGauge({ score = 82 }: { score?: number }) {
  const riskLevel = score >= 80 ? "Low" : score >= 60 ? "Medium" : "High";

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-6">
        <div
          className="grid h-48 w-48 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#34d399 ${score * 3.6}deg, rgba(255,255,255,0.1) 0deg)`
          }}
        >
          <div className="grid h-36 w-36 place-items-center rounded-full bg-background">
            <div className="text-center">
              <p className="text-4xl font-semibold text-white">{score}</p>
              <p className="text-sm text-muted-foreground">/100</p>
            </div>
          </div>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Risk Level</p>
        <p className="text-xl font-semibold text-emerald-200">{riskLevel}</p>
      </div>
      <div className="space-y-5">
        {trustScoreFactors.map((factor) => (
          <div key={factor.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="text-slate-200">{factor.label}</span>
              <span className="text-muted-foreground">{factor.value}%</span>
            </div>
            <Progress
              value={factor.value}
              tone={factor.value > 80 ? "success" : factor.value > 70 ? "info" : "warning"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
