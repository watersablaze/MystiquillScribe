import Link from "next/link";
import { mystiquillPrisma } from "@/lib/db/mystiquill";
import styles from "../../odyssey.module.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function OdysseyCategoryPage({
  params,
}: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const entries = await mystiquillPrisma.odysseyEntry.findMany({
    where: {
      published: true,
      category: decodedCategory,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{decodedCategory}</h1>
        <p className={styles.subtitle}>
          Entries gathered under this facet of the work.
        </p>
      </header>

      <section className={styles.list}>
        {entries.map((e) => (
          <Link
            key={e.slug}
            href={`/odyssey/${e.slug}`}
            className={styles.card}
          >
            <h2>{e.title}</h2>
          </Link>
        ))}
      </section>
    </main>
  );
}