# Static export & hosting

This project is configured for a fully static export — no Node.js server is required in production.

## Build

\`\`\`bash
pnpm build
\`\`\`

This runs `next build` with `output: 'export'` (set in `next.config.mjs`) and writes a self-contained static site to the `out/` directory: 24 prerendered HTML routes (PL pages, 12 service detail pages, and `/en`, `/de`, `/uk` locale homepages), `sitemap.xml`, `robots.txt`, `404.html`, and all static assets under `_next/` and `images/`.

## Deploy

Upload the contents of `out/` to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages, nginx, etc.). No server runtime, environment variables, or API routes are needed — every page, including `sitemap.xml` and `robots.txt`, is a plain static file.

- **404 handling**: configure the host to serve `404.html` for unmatched paths.
- **Trailing slashes**: routes are exported as `<route>.html` (e.g. `uslugi.html`) alongside a `<route>/index.html`-style directory in some hosts' conventions — verify your host's static-file routing serves clean URLs (most do out of the box; Vercel and Netlify handle this automatically).
- **Images**: `images.unoptimized: true` is set, so `next/image` outputs plain `<img>` tags referencing files already optimized and committed under `public/images/`. No image optimization server is required at runtime.

## What changed to support static export

- `next.config.mjs`: added `output: 'export'`.
- `app/sitemap.ts` and `app/robots.ts`: added `export const dynamic = "force-static"`, required by Next.js for metadata routes under static export.
- No dynamic route handlers, server actions, or `cookies()`/`headers()` usage exist in the app, so no other changes were needed.

## Local preview of the exported site

\`\`\`bash
pnpm build
npx serve out
\`\`\`
