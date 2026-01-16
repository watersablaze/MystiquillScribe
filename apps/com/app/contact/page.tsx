import Link from "next/link";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact — Mystiquill",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <span className={styles.kicker}>Mystiquill</span>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.intro}>
          A direct line of correspondence for questions of alignment,
          participation, and offerings.
        </p>
      </header>

      {/* CONTACT THRESHOLD */}
      <section className={styles.contactStage}>
        <div className={styles.contactGrid}>
          {/* LEFT — CONTEXT */}
          <div className={styles.contactCopy}>
            <p>
              For editorial inquiries, collaborations, or services,
              you’re welcome to reach out directly.
            </p>
          </div>

          {/* CENTER DIVIDER */}
          <div className={styles.contactDivider} aria-hidden />

          {/* RIGHT — EMAIL */}
          <div className={styles.contactFocus}>
            <span className={styles.contactDash} aria-hidden>—</span>
            <a
              href="mailto:contact@mystiquill.com"
              className={styles.contactEmail}
            >
              contact@mystiquill.com
            </a>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider} aria-hidden />

      {/* NOTES */}
      <section className={styles.notes}>
        <p>
          This channel is best used for thoughtful correspondence,
          proposals, and inquiries related to Mystiquill’s work.
        </p>
        <p>Please include context and intent where possible.</p>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <Link href="/legal/privacy">Privacy Policy</Link>
        <Link href="/legal/terms">Terms of Service</Link>
      </footer>
    </main>
  );
}