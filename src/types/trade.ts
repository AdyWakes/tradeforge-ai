export type UserRole =
  | "SME Owner"
  | "Buyer"
  | "Supplier"
  | "Financing Partner";

export type TradeStatus =
  | "Pending"
  | "Verified"
  | "Financed"
  | "Completed"
  | "Disputed";

export type RiskLevel = "Low" | "Medium" | "High";

export type EscrowStatus = "Pending" | "Released" | "Under Review";

export interface Company {
  id: string;
  name: string;
  location: string;
  role: UserRole;
  industry: string;
  trustScore: number;
  riskLevel: RiskLevel;
  monthlyVolume: number;
  businessAge: number;
  paymentReliability: number;
  invoiceConsistency: number;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  buyer: string;
  supplier: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: TradeStatus;
  riskScore: number;
  hash: string;
  transactionHash: string;
  createdAt: string;
}

export interface TradeTransaction {
  id: string;
  counterparty: string;
  route: string;
  amount: number;
  currency: string;
  status: TradeStatus;
  riskLevel: RiskLevel;
  financingDecision: "Approved" | "Review" | "Declined";
  updatedAt: string;
}

export interface EscrowContract {
  id: string;
  buyer: string;
  supplier: string;
  amount: number;
  currency: string;
  status: EscrowStatus;
  timeline: Array<{
    label: string;
    timestamp: string;
    state: "complete" | "current" | "pending" | "blocked";
  }>;
}

export interface FraudSignal {
  id: string;
  title: string;
  explanation: string;
  severity: RiskLevel;
  confidence: number;
  invoiceId: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  tone: "success" | "warning" | "info";
}

export interface ChartPoint {
  month: string;
  volume: number;
  trust: number;
  approvals: number;
  fraud: number;
  revenue: number;
}

export interface AdminUser {
  id: string;
  name: string;
  company: string;
  role: UserRole;
  status: "Active" | "Review" | "Suspended";
  trustScore: number;
}
