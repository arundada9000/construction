'use client';

import Link from 'next/link';
import { Dictionary, Locale } from '@/i18n/dictionaries';
import { hapticTap } from '@/lib/haptics';

interface FooterProps {
  dict: Dictionary;
  lang: Locale;
}

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'equipmentRental', path: '/equipment-rental' },
  { key: 'projects', path: '/projects' },
  { key: 'resources', path: '/blog' },
  { key: 'contact', path: '/contact' },
] as const;

export default function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="border-t ios-separator-full">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Brand + Trust */}
          <div className="flex flex-col gap-6">
            <Link href={`/${lang}/`} className="inline-flex items-center gap-2 group w-fit ios-press" onClick={() => hapticTap()}>
              <div className="h-10 w-10 rounded-[12px] bg-brand flex items-center justify-center text-white font-bold text-sm tracking-tight shrink-0 transition-transform duration-300 group-hover:scale-105">
                S B
              </div>
              <span className="text-[17px] font-semibold text-foreground tracking-tight">
                Sajilo{' '}
                <span className="text-brand">Builder</span>
              </span>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/arundada9000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="ios-touch rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-all duration-200 ios-press"
                onClick={() => hapticTap()}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/arundada9000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="ios-touch rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-all duration-200 ios-press"
                onClick={() => hapticTap()}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com/arundada9000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="ios-touch rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-all duration-200 ios-press"
                onClick={() => hapticTap()}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@arundada9000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="ios-touch rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-all duration-200 ios-press"
                onClick={() => hapticTap()}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Trust Section */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {dict.footer.trust.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {dict.footer.trust.description}
              </p>
              <ul className="flex flex-col gap-2 mt-1">
                {dict.footer.trust.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/${lang}/contact/`}
              className="btn-primary w-fit mt-2"
            >
              {dict.hero.ctaPrimary}
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              {dict.footer.quickLinks}
            </h4>
            <div className="ios-card">
              {navLinks.map(({ key, path }, i) => (
                <div key={key}>
                  {i > 0 && <div className="ios-separator" />}
                  <Link
                    href={`/${lang}${path}/`}
                    className="flex items-center justify-between px-4 py-3 text-[17px] text-foreground/80 hover:text-brand hover:bg-muted/50 transition-all duration-200 ios-press"
                    onClick={() => hapticTap()}
                  >
                    <span>{dict.nav[key]}</span>
                    <svg className="w-4 h-4 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              {dict.footer.contact}
            </h4>
            <div className="ios-card">
              <div className="px-4 py-3.5">
                <span className="text-[13px] font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.footer.registeredOffice}
                </span>
                <p className="text-[15px] text-foreground/80 mt-0.5">
                  Butwal, Lumbini, Nepal
                </p>
              </div>
              <div className="ios-separator" />
              <div className="px-4 py-3.5">
                <span className="text-[13px] font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.footer.cityOffice}
                </span>
                <p className="text-[15px] text-foreground/80 mt-0.5">
                  Kathmandu, Nepal
                </p>
              </div>
              <div className="ios-separator" />
              <a
                href="tel:+9779811420975"
                className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/50 transition-all duration-200 ios-press"
                onClick={() => hapticTap()}
              >
                <div>
                  <span className="text-[13px] font-medium uppercase tracking-wider text-muted-foreground">
                    {dict.footer.phone}
                  </span>
                  <p className="text-[15px] text-foreground/80 mt-0.5">
                    +977 9811420975
                  </p>
                </div>
                <svg className="w-4 h-4 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <div className="ios-separator" />
              <a
                href="mailto:arunneupane0000@gmail.com"
                className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/50 transition-all duration-200 ios-press"
                onClick={() => hapticTap()}
              >
                <div>
                  <span className="text-[13px] font-medium uppercase tracking-wider text-muted-foreground">
                    {dict.footer.email}
                  </span>
                  <p className="text-[15px] text-foreground/80 mt-0.5 break-all">
                    arunneupane0000@gmail.com
                  </p>
                </div>
                <svg className="w-4 h-4 text-muted-foreground/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t ios-separator-full">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-[13px] text-muted-foreground">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
