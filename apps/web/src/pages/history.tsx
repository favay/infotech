import { useEffect, useState } from 'react';
import { AuthGate } from '../components/AuthGate';
import { Layout } from '../components/Layout';
import { api } from '../services/api';
import { Transaction } from '../types';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (startDate) params.set('startDate', startDate);

    const query = params.toString();
    api.getTransactions(query ? `?${query}` : '').then(setTransactions).catch(console.error);
  }, [category, startDate]);

  return (
    <Layout>
      <AuthGate>
        <section className="card">
          <h2>History</h2>
          <div className="filters">
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Filter by category"
            />
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </div>
        </section>
        <section className="card">
          <ul className="tx-list">
            {transactions.map((tx) => (
              <li key={tx._id}>
                <div>
                  <strong>{tx.merchant}</strong>
                  <p className="muted">
                    {tx.category} • {new Date(tx.transactionDate).toLocaleDateString()}
                  </p>
                </div>
                <span>${tx.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </section>
      </AuthGate>
    </Layout>
  );
}
