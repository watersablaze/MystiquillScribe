import { mystiquillPrisma } from '@/lib/db/mystiquill';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const entry = await mystiquillPrisma.odysseyEntry.findUnique({
    where: { slug: params.slug },
  });

  return NextResponse.json({ entry });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const form = await req.formData();

  const title = (form.get('title') as string).trim();
  const content = (form.get('content') as string).trim();

  const slugRaw = (form.get('slug') as string | null) ?? '';
  const slug =
    slugRaw.trim() ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const published = Boolean(form.get('published'));

  await mystiquillPrisma.odysseyEntry.update({
    where: { slug: params.slug },
    data: {
      title,
      slug,
      content,
      published,
    },
  });

  return NextResponse.json({ ok: true });
}