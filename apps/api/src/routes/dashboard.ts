import { Router } from 'express';
import { Transaction } from '../models';

export const dashboardRouter = Router();

function getUserId(headerUserId?: string): string {
  return headerUserId || process.env.DEFAULT_USER_ID || 'demo-user';
}

dashboardRouter.get('/', async (req, res) => {
  const userId = getUserId(String(req.headers['x-user-id'] || ''));
  const now = new Date();
  const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startWeek = new Date(startDay);
  startWeek.setDate(startWeek.getDate() - 6);

  const [dailyStats, weeklyStats, recentTransactions, suspiciousTransactions] = await Promise.all([
    Transaction.aggregate([
      { $match: { userId, transactionDate: { $gte: startDay } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Transaction.aggregate([
      { $match: { userId, transactionDate: { $gte: startWeek } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Transaction.find({ userId }).sort({ transactionDate: -1 }).limit(5),
    Transaction.find({ userId, isSuspicious: true }).sort({ transactionDate: -1 }).limit(5),
  ]);

  res.json({
    dailyTotal: dailyStats[0]?.total ?? 0,
    weeklyTotal: weeklyStats[0]?.total ?? 0,
    recentTransactions,
    suspiciousTransactions,
  });
});
