'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ScrollToTop() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
