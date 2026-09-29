# Static export & hosting

This project is configured for a static page export. No permanent Node.js server is required in production.

## Build

\`\`\`bash
pnpm build
\`\`\`

This runs `next build` with `output: 'export'` (set in `next.config.mjs`) and writes a self-contained static site to the `out/` directory: 24 prerendered HTML routes (PL pages, 12 service detail pages, and `/en`, `/de`, `/uk` locale homepages), `sitemap.xml`, `robots.txt`, `404.html`, and all static assets under `_next/` and `images/`.

## Deploy

Upload the contents of `out/` to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages, nginx, etc.). Every page, including `sitemap.xml` and `robots.txt`, is a plain static file.

The homepage contact form requires the small serverless function in `api/contact.ts`. The included `vercel.json` deploys the static `out/` directory and exposes that function under `/api/contact`. On another static host, either provide a compatible endpoint at the same path or disable the form.

- **404 handling**: configure the host to serve `404.html` for unmatched paths.
- **Trailing slashes**: routes are exported as `<route>.html` (e.g. `uslugi.html`) alongside a `<route>/index.html`-style directory in some hosts' conventions - verify your host's static-file routing serves clean URLs (most do out of the box; Vercel and Netlify handle this automatically).
- **Images**: `images.unoptimized: true` is set, so `next/image` outputs plain `<img>` tags referencing files already optimized and committed under `public/images/`. No image optimization server is required at runtime.

## Resend contact form

Configure these environment variables in the Vercel project settings:

```text
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=BORUCH <formularz@boruchmyjnia.pl>
CONTACT_NOTIFICATION_EMAIL=bruchkarol@gmail.com
CONTACT_ALLOWED_ORIGINS=https://boruchmyjnia.pl,https://www.boruchmyjnia.pl
```

The sending domain used in `RESEND_FROM_EMAIL` must be verified in Resend. Never add the real API key to `.env.example` or commit it to Git.

For durable rate limiting, add a Vercel Firewall rule for the path `/api/contact`, keyed by IP. A practical starting point is 5 requests per 10 minutes. The function also includes a best-effort in-memory limit, but a serverless instance cannot guarantee that limit across every region and invocation.

## What changed to support static export

- `next.config.mjs`: added `output: 'export'`.
- `app/sitemap.ts` and `app/robots.ts`: added `export const dynamic = "force-static"`, required by Next.js for metadata routes under static export.
- No dynamic route handlers, server actions, or `cookies()`/`headers()` usage exist in the Next.js app. The Resend endpoint is a separate Vercel Function outside the App Router.

## Local preview of the exported site

\`\`\`bash
pnpm build
npx serve out
\`\`\`
