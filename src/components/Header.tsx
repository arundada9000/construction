'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { useSettings } from '@/components/SettingsContext';
import { hapticTap, playTap, playNav } from '@/lib/haptics';
import { Dictionary, Locale } from '@/i18n/dictionaries';

interface HeaderProps {
  dict: Dictionary;
  lang: Locale;
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const navLinks: { key: keyof Dictionary['nav']; path: string }[] = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'equipmentRental', path: '/equipment-rental' },
  { key: 'projects', path: '/projects' },
  { key: 'resources', path: '/blog' },
  { key: 'contact', path: '/contact' },
];

const bottomNavItems: { key: keyof Dictionary['nav']; path: string; icon: React.ReactNode }[] = [
  {
    key: 'home',
    path: '/',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: 'services',
    path: '/services',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    key: 'projects',
    path: '/projects',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    key: 'contact',
    path: '/contact',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

function LangSwitch({
  lang,
  currentPath,
  size = 'md',
}: {
  lang: Locale;
  currentPath: string;
  size?: 'sm' | 'md';
}) {
  const px = size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5';
  return (
    <div className="flex overflow-hidden rounded-full border border-border bg-background/60 p-0.5 backdrop-blur-sm">
      {(['en', 'ne'] as Locale[]).map((l) => {
        const active = l === lang;
        return (
          <Link
            key={l}
            href={`/${l}${currentPath}`}
            className={`${px} text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200`}
            style={{
              backgroundColor: active ? 'var(--brand)' : 'transparent',
              color: active ? 'white' : 'var(--muted-foreground)',
            }}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}

export default function Header({ dict, lang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggle } = useTheme();
  const { openPanel } = useSettings();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const buildHref = useCallback(
    (path: string) => `/${lang}${path === '/' ? '/' : path + '/'}`,
    [lang],
  );

  const currentPath = pathname.replace(/^\/(en|ne)/, '').replace(/\/$/, '') || '/';

  const isActive = (path: string) => {
    const normalized = path.replace(/\/$/, '') || '/';
    if (normalized === '/') return currentPath === '/';
    return currentPath === normalized || currentPath.startsWith(normalized + '/');
  };

  const headerBg = scrolled
    ? { backgroundColor: 'var(--header-bg)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderBottom: '0.5px solid var(--separator)', boxShadow: 'none' }
    : { backgroundColor: 'transparent', backdropFilter: 'none', WebkitBackdropFilter: 'none', borderBottom: '0.5px solid transparent', boxShadow: 'none' };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        suppressHydrationWarning
        style={{ ...headerBg, transitionTimingFunction: EASE, transitionProperty: 'background-color, backdrop-filter, border-bottom, box-shadow', transitionDuration: '300ms' }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={buildHref('/')}
            className="flex items-center gap-0.5 text-lg font-bold tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-foreground">Sajilo</span>
            <span className="text-brand">.</span>
            <span className="font-semibold text-foreground">Builder</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ key, path }) => {
              const active = isActive(path);
              return (
                <Link
                  key={key}
                  href={buildHref(path)}
                  className="group relative ios-touch px-3 py-2 text-[13px] font-medium tracking-wide rounded-xl transition-all duration-200 ios-press"
                  onClick={() => { hapticTap(); playNav(); }}
                  style={{
                    color: active ? 'var(--brand)' : 'var(--foreground)',
                    backgroundColor: active ? 'var(--brand-light)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'var(--brand-light)';
                      e.currentTarget.style.color = 'var(--brand)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }
                  }}
                >
                  {dict.nav[key]}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] w-5 rounded-full"
                      style={{ backgroundColor: 'var(--brand)' }}
                    />
                  )}
                  {!active && (
                    <span
                      className="absolute bottom-0 left-1/2 h-[2px] w-0 rounded-full transition-all duration-200 group-hover:w-5 group-hover:-translate-x-1/2"
                      style={{ backgroundColor: 'var(--brand)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop right section */}
          <div className="hidden items-center gap-3 lg:flex">
            <LangSwitch lang={lang} currentPath={currentPath} />

            <button
              onClick={() => { hapticTap(); playTap(); openPanel(); }}
              className="relative flex ios-touch items-center justify-center rounded-full transition-colors duration-200 hover:bg-muted ios-press"
              aria-label="Settings"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            <button
              onClick={() => { hapticTap(); playTap(); toggle(); }}
              className="relative flex ios-touch items-center justify-center rounded-full transition-colors duration-200 hover:bg-muted ios-press"
              aria-label="Toggle theme"
            >
              {mounted && (
                <>
                  <span
                    className="absolute transition-all duration-500"
                    style={{
                      transitionTimingFunction: EASE,
                      transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
                      opacity: theme === 'dark' ? 1 : 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  </span>
                  <span
                    className="absolute transition-all duration-500"
                    style={{
                      transitionTimingFunction: EASE,
                      transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
                      opacity: theme === 'light' ? 1 : 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" /><path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" /><path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </span>
                </>
              )}
              {!mounted && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" /><path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" /><path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </button>

            <Link href={buildHref('/contact')} className="btn-primary">
              {dict.hero.ctaPrimary}
            </Link>
          </div>

          {/* Mobile top bar controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LangSwitch lang={lang} currentPath={currentPath} size="sm" />

            <button
              onClick={() => { hapticTap(); playTap(); openPanel(); }}
              className="relative flex ios-touch items-center justify-center rounded-full transition-colors duration-200 hover:bg-muted ios-press"
              aria-label="Settings"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            <button
              onClick={() => { hapticTap(); playTap(); toggle(); }}
              className="relative flex ios-touch items-center justify-center rounded-full transition-colors duration-200 hover:bg-muted ios-press"
              aria-label="Toggle theme"
            >
              {mounted && (
                <>
                  <span
                    className="absolute transition-all duration-500"
                    style={{
                      transitionTimingFunction: EASE,
                      transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
                      opacity: theme === 'dark' ? 1 : 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  </span>
                  <span
                    className="absolute transition-all duration-500"
                    style={{
                      transitionTimingFunction: EASE,
                      transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
                      opacity: theme === 'light' ? 1 : 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" /><path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" /><path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </span>
                </>
              )}
              {!mounted && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" /><path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" /><path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile bottom nav */}
      {mounted && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden ios-glass-bar" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div
            className="mx-3 mb-3 flex items-center justify-around rounded-2xl border border-border px-2 py-2"
            style={{
              backgroundColor: 'var(--header-bg)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
            }}
          >
            {bottomNavItems.map(({ key, path, icon }) => {
              const active = isActive(path);
              return (
                <Link
                  key={key}
                  href={buildHref(path)}
                  className="flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200 ios-press ios-touch"
                  onClick={() => { hapticTap(); playNav(); }}
                  style={{
                    color: active ? 'var(--brand)' : 'var(--muted-foreground)',
                  }}
                >
                  <span
                    className="transition-transform duration-200"
                    style={{ transform: active ? 'scale(1.15)' : 'scale(1)' }}
                  >
                    {icon}
                  </span>
                  <span className="text-[10px] font-medium leading-none">
                    {dict.nav[key]}
                  </span>
                  {active && (
                    <span
                      className="mt-0.5 h-[2px] w-4 rounded-full"
                      style={{ backgroundColor: 'var(--brand)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/9779811420975?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-50 flex ios-touch items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl ios-press lg:bottom-6 lg:right-6"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 5.5rem)',
          right: '1rem',
        }}
      >
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
