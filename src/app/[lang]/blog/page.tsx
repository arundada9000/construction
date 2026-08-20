import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/i18n/dictionaries';
import { posts } from '@/lib/blog-posts';
import AnimatedSection from '@/components/AnimatedSection';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  return {
    title: dict.insights.title,
    description: dict.insights.title,
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <img
          src="/assets/images/home/hero.webp"
          alt="Resources and insights"
          className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
        />
        <div className="hero-overlay absolute inset-0 z-10" />

        <div className="relative z-20 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0} direction="up">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              {dict.insights.title}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={150} direction="up">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {lang === 'ne' ? 'हाम्रो ब्लग र स्रोतहरू' : 'Our Blog & Resources'}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300} direction="up">
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              {dict.insights.subtitle}
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-black/40 to-transparent sm:h-20" />
      </section>

      {/* Posts Grid */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <AnimatedSection key={i} delay={i * 100} direction="up">
                <Link
                  href={`/${lang}/blog/${post.slug}/`}
                  className="group block h-full"
                >
                  <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--card)]" style={{ borderColor: 'var(--border)' }}>
                    <div className="h-52 overflow-hidden">
                      <img
                        src={post.image}
                        alt={lang === 'ne' ? post.titleNe : post.titleEn}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <time className="text-xs font-medium text-[var(--muted-foreground)]">
                        {lang === 'ne' ? post.dateNe : post.dateEn}
                      </time>
                      <h2 className="mt-2 text-lg font-semibold leading-snug">
                        {lang === 'ne' ? post.titleNe : post.titleEn}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {lang === 'ne' ? post.excerptNe : post.excerptEn}
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
        </div>
      </section>

      {/* CTA */}
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
