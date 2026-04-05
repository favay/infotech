import { ParsedTransactionFields } from '../types';

const amountPatterns = [
  /(total|amount|paid)\s*[:$]?\s*(\d+[\.,]\d{2})/i,
  /\$\s?(\d+[\.,]\d{2})/,
];

const datePatterns = [
  /(\d{4}[\/-]\d{2}[\/-]\d{2})/,
  /(\d{2}[\/-]\d{2}[\/-]\d{4})/,
];

export function parseTransactionText(input: string): ParsedTransactionFields {
  const sanitized = input.replace(/\s+/g, ' ').trim();

  const amountMatch = amountPatterns.map((regex) => sanitized.match(regex)).find(Boolean);
  const amountValue = Number((amountMatch?.[2] ?? amountMatch?.[1] ?? '0').replace(',', '.'));

  const dateMatch = datePatterns.map((regex) => sanitized.match(regex)).find(Boolean);
  const transactionDate = dateMatch ? new Date(dateMatch[1]) : new Date();

  const merchant =
    sanitized.match(/merchant\s*[:\-]\s*([a-z0-9 &'\-.]+)/i)?.[1] ||
    sanitized.split(' ').slice(0, 3).join(' ') ||
    'Unknown Merchant';

  return {
    merchant,
    amount: Number.isFinite(amountValue) && amountValue > 0 ? amountValue : 0,
    transactionDate,
    category: categorizeText(sanitized),
  };
}

export function categorizeText(text: string): string {
  const map: Record<string, string[]> = {
    groceries: ['grocery', 'supermarket', 'mart'],
    transport: ['uber', 'lyft', 'fuel', 'gas'],
    utilities: ['electric', 'water', 'internet', 'bill'],
    dining: ['restaurant', 'cafe', 'food', 'coffee'],
  };

  const lower = text.toLowerCase();
  const match = Object.entries(map).find(([, words]) => words.some((word) => lower.includes(word)));
  return match?.[0] ?? 'general';
}
