import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/i18n/dictionaries';
import AnimatedSection from '@/components/AnimatedSection';
import TextReveal from '@/components/TextReveal';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === 'ne' ? 'हाम्रो बारेमा' : 'About Us';
  const desc = lang === 'ne'
    ? 'सजिलो डिजिटल प्रा. लि. — गुणस्तर, नवप्रवर्तन, र जवाफदेहितामा केन्द्रित डिजिटल समाधान।'
    : 'Sajilo Builder by Sajilo Digital Pvt. Ltd. — Construction and digital solutions focused on quality, innovation, and accountability.';
  return {
    title,
    description: desc,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app'}/${lang}/about` },
    openGraph: { title, description: desc, url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app'}/${lang}/about` },
  };
}

const ICONS = {
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M4 22V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M4 22h16" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  ),
  road: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M4 19L8 5" />
      <path d="M16 5l4 14" />
      <path d="M10 8h.01M10 12h.01M14 8h.01M14 12h.01" />
      <path d="M2 22h20" />
    </svg>
  ),
  bridge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M4 10h16" />
      <path d="M4 10v2a8 8 0 0 0 16 0v-2" />
      <path d="M6 10V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
      <path d="M14 10V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
      <path d="M4 10v8M20 10v8" />
      <path d="M8 18h8" />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 2C6.5 8 4 12.5 4 15a8 8 0 0 0 16 0c0-2.5-2.5-7-8-13Z" />
      <path d="M12 18a4 4 0 0 0 4-4c0-1.5-1.5-4-4-7" />
    </svg>
  ),
} as const;

const SERVICE_ICONS = [ICONS.building, ICONS.road, ICONS.bridge, ICONS.water];

const HIGHLIGHT_ICONS = [
  <svg key="pub" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" /></svg>,
  <svg key="multi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  <svg key="safety" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="time" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
];

export default async function AboutPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);
  const about = dict.about;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: `/${lang}` }, { name: 'About', url: `/${lang}/about` }]} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <AnimatedSection delay={0} direction="left">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-brand-light text-brand border border-brand/20">
                  {about.badge}
                </span>
              </AnimatedSection>
              <AnimatedSection delay={120} direction="up">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground">
                  {about.title}
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={240} direction="up">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {about.subtitle}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={360} direction="up">
                <Link href={`/${lang}/contact`} className="btn-primary mt-2">
                  {dict.hero.ctaPrimary}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L11.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 1 1-1.04-1.08l3.158-2.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" /></svg>
                </Link>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={200} direction="right" className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src="/assets/images/home/hero.webp" alt="Construction site overview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Our Journey (Timeline) ── */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up" className="text-center mb-16">
            <TextReveal
              text={about.journey.title}
              as="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
            />
          </AnimatedSection>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
            {about.journey.items.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 150} direction="left">
                <div className="relative mb-10 last:mb-0 group">
                  <div className="absolute -left-5 top-1 w-7 h-7 rounded-full bg-brand flex items-center justify-center ring-4 ring-muted/40 transition-transform duration-300 group-hover:scale-125">
                    <span className="text-[10px] font-bold text-white leading-none">{i + 1}</span>
                  </div>
                  <div className="ml-4 ios-press rounded-2xl p-4 transition-all duration-300 hover:bg-card hover:shadow-sm cursor-default">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand text-white mb-3 transition-transform duration-300 group-hover:scale-105">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 relative">
            <div className="absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border" />
            {about.journey.items.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 180} direction="up">
                <div className="text-center relative group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-brand mx-auto mb-6 flex items-center justify-center ring-4 ring-muted/40 relative z-10 transition-all duration-300 group-hover:scale-125 group-hover:ring-brand/20">
                    <span className="text-xs font-bold text-white leading-none">{i + 1}</span>
                  </div>
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-bold bg-brand text-white mb-4 transition-transform duration-300 group-hover:scale-110">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300 group-hover:text-brand">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection delay={0} direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src="/assets/images/services/building-construction.webp" alt="Building construction" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150} direction="right">
              <div className="border border-border rounded-2xl p-8 lg:p-10 bg-card shadow-sm">
                <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-2 block">
                  {about.leadership.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {about.leadership.name}
                </h3>
                <div className="w-12 h-1 bg-brand rounded-full mb-6" />
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {about.leadership.description}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── COO Section (reversed) ── */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection delay={0} direction="left" className="order-2 lg:order-1">
              <div className="border border-border rounded-2xl p-8 lg:p-10 bg-card shadow-sm">
                <span className="text-sm font-semibold text-brand uppercase tracking-wider mb-2 block">
                  {about.leadership.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {about.leadership.name}
                </h3>
                <div className="w-12 h-1 bg-brand rounded-full mb-6" />
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {about.leadership.description}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150} direction="right" className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src="/assets/images/services/roads-infrastructure.webp" alt="Road infrastructure work" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── What We Deliver ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {about.whatWeDeliver.title}
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.whatWeDeliver.items.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100} direction="up">
                <div className="card-hover border border-border rounded-2xl p-6 lg:p-8 bg-card h-full">
                  <div className="w-14 h-14 rounded-xl bg-brand-light text-brand flex items-center justify-center mb-5">
                    {SERVICE_ICONS[i]}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality & Safety Culture ── */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <AnimatedSection delay={0} direction="left">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {dict.qualitySafety.title}
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={120} direction="up">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {about.subtitle}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={200} direction="up">
                <ul className="space-y-3">
                  {dict.qualitySafety.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3"><path d="M10 3L4.5 8.5 2 6" /></svg>
                      </span>
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
              <AnimatedSection delay={320} direction="up">
                <Link href={`/${lang}/contact`} className="btn-primary mt-2">
                  {dict.qualitySafety.cta}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L11.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 1 1-1.04-1.08l3.158-2.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" /></svg>
                </Link>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={150} direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src="/assets/images/home/quality-safety.webp" alt="Quality and safety standards" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.highlights.map((item, i) => (
              <AnimatedSection key={item} delay={i * 100} direction="up">
                <div className="card-hover border border-border rounded-2xl bg-card overflow-hidden h-full">
                  <div className="h-1 bg-brand" />
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-brand-light text-brand flex items-center justify-center mb-4">
                      {HIGHLIGHT_ICONS[i]}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{item}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section-gradient py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0} direction="up">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              {dict.ctaBanner.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150} direction="up">
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {dict.ctaBanner.subtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300} direction="scale">
            <Link href={`/${lang}/contact`} className="btn-primary">
              {dict.ctaBanner.cta}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L11.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 1 1-1.04-1.08l3.158-2.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" /></svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
