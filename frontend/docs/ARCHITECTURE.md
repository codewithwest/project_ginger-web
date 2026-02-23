# Architecture — Ginger Web

## Overview

Ginger Web is a **pure Next.js 15 app** with no dedicated backend. All release data is fetched from the GitHub Releases API at build/request time using Next.js ISR (Incremental Static Regeneration).

```
Browser
  └── Next.js (Vercel / Node)
        ├── RSC fetch → GitHub Releases API (cached 1hr via ISR)
        └── Client Components → Canvas animations, 3D carousel interactions
```

---

## Data Flow

```
[GitHub Releases API]
        │
        │  fetch() in Server Components
        │  next: { revalidate: 3600 }
        ▼
[lib/github.ts]  ← getAllReleases() / getRelease(productId)
        │
        ▼
[app/page.tsx]           → ProductCarousel3D (live version badges)
[app/downloads/page.tsx] → Download table with asset list
[app/products/[slug]/]   → Deep-dive: features, CLI, release notes
```

GitHub's CDN hosts the actual binary files. Download buttons link directly to `asset.browser_download_url`.

---

## Key Design Decisions

### No Backend
GitHub Releases API provides version, download URL, file size, and download count — everything we need. ISR means this is effectively cached and fast, re-validating every hour.

### GitHub Token (optional)
Without a token: 60 API requests/hour (GitHub's anonymous limit).
With `GITHUB_TOKEN` set: 5,000 requests/hour. The token is server-side only (never exposed to the client).

### 3D Carousel (CSS, not Three.js)
The product carousel uses CSS `perspective` + `rotateY` transforms. This works with SSR and avoids the `canvas`/WebGL bootstrap cost. Three.js is installed but reserved for future interactive visualizations.

### Matrix Rain (Canvas)
`MatrixRain.tsx` is a client-only canvas component loaded with `next/dynamic({ ssr: false })` to avoid hydration mismatches. It renders binary/hex/katakana glyphs in laser teal-green, mimicking a terminal aesthetic.

---

## Route Map

| Route | Rendered As | Description |
|-------|-------------|-------------|
| `/` | RSC + Client | Landing: Hero + 3D Carousel + Pillars |
| `/downloads` | RSC | Full download table, all products |
| `/products/[slug]` | RSC | Per-product page, statically generated |

### Static Generation
`generateStaticParams` in `app/products/[slug]/page.tsx` pre-generates routes for all products defined in `lib/github.ts → PRODUCTS`.

---

## Component Hierarchy

```
layout.tsx
├── Navbar.tsx          (client — scroll-aware glassmorphism)
├── [page]
│   ├── Hero.tsx        (client — typewriter + MatrixRain)
│   │   └── MatrixRain.tsx (dynamic import, SSR=false)
│   └── ProductCarousel3D.tsx (client — CSS 3D, pointer events)
└── Footer.tsx          (server)
```

---

## Styling

Tailwind CSS v4 with `@theme` block in `globals.css` for design tokens:

- `--color-bg` `#060e10` — near-black teal background
- `--color-accent` `#00e8c8` — laser teal-green (primary accent)
- `--font-mono` JetBrains Mono — all code and techy labels
- `--font-sans` Inter — body text

Custom utility classes (`.card`, `.btn-primary`, `.pill-accent`, `.glow-text`, `.grid-texture`) are defined in `@layer utilities` and used across components.

---

## Deployment

Deploy the `frontend/` directory to **Vercel**:

```bash
# From project_ginger-web/frontend
vercel deploy
```

Set `GITHUB_TOKEN` as a Vercel environment variable for higher rate limits.

No database, no Docker, no environment setup needed in production.
