export function VinylProduct({ spin = true }: { spin?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="hairline photo-ph absolute inset-x-6 inset-y-10 overflow-hidden rounded-[2px] border md:inset-x-10 md:inset-y-14">
        <div className="absolute inset-0 flex flex-col justify-between p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a5a30]/70">
          <span>lifestyle.jpg</span>
          <span className="self-end">2400 × 3000</span>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute -inset-6 rounded-full bg-[#1a1714]/85 blur-[0.5px]"
          style={{ boxShadow: '0 40px 60px -30px rgba(40,20,5,0.45)' }}
        />

        <div
          className={`vinyl relative aspect-square w-[280px] rounded-full sm:w-[340px] md:w-[380px] lg:w-[420px] ${spin ? 'spin-slow' : ''}`}
        >
          <div className="vinyl-sheen pointer-events-none absolute inset-0 rounded-full" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex aspect-square w-[34%] items-center justify-center rounded-full text-center"
              style={{
                background: '#C8873A',
                boxShadow:
                  'inset 0 0 0 1px rgba(0,0,0,0.15), inset 0 -10px 20px rgba(0,0,0,0.12)',
              }}
            >
              <div className="text-ink">
                <div className="font-serif text-[15px] italic leading-none md:text-[17px]">
                  Plynth
                </div>
                <div className="mx-auto mt-1 h-px w-6 bg-ink/40" />
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] md:text-[9px]">
                  Side A · 45 rpm
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-parchment shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]" />
        </div>

        <div className="hairline absolute -bottom-3 -right-2 flex items-center gap-1.5 rounded-full border bg-parchment px-2.5 py-1.5 shadow-[0_8px_20px_-12px_rgba(40,20,5,0.4)] md:-right-4">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/80">
            NFC · tap to play
          </span>
        </div>
      </div>
    </div>
  );
}
