import { pseudoHash } from "@/lib/utils";

export type BlockchainVerificationMode = "simulation" | "polygon";

export type BlockchainVerificationStatus =
  | "simulated_confirmed"
  | "confirmed"
  | "pending"
  | "failed";

export type BlockchainReceipt = {
  invoiceNumber: string;
  invoiceHash: string;
  transactionHash: string;
  timestamp: string;
  status: BlockchainVerificationStatus;
  statusLabel: string;
  mode: BlockchainVerificationMode;
  network: string;
  chainId: number;
  blockNumber: number;
  confirmations: number;
  contractAddress: string;
  explorerUrl: string;
  metadata: {
    schema: string;
    storage: "simulated-on-chain-metadata" | "polygon-contract-event";
    invoiceNumber: string;
    metadataHash: string;
  };
  note?: string;
};

type VerificationInput = {
  invoiceNumber: string;
};

type BlockchainVerifier = {
  verifyInvoice(input: VerificationInput): Promise<BlockchainReceipt>;
};

const POLYGON_AMOY_CHAIN_ID = 80002;
const SIMULATED_CONTRACT_ADDRESS =
  "0x7F4e2A91C6d49E8D23b8C2a6aA8f19B9426dF301";

class SimulatedPolygonVerifier implements BlockchainVerifier {
  async verifyInvoice({ invoiceNumber }: VerificationInput) {
    return createSimulatedPolygonReceipt(invoiceNumber);
  }
}

class RealPolygonVerifier implements BlockchainVerifier {
  async verifyInvoice({ invoiceNumber }: VerificationInput) {
    // Replace this adapter with ethers/viem contract writes when Polygon keys
    // and the verification contract are ready. The public API shape can stay
    // the same for the UI and route handler.
    return {
      ...createSimulatedPolygonReceipt(invoiceNumber),
      note:
        "Real Polygon mode is configured, but the contract write adapter is not implemented yet. Returning a simulation-compatible receipt."
    };
  }
}

function getBlockchainVerifier(): BlockchainVerifier {
  const mode = process.env.BLOCKCHAIN_VERIFICATION_MODE;

  if (mode === "polygon") {
    return new RealPolygonVerifier();
  }

  return new SimulatedPolygonVerifier();
}

function createSimulatedPolygonReceipt(invoiceNumber: string): BlockchainReceipt {
  const timestamp = new Date().toISOString();
  const invoiceHash = pseudoHash(`invoice:${invoiceNumber}`);
  const metadataHash = pseudoHash(`metadata:${invoiceNumber}:${timestamp}`);
  const transactionHash = pseudoHash(`polygon-amoy-tx:${invoiceNumber}:${timestamp}`);
  const blockNumber =
    9_200_000 + Number.parseInt(pseudoHash(`block:${invoiceNumber}`, 8).slice(2), 16) % 450_000;
  const confirmations = 24 + (blockNumber % 72);
  const explorerBase =
    process.env.POLYGON_EXPLORER_URL ??
    process.env.NEXT_PUBLIC_POLYGON_EXPLORER_URL ??
    "https://amoy.polygonscan.com";

  return {
    invoiceNumber,
    invoiceHash,
    transactionHash,
    timestamp,
    status: "simulated_confirmed",
    statusLabel: "Simulated Polygon Verification",
    mode: "simulation",
    network: "Polygon Amoy Testnet",
    chainId: POLYGON_AMOY_CHAIN_ID,
    blockNumber,
    confirmations,
    contractAddress: SIMULATED_CONTRACT_ADDRESS,
    explorerUrl: `${explorerBase}/tx/${transactionHash}`,
    metadata: {
      schema: "tradeforge.invoice.verification.v1",
      storage: "simulated-on-chain-metadata",
      invoiceNumber,
      metadataHash
    },
    note:
      "Demo fallback: no real transaction was broadcast. The receipt mirrors the shape expected from a Polygon contract event."
  };
}

export async function verifyInvoiceOnPolygon(
  invoiceNumber: string
): Promise<BlockchainReceipt> {
  const verifier = getBlockchainVerifier();
  return verifier.verifyInvoice({ invoiceNumber });
}
