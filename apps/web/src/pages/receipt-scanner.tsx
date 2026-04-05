import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthGate } from '../components/AuthGate';
import { Layout } from '../components/Layout';
import { Transaction } from '../types';
import { api } from '../services/api';

export default function ReceiptScannerPage() {
  const [preview, setPreview] = useState<string>('');
  const [rawText, setRawText] = useState('Merchant: City Coffee Amount: $8.90 Date: 2026-04-05');
  const [result, setResult] = useState<Transaction | null>(null);
  const [error, setError] = useState<string>('');

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const content = reader.result?.toString() ?? '';
      setPreview(content);
      try {
        const base64 = content.split(',')[1];
        const tx = await api.parseReceipt(base64);
        setResult(tx);
        setError('');
      } catch (e) {
        setError((e as Error).message);
      }
    };
    reader.readAsDataURL(file);
  };

  const onTextSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const tx = await api.parseText(rawText);
      setResult(tx);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Layout>
      <AuthGate>
        <section className="card">
          <h2>Receipt Scanner</h2>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {preview && <img src={preview} alt="Receipt preview" className="preview" />}
        </section>
        <section className="card">
          <h3>Screenshot / Text Scanner</h3>
          <form onSubmit={onTextSubmit}>
            <textarea rows={4} value={rawText} onChange={(event) => setRawText(event.target.value)} required />
            <button type="submit">Parse transaction text</button>
          </form>
        </section>
        {error && <p className="error">{error}</p>}
        {result && (
          <section className="card">
            <h3>Extracted Details</h3>
            <p>Merchant: {result.merchant}</p>
            <p>Amount: ${result.amount.toFixed(2)}</p>
            <p>Date: {new Date(result.transactionDate).toLocaleDateString()}</p>
            <p>Category: {result.category}</p>
          </section>
        )}
      </AuthGate>
    </Layout>
  );
}
