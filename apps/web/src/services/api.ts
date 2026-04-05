import { DashboardSummary, ScamCheckResult, Transaction } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown API error' }));
    throw new Error(error.message ?? 'API request failed');
  }

  return response.json() as Promise<T>;
}

export const api = {
  demoLogin: (email: string) =>
    fetchJson<{ token: string }>('/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  getDashboard: () => fetchJson<DashboardSummary>('/dashboard'),
  getTransactions: (query = '') => fetchJson<Transaction[]>(`/transactions${query}`),
  parseReceipt: (base64Image: string) =>
    fetchJson<Transaction>('/transactions/receipt', {
      method: 'POST',
      body: JSON.stringify({ imageBase64: base64Image }),
    }),
  parseText: (text: string) =>
    fetchJson<Transaction>('/transactions/text', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),
  runScamCheck: (content: string) =>
    fetchJson<ScamCheckResult>('/scam/check', {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
};
