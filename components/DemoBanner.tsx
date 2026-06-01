'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setDemoBannerDismissed } from '@/lib/store/uiSlice';

const STORAGE_KEY = 'plynth_demo_banner_dismissed';

type DemoBannerProps = {
  caseStudyUrl?: string;
};

export function DemoBanner({ caseStudyUrl = '/case-study' }: DemoBannerProps) {
  const dispatch = useAppDispatch();
  const dismissed = useAppSelector((s) => s.ui.demoBannerDismissed);
  // Keep in DOM through the collapse transition, then unmount
  const [mounted, setMounted] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate dismissal from localStorage once on the client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) === '1';
      if (stored) {
        dispatch(setDemoBannerDismissed(true));
        setMounted(false);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    if (dismissed) {
      const t = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(t);
    }
    setMounted(true);
  }, [dismissed, hydrated]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    dispatch(setDemoBannerDismissed(true));
  };

  if (!mounted) return null;

  return (
    <div
      className={`banner-wrap ${dismissed ? 'hidden-up' : ''}`}
      aria-hidden={dismissed}
    >
      <div role="region" aria-label="Site notice" className="demo-banner w-full">
        <div className="mx-auto max-w-page px-4 md:px-8 lg:px-12">
          <div className="row flex min-h-[38px] items-center justify-between gap-3 py-2">
            <div className="text-row flex-1 truncate text-[13px] leading-[1.4] text-white/95 sm:whitespace-normal md:text-[13.5px]">
              <span className="mr-2 hidden items-center gap-2 align-middle sm:inline-flex">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/85" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
                  Demo
                </span>
                <span className="inline-block h-3 w-px bg-white/35" />
              </span>
              <span className="align-middle">
                Plynth is a portfolio demonstration store by Koha Studio — no real orders are
                fulfilled.{' '}
                <Link href={caseStudyUrl} className="banner-link">
                  View the case study →
                </Link>
              </span>
            </div>

            <button
              onClick={dismiss}
              aria-label="Dismiss notice"
              className="banner-x -mr-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
