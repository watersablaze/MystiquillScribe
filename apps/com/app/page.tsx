// apps/com/app/page.tsx

import Link from "next/link";
import styles from "./mystiquill.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.axis} />
      <div className={styles.arrival} />

      {/* Editorial spread */}
      <section className={styles.spread}>
        {/* LEFT: Sanctuary voice */}

        <div className={styles.sanctum}>
        <header className={styles.header}>
          <p className={styles.kicker}>Mystiquill</p>

          <h1 className={styles.h1}>
            A creative and cultural portal for{" "}
            <span className={styles.charge}>original writing</span>,{" "}
            guided journeys, and curated experience.
          </h1>

          <p className={styles.p}>
            Mystiquill publishes editorial work and hosts project-based
            creative journeys exploring art, identity, and global culture.
          </p>

        {/* Ritual threshold */}
        <div className={styles.ritualDivider} />

        {/* Vow + invitation block */}
        <div className={styles.centerMoment}>
          <p className={styles.vow}>
            The work begins when attention settles.
          </p>

          <div className={styles.invitation}>
        <Link href="/odyssey" className={styles.odysseyPortal}>
          Enter the Odyssey
        </Link>
          </div>
        </div>
        </header>
        </div>

        {/* RIGHT: Editorial index */}
        <aside className={styles.pathIndex}>
          <span className={styles.pathLabel}>Paths</span>

          <nav className={styles.pathList}>
            <Link href="/odyssey" className={styles.path}>
              <span className={styles.pathName}>Odyssey</span>
              <span className={styles.pathMeta}>
                Editorial journeys & published reflections
              </span>
            </Link>

            <Link href="/services" className={styles.path}>
              <span className={styles.pathName}>Offerings</span>
              <span className={styles.pathMeta}>
                Guided sessions & commissioned work
              </span>
            </Link>

            <Link href="/contact" className={styles.path}>
              <span className={styles.pathName}>Contact</span>
              <span className={styles.pathMeta}>
                Correspondence & inquiries
              </span>
            </Link>
          </nav>

          <div className={styles.archive}>
            <span className={styles.sideLabel}>Archive</span>
            <span className={styles.archiveMeta}>Est. 2026</span>
            <span className={styles.archiveMeta}>
              Living index · ongoing
            </span>
          </div>

          <div className={styles.studioNote}>
            <span className={styles.sideLabel}>Studio</span>
            <p className={styles.sideText}>
              Mystiquill is a working studio—part archive, part sanctuary, part unfolding manuscript.
            </p>
          </div>
        </aside>
      </section>

      {/* Trust footer */}
<footer className={styles.trust}>
  <div className={styles.trustGrid}>
    <div className={styles.trustMain}>
      <div>
        <strong> Mystiquill is an independent creative and cultural studio. Payments are handled securely and disclosed clearly, in advance. </strong>
      </div>

      <div className={styles.trustMeta}>
        © 2026 Mystiquill ·{" "}
        <Link href="/legal/privacy">Privacy</Link> ·{" "}
        <Link href="/legal/terms">Terms</Link>
      </div>
    </div>

    {/* Quill marginal note */}
    <aside className={styles.trustQuill}>
      <p className={styles.quill}>
        Some offerings are free; others unfold as contributed experiences,
        guided with care and intention.
      </p>
    </aside>
  </div>
</footer>
    </main>
  );
}