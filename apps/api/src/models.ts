import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    source: { type: String, enum: ['receipt', 'screenshot', 'manual'], required: true },
    merchant: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    category: { type: String, default: 'general' },
    transactionDate: { type: Date, required: true },
    rawText: { type: String, default: '' },
    isSuspicious: { type: Boolean, default: false },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Transaction = model('Transaction', transactionSchema);
export const User = model('User', userSchema);
