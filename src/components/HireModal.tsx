'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { hapticTap, hapticSuccess, playTap, playSuccess } from '@/lib/haptics';

export function openHireModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-hire-modal'));
  }
}

export interface CurrencyConfig {
  code: string;
  nameEn: string;
  nameNe: string;
  symbol: string;
  rateToNpr: number; // 1 unit of currency = X NPR
  formatType: 'charm99' | 'charm999' | 'charm900' | 'intCeil';
  discountRatio: number; // regular comparison price ratio
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  NPR: {
    code: 'NPR',
    nameEn: 'NPR - Nepali Rupee',
    nameNe: 'रु - नेपाली रुपैयाँ',
    symbol: 'रु',
    rateToNpr: 1,
    formatType: 'charm999',
    discountRatio: 1.66,
  },
  USD: {
    code: 'USD',
    nameEn: 'USD - US Dollar',
    nameNe: '$ - अमेरिकी डलर',
    symbol: '$',
    rateToNpr: 135.5,
    formatType: 'charm99',
    discountRatio: 1.68,
  },
  INR: {
    code: 'INR',
    nameEn: 'INR - Indian Rupee',
    nameNe: '₹ - भारतीय रुपैयाँ',
    symbol: '₹',
    rateToNpr: 1.6,
    formatType: 'charm999',
    discountRatio: 1.6,
  },
  EUR: {
    code: 'EUR',
    nameEn: 'EUR - Euro',
    nameNe: '€ - युरो',
    symbol: '€',
    rateToNpr: 147.0,
    formatType: 'charm99',
    discountRatio: 1.65,
  },
  GBP: {
    code: 'GBP',
    nameEn: 'GBP - British Pound',
    nameNe: '£ - ब्रिटिस पाउन्ड',
    symbol: '£',
    rateToNpr: 172.0,
    formatType: 'charm99',
    discountRatio: 1.65,
  },
  AED: {
    code: 'AED',
    nameEn: 'AED - UAE Dirham',
    nameNe: 'AED - यूएई दिरहम',
    symbol: 'AED',
    rateToNpr: 36.9,
    formatType: 'intCeil',
    discountRatio: 1.65,
  },
  CAD: {
    code: 'CAD',
    nameEn: 'CAD - Canadian Dollar',
    nameNe: 'C$ - क्यानेडियन डलर',
    symbol: 'CA$',
    rateToNpr: 99.5,
    formatType: 'charm99',
    discountRatio: 1.65,
  },
  AUD: {
    code: 'AUD',
    nameEn: 'AUD - Australian Dollar',
    nameNe: 'A$ - अस्ट्रेलियन डलर',
    symbol: 'AU$',
    rateToNpr: 89.0,
    formatType: 'charm99',
    discountRatio: 1.65,
  },
  JPY: {
    code: 'JPY',
    nameEn: 'JPY - Japanese Yen',
    nameNe: '¥ - जापानी येन',
    symbol: '¥',
    rateToNpr: 0.88,
    formatType: 'charm900',
    discountRatio: 1.6,
  },
  SAR: {
    code: 'SAR',
    nameEn: 'SAR - Saudi Riyal',
    nameNe: 'SAR - साउदी रियाल',
    symbol: 'SAR',
    rateToNpr: 36.1,
    formatType: 'intCeil',
    discountRatio: 1.65,
  },
  QAR: {
    code: 'QAR',
    nameEn: 'QAR - Qatari Riyal',
    nameNe: 'QAR - कतारी रियाल',
    symbol: 'QAR',
    rateToNpr: 37.2,
    formatType: 'intCeil',
    discountRatio: 1.65,
  },
};

const BASE_PRICE_NPR = 15000;

function calculatePsychologicalPrice(baseNpr: number, currency: CurrencyConfig, isNepali: boolean) {
  const converted = baseNpr / currency.rateToNpr;
  let finalPriceStr = '';
  let originalPriceStr = '';

  if (currency.code === 'NPR') {
    finalPriceStr = isNepali ? 'रु १४,९९९' : 'NPR 14,999';
    originalPriceStr = isNepali ? 'रु २४,९९९' : 'NPR 24,999';
  } else if (currency.code === 'INR') {
    const rawVal = Math.ceil(converted / 500) * 500 - 1; // e.g. 9499
    finalPriceStr = `₹${rawVal.toLocaleString('en-IN')}`;
    const origVal = Math.ceil((converted * currency.discountRatio) / 500) * 500 - 1;
    originalPriceStr = `₹${origVal.toLocaleString('en-IN')}`;
  } else if (currency.formatType === 'charm900') {
    // JPY e.g. 17045 -> 17,900
    const rawVal = Math.ceil(converted / 1000) * 1000 - 100;
    finalPriceStr = `¥${rawVal.toLocaleString('en-US')}`;
    const origVal = Math.ceil((converted * currency.discountRatio) / 1000) * 1000 - 100;
    originalPriceStr = `¥${origVal.toLocaleString('en-US')}`;
  } else if (currency.formatType === 'charm99') {
    // USD, EUR, GBP, CAD, AUD e.g. 110.7 -> 119.99
    const intPart = Math.ceil(converted);
    const rem = intPart % 10;
    let rounded = intPart + ((9 - rem + 10) % 10);
    if (rounded <= converted) rounded += 10;
    const finalVal = rounded - 0.01;
    finalPriceStr = `${currency.symbol}${finalVal.toFixed(2)}`;
    const origInt = Math.ceil(rounded * currency.discountRatio);
    originalPriceStr = `${currency.symbol}${(origInt - 0.01).toFixed(2)}`;
  } else {
    // AED, SAR, QAR e.g. 406.5 -> 429 or 449
    const intPart = Math.ceil(converted);
    const rem = intPart % 10;
    let rounded = intPart + ((9 - rem + 10) % 10);
    if (rounded <= converted) rounded += 10;
    finalPriceStr = `${currency.symbol} ${rounded}`;
    const origVal = Math.ceil(rounded * currency.discountRatio);
    originalPriceStr = `${currency.symbol} ${origVal}`;
  }

  return { finalPriceStr, originalPriceStr };
}

interface FeatureItem {
  id: string;
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  tag: string;
}

const features: FeatureItem[] = [
  {
    id: 'nextjs',
    titleEn: 'Next.js 16 and React 19 Architecture',
    titleNe: 'Next.js 16 र React 19 आर्किटेक्चर',
    descEn: 'App Router with server components, static generation, and high load performance.',
    descNe: 'सर्भर-साइड रेन्डरिङ र उच्च कार्यक्षमता भएको आधुनिक एप राउटर प्रविधि।',
    tag: 'Core Framework',
  },
  {
    id: 'i18n',
    titleEn: 'Bilingual Localization (English and Nepali)',
    titleNe: 'द्विभाषी प्रणाली (अंग्रेजी र नेपाली)',
    descEn: 'Complete translation dictionary with persistent locale routing and dynamic subpaths.',
    descNe: 'एक क्लिकमा अंग्रेजी र नेपाली भाषा परिवर्तन तथा स्थानीयकरण।',
    tag: 'Localization',
  },
  {
    id: 'theme',
    titleEn: 'Multi-Palette Engine with Custom HEX Picker',
    titleNe: 'बहु-रंग थीम इन्जिन र कस्टम HEX पिकर',
    descEn: 'Eight curated iOS themes plus real-time custom brand color picker with live preview.',
    descNe: 'आठ वटा आकर्षक थीमहरू र आफ्नै ब्रान्ड रंग छनोट गर्ने सुविधा।',
    tag: 'Theming',
  },
  {
    id: 'ios',
    titleEn: 'Apple iOS HIG Design System',
    titleNe: 'Apple iOS HIG डिजाइन प्रणाली',
    descEn: 'Cupertino frosted glass, spring physics, segmented controls, and bottom modal sheets.',
    descNe: 'आइफोन शैलीको फ्रोस्टेड ग्लास डिजाइन, स्मूथ एनिमेसन र बटम शीट।',
    tag: 'UI and UX',
  },
  {
    id: 'audio',
    titleEn: 'Synthesized Web Audio and Mobile Haptics',
    titleNe: 'सिन्थेसाइज्ड वेब अडियो र कम्पन ह्याप्टिक्स',
    descEn: 'Zero-asset audio feedback synthesized via Web Audio API oscillators plus vibration cues.',
    descNe: 'अडियो फाइल बिना कोडबाट बज्ने इन्टरएक्टिभ साउन्ड इफेक्ट र कम्पन।',
    tag: 'Feedback',
  },
  {
    id: 'transitions',
    titleEn: 'Thematic Page Transitions',
    titleNe: 'निर्माण सम्बन्धी ट्रान्जिसनहरू',
    descEn: 'Animated Crane Cable Drop, Safety Hazard Tape Wipe, and Concrete Wash page transitions.',
    descNe: 'क्रेन केबल ड्रप, सेफ्टी टेप र कंक्रीट ट्रान्जिसन एनिमेसनहरू।',
    tag: 'Motion',
  },
  {
    id: 'seo',
    titleEn: 'Advanced SEO and Structured Data',
    titleNe: 'उन्नत SEO र Schema.org संरचना',
    descEn: 'Schema.org JSON-LD graph, Sitelinks Searchbox, and AI answer engine optimization.',
    descNe: 'गुगल र एआई सर्च इन्जिनहरूमा उच्च वरीयता पाउने स्ट्रक्चर्ड डेटा।',
    tag: 'SEO and AI',
  },
  {
    id: 'rental',
    titleEn: 'Machinery and Equipment Catalogue',
    titleNe: 'भारी उपकरण भाडा क्याटलग प्रणाली',
    descEn: 'Equipment specification showcase with interactive filters and direct inquiry flow.',
    descNe: 'भारी उपकरणहरूको विस्तृत विवरण र तत्काल बुकिङ सुविधा।',
    tag: 'Business',
  },
  {
    id: 'pwa',
    titleEn: 'Installable PWA and Offline Support',
    titleNe: 'इन्स्टल गर्न मिल्ने PWA र अफलाइन सुविधा',
    descEn: 'Progressive Web App with custom service worker caching and home screen installation.',
    descNe: 'मोबाइल एप जस्तै सिधै फोनमा इन्स्टल हुने प्रविधि र अफलाइन सपोर्ट।',
    tag: 'PWA Ready',
  },
];

const packageDeliverablesEn = [
  'Full source code built with Next.js 16, React 19 and Tailwind CSS v4',
  'Complete bilingual localization (English and Nepali) with locale routing',
  'Multi-palette theme engine with live custom HEX color picker',
  'Apple iOS HIG glassmorphism design, Cupertino navigation and sheets',
  'Zero-asset synthesized Web Audio sound engine and vibration haptics',
  'SEO and AI search engine Schema.org JSON-LD structured data',
  'Domain configuration, DNS setup, and cloud hosting deployment',
  'One year of technical maintenance and support',
];

const packageDeliverablesNe = [
  'Next.js 16, React 19 र Tailwind CSS v4 मा निर्मित सम्पूर्ण सोर्स कोड',
  'अंग्रेजी र नेपाली पूर्ण द्विभाषी प्रणाली तथा रूटिङ',
  '८ वटा आकर्षक थीमहरू र आफ्नै ब्रान्ड रंग रोज्ने HEX पिकर',
  'Apple iOS HIG ग्लास डिजाइन, बटम बार र स्मूथ फिजिक्स',
  'कोडबाटै बज्ने सिन्थेसाइज्ड वेब अडियो साउन्ड र कम्पन प्रणाली',
  'गुगल तथा AI सर्च इन्जिनका लागि पूर्ण Schema.org SEO संरचना',
  'डोमेन लिङ्किङ, DNS सेटअप र क्लाउड होस्टिङ डिप्लोयमेन्ट सहयोग',
  '१ वर्षको निःशुल्क प्राविधिक मर्मत र सहयोग',
];

const developerInfo = {
  name: 'Arun Neupane',
  nameNe: 'अरुण न्यौपाने',
  role: 'CTO & Lead Full-Stack Architect',
  roleNe: 'सीटीओ तथा लीड फुल-स्ट्याक आर्किटेक्ट',
  company: 'Sajilo Digital Pvt. Ltd.',
  location: 'Butwal, Lumbini, Nepal',
  email: 'arunneupane0000@gmail.com',
  phone: '+977 9811420975',
  phoneFormatted: '+977 9811420975',
  portfolio: 'https://arunneupane.vercel.app',
  github: 'https://github.com/arundada9000',
  linkedin: 'https://www.linkedin.com/in/arundada9000',
  twitter: 'https://x.com/arundada9000',
  youtube: 'https://www.youtube.com/@arundada9000',
};

const STORAGE_KEY = 'sajilo_hire_modal_auto_dismissed';

export default function HireModal() {
  const pathname = usePathname();
  const isNepali = pathname.startsWith('/ne');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('NPR');
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [activeTab, setActiveTab] = useState<'pricing' | 'contact' | 'features'>('pricing');
  const [mounted, setMounted] = useState(false);

  // Listen to custom dispatch events from footer or other buttons
  useEffect(() => {
    const handleCustomOpen = () => {
      hapticTap();
      playTap();
      setIsOpen(true);
    };
    window.addEventListener('open-hire-modal', handleCustomOpen);
    return () => window.removeEventListener('open-hire-modal', handleCustomOpen);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Automatically display popup on first visit after a slight delay
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    hapticTap();
    playTap();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((dontShowAgain: boolean = false) => {
    hapticTap();
    playTap();
    setIsOpen(false);
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
    }
  }, []);

  const copyToClipboard = useCallback((text: string, type: 'email' | 'phone') => {
    hapticSuccess();
    playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2200);
  }, []);

  const currentCurrency = CURRENCIES[selectedCurrency] || CURRENCIES.NPR;

  const { finalPriceStr, originalPriceStr } = useMemo(() => {
    return calculatePsychologicalPrice(BASE_PRICE_NPR, currentCurrency, isNepali);
  }, [currentCurrency, isNepali]);

  const whatsappInquiryUrl = useMemo(() => {
    const message = isNepali
      ? `नमस्ते अरुण जी, मलाई सजिलो बिल्डर जस्तै आधुनिक वेबसाइट आफ्नै व्यवसायको लागि निर्माण गर्नु छ (${finalPriceStr} प्याकेज)। थप विवरण बुझ्न चाहन्छु।`
      : `Hello Arun, I saw your Sajilo Builder website and I want to build a custom high-performance website for my business (${finalPriceStr} package). Let's discuss!`;
    return `https://wa.me/9779811420975?text=${encodeURIComponent(message)}`;
  }, [isNepali, finalPriceStr]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Trigger Pill */}
      <div
        className="fixed z-40 transition-all duration-300 left-3 sm:left-6"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 5.5rem)',
        }}
      >
        <button
          onClick={handleOpen}
          aria-label="Get a website like this"
          className="group flex items-center gap-2.5 rounded-full border border-border/80 bg-card/90 py-1.5 pl-2 pr-3.5 text-xs font-semibold text-foreground shadow-lg backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/10 active:scale-95 ios-press"
          style={{
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          {/* Minimalist Window Icon with subtle hover rotation */}
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect width="18" height="14" x="3" y="5" rx="3" />
              <path d="M3 9h18M7 7h.01M10 7h.01" />
            </svg>
          </div>

          {/* Text Label */}
          <span className="font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-200">
            {isNepali ? 'यस्तै वेबसाइट बनाउनुहोस्' : 'Want a Website Like This?'}
          </span>

          {/* Price Badge */}
          <span className="rounded-full bg-muted border border-border/70 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground group-hover:text-white group-hover:bg-brand group-hover:border-brand transition-all duration-200 shadow-sm">
            {finalPriceStr}
          </span>

          {/* Disclosure Chevron */}
          <svg className="h-3 w-3 text-muted-foreground/60 group-hover:text-brand group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* iOS Modal Sheet / Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
        >
          {/* Backdrop with fade-in animation */}
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-md transition-opacity"
            style={{ animation: 'fadeIn 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
            onClick={() => handleClose(false)}
          />

          {/* Modal Container with spring load animation */}
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-t-[28px] sm:rounded-[24px] border border-border bg-background text-foreground shadow-2xl flex flex-col max-h-[90vh]"
            style={{
              animation: 'modalSlideUp 340ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* iOS Mobile Grabber */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="h-1.5 w-10 rounded-full bg-muted-foreground/30" />
            </div>

            {/* iOS Modal Header */}
            <div className="px-5 sm:px-6 pt-4 pb-3.5 border-b border-border bg-card/50 flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-brand uppercase tracking-wider block">
                  {isNepali ? 'कस्टम वेब डेभलपमेन्ट' : 'Custom Web Development'}
                </span>
                <h2
                  id="modal-title"
                  className="text-[18px] sm:text-[20px] font-bold tracking-tight text-foreground mt-0.5"
                >
                  {isNepali ? 'तपाईंको व्यवसायको लागि वेबसाइट' : 'Get a Website Built for Your Business'}
                </h2>
                <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5">
                  {isNepali
                    ? 'अरुण न्यौपानेद्वारा निर्मित। आधुनिक र उच्च कार्यक्षमता भएको वेबसाइट।'
                    : 'Crafted by Arun Neupane. Production-ready web architecture.'}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => handleClose(false)}
                aria-label="Close modal"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted-foreground/20 hover:scale-105 active:scale-90 transition-all duration-200 ios-press"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* iOS Segmented Control with tactile tabs */}
            <div className="px-5 sm:px-6 pt-3 pb-2 bg-background">
              <div className="flex p-1 rounded-[12px] bg-muted text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    hapticTap();
                    playTap();
                    setActiveTab('pricing');
                  }}
                  className={`flex-1 py-1.5 px-2 text-center rounded-[9px] transition-all duration-200 active:scale-95 ios-press flex items-center justify-center gap-1.5 ${
                    activeTab === 'pricing'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
                  }`}
                >
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{isNepali ? 'मूल्य र प्याकेज' : 'Pricing & Package'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    hapticTap();
                    playTap();
                    setActiveTab('contact');
                  }}
                  className={`flex-1 py-1.5 px-2 text-center rounded-[9px] transition-all duration-200 active:scale-95 ios-press flex items-center justify-center gap-1.5 ${
                    activeTab === 'contact'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
                  }`}
                >
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{isNepali ? 'सम्पर्क' : 'Contact'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    hapticTap();
                    playTap();
                    setActiveTab('features');
                  }}
                  className={`flex-1 py-1.5 px-2 text-center rounded-[9px] transition-all duration-200 active:scale-95 ios-press flex items-center justify-center gap-1.5 ${
                    activeTab === 'features'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
                  }`}
                >
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>{isNepali ? 'सुविधाहरू' : 'Features'}</span>
                </button>
              </div>
            </div>

            {/* Scrollable Body with smooth tab content load animation */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-3 space-y-4 ios-scroll">
              {activeTab === 'pricing' && (
                <div
                  key="pricing-tab"
                  className="space-y-4"
                  style={{ animation: 'tabContentIn 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                >
                  {/* Currency Selector Row */}
                  <div>
                    <div className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-1.5">
                      {isNepali ? 'मुद्रा छनोट' : 'Currency Selector'}
                    </div>
                    <div className="rounded-[16px] border border-border bg-card p-3 flex items-center justify-between gap-3 transition-colors hover:border-brand/40">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-8 w-8 rounded-[10px] bg-brand/10 text-brand flex items-center justify-center shrink-0">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-foreground truncate">
                            {isNepali ? 'भुक्तानी मुद्रा' : 'Select Currency'}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {isNepali ? 'स्वत: मनोवैज्ञानिक दर' : 'Psychological charm rate'}
                          </div>
                        </div>
                      </div>

                      <div className="relative shrink-0">
                        <select
                          value={selectedCurrency}
                          onChange={(e) => {
                            hapticTap();
                            playTap();
                            setSelectedCurrency(e.target.value);
                          }}
                          className="appearance-none rounded-[10px] border border-border bg-muted/60 px-3 py-1.5 pr-8 text-xs font-semibold text-foreground focus:border-brand focus:outline-none hover:bg-muted transition-all cursor-pointer"
                        >
                          {Object.values(CURRENCIES).map((c) => (
                            <option key={c.code} value={c.code}>
                              {isNepali ? c.nameNe : c.nameEn}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Price Card */}
                  <div className="group/price rounded-[20px] border border-border bg-card p-5 space-y-4 transition-all duration-300 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                          {isNepali ? 'पूर्ण प्याकेज' : 'Complete All-Inclusive Package'}
                        </span>
                        <h3 className="mt-1.5 text-[16px] font-bold text-foreground">
                          {isNepali ? 'कस्टम वेबसाइट निर्माण तथा डिप्लोयमेन्ट' : 'Full Custom Production Website'}
                        </h3>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[11px] font-semibold shrink-0">
                        40% OFF
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2.5 pt-1">
                      <span className="text-[32px] sm:text-[38px] font-extrabold tracking-tight text-foreground">
                        {finalPriceStr}
                      </span>
                      <span className="text-[14px] font-semibold text-muted-foreground line-through">
                        {originalPriceStr}
                      </span>
                      <span className="text-[12px] font-medium text-muted-foreground">
                        {isNepali ? '/ एकमुष्ट' : '/ one-time'}
                      </span>
                    </div>

                    <p className="text-[12px] text-muted-foreground">
                      {isNepali
                        ? 'कुनै लुकेको शुल्क छैन। सम्पूर्ण सुविधाहरू सहित पूर्ण रूपमा चालू हुने वेबसाइट।'
                        : 'No hidden recurring platform fees. Fully delivered, deployed, and production-ready.'}
                    </p>

                    {/* Deliverables Checklist with interactive row hover */}
                    <div className="border-t border-border pt-3.5 space-y-2">
                      <div className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {isNepali ? 'समावेश सुविधाहरू' : 'Included Deliverables'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {(isNepali ? packageDeliverablesNe : packageDeliverablesEn).map((item, idx) => (
                          <div
                            key={idx}
                            className="group/item flex items-start gap-2 p-1.5 rounded-[10px] hover:bg-muted/60 transition-colors duration-150 text-xs text-foreground/90"
                          >
                            <div className="h-4 w-4 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 group-hover/item:bg-brand group-hover/item:text-white transition-all duration-200">
                              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-[12px] leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Primary Button inside card */}
                    <div className="pt-2">
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { hapticSuccess(); playSuccess(); }}
                        className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-brand py-3 px-4 text-[14px] font-semibold text-white shadow-sm hover:brightness-105 hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98] ios-press transition-all duration-200"
                      >
                        <span>{isNepali ? 'यो मूल्यमा वेबसाइट बनाउनुहोस्' : 'Order Website at This Price'}</span>
                        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div
                  key="contact-tab"
                  className="space-y-4"
                  style={{ animation: 'tabContentIn 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                >
                  {/* Lead Architect Card */}
                  <div className="group/architect rounded-[18px] border border-border bg-card p-4 sm:p-5 transition-all duration-200 hover:border-brand/40 hover:shadow-sm">
                    <div className="flex items-center gap-3.5">
                      <div className="h-12 w-12 rounded-[14px] bg-gradient-to-tr from-brand to-amber-500 text-white font-bold text-[16px] flex items-center justify-center shrink-0 shadow-md shadow-brand/20 group-hover/architect:scale-105 transition-transform duration-200">
                        AN
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[16px] font-bold text-foreground truncate">
                            {isNepali ? developerInfo.nameNe : developerInfo.name}
                          </h3>
                          <span className="rounded-full bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] font-semibold text-brand">
                            Lead Architect
                          </span>
                        </div>
                        <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
                          {isNepali ? developerInfo.roleNe : developerInfo.role} • {developerInfo.company}
                        </p>
                        <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                          {developerInfo.location}
                        </p>
                      </div>
                    </div>

                    {/* Quick Contact Action Pills with rich hover feedback */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3.5 border-t border-border">
                      {/* WhatsApp */}
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { hapticSuccess(); playSuccess(); }}
                        className="group/pill flex flex-col items-center justify-center p-2.5 rounded-[12px] bg-muted/40 hover:bg-[#25D366]/10 border border-border/40 hover:border-[#25D366]/40 text-foreground hover:text-[#25D366] hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200 ios-press"
                      >
                        <svg className="h-5 w-5 text-emerald-500 mb-1 transition-transform duration-200 group-hover/pill:scale-110 group-hover/pill:rotate-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span className="text-[11px] font-medium">WhatsApp</span>
                      </a>

                      {/* Phone Call */}
                      <a
                        href={`tel:${developerInfo.phone}`}
                        onClick={() => { hapticTap(); playTap(); }}
                        className="group/pill flex flex-col items-center justify-center p-2.5 rounded-[12px] bg-muted/40 hover:bg-blue-500/10 border border-border/40 hover:border-blue-500/40 text-foreground hover:text-blue-500 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200 ios-press"
                      >
                        <svg className="h-5 w-5 text-blue-500 mb-1 transition-transform duration-200 group-hover/pill:scale-110 group-hover/pill:-rotate-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-[11px] font-medium">{isNepali ? 'कल' : 'Call'}</span>
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:${developerInfo.email}?subject=Inquiry%20for%20Custom%20Website%20Development`}
                        onClick={() => { hapticTap(); playTap(); }}
                        className="group/pill flex flex-col items-center justify-center p-2.5 rounded-[12px] bg-muted/40 hover:bg-amber-500/10 border border-border/40 hover:border-amber-500/40 text-foreground hover:text-amber-500 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200 ios-press"
                      >
                        <svg className="h-5 w-5 text-amber-500 mb-1 transition-transform duration-200 group-hover/pill:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[11px] font-medium">Email</span>
                      </a>

                      {/* Portfolio */}
                      <a
                        href={developerInfo.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { hapticTap(); playTap(); }}
                        className="group/pill flex flex-col items-center justify-center p-2.5 rounded-[12px] bg-muted/40 hover:bg-brand/10 border border-border/40 hover:border-brand/40 text-foreground hover:text-brand hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200 ios-press"
                      >
                        <svg className="h-5 w-5 text-brand mb-1 transition-transform duration-200 group-hover/pill:scale-110 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-[11px] font-medium">Portfolio</span>
                      </a>
                    </div>
                  </div>

                  {/* Grouped Contact Details */}
                  <div>
                    <div className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-1.5">
                      {isNepali ? 'सम्पर्क विवरण' : 'Direct Contact Info'}
                    </div>
                    <div className="rounded-[16px] border border-border bg-card divide-y divide-border overflow-hidden">
                      {/* Phone */}
                      <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors duration-150">
                        <div>
                          <div className="text-[11px] text-muted-foreground">{isNepali ? 'फोन नम्बर' : 'Phone'}</div>
                          <div className="text-[13px] font-semibold text-foreground">{developerInfo.phoneFormatted}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(developerInfo.phone, 'phone')}
                          className="rounded-[8px] bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-brand hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 ios-press"
                        >
                          {copiedField === 'phone' ? (isNepali ? 'प्रतिलिपि गरियो' : 'Copied') : (isNepali ? 'प्रतिलिपि' : 'Copy')}
                        </button>
                      </div>

                      {/* Email */}
                      <div className="flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors duration-150">
                        <div className="min-w-0 pr-2">
                          <div className="text-[11px] text-muted-foreground">Email</div>
                          <div className="text-[13px] font-semibold text-foreground truncate">{developerInfo.email}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(developerInfo.email, 'email')}
                          className="rounded-[8px] bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-brand hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 ios-press shrink-0"
                        >
                          {copiedField === 'email' ? (isNepali ? 'प्रतिलिपि गरियो' : 'Copied') : (isNepali ? 'प्रतिलिपि' : 'Copy')}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Social Profiles with interactive hover animations */}
                  <div>
                    <div className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-1.5">
                      {isNepali ? 'सामाजिक सञ्जाल' : 'Developer Profiles'}
                    </div>
                    <div className="rounded-[16px] border border-border bg-card p-3.5 flex items-center justify-between transition-colors hover:border-brand/40">
                      <span className="text-[12px] text-muted-foreground">GitHub, LinkedIn, X, YouTube</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={developerInfo.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-muted text-muted-foreground hover:bg-[#24292e] hover:text-white hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 ios-press"
                          title="GitHub"
                        >
                          <svg className="h-4 w-4 transition-transform duration-200 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                        <a
                          href={developerInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-muted text-muted-foreground hover:bg-[#0077b5] hover:text-white hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 ios-press"
                          title="LinkedIn"
                        >
                          <svg className="h-4 w-4 transition-transform duration-200 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                          </svg>
                        </a>
                        <a
                          href={developerInfo.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-muted text-muted-foreground hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 ios-press"
                          title="X"
                        >
                          <svg className="h-4 w-4 transition-transform duration-200 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                        <a
                          href={developerInfo.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-muted text-muted-foreground hover:bg-[#ff0000] hover:text-white hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 ios-press"
                          title="YouTube"
                        >
                          <svg className="h-4 w-4 transition-transform duration-200 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div
                  key="features-tab"
                  className="space-y-3"
                  style={{ animation: 'tabContentIn 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                >
                  <div className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
                    {isNepali ? 'वेबसाइटका मुख्य प्रविधि तथा सुविधाहरू' : 'Engineered Capabilities in This Web App'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {features.map((feat, idx) => (
                      <div
                        key={feat.id}
                        className="group/feat rounded-[16px] border border-border bg-card p-3.5 transition-all duration-200 hover:border-brand/50 hover:shadow-md hover:-translate-y-0.5"
                        style={{
                          animation: 'cardIn 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                          animationDelay: `${idx * 40}ms`,
                          opacity: 0,
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="text-[13px] font-bold text-foreground group-hover/feat:text-brand transition-colors duration-200">
                            {isNepali ? feat.titleNe : feat.titleEn}
                          </h4>
                          <span className="rounded-[6px] bg-muted group-hover/feat:bg-brand/10 group-hover/feat:text-brand px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground uppercase shrink-0 transition-colors duration-200">
                            {feat.tag}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                          {isNepali ? feat.descNe : feat.descEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="border-t border-border bg-card/60 px-5 sm:px-6 py-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleClose(true)}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors ios-press"
              >
                {isNepali ? 'फेरि नदेखाउनुहोस्' : 'Do not show again'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleClose(false)}
                  className="rounded-[10px] bg-muted px-3.5 py-1.5 text-[12px] font-semibold text-foreground hover:bg-muted-foreground/20 hover:scale-105 active:scale-95 transition-all duration-150 ios-press"
                >
                  {isNepali ? 'बन्द' : 'Dismiss'}
                </button>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { hapticSuccess(); playSuccess(); }}
                  className="rounded-[10px] bg-brand px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-sm hover:brightness-105 hover:shadow-md hover:shadow-brand/20 hover:scale-105 active:scale-95 transition-all duration-150 ios-press flex items-center gap-1"
                >
                  <span>{isNepali ? 'सम्पर्क' : 'Contact'}</span>
                  <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}