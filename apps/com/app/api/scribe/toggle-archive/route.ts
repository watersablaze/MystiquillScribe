import { NextResponse } from 'next/server';
import { getMystiquillPrisma } from '@/lib/db/mystiquill';

export async function POST(req: Request) {
  const form = await req.formData();
  const id = form.get('id') as string | null;

  if (!id) {
    return NextResponse.json(
      { error: 'Missing id' },
      { status: 400 }
    );
  }

  const entry = await mystiquillPrisma.odysseyEntry.findUnique({
    where: { id },
    select: { archived: true },
  });

  if (!entry) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  await mystiquillPrisma.odysseyEntry.update({
    where: { id },
    data: { archived: !entry.archived },
  });

  return NextResponse.redirect('/scribe');
}