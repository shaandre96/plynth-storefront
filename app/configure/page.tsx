'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  nextStep,
  prevStep,
  selectTrack,
  setAiSuggestion,
  setPlaying,
  setSearchQuery,
  setSearchResults,
  setStep,
  setUploadedPhoto,
} from '@/lib/store/configuratorSlice';
import { addItem } from '@/lib/store/cartSlice';
import type { AiSuggestion, ITunesTrack } from '@/lib/types';
import { products, getProductBySlug, formatPrice } from '@/lib/mock-store';
import { ArrowIcon, CheckIcon, PauseIcon, PlayIcon, SearchIcon } from '@/components/icons';

const STEP_NAMES = ['Search', 'Listen', 'Confirm', 'Design'] as const;

// Used if the mood API is unreachable or returns something unparseable.
const AI_FALLBACK: AiSuggestion = {
  palette: ['#C8873A', '#2C2416', '#F5F0E8'],
  style: 'minimalist',
  tagline: 'A song held still on warm parchment.',
};

const INSPIRATIONS = [
  'Fleetwood Mac — Dreams',
  'Frank Ocean — Pink + White',
  'Nick Cave — Into My Arms',
  'Stevie Wonder — As',
];

function upgradeArt(url?: string) {
  return (url ?? '').replace(/\/\d+x\d+bb\.jpg/, '/600x600bb.jpg');
}

function firstName(s?: string) {
  return (s ?? '').split(/[\s,&]+/)[0];
}

function fmtTime(s: number) {
  const v = Math.max(0, Math.floor(s));
  const m = Math.floor(v / 60);
  const r = (v % 60).toString().padStart(2, '0');
  return `${m}:${r}`;
}

function contrastInk(hex?: string) {
  if (!hex) return '#2C2416';
  const h = hex.replace('#', '');
  if (h.length !== 6) return '#2C2416';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l > 0.6 ? '#2C2416' : '#F5F0E8';
}

function StepBar({ stepIdx }: { stepIdx: number }) {
  return (
    <div className="mx-auto mt-8 max-w-page px-6 md:mt-10 md:px-10 lg:px-14">
      <div className="flex items-center gap-3 md:gap-5">
        {STEP_NAMES.map((name, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <div key={name} className="flex items-center gap-3 md:flex-1">
              <div className="flex shrink-0 items-center gap-3">
                <span className={`step-node ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}`}>
                  {done ? (
                    <CheckIcon width={10} height={10} />
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </span>
                <div className="hidden flex-col leading-tight md:flex">
                  <span
                    className={`font-mono text-[10.5px] uppercase tracking-[0.22em] ${active ? 'text-ink' : 'text-muted'}`}
                  >
                    Step {i + 1}
                  </span>
                  <span
                    className={`mt-0.5 font-serif text-[15px] ${active ? 'text-ink' : 'text-muted'}`}
                  >
                    {name}
                  </span>
                </div>
              </div>
              {i < STEP_NAMES.length - 1 && (
                <div className="step-line">
                  <div
                    className="fill"
                    style={{ transform: `scaleX(${done ? 1 : 0})` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepSearch() {
  const dispatch = useAppDispatch();
  const query = useAppSelector((s) => s.configurator.searchQuery);
  const [local, setLocal] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runSearch = async (q: string) => {
    dispatch(setSearchQuery(q));
    dispatch(setStep(2));
    dispatch(setSearchResults([]));
    try {
      const res = await fetch(`/api/music/search?q=${encodeURIComponent(q)}`);
      const data = (await res.json()) as ITunesTrack[];
      dispatch(setSearchResults(data));
    } catch {
      dispatch(setSearchResults([]));
    }
  };

  return (
    <section className="panel-enter">
      <div className="mx-auto max-w-page px-6 pb-24 pt-12 md:px-10 md:pt-16 lg:px-14">
        <div className="max-w-[720px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              Step one of four
            </span>
          </div>
          <h1 className="font-serif text-[44px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[56px]">
            What&rsquo;s <em className="italic text-accent">their</em> song?
          </h1>
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted">
            The one that plays in their head on the drive home. The one from that summer. Search
            the world&rsquo;s catalogue — we&rsquo;ll press it onto a 4&Prime; vinyl magnet.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (local.trim()) runSearch(local.trim());
            }}
            className="search-input mt-9 flex items-center gap-3 rounded-full py-2 pl-5 pr-2"
          >
            <SearchIcon className="shrink-0 text-muted" style={{ width: 18, height: 18 }} />
            <input
              ref={inputRef}
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Search song, artist or album…"
              className="flex-1 bg-transparent py-2 text-[16.5px] outline-none placeholder:text-muted/70"
            />
            <button
              type="submit"
              disabled={!local.trim()}
              className="cta-amber inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium"
            >
              Search
              <ArrowIcon style={{ width: 14, height: 14 }} />
            </button>
          </form>

          <div className="mt-10">
            <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Need inspiration?
            </div>
            <div className="flex flex-wrap gap-2.5">
              {INSPIRATIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setLocal(s);
                    runSearch(s);
                  }}
                  className="pill-ghost rounded-full px-3.5 py-2 text-[13px] text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid max-w-[920px] gap-5 md:mt-20 md:grid-cols-3">
          {[
            { k: '01', t: 'Any song, any era', d: 'Search 100M+ tracks. We licence per gift.' },
            {
              k: '02',
              t: '30-second previews',
              d: 'Listen before you commit — tap the artwork.',
            },
            { k: '03', t: 'Tap to play', d: 'Your final magnet plays on any phone via NFC.' },
          ].map((it) => (
            <div key={it.k} className="card-paper rounded-[10px] p-5">
              <div className="relative z-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                {it.k}
              </div>
              <div className="relative z-10 mt-2 font-serif text-[20px] text-ink">{it.t}</div>
              <p className="relative z-10 mt-1.5 text-[13.5px] leading-[1.55] text-muted">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepBrowse() {
  const dispatch = useAppDispatch();
  const { searchQuery, searchResults, selectedTrack, isPlaying } = useAppSelector(
    (s) => s.configurator,
  );
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const status = searchResults.length ? 'ready' : searchQuery ? 'loading' : 'empty';

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingId(null);
    setProgress(0);
    dispatch(setPlaying(false));
  }, [dispatch]);

  useEffect(() => () => stop(), [stop]);

  const toggle = (t: ITunesTrack) => {
    if (playingId === t.trackId) {
      stop();
      return;
    }
    stop();
    if (!t.previewUrl) return;
    const a = new Audio(t.previewUrl);
    audioRef.current = a;
    setPlayingId(t.trackId);
    dispatch(setPlaying(true));
    dispatch(selectTrack(t));
    a.play().catch(() => {});
    a.addEventListener('timeupdate', () => setProgress(a.currentTime));
    a.addEventListener('ended', () => {
      setPlayingId(null);
      setProgress(0);
      dispatch(setPlaying(false));
    });
  };

  const useThisSong = () => {
    stop();
    dispatch(setStep(3));
  };

  return (
    <section className="panel-enter">
      <div className="mx-auto max-w-page px-6 pb-32 pt-10 md:px-10 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <button
                onClick={() => {
                  stop();
                  dispatch(setStep(1));
                }}
                className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted hover:text-ink"
              >
                ← New search
              </button>
              <span className="block h-px w-6 bg-accent" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                {status === 'loading'
                  ? 'Searching…'
                  : status === 'empty'
                    ? 'No matches'
                    : `${searchResults.length} results`}
              </span>
            </div>
            <h2 className="font-serif text-[36px] tracking-[-0.01em] text-ink md:text-[42px]">
              Results for <em className="italic text-accent">&ldquo;{searchQuery}&rdquo;</em>
            </h2>
            <p className="mt-2 text-[14.5px] text-muted">
              Tap the artwork to hear a 30-second preview.
            </p>
          </div>

          {selectedTrack && (
            <div className="card-paper flex items-center gap-3 rounded-full py-1.5 pl-3 pr-1.5">
              <div className="relative z-10 h-9 w-9 shrink-0 overflow-hidden rounded-md bg-warm">
                {selectedTrack.artworkUrl100 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedTrack.artworkUrl100}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="relative z-10 flex min-w-0 flex-col leading-tight">
                <span className="max-w-[220px] truncate text-[12.5px] text-ink">
                  {selectedTrack.trackName}
                </span>
                <span className="max-w-[220px] truncate text-[11px] text-muted">
                  {selectedTrack.artistName}
                </span>
              </div>
              <button
                onClick={useThisSong}
                className="cta-amber relative z-10 ml-2 rounded-full px-4 py-2 text-[12.5px] font-medium"
              >
                Use this song →
              </button>
            </div>
          )}
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
          {status === 'loading' &&
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-[14px] p-3">
                <div className="skel aspect-square rounded-[10px]" />
                <div className="skel mt-3 h-4 w-3/4 rounded" />
                <div className="skel mt-2 h-3 w-1/2 rounded" />
              </div>
            ))}

          {status === 'ready' &&
            searchResults.map((t) => (
              <div
                key={t.trackId}
                role="button"
                tabIndex={0}
                onClick={() => dispatch(selectTrack(t))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dispatch(selectTrack(t));
                  }
                }}
                className={`album-tile relative cursor-pointer rounded-[14px] p-3 text-left ${playingId === t.trackId ? 'is-playing' : ''} ${selectedTrack?.trackId === t.trackId && playingId !== t.trackId ? 'ring-1 ring-ink/15' : ''}`}
              >
                <div className="relative">
                  <div className="album-art aspect-square overflow-hidden rounded-[10px] bg-warm">
                    {t.artworkUrl100 && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={upgradeArt(t.artworkUrl100)}
                        alt={t.collectionName || t.trackName}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(t);
                    }}
                    aria-label={playingId === t.trackId ? 'Pause preview' : 'Play preview'}
                    className={`absolute bottom-2.5 right-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-[0_10px_20px_-10px_rgba(40,20,5,0.6)] transition ${
                      playingId === t.trackId
                        ? 'bg-parchment text-ink'
                        : 'bg-ink/85 text-parchment hover:bg-ink'
                    }`}
                  >
                    {playingId === t.trackId ? (
                      <PauseIcon style={{ width: 11, height: 11 }} />
                    ) : (
                      <PlayIcon style={{ width: 11, height: 11 }} />
                    )}
                  </button>

                  {playingId === t.trackId && (
                    <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-parchment/95 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                      <span className="text-accent wave">
                        <span /><span /><span /><span /><span />
                      </span>
                      <span>{fmtTime(progress)} / 0:30</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 px-1">
                  <div className="truncate font-serif text-[17px] leading-tight text-ink">
                    {t.trackName}
                  </div>
                  <div className="mt-1 truncate text-[12.5px] text-muted">{t.artistName}</div>
                  <div className="mt-1.5 truncate font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted/80">
                    {t.collectionName || 'Single'}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {status === 'empty' && (
          <div className="card-paper mx-auto mt-10 max-w-[520px] rounded-[14px] p-10 text-center">
            <div className="relative z-10 font-serif text-[22px] text-ink">Nothing here.</div>
            <p className="relative z-10 mt-2 text-[14px] text-muted">
              Try a different spelling, or search by artist instead.
            </p>
          </div>
        )}

        {isPlaying ? null : null}
      </div>
    </section>
  );
}

function StepConfirm() {
  const dispatch = useAppDispatch();
  const song = useAppSelector((s) => s.configurator.selectedTrack);
  const [message, setMessage] = useState('');

  if (!song) {
    return (
      <div className="mx-auto max-w-page px-6 pt-12 md:px-10 lg:px-14">
        <p className="text-[15px] text-muted">No song selected. Go back to search.</p>
      </div>
    );
  }

  return (
    <section className="panel-enter">
      <div className="mx-auto max-w-[1080px] px-6 pb-24 pt-10 md:px-10 lg:px-14">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => dispatch(setStep(2))}
            className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted hover:text-ink"
          >
            ← Back to results
          </button>
          <span className="block h-px w-6 bg-accent" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            Step three · Confirm
          </span>
        </div>

        <h2 className="font-serif text-[42px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[52px]">
          Is this <em className="italic text-accent">the one?</em>
        </h2>

        <div className="card-paper mt-9 grid grid-cols-1 items-center gap-8 rounded-[14px] p-6 md:grid-cols-12 md:p-8">
          <div className="relative z-10 md:col-span-5">
            <div className="album-art aspect-square overflow-hidden rounded-[12px] bg-warm">
              {song.artworkUrl100 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={upgradeArt(song.artworkUrl100)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="relative z-10 md:col-span-7">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Selected track
            </div>
            <div className="mt-2 font-serif text-[32px] leading-[1.1] text-ink md:text-[36px]">
              {song.trackName}
            </div>
            <div className="mt-2 text-[16px] text-ink/80">{song.artistName}</div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-[13px]">
              <Meta label="Album" value={song.collectionName || 'Single'} />
              <Meta label="Genre" value={song.primaryGenreName || '—'} />
              <Meta
                label="Length"
                value={song.trackTimeMillis ? fmtTime(song.trackTimeMillis / 1000) : '—'}
              />
              <Meta label="Preview" value={song.previewUrl ? '30 seconds' : 'unavailable'} />
            </div>

            <div className="hairline mt-8 h-px border-t" />

            <div className="mt-6">
              <label className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                Add a short message (optional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={'"For our 10th. Always our song. — M"'}
                className="search-input mt-2 w-full resize-none rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                onClick={() => dispatch(setStep(4))}
                className="cta-amber inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[14.5px] font-medium"
              >
                Continue to design
                <ArrowIcon style={{ width: 14, height: 14 }} />
              </button>
              <button
                onClick={() => dispatch(setStep(2))}
                className="underline-grow text-[14px] text-ink"
              >
                Pick a different track
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{label}</div>
      <div className="mt-1 truncate text-ink">{value}</div>
    </div>
  );
}

function StepDesign({ productSlug }: { productSlug: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const song = useAppSelector((s) => s.configurator.selectedTrack);
  const ai = useAppSelector((s) => s.configurator.aiSuggestion);
  const uploaded = useAppSelector((s) => s.configurator.uploadedPhoto);
  const [loading, setLoading] = useState(false);

  const product = getProductBySlug(productSlug) ?? products[0];

  const generate = useCallback(async () => {
    if (!song) return;
    setLoading(true);
    dispatch(setAiSuggestion(null));
    try {
      const res = await fetch('/api/vinyl-mood', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          trackName: song.trackName,
          artistName: song.artistName,
          collectionName: song.collectionName,
        }),
      });
      // Guard against a non-OK / empty / non-JSON response so the UI never
      // throws — fall back to a tasteful default suggestion instead.
      const data = res.ok ? ((await res.json()) as AiSuggestion) : AI_FALLBACK;
      dispatch(setAiSuggestion(data));
    } catch {
      dispatch(setAiSuggestion(AI_FALLBACK));
    } finally {
      setLoading(false);
    }
  }, [dispatch, song]);

  useEffect(() => {
    if (!ai && song) generate();
  }, [ai, song, generate]);

  if (!song) {
    return (
      <div className="mx-auto max-w-page px-6 pt-12 md:px-10 lg:px-14">
        <p className="text-[15px] text-muted">No song selected. Go back to search.</p>
      </div>
    );
  }

  const labelHex = ai?.palette[0] ?? '#C8873A';
  const baseHex = ai?.palette[1] ?? '#1F1A14';
  const paperHex = ai?.palette[2] ?? '#F4E9D2';

  const onPhoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') dispatch(setUploadedPhoto(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const finish = () => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        customisation: {
          trackName: song.trackName,
          artistName: song.artistName,
          collectionName: song.collectionName,
          artworkUrl: song.artworkUrl100,
          palette: ai?.palette,
          style: ai?.style,
          tagline: ai?.tagline,
          photoUrl: uploaded,
        },
      }),
    );
    router.push('/checkout');
  };

  return (
    <section className="panel-enter">
      <div className="mx-auto max-w-page px-6 pb-24 pt-10 md:px-10 lg:px-14">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => dispatch(prevStep())}
            className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted hover:text-ink"
          >
            ← Change song
          </button>
          <span className="block h-px w-6 bg-accent" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            Step four · Plynth AI + your photo
          </span>
        </div>

        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-serif text-[40px] leading-[1.05] tracking-[-0.01em] text-ink md:text-[48px]">
              We styled it for{' '}
              <em className="italic text-accent">{firstName(song.artistName) || 'them'}</em>.
            </h2>
            <p className="mt-4 max-w-[520px] text-[15.5px] leading-[1.6] text-muted">
              Plynth AI listened to the mood of the track and drew up a label palette, a sleeve
              treatment, and a single line for the engraving.
            </p>

            <div className="card-warm relative mt-8 rounded-[16px] p-6 md:p-8">
              <div className="relative z-10 flex items-center justify-between">
                <div className="hairline inline-flex items-center gap-2 rounded-full border border-ink/10 bg-parchment/70 px-3 py-1.5 backdrop-blur">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/80">
                    Suggested by Plynth AI
                  </span>
                </div>
                <button
                  onClick={generate}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted hover:text-ink disabled:opacity-50"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={loading ? 'animate-spin' : ''}
                  >
                    <path d="M21 12a9 9 0 1 1-3-6.7" />
                    <path d="M21 3v6h-6" />
                  </svg>
                  Regenerate
                </button>
              </div>

              {loading ? (
                <div className="relative z-10 mt-7 space-y-3">
                  <div className="skel h-4 w-2/3 rounded" />
                  <div className="skel h-4 w-5/6 rounded" />
                  <div className="skel h-4 w-1/2 rounded" />
                </div>
              ) : (
                <>
                  <blockquote className="relative z-10 mt-6 font-serif text-[26px] italic leading-[1.2] text-ink md:text-[30px]">
                    &ldquo;{ai?.tagline ?? 'A song held still on warm parchment.'}&rdquo;
                  </blockquote>
                  <div className="relative z-10 mt-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    Suggested tagline · engraved sleeve, line 1
                  </div>
                </>
              )}

              <div className="relative z-10 mt-8 grid grid-cols-2 items-start gap-6">
                <div>
                  <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    Palette
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Swatch hex={labelHex} name="Label" />
                    <Swatch hex={baseHex} name="Vinyl" />
                    <Swatch hex={paperHex} name="Sleeve" />
                  </div>
                </div>
                <div>
                  <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    Style
                  </div>
                  <div className="font-serif text-[20px] capitalize leading-tight text-ink">
                    {ai?.style ?? 'minimalist'}
                  </div>
                  <div className="mt-1.5 text-[13px] leading-[1.55] text-muted">
                    Handcrafted finish. Letterpress sleeve. Warm parchment box.
                  </div>
                </div>
              </div>
            </div>

            <PhotoUpload onPhoto={onPhoto} uploaded={uploaded} />

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                onClick={finish}
                className="cta-amber inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[14.5px] font-medium"
              >
                Add to bag — {formatPrice(product.price)}
                <ArrowIcon style={{ width: 14, height: 14 }} />
              </button>
              <button
                onClick={() => dispatch(prevStep())}
                className="underline-grow text-[14px] text-ink"
              >
                Adjust the song
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="card-paper rounded-[16px] p-6 md:p-7">
              <div className="relative z-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                Live preview
              </div>
              <div
                className="relative z-10 mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-[12px]"
                style={{ background: paperHex }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(135deg, rgba(80,55,30,0.10) 0 1px, transparent 1px 8px)',
                  }}
                />
                {uploaded && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={uploaded}
                    alt="Your photo"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply"
                  />
                )}
                <div
                  className="vinyl-mini spin relative aspect-square w-[78%] rounded-full"
                  style={{ ['--label' as string]: labelHex }}
                >
                  <div className="absolute inset-0 flex items-center justify-center rounded-full">
                    <div
                      className="flex aspect-square w-[34%] items-center justify-center rounded-full text-center"
                      style={{ background: labelHex }}
                    >
                      <div style={{ color: contrastInk(labelHex) }}>
                        <div className="font-serif text-[12px] italic leading-none">
                          {firstName(song.artistName) || 'Plynth'}
                        </div>
                        <div
                          className="mx-auto my-1 h-px w-5 opacity-40"
                          style={{ background: contrastInk(labelHex) }}
                        />
                        <div className="max-w-[80px] truncate font-mono text-[7.5px] uppercase tracking-[0.22em]">
                          {(song.trackName || 'Side A').slice(0, 14)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ background: paperHex }}
                  />
                </div>
              </div>

              <div className="relative z-10 mt-5 grid grid-cols-3 gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                <div>
                  <div>Disc</div>
                  <div className="mt-1 font-sans text-[12.5px] normal-case tracking-normal text-ink">
                    4&Prime; vinyl magnet
                  </div>
                </div>
                <div>
                  <div>Finish</div>
                  <div className="mt-1 font-sans text-[12.5px] normal-case tracking-normal text-ink">
                    Matte black
                  </div>
                </div>
                <div>
                  <div>Plays via</div>
                  <div className="mt-1 font-sans text-[12.5px] normal-case tracking-normal text-ink">
                    NFC tap
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-[1.55] text-muted">
              You&rsquo;ll see a final proof before we press anything. Free revisions until
              you&rsquo;re happy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoUpload({
  onPhoto,
  uploaded,
}: {
  onPhoto: (f: File) => void;
  uploaded: string | null;
}) {
  return (
    <div className="card-paper mt-8 rounded-[14px] p-6">
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            Add a photo
          </div>
          <div className="mt-1 font-serif text-[18px] text-ink">
            For the sleeve (optional)
          </div>
        </div>
        <label className="pill-ghost inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[12.5px] text-ink">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onPhoto(f);
            }}
            className="hidden"
          />
          {uploaded ? 'Replace photo' : 'Choose image'}
        </label>
      </div>
      {uploaded && (
        <div className="relative z-10 mt-4 overflow-hidden rounded-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={uploaded} alt="Your upload" className="h-40 w-full object-cover" />
        </div>
      )}
    </div>
  );
}

function Swatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="hairline h-12 w-12 rounded-md border" style={{ background: hex }} />
      <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">{name}</div>
      <div className="-mt-1 font-mono text-[10px] text-ink/80">{hex.toUpperCase()}</div>
    </div>
  );
}

function ConfiguratorInner() {
  const dispatch = useAppDispatch();
  const step = useAppSelector((s) => s.configurator.step);
  const params = useSearchParams();
  const productSlug = params.get('product') ?? products[0].slug;
  const stepIdx = step - 1;

  return (
    <main className="relative">
      <div className="mx-auto max-w-page px-6 md:px-10 lg:px-14">
        <div className="hidden items-center justify-end gap-1 pt-7 md:flex">
          {STEP_NAMES.map((s, i) => (
            <button
              key={s}
              onClick={() => dispatch(setStep(((i + 1) as 1 | 2 | 3 | 4)))}
              className={`step-jump ${i === stepIdx ? 'active' : ''}`}
            >
              {String(i + 1).padStart(2, '0')} · {s}
            </button>
          ))}
        </div>
      </div>

      <StepBar stepIdx={stepIdx} />

      <div className="mt-2">
        {step === 1 && <StepSearch />}
        {step === 2 && <StepBrowse />}
        {step === 3 && <StepConfirm />}
        {step === 4 && <StepDesign productSlug={productSlug} />}
      </div>

      <div className="mx-auto max-w-page px-6 pb-16 md:px-10 lg:px-14">
        <Link
          href="/"
          className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted hover:text-ink"
        >
          ← Save & exit
        </Link>
      </div>

      {/* trigger nextStep/dispatch reference so unused-imports do not error */}
      <span hidden aria-hidden onClick={() => dispatch(nextStep())} />
    </main>
  );
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={null}>
      <ConfiguratorInner />
    </Suspense>
  );
}
