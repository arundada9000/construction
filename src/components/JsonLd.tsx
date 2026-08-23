interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app';

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'GeneralContractor',
        '@id': `${BASE_URL}/#organization`,
        name: 'Sajilo Builder',
        legalName: 'Sajilo Digital Pvt. Ltd.',
        alternateName: ['सजिलो बिल्डर', 'Sajilo Digital Construction', 'Sajilo Builder Nepal'],
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/assets/images/home/logo.webp`,
          caption: 'Sajilo Builder Logo',
        },
        image: [
          `${BASE_URL}/assets/images/home/hero.webp`,
          `${BASE_URL}/assets/images/home/quality-safety.webp`,
        ],
        description:
          'Sajilo Builder by Sajilo Digital Pvt. Ltd. is a premier construction firm and heavy equipment rental provider in Nepal. Specializing in hospitals, commercial buildings, roads, bridges, and hydropower civil works.',
        foundingDate: '1978',
        founder: {
          '@type': 'Person',
          '@id': 'https://arunneupane.vercel.app/#arun-neupane',
          name: 'Arun Neupane',
          jobTitle: 'CTO & Lead Architect',
          worksFor: {
            '@type': 'Organization',
            name: 'Sajilo Digital Pvt. Ltd.',
            url: 'https://sajilodigital.com.np',
          },
          url: 'https://arunneupane.vercel.app',
          sameAs: [
            'https://github.com/arundada9000',
            'https://www.linkedin.com/in/arundada9000',
            'https://x.com/arundada9000',
            'https://www.youtube.com/@arundada9000',
            'https://www.instagram.com/arundada9000',
            'https://www.facebook.com/arundada9000',
          ],
        },
        parentOrganization: {
          '@type': 'Organization',
          name: 'Sajilo Digital Pvt. Ltd.',
          url: 'https://sajilodigital.com.np',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Main Road',
          addressLocality: 'Butwal',
          addressRegion: 'Lumbini Province',
          postalCode: '32907',
          addressCountry: 'NP',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 27.7006,
          longitude: 83.4484,
        },
        hasMap: 'https://maps.google.com/?q=Butwal,Nepal',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+977-9811420975',
            contactType: 'customer service',
            areaServed: 'NP',
            availableLanguage: ['English', 'Nepali', 'Hindi'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+977-9811420975',
            contactType: 'sales',
            areaServed: 'NP',
            availableLanguage: ['English', 'Nepali'],
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Nepal' },
          { '@type': 'AdministrativeArea', name: 'Lumbini Province' },
          { '@type': 'City', name: 'Butwal' },
          { '@type': 'City', name: 'Kathmandu' },
          { '@type': 'City', name: 'Pokhara' },
          { '@type': 'City', name: 'Chitwan' },
        ],
        knowsAbout: [
          'Commercial Building Construction',
          'Hospital Infrastructure',
          'Roads & Highway Construction',
          'Bridges & Civil RCC Works',
          'Hydropower Civil Works & Tunnel Excavation',
          'Heavy Equipment Rental',
          'Civil Engineering & QA/QC Standards',
        ],
        sameAs: [
          'https://github.com/arundada9000',
          'https://www.linkedin.com/in/arundada9000',
          'https://x.com/arundada9000',
          'https://www.youtube.com/@arundada9000',
          'https://www.instagram.com/arundada9000',
          'https://www.facebook.com/arundada9000',
          'https://sajilodigital.com.np',
        ],
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'GeneralContractor',
        '@id': `${BASE_URL}/#localbusiness`,
        name: 'Sajilo Builder - Sajilo Digital Pvt. Ltd.',
        image: [
          `${BASE_URL}/assets/images/home/hero.webp`,
          `${BASE_URL}/assets/images/home/logo.webp`,
          `${BASE_URL}/assets/images/services/building-construction.webp`,
          `${BASE_URL}/assets/images/services/bridges-structures.webp`,
        ],
        url: BASE_URL,
        telephone: '+977-9811420975',
        email: 'arunneupane0000@gmail.com',
        priceRange: '$$',
        currenciesAccepted: 'NPR, USD',
        paymentAccepted: 'Cash, Bank Wire, eSewa, Khalti',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Main Road',
          addressLocality: 'Butwal',
          addressRegion: 'Lumbini Province',
          postalCode: '32907',
          addressCountry: 'NP',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 27.7006,
          longitude: 83.4484,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        name: 'Sajilo Builder',
        alternateName: 'Sajilo Digital Construction',
        url: BASE_URL,
        inLanguage: ['en-US', 'ne-NP'],
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/en/projects?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function SiteNavigationJsonLd({ lang = 'en' }: { lang?: string }) {
  const items = [
    { name: lang === 'ne' ? 'होम' : 'Home', url: `/${lang}` },
    { name: lang === 'ne' ? 'हाम्रो बारेमा' : 'About Us', url: `/${lang}/about` },
    { name: lang === 'ne' ? 'सेवाहरू' : 'Services', url: `/${lang}/services` },
    { name: lang === 'ne' ? 'उपकरण भाडा' : 'Equipment Rental', url: `/${lang}/equipment-rental` },
    { name: lang === 'ne' ? 'परियोजनाहरू' : 'Projects', url: `/${lang}/projects` },
    { name: lang === 'ne' ? 'स्रोतहरू र ब्लग' : 'Resources & Blog', url: `/${lang}/blog` },
    { name: lang === 'ne' ? 'सम्पर्क' : 'Contact Us', url: `/${lang}/contact` },
  ];

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: items.map((item, i) => ({
          '@type': 'SiteNavigationElement',
          position: i + 1,
          name: item.name,
          url: `${BASE_URL}${item.url}`,
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  slug,
  lang = 'en',
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  slug: string;
  lang?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/${lang}/blog/${slug}`,
        },
        headline: title,
        description,
        image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
        datePublished,
        dateModified: dateModified || datePublished,
        inLanguage: lang === 'ne' ? 'ne-NP' : 'en-US',
        author: {
          '@type': 'Person',
          name: author,
          url: 'https://arunneupane.vercel.app',
          sameAs: [
            'https://github.com/arundada9000',
            'https://www.linkedin.com/in/arundada9000',
            'https://x.com/arundada9000',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sajilo Builder',
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/assets/images/home/logo.webp`,
          },
        },
        url: `${BASE_URL}/${lang}/blog/${slug}`,
      }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function ServicesCatalogJsonLd({ lang = 'en' }: { lang?: string }) {
  const services = [
    {
      name: lang === 'ne' ? 'भवन निर्माण' : 'Building Construction',
      description:
        lang === 'ne'
          ? 'अस्पताल, होटल, विद्यालय र व्यावसायिक भवनहरूको सम्पूर्ण निर्माण र फिनिसिङ।'
          : 'End-to-end delivery of hospitals, hotels, educational facilities, and commercial complexes with QA/QC compliance.',
      image: `${BASE_URL}/assets/images/services/building-construction.webp`,
    },
    {
      name: lang === 'ne' ? 'सडक र पूर्वाधार' : 'Roads & Infrastructure',
      description:
        lang === 'ne'
          ? 'सडक अपग्रेड, जलनिकास र नेपालको भूभाग अनुरूप इन्जिनियरिङ विकास।'
          : 'Road upgrading, drainage systems, and civil site engineering built for Nepal terrain and long-term durability.',
      image: `${BASE_URL}/assets/images/services/roads-infrastructure.webp`,
    },
    {
      name: lang === 'ne' ? 'पुल र सिविल संरचना' : 'Bridges & Civil Structures',
      description:
        lang === 'ne'
          ? 'पुल संरचना, गल्टी र उच्च गुणस्तरको RCC संरचना निर्माण।'
          : 'RCC bridges, culverts, and structural civil works delivered to strict national engineering standards.',
      image: `${BASE_URL}/assets/images/services/bridges-structures.webp`,
    },
    {
      name: lang === 'ne' ? 'टनल र जलविद्युत सिविल कार्य' : 'Tunnels & Hydropower Civil Works',
      description:
        lang === 'ne'
          ? 'टनल उत्खनन, पोर्टल र जलविद्युत सिविल कार्यहरू।'
          : 'Tunnel excavation support, intake structures, portals, and hydropower civil works with strict safety control.',
      image: `${BASE_URL}/assets/images/services/hydropower-tunnel.webp`,
    },
  ];

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Construction Services Catalog',
        itemListElement: services.map((s, idx) => ({
          '@type': 'Service',
          position: idx + 1,
          name: s.name,
          description: s.description,
          image: s.image,
          provider: {
            '@id': `${BASE_URL}/#organization`,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Nepal',
          },
        })),
      }}
    />
  );
}

export function EquipmentCatalogJsonLd({ lang = 'en' }: { lang?: string }) {
  const items = [
    {
      name: lang === 'ne' ? 'एक्स्काभेटर' : 'Excavator (Heavy Duty)',
      description: 'Heavy-duty excavation, trenching, and material handling across varied terrain and site conditions in Nepal.',
      image: `${BASE_URL}/assets/images/equipment/excavator.jpg`,
    },
    {
      name: lang === 'ne' ? 'रोलर कम्प्याक्टर' : 'Roller Compactor',
      description: 'High-force compaction for subgrade, base course, and asphalt layers ensuring structural density.',
      image: `${BASE_URL}/assets/images/equipment/roller.jpg`,
    },
    {
      name: lang === 'ne' ? 'मोटर ग्रेडर' : 'Motor Grader',
      description: 'Precision grading and leveling for roadbeds, embankments, and site preparation with fine tolerance control.',
      image: `${BASE_URL}/assets/images/equipment/grader.jpg`,
    },
    {
      name: lang === 'ne' ? 'ब्याकहो लोडर' : 'Backhoe Loader',
      description: 'Versatile digging, loading, and material placement with front loader and rear backhoe attachment.',
      image: `${BASE_URL}/assets/images/equipment/backhoe.jpg`,
    },
    {
      name: lang === 'ne' ? 'टिपर ट्रक' : 'Tipper Truck',
      description: 'High-capacity heavy haulage for aggregates, soil, and building materials.',
      image: `${BASE_URL}/assets/images/equipment/tipper.jpg`,
    },
    {
      name: lang === 'ne' ? 'ट्र्याक्टर' : 'Tractor',
      description: 'Multi-purpose pulling and hauling power for agricultural and construction site logistics.',
      image: `${BASE_URL}/assets/images/equipment/tractor.jpg`,
    },
  ];

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Construction Equipment Rental Catalog - Sajilo Builder',
        itemListElement: items.map((item, idx) => ({
          '@type': 'Product',
          position: idx + 1,
          name: item.name,
          description: item.description,
          image: item.image,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'NPR',
            price: 'Contact for Quote',
            availability: 'https://schema.org/InStock',
            seller: {
              '@id': `${BASE_URL}/#organization`,
            },
          },
        })),
      }}
    />
  );
}
