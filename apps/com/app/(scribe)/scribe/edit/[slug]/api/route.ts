import { getMystiquillPrisma } from '@/lib/db/mystiquill';
import { NextResponse } from "next/server";

/**
 * Helper to extract `[slug]` from:
 * /scribe/edit/[slug]/api
 */
function extractSlug(request: Request): string | null {
  const { pathname } = new URL(request.url);
  const parts = pathname.split("/").filter(Boolean);

  const apiIndex = parts.lastIndexOf("api");
  if (apiIndex < 1) return null;

  return parts[apiIndex - 1] ?? null;
}

export async function GET(request: Request) {
  const prisma = getMystiquillPrisma(); // ✅ ADD THIS

  const slug = extractSlug(request);

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const entry = await prisma.odysseyEntry.findUnique({ // ✅ FIXED
    where: { slug },
  });

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  return NextResponse.json({ entry });
}

export async function POST(request: Request) {
  const prisma = getMystiquillPrisma(); // ✅ ADD THIS

  const slugParam = extractSlug(request);

  if (!slugParam) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const form = await request.formData();

  const title = (form.get("title") as string | null)?.trim() ?? "";
  const content = (form.get("content") as string | null)?.trim() ?? "";

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const slugRaw = (form.get("slug") as string | null)?.trim() ?? "";
  const slug =
    slugRaw ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const published = Boolean(form.get("published"));

  await prisma.odysseyEntry.update({ // ✅ FIXED
    where: { slug: slugParam },
    data: {
      title,
      slug,
      content,
      published,
    },
  });

  return NextResponse.json({ ok: true });
}