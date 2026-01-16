import { NextResponse } from 'next/server';
import { getMystiquillPrisma } from '@/lib/db/mystiquill';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const entryId = searchParams.get('entryId');

    if (!entryId) {
      return NextResponse.json(
        { error: 'entryId is required' },
        { status: 400 }
      );
    }

    const revisions = await mystiquillPrisma.odysseyRevision.findMany({
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