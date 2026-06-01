'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './icons';

type Item = { id: string; title: string; body: React.ReactNode };

const ITEMS: Item[] = [
  {
    id: 'how',
    title: 'How it works',
    body: (
      <>
        <p>
          Each Plynth ships as two pieces: a 4&Prime; vinyl disc and a slim black player base.
          Place the disc on the base, and tap your phone — the NFC chip inside cues your song on
          any phone, no app required.
        </p>
        <p className="mt-3">
          Lift the disc off to pause. Place it back on, and it picks up where it left off.
        </p>
      </>
    ),
  },
  {
    id: 'incl',
    title: "What's included",
    body: (
      <ul className="space-y-2">
        <li>· The Vinyl — your personalised 4&Prime; NFC disc</li>
        <li>· The Plynth player base, USB-C charged</li>
        <li>· Letterpressed sleeve printed with your message</li>
        <li>· Linen gift box, ribboned & sealed</li>
        <li>· Free handwritten card on request</li>
      </ul>
    ),
  },
  {
    id: 'ship',
    title: 'Shipping & returns',
    body: (
      <>
        <p>
          Free shipping across Australia. International from $14 AUD. We press to order in
          Melbourne — most orders dispatch within 5–7 business days.
        </p>
        <p className="mt-3">
          30-day guarantee on the gift. If the song doesn&rsquo;t land, we&rsquo;ll repress it on
          us.
        </p>
      </>
    ),
  },
];

export function PdpAccordion() {
  const [open, setOpen] = useState<string | null>('how');

  return (
    <div className="hairline mt-10 border-t">
      {ITEMS.map((it) => {
        const isOpen = open === it.id;
        return (
          <div
            key={it.id}
            data-open={isOpen}
            className="hairline border-b"
          >
            <button
              onClick={() => setOpen(isOpen ? null : it.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-serif text-[18px] text-ink">{it.title}</span>
              <ChevronDownIcon className="chev h-4 w-4 text-muted" />
            </button>
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-400 ease-out"
              style={{ maxHeight: isOpen ? 360 : 0, opacity: isOpen ? 1 : 0 }}
            >
              <div className="pb-6 pr-6 text-[14px] leading-[1.65] text-muted">{it.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
