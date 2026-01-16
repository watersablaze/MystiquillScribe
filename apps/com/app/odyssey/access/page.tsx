import styles from "./access.module.css";
import { AccessButton } from "./AccessButton";

export const dynamic = "force-dynamic";

export default async function OdysseyAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ entry?: string }>;
}) {
  const { entry } = await searchParams;

  return (
    <main className={styles.page}>
      {/* ───────── THRESHOLD ───────── */}
      <header className={styles.header}>
        <span className={styles.kicker}>Odyssey</span>
        <h1 className={styles.title}>Guided Editorial Access</h1>
        <p className={styles.subtitle}>
          Certain inscriptions are held within guided or
          patron-supported editorial spaces.
        </p>
      </header>

      <div className={styles.rail} />

      {/* ───────── BODY ───────── */}
      <section className={styles.body}>
        <p>
          This work is not locked for scarcity — it is held
          for care. Guided access sustains research,
          documentation, and long-form editorial practice.
        </p>

        <p className={styles.note}>
          Secure payment is processed via Paystack.
        </p>

        {entry ? (
          <>
            <AccessButton entry={entry} />
            <p className={styles.returnNote}>
              After access is granted, you will be returned
              to the inscription.
            </p>
          </>
        ) : (
          <p className={styles.returnNote}>
            No entry selected for access.
          </p>
        )}
      </section>

      <div className={styles.rail} />

      {/* ───────── FOOTER ───────── */}
      <footer className={styles.footer}>
        <p>
          Payments are processed securely. Full terms and
          access details are presented prior to confirmation.
        </p>
      </footer>
    </main>
  );
}