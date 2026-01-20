import styles from "./HeldInscription.module.css";

type HeldInscriptionProps = {
  mode: "held" | "guided" | "patron";
  released: boolean;
  title?: string;
  metaHtml?: string;
};

export default function HeldInscription({
  mode,
  released,
  title,
  metaHtml,
}: HeldInscriptionProps) {
  const label =
    mode === "held"
      ? "Held Inscription"
      : mode === "guided"
      ? "Guided Inscription"
      : "Patron Inscription";

  return (
    <section className={styles.outer}>
      <div className={styles.inner}>
        {/* STAMP / LABEL */}
        <span className={styles.label}>{label}</span>

        {/* CORE STATEMENT */}
        <div className={styles.statement}>
          {mode === "held" && !released && (
            <>
              <p className={styles.statementLead}>
                This inscription is currently held in trust.
              </p>
              <p className={styles.statementBody}>
                It emerges from lived presence and careful witnessing. The
                material gathered here is not yet released for open reading.
              </p>
            </>
          )}

          {mode === "guided" && released && (
            <p className={styles.statementBody}>
              This entry unfolds through guided editorial access, preserving
              context, dignity, and relational truth.
            </p>
          )}

          {mode === "patron" && (
            <p className={styles.statementBody}>
              This inscription is sustained through patron-supported access,
              enabling long-form work and archival continuity.
            </p>
          )}
        </div>

        {/* META TITLE */}
        {metaHtml && (
          <span className={styles.metaTitle}>
            What this holding protects
          </span>
        )}

        {/* META — CURATED MARGINS */}
        {metaHtml && (
          <div
            className={styles.meta}
            dangerouslySetInnerHTML={{ __html: metaHtml }}
          />
        )}

        {/* FOOT */}
        <div className={styles.foot}>
          {mode === "held" && "Presence is part of the archive."}
          {mode === "guided" && "Guided access supports intentional release."}
          {mode === "patron" && "Patron access sustains shared stewardship."}
        </div>
      </div>
    </section>
  );
}