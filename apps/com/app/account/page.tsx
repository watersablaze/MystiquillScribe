'use client';

import { signIn } from 'next-auth/react';

export default function AccountPage() {
  return (
    <main style={{ padding: '4rem', maxWidth: 480 }}>
      <h1>Sign In</h1>
      <p style={{ opacity: 0.7, marginBottom: '1.4rem' }}>
        Enter your email to receive a magic link.
      </p>

      <input
        type="email"
        id="email"
        placeholder="you@example.com"
        style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem' }}
      />

      <button
        onClick={() => {
          const email = (document.getElementById('email') as HTMLInputElement)
            ?.value;
          signIn('email', { email });
        }}
        style={{
          background: '#6c39d1',
          padding: '0.8rem',
          width: '100%',
          borderRadius: 6,
        }}
      >
        Send Magic Link
      </button>
    </main>
  );
}