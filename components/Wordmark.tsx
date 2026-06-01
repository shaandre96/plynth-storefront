import Link from 'next/link';

export function Wordmark({
  size = 22,
  withDot = true,
}: {
  size?: number;
  withDot?: boolean;
}) {
  return (
    <Link href="/" className="flex shrink-0 select-none items-center gap-2.5">
      {withDot && (
        <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink">
          <span className="h-2 w-2 rounded-full bg-accent" />
        </span>
      )}
      <span
        className="font-serif leading-none tracking-tight text-ink"
        style={{ fontSize: size }}
      >
        Plynth
      </span>
    </Link>
  );
}
