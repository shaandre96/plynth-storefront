import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your Plynth order. This is a simulated checkout — no payment is taken.',
  alternates: { canonical: '/checkout' },
  // Transactional page — keep it out of search results.
  robots: { index: false, follow: true },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
