import { EscrowSimulator } from "@/components/dashboard/escrow-simulator";
import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";

export default function EscrowPage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Smart Escrow"
        title="Simulate trusted payment release workflows"
        description="Buyer deposits funds, delivery confirmation releases payment, and disputes move escrow into under-review state."
      />
      <EscrowSimulator />
    </PlatformShell>
  );
}
