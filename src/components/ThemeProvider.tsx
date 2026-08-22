'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type ThemeName = 'default' | 'dark' | 'midnight' | 'forest' | 'sepia' | 'ocean' | 'rose' | 'custom';

export interface ThemeContextValue {
  theme: ThemeName;
  isDark: boolean;
  setTheme: (t: ThemeName) => void;
  toggleDark: () => void;
  customBrand: string;
  setCustomBrand: (hex: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'default',
  isDark: false,
  setTheme: () => {},
  toggleDark: () => {},
  customBrand: '#e85d04',
  setCustomBrand: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const ALL_THEME_CLASSES = ['dark', 'midnight', 'forest', 'sepia', 'ocean', 'rose', 'custom'];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '');
  const m = cleanHex.length === 3
    ? cleanHex.split('').map(c => c + c).join('')
    : cleanHex;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(m);
  return match ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) } : null;
}

function applyCustomBrand(hex: string) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const rgb = hexToRgb(hex);
  if (!rgb) return;
  const { r, g, b } = rgb;

  root.style.setProperty('--custom-brand', hex);
  root.style.setProperty('--custom-brand-hover', hex);
  root.style.setProperty('--custom-brand-light', `rgba(${r}, ${g}, ${b}, 0.12)`);
  root.style.setProperty('--custom-ring', `rgba(${r}, ${g}, ${b}, 0.4)`);
}

function applyTheme(theme: ThemeName, isDark: boolean, customBrand?: string) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove(...ALL_THEME_CLASSES);

  if (theme === 'default') {
    if (isDark) root.classList.add('dark');
  } else if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'midnight') {
    root.classList.add('midnight');
  } else if (theme === 'forest') {
    root.classList.add('forest');
  } else if (theme === 'sepia' || theme === 'ocean' || theme === 'rose' || theme === 'custom') {
    root.classList.add(theme);
    if (isDark) root.classList.add('dark');
  }

  if (customBrand) {
    applyCustomBrand(customBrand);
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('default');
  const [isDark, setIsDarkState] = useState<boolean>(false);
  const [customBrand, setCustomBrandState] = useState<string>('#e85d04');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('sajilo-theme') as ThemeName | null || localStorage.getItem('theme') as ThemeName | null;
    const storedDark = localStorage.getItem('sajilo-dark');
    const storedBrand = localStorage.getItem('sajilo-custom-brand') || localStorage.getItem('custom-brand') || '#e85d04';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme: ThemeName = storedTheme || (prefersDark ? 'dark' : 'default');
    const initialDark: boolean = storedDark !== null
      ? storedDark === 'true'
      : (initialTheme === 'dark' || initialTheme === 'midnight' || initialTheme === 'forest' || prefersDark);

    setThemeState(initialTheme);
    setIsDarkState(initialDark);
    setCustomBrandState(storedBrand);
    applyTheme(initialTheme, initialDark, storedBrand);
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem('sajilo-theme', t);
    localStorage.setItem('theme', t);

    let nextDark = isDark;
    if (t === 'dark' || t === 'midnight' || t === 'forest') {
      nextDark = true;
    } else if (t === 'default') {
      nextDark = false;
    }
    setIsDarkState(nextDark);
    localStorage.setItem('sajilo-dark', String(nextDark));

    applyTheme(t, nextDark, customBrand);
  }, [isDark, customBrand]);

  const toggleDark = useCallback(() => {
    const nextDark = !isDark;
    setIsDarkState(nextDark);
    localStorage.setItem('sajilo-dark', String(nextDark));

    let nextTheme = theme;
    if (theme === 'default' && nextDark) {
      nextTheme = 'dark';
      setThemeState('dark');
      localStorage.setItem('sajilo-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'dark' && !nextDark) {
      nextTheme = 'default';
      setThemeState('default');
      localStorage.setItem('sajilo-theme', 'default');
      localStorage.setItem('theme', 'default');
    } else if ((theme === 'midnight' || theme === 'forest') && !nextDark) {
      nextTheme = 'default';
      setThemeState('default');
      localStorage.setItem('sajilo-theme', 'default');
      localStorage.setItem('theme', 'default');
    }

    applyTheme(nextTheme, nextDark, customBrand);
  }, [isDark, theme, customBrand]);

  const setCustomBrand = useCallback((hex: string) => {
    setCustomBrandState(hex);
    localStorage.setItem('sajilo-custom-brand', hex);
    localStorage.setItem('custom-brand', hex);
    applyCustomBrand(hex);
  }, []);

  const effectiveDark = isDark || theme === 'dark' || theme === 'midnight' || theme === 'forest';

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: effectiveDark,
        setTheme,
        toggleDark,
        customBrand,
        setCustomBrand,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
