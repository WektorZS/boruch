import { createHash } from "node:crypto"
import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

// Runs only at build time. The exported website needs no Node server.
const root = path.resolve("out")
const hash = (value) => `sha256-${createHash("sha256").update(value).digest("base64")}`
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT
if (endpoint?.startsWith("//")) throw new Error("Contact endpoint must not be protocol-relative")
const connectOrigins = new Set(["'self'", "https://vitals.vercel-insights.com"])
if (endpoint && !endpoint.startsWith("/")) {
  const url = new URL(endpoint)
  if (url.protocol !== "https:" || url.username || url.password) throw new Error("Contact endpoint must use HTTPS without credentials")
  connectOrigins.add(url.origin)
}
const assetHashes = new Map()
let pages = 0
async function securePage(file) {
  let html = await readFile(file, "utf8")
  html = html.replace(/<meta name="boruch-security"[^>]*>/g, "")
  const hashes = new Set()
  const matches = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  for (const match of matches) {
    const src = /\bsrc="([^"]+)"/i.exec(match[1])?.[1]
    if (!src) { if (match[2]) hashes.add(`'${hash(match[2])}'`); continue }
    if (!src.startsWith("/") || src.startsWith("//")) throw new Error(`Unexpected external initial script in ${file}`)
    const assetPath = path.resolve(root, `.${decodeURIComponent(src.split("?")[0])}`)
    if (!assetPath.startsWith(root + path.sep)) throw new Error("Script escaped export directory")
    if (!assetHashes.has(assetPath)) assetHashes.set(assetPath, hash(await readFile(assetPath)))
    const digest = assetHashes.get(assetPath)
    hashes.add(`'${digest}'`)
    const attributes = match[1].replace(/\s+integrity="[^"]*"/g, "")
    html = html.replace(match[0], `<script${attributes} integrity="${digest}">${match[2]}</script>`)
  }
const policy = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",

  `script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.ggpht.com https://*.googleusercontent.com ${[...hashes].join(" ")}`,
  "script-src-attr 'none'",

  // React and Google Maps use inline styles.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

  "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.ggpht.com https://*.googleusercontent.com",

  "font-src 'self' https://fonts.gstatic.com",

  "frame-src https://*.google.com",

  `connect-src ${[...connectOrigins].join(" ")} https://*.googleapis.com https://*.gstatic.com https://*.google.com data: blob:`,

  `form-action ${[...connectOrigins]
    .filter((origin) => origin !== "https://vitals.vercel-insights.com")
    .join(" ")}`,

  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ")
  const meta = `<meta name="boruch-security" http-equiv="Content-Security-Policy" content="${policy}"/>`
  if (!/<meta charSet="utf-8"\s*\/>/i.test(html)) throw new Error(`Missing UTF-8 declaration in ${file}`)
  html = html.replace(/<meta charSet="utf-8"\s*\/>/i, (charset) => charset + meta)
  await writeFile(file, html)
  pages++
}
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) await walk(file)
    else if (entry.name.endsWith(".html")) await securePage(file)
  }
}
await walk(root)
// Supported by Cloudflare Pages and Netlify. Other hosts need equivalent HTTP configuration.
await writeFile(path.join(root, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Content-Security-Policy: base-uri 'none'; object-src 'none'; frame-ancestors 'none'
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000
`)
console.log(`Security policy and script integrity added to ${pages} static pages.`)
