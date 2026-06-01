import type { MetadataRoute } from 'next';
import { products } from '@/lib/mock-store';

const SITE_URL = 'https://plynth.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/configure`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/case-study`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/pages/faq`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/pages/contact`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/pages/shipping`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/pages/refunds`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/pages/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/pages/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
