import type { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/i18n/dictionaries';
import ThemeProvider from '@/components/ThemeProvider';
import SettingsProvider from '@/components/SettingsContext';
import SettingsPanel from '@/components/SettingsPanel';
import ScrollToTop from '@/components/ScrollToTop';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import PageTransition from '@/components/PageTransition';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebsiteJsonLd,
  SiteNavigationJsonLd,
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

  const title = lang === 'ne'
    ? 'सजिलो बिल्डर - नेपालको अग्रणी निर्माण र भारी उपकरण भाडा सेवा'
    : 'Sajilo Builder | Leading Construction & Heavy Equipment Rental in Nepal';

  const description = lang === 'ne'
    ? 'सजिलो बिल्डर (सजिलो डिजिटल प्रा. लि.) - अस्पताल, भवन, सडक, पुल, जलविद्युत निर्माण र एक्स्काभेटर, रोलर, ग्रेडर उपकरण भाडा सेवा। बुटवल, काठमाडौं, पोखरा, नेपाल।'
    : 'Sajilo Builder by Sajilo Digital Pvt. Ltd. — Premier civil construction, hospital infrastructure, roads, bridges, hydropower civil works, and heavy equipment rental in Nepal.';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: `%s | Sajilo Builder`,
    },
    description,
    keywords: [
      'construction company Nepal',
      'heavy equipment rental Nepal',
      'excavator rental Butwal',
      'building contractor Nepal',
      'civil engineering Nepal',
      'road construction contractor',
      'bridge construction Nepal',
      'hydropower civil works Nepal',
      'Sajilo Builder',
      'Sajilo Digital Pvt Ltd',
      'Arun Neupane',
      'construction services Butwal Lumbini',
      'hospital building contractor Nepal',
      'roller compactor rental',
      'tipper truck rental Nepal',
    ],
    authors: [{ name: 'Arun Neupane', url: 'https://arunneupane.vercel.app' }],
    creator: 'Arun Neupane',
    publisher: 'Sajilo Digital Pvt. Ltd.',
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
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'ne' ? 'ne_NP' : 'en_US',
      alternateLocale: lang === 'ne' ? ['en_US'] : ['ne_NP'],
      url: `${BASE_URL}/${lang}`,
      siteName: 'Sajilo Builder',
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/assets/images/home/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'Sajilo Builder - Leading Construction & Heavy Equipment Rental in Nepal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/assets/images/home/hero.webp`],
      creator: '@arundada9000',
      site: '@arundada9000',
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
      <SettingsProvider>
        <ScrollToTop />
        <ServiceWorkerRegistration />
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        <SiteNavigationJsonLd lang={lang} />
        <Header dict={dict} lang={locale} />
        <main id="content" className="flex-1 pb-20 lg:pb-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer dict={dict} lang={locale} />
        <SettingsPanel />
      </SettingsProvider>
    </ThemeProvider>
  );
}
