// apps/com/app/odyssey/access/return/page.tsx

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getMystiquillPrisma } from '@/lib/db/mystiquill';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{
    reference?: string;
    entry?: string;
  }>;
};

export default async function PaystackReturnPage({ searchParams }: PageProps) {
  const { reference, entry } = await searchParams;

  if (!reference || !entry || !PAYSTACK_SECRET) {
    redirect(`/odyssey/${entry ?? ''}`);
  }

  // Verify transaction with Paystack
  const verifyRes = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
      cache: 'no-store',
    }
  );

  const verifyJson = await verifyRes.json();

  if (!verifyRes.ok || verifyJson?.data?.status !== 'success') {
    redirect(`/odyssey/${entry}`);
  }

  const prisma = getMystiquillPrisma();

  const access = await prisma.odysseyAccess.update({
    where: { reference },
    data: { verified: true },
  });

  // Set access cookie (used by OdysseyEntryPage)
  const cookieStore = await cookies();

  cookieStore.set('mq_odyssey_email', access.email, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  redirect(`/odyssey/${entry}`);
}