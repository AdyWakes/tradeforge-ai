export function generateAssistantReply(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("finance") || lower.includes("approval")) {
    return "Financing readiness is strongest for invoices with a trust score above 80, no duplicate fingerprint, and payment terms under net 60. GEL-2026-1008 and ITE-2026-2241 are currently the cleanest candidates.";
  }

  if (lower.includes("fraud") || lower.includes("risk")) {
    return "The highest current risk is DIL-2026-7710. The invoice amount is materially above historical norms and the route has a higher dispute rate, so I would keep it in manual review.";
  }

  if (lower.includes("blockchain") || lower.includes("polygon")) {
    return "Verified invoices are hashed and anchored to Polygon testnet with the invoice hash, timestamp, and transaction hash. This gives lenders and counterparties an immutable verification trail.";
  }

  if (lower.includes("escrow")) {
    return "Escrow ESC-5104 is pending delivery confirmation. Once the buyer confirms delivery, the simulation releases funds and updates the trade status to completed.";
  }

  return "TradeForge AI is monitoring invoice authenticity, counterparty trust, financing readiness, and escrow status. Ask about risk, financing, blockchain verification, or a specific invoice number.";
}
