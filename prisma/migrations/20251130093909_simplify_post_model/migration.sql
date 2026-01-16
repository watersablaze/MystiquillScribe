/*
  Warnings:

  - You are about to drop the column `body` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `channel` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `site` on the `Post` table. All the data in the column will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "body",
DROP COLUMN "channel",
DROP COLUMN "isPublic",
DROP COLUMN "mediaUrl",
DROP COLUMN "section",
DROP COLUMN "site",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "publishedAt" DROP NOT NULL,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];
