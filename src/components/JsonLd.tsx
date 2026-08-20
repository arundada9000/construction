interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL = 'https://sajilodigital.com.np';

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Sajilo Digital Pvt. Ltd.',
        url: BASE_URL,
        logo: `${BASE_URL}/assets/images/home/logo.webp`,
        description:
          'Digital solutions, web development, and project management with a focus on quality, innovation, and accountable delivery.',
        foundingDate: '2025',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Butwal',
          addressRegion: 'Lumbini',
          addressCountry: 'NP',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+977-9811420975',
          contactType: 'customer service',
          availableLanguage: ['English', 'Nepali'],
        },
        sameAs: [
          'https://github.com/arundada9000',
          'https://www.linkedin.com/in/arundada9000',
          'https://x.com/arundada9000',
          'https://www.youtube.com/@arundada9000',
          'https://www.facebook.com/arundada9000',
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
        '@type': 'LocalBusiness',
        name: 'Sajilo Digital Pvt. Ltd.',
        image: `${BASE_URL}/assets/images/home/hero.webp`,
        url: BASE_URL,
        telephone: '+977-9811420975',
        email: 'arunneupane0000@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Butwal',
          addressRegion: 'Lumbini',
          addressCountry: 'NP',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 27.6967,
          longitude: 83.4674,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
        priceRange: '$$',
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
        name: 'Sajilo Digital Pvt. Ltd.',
        url: BASE_URL,
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
          item: `${BASE_URL}${item.url}`,
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
  author,
  slug,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
        datePublished,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sajilo Digital Pvt. Ltd.',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/assets/images/home/logo.webp`,
          },
        },
        url: `${BASE_URL}/en/blog/${slug}`,
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
