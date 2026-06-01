'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/mock-store';
import { ProductCard } from '@/components/ProductCard';

type Sort = 'featured' | 'price-asc' | 'price-desc';

export default function ShopPage() {
  const [sort, setSort] = useState<Sort>('featured');
  const [under100, setUnder100] = useState(false);

  const visible = useMemo(() => {
    let list = [...products];
    if (under100) list = list.filter((p) => p.price < 10000);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort, under100]);

  return (
    <main className="relative">
      <div className="mx-auto max-w-page px-6 md:px-10 lg:px-14">
        <div className="mt-6 flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <span className="text-ink">Shop</span>
        </div>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                The collection
              </span>
            </div>
            <h1 className="max-w-[720px] font-serif text-[40px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[52px]">
              Three editions. <em className="italic text-accent">One song each.</em>
            </h1>
            <p className="mt-5 max-w-[560px] text-[15.5px] leading-[1.65] text-muted">
              Every Plynth is pressed to order in Melbourne. Pick a body, then design the artwork
              with our configurator — your song, your palette, your line.
            </p>
          </div>
        </header>

        <div className="hairline mt-12 flex flex-wrap items-center justify-between gap-4 border-y py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Filter
            </span>
            <button
              onClick={() => setUnder100((v) => !v)}
              aria-pressed={under100}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] transition ${
                under100
                  ? 'border border-accent bg-accent text-white'
                  : 'pill-ghost text-ink'
              }`}
            >
              Under $100
            </button>
            <span className="font-mono text-[11px] text-muted">{visible.length} items</span>
          </div>

          <label className="flex items-center gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="pill-ghost rounded-full px-4 py-1.5 text-[12.5px] text-ink outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
            </select>
          </label>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 pb-20 md:grid-cols-3 md:gap-6">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
