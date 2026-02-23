# Environment Variables

## `frontend/.env.local`

Copy `.env.local.example` to `.env.local` before running locally.

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Optional | GitHub Personal Access Token. Increases API rate limit from 60/hr (anonymous) to 5,000/hr. Generate one at github.com/settings/tokens — no scopes needed for public repos. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public URL of the site, used in SEO metadata. Default: `http://localhost:3000` |

## Generating a GitHub Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. **Generate new token (classic)**
3. No scopes needed — public repo access is available without any scope
4. Copy the token into `.env.local`:
   ```
   GITHUB_TOKEN=github_pat_...
   ```

> The token is **server-side only** — it is never sent to the browser. Next.js automatically excludes env vars without the `NEXT_PUBLIC_` prefix from client bundles.

## Production (Vercel)

Add `GITHUB_TOKEN` in the Vercel dashboard under **Project Settings → Environment Variables**. This is the only variable needed for production.
