import { getDictionary, type Locale } from '@/i18n/dictionaries';
import AnimatedSection from '@/components/AnimatedSection';
import TextReveal from '@/components/TextReveal';

type Props = { params: Promise<{ lang: string }> };

const equipment = [
  {
    code: 'GR',
    title: 'Grader',
    description: 'Precision grading and leveling for roadbeds, embankments, and site preparation with fine tolerance control.',
    image: '/assets/images/equipment/grader.jpg',
  },
  {
    code: 'RC',
    title: 'Roller Compactor',
    description: 'High-force compaction for subgrade, base course, and asphalt layers ensuring structural density.',
    image: '/assets/images/equipment/roller.jpg',
  },
  {
    code: 'EX',
    title: 'Excavator',
    description: 'Heavy-duty excavation, trenching, and material handling across varied terrain and site conditions.',
    image: '/assets/images/equipment/excavator.jpg',
  },
  {
    code: 'BL',
    title: 'Backhoe Loader',
    description: 'Versatile digging, loading, and material placement with front loader and rear backhoe attachment.',
    image: '/assets/images/equipment/backhoe.jpg',
  },
  {
    code: 'TR',
    title: 'Tractor',
    description: 'Multi-purpose pulling and hauling power for agricultural and construction site logistics.',
    image: '/assets/images/equipment/tractor.jpg',
  },
  {
    code: 'TP',
    title: 'Tipper',
    description: 'Efficient material haulage and dumping for aggregate, soil, and debris transport on active sites.',
    image: '/assets/images/equipment/tipper.jpg',
  },
  {
    code: 'WT',
    title: 'Water Tanker',
    description: 'Site water supply for dust suppression, compaction support, and concrete curing operations.',
  },
  {
    code: 'BS',
    title: 'Bitumen Sprayer',
    description: 'Controlled bitumen application for tack coats, prime coats, and surface treatment in road construction.',
  },
  {
    code: 'GM',
    title: 'Groomer',
    description: 'Surface grooming and material spreading for consistent layer thickness across pavement operations.',
  },
  {
    code: 'CP',
    title: 'Compressors',
    description: 'Portable compressed air supply for pneumatic tools, rock drilling, and site utility operations.',
  },
  {
    code: 'CS',
    title: 'Chip Spreader',
    description: 'Automated chip sealing for durable road surfaces with uniform aggregate distribution.',
  },
  {
    code: 'BC',
    title: 'Backhoe Loader Compactor',
    description: 'Combined digging and compaction capability for tight-access areas and multi-task site operations.',
  },
  {
    code: 'BR',
    title: 'Breaker',
    description: 'High-impact hydraulic breaking for rock demolition, concrete removal, and hard surface breaking.',
  },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

export default async function EquipmentRentalPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      {/* Hero Section */}
      <section className="section-gradient py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <AnimatedSection delay={0} direction="left">
                <span className="inline-flex items-center rounded-full bg-[var(--brand)]/10 px-4 py-1.5 text-sm font-medium text-[var(--brand)] mb-6">
                  {dict.equipmentPage.badge}
                </span>
              </AnimatedSection>
              <AnimatedSection delay={100} direction="up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  {dict.equipmentPage.title}
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={200} direction="up">
                <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {dict.equipmentPage.subtitle}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={300} direction="up">
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={`/${lang}/contact`} className="btn-primary">
                    Contact for Availability
                  </a>
                  <a
                    href="https://wa.me/9779811420975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white border-none"
                  >
                    <WhatsAppIcon />
                    WhatsApp Us
                  </a>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={200} direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)]">
                <img
                  src="/assets/images/services/overview.webp"
                  alt="Heavy equipment fleet"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--card)] to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Equipment Fleet Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {dict.equipmentPage.fleet}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={100} direction="up">
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              {dict.equipmentPage.fleetDescription}
            </p>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {equipment.map((item, index) => (
              <AnimatedSection
                key={item.code}
                delay={index * 75}
                direction="up"
              >
                {item.image ? (
                  <div className="ios-card ios-press overflow-hidden h-full group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold">
                        {item.code}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-[17px] font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="ios-card ios-press p-5 h-full">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-light text-brand text-sm font-bold shrink-0">
                        {item.code}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}

            {/* And Many More */}
            <AnimatedSection delay={equipment.length * 75} direction="up">
              <div className="ios-card ios-press p-5 h-full flex flex-col items-center justify-center text-center border-dashed border-brand/30 bg-brand/5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand text-lg font-bold mb-3">
                  +
                </span>
                <h3 className="text-[17px] font-semibold text-brand">
                  And Many More
                </h3>
                <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
                  Additional equipment available on request. Contact us for your specific project requirements.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Rent From Us */}
      <section className="section-muted py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0} direction="up">
            <TextReveal
              text={dict.equipmentPage.whyRent.title}
              as="h2"
              className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center"
            />
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.equipmentPage.whyRent.items.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={index * 100}
                direction="up"
              >
                <div className="ios-card ios-press p-5 text-center h-full group cursor-default transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <span className="text-brand group-hover:text-white transition-colors duration-300">
                      <CheckIcon />
                    </span>
                  </div>
                  <h3 className="text-[17px] font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-gradient py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0} direction="up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Need Equipment for Your Project?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150} direction="up">
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Reach out to discuss availability, timelines, and rental arrangements tailored to your project scope.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300} direction="up">
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/9779811420975"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white border-none"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
              <a href={`/${lang}/contact`} className="btn-primary">
                {dict.ctaBanner.cta}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
