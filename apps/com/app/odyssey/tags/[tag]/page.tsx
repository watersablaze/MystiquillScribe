// apps/com/app/odyssey/tags/[tag]/page.tsx

import Link from "next/link";
import { getMystiquillPrisma } from "@/lib/db/mystiquill";
import styles from "../../odyssey.module.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export default async function OdysseyTagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const prisma = getMystiquillPrisma();

  const posts = await prisma.odysseyEntry.findMany({
    where: {
      published: true,
      tags: {
        contains: decodedTag, // tags stored as comma-separated string
      },
    },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      content: true,
    },
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>#{decodedTag}</h1>
        <p className={styles.subtitle}>
          Entries carrying this particular thread of the journey.
        </p>
      </header>

      <section className={styles.list}>
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/odyssey/${p.slug}`}
            className={styles.card}
          >
            <h2>{p.title}</h2>

            <p className={styles.excerpt}>
              {p.content.slice(0, 140)}…
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}