'use client';

import { useState } from 'react';
import { VinylDisc } from './VinylDisc';

type Shot = { id: string; label: string; kind: 'hero' | 'closeup' | 'lifestyle' | 'gift' };

const SHOTS: Shot[] = [
  { id: 'hero', label: 'Studio', kind: 'hero' },
  { id: 'closeup', label: 'Macro', kind: 'closeup' },
  { id: 'lifestyle', label: 'Kitchen', kind: 'lifestyle' },
  { id: 'gift', label: 'Unboxing', kind: 'gift' },
];

function Caption({ tl, br }: { tl: string; br: string }) {
  return (
    <>
      <span className="absolute left-3 top-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#5a3f1d]/70">
        {tl}
      </span>
      <span className="absolute bottom-3 right-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#5a3f1d]/70">
        {br}
      </span>
    </>
  );
}

function ThumbGlyph({ kind }: { kind: Shot['kind'] }) {
  if (kind === 'lifestyle') {
    return (
      <div className="relative aspect-[5/6] w-[58%] rounded-[2px] border border-[#5a3f1d]/30 bg-[#F3E7CC] shadow-[0_4px_8px_-3px_rgba(40,20,5,0.35)]">
        <div className="absolute inset-x-[10%] bottom-[26%] top-[10%] bg-[#5a3f1d]/15" />
        <div className="absolute inset-x-[10%] bottom-[8%] h-[8%] bg-[#5a3f1d]/25" />
      </div>
    );
  }
  if (kind === 'gift') {
    return (
      <div className="relative aspect-[5/4] w-[64%] rounded-[3px] border border-[#5a3f1d]/30 bg-[#EDDDB6]">
        <div className="absolute inset-x-0 top-[42%] h-[16%] border-y border-[#5a3f1d]/35 bg-[#5a3f1d]/25" />
        <div className="absolute inset-y-0 left-[44%] w-[12%] border-x border-[#5a3f1d]/35 bg-[#5a3f1d]/20" />
      </div>
    );
  }
  return null;
}

function ShotImage({ kind, compact = false }: { kind: Shot['kind']; compact?: boolean }) {
  if (kind === 'lifestyle') {
    return (
      <div className="photo-ph-2 absolute inset-0 flex items-center justify-center">
        {!compact && <Caption tl="lifestyle/01_kitchen.jpg" br="3000 × 3600" />}
        {compact ? (
          <ThumbGlyph kind="lifestyle" />
        ) : (
          <div className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#5a3f1d]/70">
            On the fridge
            <br />w/ family photo
          </div>
        )}
      </div>
    );
  }
  if (kind === 'closeup') {
    return (
      <div className="photo-ph-3 absolute inset-0 flex items-center justify-center">
        {!compact && <Caption tl="product/02_macro.jpg" br="3000 × 3000" />}
        <VinylDisc size={compact ? '78%' : '65%'} />
      </div>
    );
  }
  if (kind === 'gift') {
    return (
      <div className="photo-ph-4 absolute inset-0 flex items-center justify-center p-10">
        {!compact && <Caption tl="product/03_unboxing.jpg" br="3000 × 3600" />}
        {compact ? (
          <ThumbGlyph kind="gift" />
        ) : (
          <div className="relative aspect-[5/4] w-[80%]">
            <div className="hairline absolute inset-0 rounded-[4px] border-2 border-[#5a3f1d]/30 bg-[#EDDDB6]" />
            <div className="absolute inset-x-0 top-[36%] h-[28%] border-y border-[#5a3f1d]/25 bg-[#5a3f1d]/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-[18px] italic text-[#3a2812]/80">Plynth</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  // hero
  return (
    <div className="photo-ph absolute inset-0 flex items-center justify-center p-12">
      {!compact && <Caption tl="product/00_hero.jpg" br="4000 × 5000" />}
      <div className={`relative aspect-square ${compact ? 'w-[82%]' : 'w-[78%]'}`}>
        <div className="absolute inset-x-[6%] bottom-[2%] h-[14%] rounded-full bg-[#1a1411]/85 blur-[1px]" />
        <div className="absolute inset-[7%] rounded-full bg-[#1a1411] shadow-[0_30px_40px_-20px_rgba(40,20,5,0.45)]" />
        <div className="absolute inset-0">
          <VinylDisc size="86%" />
        </div>
      </div>
    </div>
  );
}

export function ProductGallery() {
  const [active, setActive] = useState<Shot['id']>('hero');
  const current = SHOTS.find((s) => s.id === active) ?? SHOTS[0];

  return (
    <div className="grid grid-cols-[88px_1fr] gap-4 md:gap-5">
      <div className="flex flex-col gap-3">
        {SHOTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`thumb hairline relative aspect-square overflow-hidden rounded-[10px] border ${active === s.id ? 'is-active' : ''}`}
            aria-label={`View ${s.label}`}
          >
            <ShotImage kind={s.kind} compact />
            <span className="absolute bottom-1 left-1 right-1 rounded bg-parchment/80 py-0.5 text-center font-mono text-[8.5px] uppercase tracking-[0.22em] text-ink/85">
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="hairline relative aspect-square overflow-hidden rounded-[14px] border">
        <ShotImage kind={current.kind} />
        <div className="hairline absolute right-4 top-4 flex items-center gap-1.5 rounded-full border bg-parchment/85 px-2.5 py-1.5 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
            NFC · Tap to play
          </span>
        </div>
      </div>
    </div>
  );
}
