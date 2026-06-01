'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';

export type PolicySection = {
  id: string;
  title: string;
  body: ReactNode;
};

export type PolicyData = {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: PolicySection[];
};

const RELATED = [
  { label: 'Privacy', href: '/pages/privacy' },
  { label: 'Refunds', href: '/pages/refunds' },
  { label: 'Terms', href: '/pages/terms' },
  { label: 'Shipping', href: '/pages/shipping' },
];

export function PolicyPage({ data }: { data: PolicyData }) {
  const { title, lastUpdated, intro, sections } = data;
  const [active, setActive] = useState(sections[0]?.id);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!sections.length) return;
    const handler = () => {
      const probe = window.innerHeight * 0.28;
      let bestId = sections[0].id;
      let bestDist = Infinity;
      for (const s of sections) {
        const el = refs.current[s.id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top - probe;
        const dist = Math.abs(top);
        if (top < 60 && dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      }
      setActive(bestId);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [sections]);

  return (
    <article id="top" className="relative">
      <div className="mx-auto max-w-page px-6 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              Plynth · Legal
            </span>
          </div>
          <h1 className="font-serif text-[44px] leading-[1.04] tracking-[-0.01em] text-ink md:text-[56px]">
            {title}
          </h1>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Last updated · {lastUpdated}
          </div>
          {intro && (
            <p className="mt-8 text-[17px] leading-[1.75] text-muted">{intro}</p>
          )}
          <div className="hairline mt-10 h-px border-t" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_720px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-10 ml-auto max-w-[220px]">
              <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                Contents
              </div>
              <nav>
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`toc-item text-[13.5px] ${active === s.id ? 'active' : ''}`}
                  >
                    <span className="mr-1.5 font-mono text-[10.5px] tracking-[0.16em] text-muted/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="mx-auto w-full max-w-[720px]">
            <details className="hairline bg-paper mb-8 rounded-[10px] border px-4 py-3 lg:hidden">
              <summary className="cursor-pointer select-none font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                Contents
              </summary>
              <nav className="mt-3">
                {sections.map((s, i) => (
                  <a key={s.id} href={`#${s.id}`} className="toc-item text-[14px]">
                    <span className="mr-1.5 font-mono text-[10.5px] text-muted/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </details>

            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => {
                  refs.current[s.id] = el;
                }}
                className="hairline mb-10 scroll-mt-12 border-b pb-10 last:border-b-0"
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    Section · {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="h2-rule font-serif text-[28px] leading-[1.2] tracking-[-0.005em] text-ink md:text-[30px]">
                  {s.title}
                </h2>
                <div className="prose-plynth mt-6">{s.body}</div>
                <a href="#top" className="back-top mt-8 inline-flex">
                  ↑ Back to top
                </a>
              </section>
            ))}

            <div className="hairline bg-paper mt-6 rounded-[12px] border p-6 md:p-7">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                Questions about this policy?
              </div>
              <p className="prose-plynth mt-2">
                Write to <a href="mailto:hello@plynth.studio">hello@plynth.studio</a> — we read
                every email and respond within two business days.
              </p>
            </div>

            <div className="mt-12">
              <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                Related policies
              </div>
              <div className="flex flex-wrap gap-2.5">
                {RELATED.filter((r) => !data.title.toLowerCase().includes(r.label.toLowerCase())).map(
                  (r) => (
                    <Link
                      key={r.label}
                      href={r.href}
                      className="hairline bg-paper inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] text-ink transition hover:bg-warm/40"
                    >
                      {r.label}
                      <span className="text-accent">→</span>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </article>
  );
}
