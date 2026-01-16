import { NextResponse } from 'next/server';
import { mystiquillPrisma } from '@/lib/db/mystiquill';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entryId = searchParams.get('entryId');

  if (!entryId) {
    return NextResponse.json(
      { error: 'Missing entryId' },
      { status: 400 }
    );
  }

  const revisions = await mystiquillPrisma.odysseyRevision.findMany({
    where: { entryId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      excerpt: true,
      createdAt: true,
    },
  });

  return NextResponse.json(revisions);
}