# Mystiquill

Mystiquill currently runs as a single Next.js 15 App Router application in `apps/com`, with shared packages for UI, auth, theme, and database helpers in `packages`.

The active foundation includes:

- Public landing, services, contact, legal, and Odyssey routes
- NextAuth email sign-in via Resend
- Prisma schema and generated client for the Mystiquill database
- Paystack-backed access flows for guided Odyssey entries
- Middleware-based host gating for `mystiquill.com` and `mystiquill.xyz`

## Local development

1. Copy `.env.example` to `.env`.
2. Fill in at minimum `DATABASE_URL_MYSTIQUILL`, `NEXTAUTH_SECRET`, and `NEXT_PUBLIC_BASE_URL`.
3. Run `pnpm install`.
4. Generate Prisma client or apply migrations for `apps/com/prisma-mystiquill`.
5. Run `pnpm dev` from the repo root.

Root scripts proxy into the active app:

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm typecheck`

Local development defaults to `.com` behavior on `localhost:3000`. Set `TREAT_LOCAL_AS=xyz` to exercise sanctum redirects and host-gated behavior locally.

## Environment contract

Expected variables:

- `DATABASE_URL_MYSTIQUILL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_BASE_URL`
- `SITE_URL_COM`
- `SITE_URL_XYZ`
- `TREAT_LOCAL_AS`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `PAYSTACK_SECRET_KEY`

## Deployment

Vercel build contract:

- Root directory: `apps/com`
- Build command: `pnpm build`
- Output directory: `.next`

This app is intended to serve both `mystiquill.com` and `mystiquill.xyz`, with middleware enforcing which paths belong to each host.
