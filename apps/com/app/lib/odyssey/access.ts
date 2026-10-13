// lib/odyssey/access.ts
import type { OdysseyEntry } from "@prisma/client";

export function getOdysseyState(entry: Pick<OdysseyEntry, "accessType" | "publishedAt">, hasAccess: boolean) {
  const isReleased = Boolean(entry.publishedAt);

  if (entry.accessType === "OPEN") return "OPEN";
  if (entry.accessType === "GUIDED" && !isReleased) return "GUIDED_SEALED";
  if (entry.accessType === "GUIDED" && !hasAccess) return "GUIDED_ACTIVE";
  if (entry.accessType === "GUIDED" && hasAccess) return "GUIDED_UNLOCKED";
  if (entry.accessType === "PATRON" && !hasAccess) return "PATRON_LOCKED";
  if (entry.accessType === "PATRON" && hasAccess) return "PATRON_UNLOCKED";

  return "UNKNOWN";
}