-- CreateTable
CREATE TABLE "public"."OdysseyAccess" (
    "id" TEXT NOT NULL,
    "entrySlug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "accessType" "public"."AccessType" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OdysseyAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OdysseyAccess_reference_key" ON "public"."OdysseyAccess"("reference");

-- CreateIndex
CREATE INDEX "OdysseyAccess_entrySlug_idx" ON "public"."OdysseyAccess"("entrySlug");

-- CreateIndex
CREATE INDEX "OdysseyAccess_email_idx" ON "public"."OdysseyAccess"("email");
