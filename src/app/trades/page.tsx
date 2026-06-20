import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";
import { TradeTable } from "@/components/trades/trade-table";

export default function TradesPage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Trade History"
        title="Search, filter, sort, and export trade activity"
        description="A complete trade management section covering pending, verified, financed, completed, and disputed transactions."
      />
      <TradeTable />
    </PlatformShell>
  );
}
