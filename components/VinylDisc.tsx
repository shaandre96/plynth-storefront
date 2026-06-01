export function VinylDisc({ size = '70%' }: { size?: string }) {
  return (
    <div
      className="vinyl absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ width: size }}
    >
      <div className="vinyl-sheen pointer-events-none absolute inset-0 rounded-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex aspect-square w-[34%] items-center justify-center rounded-full text-center"
          style={{
            background: '#C8873A',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
          }}
        >
          <div className="text-ink">
            <div className="font-serif text-[13px] italic leading-none">Plynth</div>
            <div className="mx-auto mt-1 h-px w-5 bg-ink/40" />
            <div className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.22em]">Side A</div>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-parchment" />
    </div>
  );
}
