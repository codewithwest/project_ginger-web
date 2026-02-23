# Ginger Web — GingerOS Showcase Site

The public-facing website for the GingerOS ecosystem. A Next.js 15 app that showcases GingerOS, Ginger Media Handler, and Ginger Alarm — with live release data pulled directly from the GitHub Releases API.

**Live at:** TBD (deploy to Vercel)

---

## Stack

| | |
|-|-|
| Framework | Next.js 15 (App Router, React Server Components) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| 3D / FX | Three.js, CSS 3D Transforms |
| Icons | Lucide React |
| Data | GitHub Releases API (ISR-cached, 1hr) |
| Deploy | Vercel |

No database. No backend. Release data comes from GitHub automatically.

---

## Quick Start

```bash
# Node 24 required (use nvm)
nvm use 24

cd frontend
cp .env.local.example .env.local   # optional: add GITHUB_TOKEN
npm install
npm run dev                         # → http://localhost:3000
```

> See [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) for env variable details.

---

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              ← Root layout (Navbar + Footer)
│   ├── page.tsx                ← Landing page (Hero + Carousel)
│   ├── downloads/page.tsx      ← All downloads table
│   └── products/[slug]/page.tsx← Per-product showcase
├── components/
│   ├── Hero.tsx                ← Typewriter + Matrix rain hero
│   ├── MatrixRain.tsx          ← Canvas-based matrix rain animation
│   ├── Navbar.tsx              ← Fixed glassmorphism nav
│   ├── Footer.tsx              ← Footer with links
│   ├── ProductCard.tsx         ← Single product info card
│   └── ProductCarousel3D.tsx   ← CSS 3D perspective carousel
├── lib/
│   └── github.ts               ← GitHub Releases API client + PRODUCTS config
└── docs/                       ← Extended documentation
```

---

## Key Files

### `lib/github.ts`
Central config. The `PRODUCTS` array defines all showcased products with their GitHub repo paths. Adding a new product is a one-line change here.

### `components/MatrixRain.tsx`
Client-side canvas animation loaded with `next/dynamic` (SSR-disabled). Renders binary, hex, and katakana characters in laser teal-green.

### `components/ProductCarousel3D.tsx`
Interactive 3D carousel using CSS `perspective` and `rotateY`. No Three.js dependency needed — pure CSS 3D transforms for maximum performance and SSR compatibility.

---

## Adding a New Product

See [`.agent/skills/adding-a-product/SKILL.md`](.agent/skills/adding-a-product/SKILL.md).

## Environment Variables

See [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md).

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## License

MIT — Part of the GingerOS ecosystem.
