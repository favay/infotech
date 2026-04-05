# SmartSpend Guard Architecture

## 1) Project structure

```text
smartspend-guard/
├─ apps/
│  ├─ api/
│  │  ├─ src/
│  │  │  ├─ middleware/
│  │  │  ├─ routes/
│  │  │  ├─ services/
│  │  │  ├─ utils/
│  │  │  ├─ types/
│  │  │  ├─ models.ts
│  │  │  └─ server.ts
│  │  ├─ .env.example
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  └─ web/
│     ├─ src/
│     │  ├─ components/
│     │  ├─ pages/
│     │  ├─ services/
│     │  ├─ styles/
│     │  └─ types/
│     ├─ .env.local.example
│     ├─ package.json
│     └─ tsconfig.json
├─ docs/
│  ├─ ARCHITECTURE.md
│  ├─ API.md
│  ├─ DEPLOYMENT.md
│  └─ LOCAL_SETUP.md
├─ scripts/
└─ README.md
```

## 2) Backend stack

- Node.js + Express API
- MongoDB (Mongoose)
- Tesseract.js OCR service
- JWT auth (demo-login + protected routes)

## 3) Frontend stack

- Next.js + React + TypeScript
- Mobile-first card-based layout
- Minimal semantic colors: green=safe, yellow=warning, red=danger
- Built-in demo sign-in gate to obtain/store token

## 4) Security model

- Helmet headers
- Rate limiting
- JWT middleware on dashboard, transactions, scam endpoints
- Request body validation and text sanitization before persistence
