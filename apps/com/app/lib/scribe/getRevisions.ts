// lib/scribe/getRevisions.ts
import { mystiquillPrisma } from '@/lib/db/mystiquill';

export async function getRevisions(entryId: string) {
  return mystiquillPrisma.odysseyRevision.findMany({
    where: { entryId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
}