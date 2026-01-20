import Link from "next/link";
import styles from "./OdysseyIndexEntry.module.css";

type OdysseyIndexEntryProps = {
  slug: string;
  title: string;
  excerpt: string;
  createdAt: Date;

  accessType: "OPEN" | "GUIDED" | "PATRON";
  released: boolean;
};

export function OdysseyIndexEntry({
  slug,
  title,
  excerpt,
  createdAt,
  accessType,
  released,
}: OdysseyIndexEntryProps) {
  const isGuided = accessType === "GUIDED";
  const isPatron = accessType === "PATRON";
  const isHeld = isGuided && !released;

  const Wrapper = isHeld ? "div" : Link;
  const wrapperProps = isHeld ? {} : { href: `/odyssey/${slug}` };

  return (
    <Wrapper
      {...wrapperProps}
      className={[
        styles.entry,
        isHeld ? styles.held : "",
        isGuided && released ? styles.guided : "",
      ].join(" ")}
    >
      {/* Ember mark */}
      <span className={styles.ember} />

      {/* Body */}
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>

        {isHeld ? (
          <p className={styles.heldNote}>
            This inscription is currently held.
          </p>
        ) : (
          <p className={styles.excerpt}>{excerpt}</p>
        )}

        <div className={styles.meta}>
          <span className={styles.metaLabel}>Inscribed</span>
          <span className={styles.metaDate}>
            {createdAt.toLocaleDateString()}
          </span>

          {isGuided && (
            <span className={styles.accessMark}>
              {isHeld ? "Held" : "Guided"}
            </span>
          )}

          {isPatron && (
            <span className={styles.accessMark}>Patron</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}