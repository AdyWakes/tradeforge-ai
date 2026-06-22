import {
  chartData,
  companies,
  dashboardStats,
  escrows,
  fraudSignals,
  invoices,
  transactions,
  trustScoreFactors
} from "@/lib/demo-data";
import { formatCurrency, shortHash } from "@/lib/utils";
import type { Company, Invoice } from "@/types/trade";

const helpReply =
  "I can answer from the TradeForge demo workspace: explain the product, inspect invoice IDs like GEL-2026-1008, compare counterparty trust scores, flag fraud risk, summarize financing readiness, describe escrow status, and explain the Polygon verification simulation.";

const productReply =
  "TradeForge AI is a trade finance trust platform for SMEs, buyers, suppliers, and lenders. It turns invoices into lender-ready risk reviews by extracting invoice data, scoring counterparties, detecting fraud patterns, simulating escrow workflows, and producing Polygon-style verification receipts for auditability.";

const invoiceTerms = ["invoice", "bill", "payment term", "due", "upload"];
const financeTerms = ["finance", "financing", "fund", "funding", "loan", "lender", "approval", "approve", "readiness"];
const fraudTerms = ["fraud", "risk", "risky", "suspicious", "alert", "duplicate", "spike"];
const blockchainTerms = ["blockchain", "polygon", "verify", "verification", "hash", "transaction", "tx", "testnet"];
const escrowTerms = ["escrow", "release", "released", "delivery", "deposit", "dispute"];
const analyticsTerms = ["analytics", "dashboard", "metric", "volume", "revenue", "trend", "performance"];
const trustTerms = ["trust", "score", "counterparty", "company", "supplier", "buyer"];
const demoTerms = ["demo", "judge", "hackathon", "present", "pitch", "show"];
const dataTerms = ["fake", "mock", "simulation", "simulated", "real data", "test data"];

export function generateAssistantReply(message: string) {
  const normalized = normalize(message);

  if (!normalized) {
    return helpReply;
  }

  if (isGreeting(normalized)) {
    return `Hi. ${helpReply}`;
  }

  const invoice = findInvoice(normalized);
  if (invoice) {
    return invoiceReply(invoice);
  }

  const company = findCompany(normalized);
  if (company) {
    return companyReply(company);
  }

  if (asksForCapabilities(normalized)) {
    return helpReply;
  }

  if (asksForProductOverview(normalized)) {
    return productReply;
  }

  if (includesAny(normalized, financeTerms)) {
    return financingReply();
  }

  if (includesAny(normalized, fraudTerms)) {
    return fraudReply(normalized);
  }

  if (includesAny(normalized, blockchainTerms)) {
    return blockchainReply();
  }

  if (includesAny(normalized, escrowTerms)) {
    return escrowReply();
  }

  if (includesAny(normalized, analyticsTerms)) {
    return analyticsReply();
  }

  if (includesAny(normalized, trustTerms)) {
    return trustReply();
  }

  if (includesAny(normalized, demoTerms)) {
    return demoReply();
  }

  if (includesAny(normalized, dataTerms)) {
    return dataDisclosureReply();
  }

  if (includesAny(normalized, invoiceTerms)) {
    return invoiceOverviewReply();
  }

  return `I do not have enough context for that exact question yet. ${helpReply} Try asking for a specific invoice number, the riskiest trade, financing candidates, escrow status, or Polygon verification.`;
}

function normalize(message: string) {
  return message.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesAny(message: string, terms: string[]) {
  return terms.some((term) => message.includes(term));
}

function isGreeting(message: string) {
  return /^(hi|hello|hey|namaste|yo)\b/.test(message);
}

function asksForCapabilities(message: string) {
  return (
    message.includes("what can you do") ||
    message.includes("help me") ||
    message.includes("assist") ||
    message.includes("ask you")
  );
}

function asksForProductOverview(message: string) {
  return (
    message.includes("what is tradeforge") ||
    message.includes("what's tradeforge") ||
    message.includes("what is this") ||
    message.includes("what is it for") ||
    message.includes("what is the app") ||
    message.includes("purpose") ||
    message.includes("about tradeforge") ||
    message.includes("explain tradeforge")
  );
}

function findInvoice(message: string) {
  return invoices.find((invoice) =>
    invoiceSearchTokens(invoice).some((token) => message.includes(token))
  );
}

function invoiceSearchTokens(invoice: Invoice) {
  const parts = invoice.invoiceNumber.toLowerCase().split("-");
  return [
    invoice.id.toLowerCase(),
    invoice.invoiceNumber.toLowerCase(),
    parts[0],
    parts[parts.length - 1]
  ].filter((token) => token.length >= 3);
}

function findCompany(message: string) {
  return companies.find((company) =>
    companySearchTokens(company).some((token) => message.includes(token))
  );
}

function companySearchTokens(company: Company) {
  const words = company.name.toLowerCase().split(" ");
  return [
    company.id.toLowerCase(),
    company.name.toLowerCase(),
    ...words.filter((word) => word.length > 4)
  ];
}

function invoiceReply(invoice: Invoice) {
  const signals = fraudSignals.filter((signal) => signal.invoiceId === invoice.id);
  const blockchainStatus = invoice.transactionHash
    ? `anchored with tx ${shortHash(invoice.transactionHash)}`
    : "not anchored yet; keep it in review before lender release";
  const recommendation =
    invoice.riskScore <= 25
      ? "It is a strong financing candidate."
      : invoice.riskScore <= 50
        ? "It needs review before financing."
        : "I would hold it for manual review before financing.";
  const signalText =
    signals.length > 0
      ? ` Fraud signals: ${signals.map((signal) => `${signal.title} (${signal.confidence}%)`).join("; ")}.`
      : " No active fraud signals are attached.";

  return `${invoice.invoiceNumber}: ${invoice.supplier} invoiced ${invoice.buyer} for ${formatCurrency(invoice.amount, invoice.currency)}, due ${invoice.dueDate}. Status is ${invoice.status}, risk score is ${invoice.riskScore}/100, and blockchain status is ${blockchainStatus}.${signalText} ${recommendation}`;
}

function companyReply(company: Company) {
  return `${company.name} is a ${company.role.toLowerCase()} in ${company.location} with a ${company.trustScore}/100 trust score and ${company.riskLevel.toLowerCase()} risk. Monthly volume is ${formatCurrency(company.monthlyVolume)}, payment reliability is ${company.paymentReliability}/100, and invoice consistency is ${company.invoiceConsistency}/100.`;
}

function financingReply() {
  const readyInvoices = invoices
    .filter((invoice) => invoice.riskScore <= 25 && invoice.status !== "Pending")
    .sort((first, second) => first.riskScore - second.riskScore);
  const topCandidates = readyInvoices
    .map((invoice) => `${invoice.invoiceNumber} (${invoice.status}, risk ${invoice.riskScore}/100)`)
    .join(", ");

  return `Best financing candidates: ${topCandidates}. I would prioritize invoices with risk below 25, verified or financed status, strong counterparty trust, and a Polygon-style receipt. DIL-2026-7710 should stay in review because its risk score is 64/100.`;
}

function fraudReply(message: string) {
  const riskiestInvoice = [...invoices].sort((first, second) => second.riskScore - first.riskScore)[0];
  const linkedSignals = fraudSignals.filter((signal) => signal.invoiceId === riskiestInvoice.id);

  if (message.includes("duplicate")) {
    const duplicateSignal = fraudSignals.find((signal) => signal.title.toLowerCase().includes("duplicate"));
    if (duplicateSignal) {
      const invoice = invoices.find((item) => item.id === duplicateSignal.invoiceId);
      return `Duplicate risk is attached to ${invoice?.invoiceNumber ?? duplicateSignal.invoiceId}: ${duplicateSignal.explanation} Confidence is ${duplicateSignal.confidence}%, severity is ${duplicateSignal.severity}.`;
    }
  }

  return `Highest risk invoice: ${riskiestInvoice.invoiceNumber} at ${riskiestInvoice.riskScore}/100. Main signals: ${linkedSignals.map((signal) => `${signal.title} (${signal.confidence}%)`).join("; ")}. Recommendation: keep it in manual review and do not release financing until the amount spike and counterparty velocity mismatch are explained.`;
}

function blockchainReply() {
  const anchored = invoices.filter((invoice) => invoice.transactionHash);
  const pending = invoices.filter((invoice) => !invoice.transactionHash);

  return `Blockchain mode is a Polygon Amoy-ready simulation. Verified invoices get deterministic invoice hashes, transaction IDs, timestamps, confirmation counts, and receipt metadata. Anchored invoices: ${anchored.map((invoice) => invoice.invoiceNumber).join(", ")}. Pending anchor: ${pending.map((invoice) => invoice.invoiceNumber).join(", ")}. The adapter is structured so a real Polygon contract write can replace the simulation later.`;
}

function escrowReply() {
  return escrows
    .map((escrow) => {
      const currentStep =
        escrow.timeline.find((step) => step.state === "current") ??
        escrow.timeline[escrow.timeline.length - 1];
      return `${escrow.id.toUpperCase()}: ${escrow.status}, ${formatCurrency(escrow.amount, escrow.currency)} from ${escrow.buyer} to ${escrow.supplier}. Current step: ${currentStep.label} (${currentStep.timestamp}).`;
    })
    .join(" ");
}

function analyticsReply() {
  const latestMonth = chartData[chartData.length - 1];
  const approvalDelta = latestMonth.approvals - chartData[0].approvals;
  const fraudDelta = chartData[0].fraud - latestMonth.fraud;
  const reviewTrades = transactions.filter(
    (transaction) => transaction.financingDecision === "Review"
  ).length;

  return `Dashboard snapshot: ${formatCurrency(dashboardStats.totalTradeVolume)} total trade volume, ${dashboardStats.trustScore}/100 average trust score, ${dashboardStats.activeInvoices} active invoices, ${dashboardStats.verifiedTransactions} verified transactions, and ${dashboardStats.fraudAlerts} fraud alerts. In ${latestMonth.month}, approvals reached ${latestMonth.approvals}%, up ${approvalDelta} points since January, while fraud fell by ${fraudDelta} points. ${reviewTrades} trade records still need financing review.`;
}

function trustReply() {
  const topCompany = [...companies].sort((first, second) => second.trustScore - first.trustScore)[0];
  const factors = trustScoreFactors
    .map((factor) => `${factor.label}: ${factor.value}/100`)
    .join(", ");

  return `Trust scoring blends ${factors}. Highest current counterparty score is ${topCompany.name} at ${topCompany.trustScore}/100. The workspace average is ${dashboardStats.trustScore}/100.`;
}

function demoReply() {
  return "For the hackathon demo, open with the dashboard, upload or review an invoice, show DIL-2026-7710 as the high-risk case, show GEL-2026-1008 or ITE-2026-2241 as finance-ready, then show the Polygon-style verification receipt and escrow release workflow. Be explicit that blockchain and AI extraction are simulation-ready with clean integration boundaries.";
}

function dataDisclosureReply() {
  return "The submitted demo uses realistic generated trade data, not real customer data. That is acceptable for a hackathon as long as you disclose it. The Polygon flow is currently a simulation fallback that creates realistic invoice hashes, transaction IDs, timestamps, and statuses while keeping the code ready for real testnet integration.";
}

function invoiceOverviewReply() {
  const invoiceSummary = invoices
    .map((invoice) => `${invoice.invoiceNumber}: ${invoice.status}, risk ${invoice.riskScore}/100`)
    .join("; ");

  return `Loaded demo invoices: ${invoiceSummary}. Ask about any invoice number for buyer, supplier, amount, due date, fraud signals, financing recommendation, and verification status.`;
}
