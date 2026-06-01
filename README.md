# Plynth Storefront

A demonstration storefront for personalised NFC vinyl-record magnets — tap one with your
phone and "your song" plays. Built as a portfolio piece by **Koha Studio**.

No payment is taken and no orders are fulfilled. See the in-app **Case study** page for the
full write-up.

## Highlights

- **Four-step configurator** — search → listen → confirm → design, with a live preview disc
- **Real music search** — proxied iTunes Search API (track results + 30s previews)
- **AI-assisted artwork** — Claude suggests a palette, style, and tagline from the song
- **Hand-tuned cart** — slide-over drawer, free-shipping progress, and a bundle upsell
- **Simulated checkout** — validates and confirms without ever taking a payment

## Stack

Next.js 15 (App Router) · React 19 · Redux Toolkit · Tailwind CSS · Anthropic SDK

## Getting started

```bash
npm install
cp .env.local.example .env.local   # add your ANTHROPIC_API_KEY (optional — falls back gracefully)
npm run dev
```

| Script             | Description                |
| ------------------ | -------------------------- |
| `npm run dev`      | Start the dev server       |
| `npm run build`    | Production build           |
| `npm run start`    | Serve the production build |
| `npm run lint`     | Lint                       |
| `npm run typecheck`| TypeScript check           |
