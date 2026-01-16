/*
  Warnings:

  - You are about to drop the column `excerpt` on the `OdysseyEntry` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `OdysseyEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."OdysseyEntry" DROP COLUMN "excerpt",
DROP COLUMN "publishedAt";
