# SmartSpend Guard

SmartSpend Guard is a production-ready MVP that helps users track spending from receipts/text and detect scams.

## Monorepo Layout

- `apps/web`: Next.js mobile-first frontend dashboard
- `apps/api`: Node.js + Express + MongoDB backend with OCR + scam detection
- `docs`: architecture, API references, and deployment notes
- `scripts`: sample data loaders

## Quick Start

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local
npm run dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:4000`.

Use the in-app **Demo Sign In** card to generate/store a JWT token, then test all protected flows.

For complete setup, see `docs/LOCAL_SETUP.md`.
