---
name: adding-a-product
description: Step-by-step guide on how to add a new product to the GingerOS showcase site (new card in carousel, new product page, new downloads section). Use this when expanding the ecosystem with a new Ginger app.
---

# Adding a Product Skill

All product configuration lives in a single file: `lib/github.ts`. Adding a new product requires changes only to that file — all pages (homepage carousel, downloads, product detail) pick it up automatically.

## Step 1: Add to the `PRODUCTS` Array

Open `lib/github.ts` and add a new entry to the `PRODUCTS` array:

```typescript
{
  id: "my-new-app" as ProductId,   // unique kebab-case ID
  name: "Ginger My App",           // display name
  tagline: "One-line techy pitch.",
  description: "1-2 sentences describing what this app does and who it's for.",
  icon: "🛠",                      // emoji used on cards
  repo: "codewithwest/my-new-repo",// GitHub repo path (owner/repo)
  slug: "my-new-app",              // must match the `id` — used in the URL
  features: [
    "Feature one",
    "Feature two",
    "Feature three",
  ],
  cliExample: "# Optional CLI usage example\nmy-app --help",  // or omit
  platforms: ["linux", "windows", "macos"],  // subset of these three
},
```

Also add the new ID to the `ProductId` type union:
```typescript
export type ProductId = "media-handler" | "alarm" | "ginger-os" | "my-new-app";
```

## Step 2: Verify the GitHub Repo Has a Release

The site reads release data from `https://api.github.com/repos/codewithwest/my-new-repo/releases/latest`.

- If the repo has no published release yet, the product card will show "No release yet" and the download table will show a placeholder. This is fine — no code change needed.
- Once you publish a GitHub Release with attached binary assets, the site will automatically show the download button within 1 hour (ISR revalidation).

## Step 3: Test Locally

```bash
npm run dev -- --port 3003
```

Check:
1. The new card appears in the **carousel** on `/`
2. The product page `/products/my-new-app` renders without 404
3. `/downloads` shows the new product section

## Step 4: Static Params — No Change Needed

`generateStaticParams` in `app/products/[slug]/page.tsx` reads from `PRODUCTS`, so the new slug is automatically pre-generated:
```typescript
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
```

## Notes

- **Platform detection** for download assets is done in `getPlatformAssets()` in `lib/github.ts`. It detects `.deb`, `.exe`, `.dmg`, `.AppImage`, `.rpm`, `.zip`, `.iso` etc. by filename. If your release uses unusual extensions, extend the detection logic there.
- **Icon**: Use a single emoji for simplicity. If you need a custom SVG icon, pass it through a new `iconComponent` prop in `ProductCard.tsx`.
