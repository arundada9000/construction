import type { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/i18n/dictionaries';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    title: dict.meta.title,
    description: dict.meta.description,
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
      <Header dict={dict} lang={locale} />
      <main id="content" className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer dict={dict} lang={locale} />
    </ThemeProvider>
  );
}
