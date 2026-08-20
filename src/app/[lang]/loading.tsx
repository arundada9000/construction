'use client';

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4">
      {/* Animated construction icon */}
      <div className="relative h-32 w-32">
        {/* Spinning gear */}
        <svg
          className="absolute inset-0 h-full w-full animate-spin"
          style={{ animationDuration: '4s' }}
          viewBox="0 0 120 120"
          fill="none"
        >
          <path
            d="M60 20 L64 8 L68 20 L80 16 L76 28 L88 32 L80 40 L88 48 L76 48 L80 60 L68 56 L64 68 L60 56 L56 68 L52 56 L40 60 L44 48 L32 48 L40 40 L32 32 L44 28 L40 16 L52 20 L56 8 L60 20Z"
            stroke="var(--brand)"
            strokeWidth="2.5"
            fill="var(--brand-light)"
          />
          <circle cx="60" cy="40" r="12" stroke="var(--brand)" strokeWidth="2.5" fill="var(--background)" />
        </svg>

        {/* Hammer swinging */}
        <svg
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <g style={{ transformOrigin: '30px 50px', animation: 'hammerSwing 1.2s ease-in-out infinite' }}>
            {/* Handle */}
            <rect x="28" y="20" width="4" height="32" rx="2" fill="var(--brand)" />
            {/* Head */}
            <rect x="18" y="12" width="24" height="12" rx="3" fill="var(--brand)" />
            <rect x="18" y="12" width="24" height="6" rx="3" fill="var(--brand-hover)" />
          </g>
        </svg>
      </div>

      {/* Progress bar */}
      <div className="w-64 overflow-hidden rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-brand"
          style={{
            animation: 'progressBar 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">Under Construction</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Our workers are building this page...
        </p>
      </div>

      {/* Animated construction tape */}
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-sm bg-brand"
            style={{
              animation: `bounce 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes hammerSwing {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes progressBar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
