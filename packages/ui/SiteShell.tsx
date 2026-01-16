// packages/ui/SiteShell.tsx
import React from 'react';
import Nav from './Nav';

export type SiteShellMode = 'default' | 'odyssey' | 'scribe';

type SiteShellProps = {
  children: React.ReactNode;
  mode?: SiteShellMode;
};

export default function SiteShell({
  children,
  mode = 'default',
}: SiteShellProps) {
  const isOdyssey = mode === 'odyssey';
  const isScribe = mode === 'scribe';

  const bg = isOdyssey || isScribe ? '#0f0d12' : '#f8f5ef';
  const fg =
    isOdyssey || isScribe
      ? 'rgba(255,245,235,0.92)'
      : '#1a1623';

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: bg, color: fg }}
    >
      {/* ===============================
         HEADER
         =============================== */}

      {/* PUBLIC + ODYSSEY HEADER */}
      {!isScribe && (
        <header
          className={`relative overflow-hidden ${
            isOdyssey ? 'pt-24 pb-20' : 'pt-10 pb-8'
          }`}
        >
          {/* Odyssey atmosphere */}
          {isOdyssey && (
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background: `
                  radial-gradient(
                    ellipse at center 30%,
                    rgba(199,155,90,0.18),
                    transparent 60%
                  ),
                  linear-gradient(
                    to bottom,
                    #0f0d12,
                    #16131c
                  )
                `,
              }}
            />
          )}

          {/* Public site header */}
          {!isOdyssey && (
            <div className="mx-auto max-w-6xl px-6 text-center">
              <h1 className="text-4xl font-medium tracking-[0.04em]">
                Mystiquill
              </h1>

              <p className="mt-2 text-sm text-[var(--gold)]">
                The Public Gate
              </p>

              <div className="mt-6">
                <Nav variant="public" />
              </div>
            </div>
          )}

          {/* Odyssey divider */}
          {isOdyssey && (
            <div
              className="mx-auto h-px w-28"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(199,155,90,0.6), transparent)',
              }}
            />
          )}
        </header>
      )}

      {/* ===============================
         SCRIBE HEADER (quiet, orienting)
         =============================== */}
      {isScribe && (
        <>
          <header
            className="relative flex items-center justify-center"
            style={{
              height: '64px',
              letterSpacing: '0.18em',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              opacity: 0.85,
            }}
          >
            <div
              className="flex items-center gap-3"
              style={{ color: 'rgba(199,155,90,0.65)' }}
            >
              <span>The Scribe’s Sanctum</span>

              {/* subtle divider */}
              <span style={{ opacity: 0.4 }}>·</span>

              {/* ENTRY STATE SLOT */}
              <span
                id="scribe-entry-state"
                style={{
                  opacity: 0.75,
                  transition: 'opacity 0.3s ease',
                }}
              >
                New Entry
              </span>
            </div>
          </header>

          {/* Silent veil below header */}
          <div
            aria-hidden
            style={{
              height: '32px',
              background: `
                radial-gradient(
                  ellipse at top,
                  rgba(199,155,90,0.10),
                  transparent 60%
                )
              `,
            }}
          />
        </>
      )}

      {/* ===============================
         CONTENT
         =============================== */}
      <main className="flex-1 w-full">{children}</main>

      {/* ===============================
         FOOTER
         =============================== */}
      <footer
        className="px-6 py-6 text-center text-xs"
        style={{ opacity: isScribe ? 0.22 : 0.6 }}
      >
        © {new Date().getFullYear()} Ma’yá — All rites reserved.
      </footer>
    </div>
  );
}