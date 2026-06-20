"use client";

import { ChangeEvent, useState } from "react";
import { CheckCircle2, FileUp, Loader2, ShieldCheck, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, shortHash } from "@/lib/utils";
import type { BlockchainReceipt } from "@/lib/services/blockchain";
import type { InvoiceAnalysis } from "@/lib/services/invoice-ai";

export function InvoiceAnalyzer() {
  const [fileName, setFileName] = useState("");
  const [analysis, setAnalysis] = useState<InvoiceAnalysis | null>(null);
  const [receipt, setReceipt] = useState<BlockchainReceipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setReceipt(null);
    setLoading(true);
    const response = await fetch("/api/invoices/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name })
    });
    const payload = (await response.json()) as InvoiceAnalysis;
    setAnalysis(payload);
    setLoading(false);
  }

  async function verifyOnChain() {
    if (!analysis) return;
    setVerifying(true);
    const response = await fetch("/api/blockchain/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceNumber: analysis.invoiceNumber })
    });
    const payload = (await response.json()) as BlockchainReceipt;
    setReceipt(payload);
    setVerifying(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Upload Invoice</CardTitle>
          <CardDescription>
            Supports PDF, PNG, and JPG invoices with simulated AI extraction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/[0.04] p-8 text-center transition hover:bg-white/[0.07]">
            <FileUp className="mb-4 h-10 w-10 text-primary" />
            <span className="text-lg font-medium text-white">Drop or select invoice</span>
            <span className="mt-2 text-sm text-muted-foreground">
              The demo engine generates a professional risk report from the file name.
            </span>
            <input
              type="file"
              accept=".pdf,image/png,image/jpeg"
              className="hidden"
              onChange={handleFile}
            />
          </label>
          {fileName ? (
            <div className="mt-4 rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm text-muted-foreground">
              Selected: <span className="text-white">{fileName}</span>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Verification Report</CardTitle>
          <CardDescription>
            Extracted invoice fields, risk indicators, and lender-ready checks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex min-h-72 items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
              Processing invoice intelligence...
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Invoice number" value={analysis.invoiceNumber} />
                <Field
                  label="Amount"
                  value={formatCurrency(analysis.amount, analysis.currency)}
                />
                <Field label="Buyer" value={analysis.buyer} />
                <Field label="Supplier" value={analysis.supplier} />
                <Field label="Due date" value={analysis.dueDate} />
                <Field label="Currency" value={analysis.currency} />
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-white">AI confidence</p>
                  <span className="text-sm text-emerald-200">{analysis.confidence}%</span>
                </div>
                <Progress value={analysis.confidence} />
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {analysis.summary}
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-white">Risk indicators</p>
                <div className="space-y-2">
                  {analysis.riskIndicators.map((indicator) => (
                    <div
                      key={indicator}
                      className="flex items-start gap-2 rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-200"
                    >
                      <TriangleAlert className="mt-0.5 h-4 w-4 text-amber-200" />
                      {indicator}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {analysis.verificationReport.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{item.label}</p>
                      <Badge
                        variant={
                          item.status === "Pass"
                            ? "default"
                            : item.status === "Review"
                              ? "warning"
                              : "danger"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <Button onClick={verifyOnChain} disabled={verifying}>
                {verifying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ShieldCheck className="h-4 w-4" />
                )}
                Generate Polygon verification receipt
              </Button>

              {receipt ? (
                <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-emerald-100">
                      <CheckCircle2 className="h-5 w-5" />
                      {receipt.statusLabel}
                    </div>
                    <Badge variant="secondary">
                      {receipt.mode === "simulation" ? "Simulation fallback" : "Live Polygon"}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <Field label="Invoice hash" value={shortHash(receipt.invoiceHash)} />
                    <Field label="Transaction hash" value={shortHash(receipt.transactionHash)} />
                    <Field label="Timestamp" value={new Date(receipt.timestamp).toLocaleString()} />
                    <Field label="Network" value={`${receipt.network} (${receipt.chainId})`} />
                    <Field label="Block number" value={receipt.blockNumber.toString()} />
                    <Field label="Confirmations" value={receipt.confirmations.toString()} />
                    <Field label="Contract" value={shortHash(receipt.contractAddress)} />
                    <Field label="Metadata hash" value={shortHash(receipt.metadata.metadataHash)} />
                  </div>
                  {receipt.note ? (
                    <p className="mt-4 text-xs leading-5 text-emerald-100/75">
                      {receipt.note}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex min-h-72 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center text-sm leading-6 text-muted-foreground">
              Upload an invoice to generate extraction, risk indicators, and a
              verification report.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
