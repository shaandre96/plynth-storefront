'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  addItem,
  closeCart,
  dismissUpsell,
  removeItem,
  updateQuantity,
} from '@/lib/store/cartSlice';
import { formatPrice } from '@/lib/mock-store';
import type { CartItem as CartItemType } from '@/lib/types';
import { ArrowIcon, BagIcon, CloseIcon } from './icons';

const SHIP_THRESHOLD = 9900; // $99 in cents

// Distinct add-on line — must NOT reuse a catalog productId, or the cart's
// merge-by-productId logic would collide with the real "The Gift" product
// and overwrite its $99 price with the $12 promo price.
const GIFT_BOX_ADDON = {
  productId: 'gift-box-addon',
  name: 'Premium Gift Bundle',
  price: 1200, // $12 add-on
} as const;

function ItemThumb({ productId }: { productId: string }) {
  if (productId === 'gift-bundle' || productId === GIFT_BOX_ADDON.productId) {
    return (
      <div className="kraft-box relative flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-[10px]">
        <div className="absolute inset-x-0 top-[42%] h-[16%] border-y border-[#5a3f1d]/35 bg-[#5a3f1d]/30" />
        <div className="absolute inset-y-0 left-[44%] w-[12%] border-x border-[#5a3f1d]/35 bg-[#5a3f1d]/25" />
        <span className="relative font-serif text-[14px] italic text-[#3a2812]/85">Plynth</span>
      </div>
    );
  }
  return (
    <div
      className="relative h-[88px] w-[88px] overflow-hidden rounded-[10px] bg-[#1a1411]"
      style={{ boxShadow: '0 12px 20px -14px rgba(40,20,5,0.5)' }}
    >
      <div className="vinyl-mini absolute inset-[10%] rounded-full" />
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-parchment" />
      <span className="absolute bottom-1 right-1 font-mono text-[8px] uppercase tracking-[0.18em] text-parchment/65">
        4&Prime;
      </span>
    </div>
  );
}

function CartLine({
  item,
  index,
  leaving,
}: {
  item: CartItemType;
  index: number;
  leaving: boolean;
}) {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`hairline flex gap-4 border-b py-5 ${leaving ? 'item-leave' : 'item-enter'}`}
    >
      <ItemThumb productId={item.productId} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {item.customisation ? 'Edition 01 · Personalised' : 'Edition 01'}
            </div>
            <div className="mt-1 truncate font-serif text-[18px] leading-tight text-ink">
              {item.name}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[15px] font-medium text-ink">
              {formatPrice(item.price * item.quantity)}
            </div>
            {item.quantity > 1 && (
              <div className="mt-0.5 text-[11px] text-muted">{formatPrice(item.price)} each</div>
            )}
          </div>
        </div>

        {item.customisation && (
          <div className="mt-3 space-y-1.5">
            <DetailRow k="Song" v={`${item.customisation.trackName} — ${item.customisation.artistName}`} />
            {item.customisation.tagline && (
              <DetailRow k="Tagline" v={`“${item.customisation.tagline}”`} />
            )}
            {item.customisation.photoUrl && <DetailRow k="Photo" v="Uploaded · 1 image" />}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="hairline inline-flex items-center overflow-hidden rounded-full border">
            <button
              onClick={() => dispatch(updateQuantity({ index, quantity: item.quantity - 1 }))}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="qty-btn inline-flex h-8 w-8 items-center justify-center text-ink"
            >
              −
            </button>
            <span className="w-7 text-center font-mono text-[12px] tabular-nums text-ink">
              {item.quantity}
            </span>
            <button
              onClick={() => dispatch(updateQuantity({ index, quantity: item.quantity + 1 }))}
              disabled={item.quantity >= 9}
              aria-label="Increase quantity"
              className="qty-btn inline-flex h-8 w-8 items-center justify-center text-ink"
            >
              +
            </button>
          </div>

          <button
            onClick={() => dispatch(removeItem({ productId: item.productId, index }))}
            className="inline-flex items-center gap-1.5 text-[12px] text-muted transition hover:text-ink"
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px] text-muted">
      <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted/80">
        {k}
      </span>
      <span className="truncate text-ink/85">{v}</span>
    </div>
  );
}

function ShippingBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, SHIP_THRESHOLD - subtotal);
  const pct = Math.min(1, subtotal / SHIP_THRESHOLD);
  const free = subtotal >= SHIP_THRESHOLD;
  return (
    <div className="mt-1">
      <div className="mb-2 flex items-center justify-between text-[12px]">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
          Shipping
        </span>
        <span className={`text-[12px] ${free ? 'text-accent' : 'text-ink'}`}>
          {free ? (
            'Free AU shipping unlocked'
          ) : (
            <>
              Spend <strong>{formatPrice(remaining)}</strong> more for free shipping
            </>
          )}
        </span>
      </div>
      <div className="ship-track">
        <div className="ship-fill" style={{ transform: `scaleX(${pct})` }} />
      </div>
    </div>
  );
}

function BundleUpsell() {
  const dispatch = useAppDispatch();
  const [pulse, setPulse] = useState(false);

  const add = () => {
    // Play the confirmation pulse on the still-mounted card, then commit the
    // add — committing flips `hasBundle` true and unmounts this component.
    setPulse(true);
    window.setTimeout(() => {
      dispatch(
        addItem({
          productId: GIFT_BOX_ADDON.productId,
          name: GIFT_BOX_ADDON.name,
          price: GIFT_BOX_ADDON.price,
          quantity: 1,
        }),
      );
    }, 550); // matches the bundleAdd animation duration
  };

  return (
    <div
      className={`bg-paper hairline relative rounded-[14px] border p-5 ${pulse ? 'bundle-added' : ''}`}
    >
      <div className="absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.22em]">
          Complete the gift
        </span>
      </div>
      <div className="mt-1.5 flex gap-4">
        <div className="shrink-0">
          <ItemThumb productId="gift-bundle" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[18px] leading-tight text-ink">
            <em className="italic text-accent">Add</em> a Premium Gift Bundle
          </div>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-muted">
            Kraft gift box with magnetic close and a hand-written card —{' '}
            <span className="text-ink">$12 AUD</span>.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={add}
              className="cta-amber inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium"
            >
              Add to order +
            </button>
            <button
              onClick={() => dispatch(dismissUpsell())}
              className="text-[12px] text-muted hover:text-ink"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const dispatch = useAppDispatch();
  return (
    <div className="py-16 text-center">
      <div className="hairline inline-flex h-14 w-14 items-center justify-center rounded-full border text-muted">
        <BagIcon style={{ width: 22, height: 22 }} />
      </div>
      <div className="mt-5 font-serif text-[22px] text-ink">Your bag is empty.</div>
      <p className="mt-2 text-[13.5px] text-muted">
        Pick a song. Press a memory. We&rsquo;ll handle the rest.
      </p>
      <Link
        href="/configure"
        onClick={() => dispatch(closeCart())}
        className="cta-amber mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-medium"
      >
        Start customising
        <ArrowIcon style={{ width: 12, height: 12 }} />
      </Link>
    </div>
  );
}

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen, upsellDismissed } = useAppSelector((s) => s.cart);
  const [leaving] = useState(new Set<string>());

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeCart());
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIP_THRESHOLD ? 0 : 900;
  const total = subtotal + shipping;
  const hasBundle = items.some(
    (i) => i.productId === GIFT_BOX_ADDON.productId || i.productId === 'gift-bundle',
  );

  return (
    <>
      <div
        onClick={() => dispatch(closeCart())}
        className={`drawer-backdrop fixed inset-0 z-40 bg-ink/35 ${isOpen ? 'open' : ''}`}
      />

      <aside
        className={`cart-drawer bg-paper fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[460px] flex-col shadow-[-30px_0_60px_-30px_rgba(40,20,5,0.4)] ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="drawer-handle">
          <span className="h-1 w-10 rounded-full bg-ink/20" />
        </div>

        <div className="hairline flex items-center justify-between border-b px-6 pb-4 pt-6 md:px-7">
          <div className="flex items-center gap-3">
            <span className="font-serif text-[22px] text-ink">Your bag</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              {itemCount} item{itemCount === 1 ? '' : 's'}
            </span>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-ink/5"
            aria-label="Close cart"
          >
            <CloseIcon style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {items.length > 0 && (
          <div className="px-6 pb-2 pt-4 md:px-7">
            <ShippingBar subtotal={subtotal} />
          </div>
        )}

        <div className="scroll-soft flex-1 overflow-y-auto px-6 md:px-7">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="mb-2 mt-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                Order
              </div>
              <div>
                {items.map((it, idx) => (
                  <CartLine
                    key={`${it.productId}-${idx}`}
                    item={it}
                    index={idx}
                    leaving={leaving.has(`${it.productId}-${idx}`)}
                  />
                ))}
              </div>

              {!hasBundle && !upsellDismissed && (
                <div className="mb-2 mt-6">
                  <BundleUpsell />
                </div>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="hairline bg-paper border-t px-6 pb-6 pt-5 md:px-7">
            <div className="space-y-2 text-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="tabular-nums text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Shipping</span>
                <span
                  className={`tabular-nums ${shipping === 0 ? 'text-accent' : 'text-ink'}`}
                >
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
            </div>
            <div className="hairline my-4 h-px border-t" />
            <div className="flex items-end justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                Total
              </span>
              <span className="font-serif text-[26px] leading-none tabular-nums text-ink">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={() => dispatch(closeCart())}
              className="cta-amber mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-[15px] font-medium"
            >
              Checkout securely
              <ArrowIcon style={{ width: 14, height: 14 }} />
            </Link>

            <button
              onClick={() => dispatch(closeCart())}
              className="mt-2.5 w-full py-2 text-[13px] text-muted transition hover:text-ink"
            >
              or keep shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
