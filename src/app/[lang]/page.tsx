import Link from 'next/link';
import { getDictionary, type Locale } from '@/i18n/dictionaries';
import AnimatedSection from '@/components/AnimatedSection';
import { posts } from '@/lib/blog-posts';

type Props = {
  params: Promise<{ lang: string }>;
};

const projects = [
  {
    titleEn: 'Regional Hospital Block',
    titleNe: 'क्षेत्रीय अस्पताल ब्लक',
    locationEn: 'Kathmandu',
    locationNe: 'काठमाडौं',
    color: 'from-zinc-700 to-zinc-800',
    image: '/assets/images/projects/hospital.webp',
  },
  {
    titleEn: 'Highway Bridge Section',
    titleNe: 'महासडक पुल खण्ड',
    locationEn: 'Pokhara',
    locationNe: 'पोखरा',
    color: 'from-zinc-700 to-zinc-900',
    image: '/assets/images/projects/infrastructure.webp',
  },
  {
    titleEn: 'Hydropower Civil Works',
    titleNe: 'जलविद्युत सिविल कार्य',
    locationEn: 'Solukhumbu',
    locationNe: 'सोलुखुम्बु',
    color: 'from-zinc-800 to-zinc-900',
    image: '/assets/images/projects/institutional.webp',
  },
];

const insights = posts.slice(0, 3);

const serviceImages = [
  '/assets/images/services/building-home.webp',
  '/assets/images/services/roads-home.webp',
  '/assets/images/services/bridges-home.webp',
  '/assets/images/services/hydropower-home.webp',
];

const serviceIcons = ['🏛️', '🛣️', '🌉', '⚡'];

export default async function HomePage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <img
          src="/assets/images/home/hero.webp"
          alt="Construction site panoramic view"
          className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
        />
        <div className="hero-overlay absolute inset-0 z-10" />

        <div className="relative z-20 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={100} direction="up">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {dict.hero.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300} direction="up">
            <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              {dict.hero.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={450} direction="up">
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <Link href={`/${lang}/contact/`} className="btn-primary px-8 py-3.5 text-base">
                {dict.hero.ctaPrimary}
              </Link>
              <Link href={`/${lang}/projects/`} className="btn-secondary border-white/25 bg-white/5 px-8 py-3.5 text-base text-white hover:bg-white/10 hover:text-white hover:border-white/40">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-black/40 to-transparent sm:h-20" />
      </section>

      {/* ───────────── Stats Bar ───────────── */}
      <section className="relative -mt-12 z-30 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {dict.stats.map((stat, i) => (
                <div
                  key={i}
                  className="card-hover rounded-2xl border bg-[var(--card)] p-6 text-center sm:p-8"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p className="text-2xl font-bold sm:text-3xl gradient-text">{stat.value}</p>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───────────── What We Build ───────────── */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.servicesPreview.title}</h2>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.servicesPreview.items.map((service, i) => (
              <AnimatedSection key={i} delay={i * 100} direction="up">
                <Link href={`/${lang}/services/`} className="group block h-full">
                  <div className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--card)]" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-44 overflow-hidden">
                      <img
                        src={serviceImages[i]}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400} direction="up">
            <div className="mt-12 text-center">
              <Link href={`/${lang}/services/`} className="btn-primary">
                {dict.servicesPreview.cta}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───────────── Equipment Rental Preview ───────────── */}
      <section className="section-muted py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.equipmentPreview.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--muted-foreground)]">{dict.equipmentPreview.subtitle}</p>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.equipmentPreview.items.map((eq, i) => (
              <AnimatedSection key={i} delay={i * 100} direction="up">
                <div className="card-hover rounded-2xl border bg-[var(--card)] p-6 text-center" style={{ borderColor: 'var(--border)' }}>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-light)] text-base font-bold text-[var(--brand)]">
                    {eq.code}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{eq.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">{eq.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400} direction="up">
            <div className="mt-12 text-center">
              <Link href={`/${lang}/equipment-rental/`} className="btn-secondary">
                {dict.equipmentPreview.cta}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───────────── Projects Preview ───────────── */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.projectsPreview.title}</h2>
                <p className="mt-3 max-w-xl text-[var(--muted-foreground)]">{dict.projectsPreview.subtitle}</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-10 -mx-4 overflow-x-auto px-4 pb-4 scrollbar-none sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex snap-x snap-mandatory gap-6" style={{ minWidth: 'max-content' }}>
              {projects.map((project, i) => (
                <AnimatedSection key={i} delay={i * 120} direction="up">
                  <div className="card-hover group w-[300px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border bg-[var(--card)] sm:w-[360px]" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-52 overflow-hidden">
                      <img
                        src={project.image}
                        alt={lang === 'ne' ? project.titleNe : project.titleEn}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-flex items-center rounded-full bg-[var(--brand-light)] px-3 py-1 text-xs font-medium text-[var(--brand)]">
                        {lang === 'ne' ? project.locationNe : project.locationEn}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold leading-snug">
                        {lang === 'ne' ? project.titleNe : project.titleEn}
                      </h3>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection delay={300} direction="up">
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href={`/${lang}/projects/`} className="btn-primary">
                {dict.projectsPreview.cta}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───────────── Latest Insights ───────────── */}
      <section className="section-muted py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.insights.title}</h2>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((article, i) => (
              <AnimatedSection key={i} delay={i * 100} direction="up">
                <Link
                  href={`/${lang}/blog/${article.slug}/`}
                  className="group block h-full"
                >
                  <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--card)]" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={lang === 'ne' ? article.titleNe : article.titleEn}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <time className="text-xs font-medium text-[var(--muted-foreground)]">
                        {lang === 'ne' ? article.dateNe : article.dateEn}
                      </time>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{lang === 'ne' ? article.titleNe : article.titleEn}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {lang === 'ne' ? article.excerptNe : article.excerptEn}
                      </p>
                      <div className="mt-4">
                        <span className="text-sm font-semibold text-[var(--brand)] transition-colors group-hover:text-[var(--brand-hover)]">
                          {lang === 'ne' ? 'पढ्नुहोस् →' : 'Read more →'}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300} direction="up">
            <div className="mt-12 text-center">
              <Link href={`/${lang}/blog/`} className="btn-secondary">
                {dict.insights.cta}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ───────────── Quality & Safety ───────────── */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection delay={0} direction="left">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/assets/images/home/quality-safety.webp"
                  alt="Quality and safety standards"
                  loading="lazy"
                  className="block aspect-[4/3] w-full object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150} direction="right">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.qualitySafety.title}</h2>
                <ul className="mt-8 space-y-5">
                  {dict.qualitySafety.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-1 flex h-2.5 w-2.5 flex-shrink-0 items-center justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
                      </span>
                      <span className="text-base leading-relaxed text-[var(--foreground)]">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link href={`/${lang}/about/`} className="btn-primary">
                    {dict.qualitySafety.cta}
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ───────────── CTA Banner ───────────── */}
      <section className="section-gradient py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <div className="flex flex-col items-center text-center">
              <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {dict.ctaBanner.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base text-[var(--muted-foreground)] sm:text-lg">
                {dict.ctaBanner.subtitle}
              </p>
              <div className="mt-10">
                <Link href={`/${lang}/contact/`} className="btn-primary px-10 py-4 text-base">
                  {dict.ctaBanner.cta}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
