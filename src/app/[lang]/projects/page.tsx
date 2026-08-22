import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/i18n/dictionaries';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectGrid from '@/components/ProjectGrid';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

type Props = { params: Promise<{ lang: string }> };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === 'ne'
    ? 'हाम्रा सम्पन्न तथा जारी निर्माण परियोजनाहरू'
    : 'Featured Construction Projects | Hospitals, Roads, Bridges & Hydropower';
  const desc = lang === 'ne'
    ? 'सजिलो बिल्डर - क्षेत्रीय अस्पताल ब्लक, महासडक पुल खण्ड, र जलविद्युत सिविल निर्माण परियोजना पोर्टफोलियो।'
    : 'Explore Sajilo Builder landmark construction projects across Nepal: Regional Hospitals, Highway Bridges, Institutional Facilities, and Hydropower Civil Infrastructure.';

  return {
    title,
    description: desc,
    keywords: [
      'construction projects Nepal',
      'hospital building Pokhara Kathmandu',
      'highway bridge construction',
      'hydropower infrastructure Nepal',
      'civil engineering portfolio',
    ],
    alternates: {
      canonical: `${BASE_URL}/${lang}/projects`,
      languages: {
        en: `${BASE_URL}/en/projects`,
        ne: `${BASE_URL}/ne/projects`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${BASE_URL}/${lang}/projects`,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/assets/images/projects/hospital.webp`,
          width: 1200,
          height: 630,
          alt: 'Featured Construction Projects - Sajilo Builder',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [`${BASE_URL}/assets/images/projects/hospital.webp`],
      creator: '@arundada9000',
    },
  };
}

const projects = [
  {
    title: 'Hospital Building',
    location: 'Pokhara',
    status: 'completed' as const,
    image: '/assets/images/projects/hospital.webp',
  },
  {
    title: 'Medical College',
    location: 'Pokhara',
    status: 'completed' as const,
    image: '/assets/images/projects/institutional.webp',
  },
  {
    title: 'Road Upgrading',
    location: 'Kaski',
    status: 'completed' as const,
    image: '/assets/images/services/roads-infrastructure.webp',
  },
  {
    title: 'Bridge Construction',
    location: 'Tanahu',
    status: 'completed' as const,
    image: '/assets/images/services/bridges-structures.webp',
  },
  {
    title: 'Hydropower Civil Works',
    location: 'Myagdi',
    status: 'completed' as const,
    image: '/assets/images/services/hydropower-tunnel.webp',
  },
  {
    title: 'School Building',
    location: 'Lalitpur',
    status: 'completed' as const,
    image: '/assets/images/projects/institutional.webp',
  },
  {
    title: 'Commercial Complex',
    location: 'Kathmandu',
    status: 'ongoing' as const,
    image: '/assets/images/services/building-construction.webp',
  },
  {
    title: 'Highway Upgrade',
    location: 'Chitwan',
    status: 'ongoing' as const,
    image: '/assets/images/services/roads-infrastructure.webp',
  },
];

const stats = [
  { value: '80+', labelEn: 'Projects Delivered', labelNe: 'परियोजना वितरित' },
  { value: '15+', labelEn: 'Years of Experience', labelNe: 'वर्षको अनुभव' },
  { value: '100%', labelEn: 'Commitment to Quality', labelNe: 'गुणस्तरप्रति प्रतिबद्धता' },
];

export default async function ProjectsPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: `/${lang}` }, { name: 'Projects', url: `/${lang}/projects` }]} />
      {/* Hero */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <img
          src="/assets/images/projects/infrastructure.webp"
          alt="Construction projects"
          className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
        />
        <div className="hero-overlay absolute inset-0 z-10" />

        <div className="relative z-20 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0} direction="up">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              {dict.projectsPage.title}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={150} direction="up">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {dict.projectsPage.subtitle}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300} direction="up">
            <div className="mt-12 grid grid-cols-3 gap-8 sm:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-brand sm:text-4xl md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-xs text-white/60 sm:text-sm">
                    {lang === 'ne' ? stat.labelNe : stat.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-black/40 to-transparent sm:h-20" />
      </section>

      {/* Projects Grid with Search & Filter */}
      <ProjectGrid
        projects={projects}
        lang={lang}
        completedLabel={dict.projectsPage.completed}
        ongoingLabel={dict.projectsPage.ongoing}
      />

      {/* CTA Banner */}
      <section className="section-gradient py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0} direction="up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {dict.ctaBanner.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150} direction="up">
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              {dict.ctaBanner.subtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300} direction="up">
            <div className="mt-8">
              <Link href={`/${lang}/contact/`} className="btn-primary">
                {dict.ctaBanner.cta}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
