'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { ArrowIcon, InstagramIcon, TiktokIcon } from './icons';

const QUICK_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'How it works', href: '/#how' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'FAQ', href: '/pages/faq' },
  { label: 'Contact', href: '/pages/contact' },
  { label: 'Case study', href: '/case-study' },
];

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/pages/privacy' },
  { label: 'Terms', href: '/pages/terms' },
  { label: 'Shipping', href: '/pages/shipping' },
  { label: 'Refunds', href: '/pages/refunds' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setSent(true);
    setEmail('');
    // Simulated capture — log for the demo
    // eslint-disable-next-line no-console
    console.log('Plynth — newsletter signup (simulated):', { email });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer className="relative mt-24">
      <div className="hairline border-t">
        <div className="mx-auto max-w-page px-6 pb-10 pt-16 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <Wordmark size={24} />
              <p className="mt-5 max-w-[320px] text-[14.5px] leading-[1.65] text-muted">
                Personalised NFC vinyl record magnets. Handcrafted to order in Melbourne — pressed
                for the people who mean the most.
              </p>
              <div className="mt-7 flex items-center gap-2">
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="hairline inline-flex h-10 w-10 items-center justify-center rounded-full border text-ink transition hover:bg-ink/5"
                >
                  <InstagramIcon style={{ width: 17, height: 17 }} />
                </Link>
                <Link
                  href="#"
                  aria-label="TikTok"
                  className="hairline inline-flex h-10 w-10 items-center justify-center rounded-full border text-ink transition hover:bg-ink/5"
                >
                  <TiktokIcon style={{ width: 17, height: 17 }} />
                </Link>
                <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  @plynth.studio
                </span>
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-6">
              <div className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                Quick links
              </div>
              <ul className="flex flex-col gap-3 text-[14.5px] text-ink">
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="underline-grow">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                Stay in tune
              </div>
              <h3 className="font-serif text-[26px] leading-[1.15] text-ink md:text-[28px]">
                Give the gift of <em className="italic text-accent">a song.</em>
              </h3>
              <p className="mt-2.5 max-w-[360px] text-[13.5px] leading-[1.6] text-muted">
                Quiet emails — new editions, gifting ideas, behind-the-press stories. Unsubscribe
                in one click.
              </p>

              <form
                onSubmit={submit}
                className="email-input mt-5 flex items-center gap-3 rounded-full py-2 pl-5 pr-2"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent py-2 text-[14.5px] outline-none placeholder:text-muted/70"
                />
                <button
                  type="submit"
                  className="cta-amber inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium"
                >
                  Subscribe
                  <ArrowIcon style={{ width: 12, height: 12 }} />
                </button>
              </form>

              <div
                className={`mt-3 text-[12.5px] text-accent transition-opacity duration-300 ${sent ? 'opacity-100' : 'opacity-0'}`}
                aria-live="polite"
              >
                Thanks — first letter lands tomorrow.
              </div>
            </div>
          </div>

          <div className="hairline mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[11.5px] uppercase tracking-[0.22em] text-muted">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="whitespace-nowrap">© 2026 Plynth</span>
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="whitespace-nowrap hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 whitespace-nowrap">
              Made with
              <span
                aria-hidden="true"
                className="text-accent"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  textTransform: 'none',
                  fontSize: 13,
                  letterSpacing: 0,
                }}
              >
                love
              </span>
              in Australia
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
