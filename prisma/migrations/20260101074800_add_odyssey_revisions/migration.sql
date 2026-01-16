-- CreateTable
CREATE TABLE "public"."OdysseyEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "OdysseyEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OdysseyRevision" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OdysseyRevision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OdysseyEntry_slug_key" ON "public"."OdysseyEntry"("slug");

-- CreateIndex
CREATE INDEX "OdysseyRevision_entryId_idx" ON "public"."OdysseyRevision"("entryId");

-- AddForeignKey
ALTER TABLE "public"."OdysseyRevision" ADD CONSTRAINT "OdysseyRevision_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "public"."OdysseyEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
