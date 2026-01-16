import { NextResponse } from 'next/server';
import { mystiquillPrisma } from '@/lib/db/mystiquill';
import slugify from 'slugify';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const slug =
      body.slug?.trim() ||
      slugify(body.title || 'untitled', { lower: true, strict: true });

    // Normalize tags → comma-separated string (DB contract)
    const tags =
      typeof body.tags === 'string'
        ? body.tags
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
            .join(',')
        : '';

    const entry = await mystiquillPrisma.odysseyEntry.create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        category: body.category ?? null,
        tags,
        published: body.published ?? false,
      },
    });

    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: 'Failed to create entry' },
      { status: 500 }
    );
  }
}