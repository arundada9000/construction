import type { MetadataRoute } from 'next';
import { posts } from '@/lib/blog-posts';

const BASE_URL = 'https://sajilodigital.com.np';

const staticPages = [
  { path: '', priority: 1.0, changefreq: 'weekly' as const },
  { path: '/about', priority: 0.8, changefreq: 'monthly' as const },
  { path: '/services', priority: 0.8, changefreq: 'monthly' as const },
  { path: '/equipment-rental', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/projects', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/blog', priority: 0.7, changefreq: 'weekly' as const },
  { path: '/contact', priority: 0.9, changefreq: 'monthly' as const },
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
      });
    }
  }

  for (const post of posts) {
    for (const lang of locales) {
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/blog/${post.slug}`,
            ne: `${BASE_URL}/ne/blog/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
