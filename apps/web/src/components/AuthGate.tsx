import { FormEvent, PropsWithChildren, useState } from 'react';
import { api } from '../services/api';

export function AuthGate({ children }: PropsWithChildren) {
  const [email, setEmail] = useState('demo@smartspend.local');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await api.demoLogin(email);
      localStorage.setItem('token', result.token);
      location.reload();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (token) return <>{children}</>;

  return (
    <section className="card">
      <h2>Sign in to SmartSpend Guard</h2>
      <p className="muted">Use demo login to access secure endpoints.</p>
      <form onSubmit={login}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button disabled={isLoading} type="submit">
          {isLoading ? 'Signing in...' : 'Demo Sign In'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
}
