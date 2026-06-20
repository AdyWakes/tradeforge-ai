import { ShieldAlert, TriangleAlert } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fraudSignals } from "@/lib/demo-data";

export default function FraudPage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Fraud Detection"
        title="AI-generated fraud signals and explanations"
        description="Detect duplicate invoices, suspicious transaction patterns, unusual amount spikes, and risky counterparties before financing decisions."
      />
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-200" />
              Detection Coverage
            </CardTitle>
            <CardDescription>
              Risk models evaluate invoices, counterparties, and trading routes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              ["Duplicate invoice detection", 86],
              ["Suspicious transaction patterns", 78],
              ["Unusual amount spikes", 91],
              ["Risky counterparties", 74]
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-200">{label}</span>
                  <span className="text-muted-foreground">{value}%</span>
                </div>
                <Progress value={Number(value)} tone={Number(value) > 85 ? "warning" : "info"} />
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-4">
          {fraudSignals.map((signal) => (
            <Card key={signal.id}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <div className="rounded-md border border-amber-400/20 bg-amber-400/10 p-2 text-amber-200">
                      <TriangleAlert className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{signal.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {signal.explanation}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Linked invoice: {signal.invoiceId.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      signal.severity === "High"
                        ? "danger"
                        : signal.severity === "Medium"
                          ? "warning"
                          : "default"
                    }
                  >
                    {signal.confidence}% confidence
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PlatformShell>
  );
}
