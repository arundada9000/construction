import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/i18n/dictionaries';
import AnimatedSection from '@/components/AnimatedSection';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ lang: string }> };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app';

const contactFaqs = [
  {
    question: 'How can I request a project quotation or equipment rental estimate?',
    answer:
      'You can submit the consultation request form on this page, email us directly at arunneupane0000@gmail.com, or message/call our hotline via WhatsApp at +977 9811420975.',
  },
  {
    question: 'Where is your primary office located for in-person meetings?',
    answer:
      'Our registered corporate office is located in Butwal, Lumbini Province, Nepal, with active field operations in Kathmandu, Pokhara, and across nationwide project sites.',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === 'ne'
    ? 'सम्पर्क गर्नुहोस् - निर्माण परामर्श तथा उपकरण बुकिङ'
    : 'Contact Sajilo Builder | Office Location, Phone, Email & WhatsApp';
  const desc = lang === 'ne'
    ? 'सजिलो बिल्डर (सजिलो डिजिटल प्रा. लि.) - सम्पर्क नम्बर +९७७ ९८११४२०९७५, इमेल arunneupane0000@gmail.com, बुटवल, नेपाल।'
    : 'Contact Sajilo Builder (Sajilo Digital Pvt. Ltd.) in Butwal, Nepal. Call/WhatsApp +977 9811420975 or email arunneupane0000@gmail.com for construction consultation and machinery rental.';

  return {
    title,
    description: desc,
    keywords: [
      'contact Sajilo Builder',
      'construction contractor phone number Nepal',
      'Arun Neupane contact',
      'Butwal construction office address',
      'equipment hire booking Nepal',
    ],
    alternates: {
      canonical: `${BASE_URL}/${lang}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        ne: `${BASE_URL}/ne/contact`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${BASE_URL}/${lang}/contact`,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/assets/images/home/hero.webp`,
          width: 1200,
          height: 630,
          alt: 'Contact Sajilo Builder - Butwal, Nepal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [`${BASE_URL}/assets/images/home/hero.webp`],
      creator: '@arundada9000',
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);
  const cp = dict.contactPage;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: `/${lang}` }, { name: 'Contact', url: `/${lang}/contact` }]} />
      <FAQJsonLd faqs={contactFaqs} />
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <img
          src="/assets/images/home/hero.webp"
          alt="Contact Sajilo Builder"
          className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
        />
        <div className="hero-overlay absolute inset-0 z-10" />

        <div className="relative z-20 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0} direction="up">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {cp.badge}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={150} direction="up">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {cp.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300} direction="up">
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              {cp.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={450} direction="up">
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/9779811420975?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1ebe57] hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:arunneupane0000@gmail.com?subject=Project%20Inquiry"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email Us
              </a>
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-black/40 to-transparent sm:h-20" />
      </section>

      {/* ── Office Cards ── */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection delay={0} direction="up">
              <div className="card-hover rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{cp.offices.registered}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Sajilo Builder<br />
                  <span className="text-sm text-muted-foreground">by Sajilo Digital Pvt. Ltd.</span>
                  <br />
                  Butwal, Lumbini, Nepal
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100} direction="up">
              <div className="card-hover rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{cp.offices.city}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Butwal, Lumbini, Nepal
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} direction="up">
              <div className="card-hover rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{cp.details}</h3>
                <div className="mt-3 space-y-2 text-muted-foreground">
                  <p>
                    <a href="tel:+9771423456" className="hover:text-brand transition-colors">
                      +977-1-423456
                    </a>
                  </p>
                  <p>
                    <a href="tel:+9779811420975" className="hover:text-brand transition-colors">
                      +977-9811420975
                    </a>
                  </p>
                  <p>
                    <a href="mailto:arunneupane0000@gmail.com" className="hover:text-brand transition-colors">
                      arunneupane0000@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Quick Contact ── */}
      <section className="section-muted py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection delay={0} direction="up" className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {cp.quickContact.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {cp.quickContact.subtitle}
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <AnimatedSection delay={100} direction="left">
              <div className="card-hover flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm0 0a5 5 0 0 0 5 5m0 0a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">{cp.quickContact.whatsapp}</h3>
                <p className="mt-2 text-muted-foreground">+977 9811420975</p>
                <a
                  href="https://wa.me/9779811420975?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]"
                >
                  Open WhatsApp
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} direction="right">
              <div className="card-hover flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">{cp.quickContact.email}</h3>
                <p className="mt-2 text-muted-foreground">arunneupane0000@gmail.com</p>
                <a
                  href="mailto:arunneupane0000@gmail.com?subject=Project%20Inquiry"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
                >
                  Email Us
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <AnimatedSection delay={0} direction="up" className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {cp.map.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {cp.map.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150} direction="up">
            <div className="relative mt-12 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 aspect-video flex flex-col items-center justify-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-zinc-400 dark:text-zinc-500"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">Map Location</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section-gradient py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection delay={0} direction="up">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {cp.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {cp.ctaSubtitle}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-light"
            >
              {dict.ctaBanner.cta}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
