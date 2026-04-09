# Altpac — Premium Homepage Rebuild

A premium homepage for [Altpac](https://altpac.co), India's largest sustainable paper packaging manufacturer and the packaging arm of Canpac Trends Pvt Ltd.

## Tech Stack

- **Next.js 15** (App Router, TypeScript strict)
- **Tailwind CSS v4** (custom design tokens via `@theme`)
- **Framer Motion** (via `motion/react`)
- **Lucide React** (icons)
- **Fonts**: Fraunces (display) + Inter (body) via Google Fonts CDN

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

### Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the repository to Vercel for automatic deployments.

## Sections

1. Sticky glass nav with mega-dropdown
2. Editorial hero with kinetic headline animation
3. Proof marquee (auto-scrolling stats)
4. Stats counter band (scroll-triggered count-up)
5. Bento product grid (10 products, hover tilt + spec overlay)
6. Industries split panel (8 industries, crossfade on hover)
7. India map (hand-coded SVG, 5 pulsing plant pins)
8. Certifications (7 cards with descriptions)
9. Infrastructure photo wall (4-panel bento)
10. Capabilities cards (4 differentiators including B.I.R.D. lab)
11. Impact stats (sustainability numbers)
12. Final CTA band + Footer

Plus: floating "Request a Sample" CTA and modal form.

## Key Design Decisions

- **No lime green.** Kraft amber (`#C89A5B`) replaces the old accent.
- **Grain texture** on cream backgrounds for a tactile paper feel.
- **All animations** respect `prefers-reduced-motion`.
- **Images** loaded from Altpac's existing Webflow CDN.
