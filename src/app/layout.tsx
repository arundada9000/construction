import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app'),
  title: {
    default: 'Sajilo Builder — Construction & Digital Solutions by Sajilo Digital Pvt. Ltd.',
    template: '%s | Sajilo Builder',
  },
  description:
    'Sajilo Builder by Sajilo Digital Pvt. Ltd. — Construction, civil works, web development, and project management in Butwal, Lumbini, Nepal.',
  keywords: [
    'digital solutions Nepal',
    'web development Nepal',
    'Next.js development',
    'React development',
    'project management Nepal',
    'Sajilo Builder',
    'IT company Nepal',
    'Butwal IT company',
    'Lumbini digital agency',
    'construction project management',
    'civil engineering Nepal',
    'hydropower Nepal',
    'road infrastructure Nepal',
  ],
  authors: [{ name: 'Arun Neupane', url: 'https://arunneupane.vercel.app' }],
  creator: 'Arun Neupane',
  publisher: 'Sajilo Builder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Sajilo Builder',
    title: 'Sajilo Builder — Construction & Digital Solutions',
    description:
      'Digital solutions, web development, and project management focused on quality, innovation, and accountable delivery.',
    images: [
      {
        url: '/assets/images/home/hero.webp',
        width: 1920,
        height: 1080,
        alt: 'Sajilo Builder — Construction & Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sajilo Builder',
    description:
      'Digital solutions, web development, and project management focused on quality, innovation, and accountable delivery.',
    images: ['/assets/images/home/hero.webp'],
    creator: '@arundada9000',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
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
      <body className="min-h-screen font-sans antialiased flex flex-col">{children}</body>
    </html>
  );
}
