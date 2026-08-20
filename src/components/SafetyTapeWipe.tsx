'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SafetyTapeWipe({ children }: { children: React.ReactNode }) {
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
        const timer = setTimeout(() => setAnimating(false), 450);
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
            style={{ animation: 'tapeWipe 450ms cubic-bezier(0.65, 0, 0.35, 1) forwards' }}
          >
            {/* Safety tape stripe */}
            <div
              className="absolute inset-x-0 h-16 top-1/2 -translate-y-1/2"
              style={{
                background: 'repeating-linear-gradient(-45deg, #eab308, #eab308 12px, #1c1c1e 12px, #1c1c1e 24px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 -4px 24px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
