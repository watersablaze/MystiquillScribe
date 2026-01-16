import { NextResponse } from 'next/server';
import { mystiquillPrisma } from '@/lib/db/mystiquill';

function makeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseTags(tags: unknown): string | null {
  if (Array.isArray(tags)) {
    const joined = tags.map(String).map(t => t.trim()).filter(Boolean).join(',');
    return joined || null;
  }

  if (typeof tags === 'string') {
    const cleaned = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .join(',');
    return cleaned || null;
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      title,
      slug,
      content,
      category,
      tags,
      published,
      archived,

      accessType,
      guidedIntro,
      guidedMeta,
      guidedTitle,
      guidedImageUrl,
      heroImage,
    } = body as {
      id?: string | null;
      title?: string;
      slug?: string;
      content?: string;
      category?: string;
      tags?: unknown;
      published?: boolean;
      archived?: boolean;

      accessType?: 'OPEN' | 'PATRON' | 'GUIDED';
      guidedIntro?: string;
      guidedMeta?: string;
      guidedTitle?: string;
      guidedImageUrl?: string;
      heroImage?: string;
    };

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const finalSlug = slug?.trim()
      ? makeSlug(slug)
      : makeSlug(title);

    const tagString = parseTags(tags);

    let entry;

    /* ===============================
       UPDATE (ID-based, revision-aware)
       =============================== */
    if (id) {
      const existing = await mystiquillPrisma.odysseyEntry.findUnique({
        where: { id },
      });

      if (!existing) {
        return NextResponse.json(
          { error: 'Entry not found' },
          { status: 404 }
        );
      }

      // Capture revision only if already published
      if (existing.published) {
        await mystiquillPrisma.odysseyRevision.create({
          data: {
            entryId: existing.id,
            title: existing.title,
            content: existing.content,
          },
        });
      }

      entry = await mystiquillPrisma.odysseyEntry.update({
        where: { id },
        data: {
          title,
          slug: finalSlug,
          content,
          category: category || null,
          tags: tagString,

          archived: Boolean(archived),
          published: Boolean(published),
          publishedAt:
            published && !existing.published
              ? new Date()
              : existing.publishedAt,

          accessType: accessType ?? 'OPEN',
          guidedIntro: guidedIntro || null,
          guidedMeta: guidedMeta || null,
          guidedTitle: guidedTitle || null,
          guidedImageUrl: guidedImageUrl || null,
          heroImage: heroImage || null,
        },
      });
    }

    /* ===============================
       CREATE
       =============================== */
    else {
      entry = await mystiquillPrisma.odysseyEntry.create({
        data: {
          title,
          slug: finalSlug,
          content,
          category: category || null,
          tags: tagString,

          archived: Boolean(archived),
          published: Boolean(published),
          publishedAt: published ? new Date() : null,

          accessType: accessType ?? 'OPEN',
          guidedIntro: guidedIntro || null,
          guidedMeta: guidedMeta || null,
          guidedTitle: guidedTitle || null,
          guidedImageUrl: guidedImageUrl || null,
          heroImage: heroImage || null,
        },
      });
    }

    return NextResponse.json({ entry });
  } catch (err) {
    console.error('SCRIBE SAVE ERROR:', err);
    return NextResponse.json(
      { error: 'Save failed' },
      { status: 500 }
    );
  }
}