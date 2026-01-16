import Link from 'next/link';
import { mystiquillPrisma } from '@/lib/db/mystiquill';
import styles from '../../odyssey.module.css';

type Params = { tag: string };

export default async function OdysseyTagPage({
  params,
}: {
  params: Params;
}) {
  const tag = decodeURIComponent(params.tag);

  const posts = await mystiquillPrisma.post.findMany({
    where: {
      published: true,
      tags: { has: tag },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>#{tag}</h1>
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
              {p.excerpt ?? p.content.slice(0, 140) + '…'}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}