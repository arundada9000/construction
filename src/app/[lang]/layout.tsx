import type { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/i18n/dictionaries';
import ThemeProvider from '@/components/ThemeProvider';
import ScrollToTop from '@/components/ScrollToTop';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import CraneTransition from '@/components/CraneTransition';
import SafetyTapeWipe from '@/components/SafetyTapeWipe';
import ConcretePour from '@/components/ConcretePour';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebsiteJsonLd,
} from '@/components/JsonLd';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: dict.meta.title,
      template: `%s | Sajilo Builder`,
    },
    description: dict.meta.description,
    keywords: [
      'digital solutions',
      'web development',
      'project management',
      'Nepal',
      'Sajilo Builder',
      'IT company Nepal',
      'Next.js development',
      'React development',
      'Butwal',
      'Lumbini',
    ],
    authors: [{ name: 'Arun Neupane', url: 'https://arunneupane.vercel.app' }],
    creator: 'Arun Neupane',
    publisher: 'Sajilo Builder',
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
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        en: `${BASE_URL}/en`,
        ne: `${BASE_URL}/ne`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'ne' ? 'ne_NP' : 'en_US',
      url: `${BASE_URL}/${lang}`,
      siteName: 'Sajilo Builder',
      title: dict.meta.title,
      description: dict.meta.description,
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
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/assets/images/home/hero.webp'],
      creator: '@arundada9000',
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <ServiceWorkerRegistration />
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <Header dict={dict} lang={locale} />
      <main id="content" className="flex-1 pb-20 md:pb-0">
        <SafetyTapeWipe>{children}</SafetyTapeWipe>
      </main>
      <Footer dict={dict} lang={locale} />
    </ThemeProvider>
  );
}
