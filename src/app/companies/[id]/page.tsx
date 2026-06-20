import { notFound } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { TrustGauge } from "@/components/dashboard/trust-gauge";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { companies, invoices, transactions } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return companies.map((company) => ({ id: company.id }));
}

export default async function CompanyPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = companies.find((item) => item.id === id);

  if (!company) {
    notFound();
  }

  const relatedInvoices = invoices.filter(
    (invoice) => invoice.buyer === company.name || invoice.supplier === company.name
  );
  const relatedTransactions = transactions.filter(
    (transaction) => transaction.counterparty === company.name
  );

  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Company Profile"
        title={company.name}
        description={`${company.location} based ${company.industry.toLowerCase()} company with ${company.businessAge} years of trading history.`}
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>Trust Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <TrustGauge score={company.trustScore} />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <Snapshot label="Role" value={company.role} />
              <Snapshot label="Risk level" value={company.riskLevel} />
              <Snapshot
                label="Monthly volume"
                value={formatCurrency(company.monthlyVolume)}
              />
              <Snapshot label="Business age" value={`${company.businessAge} years`} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Signals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <Signal label="Payment reliability" value={company.paymentReliability} />
              <Signal label="Invoice consistency" value={company.invoiceConsistency} />
              <Signal label="Transaction history" value={company.trustScore} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Related Invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedInvoices.map((invoice) => (
              <div key={invoice.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{invoice.invoiceNumber}</p>
                  <Badge variant={invoice.status === "Pending" ? "warning" : "default"}>
                    {invoice.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {formatCurrency(invoice.amount, invoice.currency)} due {invoice.dueDate}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Related Trades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedTransactions.length ? (
              relatedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="font-medium text-white">{transaction.route}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatCurrency(transaction.amount, transaction.currency)} -{" "}
                    {transaction.financingDecision}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-md border border-white/10 bg-white/[0.04] p-4 text-sm text-muted-foreground">
                No direct trade records in the current demo dataset.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </PlatformShell>
  );
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-medium text-white">{value}</p>
    </div>
  );
}

function Signal({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-200">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
