<div align="center">

# Sajilo Builder

**A modern, high-performance, bilingual (EN/NP) construction company website and machinery rental platform built with Next.js 16, React 19, Tailwind CSS v4, and an iOS HIG design system.**

A product of [Sajilo Digital Pvt. Ltd.](https://sajilodigital.com.np)

Live Demo: [arun-builder.vercel.app](https://arun-builder.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Features

- **Full Bilingual (EN/NP)**: Complete English and Nepali translations with one-click language toggle and persistent locale routing (`/en`, `/ne`).
- **Multi-Theme Engine and Custom Palettes**: 8 presets (Classic Construction, OLED Obsidian, Midnight Navy, Emerald Forest, Sepia Earth, Ocean Cyan, Coral Rose, and Custom Palette) with a real-time HEX color picker.
- **iOS HIG Design System**: Cupertino-style bottom navigation, frosted glassmorphism headers, tactile iOS toggle switches, segmented cards, and bottom sheet settings modal.
- **Synthesized Web Audio and Haptics**: Zero-asset, zero-latency Web Audio API sound synthesis (tap, nav, success, clink, rumble) plus mobile vibration haptic feedback.
- **Construction Page Transitions**: Custom animated transitions including Crane Cable Drop, Safety Tape Wipe, and Concrete Pour.
- **Heavy Equipment Rental Catalog**: Showcase and quotation engine for excavators, road rollers, motor graders, backhoe loaders, tipper trucks, and tractors with high-res photography and technical specs.
- **Advanced SEO, AEO and GEO**: Optimized for Google Sitelinks, Bing, Perplexity, OpenAI SearchGPT, and Applebot:
  - Dynamic sitemaps with multilingual `hreflang` alternates and indexed images.
  - Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) with `FAQPage`, `GeneralContractor`, `WebSite` Sitelinks SearchBox, `SiteNavigationElement`, `OfferCatalog`, `ServicesCatalog`, and `BlogPosting` schemas.
  - Comprehensive `robots.txt` granting explicit crawl access to AI answer bots (`GPTBot`, `PerplexityBot`, `ClaudeBot`, etc.).
- **Technical Engineering Blog**: Markdown and JSON powered technical articles with bilingual content, reading times, share buttons, and Article structured data.
- **PWA Ready**: Installable Progressive Web App with service worker offline caching and app shortcuts.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router with Server & Client Components) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4 + Custom iOS HIG Tokens |
| **Audio / Haptics** | Web Audio API Oscillator Nodes + Navigator Vibration API |
| **Structured Data** | Schema.org JSON-LD Entity Graph |
| **Fonts** | Geist Sans, Geist Mono |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arundada9000/construction.git
cd construction

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=https://arun-builder.vercel.app
```

### Production Build

```bash
npm run build
npm start
```

---

## Project Architecture

```
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx              # Multilingual layout + SEO & Structured Data
│   │   ├── page.tsx                # Homepage + Hero + Project & Service previews
│   │   ├── about/page.tsx          # About page + 1978 legacy timeline
│   │   ├── services/page.tsx       # Services showcase + ServicesCatalog schema
│   │   ├── equipment-rental/page.tsx # Heavy equipment catalog + spec sheets
│   │   ├── projects/page.tsx       # Filterable project portfolio grid
│   │   ├── contact/page.tsx        # Consultation & quote request forms
│   │   └── blog/
│   │       ├── page.tsx            # Technical engineering blog index
│   │       └── [slug]/page.tsx     # Article detail + Article JSON-LD
│   ├── globals.css                 # 8-theme palettes, iOS HIG tokens & animations
│   ├── layout.tsx                  # Root metadata + favicons + font definitions
│   ├── sitemap.ts                  # Dynamic image & multilingual sitemap generator
│   └── robots.ts                   # Robots.txt with Search & AI Crawler rules
├── components/
│   ├── Header.tsx                  # Glassmorphic Cupertino header + theme/audio controls
│   ├── Footer.tsx                  # 3-column trust & contact footer
│   ├── ThemeProvider.tsx            # Multi-palette theme engine with hex brand customization
│   ├── SettingsContext.tsx          # User preferences state manager
│   ├── SettingsPanel.tsx           # iOS bottom sheet modal with live swatch & transition picker
│   ├── CraneTransition.tsx         # Construction crane cable drop transition
│   ├── SafetyTapeWipe.tsx          # Hazard safety tape page wipe
│   ├── ConcretePour.tsx            # Concrete pour stone wash transition
│   ├── AnimatedSection.tsx         # Intersection Observer scroll reveal wrapper
│   ├── TextReveal.tsx              # Staggered typography reveals
│   ├── ProjectGrid.tsx             # Filterable project gallery
│   └── JsonLd.tsx                  # Rich Schema.org structured data components
├── i18n/
│   ├── dictionaries.ts             # Language dictionary loader
│   ├── en.json                     # English translation dictionary
│   └── ne.json                     # Nepali translation dictionary
└── lib/
    ├── blog-posts.ts               # Technical blog articles & metadata
    └── haptics.ts                  # Web Audio API synthesizer & vibration haptics
```

---

## Theme and Palette Customization

Sajilo Builder includes 8 built-in themes and dynamic HEX color picker capabilities:

1. **Classic Construction** (`#e85d04`) - High-visibility safety orange
2. **OLED Obsidian** (`#000000`) - True black contrast mode
3. **Midnight Navy** (`#3b82f6`) - Deep navy blue with electric accents
4. **Emerald Forest** (`#22c55e`) - Eco-friendly green and lime
5. **Sepia Earth** (`#a0522d`) - Warm terracotta, parchment and sand
6. **Ocean Cyan** (`#0891b2`) - Deep teal and azure
7. **Coral Rose** (`#e11d48`) - Warm rose gold and crimson
8. **Custom Palette** - Any user-selected HEX code injected live via CSS custom properties (`--custom-brand`, `--custom-ring`, `--custom-brand-light`) and persisted in `localStorage`.

---

## SEO, AEO and GEO Implementation

- **Google Rich Sitelinks**: `SiteNavigationElement` and `ItemList` schemas structured for top-level search sitelinks.
- **SearchAction Schema**: Integrated Sitelinks Searchbox (`WebSite` schema).
- **AEO (Answer Engine Optimization)**: Contextual `FAQPage` schemas embedded on Home, Services, Equipment Rental, and Contact pages for instant conversational answers.
- **GEO (Generative Engine Optimization)**: Entity graphs linking `GeneralContractor`, `Person` (Arun Neupane), `LocalBusiness`, geo-coordinates (`27.7006° N, 83.4484° E`), and social entity references (`sameAs`).
- **Crawler Permissions**: `robots.txt` specifically configured for `Googlebot`, `Bingbot`, `Applebot`, `GPTBot`, `PerplexityBot`, and `ClaudeBot`.

---

## Author and Lead Architect

**Arun Neupane** (`@arundada9000`)
- **Role:** CTO and Lead Architect at [Sajilo Digital Pvt. Ltd.](https://sajilodigital.com.np)
- **Community:** Vice Secretary at Code for Change Rupandehi | BMC IT Club
- **Location:** Butwal, Lumbini, Nepal (NPT / UTC+5:45)
- **Portfolio:** [arunneupane.vercel.app](https://arunneupane.vercel.app)
- **Email:** [arunneupane0000@gmail.com](mailto:arunneupane0000@gmail.com)
- **Phone / WhatsApp:** [+977 9811420975](https://wa.me/9779811420975)

### Social Connect
- **GitHub:** [@arundada9000](https://github.com/arundada9000)
- **LinkedIn:** [in/arundada9000](https://www.linkedin.com/in/arundada9000)
- **X (Twitter):** [@arundada9000](https://x.com/arundada9000)
- **YouTube:** [@arundada9000](https://www.youtube.com/@arundada9000)
- **Instagram:** [@arundada9000](https://www.instagram.com/arundada9000)
- **Facebook:** [arundada9000](https://www.facebook.com/arundada9000)

---

## License

This project is open source and available under the [MIT License](LICENSE).

