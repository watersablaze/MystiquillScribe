import Link from 'next/link';
import { getMystiquillPrisma } from '@/lib/db/mystiquill';
import styles from './odyssey.module.css';

type Params = { tag: string };

export const dynamic = 'force-dynamic';

export default async function OdysseyTagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const entries = await mystiquillPrisma.odysseyEntry.findMany({
    where: {
      published: true,
      tags: {
        contains: decodedTag,
      },
    },
    orderBy: { createdAt: 'desc' },
    select: {
      slug: true,
      title: true,
      content: true,
      createdAt: true,
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
        {entries.map((e) => (
          <Link
            key={e.slug}
            href={`/odyssey/${e.slug}`}
            className={styles.card}
          >
            <h2>{e.title}</h2>

            <p className={styles.excerpt}>
              {e.content.slice(0, 140)}…
            </p>
          </Link>
        ))}

        {entries.length === 0 && (
          <p className={styles.empty}>
            No inscriptions found under this tag.
          </p>
        )}
      </section>
    </main>
  );
}