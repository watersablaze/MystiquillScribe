# Mystiquill · Phase 0

- Next.js 15 (App Router), TS, Tailwind
- Prisma + Postgres
- NextAuth (credentials baseline)
- Dual route groups: (public-site) & (sanctum)
- Theme tokens (Mauve / Indigo / Gold / Silver)

## Dev

1) Copy `.env.example` → `.env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`
2) `pnpm install`
3) `pnpm prisma migrate dev --name init`
4) `pnpm dev` → http://localhost:3000

Deploy on Vercel and map:
- mystiquill.com → same project
- mystiquill.xyz → same project
(Phase 1 we can add middleware if you want hard domain gating.)