import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sajilo Builder | Leading Construction & Heavy Equipment Rental in Nepal',
    template: '%s | Sajilo Builder',
  },
  description:
    'Sajilo Builder by Sajilo Digital Pvt. Ltd. — Premier civil engineering, commercial building, roads, bridges, hydropower works, and excavator/heavy equipment rental in Nepal.',
  keywords: [
    'construction company Nepal',
    'heavy equipment rental Nepal',
    'excavator hire Butwal',
    'building contractor Kathmandu',
    'civil engineering Nepal',
    'road infrastructure construction Nepal',
    'RCC bridge construction',
    'hydropower civil works',
    'Sajilo Builder',
    'Sajilo Digital Pvt. Ltd.',
    'Arun Neupane',
    'construction machinery rental',
    'commercial building contractor',
    'hospital construction Nepal',
    'roller compactor rental Butwal',
    'tipper truck rental',
  ],
  authors: [{ name: 'Arun Neupane', url: 'https://arunneupane.vercel.app' }],
  creator: 'Arun Neupane',
  publisher: 'Sajilo Digital Pvt. Ltd.',
  applicationName: 'Sajilo Builder',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Sajilo Builder',
    title: 'Sajilo Builder | Leading Construction & Heavy Equipment Rental in Nepal',
    description:
      'Premier civil engineering, commercial & hospital building, infrastructure roads, bridges, hydropower works, and equipment rental across Nepal.',
    images: [
      {
        url: '/assets/images/home/hero.webp',
        width: 1920,
        height: 1080,
        alt: 'Sajilo Builder - Leading Construction & Heavy Equipment Rental in Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sajilo Builder | Leading Construction & Heavy Equipment Rental in Nepal',
    description:
      'Premier civil engineering, commercial building, infrastructure roads, bridges, and equipment rental in Nepal.',
    images: ['/assets/images/home/hero.webp'],
    creator: '@arundada9000',
    site: '@arundada9000',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      ne: `${SITE_URL}/ne`,
      'x-default': `${SITE_URL}/en`,
    },
  },
  verification: {
    google: 'y_iQncnrIS7Nycs-SFAgvF9aPPyozMkTeJhrDnmS2R0',
  },
  other: {
    'google-adsense-account': 'ca-pub-1708134460872611',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
