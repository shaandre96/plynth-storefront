import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { DemoBanner } from '@/components/DemoBanner';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Plynth — Personalised music gifts',
  description:
    'Plynth turns a song into a keepsake. A portfolio demonstration store by Koha Studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body>
        <StoreProvider>
          <div className="relative min-h-screen">
            <div className="paper-grain pointer-events-none absolute inset-0" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <DemoBanner />
              <Navigation />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
            <CartDrawer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
