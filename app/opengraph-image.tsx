import { ImageResponse } from 'next/og';

export const alt = 'Plynth — Personalised music gifts';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F5F0E8',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: '#2C2416',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 999, background: '#C8873A' }} />
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: '#2C2416',
              letterSpacing: '-0.01em',
            }}
          >
            Plynth
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 44, height: 3, background: '#C8873A' }} />
            <div
              style={{
                fontSize: 20,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#8B7355',
                fontFamily: 'monospace',
              }}
            >
              Personalised vinyl
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 76,
              lineHeight: 1.05,
              color: '#2C2416',
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            <span>A song. A memory. A gift they&rsquo;ll&nbsp;</span>
            <span style={{ color: '#C8873A', fontStyle: 'italic' }}>never&nbsp;</span>
            <span>forget.</span>
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            fontSize: 24,
            color: '#8B7355',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>NFC vinyl magnets that play your song</span>
          <span>plynth.studio</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
