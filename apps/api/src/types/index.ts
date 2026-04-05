export type SourceType = 'receipt' | 'screenshot' | 'manual';

export interface ParsedTransactionFields {
  merchant: string;
  amount: number;
  transactionDate: Date;
  category: string;
}

export type RiskLevel = 'Safe' | 'Warning' | 'Scam';

export interface ScamResult {
  riskLevel: RiskLevel;
  explanation: string;
  indicators: string[];
}
