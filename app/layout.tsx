import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { DemoBanner } from '@/components/DemoBanner';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Analytics } from '@vercel/analytics/next';
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

const SITE_URL = 'https://plynth.studio';
const SITE_NAME = 'Plynth';
const SITE_DESCRIPTION =
  'Plynth turns a song into a keepsake — personalised NFC vinyl-record magnets that play your song with a tap. A portfolio demonstration store by Koha Studio.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Plynth — Personalised music gifts',
    template: '%s · Plynth',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'personalised vinyl',
    'NFC vinyl magnet',
    'music gift',
    'custom record',
    'song gift',
    'vinyl keepsake',
    'Plynth',
  ],
  authors: [{ name: 'Koha Studio' }],
  creator: 'Koha Studio',
  publisher: 'Koha Studio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Plynth — Personalised music gifts',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plynth — Personalised music gifts',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
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
        <Analytics />
      </body>
    </html>
  );
}
