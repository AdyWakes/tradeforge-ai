import { pseudoHash } from "@/lib/utils";
import type {
  ActivityItem,
  AdminUser,
  ChartPoint,
  Company,
  EscrowContract,
  FraudSignal,
  Invoice,
  TradeTransaction
} from "@/types/trade";

export const companies: Company[] = [
  {
    id: "global-electronics-ltd",
    name: "Global Electronics Ltd",
    location: "Singapore",
    role: "Supplier",
    industry: "Consumer electronics",
    trustScore: 82,
    riskLevel: "Low",
    monthlyVolume: 1850000,
    businessAge: 9,
    paymentReliability: 88,
    invoiceConsistency: 91,
    coordinates: { x: 72, y: 55 }
  },
  {
    id: "dubai-imports-llc",
    name: "Dubai Imports LLC",
    location: "United Arab Emirates",
    role: "Buyer",
    industry: "Wholesale imports",
    trustScore: 76,
    riskLevel: "Medium",
    monthlyVolume: 1220000,
    businessAge: 6,
    paymentReliability: 79,
    invoiceConsistency: 83,
    coordinates: { x: 56, y: 48 }
  },
  {
    id: "india-textile-exports",
    name: "India Textile Exports",
    location: "India",
    role: "SME Owner",
    industry: "Textile manufacturing",
    trustScore: 88,
    riskLevel: "Low",
    monthlyVolume: 940000,
    businessAge: 12,
    paymentReliability: 92,
    invoiceConsistency: 89,
    coordinates: { x: 64, y: 52 }
  },
  {
    id: "tokyo-trading-group",
    name: "Tokyo Trading Group",
    location: "Japan",
    role: "Financing Partner",
    industry: "Trade finance",
    trustScore: 91,
    riskLevel: "Low",
    monthlyVolume: 2460000,
    businessAge: 18,
    paymentReliability: 95,
    invoiceConsistency: 94,
    coordinates: { x: 82, y: 43 }
  }
];

export const invoices: Invoice[] = [
  {
    id: "inv-1008",
    invoiceNumber: "GEL-2026-1008",
    buyer: "Dubai Imports LLC",
    supplier: "Global Electronics Ltd",
    amount: 284500,
    currency: "USD",
    dueDate: "2026-07-04",
    status: "Verified",
    riskScore: 18,
    hash: pseudoHash("GEL-2026-1008"),
    transactionHash: pseudoHash("polygon-GEL-2026-1008"),
    createdAt: "2026-06-12"
  },
  {
    id: "inv-2241",
    invoiceNumber: "ITE-2026-2241",
    buyer: "Tokyo Trading Group",
    supplier: "India Textile Exports",
    amount: 168200,
    currency: "USD",
    dueDate: "2026-07-18",
    status: "Financed",
    riskScore: 12,
    hash: pseudoHash("ITE-2026-2241"),
    transactionHash: pseudoHash("polygon-ITE-2026-2241"),
    createdAt: "2026-06-10"
  },
  {
    id: "inv-7710",
    invoiceNumber: "DIL-2026-7710",
    buyer: "India Textile Exports",
    supplier: "Dubai Imports LLC",
    amount: 512000,
    currency: "USD",
    dueDate: "2026-06-28",
    status: "Pending",
    riskScore: 64,
    hash: pseudoHash("DIL-2026-7710"),
    transactionHash: "",
    createdAt: "2026-06-13"
  },
  {
    id: "inv-8832",
    invoiceNumber: "TTG-2026-8832",
    buyer: "Global Electronics Ltd",
    supplier: "Tokyo Trading Group",
    amount: 735000,
    currency: "USD",
    dueDate: "2026-08-02",
    status: "Verified",
    riskScore: 24,
    hash: pseudoHash("TTG-2026-8832"),
    transactionHash: pseudoHash("polygon-TTG-2026-8832"),
    createdAt: "2026-06-08"
  }
];

export const transactions: TradeTransaction[] = [
  {
    id: "trd-9001",
    counterparty: "Global Electronics Ltd",
    route: "Singapore -> UAE",
    amount: 284500,
    currency: "USD",
    status: "Verified",
    riskLevel: "Low",
    financingDecision: "Approved",
    updatedAt: "2026-06-14 09:20"
  },
  {
    id: "trd-9002",
    counterparty: "India Textile Exports",
    route: "India -> Japan",
    amount: 168200,
    currency: "USD",
    status: "Financed",
    riskLevel: "Low",
    financingDecision: "Approved",
    updatedAt: "2026-06-14 08:44"
  },
  {
    id: "trd-9003",
    counterparty: "Dubai Imports LLC",
    route: "UAE -> India",
    amount: 512000,
    currency: "USD",
    status: "Pending",
    riskLevel: "High",
    financingDecision: "Review",
    updatedAt: "2026-06-13 21:11"
  },
  {
    id: "trd-9004",
    counterparty: "Tokyo Trading Group",
    route: "Japan -> Singapore",
    amount: 735000,
    currency: "USD",
    status: "Completed",
    riskLevel: "Low",
    financingDecision: "Approved",
    updatedAt: "2026-06-12 17:32"
  },
  {
    id: "trd-9005",
    counterparty: "Bosphorus Components",
    route: "Turkey -> UAE",
    amount: 92000,
    currency: "USD",
    status: "Disputed",
    riskLevel: "Medium",
    financingDecision: "Review",
    updatedAt: "2026-06-11 15:04"
  }
];

export const escrows: EscrowContract[] = [
  {
    id: "esc-5104",
    buyer: "Dubai Imports LLC",
    supplier: "Global Electronics Ltd",
    amount: 284500,
    currency: "USD",
    status: "Pending",
    timeline: [
      {
        label: "Buyer deposited funds",
        timestamp: "2026-06-12 10:16",
        state: "complete"
      },
      {
        label: "Invoice and shipment verified",
        timestamp: "2026-06-13 13:40",
        state: "complete"
      },
      {
        label: "Delivery confirmation",
        timestamp: "Awaiting buyer",
        state: "current"
      },
      {
        label: "Funds released",
        timestamp: "Pending",
        state: "pending"
      }
    ]
  },
  {
    id: "esc-5105",
    buyer: "Tokyo Trading Group",
    supplier: "India Textile Exports",
    amount: 168200,
    currency: "USD",
    status: "Released",
    timeline: [
      {
        label: "Buyer deposited funds",
        timestamp: "2026-06-09 09:10",
        state: "complete"
      },
      {
        label: "Delivery confirmed",
        timestamp: "2026-06-11 16:18",
        state: "complete"
      },
      {
        label: "Funds released",
        timestamp: "2026-06-11 16:24",
        state: "complete"
      }
    ]
  }
];

export const fraudSignals: FraudSignal[] = [
  {
    id: "sig-001",
    title: "Unusual amount spike",
    explanation: "Invoice amount exceeds historical average by 240%.",
    severity: "High",
    confidence: 91,
    invoiceId: "inv-7710"
  },
  {
    id: "sig-002",
    title: "Counterparty velocity mismatch",
    explanation:
      "Trading frequency rose from 2 to 11 invoices in a seven day window.",
    severity: "Medium",
    confidence: 78,
    invoiceId: "inv-7710"
  },
  {
    id: "sig-003",
    title: "Duplicate invoice fingerprint",
    explanation:
      "Payment terms and line-item structure match a previously financed invoice.",
    severity: "Medium",
    confidence: 73,
    invoiceId: "inv-1008"
  }
];

export const activities: ActivityItem[] = [
  {
    id: "act-001",
    action: "Invoice uploaded",
    description: "DIL-2026-7710 entered AI verification queue.",
    timestamp: "2 minutes ago",
    tone: "info"
  },
  {
    id: "act-002",
    action: "Invoice verified",
    description: "GEL-2026-1008 was anchored to Polygon testnet.",
    timestamp: "18 minutes ago",
    tone: "success"
  },
  {
    id: "act-003",
    action: "Smart contract created",
    description: "Escrow ESC-5104 opened for USD 284,500.",
    timestamp: "36 minutes ago",
    tone: "info"
  },
  {
    id: "act-004",
    action: "Payment released",
    description: "ESC-5105 released after delivery confirmation.",
    timestamp: "1 hour ago",
    tone: "success"
  },
  {
    id: "act-005",
    action: "Fraud alert raised",
    description: "Amount spike detected on DIL-2026-7710.",
    timestamp: "2 hours ago",
    tone: "warning"
  }
];

export const chartData: ChartPoint[] = [
  { month: "Jan", volume: 1.8, trust: 69, approvals: 42, fraud: 9, revenue: 58 },
  { month: "Feb", volume: 2.2, trust: 72, approvals: 47, fraud: 8, revenue: 66 },
  { month: "Mar", volume: 3.1, trust: 74, approvals: 53, fraud: 7, revenue: 74 },
  { month: "Apr", volume: 3.8, trust: 78, approvals: 59, fraud: 6, revenue: 88 },
  { month: "May", volume: 4.6, trust: 80, approvals: 67, fraud: 5, revenue: 101 },
  { month: "Jun", volume: 5.4, trust: 82, approvals: 73, fraud: 4, revenue: 124 }
];

export const adminUsers: AdminUser[] = [
  {
    id: "usr-001",
    name: "Maya Raman",
    company: "India Textile Exports",
    role: "SME Owner",
    status: "Active",
    trustScore: 88
  },
  {
    id: "usr-002",
    name: "Omar Al Nuaimi",
    company: "Dubai Imports LLC",
    role: "Buyer",
    status: "Review",
    trustScore: 76
  },
  {
    id: "usr-003",
    name: "Kenji Watanabe",
    company: "Tokyo Trading Group",
    role: "Financing Partner",
    status: "Active",
    trustScore: 91
  },
  {
    id: "usr-004",
    name: "Elena Park",
    company: "Global Electronics Ltd",
    role: "Supplier",
    status: "Active",
    trustScore: 82
  }
];

export const dashboardStats = {
  totalTradeVolume: 12840000,
  trustScore: 82,
  activeInvoices: 47,
  verifiedTransactions: 318,
  fraudAlerts: 7
};

export const trustScoreFactors = [
  { label: "Transaction history", value: 86 },
  { label: "Invoice consistency", value: 91 },
  { label: "Business age", value: 78 },
  { label: "Payment behavior", value: 84 },
  { label: "Fraud indicators", value: 68 }
];

export const heatmapCells = [
  { route: "Singapore -> UAE", risk: 22 },
  { route: "India -> Japan", risk: 18 },
  { route: "UAE -> India", risk: 64 },
  { route: "Japan -> Singapore", risk: 24 },
  { route: "Turkey -> UAE", risk: 48 },
  { route: "Vietnam -> India", risk: 31 }
];
