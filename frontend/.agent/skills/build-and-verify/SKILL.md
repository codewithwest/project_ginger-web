---
name: build-and-verify
description: Verifies the integrity of the Ginger Web frontend by running TypeScript type checking, linting, and a production build. Use this skill before committing code or finishing a task to ensure no regressions.
---

# Build and Verify Skill

As a programmer agent working on Ginger Web, you must ensure the Next.js app remains strictly typed and compiles cleanly before any commit or task completion.

## Step 1: Type Check

Run the TypeScript compiler in no-emit mode to catch type errors across all components, lib files, and pages.

```bash
cd /home/west/Documents/github/ginger/project_ginger-web/frontend
npx tsc --noEmit
```

Fix any errors before proceeding. Common issues:
- **Missing `async`**: Server Components that call `await getAllReleases()` must be `async` functions.
- **`params` is a Promise**: In Next.js 15+ App Router, `params` in dynamic pages is `Promise<{ slug: string }>`. Always `await params`.
- **`dynamic` import**: `MatrixRain` uses `next/dynamic({ ssr: false })`. Never import it directly in a Server Component.

## Step 2: Lint

```bash
npm run lint
```

The project uses `eslint-config-next`. Key rules:
- No unused imports (remove them — they increase bundle size)
- `Image` from `next/image` instead of raw `<img>` for external images
- `Link` from `next/link` instead of `<a href>` for internal navigation

## Step 3: Production Build

```bash
npm run build
```

This runs the full Next.js build including static generation of `/products/[slug]` routes via `generateStaticParams`. If this passes, the code is production-ready.

Common build failures:
- **GitHub API rate limit hit during build**: Set `GITHUB_TOKEN` in `.env.local`. Without it, builds that fetch all 3 repos may occasionally hit the 60/hr anonymous limit.
- **Missing `"use client"` directive**: Any component that uses `useState`, `useEffect`, `useRef`, or browser APIs must have `"use client"` as its first line.

## Step 4: Dev Server Smoke Test

```bash
# Use nvm to ensure Node 24
source ~/.nvm/nvm.sh && nvm use 24
npm run dev -- --port 3003
```

Navigate to:
- `http://localhost:3003` — check Hero + carousel render
- `http://localhost:3003/downloads` — check release table
- `http://localhost:3003/products/media-handler` — check product page

## Troubleshooting

- **Hydration mismatch on MatrixRain**: Ensure `MatrixRain` is imported via `next/dynamic({ ssr: false })` in `Hero.tsx`, not with a static import.
- **`params` type error in `[slug]/page.tsx`**: `params` must be typed as `Promise<{ slug: string }>` and awaited inside the function body.
- **`reactCompiler: true` in `next.config.ts`**: This requires `babel-plugin-react-compiler`. If you see compiler errors, remove this flag.
