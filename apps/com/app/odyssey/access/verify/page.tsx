import { redirect } from "next/navigation";
import styles from "./verify.module.css";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    reference?: string;
    entry?: string;
  }>;
};

export default async function VerifyAccessPage({
  searchParams,
}: PageProps) {
  const { reference, entry } = await searchParams;

  if (!reference || !entry) {
    redirect("/odyssey");
  }

  // Call internal verification endpoint
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/paystack/verify?reference=${reference}&entry=${entry}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>Verification Failed</h1>
        <p className={styles.text}>
          We could not confirm your payment. If funds were deducted,
          access will be restored shortly.
        </p>
      </main>
    );
  }

  // Success → redirect handled server-side by API
  redirect(`/odyssey/${entry}`);
}