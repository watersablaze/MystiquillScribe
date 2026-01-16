export const DOMAINS = {
  COM: process.env.SITE_URL_COM ?? "https://mystiquill.com",
  XYZ: process.env.SITE_URL_XYZ ?? "https://mystiquill.xyz"
};

export function isSanctum(host?: string) {
  if (!host) return false;
  return host.includes("mystiquill.xyz");
}

export function isPublicSite(host?: string) {
  if (!host) return true;
  return host.includes("mystiquill.com");
}