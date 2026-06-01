import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions about a gift, an order, or a custom request? Write to the Plynth studio — we read every email and reply within two business days.',
  alternates: { canonical: '/pages/contact' },
  openGraph: {
    title: 'Contact · Plynth',
    description: 'Get in touch with the Plynth studio.',
    url: '/pages/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
