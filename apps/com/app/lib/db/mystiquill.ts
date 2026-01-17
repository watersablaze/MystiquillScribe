import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances in dev / HMR
  // eslint-disable-next-line no-var
  var __mystiquillPrisma: PrismaClient | undefined;
}

export function getMystiquillPrisma() {
  if (!global.__mystiquillPrisma) {
    global.__mystiquillPrisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL_MYSTIQUILL,
    });
  }

  return global.__mystiquillPrisma;
}