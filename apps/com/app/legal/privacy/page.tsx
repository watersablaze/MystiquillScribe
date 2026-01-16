// apps/com/app/(mystiquill)/legal/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs tracking-[0.22em] uppercase opacity-60">Mystiquill</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-base opacity-80 leading-relaxed">
          We respect your privacy. This policy explains what we collect and how we use it.
        </p>
      </header>

      <section className="space-y-8 opacity-90 leading-relaxed">
        <div>
          <h2 className="text-lg font-medium">What we collect</h2>
          <p className="mt-2">
            Mystiquill may collect basic information you choose to share, such as your name, email address,
            and messages submitted through forms or correspondence.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">How we use information</h2>
          <p className="mt-2">
            We use information to communicate with you, provide requested services or access, and improve the platform.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Payments</h2>
          <p className="mt-2">
            When payments are enabled, they are processed securely by third-party payment providers.
            Mystiquill does not store or have access to your full payment details.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Sharing</h2>
          <p className="mt-2">
            Mystiquill does not sell personal information. We may share information with service providers strictly
            as needed to operate the platform (for example, payment processors), or when required by law.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="mt-2">
            Questions about privacy can be directed to{" "}
            <a className="underline underline-offset-4" href="mailto:contact@mystiquill.com">
              contact@mystiquill.com
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-8 text-sm opacity-70">
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:opacity-100">
            Home
          </Link>
          <Link href="/legal/terms" className="hover:opacity-100">
            Terms of Service
          </Link>
        </div>
      </footer>
    </main>
  );
}