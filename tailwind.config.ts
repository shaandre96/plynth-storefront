import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F0E8',
        surface: '#EDE8DE',
        ink: '#2C2416',
        muted: '#8B7355',
        accent: '#C8873A',
        warm: '#EFE7D2',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1320px',
      },
    },
  },
  plugins: [],
};

export default config;
