import { Transaction } from '../types';

interface TransactionListProps {
  title: string;
  transactions: Transaction[];
}

export function TransactionList({ title, transactions }: TransactionListProps) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {transactions.length === 0 ? (
        <p className="muted">No transactions found.</p>
      ) : (
        <ul className="tx-list">
          {transactions.map((tx) => (
            <li key={tx._id}>
              <div>
                <strong>{tx.merchant}</strong>
                <p className="muted">{new Date(tx.transactionDate).toLocaleDateString()}</p>
              </div>
              <div className="tx-meta">
                <span>${tx.amount.toFixed(2)}</span>
                {tx.isSuspicious && <span className="risk-pill">Alert</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
