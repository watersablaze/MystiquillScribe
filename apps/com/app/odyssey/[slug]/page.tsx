import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { mystiquillPrisma } from "@/lib/db/mystiquill";
import styles from "./entry.module.css";

import { ContributePanel } from "../components/ContributePanel";
import { AccessButton } from "../access/AccessButton";

export const dynamic = "force-dynamic";

/* ----------------------------------------
Minimal bullet parser
----------------------------------------- */

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bulletsToHtml(input: string) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const bulletLines = lines.filter(l => l.startsWith("- "));
  if (!bulletLines.length) {
    return `<p>${escapeHtml(input)}</p>`;
  }

  const items = bulletLines
    .map(l => l.replace(/^-+\s*/, "").trim())
    .map(t => `<li>${escapeHtml(t)}</li>`)
    .join("");

  return `<ul>${items}</ul>`;
}

/* ----------------------------------------
Page
----------------------------------------- */

export default async function OdysseyEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await mystiquillPrisma.odysseyEntry.findUnique({
    where: { slug: params.slug },
  });

  if (!entry || !entry.published) return notFound();

  const isOpen = entry.accessType === "OPEN";
  const isGuided = entry.accessType === "GUIDED";
  const isPatron = entry.accessType === "PATRON";

  const cookieStore = await cookies();
  const viewerEmail = cookieStore.get("mq_odyssey_email")?.value ?? null;

  const verifiedAccess = viewerEmail
    ? await mystiquillPrisma.odysseyAccess.findFirst({
        where: {
          entrySlug: entry.slug,
          email: viewerEmail,
          verified: true,
        },
        select: { id: true },
      })
    : null;

  const hasAccess = isOpen || Boolean(verifiedAccess);

  const guidedMetaHtml = entry.guidedMeta
    ? bulletsToHtml(entry.guidedMeta)
    : null;

  return (
    <main className={styles.page}>

      {/* ===============================
      HEADER
      =============================== */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.kicker}>A Scribe’s Odyssey</span>
          <h1 className={styles.title}>{entry.title}</h1>
        </div>
      </header>

      {/* ===============================
      GUIDED THRESHOLD
      =============================== */}
      {!hasAccess && isGuided && (
        <section className={styles.guidedOuter}>
          <div className={styles.guidedGrid}>

            <div className={styles.guidedPrimary}>
              <p className={styles.guidedIntro}>
                {entry.guidedIntro ??
                  "This entry unfolds through guided editorial access."}
              </p>
            </div>

            <div className={styles.guidedDivider} />

            <div className={styles.guidedSecondary}>
              {entry.guidedTitle && (
                <>
                  <span className={styles.guidedTitle}>
                    {entry.guidedTitle}
                  </span>
                </>
              )}

              {guidedMetaHtml && (
                <div
                  className={styles.guidedMeta}
                  dangerouslySetInnerHTML={{ __html: guidedMetaHtml }}
                />
              )}
            </div>

            <div className={styles.guidedAction}>
              <AccessButton entry={entry.slug} />
              <span className={styles.paymentNote}>
                You’ll be redirected, then returned here.
              </span>
            </div>

            <div className={styles.guidedFoot}>
              Access is offered in alignment — sustaining work held with care
              and accountability.
            </div>

          </div>
        </section>
      )}

      {/* ===============================
      BODY
      =============================== */}
      {hasAccess && (
        <article className={styles.body}>
          <div dangerouslySetInnerHTML={{ __html: entry.content }} />
          {isPatron && <ContributePanel />}
        </article>
      )}

    </main>
  );
}