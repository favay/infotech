import { Router } from 'express';
import { Transaction } from '../models';
import { extractTransactionFromImage } from '../services/ocrService';
import { parseTransactionText } from '../utils/parser';
import { sanitizePlainText } from '../utils/sanitize';

export const transactionRouter = Router();

function getUserId(headerUserId?: string): string {
  return headerUserId || process.env.DEFAULT_USER_ID || 'demo-user';
}

transactionRouter.get('/', async (req, res) => {
  const { category, startDate } = req.query;

  const query: Record<string, unknown> = { userId: getUserId(String(req.headers['x-user-id'] || '')) };

  if (category) query.category = sanitizePlainText(String(category)).toLowerCase();
  if (startDate) {
    query.transactionDate = { $gte: new Date(String(startDate)) };
  }

  const data = await Transaction.find(query).sort({ transactionDate: -1 }).limit(200);
  res.json(data);
});

transactionRouter.post('/receipt', async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64 || typeof imageBase64 !== 'string' || imageBase64.length < 64) {
    res.status(400).json({ message: 'Valid imageBase64 is required' });
    return;
  }

  const parsed = await extractTransactionFromImage(imageBase64);

  if (parsed.amount <= 0) {
    res.status(422).json({ message: 'Could not detect a valid amount from receipt' });
    return;
  }

  const tx = await Transaction.create({
    userId: getUserId(String(req.headers['x-user-id'] || '')),
    source: 'receipt',
    merchant: sanitizePlainText(parsed.merchant),
    amount: parsed.amount,
    category: parsed.category,
    transactionDate: parsed.transactionDate,
    rawText: sanitizePlainText(parsed.rawText),
    isSuspicious: parsed.amount > 1000,
  });

  res.status(201).json(tx);
});

transactionRouter.post('/text', async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length < 4) {
    res.status(400).json({ message: 'text is required' });
    return;
  }

  const safeText = sanitizePlainText(text);
  const parsed = parseTransactionText(safeText);

  if (parsed.amount <= 0) {
    res.status(422).json({ message: 'Could not detect a valid amount from text' });
    return;
  }

  const tx = await Transaction.create({
    userId: getUserId(String(req.headers['x-user-id'] || '')),
    source: 'screenshot',
    merchant: sanitizePlainText(parsed.merchant),
    amount: parsed.amount,
    category: parsed.category,
    transactionDate: parsed.transactionDate,
    rawText: safeText,
    isSuspicious: /failed|unknown|international/i.test(safeText),
  });

  res.status(201).json(tx);
});
