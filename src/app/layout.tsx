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
    default: 'Sajilo Digital Pvt. Ltd. — Digital Solutions & Project Management',
    template: '%s | Sajilo Digital Pvt. Ltd.',
  },
  description:
    'Sajilo Digital Pvt. Ltd. delivers digital solutions, web development, and project management with a focus on quality, innovation, and accountable delivery. Based in Butwal, Lumbini, Nepal.',
  keywords: [
    'digital solutions Nepal',
    'web development Nepal',
    'Next.js development',
    'React development',
    'project management Nepal',
    'Sajilo Digital',
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
  publisher: 'Sajilo Digital Pvt. Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Sajilo Digital Pvt. Ltd.',
    title: 'Sajilo Digital Pvt. Ltd. — Digital Solutions & Project Management',
    description:
      'Digital solutions, web development, and project management focused on quality, innovation, and accountable delivery.',
    images: [
      {
        url: '/assets/images/home/hero.webp',
        width: 1920,
        height: 1080,
        alt: 'Sajilo Digital Pvt. Ltd.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sajilo Digital Pvt. Ltd.',
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
