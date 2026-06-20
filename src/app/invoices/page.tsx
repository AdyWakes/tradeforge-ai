import { InvoiceAnalyzer } from "@/components/invoices/invoice-analyzer";
import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";

export default function InvoicesPage() {
  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Invoice Intelligence"
        title="Extract, score, and verify trade invoices"
        description="Upload PDF, PNG, or JPG invoices and generate extracted fields, risk indicators, and verification reports suitable for lender review."
      />
      <InvoiceAnalyzer />
    </PlatformShell>
  );
}
