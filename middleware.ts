// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const COM_HOSTS = ["mystiquill.com", "www.mystiquill.com"];
const XYZ_HOSTS = ["mystiquill.xyz", "www.mystiquill.xyz"];

// In local dev, treat localhost as .com by default.
// Flip this to test xyz locally: set TREAT_LOCAL_AS="xyz"
const LOCAL = ["localhost:3000", "127.0.0.1:3000"];
const TREAT_LOCAL_AS = (process.env.TREAT_LOCAL_AS ?? "com").toLowerCase();

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const path = url.pathname;

  const isLocal = LOCAL.includes(host);
  const isCom = isLocal ? TREAT_LOCAL_AS === "com" : COM_HOSTS.some(h => host.endsWith(h));
  const isXyz = isLocal ? TREAT_LOCAL_AS === "xyz" : XYZ_HOSTS.some(h => host.endsWith(h));

  // .com should not serve sanctum sections
  if (isCom) {
    if (path.startsWith("/codex") || path.startsWith("/altar") || path.startsWith("/odyssey") || path.startsWith("/account")) {
      const target = `https://mystiquill.xyz${path}${url.search}`;
      return NextResponse.redirect(target, 308);
    }
    return NextResponse.next();
  }

  // .xyz should not serve public-only sections
  if (isXyz) {
    if (path.startsWith("/essays")) {
      const target = `https://mystiquill.com${path}${url.search}`;
      return NextResponse.redirect(target, 308);
    }
    return NextResponse.next();
  }

  // Unknown host → allow (useful for previews & vercel domains)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|assets).*)"]
};