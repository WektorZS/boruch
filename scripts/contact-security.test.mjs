import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import ts from "typescript"

const source = await readFile(new URL("../api/contact.ts", import.meta.url), "utf8")
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText
const handler = (await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`)).default
const originalFetch = globalThis.fetch
const originalEnv = { ...process.env }
let emails = []
let sequence = 0
process.env.VERCEL = "1"
process.env.RESEND_API_KEY = "test-key-not-a-real-secret"
process.env.RESEND_FROM_EMAIL = "test@example.com"
process.env.CONTACT_NOTIFICATION_EMAIL = "recipient@example.com"
process.env.CONTACT_ALLOWED_ORIGINS = "https://frontend.example.com"
globalThis.fetch = async (url, options) => {
  assert.equal(url, "https://api.resend.com/emails")
  emails.push({ body: JSON.parse(options.body), headers: options.headers })
  return Response.json({ id: "mock-email" })
}
const valid = () => ({ name: "Anna Kowalska", phone: "+48 123 456 789", email: "anna@example.com", service: "service-0", message: "Proszę o wycenę mycia auta.", privacyConsent: true, website: "", formLoadedAt: Date.now() - 10000, locale: "pl" })
function request(payload = valid(), options = {}) {
  return new Request("https://api.example.com/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
    ...options,
    headers: { origin: "https://frontend.example.com", "content-type": "application/json", "x-vercel-forwarded-for": `192.0.2.${++sequence}`, ...options.headers },
  })
}
test("contact endpoint security", async (t) => {
  try {
    await t.test("valid form sends plain text and exact CORS origin", async () => {
      const response = await handler.fetch(request())
      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), { ok: true })
      assert.equal(response.headers.get("access-control-allow-origin"), "https://frontend.example.com")
      assert.equal(response.headers.get("cache-control"), "no-store")
      assert.equal(emails.at(-1).body.html, undefined)
    })
    for (const origin of ["https://evil.example.com", "null", "https://frontend.example.com.evil", "https://user@frontend.example.com"]) {
      await t.test(`reject origin ${origin}`, async () => assert.equal((await handler.fetch(request(valid(), { headers: { origin } }))).status, 403))
    }
    await t.test("reject unsupported method", async () => {
      const response = await handler.fetch(request(null, { method: "PUT" }))
      assert.equal(response.status, 405)
      assert.equal(response.headers.get("allow"), "POST, OPTIONS")
    })
    await t.test("validate preflight", async () => {
      const response = await handler.fetch(new Request("https://api.example.com/api/contact", { method: "OPTIONS", headers: { origin: "https://frontend.example.com", "access-control-request-method": "POST", "access-control-request-headers": "content-type" } }))
      assert.equal(response.status, 204)
    })
    await t.test("reject misleading JSON content type", async () => assert.equal((await handler.fetch(request(valid(), { headers: { "content-type": "application/json-malicious" } }))).status, 415))
    await t.test("reject compressed request bodies", async () => assert.equal((await handler.fetch(request(valid(), { headers: { "content-encoding": "gzip" } }))).status, 415))
    await t.test("reject oversized streamed body", async () => assert.equal((await handler.fetch(request(valid(), { body: "a".repeat(24001) }))).status, 413))
    await t.test("reject malformed JSON", async () => assert.equal((await handler.fetch(request(valid(), { body: "{broken" }))).status, 400))
    await t.test("reject arrays", async () => assert.equal((await handler.fetch(request([]))).status, 400))
    for (const [key, value] of [["name", {}], ["phone", "1------"], ["email", "test@example.com\r\nBcc: victim@example.com"], ["service", "Injected subject"], ["message", "a".repeat(1201)], ["privacyConsent", "true"], ["formLoadedAt", Date.now() + 60000], ["unexpected", "field"], ["locale", {}], ["website", {}]]) {
      await t.test(`reject invalid ${key}`, async () => assert.equal((await handler.fetch(request({ ...valid(), [key]: value }))).status, 400))
    }
    await t.test("honeypot never sends mail", async () => {
      const before = emails.length
      assert.equal((await handler.fetch(request({ ...valid(), website: "spam.example.com" }))).status, 200)
      assert.equal(emails.length, before)
    })
    await t.test("HTML in message remains harmless plain text", async () => {
      const message = "<script>alert(document.cookie)</script>"
      assert.equal((await handler.fetch(request({ ...valid(), message }))).status, 200)
      assert.ok(emails.at(-1).body.text.includes(message))
      assert.equal(emails.at(-1).body.html, undefined)
    })
    await t.test("legacy localized service stays compatible", async () => assert.equal((await handler.fetch(request({ ...valid(), service: "Exterior wash", locale: "en" }))).status, 200))
    await t.test("all service IDs work in all four languages", async () => {
      for (const locale of ["pl", "en", "de", "uk"]) for (let index = 0; index < 16; index++) {
        assert.equal((await handler.fetch(request({ ...valid(), locale, service: `service-${index}` }))).status, 200)
      }
      assert.equal((await handler.fetch(request({ ...valid(), service: "service-16" }))).status, 400)
    })
    await t.test("idempotency distinguishes phone changes", async () => {
      await handler.fetch(request(valid()))
      const key = emails.at(-1).headers["Idempotency-Key"]
      await handler.fetch(request({ ...valid(), phone: "+48 987 654 321" }))
      assert.notEqual(emails.at(-1).headers["Idempotency-Key"], key)
    })
    await t.test("request limit returns retry guidance", async () => {
      for (let i = 0; i < 5; i++) assert.equal((await handler.fetch(request(valid(), { headers: { "x-vercel-forwarded-for": "192.0.2.254" } }))).status, 200)
      const response = await handler.fetch(request(valid(), { headers: { "x-vercel-forwarded-for": "192.0.2.254" } }))
      assert.equal(response.status, 429)
      assert.equal(response.headers.get("retry-after"), "600")
    })
    await t.test("untrusted forwarding headers cannot bypass limits outside Vercel", async () => {
      process.env.VERCEL = "0"
      for (let i = 0; i < 5; i++) assert.equal((await handler.fetch(request())).status, 200)
      assert.equal((await handler.fetch(request())).status, 429)
      process.env.VERCEL = "1"
    })
    await t.test("provider failure is not exposed as success", async () => {
      globalThis.fetch = async () => Response.json({ secret: "private provider detail" }, { status: 422 })
      const response = await handler.fetch(request())
      assert.equal(response.status, 502)
      assert.deepEqual(await response.json(), { ok: false })
    })
  } finally {
    globalThis.fetch = originalFetch
    for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key]
    Object.assign(process.env, originalEnv)
  }
})
