// apps/com/app/(scribe)/scribe/page.tsx

import { getMystiquillPrisma } from "@/lib/db/mystiquill";
import Link from "next/link";
import styles from "./scribeIndex.module.css";

export const dynamic = "force-dynamic";

type Filter = "all" | "draft" | "sealed" | "archived";

type PageProps = {
  searchParams?: Promise<{
    filter?: Filter;
  }>;
};

export default async function ScribeIndex({ searchParams }: PageProps) {
  const resolved = (await searchParams) ?? {};
  const filter: Filter = resolved.filter ?? "all";
  const prisma = getMystiquillPrisma();

  const where =
    filter === "draft"
      ? { published: false, archived: false }
      : filter === "sealed"
      ? { published: true, archived: false }
      : filter === "archived"
      ? { archived: true }
      : {};

  const entries = await prisma.odysseyEntry.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      archived: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <main className={styles.scribeIndex}>
      {/* ===============================
         HEADER
         =============================== */}
      <header className={styles.scribeHeader}>
        <div className={styles.scribeHeaderTop}>
          <h1>Scribe Index</h1>

          <Link href="/scribe/new" className={styles.newEntry}>
            New Entry
          </Link>
        </div>

        <nav className={styles.scribeFilters}>
          {(["all", "draft", "sealed", "archived"] as Filter[]).map((f) => (
            <Link
              key={f}
              href={`/scribe?filter=${f}`}
              className={filter === f ? styles.active : ""}
            >
              {f}
            </Link>
          ))}
        </nav>
      </header>

      {/* ===============================
         LEDGER
         =============================== */}
      <section className={styles.scribeLedger}>
        <div className={styles.scribeLedgerHeader}>
          <span>Title</span>
          <span>Status</span>
          <span>Timeline</span>
          <span>Actions</span>
        </div>

        {entries.length === 0 && (
          <p className={styles.empty}>No entries found.</p>
        )}

        {entries.map((entry) => (
          <div key={entry.id} className={styles.scribeLedgerRow}>
            {/* Title */}
            <div className={styles.ledgerTitle}>
              <Link href={`/scribe/edit/${entry.slug}`}>
                <strong>{entry.title}</strong>
                <span className={styles.slug}>/{entry.slug}</span>
              </Link>
            </div>

            {/* Status */}
            <div className={styles.ledgerStatus}>
              {entry.archived
                ? "Archived"
                : entry.published
                ? "Sealed"
                : "Draft"}
            </div>

            {/* Timeline */}
            <div className={styles.ledgerDate}>
              <span className={styles.origin}>
                Created{" "}
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
              <span className={styles.updated}>
                Updated{" "}
                {new Date(entry.updatedAt).toLocaleDateString()}
              </span>
            </div>

            {/* Actions */}
            <div className={styles.ledgerActions}>
              <Link href={`/scribe/edit/${entry.slug}`}>Edit</Link>

              {entry.published && (
                <Link href={`/odyssey/${entry.slug}`}>View</Link>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}