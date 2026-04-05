# API Routes and Logic

Base URL: `http://localhost:4000/api`

All routes except `/auth/demo-login` require JWT bearer auth.

## Auth
- `POST /auth/demo-login`
  - Input: `{ email: string }`
  - Output: `{ token: string }`

## Dashboard (Protected)
- `GET /dashboard`
  - Output: `{ dailyTotal, weeklyTotal, recentTransactions, suspiciousTransactions }`

## Transactions (Protected)
- `GET /transactions?category=&startDate=`
  - Output: `Transaction[]`
- `POST /transactions/receipt`
  - Input: `{ imageBase64: string }`
  - OCR + regex parser + store in MongoDB
- `POST /transactions/text`
  - Input: `{ text: string }`
  - Pattern matching parser + store in MongoDB

## Scam Detection (Protected)
- `POST /scam/check`
  - Input: `{ content: string }`
  - Output: `{ riskLevel: Safe|Warning|Scam, explanation, indicators }`
