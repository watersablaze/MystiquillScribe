// app/lib/useVeilSilence.ts
'use client';

import { useEffect, useState } from 'react';

export function useVeilSilence(threshold = 120) {
  const [silent, setSilent] = useState(false);

  useEffect(() => {
    function onScroll() {
      setSilent(window.scrollY > threshold);
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return silent;
}