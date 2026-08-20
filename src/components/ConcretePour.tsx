'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { playRumble } from '@/lib/haptics';

export default function ConcretePour({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [animating, setAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      if (!reducedMotion) {
        setAnimating(true);
        playRumble();
        const timer = setTimeout(() => setAnimating(false), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, reducedMotion]);

  return (
    <>
      {children}

      {animating && (
        <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #78716c, #57534e 40%, #44403c 80%, transparent)',
              animation: 'concretePour 500ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
            }}
          />
        </div>
      )}
    </>
  );
}
