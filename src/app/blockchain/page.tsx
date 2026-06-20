import { Blocks, ExternalLink } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { PlatformShell } from "@/components/layout/platform-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { invoices } from "@/lib/demo-data";
import { shortHash } from "@/lib/utils";

export default function BlockchainPage() {
  const verificationMode = process.env.BLOCKCHAIN_VERIFICATION_MODE ?? "simulation";

  return (
    <PlatformShell>
      <PageHeader
        eyebrow="Blockchain Verification"
        title="Polygon-ready verification explorer"
        description="If live Polygon testnet integration is not complete, TradeForge generates realistic verification receipts with invoice hashes, mock transaction IDs, timestamps, and confirmation status."
      />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Blocks className="h-5 w-5 text-primary" />
            Verification Mode
          </CardTitle>
          <CardDescription>
            Current mode: {verificationMode === "polygon" ? "Polygon adapter" : "simulation fallback"}.
            The service is isolated behind a verifier adapter so the API can
            switch to a real Polygon contract write without changing the UI.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <ModeField label="Network" value="Polygon Amoy Testnet" />
          <ModeField label="Chain ID" value="80002" />
          <ModeField label="Receipt schema" value="tradeforge.invoice.verification.v1" />
          <ModeField label="Fallback status" value="Simulated confirmed" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Blocks className="h-5 w-5 text-primary" />
            Verification Explorer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/[0.04]">
                  <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <th className="px-4 py-3">Invoice</th>
                    <th className="px-4 py-3">Invoice Hash</th>
                    <th className="px-4 py-3">Transaction Hash</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="text-sm">
                      <td className="px-4 py-4">
                        <p className="font-medium text-white">{invoice.invoiceNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          {invoice.supplier}
                          {" -> "}
                          {invoice.buyer}
                        </p>
                      </td>
                      <td className="px-4 py-4 font-mono text-muted-foreground">
                        {shortHash(invoice.hash)}
                      </td>
                      <td className="px-4 py-4 font-mono text-muted-foreground">
                        {invoice.transactionHash ? (
                          <span className="inline-flex items-center gap-2">
                            {shortHash(invoice.transactionHash)}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          "Pending"
                        )}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{invoice.createdAt}</td>
                      <td className="px-4 py-4">
                        <Badge variant={invoice.transactionHash ? "default" : "warning"}>
                          {invoice.transactionHash
                            ? "Simulated Polygon Verification"
                            : "Awaiting verification"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </PlatformShell>
  );
}

function ModeField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
