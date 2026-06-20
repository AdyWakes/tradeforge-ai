import {
  BadgeDollarSign,
  BellRing,
  FileCheck2,
  FileClock,
  ShieldCheck
} from "lucide-react";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import {
  FinancingApprovalsChart,
  TradeVolumeChart,
  TrustGrowthChart
} from "@/components/dashboard/charts";
import { DemoWalkthrough } from "@/components/dashboard/demo-walkthrough";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { RealtimeFeed } from "@/components/dashboard/realtime-feed";
import { PlatformShell } from "@/components/layout/platform-shell";
import {
  activities,
  chartData,
  dashboardStats,
  fraudSignals,
  invoices
} from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Command Center"
        title="AI-powered trade finance operating system"
        description="Monitor invoice verification, trust scoring, financing readiness, fraud alerts, and escrow state from one workspace."
      />
      <DemoWalkthrough />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Total Trade Volume"
          value={formatCurrency(dashboardStats.totalTradeVolume)}
          delta="+28% this quarter"
          icon={BadgeDollarSign}
        />
        <MetricCard
          label="Trust Score"
          value={`${dashboardStats.trustScore}/100`}
          delta="+10 pts in 90 days"
          icon={ShieldCheck}
          tone="info"
        />
        <MetricCard
          label="Active Invoices"
          value={dashboardStats.activeInvoices.toString()}
          delta={`${invoices.length} demo invoices loaded`}
          icon={FileClock}
        />
        <MetricCard
          label="Verified Transactions"
          value={dashboardStats.verifiedTransactions.toString()}
          delta="Polygon receipts available"
          icon={FileCheck2}
        />
        <MetricCard
          label="Fraud Alerts"
          value={dashboardStats.fraudAlerts.toString()}
          delta={`${fraudSignals.length} high-priority signals`}
          icon={BellRing}
          tone="warning"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <TradeVolumeChart data={chartData} />
        <TrustGrowthChart data={chartData} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <FinancingApprovalsChart data={chartData} />
        <ActivityFeed items={activities} />
      </div>
      <div className="mt-6">
        <RealtimeFeed />
      </div>
    </PlatformShell>
  );
}
