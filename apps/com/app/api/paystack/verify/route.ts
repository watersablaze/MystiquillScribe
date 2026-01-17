// apps/com/app/api/paystack/verify/route.ts

import { NextResponse } from 'next/server';
import { getMystiquillPrisma } from "@/lib/db/mystiquill";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function GET(req: Request) {
  if (!PAYSTACK_SECRET) {
    return NextResponse.json(
      { error: 'PAYSTACK_SECRET_KEY is not set' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');
  const entrySlug = searchParams.get('entry');

  if (!reference || !entrySlug) {
    return NextResponse.json(
      { error: 'Missing parameters' },
      { status: 400 }
    );
  }

  const prisma = getMystiquillPrisma();

  // 1) Verify with Paystack
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    console.error('Paystack verify HTTP error', res.status);
    return NextResponse.json(
      { error: 'Paystack verification failed' },
      { status: 502 }
    );
  }

  const data = await res.json();

  if (data?.data?.status !== 'success') {
    return NextResponse.json(
      { error: 'Payment not verified' },
      { status: 402 }
    );
  }

  const email: string | undefined = data?.data?.customer?.email;

  if (!email) {
    return NextResponse.json(
      { error: 'Missing customer email' },
      { status: 500 }
    );
  }

  // 2) Persist verified access
  await prisma.odysseyAccess.upsert({
    where: { reference },
    update: {
      verified: true,
      email,
      entrySlug,
      accessType: 'GUIDED',
    },
    create: {
      reference,
      entrySlug,
      email,
      accessType: 'GUIDED',
      verified: true,
    },
  });

  // 3) Redirect + set cookie
  const response = NextResponse.redirect(
    new URL(`/odyssey/${entrySlug}`, req.url)
  );

  response.cookies.set('mq_odyssey_email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}