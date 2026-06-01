import type { MetadataRoute } from 'next';

const SITE_URL = 'https://plynth.studio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep the transactional checkout out of the index.
      disallow: '/checkout',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
