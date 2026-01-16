import { notFound } from "next/navigation";
import { mystiquillPrisma } from "@/lib/db/mystiquill";
import ScribeEditor from "../../new/ScribeEditor";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditEntryPage({ params }: PageProps) {
  const { slug } = await params;

  const entry = await mystiquillPrisma.odysseyEntry.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      category: true,
      tags: true, // string | null
      published: true,
      archived: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  if (!entry) return notFound();

  // Revisions only for sealed (published) works
  const revisions = entry.published
    ? await mystiquillPrisma.odysseyRevision.findMany({
        where: { entryId: entry.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      })
    : [];

  return (
    <ScribeEditor
      mode="edit"
      initial={{
        id: entry.id,
        title: entry.title ?? "",
        slug: entry.slug,
        content: entry.content ?? "",
        category: entry.category ?? "",
        tags: entry.tags ?? "",
        published: entry.published,
        archived: entry.archived,
      }}
      revisions={revisions.map((r) => ({
        id: r.id,
        title: r.title,
        createdAt: r.createdAt.toISOString(),
      }))}
    />
  );
}