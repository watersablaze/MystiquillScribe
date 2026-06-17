-- CreateEnum
CREATE TYPE "MystiquillPartnerType" AS ENUM ('CREATIVE_COLLABORATOR', 'PATRON', 'INSTITUTIONAL', 'COMMISSION', 'CONTRIBUTOR', 'OTHER');

-- CreateEnum
CREATE TYPE "MystiquillPartnerStatus" AS ENUM ('NEW_INQUIRY', 'UNDER_REVIEW', 'ALIGNED_PENDING_CLARITY', 'NOT_ALIGNED', 'ARCHIVED_FOR_LATER', 'INVITED_TO_TRIAL', 'TRIAL_ACTIVE', 'TRIAL_COMPLETE', 'AGREEMENT_PENDING', 'ACTIVE_PARTNER', 'PAUSED', 'COMPLETED', 'RELEASED');

-- AlterTable
ALTER TABLE "OdysseyEntry" ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "MystiquillPartnerInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "website" TEXT,
    "organization" TEXT,
    "partnerType" "MystiquillPartnerType" NOT NULL,
    "readiness" TEXT,
    "intention" TEXT NOT NULL,
    "alignment" TEXT,
    "offering" TEXT,
    "needs" TEXT,
    "timeline" TEXT,
    "budget" TEXT,
    "materials" TEXT,
    "peopleInvolved" TEXT,
    "scopeAgreement" BOOLEAN NOT NULL DEFAULT false,
    "creditAgreement" BOOLEAN NOT NULL DEFAULT false,
    "trialAgreement" BOOLEAN NOT NULL DEFAULT false,
    "status" "MystiquillPartnerStatus" NOT NULL DEFAULT 'NEW_INQUIRY',
    "internalNotes" TEXT,
    "nextAction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MystiquillPartnerInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MystiquillPartnerInquiry_email_idx" ON "MystiquillPartnerInquiry"("email");

-- CreateIndex
CREATE INDEX "MystiquillPartnerInquiry_partnerType_idx" ON "MystiquillPartnerInquiry"("partnerType");

-- CreateIndex
CREATE INDEX "MystiquillPartnerInquiry_status_idx" ON "MystiquillPartnerInquiry"("status");

-- CreateIndex
CREATE INDEX "MystiquillPartnerInquiry_createdAt_idx" ON "MystiquillPartnerInquiry"("createdAt");
