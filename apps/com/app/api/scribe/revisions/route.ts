import { NextResponse } from 'next/server';
import { getMystiquillPrisma } from "@/lib/db/mystiquill";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entryId = searchParams.get('entryId');
  const prisma = getMystiquillPrisma();

  if (!entryId) {
    return NextResponse.json(
      { error: 'Missing entryId' },
      { status: 400 }
    );
  }

  const revisions = await prisma.odysseyRevision.findMany({
    where: { entryId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  return NextResponse.json(revisions);
}