'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname.startsWith('/ne') ? 'ne' : 'en';

  const content = lang === 'ne'
    ? {
        code: '४०४',
        title: 'यो पृष्ठ अझै निर्माणाधीन छ',
        joke: 'हाम्रा इन्जिनियरहरूले यो पृष्ठको नक्सा नै गुमाएका छन्।',
        sub: 'वा सम्भवतः यो कहिल्यै बनेकै थिएन। 🤷',
        home: 'होम पेज',
        back: 'अघि जानुहोस्',
      }
    : {
        code: '404',
        title: 'This page is still under construction',
        joke: "Our engineers misplaced the blueprint for this page.",
        sub: 'Or maybe it was never built in the first place. 🤷',
        home: 'Go Home',
        back: 'Go Back',
      };

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Crane animation */}
      <div className="relative h-40 w-40">
        {/* Crane base */}
        <svg viewBox="0 0 160 160" fill="none" className="h-full w-full">
          {/* Vertical beam */}
          <rect x="74" y="40" width="12" height="110" fill="var(--brand)" rx="2" />
          {/* Horizontal beam */}
          <rect x="30" y="38" width="110" height="10" fill="var(--brand)" rx="2" />
          {/* Support diagonal */}
          <line x1="80" y1="48" x2="130" y2="38" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round" />
          <line x1="80" y1="48" x2="38" y2="38" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round" />
          {/* Base */}
          <rect x="55" y="148" width="50" height="8" fill="var(--brand)" rx="3" />
          {/* Pulley rope */}
          <line x1="40" y1="48" x2="40" y2="90" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="4 3">
            <animate attributeName="y2" values="80;110;80" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Swinging hook */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-5 40 48;5 40 48;-5 40 48"
              dur="2s"
              repeatCount="indefinite"
            />
            <circle cx="40" cy="90" r="4" fill="var(--muted-foreground)" />
            <path d="M36 94 L40 102 L44 94" stroke="var(--muted-foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
          {/* Warning sign */}
          <g>
            <rect x="95" y="55" width="30" height="24" rx="3" fill="var(--brand)" opacity="0.15" />
            <text x="110" y="71" textAnchor="middle" fill="var(--brand)" fontSize="12" fontWeight="bold">!</text>
          </g>
        </svg>
      </div>

      {/* 404 code */}
      <h1
        className="text-8xl font-black tracking-tighter text-brand/20 select-none"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {content.code}
      </h1>

      {/* Title */}
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
        {content.title}
      </h2>

      {/* Joke */}
      <p className="max-w-md text-base text-muted-foreground">
        {content.joke}
      </p>
      <p className="text-sm text-muted-foreground/70">
        {content.sub}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link href={`/${lang}`} className="btn-primary">
          {content.home}
        </Link>
        <button
          onClick={() => window.history.back()}
          className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-95"
        >
          {content.back}
        </button>
      </div>

      {/* Construction tape bottom */}
      <div className="mt-8 flex overflow-hidden rounded-md">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-4"
            style={{
              backgroundColor: i % 2 === 0 ? 'var(--brand)' : 'var(--background)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
