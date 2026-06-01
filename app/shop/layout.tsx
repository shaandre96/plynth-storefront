import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Three small editions, made to mean a lot — The Vinyl, The Key, and The Gift. Personalised NFC music keepsakes, pressed to order.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop · Plynth',
    description: 'Three small editions, made to mean a lot. Personalised NFC music keepsakes.',
    url: '/shop',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
