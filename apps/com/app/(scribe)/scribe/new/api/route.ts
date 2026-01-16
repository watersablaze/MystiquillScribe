import { getMystiquillPrisma } from '@/lib/db/mystiquill';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();

  const title = (form.get('title') as string).trim();
  const content = (form.get('content') as string).trim();

  const slugRaw = (form.get('slug') as string | null) ?? '';
  const slug =
    slugRaw.trim() ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const published = Boolean(form.get('published'));

const prisma = getMystiquillPrisma();
const entry = await prisma.odysseyEntry.findMany();

  await mystiquillPrisma.odysseyEntry.create({
    data: {
      title,
      slug,
      content,
      published,
    },
  });

  return NextResponse.json({ ok: true });
}