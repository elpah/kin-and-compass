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

1. Copy `.env.example` to `.env.local` and set `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `AUTH_SECRET`. Put the same `AUTH_SECRET` on the website, admin, and API (locally in `website/.env.local` and `admin/.env.local`, and on each Vercel project).

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

Website customers can sign in with Google, email/password, or phone (SMS code via Twilio). Inquiries and password reset send through Zoho SMTP. Set `ZOHO_SMTP_USER`, `ZOHO_SMTP_PASS`, `MAIL_ADMIN`, `MAIL_CONTACT`, and `MAIL_BOOKING` on the API. Every inquiry goes to `MAIL_ADMIN`, with `MAIL_CONTACT` or `MAIL_BOOKING` in CC depending on the form, and a confirmation to the sender. Put the public addresses in `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_BOOKING_EMAIL` on the website. Set `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` on the website and Twilio keys on the API when you want those methods live.
