import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function OdysseyAccessReturnPage({
  searchParams,
}: {
  searchParams: { reference?: string; entry?: string };
}) {
  const { reference, entry } = searchParams;

  if (!reference || !entry) {
    redirect("/odyssey");
  }

  redirect(
    `/api/paystack/verify?reference=${reference}&entry=${entry}`
  );
}