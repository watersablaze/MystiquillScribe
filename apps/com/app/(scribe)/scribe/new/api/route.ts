import { getMystiquillPrisma } from '@/lib/db/mystiquill';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();

  const title = (form.get("title") as string | null)?.trim();
  const content = (form.get("content") as string | null)?.trim();

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

  const prisma = getMystiquillPrisma();

  await prisma.odysseyEntry.create({
    data: { title, slug, content, published },
  });

  return NextResponse.json({ ok: true });
}