import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Case study — Plynth · Koha Studio',
  description:
    'How Koha Studio designed and built Plynth, a personalised-vinyl storefront demo: search, AI-assisted artwork, a four-step configurator, and a hand-tuned cart.',
};

const FACTS = [
  { k: 'Role', v: 'Design & build' },
  { k: 'Studio', v: 'Koha Studio' },
  { k: 'Timeline', v: '~2 weeks' },
  { k: 'Type', v: 'Portfolio demo' },
];

const STACK = [
  { name: 'Next.js 15', note: 'App Router, server + client components' },
  { name: 'React 19', note: 'The configurator & cart UI' },
  { name: 'Redux Toolkit', note: 'Cart, configurator, and UI slices' },
  { name: 'Tailwind CSS', note: 'A small hand-built design system' },
  { name: 'iTunes Search API', note: 'Live track search + 30s previews' },
  { name: 'Claude (Anthropic SDK)', note: 'Mood → palette, style, tagline' },
];

const BUILT = [
  {
    n: '01',
    title: 'A four-step configurator',
    body: 'Search → listen → confirm → design. State lives in a dedicated Redux slice so a half-finished gift survives navigation, and the live preview disc re-skins itself from the chosen palette.',
  },
  {
    n: '02',
    title: 'Real music search',
    body: 'A thin API route proxies the iTunes Search API for genuine track results and 30-second audio previews — no mocked catalogue behind the search box.',
  },
  {
    n: '03',
    title: 'AI-assisted artwork',
    body: 'A server route hands the track to Claude, which returns a colour palette, a style, and a short poetic tagline. It degrades to a tasteful fallback when no API key is present.',
  },
  {
    n: '04',
    title: 'A cart that behaves',
    body: 'A slide-over drawer with a free-shipping progress bar, per-line customisation summaries, and an upsell module that adds a distinct add-on line (no price collisions) and animates before it retires.',
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="block h-px w-8 bg-accent" />
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
        {children}
      </span>
    </div>
  );
}

export default function CaseStudyPage() {
  return (
    <main className="relative">
      <div className="mx-auto max-w-page px-6 py-14 md:px-10 md:py-20 lg:px-14">
        {/* Header */}
        <div className="mx-auto max-w-[760px]">
          <Eyebrow>Case study · Koha Studio</Eyebrow>
          <h1 className="font-serif text-[44px] leading-[1.04] tracking-[-0.01em] text-ink md:text-[60px]">
            Turning a song into <em className="italic text-accent">an object you keep.</em>
          </h1>
          <p className="mt-7 text-[17.5px] leading-[1.7] text-muted">
            Plynth is a demonstration storefront for personalised NFC vinyl magnets — tap one with
            your phone and &ldquo;your song&rdquo; plays. It exists to show an end-to-end commerce
            experience: real music search, AI-assisted artwork, a considered configurator, and a
            cart tuned by hand. No payment is taken and no orders are fulfilled.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-ink/10 bg-ink/10 sm:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.k} className="bg-paper p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {f.k}
                </dt>
                <dd className="mt-1.5 font-serif text-[18px] text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hairline mx-auto mt-14 h-px max-w-[760px] border-t" />

        {/* The brief */}
        <section className="mx-auto mt-14 max-w-[760px]">
          <Eyebrow>The brief</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.005em] text-ink md:text-[36px]">
            Make a small object feel like it&rsquo;s worth a lot.
          </h2>
          <div className="prose-plynth mt-6">
            <p>
              The hard part of a gift like this isn&rsquo;t manufacturing — it&rsquo;s the moment of
              choosing. A buyer arrives with a feeling (&ldquo;our song&rdquo;) and has to turn it
              into a finished, personalised product without ever feeling like they&rsquo;re filling
              in a form. The storefront had to carry that emotion the whole way from landing page to
              checkout, while still being an honest demonstration of the engineering underneath.
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className="mx-auto mt-14 max-w-[760px]">
          <Eyebrow>Approach</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.005em] text-ink md:text-[36px]">
            Editorial calm over commerce noise.
          </h2>
          <div className="prose-plynth mt-6">
            <p>
              The visual language leans on a warm paper palette, a serif display face, and a single
              amber accent — closer to a printed journal than a typical store. Whitespace and hairline
              rules do the structuring; there are no loud badges or countdown timers. Every
              interactive surface — the configurator, the cart, the previews — was built from a small
              set of shared tokens so the whole thing feels of one piece.
            </p>
          </div>
        </section>

        {/* What I built */}
        <section className="mx-auto mt-16 max-w-[1000px]">
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>What I built</Eyebrow>
            <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.005em] text-ink md:text-[36px]">
              Four pieces, one continuous flow.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {BUILT.map((b) => (
              <div key={b.n} className="surface-card p-7">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                  {b.n}
                </div>
                <h3 className="mt-3 font-serif text-[24px] leading-[1.15] text-ink">{b.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section className="mx-auto mt-16 max-w-[760px]">
          <Eyebrow>Under the hood</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.005em] text-ink md:text-[36px]">
            The stack.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {STACK.map((s) => (
              <div key={s.name} className="bg-paper p-5">
                <div className="font-serif text-[18px] text-ink">{s.name}</div>
                <div className="mt-1 text-[13.5px] leading-[1.5] text-muted">{s.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Honest notes */}
        <section className="mx-auto mt-16 max-w-[760px]">
          <Eyebrow>Honest notes</Eyebrow>
          <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.005em] text-ink md:text-[36px]">
            What&rsquo;s real, and what&rsquo;s staged.
          </h2>
          <div className="prose-plynth mt-6">
            <p>
              Music search and the AI artwork suggestions call live services. The catalogue and reviews
              are placeholders, and checkout is a faithful but simulated flow — it validates, confirms,
              and clears the bag without ever taking a payment. The goal was to demonstrate the
              experience and the engineering, not to operate a shop.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-16 max-w-[760px]">
          <div className="surface-card flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-serif text-[26px] leading-[1.15] text-ink md:text-[30px]">
                Try the configurator
              </h2>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">
                Search a real song, hear a preview, and watch the disc design itself.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <Link
                href="/configure"
                className="cta-amber inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14.5px] font-medium text-white"
              >
                Create yours
                <ArrowIcon style={{ width: 14, height: 14 }} />
              </Link>
              <Link href="/" className="underline-grow text-[14px] text-ink">
                Back to store
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
