export type RiskLevel = 'Safe' | 'Warning' | 'Scam';

export interface Transaction {
  _id: string;
  userId: string;
  source: 'receipt' | 'screenshot' | 'manual';
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  transactionDate: string;
  rawText?: string;
  isSuspicious: boolean;
  notes?: string;
  createdAt: string;
}

export interface DashboardSummary {
  dailyTotal: number;
  weeklyTotal: number;
  recentTransactions: Transaction[];
  suspiciousTransactions: Transaction[];
}

export interface ScamCheckResult {
  riskLevel: RiskLevel;
  explanation: string;
  indicators: string[];
}
