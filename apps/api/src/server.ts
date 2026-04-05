import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { requireAuth } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { dashboardRouter } from './routes/dashboard';
import { scamRouter } from './routes/scam';
import { transactionRouter } from './routes/transactions';
import { connectDb } from './utils/db';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is required');
}

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '8mb' }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
  })
);

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/dashboard', requireAuth, dashboardRouter);
app.use('/api/transactions', requireAuth, transactionRouter);
app.use('/api/scam', requireAuth, scamRouter);
app.use(errorHandler);

connectDb(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });
