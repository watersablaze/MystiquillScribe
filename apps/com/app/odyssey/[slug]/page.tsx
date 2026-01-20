import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { getMystiquillPrisma } from "@/lib/db/mystiquill";
import styles from "./entry.module.css";

import { ContributePanel } from "../components/ContributePanel";
import HeldInscription from "../components/HeldInscription";

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
    .map((l) => l.trim())
    .filter(Boolean);

  const bulletLines = lines.filter((l) => l.startsWith("- "));
  if (!bulletLines.length) {
    return `<p>${escapeHtml(input)}</p>`;
  }

  const items = bulletLines
    .map((l) => l.replace(/^-+\s*/, "").trim())
    .map((t) => `<li>${escapeHtml(t)}</li>`)
    .join("");

  return `<ul>${items}</ul>`;
}

/* ----------------------------------------
   Page
----------------------------------------- */

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OdysseyEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const prisma = getMystiquillPrisma();

  const entry = await prisma.odysseyEntry.findUnique({
    where: { slug },
  });

  if (!entry || !entry.published) return notFound();

  const isOpen = entry.accessType === "OPEN";
  const isGuided = entry.accessType === "GUIDED";
  const isPatron = entry.accessType === "PATRON";
  const isReleased = Boolean(entry.publishedAt);

  const cookieStore = await cookies();
  const viewerEmail = cookieStore.get("mq_odyssey_email")?.value ?? null;

  const verifiedAccess = viewerEmail
    ? await prisma.odysseyAccess.findFirst({
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
    : undefined;

  /* ----------------------------------------
     MODE RESOLUTION
  ----------------------------------------- */

  const mode: "held" | "guided" | "patron" =
    isPatron ? "patron" : isGuided && !isReleased ? "held" : "guided";

  return (
    <main
      className={[
        styles.page,
        isGuided ? styles.guidedPage : "",
        isPatron ? styles.patronPage : "",
      ].join(" ")}
    >
      {/* ===============================
          HEADER
      =============================== */}
      <header className={styles.header}>
        <span className={styles.kicker}>A Scribe’s Odyssey</span>
        <h1 className={styles.title}>{entry.title}</h1>
      </header>

      {/* ===============================
          HELD / GUIDED / PATRON
      =============================== */}
      {!hasAccess && (isGuided || isPatron) && (
        <HeldInscription
          mode={mode}
          released={isReleased}
          metaHtml={guidedMetaHtml}
        />
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