// apps/com/app/lib/db/mystiquill.ts

import { PrismaClient } from '@prisma/client';

let cached: PrismaClient | null = null;

export function getMystiquillPrisma() {
  if (!process.env.DATABASE_URL_MYSTIQUILL) {
    throw new Error(
      'DATABASE_URL_MYSTIQUILL is not set. Mystiquill DB unavailable.'
    );
  }

  if (!cached) {
    cached = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_MYSTIQUILL,
        },
      },
    });
  }

  return cached;
}