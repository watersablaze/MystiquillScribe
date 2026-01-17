import Link from "next/link";
import { getMystiquillPrisma } from "@/lib/db/mystiquill";
import styles from "./odyssey.module.css";

export const dynamic = "force-dynamic";

export default async function OdysseyPage() {
  const prisma = getMystiquillPrisma();

  const entries = await prisma.odysseyEntry.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  return (
    <main className={styles.container}>
      <div className={styles.spread}>
        {/* ===============================
            LEFT · THRESHOLD
        =============================== */}
        <aside className={styles.threshold}>
          <span className={styles.thresholdMark}>Odyssey</span>

          <h1 className={styles.thresholdTitle}>
            A living index
            <br />
            of published inscriptions
          </h1>

          <p className={styles.thresholdSubtitle}>
            Each entry marks a moment of emergence — gathered, sealed,
            and held in sequence.
          </p>

          <div className={styles.publicationBadge}>
            <span className={styles.badgeMark}>Current Archive</span>
            <p className={styles.badgeText}>
              These writings remain publicly accessible unless otherwise
              marked by guided or patron thresholds.
            </p>
          </div>
        </aside>

        {/* ===============================
            CENTER · DIVIDER
        =============================== */}
        <div className={styles.divider} />

        {/* ===============================
            RIGHT · ARCHIVE
        =============================== */}
        <section className={styles.field}>
          <div className={styles.archiveShell}>
            <div className={styles.archiveScroll}>
              {entries.map((e) => (
                <Link
                  key={e.slug}
                  href={`/odyssey/${e.slug}`}
                  className={styles.inscription}
                >
                  <span className={styles.ember} />

                  <div className={styles.inscriptionBody}>
                    <h2 className={styles.inscriptionTitle}>{e.title}</h2>

                    <p className={styles.residue}>
                      {e.content.slice(0, 140)}…
                    </p>

                    <div className={styles.coordinate}>
                      <span className={styles.poeticTime}>
                        Inscribed
                      </span>
                      <span className={styles.canonicalTime}>
                        {new Date(e.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {entries.length === 0 && (
                <p className={styles.residue}>
                  No inscriptions have been sealed yet.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}