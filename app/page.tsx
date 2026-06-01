import Link from 'next/link';
import { VinylProduct } from '@/components/VinylProduct';
import { ArrowIcon } from '@/components/icons';
import { products, formatPrice } from '@/lib/mock-store';

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-page px-6 md:px-10 lg:px-14">
        <div className="grid min-h-[calc(100vh-170px)] grid-cols-1 items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="mb-7 flex items-center gap-3 md:mb-9">
              <span className="block h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                Personalised vinyl · est. 2024
              </span>
            </div>

            <h1
              className="font-serif leading-[1.02] tracking-[-0.01em] text-ink"
              style={{ fontSize: 'clamp(40px, 5.6vw, 78px)' }}
            >
              A song.
              <span className="block">A memory.</span>
              <span className="block">
                A gift they&rsquo;ll{' '}
                <em className="font-normal italic text-accent">never</em> forget.
              </span>
            </h1>

            <p className="mt-7 max-w-[480px] text-[17px] leading-[1.6] text-muted md:mt-8 md:text-[18px]">
              Personalised vinyl record magnets that play your song. Pressed to order in our
              Melbourne studio, tapped to life with a single touch.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-7 md:mt-10">
              <Link
                href="/configure"
                className="cta-amber inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14.5px] font-medium text-white md:px-7"
                style={{ letterSpacing: '0.01em' }}
              >
                Create Yours
                <ArrowIcon style={{ width: 14, height: 14 }} />
              </Link>

              <Link href="#how" className="group inline-flex items-center gap-2 text-[14.5px] text-ink">
                <span className="hairline relative inline-flex h-8 w-8 items-center justify-center rounded-full border bg-transparent">
                  <span
                    className="ml-0.5 block h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent"
                    style={{ borderLeftColor: '#2C2416' }}
                  />
                </span>
                <span className="underline-grow">See how it works</span>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12.5px] uppercase tracking-[0.16em] text-muted md:mt-12">
              <span className="whitespace-nowrap">30-day guarantee</span>
              <span className="dot" />
              <span className="whitespace-nowrap">Ships across Australia</span>
              <span className="dot" />
              <span className="whitespace-nowrap">Handcrafted to order</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto aspect-[5/6] max-w-[600px] sm:aspect-[6/7] lg:aspect-[5/6]">
              <VinylProduct spin />
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:bottom-5 md:left-5">
                No. 047 / Side A
              </div>
              <div className="absolute right-3 top-3 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:right-5 md:top-5">
                <div>Plynth Studio</div>
                <div>Melbourne</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hairline h-px border-t" />
        <div className="flex items-center justify-between py-5 font-mono text-[11.5px] uppercase tracking-[0.22em] text-muted">
          <span>As featured in — Broadsheet · Frankie · Smith Journal</span>
          <span className="hidden md:inline">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: '01',
    title: 'Pick a song',
    body: 'Search any track. Listen to a 30-second preview to make sure it is the one.',
  },
  {
    n: '02',
    title: 'AI-suggested artwork',
    body: 'Our model reads the mood and proposes a palette, a style, and a poetic tagline.',
  },
  {
    n: '03',
    title: 'Pressed to order',
    body: 'Hand-finished in our Melbourne studio. Shipped within five working days, across AU.',
  },
];

function HowItWorks() {
  return (
    <section id="how" className="relative">
      <div className="hairline border-t" />
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="mb-12 flex items-center gap-3">
          <span className="block h-px w-8 bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            How it works
          </span>
        </div>
        <h2 className="max-w-[720px] font-serif text-[38px] leading-[1.06] tracking-[-0.01em] text-ink md:text-[52px]">
          Three quiet steps, <em className="italic text-accent">from feeling to gift.</em>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {STEPS.map((s) => (
            <div key={s.n} className="surface-card p-8">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                Step {s.n}
              </div>
              <h3 className="mt-3 font-serif text-[26px] leading-[1.15] text-ink">{s.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsPreview() {
  return (
    <section id="editions" className="relative">
      <div className="hairline border-t" />
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              Three editions
            </div>
            <h2 className="max-w-[640px] font-serif text-[34px] leading-[1.08] tracking-[-0.01em] text-ink md:text-[44px]">
              Small objects, <em className="italic text-accent">made to mean a lot.</em>
            </h2>
          </div>
          <Link
            href="/shop"
            className="underline-grow inline-flex items-center gap-2 text-[14px] text-ink"
          >
            Shop the collection <ArrowIcon style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="sample-card group block overflow-hidden"
            >
              <div className="photo-ph aspect-[4/5]" />
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-[22px] text-ink">{p.name}</h3>
                  <span className="font-mono text-[12px] text-muted">{formatPrice(p.price)}</span>
                </div>
                <p className="mt-1 text-[13.5px] text-muted">{p.subtitle}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-ink">
                  <span className="underline-grow">Customise</span>
                  <ArrowIcon
                    style={{ width: 12, height: 12 }}
                    className="transition group-hover:text-accent"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  {
    quote:
      'I cried. He cried. The dog looked confused. The vinyl plays "our song" with a single tap.',
    name: 'Maeve R.',
    place: 'Brunswick, VIC',
  },
  {
    quote:
      'The detail. The packaging. The handwritten note — letterpressed. This is what gifting should feel like.',
    name: 'Tom O.',
    place: 'Newtown, NSW',
  },
  {
    quote:
      'Bought The Gift for my parents on their 40th. Mum has it on the fridge. Dad taps it every morning.',
    name: 'Priya N.',
    place: 'New Farm, QLD',
  },
];

function Reviews() {
  return (
    <section id="reviews" className="relative">
      <div className="hairline border-t" />
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="mb-12 flex items-center gap-3">
          <span className="block h-px w-8 bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            What people say
          </span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="surface-card p-8">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-accent">
                ★ ★ ★ ★ ★
              </div>
              <blockquote
                className="mt-4 font-serif text-[22px] leading-[1.3] text-ink"
                style={{ textWrap: 'balance' }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                {r.name} · {r.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <ProductsPreview />
      <Reviews />
    </main>
  );
}
