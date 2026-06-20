import { GlobalCommerceMap } from "@/components/analytics/global-map";
import { RiskHeatmap } from "@/components/analytics/risk-heatmap";
import { RevenueFraudChart, TradeVolumeChart } from "@/components/dashboard/charts";
import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chartData } from "@/lib/demo-data";

export default function AnalyticsPage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Analytics Center"
        title="Advanced trade, revenue, fraud, and geography analytics"
        description="Interactive charts and operational intelligence for the full global commerce network."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <TradeVolumeChart data={chartData} />
        <RevenueFraudChart data={chartData} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Geographic Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <GlobalCommerceMap />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskHeatmap />
          </CardContent>
        </Card>
      </div>
    </PlatformShell>
  );
}
