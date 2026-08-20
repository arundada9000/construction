'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type TransitionType = 'none' | 'crane' | 'tape' | 'concrete';

interface Settings {
  transition: TransitionType;
  sound: boolean;
}

interface SettingsContextValue {
  settings: Settings;
  setTransition: (t: TransitionType) => void;
  toggleSound: () => void;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: { transition: 'none', sound: true },
  setTransition: () => {},
  toggleSound: () => {},
  panelOpen: false,
  openPanel: () => {},
  closePanel: () => {},
});

export const useSettings = () => useContext(SettingsContext);

const DEFAULTS: Settings = { transition: 'none', sound: true };

export default function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('sajilo-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULTS, ...parsed });
      }
    } catch {}
  }, []);

  const persist = useCallback((next: Settings) => {
    setSettings(next);
    try { localStorage.setItem('sajilo-settings', JSON.stringify(next)); } catch {}
  }, []);

  const setTransition = useCallback((t: TransitionType) => {
    persist({ ...settings, transition: t });
  }, [settings, persist]);

  const toggleSound = useCallback(() => {
    persist({ ...settings, sound: !settings.sound });
  }, [settings, persist]);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <SettingsContext.Provider value={{ settings, setTransition, toggleSound, panelOpen, openPanel, closePanel }}>
      {children}
    </SettingsContext.Provider>
  );
}
