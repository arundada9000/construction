'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    // @ts-expect-error Tag is a valid HTML tag
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split('').map((char, ci) => {
            const index = words.slice(0, wi).join('').length + ci;
            return (
              <span
                key={ci}
                className="inline-block"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0) rotate(0)' : 'translateY(12px) rotate(2deg)',
                  transition: `opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay + index * 25}ms, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay + index * 25}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
