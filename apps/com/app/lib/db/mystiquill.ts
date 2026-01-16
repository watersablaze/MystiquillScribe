import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL_MYSTIQUILL) {
  throw new Error(
    'DATABASE_URL_MYSTIQUILL is not set. Mystiquill DB unavailable.'
  );
}

export const mystiquillPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_MYSTIQUILL,
    },
  },
});