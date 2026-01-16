// apps/com/app/(scribe)/scribe/edit/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { mystiquillPrisma } from '@/lib/db/mystiquill';
import ScribeEditor from '../../new/ScribeEditor';

export const dynamic = 'force-dynamic';

type Params = { slug: string };

export default async function EditEntryPage({ params }: { params: Params }) {
  const entry = await prisma.odysseyEntry.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      category: true,
      tags: true, // string | null (your schema)
      published: true,
      archived: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  if (!entry) return notFound();

  // Only show revisions drawer for sealed works
  const revisions = entry.published
    ? await prisma.odysseyRevision.findMany({
        where: { entryId: entry.id },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          excerpt: true,
          createdAt: true,
        },
      })
    : [];

  return (
    <ScribeEditor
      mode="edit"
      initial={{
        id: entry.id,
        title: entry.title ?? '',
        slug: entry.slug,
        excerpt: entry.excerpt ?? '',
        content: entry.content ?? '',
        category: entry.category ?? '',
        // tags is stored as "comma,separated" (string|null) in DB
        tags: entry.tags ?? '',
        published: entry.published,
        archived: entry.archived,
      }}
      revisions={revisions.map((r) => ({
        id: r.id,
        title: r.title,
        excerpt: r.excerpt ?? null,
        createdAt: r.createdAt.toISOString(),
      }))}
    />
  );
}