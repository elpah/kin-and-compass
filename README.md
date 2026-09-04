# Kin and Compass

Monorepo for the Africa-focused travel and lifestyle platform.

```
website/   public site (Next.js, port 3000)
admin/     store dashboard (Next.js, port 3001)
api/       Express + MongoDB (port 4000)
packages/shared   types and helpers used by all three
```

## Run locally

Requires Node 20+ and MongoDB.

1. Copy `.env.example` to `.env.local` and set `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `AUTH_SECRET`.

2. Install and seed:

```bash
nvm use
npm install
npm run seed
npm run dev
```

3. Open:

- Website: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3001](http://localhost:3001)
- API health: [http://localhost:4000/health](http://localhost:4000/health)

Admin login uses `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`.
