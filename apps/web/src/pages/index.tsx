import { useEffect, useState } from 'react';
import { AuthGate } from '../components/AuthGate';
import { KpiCard } from '../components/KpiCard';
import { Layout } from '../components/Layout';
import { TransactionList } from '../components/TransactionList';
import { api } from '../services/api';
import { DashboardSummary } from '../types';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getDashboard()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <Layout>
      <AuthGate>
        <section className="grid">
          <KpiCard label="Daily Spending" value={`$${(data?.dailyTotal ?? 0).toFixed(2)}`} tone="safe" />
          <KpiCard label="Weekly Spending" value={`$${(data?.weeklyTotal ?? 0).toFixed(2)}`} tone="warning" />
          <KpiCard label="Risk Alerts" value={`${data?.suspiciousTransactions.length ?? 0}`} tone="danger" />
        </section>
        {error && <p className="error">{error}</p>}
        <TransactionList title="Recent Transactions" transactions={data?.recentTransactions ?? []} />
      </AuthGate>
    </Layout>
  );
}
