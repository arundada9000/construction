<div align="center">

# Sajilo Builder

**A modern, bilingual (EN/NP) construction company website built with Next.js 16, React 19, and Tailwind CSS v4.**

A product of [Sajilo Digital Pvt. Ltd.](https://sajilodigital.com.np)

Live Demo: [arun-builder.vercel.app](https://arun-builder.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Features

- **Bilingual** — Full English and Nepali (EN/NP) translations with one-click language switch
- **Dark/Light Theme** — Automatic detection + manual toggle, persisted in localStorage
- **SEO Optimized** — Dynamic sitemap, robots.txt, JSON-LD structured data, OpenGraph, Twitter cards
- **AEO Ready** — FAQ schema, breadcrumbs, article markup for AI search engines
- **Scroll Animations** — Intersection Observer-powered reveal animations on every section
- **Responsive** — Mobile-first design with bottom navigation bar on mobile
- **Blog System** — Dynamic blog posts with individual pages, share buttons, and CTA
- **Glass Morphism** — Frosted glass header that adapts on scroll
- **WhatsApp Integration** — Floating WhatsApp contact button
- **Accessible** — Focus-visible styles, semantic HTML, ARIA labels, reduced motion support

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Intersection Observer + CSS keyframes |
| Fonts | Geist Sans, Geist Mono |
| SEO | JSON-LD, OpenGraph, dynamic sitemap |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
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

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx              # Language layout with SEO metadata
│   │   ├── page.tsx                # Home page
│   │   ├── about/page.tsx          # About page
│   │   ├── services/page.tsx       # Services page
│   │   ├── equipment-rental/page.tsx
│   │   ├── projects/page.tsx       # Projects showcase
│   │   ├── contact/page.tsx        # Contact page
│   │   └── blog/
│   │       ├── page.tsx            # Blog index
│   │       └── [slug]/page.tsx     # Blog post detail
│   ├── globals.css                 # Theme system + animations
│   ├── layout.tsx                  # Root layout with favicon + SEO
│   ├── sitemap.ts                  # Dynamic sitemap
│   └── robots.ts                   # Robots.txt
├── components/
│   ├── Header.tsx                  # Glass morphism header + mobile nav
│   ├── Footer.tsx                  # 3-column footer
│   ├── ThemeProvider.tsx            # Dark/light toggle
│   ├── AnimatedSection.tsx         # Scroll reveal wrapper
│   ├── ScrollToTop.tsx             # Scroll reset on navigation
│   ├── ProjectGrid.tsx             # Searchable project grid
│   └── JsonLd.tsx                  # JSON-LD structured data
├── i18n/
│   ├── dictionaries.ts             # i18n helper
│   ├── en.json                     # English translations
│   └── ne.json                     # Nepali translations
├── lib/
│   └── blog-posts.ts               # Blog post data
└── middleware.ts                    # Locale redirect
```

## SEO / AEO Features

- **Dynamic Sitemap** — `/sitemap.xml` with all routes and i18n alternates
- **Robots.txt** — `/robots.txt` with crawl rules
- **JSON-LD** — Organization, LocalBusiness, WebSite, BreadcrumbList, Article schemas
- **OpenGraph** — Full OG metadata per page for social sharing
- **Twitter Cards** — Summary large image cards
- **Canonical URLs** — Proper canonical tags with hreflang alternates
- **Metadata** — Title, description, keywords per page

## Customization

### Changing the Brand Color

Edit the CSS custom properties in `src/app/globals.css`:

```css
:root {
  --brand: #e85d04;        /* Light mode brand color */
  --brand-hover: #dc4c00;  /* Light mode hover state */
  --brand-light: rgba(232, 93, 4, 0.08);
}

.dark {
  --brand: #f97316;        /* Dark mode brand color */
  --brand-hover: #fb923c;  /* Dark mode hover state */
  --brand-light: rgba(249, 115, 22, 0.1);
}
```

### Adding Blog Posts

Add new posts in `src/lib/blog-posts.ts`:

```typescript
{
  slug: 'my-new-post',
  dateEn: 'March 15, 2026',
  dateNe: 'मार्च १५, २०२६',
  authorEn: 'Author Name',
  authorNe: 'लेखक नाम',
  image: '/assets/images/my-image.webp',
  titleEn: 'English Title',
  titleNe: 'नेपाली शीर्षक',
  excerptEn: 'Short description...',
  excerptNe: 'संक्षिप्त विवरण...',
  contentEn: ['Paragraph 1...', 'Paragraph 2...'],
  contentNe: ['अनुच्छेद १...', 'अनुच्छेद २...'],
}
```

### Translations

Edit `src/i18n/en.json` and `src/i18n/ne.json` to update text content. Both files share the same structure.

## Available Routes

| Route | Description |
|-------|-------------|
| `/en` | Home (English) |
| `/ne` | Home (Nepali) |
| `/en/about` | About page |
| `/en/services` | Services page |
| `/en/equipment-rental` | Equipment rental |
| `/en/projects` | Projects showcase |
| `/en/blog` | Blog index |
| `/en/blog/[slug]` | Blog post detail |
| `/en/contact` | Contact page |
| `/sitemap.xml` | Dynamic sitemap |
| `/robots.txt` | Robots.txt |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Arun Neupane** — CTO & Lead Architect at Sajilo Digital Pvt. Ltd. (parent company of Sajilo Builder)

- Website: [sajilodigital.com.np](https://sajilodigital.com.np)
- GitHub: [@arundada9000](https://github.com/arundada9000)
- LinkedIn: [in/arundada9000](https://www.linkedin.com/in/arundada9000)
- X: [@arundada9000](https://x.com/arundada9000)
- YouTube: [@arundada9000](https://www.youtube.com/@arundada9000)
- Email: arunneupane0000@gmail.com
- Phone/WhatsApp: +977 9811420975
