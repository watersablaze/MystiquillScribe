import { NextResponse } from 'next/server';
import { getMystiquillPrisma } from '@/lib/db/mystiquill';

export async function GET(
  _req: Request,
  context: any // ← explicit any satisfies TS + Next 15
) {
  try {
    const entryId = context.params.entryId;
    const prisma = getMystiquillPrisma();

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
  } catch (err) {
    console.error('SCRIBE REVISIONS ERROR', err);
    return NextResponse.json(
      { error: 'Failed to load revisions' },
      { status: 500 }
    );
  }
}