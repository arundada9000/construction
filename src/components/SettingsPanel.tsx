'use client';

import { useEffect, useRef } from 'react';
import { useSettings, TransitionType } from '@/components/SettingsContext';
import { useTheme, ThemeName } from '@/components/ThemeProvider';
import { hapticTap, playTap } from '@/lib/haptics';

const transitions: { value: TransitionType; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: 'No transition effect' },
  { value: 'crane', label: 'Crane', description: 'Cable drops from above' },
  { value: 'tape', label: 'Safety Tape', description: 'Hazard tape wipes across' },
  { value: 'concrete', label: 'Concrete', description: 'Stone wash slides up' },
];

interface ThemeOption {
  id: ThemeName;
  name: string;
  dotColor: string;
  description: string;
}

const themeOptions: ThemeOption[] = [
  { id: 'default', name: 'Classic Construction', dotColor: '#e85d04', description: 'Signature Safety Orange' },
  { id: 'dark', name: 'OLED Obsidian', dotColor: '#f97316', description: 'Deep Black & Amber' },
  { id: 'midnight', name: 'Midnight Navy', dotColor: '#3b82f6', description: 'Deep Ocean & Electric Blue' },
  { id: 'forest', name: 'Emerald Forest', dotColor: '#22c55e', description: 'Eco-Green & Lime' },
  { id: 'sepia', name: 'Earth & Sepia', dotColor: '#a0522d', description: 'Warm Terracotta & Sand' },
  { id: 'ocean', name: 'Ocean Cyan', dotColor: '#0891b2', description: 'Aquatic Teal & Azure' },
  { id: 'rose', name: 'Coral Rose', dotColor: '#e11d48', description: 'Warm Rose & Crimson' },
  { id: 'custom', name: 'Custom Palette', dotColor: 'var(--brand)', description: 'Pick your own brand color' },
];

export default function SettingsPanel() {
  const { settings, setTransition, toggleSound, panelOpen, closePanel } = useSettings();
  const { theme, setTheme, isDark, toggleDark, customBrand, setCustomBrand } = useTheme();
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
    playTap();
    closePanel();
  };

  return (
    <div className="fixed inset-0 z-[10000]" aria-hidden="true">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        style={{ animation: 'fadeIn 200ms ease-out forwards' }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto overscroll-contain pb-8"
        style={{
          backgroundColor: 'var(--background)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.25)',
          animation: 'slideUp 350ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Title */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[19px] font-bold text-foreground tracking-tight">Preferences & Appearance</h2>
              <p className="text-[13px] text-muted-foreground">Customize UI themes, transitions & audio</p>
            </div>
            <button
              onClick={handleClose}
              className="flex h-8 px-3.5 items-center justify-center rounded-full bg-brand text-[14px] font-semibold text-white shadow-sm hover:opacity-90 transition-opacity ios-press"
            >
              Done
            </button>
          </div>
        </div>

        {/* Sound */}
        <div className="px-4 pb-5">
          <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Audio & Feedback
          </div>
          <div
            className="rounded-[16px] overflow-hidden border border-border"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="flex items-center justify-between px-4 py-3.5">
              <div>
                <span className="text-[16px] font-medium text-foreground block">Sound Effects</span>
                <span className="text-[12px] text-muted-foreground">Synthesized Web Audio clicks & cues</span>
              </div>
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

        {/* Theme Appearance Mode */}
        <div className="px-4 pb-5">
          <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Display Mode
          </div>
          <div
            className="rounded-[16px] overflow-hidden border border-border"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="flex items-center justify-between px-4 py-3.5">
              <div>
                <span className="text-[16px] font-medium text-foreground block">Dark Mode</span>
                <span className="text-[12px] text-muted-foreground">Switch between Light and Dark interface</span>
              </div>
              <button
                onClick={() => { hapticTap(); playTap(); toggleDark(); }}
                className="ios-toggle"
                role="switch"
                aria-checked={isDark}
              >
                <span
                  className="ios-toggle-thumb"
                  style={{
                    transform: isDark ? 'translateX(20px)' : 'translateX(0)',
                    backgroundColor: isDark ? 'var(--brand)' : '#e5e5ea',
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Theme Palettes */}
        <div className="px-4 pb-5">
          <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Theme Palette
          </div>
          <div
            className="rounded-[16px] overflow-hidden border border-border"
            style={{ backgroundColor: 'var(--card)' }}
          >
            {themeOptions.map((t, i) => {
              const isSelected = theme === t.id;
              return (
                <div key={t.id}>
                  {i > 0 && <div className="ios-separator ml-4" />}
                  <button
                    onClick={() => {
                      hapticTap();
                      playTap();
                      setTheme(t.id);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3.5 transition-colors ios-press ${
                      isSelected ? 'bg-muted/40' : 'hover:bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className="h-5 w-5 rounded-full shrink-0 shadow-sm border border-black/10 flex items-center justify-center"
                        style={{ backgroundColor: t.id === 'custom' ? customBrand : t.dotColor }}
                      />
                      <div>
                        <span className="text-[15px] font-medium text-foreground block">{t.name}</span>
                        <span className="text-[12px] text-muted-foreground">{t.description}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-brand text-white shadow-sm shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Custom Color Picker when 'custom' is active */}
          {theme === 'custom' && (
            <div
              className="mt-3 p-4 rounded-[16px] border border-border flex flex-col gap-3"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[14px] font-semibold text-foreground block">Pick Brand Accent</span>
                  <span className="text-[12px] text-muted-foreground">Select any HEX color for buttons, highlights & badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customBrand}
                    onChange={(e) => {
                      setCustomBrand(e.target.value);
                    }}
                    className="h-9 w-9 rounded-lg border-2 border-border cursor-pointer overflow-hidden p-0 bg-transparent"
                    title="Choose brand color"
                  />
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => {
                      if (e.target.value.startsWith('#') || e.target.value.length <= 7) {
                        setCustomBrand(e.target.value);
                      }
                    }}
                    className="w-24 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Quick swatches */}
              <div className="flex items-center gap-2 pt-1 border-t border-border/50">
                <span className="text-[11px] text-muted-foreground uppercase font-medium mr-1">Presets:</span>
                {['#e85d04', '#2563eb', '#16a34a', '#9333ea', '#d97706', '#dc2626', '#0d9488'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      hapticTap();
                      playTap();
                      setCustomBrand(preset);
                    }}
                    className="h-6 w-6 rounded-full border border-black/10 shadow-xs hover:scale-110 transition-transform"
                    style={{ backgroundColor: preset }}
                    aria-label={`Select preset ${preset}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Page Transition */}
        <div className="px-4 pb-6">
          <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Page Transition Style
          </div>
          <div
            className="rounded-[16px] overflow-hidden border border-border"
            style={{ backgroundColor: 'var(--card)' }}
          >
            {transitions.map((t, i) => (
              <div key={t.value}>
                {i > 0 && <div className="ios-separator ml-4" />}
                <button
                  onClick={() => { hapticTap(); playTap(); setTransition(t.value); }}
                  className={`flex w-full items-center justify-between px-4 py-3.5 transition-colors ios-press ${
                    settings.transition === t.value ? 'bg-muted/40' : 'hover:bg-muted/20'
                  }`}
                >
                  <div className="text-left">
                    <span className="text-[15px] font-medium text-foreground block">{t.label}</span>
                    <span className="text-[12px] text-muted-foreground">{t.description}</span>
                  </div>
                  {settings.transition === t.value && (
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-brand text-white shadow-sm shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
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
