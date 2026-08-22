import type { MetadataRoute } from 'next';
import { posts } from '@/lib/blog-posts';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arun-builder.vercel.app';

const staticPages = [
  {
    path: '',
    priority: 1.0,
    changefreq: 'daily' as const,
    images: [
      `${BASE_URL}/assets/images/home/hero.webp`,
      `${BASE_URL}/assets/images/home/logo.webp`,
      `${BASE_URL}/assets/images/home/quality-safety.webp`,
    ],
  },
  {
    path: '/services',
    priority: 0.95,
    changefreq: 'weekly' as const,
    images: [
      `${BASE_URL}/assets/images/services/building-construction.webp`,
      `${BASE_URL}/assets/images/services/roads-infrastructure.webp`,
      `${BASE_URL}/assets/images/services/bridges-structures.webp`,
      `${BASE_URL}/assets/images/services/hydropower-tunnel.webp`,
    ],
  },
  {
    path: '/equipment-rental',
    priority: 0.95,
    changefreq: 'weekly' as const,
    images: [
      `${BASE_URL}/assets/images/equipment/excavator.jpg`,
      `${BASE_URL}/assets/images/equipment/roller.jpg`,
      `${BASE_URL}/assets/images/equipment/grader.jpg`,
      `${BASE_URL}/assets/images/equipment/backhoe.jpg`,
      `${BASE_URL}/assets/images/equipment/tipper.jpg`,
      `${BASE_URL}/assets/images/equipment/tractor.jpg`,
    ],
  },
  {
    path: '/projects',
    priority: 0.9,
    changefreq: 'weekly' as const,
    images: [
      `${BASE_URL}/assets/images/projects/hospital.webp`,
      `${BASE_URL}/assets/images/projects/infrastructure.webp`,
      `${BASE_URL}/assets/images/projects/institutional.webp`,
    ],
  },
  {
    path: '/about',
    priority: 0.85,
    changefreq: 'monthly' as const,
    images: [
      `${BASE_URL}/assets/images/home/quality-safety.webp`,
    ],
  },
  {
    path: '/blog',
    priority: 0.85,
    changefreq: 'daily' as const,
    images: [
      `${BASE_URL}/assets/images/home/hero.webp`,
    ],
  },
  {
    path: '/contact',
    priority: 0.9,
    changefreq: 'monthly' as const,
    images: [
      `${BASE_URL}/assets/images/home/hero.webp`,
    ],
  },
];

const locales = ['en', 'ne'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const lang of locales) {
      entries.push({
        url: `${BASE_URL}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changefreq,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page.path}`,
            ne: `${BASE_URL}/ne${page.path}`,
          },
        },
        images: page.images,
      });
    }
  }

  for (const post of posts) {
    for (const lang of locales) {
      const postImage = post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`;
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/blog/${post.slug}`,
            ne: `${BASE_URL}/ne/blog/${post.slug}`,
          },
        },
        images: [postImage],
      });
    }
  }

  return entries;
}
