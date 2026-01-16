import Link from "next/link";
import styles from "./services.module.css";

export const metadata = {
  title: "Offerings — Mystiquill",
};

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <span className={styles.kicker}>Mystiquill</span>
        <h1 className={styles.title}>Offerings</h1>
        <p className={styles.intro}>
          Mystiquill offers digital publications, guided journeys,
          and select creative services. Availability, scope, and terms
          are communicated with clarity and care.
        </p>
      </header>

      {/* EDITORIAL GRID */}
      <section className={styles.servicesMain}>
        {/* LEFT — CONTEXT */}
        <div className={styles.servicesCopy}>
          <p>
            Offerings unfold across writing, guided editorial work,
            and collaborative services. Some works are publicly
            accessible; others are offered through guided or
            request-based access.
          </p>
        </div>

        {/* CENTER DIVIDER */}
        <div className={styles.divider} aria-hidden />

        {/* RIGHT — LIST */}
        <div className={styles.servicesList}>
          <div className={styles.serviceItem}>
            <h3>Editorial Publications</h3>
            <p>
              Original essays and written works. Some publications are
              freely available; others are released as paid digital editions.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <h3>Odyssey — Guided Journeys</h3>
            <p>
              Guided cultural and creative journeys that may include
              prompts, curated materials, and time-based participation.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <h3>Creative / Consulting Services</h3>
            <p>
              Select services offered by request. Scope, deliverables,
              and pricing are shared clearly prior to any engagement.
            </p>
          </div>
        </div>
      </section>

      {/* HORIZONTAL DIVIDER */}
      <div className={styles.sectionRule} />

      {/* CTA */}
      <section className={styles.actions}>
        <Link href="/contact" className={styles.actionLink}>
          Request / Inquire
        </Link>
        <Link href="/odyssey" className={styles.actionLink}>
          Learn about Odyssey
        </Link>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <Link href="/legal/privacy">Privacy Policy</Link>
        <Link href="/legal/terms">Terms of Service</Link>
      </footer>
    </main>
  );
}