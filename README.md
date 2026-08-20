<div align="center">

# Construction Company Website

**A modern, bilingual (EN/NP) corporate website built with Next.js 16, React 19, and Tailwind CSS v4.**

Featuring dark/light theme toggle, scroll animations, responsive design, blog system, and full Nepali translations.

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
- **Scroll Animations** — Intersection Observer-powered reveal animations on every section
- **Responsive** — Mobile-first design, works on all screen sizes
- **Blog System** — Dynamic blog posts with individual pages, share buttons, and CTA
- **Glass Morphism** — Frosted glass header that adapts on scroll
- **Card Hover Effects** — Lift animations, image zoom, border transitions
- **Touch Feedback** — Active states and scale animations for mobile devices
- **Accessible** — Focus-visible styles, semantic HTML, ARIA labels, reduced motion support

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Intersection Observer + CSS keyframes |
| Fonts | Geist Sans, Geist Mono |
| Deployment | Vercel / any Node.js host |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd construction-company-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   │   ├── layout.tsx          # Main layout with header/footer
│   │   ├── page.tsx            # Home page
│   │   ├── about/page.tsx      # About page
│   │   ├── services/page.tsx   # Services page
│   │   ├── equipment-rental/page.tsx
│   │   ├── projects/page.tsx   # Projects showcase
│   │   ├── contact/page.tsx    # Contact page
│   │   └── blog/
│   │       ├── page.tsx        # Blog index
│   │       └── [slug]/page.tsx # Blog post detail
│   ├── globals.css             # Theme system + animations
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Root redirect
├── components/
│   ├── Header.tsx              # Glass morphism header
│   ├── Footer.tsx              # 3-column footer
│   ├── ThemeProvider.tsx        # Dark/light toggle
│   └── AnimatedSection.tsx     # Scroll reveal wrapper
├── i18n/
│   ├── dictionaries.ts         # i18n helper
│   ├── en.json                 # English translations
│   └── ne.json                 # Nepali translations
├── lib/
│   └── blog-posts.ts           # Blog post data
└── middleware.ts                # Locale redirect
```

## Customization

### Changing the Brand Color

Edit the CSS custom properties in `src/app/globals.css`:

```css
:root {
  --brand: #e85d04;        /* Light mode brand color */
  --brand-hover: #dc4c00;  /* Light mode hover state */
  --brand-light: rgba(232, 93, 4, 0.08); /* Light mode bg tint */
}

.dark {
  --brand: #f97316;        /* Dark mode brand color */
  --brand-hover: #fb923c;  /* Dark mode hover state */
  --brand-light: rgba(249, 115, 22, 0.1); /* Dark mode bg tint */
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

### Adding/Changing Images

Place images in `public/assets/images/` and reference them as `/assets/images/your-image.webp` in components.

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Arun Neupane** — [arunneupane.vercel.app](https://arunneupane.vercel.app)

- GitHub: [@arundada9000](https://github.com/arundada9000)
- LinkedIn: [in/arundada9000](https://www.linkedin.com/in/arundada9000)
- Email: arunneupane0000@gmail.com
