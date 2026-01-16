"use client";

import Link from "next/link";

export default function Nav({
  variant,
}: {
  variant: "public" | "sanctum";
}) {
  return (
    <nav className="mt-6 flex justify-center gap-6 text-sm opacity-80">
      {variant === "public" ? (
        <>
          <Link href="/odyssey">Odyssey</Link>
          <Link href="/scribe/new">Write</Link>
          <a
            href="https://mystiquill.xyz"
            className="rounded px-3 py-1 border border-[var(--ember-accent)]/40"
          >
            Enter the Sanctum
          </a>
        </>
      ) : (
        <>
          <Link href="/codex">Codex</Link>
          <Link href="/altar">Altar</Link>
          <Link href="/odyssey">Odyssey</Link>
          <Link href="/account">Account</Link>
        </>
      )}
    </nav>
  );
}