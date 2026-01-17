// apps/com/app/api/scribe/toggle-archive/route.ts

import { NextResponse } from 'next/server';
import { getMystiquillPrisma } from "@/lib/db/mystiquill";

export async function POST(req: Request) {
  const form = await req.formData();
  const id = form.get('id') as string | null;

  if (!id) {
    return NextResponse.json(
      { error: 'Missing id' },
      { status: 400 }
    );
  }

  const prisma = getMystiquillPrisma();

  const entry = await prisma.odysseyEntry.findUnique({
    where: { id },
    select: { archived: true },
  });

  if (!entry) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  await prisma.odysseyEntry.update({
    where: { id },
    data: { archived: !entry.archived },
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    new URL(req.url).origin;

  return NextResponse.redirect(`${baseUrl}/scribe`);
}