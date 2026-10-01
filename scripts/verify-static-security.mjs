import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const root = path.resolve("out")
const hash = (value) => `sha256-${createHash("sha256").update(value).digest("base64")}`
let pages = 0
let scripts = 0
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert.ok(!entry.isSymbolicLink(), "Export must not contain filesystem links")
    assert.ok(!/^(?:\.env.*|api|node_modules|\.git|\.backups|\.tmp.*)$/.test(entry.name), "Private or temporary files in export")
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) { await walk(file); continue }
    if (!entry.name.endsWith(".html")) continue
    const html = await readFile(file, "utf8")
    const policy = /<meta name="boruch-security" http-equiv="Content-Security-Policy" content="([^"]+)"\/>/.exec(html)?.[1]
    assert.ok(policy, `CSP missing in ${file}`)
    assert.ok(html.indexOf('name="boruch-security"') < html.indexOf("<script"), "CSP must precede executable content")
    const scriptPolicy = /script-src ([^;]+)/.exec(policy)?.[1]
    assert.ok(scriptPolicy.includes("'strict-dynamic'"))
    assert.ok(!scriptPolicy.includes("'unsafe-inline'") && !scriptPolicy.includes("'unsafe-eval'"))
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const src = /\bsrc="([^"]+)"/i.exec(match[1])?.[1]
      const digest = src ? hash(await readFile(path.join(root, decodeURIComponent(src.split("?")[0])))) : hash(match[2])
      if (!src && !match[2]) continue
      assert.ok(scriptPolicy.includes(`'${digest}'`), `Script hash missing in ${file}`)
      if (src) assert.ok(match[1].includes(`integrity="${digest}"`), "External script integrity missing")
      scripts++
    }
    pages++
  }
}
await walk(root)
assert.ok(pages > 1)
console.log(`Verified CSP and integrity: ${pages} static pages, ${scripts} scripts. No private directories in out.`)
