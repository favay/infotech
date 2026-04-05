# How to run locally

## 1) Install deps

```bash
npm install
```

## 2) Configure env

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local
```

Update `MONGO_URI` and `JWT_SECRET` in `apps/api/.env`.

## 3) Seed sample data

```bash
npm run seed --workspace apps/api
```

## 4) Run app

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## 5) Demo login flow

1. Open any page in the web app.
2. Enter an email in the sign-in card.
3. Click **Demo Sign In** to receive and store JWT in localStorage.
4. Protected API routes will now work.

## Sample test data

Use this in Scam Checker:

```text
URGENT: Your bank account is blocked. Verify now at bit.ly/secure-verify and send OTP.
```

Use this in screenshot/text parser:

```text
Merchant: City Coffee Amount: $8.90 Date: 2026-04-05
```
