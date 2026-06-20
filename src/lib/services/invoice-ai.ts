import { invoices } from "@/lib/demo-data";
import { pseudoHash } from "@/lib/utils";

export type InvoiceAnalysis = {
  invoiceNumber: string;
  amount: number;
  buyer: string;
  supplier: string;
  dueDate: string;
  currency: string;
  confidence: number;
  summary: string;
  riskIndicators: string[];
  verificationReport: Array<{
    label: string;
    status: "Pass" | "Review" | "Fail";
    detail: string;
  }>;
};

function seedFromName(fileName: string) {
  return fileName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

export function analyzeInvoiceFile(fileName: string): InvoiceAnalysis {
  const seed = seedFromName(fileName);
  const base = invoices[seed % invoices.length];
  const riskIndicators =
    base.riskScore > 50
      ? [
          "Amount spike compared with prior counterparty history",
          "Shipment route has elevated dispute frequency",
          "Payment term changed from net 45 to net 15"
        ]
      : [
          "Line items align with known purchase order pattern",
          "Counterparty registration matches verified profile",
          "No duplicate invoice fingerprint detected"
        ];

  return {
    invoiceNumber: base.invoiceNumber,
    amount: base.amount,
    buyer: base.buyer,
    supplier: base.supplier,
    dueDate: base.dueDate,
    currency: base.currency,
    confidence: Math.min(98, 86 + (seed % 12)),
    summary: `${base.supplier} issued ${base.invoiceNumber} to ${base.buyer} for ${base.currency} ${base.amount.toLocaleString()} with payment due on ${base.dueDate}.`,
    riskIndicators,
    verificationReport: [
      {
        label: "Document authenticity",
        status: base.riskScore > 70 ? "Review" : "Pass",
        detail: "PDF metadata, OCR consistency, and entity names were compared."
      },
      {
        label: "Counterparty match",
        status: "Pass",
        detail: "Buyer and supplier match verified TradeForge company profiles."
      },
      {
        label: "Duplicate detection",
        status: base.riskScore > 55 ? "Review" : "Pass",
        detail: `Invoice fingerprint ${pseudoHash(base.invoiceNumber, 16)} checked against financed invoices.`
      },
      {
        label: "Financing readiness",
        status: base.riskScore > 55 ? "Review" : "Pass",
        detail:
          base.riskScore > 55
            ? "Manual review recommended before financing approval."
            : "Eligible for instant financing partner review."
      }
    ]
  };
}
