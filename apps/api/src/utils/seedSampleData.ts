import 'dotenv/config';
import { Transaction } from '../models';
import { connectDb } from './db';

const data = [
  {
    userId: process.env.DEFAULT_USER_ID || 'demo-user',
    source: 'manual',
    merchant: 'Fresh Mart',
    amount: 42.15,
    category: 'groceries',
    transactionDate: new Date(),
    rawText: 'Merchant: Fresh Mart Total: $42.15 Date: 2026-04-05',
    isSuspicious: false,
  },
  {
    userId: process.env.DEFAULT_USER_ID || 'demo-user',
    source: 'screenshot',
    merchant: 'Unknown Intl Transfer',
    amount: 1249.99,
    category: 'general',
    transactionDate: new Date(),
    rawText: 'URGENT verify account click now bit.ly/fakebank',
    isSuspicious: true,
  },
];

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is required');

  await connectDb(uri);
  await Transaction.deleteMany({ userId: process.env.DEFAULT_USER_ID || 'demo-user' });
  await Transaction.insertMany(data);
  console.log('Sample data inserted');
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
