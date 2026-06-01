import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create yours',
  description:
    'Search any song, hear a 30-second preview, and watch the vinyl design itself — palette, style, and tagline suggested from the music.',
  alternates: { canonical: '/configure' },
  openGraph: {
    title: 'Create yours · Plynth',
    description: 'Search a song, hear a preview, and design your personalised vinyl.',
    url: '/configure',
  },
};

export default function ConfigureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
