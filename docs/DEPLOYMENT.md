# Deployment Instructions

## Option A: Vercel (web) + Render/Railway (api)

1. Deploy `apps/web` to Vercel.
2. Set `NEXT_PUBLIC_API_URL` to deployed API URL.
3. Deploy `apps/api` to Render/Railway as Node service.
4. Set environment variables:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `DEFAULT_USER_ID`

## Option B: Firebase Hosting + Cloud Run API

1. Build Next.js app (`npm run build --workspace apps/web`).
2. Host static output via Firebase Hosting or equivalent.
3. Run Express API on Cloud Run and point frontend env to it.
4. Use MongoDB Atlas for managed DB.

## Recommended production hardening

- Add request logging and tracing
- Enforce auth (`requireAuth`) on transactions/dashboard routes
- Add unit tests and e2e tests
- Configure backups and alerts for MongoDB
