import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Plynth — Personalised music gifts',
    short_name: 'Plynth',
    description:
      'Personalised NFC vinyl-record magnets that play your song with a tap. A portfolio demonstration store by Koha Studio.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F0E8',
    theme_color: '#2C2416',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
