import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    reference?: string;
    entry?: string;
  }>;
};

export default async function OdysseyAccessReturnPage({
  searchParams,
}: PageProps) {
  const { reference, entry } = await searchParams;

  if (!reference || !entry) {
    redirect("/odyssey");
  }

  redirect(
    `/api/paystack/verify?reference=${reference}&entry=${entry}`
  );
}