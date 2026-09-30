const MAX_BODY_BYTES = 24_000
const MIN_FILL_TIME_MS = 2_500
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 5

type ContactPayload = {
  name?: unknown
  phone?: unknown
  email?: unknown
  service?: unknown
  message?: unknown
  privacyConsent?: unknown
  website?: unknown
  formLoadedAt?: unknown
  locale?: unknown
}

type RateEntry = { count: number; resetAt: number }

const rateStore = new Map<string, RateEntry>()

function json(data: object, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  })
}

function cleanLine(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

function cleanMessage(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength)
}

function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin")
  if (!origin) return false

  const requestOrigin = new URL(request.url).origin
  const extraOrigins = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  return origin === requestOrigin || extraOrigins.includes(origin)
}

function clientKey(request: Request) {
  return request.headers.get("x-real-ip")
    || request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown"
}

function rateLimited(key: string) {
  const now = Date.now()
  for (const [ip, entry] of rateStore) if (entry.resetAt <= now) rateStore.delete(ip)
  if (rateStore.size >= 5000 && !rateStore.has(key)) return true
  const current = rateStore.get(key)

  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  current.count += 1
  rateStore.set(key, current)
  return current.count > RATE_LIMIT
}

async function idempotencyKey(email: string, service: string, message: string) {
  const day = new Date().toISOString().slice(0, 10)
  const bytes = new TextEncoder().encode(`${email}|${service}|${message}|${day}`)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
  return `boruch-contact/${hash}`
}

async function handlePost(request: Request) {
  if (!allowedOrigin(request)) return json({ ok: false }, 403)

  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().startsWith("application/json")) return json({ ok: false }, 415)

  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return json({ ok: false }, 413)
  if (rateLimited(clientKey(request))) return json({ ok: false }, 429)

  let payload: ContactPayload
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return json({ ok: false }, 413)
    payload = JSON.parse(raw) as ContactPayload
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return json({ ok: false }, 400)
  } catch {
    return json({ ok: false }, 400)
  }

  const website = cleanLine(payload.website, 200)
  if (website) return json({ ok: true })

  const loadedAt = Number(payload.formLoadedAt)
  if (!Number.isFinite(loadedAt) || Date.now() - loadedAt < MIN_FILL_TIME_MS) return json({ ok: false }, 400)

  const name = cleanLine(payload.name, 100)
  const phone = cleanLine(payload.phone, 20)
  const email = cleanLine(payload.email, 160).toLowerCase()
  const service = cleanLine(payload.service, 100)
  const message = cleanMessage(payload.message, 1200)
  const locale = ["pl", "en", "de", "uk"].includes(String(payload.locale)) ? String(payload.locale) : "pl"

  const nameValid = /^[\p{L}][\p{L}\s'.-]{1,99}$/u.test(name)
  const phoneValid = /^\+?[0-9][0-9\s()-]{6,19}$/.test(phone)
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  const serviceValid = service.length >= 2
  const messageValid = message.length >= 5

  if (!nameValid || !phoneValid || !emailValid || !serviceValid || !messageValid || payload.privacyConsent !== true) {
    return json({ ok: false }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_NOTIFICATION_EMAIL

  if (!apiKey || !from || !to) {
    console.error("Missing Resend contact form environment variables")
    return json({ ok: false }, 503)
  }

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": await idempotencyKey(email, service, message),
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nowe zapytanie BORUCH - ${service}`,
      text: [
        "Nowe zapytanie ze strony BORUCH",
        "",
        `Imię i nazwisko: ${name}`,
        `Telefon: ${phone}`,
        `E-mail: ${email}`,
        `Usługa: ${service}`,
        `Język formularza: ${locale.toUpperCase()}`,
        "",
        "Wiadomość:",
        message,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(8000),
  })

  if (!sent.ok) {
    console.error("Resend contact form error", sent.status)
    return json({ ok: false }, 502)
  }

  return json({ ok: true })
}

export default {
  async fetch(request: Request) {
    if (!allowedOrigin(request)) return json({ ok: false }, 403)
    const corsHeaders = {
      "Access-Control-Allow-Origin": request.headers.get("origin")!,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    }
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...corsHeaders, "Access-Control-Max-Age": "600" } })
    const withCors = (response: Response) => {
      for (const [name, value] of Object.entries(corsHeaders)) response.headers.set(name, value)
      return response
    }
    if (request.method !== "POST") return withCors(json({ ok: false }, 405))

    try {
      return withCors(await handlePost(request))
    } catch (error) {
      console.error("BORUCH contact form error", error)
      return withCors(json({ ok: false }, 500))
    }
  },
}
