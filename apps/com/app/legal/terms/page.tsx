// apps/com/app/(mystiquill)/legal/terms/page.tsx
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs tracking-[0.22em] uppercase opacity-60">Mystiquill</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-base opacity-80 leading-relaxed">
          These terms describe how Mystiquill works and what you agree to when using the platform.
        </p>
      </header>

      <section className="space-y-8 opacity-90 leading-relaxed">
        <div>
          <h2 className="text-lg font-medium">About Mystiquill</h2>
          <p className="mt-2">
            Mystiquill is a creative and cultural platform offering original writing, guided journeys,
            and select creative services.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Participation and payments</h2>
          <p className="mt-2">
            Some offerings may be free, while others may be paid. Details are provided clearly before participation
            or purchase. When payments are enabled, they are handled by third-party payment providers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Content and usage</h2>
          <p className="mt-2">
            All content is provided for informational, creative, and educational purposes. It should not be considered
            professional, legal, financial, or medical advice.
          </p>
          <p className="mt-2">
            You agree not to misuse the platform, interfere with its operation, or use it for unlawful purposes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Updates</h2>
          <p className="mt-2">
            Mystiquill may update offerings or these terms as the platform evolves. Continued use of the platform
            indicates acceptance of any updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="mt-2">
            Questions can be directed to{" "}
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
          <Link href="/legal/privacy" className="hover:opacity-100">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </main>
  );
}