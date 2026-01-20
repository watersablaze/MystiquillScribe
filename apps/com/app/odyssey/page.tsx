import { getMystiquillPrisma } from "@/lib/db/mystiquill";
import styles from "./odyssey.module.css";
import { OdysseyIndexEntry } from "./components/OdysseyIndexEntry";

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
      publishedAt: true,
      accessType: true,
    },
  });

  return (
    <main className={styles.container}>
      <div className={styles.spread}>
        {/* LEFT · THRESHOLD */}
        <aside className={styles.threshold}>
          <span className={styles.thresholdMark}>Odyssey</span>

          <h1 className={styles.thresholdTitle}>
            A living index
            <br />
            of published inscriptions
          </h1>

          <p className={styles.thresholdSubtitle}>
            Each entry marks a moment of emergence — gathered,
            sealed, and held in sequence.
          </p>

          <div className={styles.publicationBadge}>
            <span className={styles.badgeMark}>Current Archive</span>
            <p className={styles.badgeText}>
              These writings remain publicly accessible unless
              marked by guided or patron thresholds.
            </p>
          </div>
        </aside>

        {/* CENTER · DIVIDER */}
        <div className={styles.divider} />

        {/* RIGHT · ARCHIVE */}
        <section className={styles.field}>
          <div className={styles.archiveShell}>
            <div className={styles.archiveScroll}>
              {entries.length === 0 && (
                <p className={styles.residue}>
                  No inscriptions have been sealed yet.
                </p>
              )}

            {entries.map((e) => (
              <OdysseyIndexEntry
                key={e.slug}
                slug={e.slug}
                title={e.title}
                excerpt={`${e.content.slice(0, 140)}…`}
                createdAt={e.createdAt}
                accessType={e.accessType}
                released={Boolean(e.publishedAt)}
              />
            ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}