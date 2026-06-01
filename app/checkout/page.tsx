'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { clearCart } from '@/lib/store/cartSlice';
import { formatPrice, simulateCheckout, type SimulatedCheckoutResult } from '@/lib/mock-store';
import { ArrowIcon, CheckIcon } from '@/components/icons';

const SHIP_THRESHOLD = 9900;

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIP_THRESHOLD ? 0 : 900;
  const total = subtotal + shipping;

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SimulatedCheckoutResult | null>(null);
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postcode: '',
    country: 'Australia',
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    const cartPayload = items.map((i) => ({
      productId: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    }));
    const res = await simulateCheckout(cartPayload, form);
    setResult(res);
    setSubmitting(false);
    dispatch(clearCart());
  };

  if (result) {
    return (
      <main className="mx-auto max-w-[680px] px-6 py-20 text-center md:px-10 lg:px-14">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
          <CheckIcon width={22} height={22} />
        </div>
        <h1 className="mt-8 font-serif text-[40px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[52px]">
          Thank you. <em className="italic text-accent">Pressing now.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[480px] text-[15.5px] leading-[1.6] text-muted">
          This is a simulated order — no payment was taken. In a real Plynth flow you&rsquo;d see
          a proof from our studio within two working days.
        </p>
        <div className="card-paper mt-10 rounded-[14px] p-6 text-left">
          <div className="relative z-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            Order reference
          </div>
          <div className="relative z-10 mt-2 font-mono text-[15px] text-ink">{result.orderId}</div>
          <div className="relative z-10 mt-4 flex items-center justify-between text-[14px]">
            <span className="text-muted">Total charged</span>
            <span className="text-ink">{formatPrice(result.total)} AUD</span>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-5">
          <Link
            href="/"
            className="cta-amber inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium"
          >
            Back to home
            <ArrowIcon style={{ width: 13, height: 13 }} />
          </Link>
          <Link href="/configure" className="underline-grow text-[14px] text-ink">
            Make another →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-page px-6 py-12 md:px-10 lg:px-14">
      <div className="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <span className="text-ink">Checkout</span>
      </div>

      <div className="mt-8 mb-12 flex items-center gap-3">
        <span className="block h-px w-8 bg-accent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          Simulated checkout · no payment is taken
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={submit} className="space-y-6 lg:col-span-7">
          <h1 className="font-serif text-[36px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[44px]">
            Where should we <em className="italic text-accent">send it?</em>
          </h1>

          <Field label="Email" id="email">
            <input
              type="email"
              id="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Full name" id="name">
            <input
              type="text"
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
              placeholder="Maeve Reilly"
            />
          </Field>

          <Field label="Street address" id="address">
            <input
              type="text"
              id="address"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
              placeholder="14 Sydney Road"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="City" id="city">
              <input
                type="text"
                id="city"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
                placeholder="Brunswick"
              />
            </Field>
            <Field label="Postcode" id="postcode">
              <input
                type="text"
                id="postcode"
                required
                value={form.postcode}
                onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
                placeholder="3056"
              />
            </Field>
          </div>

          <Field label="Country" id="country">
            <input
              type="text"
              id="country"
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
            />
          </Field>

          <div className="card-paper rounded-[12px] p-5">
            <div className="relative z-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Card details
            </div>
            <div className="relative z-10 mt-2 text-[14px] text-ink">
              Payment is disabled in this demo. Submitting will simulate an order and clear your
              bag.
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || items.length === 0}
            className="cta-amber mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-medium sm:w-auto"
          >
            {submitting
              ? 'Pressing…'
              : items.length === 0
                ? 'Bag is empty'
                : `Place order — ${formatPrice(total)}`}
            <ArrowIcon style={{ width: 14, height: 14 }} />
          </button>
        </form>

        <aside className="lg:col-span-5">
          <div className="card-paper sticky top-7 rounded-[14px] p-6 md:p-7">
            <div className="relative z-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Order summary
            </div>

            {items.length === 0 ? (
              <div className="relative z-10 mt-6 text-[14px] text-muted">
                Your bag is empty.{' '}
                <Link href="/shop" className="underline-grow text-ink">
                  Pick something →
                </Link>
              </div>
            ) : (
              <ul className="relative z-10 mt-4 space-y-3">
                {items.map((it, i) => (
                  <li key={`${it.productId}-${i}`} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-[14px] text-ink">
                        {it.name}{' '}
                        {it.quantity > 1 && (
                          <span className="text-muted">× {it.quantity}</span>
                        )}
                      </div>
                      {it.customisation && (
                        <div className="mt-0.5 truncate text-[12px] text-muted">
                          {it.customisation.trackName} — {it.customisation.artistName}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 tabular-nums text-[14px] text-ink">
                      {formatPrice(it.price * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="hairline relative z-10 mt-5 border-t pt-5">
              <Row k="Subtotal" v={formatPrice(subtotal)} />
              <Row
                k="Shipping"
                v={items.length === 0 ? '—' : shipping === 0 ? 'Free' : formatPrice(shipping)}
              />
              <div className="hairline mt-3 flex items-end justify-between border-t pt-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Total
                </span>
                <span className="font-serif text-[24px] leading-none tabular-nums text-ink">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-1 text-[14px]">
      <span className="text-muted">{k}</span>
      <span className="tabular-nums text-ink">{v}</span>
    </div>
  );
}
