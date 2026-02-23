---
name: github-api-integration
description: Reference guide for how Ginger Web fetches data from the GitHub Releases API. Use this when you need to fetch additional GitHub data (release notes, commit history, stargazers) or debug ISR caching behaviour.
---

# GitHub API Integration Skill

Ginger Web fetches all release data from the GitHub REST API using Next.js Server Components and ISR. The entire integration lives in `lib/github.ts`.

## How It Works

```
Server Component (RSC)
  → getAllReleases() or getRelease(productId)   ← lib/github.ts
      → fetch("api.github.com/repos/.../releases/latest", {
           next: { revalidate: 3600 }           ← Next.js ISR cache
        })
      → returns GitHubRelease | null
```

- Data is fetched **server-side** — never in the browser.
- The `revalidate: 3600` tag means Next.js caches the response and re-fetches **at most once per hour** in production. In dev mode, the cache is bypassed on every request.
- No API key needed for **public repos**. Anonymous rate limit: 60 requests/hour. With `GITHUB_TOKEN`: 5,000/hour.

## Key Functions

```typescript
// Fetch all 3 products' latest releases in parallel
getAllReleases(): Promise<ReleaseData[]>

// Fetch a single product's latest release
getRelease(productId: ProductId): Promise<ReleaseData>

// Map raw GitHub assets to detected platforms
getPlatformAssets(assets: GitHubAsset[]): (GitHubAsset & { platform, formattedSize })[]
```

## Fetching Additional GitHub Data

To add a new GitHub API call (e.g., stargazer count, commit count):

### 1. Add a new function to `lib/github.ts`

```typescript
export async function getRepoStats(repo: string) {
  const headers = getHeaders(); // reuse the auth headers
  const res = await fetch(`${GITHUB_API}/repos/${repo}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    stars: data.stargazers_count as number,
    forks: data.forks_count as number,
    openIssues: data.open_issues_count as number,
  };
}
```

> Note: `getHeaders()` does not currently exist as a named export — refactor the inline `headers` object in `fetchRelease` into a private helper if needed.

### 2. Call it in a Server Component

```typescript
// In app/page.tsx or any server component:
const stats = await getRepoStats("codewithwest/ginger_os");
```

### 3. Never call GitHub API from Client Components

GitHub API calls must stay in Server Components or Route Handlers. Calling from a Client Component would expose your `GITHUB_TOKEN` in the browser and waste ISR caching.

## Debugging ISR Cache

In **development**: cache is disabled, every page load hits GitHub.

In **production**: if the page is stale, trigger manual revalidation:
```bash
# On-demand revalidation (if you add a revalidateTag endpoint)
curl -X POST https://your-site.vercel.app/api/revalidate?secret=token&tag=releases
```

Or simply re-deploy to Vercel — this busts the ISR cache for all pages.

## GitHub Rate Limits

| Scenario | Limit |
|----------|-------|
| No token (anonymous) | 60 req/hr |
| `GITHUB_TOKEN` set | 5,000 req/hr |
| GitHub App token | 15,000 req/hr |

For a public showcase site with ISR, 60 req/hr is usually sufficient in production. Set `GITHUB_TOKEN` for development to avoid hitting limits during frequent hot reloads.

## Types Reference

```typescript
GitHubRelease   → tag_name, name, body, published_at, html_url, assets[]
GitHubAsset     → name, size, download_count, browser_download_url
Product         → id, name, tagline, description, icon, repo, slug, features, platforms
ReleaseData     → { product: Product, release: GitHubRelease | null }
```
