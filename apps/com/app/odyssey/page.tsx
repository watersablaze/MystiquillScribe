// apps/com/app/odyssey/page.tsx

import Link from 'next/link';
import styles from './odyssey.module.css';
import { mystiquillPrisma } from '@/lib/db/mystiquill';
import { getPoeticTime } from '@/lib/poeticTime';

export const dynamic = 'force-dynamic';

export default async function OdysseyPage() {
  /**
   * IMPORTANT:
   * OdysseyEntry no longer has:
   * - excerpt
   * - publishedAt
   *
   * Canonical time = createdAt
   */
const inscriptions = await mystiquillPrisma.odysseyEntry.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  select: {
    slug: true,
    title: true,
    guidedIntro: true,
    accessType: true,
    createdAt: true,
  },
});

await mystiquillPrisma.$queryRaw`SELECT 1`;

const dbName = await mystiquillPrisma.$queryRaw<
  { current_database: string }[]
>`SELECT current_database()`;

console.log('Mystiquill DB:', dbName[0]?.current_database);

  return (
    <main className={styles.container}>
      {/* ─────────────────────────
          CEREMONIAL SPREAD
      ───────────────────────── */}

      <section className={styles.spread}>
        {/* LEFT · Threshold / Lexicon */}
        <aside className={styles.threshold}>
          <span className={styles.thresholdMark}>Odyssey</span>

          <h1 className={styles.thresholdTitle}>
            A Living Index of Creative Inscriptions
          </h1>

          <p className={styles.thresholdSubtitle}>
            Published works, field notes, and reflective essays entered
            into the archive across time, place, and circumstance.
          </p>

          <div className={styles.publicationBadge}>
            <span className={styles.badgeMark}>Publication Notice</span>
            <p className={styles.badgeText}>
              Some inscriptions are freely accessible. Others are released
              as patron inscriptions or guided editorial works.
              Transactions are processed securely via Paystack.
            </p>
          </div>
        </aside>

        {/* CENTER · Divider Rail */}
        <div aria-hidden className={styles.divider} />

        {/* RIGHT · Archive Field */}
        <section className={styles.field}>
          <div className={styles.archiveShell}>
            <div className={styles.archiveScroll}>
              {inscriptions.map((i) => {
                const poetic = getPoeticTime(i.createdAt);

                return (
                  <Link
                    key={i.slug}
                    href={`/odyssey/${i.slug}`}
                    className={styles.inscription}
                  >
                    <span className={styles.ember} />

                    <div className={styles.inscriptionBody}>
                      <h2 className={styles.inscriptionTitle}>
                        {i.title}
                      </h2>

                      {/* Guided works get intentional framing text */}
                      {i.guidedIntro && (
                        <p className={styles.residue}>
                          {i.guidedIntro}
                        </p>
                      )}

                      {i.accessType !== 'OPEN' && (
                        <span className={styles.accessMark}>
                          {i.accessType === 'GUIDED' && 'Guided Reading'}
                          {i.accessType === 'PATRON' && 'Patron Access'}
                        </span>
                      )}

                      <div className={styles.coordinate}>
                        <span className={styles.poeticTime}>
                          {poetic.label}
                        </span>
                        <span className={styles.canonicalTime}>
                          {i.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}