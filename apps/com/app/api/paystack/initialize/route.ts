// apps/com/app/api/paystack/initialize/route.ts

import { NextResponse } from 'next/server';
import { getMystiquillPrisma } from "@/lib/db/mystiquill";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    if (!PAYSTACK_SECRET) {
      return NextResponse.json(
        { error: 'PAYSTACK_SECRET_KEY is not set' },
        { status: 500 }
      );
    }

    if (!BASE_URL) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_BASE_URL is not set' },
        { status: 500 }
      );
    }

    const body = await req.json();

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const entry = typeof body.entry === 'string' ? body.entry.trim() : '';
    const amount = typeof body.amount === 'number' ? body.amount : NaN;

    if (!email || !entry || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Missing or invalid fields: email, entry, amount' },
        { status: 400 }
      );
    }

    // Paystack expects amount in the smallest currency unit
    // (kobo for NGN, cents for ZAR). Amount must already be multiplied.
    const callback_url = `${BASE_URL}/odyssey/access/return?entry=${encodeURIComponent(
      entry
    )}`;

    const paystackRes = await fetch(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount,
          callback_url,
          metadata: {
            entry,
            purpose: 'odyssey_guided_access',
            accessType: 'GUIDED',
          },
        }),
        cache: 'no-store',
      }
    );

    const paystackJson = await paystackRes.json();

    if (!paystackRes.ok || !paystackJson?.status || !paystackJson?.data) {
      return NextResponse.json(
        {
          error: 'Paystack initialization failed',
          paystack: paystackJson,
        },
        { status: 502 }
      );
    }

    const reference: string | undefined = paystackJson.data.reference;

    // Create a pending access record (audit-safe)
    if (reference) {
      const prisma = getMystiquillPrisma();

      await prisma.odysseyAccess.upsert({
        where: { reference },
        update: {
          entrySlug: entry,
          email,
          accessType: 'GUIDED',
        },
        create: {
          reference,
          entrySlug: entry,
          email,
          accessType: 'GUIDED',
          verified: false,
        },
      });
    }

    return NextResponse.json({
      authorization_url: paystackJson.data.authorization_url,
      access_code: paystackJson.data.access_code,
      reference: paystackJson.data.reference,
    });
  } catch (err) {
    console.error('[Paystack Init Error]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}