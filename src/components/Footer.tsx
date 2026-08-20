'use client';

import Link from 'next/link';
import { Dictionary, Locale } from '@/i18n/dictionaries';

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
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Brand + Trust */}
          <div className="flex flex-col gap-6">
            <Link href={`/${lang}/`} className="inline-flex items-center gap-2 group w-fit">
              <div className="h-9 w-9 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm tracking-tight shrink-0 transition-transform duration-300 group-hover:scale-105">
                SC
              </div>
              <span className="text-lg font-bold text-foreground tracking-tight">
                Construction{' '}
                <span className="text-brand">Company</span>
              </span>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.81-.07l.62-.13z" />
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {dict.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ key, path }) => (
                <li key={key}>
                  <Link
                    href={`/${lang}${path}/`}
                    className="text-sm text-foreground/70 hover:text-brand hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {dict.footer.contact}
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex flex-col gap-0.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.footer.registeredOffice}
                </span>
                <span className="text-sm text-foreground/80 leading-relaxed">
                  Narayangarh, Chitwan, Nepal
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.footer.cityOffice}
                </span>
                <span className="text-sm text-foreground/80 leading-relaxed">
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.footer.phone}
                </span>
                <div className="flex flex-col gap-0.5">
                  <a
                    href="tel:+9779856021612"
                    className="text-sm text-foreground/80 hover:text-brand transition-colors duration-200"
                  >
                    +977 9856021612
                  </a>
                  <a
                    href="tel:061461129"
                    className="text-sm text-foreground/80 hover:text-brand transition-colors duration-200"
                  >
                    061-461129
                  </a>
                </div>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {dict.footer.email}
                </span>
                <a
                  href="mailto:surya_cco@yahoo.com"
                  className="text-sm text-foreground/80 hover:text-brand transition-colors duration-200 break-all"
                >
                  surya_cco@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
