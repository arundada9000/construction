'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { playClink } from '@/lib/haptics';

export default function CraneTransition({ children }: { children: React.ReactNode }) {
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
        playClink();
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
          {/* Cable */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-brand/80 via-brand to-brand/0"
            style={{
              animation: 'craneCableDrop 500ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
              transformOrigin: 'top center',
            }}
          />

          {/* Hook */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              animation: 'craneHookDrop 500ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
            }}
          >
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
              {/* Cable end */}
              <line x1="12" y1="0" x2="12" y2="10" stroke="var(--brand)" strokeWidth="1.5" />
              {/* Hook body */}
              <path
                d="M12 10 C12 10, 6 10, 6 16 C6 22, 12 24, 12 24 C12 24, 18 22, 18 16 C18 10, 12 10, 12 10Z"
                stroke="var(--brand)"
                strokeWidth="1.5"
                fill="var(--brand-light)"
              />
              {/* Hook tip */}
              <circle cx="12" cy="26" r="2" fill="var(--brand)" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
