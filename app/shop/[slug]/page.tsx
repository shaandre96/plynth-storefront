import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, products, formatPrice } from '@/lib/mock-store';
import { ProductGallery } from '@/components/ProductGallery';
import { PdpAccordion } from '@/components/PdpAccordion';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ArrowIcon } from '@/components/icons';

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not found' };

  const title = `${product.name} — ${product.subtitle}`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${title} · Plynth`,
      description: product.description,
      url: `/shop/${product.slug}`,
      type: 'website',
    },
  };
}

export default async function PdpPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} — ${product.subtitle}`,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Plynth' },
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      url: `https://plynth.studio/shop/${product.slug}`,
    },
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <div className="mx-auto max-w-page px-6 md:px-10 lg:px-14">
        <div className="mt-6 flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </div>

        <section className="grid grid-cols-1 items-start gap-10 pb-16 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery />
          </div>
          <div className="lg:col-span-5">
            <div className="sticky-details">
              <div className="mb-4 flex items-center gap-3">
                <span className="block h-px w-8 bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                  {product.name} · Edition 01
                </span>
              </div>

              <h1 className="font-serif text-[44px] leading-[1.04] tracking-[-0.01em] text-ink md:text-[52px]">
                {product.subtitle.split(' ').slice(0, -1).join(' ')}{' '}
                <em className="italic text-accent">
                  {product.subtitle.split(' ').slice(-1).join(' ')}
                </em>
              </h1>

              <div className="mt-5 flex items-end gap-4">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    From
                  </div>
                  <div className="mt-1.5 font-serif text-[28px] leading-none text-ink">
                    {formatPrice(product.price)}{' '}
                    <span className="align-middle font-sans text-[14px] text-muted">AUD</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pb-1">
                  <span className="text-accent">★ ★ ★ ★ ★</span>
                  <span className="text-[12.5px] text-muted">4.9 · 1,284 reviews</span>
                </div>
              </div>

              <p className="mt-6 max-w-[520px] text-[16px] leading-[1.6] text-muted">
                {product.description}
              </p>

              <AddToCartButton product={product} />

              <div className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
                <span className="whitespace-nowrap">30-day guarantee</span>
                <span className="dot" />
                <span className="whitespace-nowrap">Free AU shipping</span>
                <span className="dot" />
                <span className="whitespace-nowrap">Made to order</span>
              </div>

              <ul className="mt-9 flex flex-col gap-1.5">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="hairline flex items-start gap-4 border-b py-3 last:border-b-0"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm/60 text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="pt-1 text-[14px] leading-snug text-ink">{f}</span>
                  </li>
                ))}
              </ul>

              <PdpAccordion />
            </div>
          </div>
        </section>
      </div>

      <HowToCustomise />
      <Closer />
    </main>
  );
}

const STEPS = [
  { i: '01', t: 'Pick a song', d: 'Search the world’s catalogue. Tap previews and choose the track that means the most.' },
  { i: '02', t: 'Add a photo', d: 'Upload a moment — a portrait, a road trip, the day. We colour-tune it for the label.' },
  { i: '03', t: 'Write a line', d: 'A short engraving on the sleeve. Plynth AI can help if the words don’t come easily.' },
];

function HowToCustomise() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-24 lg:px-14">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                How to customise
              </span>
            </div>
            <h2 className="font-serif text-[36px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[44px]">
              Three steps. <em className="italic text-accent">Five minutes.</em>
            </h2>
          </div>
          <Link href="/configure" className="underline-grow text-[14px] text-ink">
            Start customising →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {STEPS.map((s) => (
            <div key={s.i} className="card-paper relative rounded-[14px] p-7 md:p-8">
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                  Step {s.i}
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm/70 text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
              </div>
              <div className="relative z-10 mt-5 font-serif text-[24px] text-ink">{s.t}</div>
              <p className="relative z-10 mt-2.5 text-[14px] leading-[1.6] text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-page px-6 py-20 text-center md:px-10 lg:px-14">
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          Ready when you are
        </div>
        <h2 className="mx-auto mt-4 max-w-[820px] font-serif text-[36px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[44px]">
          A song, a memory, pressed into something they&rsquo;ll keep on the fridge for years.
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/configure"
            className="cta-amber inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-medium"
          >
            Customise Yours
            <ArrowIcon style={{ width: 14, height: 14 }} />
          </Link>
          <Link href="/" className="underline-grow text-[14px] text-ink">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
