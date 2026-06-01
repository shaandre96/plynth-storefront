import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'How the NFC vinyl plays, what songs you can choose, photo and customisation details, and how long orders take to press and ship.',
  alternates: { canonical: '/pages/faq' },
  openGraph: {
    title: 'FAQ · Plynth',
    description: 'Frequently asked, honestly answered.',
    url: '/pages/faq',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
