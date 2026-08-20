'use client';

import { useEffect, useRef } from 'react';
import { useSettings, TransitionType } from '@/components/SettingsContext';
import { useTheme } from '@/components/ThemeProvider';
import { hapticTap, playTap } from '@/lib/haptics';

const transitions: { value: TransitionType; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: 'No transition effect' },
  { value: 'crane', label: 'Crane', description: 'Cable drops from above' },
  { value: 'tape', label: 'Safety Tape', description: 'Hazard tape wipes across' },
  { value: 'concrete', label: 'Concrete', description: 'Stone wash slides up' },
];

export default function SettingsPanel() {
  const { settings, setTransition, toggleSound, panelOpen, closePanel } = useSettings();
  const { theme, toggle: toggleTheme } = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [panelOpen]);

  if (!panelOpen) return null;

  const handleClose = () => {
    hapticTap();
    closePanel();
  };

  return (
    <div className="fixed inset-0 z-[10000]" aria-hidden="true">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{ animation: 'fadeIn 200ms ease-out forwards' }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto overscroll-contain"
        style={{
          backgroundColor: 'var(--background)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          animation: 'slideUp 350ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Title */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-foreground">Settings</h2>
            <button
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[15px] font-medium text-muted-foreground ios-press"
            >
              Done
            </button>
          </div>
        </div>

        {/* Sound */}
        <div className="px-4 pb-6">
          <div className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide px-1 mb-2">
            Sound
          </div>
          <div
            className="rounded-[14px] overflow-hidden"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-[17px] text-foreground">Sound Effects</span>
              <button
                onClick={() => { hapticTap(); playTap(); toggleSound(); }}
                className="ios-toggle"
                role="switch"
                aria-checked={settings.sound}
              >
                <span
                  className="ios-toggle-thumb"
                  style={{
                    transform: settings.sound ? 'translateX(20px)' : 'translateX(0)',
                    backgroundColor: settings.sound ? 'var(--brand)' : '#e5e5ea',
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="px-4 pb-6">
          <div className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide px-1 mb-2">
            Appearance
          </div>
          <div
            className="rounded-[14px] overflow-hidden"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-[17px] text-foreground">Dark Mode</span>
              <button
                onClick={() => { hapticTap(); playTap(); toggleTheme(); }}
                className="ios-toggle"
                role="switch"
                aria-checked={theme === 'dark'}
              >
                <span
                  className="ios-toggle-thumb"
                  style={{
                    transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0)',
                    backgroundColor: theme === 'dark' ? 'var(--brand)' : '#e5e5ea',
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Page Transition */}
        <div className="px-4 pb-8">
          <div className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide px-1 mb-2">
            Page Transition
          </div>
          <div
            className="rounded-[14px] overflow-hidden"
            style={{ backgroundColor: 'var(--card)' }}
          >
            {transitions.map((t, i) => (
              <div key={t.value}>
                {i > 0 && <div className="ios-separator ml-4" />}
                <button
                  onClick={() => { hapticTap(); playTap(); setTransition(t.value); }}
                  className="flex w-full items-center justify-between px-4 py-3.5 ios-press"
                >
                  <div className="text-left">
                    <span className="text-[17px] text-foreground block">{t.label}</span>
                    <span className="text-[13px] text-muted-foreground">{t.description}</span>
                  </div>
                  {settings.transition === t.value && (
                    <svg className="w-5 h-5 text-brand shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Safe area bottom padding */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}
