'use client';

import styles from './accessButton.module.css';

export function AccessButton({ entry }: { entry: string }) {
  const handleClick = async () => {
    const res = await fetch('/api/paystack/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'mayasvisions@proton.me', // temporary
        amount: 2500_00, // ZAR 250.00
        entry,
      }),
    });

    const data = await res.json();

    if (data.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      alert('Payment initialization failed.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.sealButton}
    >
      <span className={styles.sealText}>
        Unlock Guided Access
      </span>
      <span className={styles.sealMeta}>
        Paystack · One-time
      </span>
    </button>
  );
}