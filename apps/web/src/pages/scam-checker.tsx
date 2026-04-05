import { FormEvent, useState } from 'react';
import { AuthGate } from '../components/AuthGate';
import { Layout } from '../components/Layout';
import { RiskBadge } from '../components/RiskBadge';
import { api } from '../services/api';
import { ScamCheckResult } from '../types';

export default function ScamCheckerPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ScamCheckResult | null>(null);
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.runScamCheck(input);
      setResult(response);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Layout>
      <AuthGate>
        <form onSubmit={onSubmit} className="card">
          <h2>Scam Checker</h2>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste message or suspicious link"
            rows={6}
            required
          />
          <button type="submit">Analyze</button>
        </form>
        {error && <p className="error">{error}</p>}
        {result && (
          <section className="card">
            <h3>
              Result: <RiskBadge riskLevel={result.riskLevel} />
            </h3>
            <p>{result.explanation}</p>
            <ul>
              {result.indicators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </AuthGate>
    </Layout>
  );
}
