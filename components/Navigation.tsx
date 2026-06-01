'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { openCart } from '@/lib/store/cartSlice';
import { setMobileNavOpen, toggleMobileNav } from '@/lib/store/uiSlice';
import { Wordmark } from './Wordmark';
import { ArrowIcon, BagIcon, CloseIcon, SearchIcon } from './icons';

const LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'How it works', href: '/#how' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Gift guide', href: '/#guide' },
];

function cls(...a: Array<string | false | undefined>) {
  return a.filter(Boolean).join(' ');
}

export function Navigation() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const cartCount = useAppSelector((s) =>
    s.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const open = useAppSelector((s) => s.ui.mobileNavOpen);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const read = () => setScrolled(window.scrollY > 14);
    window.addEventListener('scroll', read, { passive: true });
    read();
    return () => window.removeEventListener('scroll', read);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(setMobileNavOpen(false));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  // Close drawer on route change
  useEffect(() => {
    dispatch(setMobileNavOpen(false));
  }, [pathname, dispatch]);

  const close = () => dispatch(setMobileNavOpen(false));

  return (
    <>
      <header className={cls('nav-shell sticky top-0 z-40', scrolled && 'is-scrolled')}>
        <div className="mx-auto max-w-page px-6 md:px-10 lg:px-14">
          <div
            className={cls(
              'flex items-center justify-between transition-[height] duration-300',
              scrolled ? 'h-[64px]' : 'h-[84px]',
            )}
          >
            <Wordmark size={scrolled ? 20 : 22} />

            <nav className="hidden items-center gap-9 text-[13.5px] text-ink md:flex">
              {LINKS.map((l) => {
                const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={cls('underline-grow py-1', active && 'active')}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                aria-label="Search"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-ink/5"
              >
                <SearchIcon style={{ width: 18, height: 18 }} />
              </button>

              <button
                aria-label="Bag"
                onClick={() => dispatch(openCart())}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-ink/5"
              >
                <BagIcon style={{ width: 19, height: 19 }} />
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="cart-badge absolute -right-0.5 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white"
                    style={{ boxShadow: '0 0 0 2px #F5F0E8' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => dispatch(toggleMobileNav())}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-ink/5 md:hidden"
              >
                <span className={cls('hbg', open && 'open')}>
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        onClick={close}
        className={cls('drawer-backdrop fixed inset-0 z-40 bg-ink/30', open && 'open')}
        aria-hidden="true"
      />

      <aside
        className={cls(
          'drawer fixed bottom-0 right-0 top-0 z-50 w-[88%] max-w-[420px] bg-parchment shadow-[-30px_0_60px_-30px_rgba(40,20,5,0.35)]',
          open && 'open',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="paper-grain pointer-events-none absolute inset-0" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between px-7 pb-4 pt-6">
            <Wordmark />
            <button
              onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
              aria-label="Close menu"
            >
              <CloseIcon style={{ width: 18, height: 18 }} />
            </button>
          </div>
          <div className="mt-4 px-7">
            <div className="hairline h-px border-t" />
          </div>

          <nav className="mt-8 flex-1 px-7">
            <div className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
              Browse
            </div>
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={close}
                  className="drawer-link hairline group flex items-center justify-between border-b py-3"
                >
                  <span className="font-serif text-[28px] leading-none text-ink">{l.label}</span>
                  <ArrowIcon
                    className="text-muted transition group-hover:text-accent"
                    style={{ width: 18, height: 18 }}
                  />
                </Link>
              ))}
              <Link
                href="/configure"
                onClick={close}
                className="drawer-link hairline group flex items-center justify-between border-b py-3"
              >
                <span className="font-serif text-[28px] italic leading-none text-accent">
                  Customise yours
                </span>
                <ArrowIcon className="text-accent" style={{ width: 18, height: 18 }} />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <button
                onClick={close}
                className="pill-ghost inline-flex items-center gap-2 rounded-full px-4 py-3 text-[13px] text-ink"
              >
                <SearchIcon style={{ width: 14, height: 14 }} /> Search
              </button>
              <button
                onClick={() => {
                  close();
                  dispatch(openCart());
                }}
                className="pill-ghost inline-flex items-center gap-2 rounded-full px-4 py-3 text-[13px] text-ink"
              >
                <BagIcon style={{ width: 14, height: 14 }} /> Bag · {cartCount}
              </button>
            </div>
          </nav>

          <div className="px-7 pb-7 pt-6">
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
              <span className="whitespace-nowrap">30-day guarantee</span>
              <span className="h-[3px] w-[3px] rounded-full bg-current opacity-50" />
              <span className="whitespace-nowrap">Ships across AU</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
