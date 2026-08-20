import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/i18n/dictionaries';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === 'ne' ? 'सेवाहरू' : 'Our Services';
  const desc = lang === 'ne'
    ? 'भवन निर्माण, सडक पूर्वाधार, पुल निर्माण, र जलविद्युत सिविल कार्य सेवाहरू।'
    : 'Building construction, road infrastructure, bridge construction, and hydropower civil works services.';
  return {
    title,
    description: desc,
    alternates: { canonical: `https://sajilodigital.com.np/${lang}/services` },
    openGraph: { title, description: desc, url: `https://sajilodigital.com.np/${lang}/services` },
  };
}

const coreServices = [
  {
    title: 'Building Construction',
    description:
      'End-to-end delivery of hospitals, hotels, schools, factories, and commercial facilities , from foundation to finishing with strict quality control.',
    bullets: [
      'Full project lifecycle management',
      'Compliance with national building codes',
      'Institutional and commercial expertise',
    ],
    image: '/assets/images/services/building-construction.webp',
    alt: 'Building construction site',
  },
  {
    title: 'Roads & Infrastructure',
    description:
      'Road upgrading, drainage systems, and site development engineered for Nepal\'s diverse terrain and long-term durability.',
    bullets: [
      'Rural and urban road networks',
      'Drainage and utility infrastructure',
      'Terrain-specific engineering solutions',
    ],
    image: '/assets/images/services/roads-infrastructure.webp',
    alt: 'Roads and infrastructure development',
  },
  {
    title: 'Bridges & Civil Structures',
    description:
      'Bridge structures, culverts, and RCC works delivered to specified standards with precision engineering and skilled execution.',
    bullets: [
      'RCC and steel bridge construction',
      'Culvert and retaining wall works',
      'Load-rated structural design',
    ],
    image: '/assets/images/services/bridges-structures.webp',
    alt: 'Bridge and civil structure construction',
  },
  {
    title: 'Hydropower & Tunnel Works',
    description:
      'Tunnel excavation support, portal construction, and hydropower civil works delivered with strict safety control and technical precision.',
    bullets: [
      'Tunnel excavation and support systems',
      'Headrace and tailrace channel works',
      'Powerhouse civil structures',
    ],
    image: '/assets/images/services/hydropower-tunnel.webp',
    alt: 'Hydropower and tunnel construction',
  },
  {
    title: 'Maintenance & Rehabilitation',
    description:
      'Structural assessment, retrofitting, and rehabilitation of existing buildings, roads, and infrastructure assets to extend service life.',
    bullets: [
      'Structural health assessment',
      'Retrofitting and strengthening works',
      'Road resurfacing and rehabilitation',
    ],
    image: '/assets/images/services/maintenance-rehab.webp',
    alt: 'Maintenance and rehabilitation work',
  },
  {
    title: 'Construction Consultation',
    description:
      'Expert guidance on feasibility, design coordination, cost estimation, and execution strategy backed by decades of field experience.',
    bullets: [
      'Feasibility and cost-benefit analysis',
      'Design review and value engineering',
      'Project scheduling and risk advisory',
    ],
    image: '/assets/images/home/quality-safety.webp',
    alt: 'Construction consultation and planning',
  },
];

function ShieldIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: `/${lang}` }, { name: 'Services', url: `/${lang}/services` }]} />
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection direction="left">
              <span
                className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
                style={{
                  backgroundColor: 'var(--brand-light)',
                  color: 'var(--brand)',
                }}
              >
                {dict.nav.services}
              </span>
              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: 'var(--foreground)' }}
              >
                {dict.servicesPage.title}
              </h1>
              <p
                className="mt-6 max-w-xl text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {dict.servicesPage.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/${lang}/contact/`} className="btn-primary">
                  {dict.hero.ctaPrimary}
                </Link>
                <Link href={`/${lang}/projects/`} className="btn-secondary">
                  {dict.hero.ctaSecondary}
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={150}>
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                  style={{ background: 'var(--brand)' }}
                />
                <div className="relative overflow-hidden rounded-2xl h-64 lg:h-80">
                  <img
                    src="/assets/images/services/overview.webp"
                    alt="Construction services overview"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Core Services (Alternating Layout) ─── */}
      <section className="section-muted">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <AnimatedSection className="mb-16 text-center">
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
              style={{
                backgroundColor: 'var(--brand-light)',
                color: 'var(--brand)',
              }}
            >
              {dict.servicesPage.coreServices}
            </span>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--foreground)' }}
            >
              {dict.servicesPage.title}
            </h2>
          </AnimatedSection>

          <div className="flex flex-col gap-20">
            {coreServices.map((service, i) => {
              const imageOnLeft = i % 2 === 0;
              return (
                <AnimatedSection
                  key={service.title}
                  direction={imageOnLeft ? 'left' : 'right'}
                  delay={100}
                >
                  <div
                    className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                      imageOnLeft ? '' : 'lg:[direction:rtl]'
                    }`}
                  >
                    <div className="lg:[direction:ltr]">
                      <div className="relative overflow-hidden rounded-2xl h-64 lg:h-80">
                        <img
                          src={service.image}
                          alt={service.alt}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="lg:[direction:ltr]">
                      <h3
                        className="text-2xl font-bold tracking-tight sm:text-3xl"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="mt-4 text-base leading-relaxed"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {service.description}
                      </p>
                      <ul className="mt-6 flex flex-col gap-3">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span
                              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                              style={{ backgroundColor: 'var(--brand)' }}
                            />
                            <span
                              className="text-sm font-medium leading-relaxed"
                              style={{ color: 'var(--foreground)' }}
                            >
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Construction Process ─── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <AnimatedSection className="mb-16 text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--foreground)' }}
            >
              {dict.servicesPage.process.title}
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Desktop connecting line */}
            <div
              className="absolute left-0 right-0 top-8 hidden h-px lg:block"
              style={{ backgroundColor: 'var(--border)' }}
            />

            <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
              {dict.servicesPage.process.steps.map((step, i) => (
                <AnimatedSection key={step.title} delay={i * 120} direction="up">
                  <div className="relative flex flex-col items-center text-center">
                    {/* Step circle */}
                    <div
                      className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{ backgroundColor: 'var(--brand)' }}
                    >
                      {i + 1}
                    </div>

                    {/* Mobile connecting line */}
                    {i < dict.servicesPage.process.steps.length - 1 && (
                      <div
                        className="mb-6 h-10 w-px lg:hidden"
                        style={{ backgroundColor: 'var(--border)' }}
                      />
                    )}

                    <h3
                      className="text-lg font-bold"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Clients Trust Us ─── */}
      <section className="section-muted">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <AnimatedSection className="mb-16 text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--foreground)' }}
            >
              {dict.servicesPage.whyTrust.title}
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dict.servicesPage.whyTrust.items.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 120} direction="up">
                <div
                  className="card-hover group rounded-2xl p-8"
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand)',
                    }}
                  >
                    <ShieldIcon />
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Equipment Rental Preview ─── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <AnimatedSection className="mb-16 text-center">
            <span
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
              style={{
                backgroundColor: 'var(--brand-light)',
                color: 'var(--brand)',
              }}
            >
              {dict.equipmentPreview.title}
            </span>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--foreground)' }}
            >
              {dict.equipmentPreview.title}
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-base"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {dict.equipmentPreview.subtitle}
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {dict.equipmentPreview.items.map((item, i) => (
              <AnimatedSection key={item.code} delay={i * 100} direction="up">
                <div
                  className="card-hover group flex items-start gap-5 rounded-2xl p-6"
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                    style={{
                      backgroundColor: 'var(--brand)',
                      color: 'white',
                    }}
                  >
                    {item.code}
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: 'var(--card-foreground)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center" delay={400}>
            <Link href={`/${lang}/equipment-rental/`} className="btn-secondary">
              {dict.equipmentPreview.cta}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="section-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <AnimatedSection className="text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              style={{ color: 'var(--foreground)' }}
            >
              {dict.ctaBanner.title}
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {dict.ctaBanner.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact/`} className="btn-primary">
                {dict.ctaBanner.cta}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
