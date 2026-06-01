'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@/components/icons';

type FaqItem = { id: string; q: string; a: React.ReactNode };
type FaqGroup = { name: string; items: FaqItem[] };

const GROUPS: FaqGroup[] = [
  {
    name: 'The product',
    items: [
      {
        id: 'how-plays',
        q: 'How does the song play?',
        a: (
          <p>
            Each Plynth has an NFC chip embedded in the back. Tap any phone (iOS or Android, no
            app needed) and the song opens on a custom landing page in your default browser.
          </p>
        ),
      },
      {
        id: 'streaming',
        q: 'Is the song streamed or stored on the magnet?',
        a: (
          <p>
            Streamed. The NFC chip points to a hosted page that plays the track via the artist&rsquo;s
            licensed catalogue. This keeps audio quality high and respects songwriter royalties.
          </p>
        ),
      },
      {
        id: 'wifi',
        q: 'Does it work without Wi-Fi?',
        a: (
          <p>
            You&rsquo;ll need mobile data or Wi-Fi the first time. After that the page caches —
            short-term offline plays usually work too.
          </p>
        ),
      },
    ],
  },
  {
    name: 'Customisation',
    items: [
      {
        id: 'songs',
        q: 'Can I choose any song?',
        a: (
          <p>
            Yes — anything in the world&rsquo;s major catalogues. We licence per gift via APRA
            AMCOS, so even niche tracks are usually available.
          </p>
        ),
      },
      {
        id: 'photo',
        q: 'What if my photo is low resolution?',
        a: (
          <p>
            Upload what you have — our team colour-corrects and upscales before we press. If we
            think it won&rsquo;t reproduce well, we&rsquo;ll email you to confirm before printing.
          </p>
        ),
      },
    ],
  },
  {
    name: 'Orders & shipping',
    items: [
      {
        id: 'time',
        q: 'How long does it take?',
        a: (
          <p>
            5–7 business days to press, then standard shipping. Australian orders typically arrive
            within two weeks. International is usually 2–3 weeks total.
          </p>
        ),
      },
      {
        id: 'guarantee',
        q: 'What if they don’t love it?',
        a: (
          <p>
            We&rsquo;ll repress one replacement free within 30 days of delivery. See our{' '}
            <Link href="/pages/refunds" className="underline-grow text-ink">
              refund policy
            </Link>{' '}
            for the details.
          </p>
        ),
      },
    ],
  },
];

function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <div data-open={open} className="hairline border-b">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-serif text-[18px] leading-snug text-ink md:text-[20px]">
          {item.q}
        </span>
        <ChevronDownIcon className="chev h-4 w-4 shrink-0 text-muted" />
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-400 ease-out"
        style={{ maxHeight: open ? 600 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="prose-plynth pb-6 pr-6">{item.a}</div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(GROUPS[0].items[0].id);

  return (
    <main className="relative">
      <div className="mx-auto max-w-page px-6 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              Plynth · FAQ
            </span>
          </div>
          <h1 className="font-serif text-[44px] leading-[1.04] tracking-[-0.01em] text-ink md:text-[56px]">
            Frequently asked, <em className="italic text-accent">honestly answered.</em>
          </h1>
          <p className="mt-6 text-[16.5px] leading-[1.7] text-muted">
            If your question isn&rsquo;t here, write to{' '}
            <a className="prose-plynth inline" href="mailto:hello@plynth.studio">
              hello@plynth.studio
            </a>{' '}
            and we&rsquo;ll get back to you within two business days.
          </p>

          <div className="mt-14">
            {GROUPS.map((g) => (
              <section key={g.name} className="mt-12">
                <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                  {g.name}
                </div>
                <div className="hairline border-t">
                  {g.items.map((it) => (
                    <FaqRow
                      key={it.id}
                      item={it}
                      open={open === it.id}
                      onToggle={() => setOpen(open === it.id ? null : it.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
