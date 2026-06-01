'use client';

import Link from 'next/link';
import { useAppDispatch } from '@/lib/store';
import { addItem } from '@/lib/store/cartSlice';
import type { Product } from '@/lib/mock-store';
import { ArrowIcon } from './icons';

export function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const addPlain = () => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }),
    );
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <Link
        href={`/configure?product=${product.slug}`}
        className="cta-amber inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-medium sm:w-auto"
      >
        Customise Yours
        <ArrowIcon style={{ width: 14, height: 14 }} />
      </Link>
      <button
        onClick={addPlain}
        className="pill-ghost inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13.5px] text-ink"
      >
        Add to bag — no customisation
      </button>
    </div>
  );
}
