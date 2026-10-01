const MAX_BODY_BYTES = 24_000
const MIN_FILL_TIME_MS = 2_500
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 5
const SERVICES = ["Mycie zewnętrzne", "Czyszczenie wnętrza", "Pakiet komplet", "Pranie tapicerki", "Czyszczenie i impregnacja skór", "Ręczne woskowanie", "Niewidzialna wycieraczka", "Serwis powłoki ceramicznej", "Polerowanie", "Korekta lakieru", "Powłoka ceramiczna lub kwarcowa", "Oklejanie auta, szyb i lamp folią", "Zmiana koloru / dechroming", "Pakiet Sprzedaż Standard", "Pakiet Sprzedaż Premium", "Inna usługa"]
const PAYLOAD_KEYS = new Set(["name", "phone", "email", "service", "message", "privacyConsent", "website", "formLoadedAt", "locale"])
// Accept localized labels from older cached frontends; new forms submit stable service IDs.
const LEGACY_SERVICES = [["Exterior wash","Interior cleaning","Complete package","Upholstery cleaning","Leather cleaning and protection","Hand waxing","Hydrophobic glass coating","Ceramic coating maintenance","Polishing","Paint correction","Ceramic or quartz coating","Car, window and lamp wrapping","Colour change / dechroming","Standard Sales Package","Premium Sales Package","Other service"],["Außenwäsche","Innenreinigung","Komplettpaket","Polsterreinigung","Lederreinigung und Imprägnierung","Handwachs","Hydrophobe Glasversiegelung","Keramikversiegelungs-Service","Polieren","Lackkorrektur","Keramik- oder Quarzversiegelung","Folierung von Auto, Scheiben und Leuchten","Farbwechsel / Dechroming","Verkaufspaket Standard","Verkaufspaket Premium","Andere Leistung"],["Зовнішнє миття","Чищення салону","Комплексний пакет","Чищення оббивки","Чищення та захист шкіри","Ручне воскування","Гідрофобне покриття скла","Обслуговування керамічного покриття","Полірування","Корекція лаку","Керамічне або кварцове покриття","Обклеювання авто, скла та фар плівкою","Зміна кольору / dechroming","Стандартний пакет для продажу","Преміум пакет для продажу","Інша послуга"]]

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
  if (typeof value !== "string" || value.length > maxLength || /[\u0000-\u001f\u007f]/.test(value)) return ""
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

function cleanMessage(value: unknown, maxLength: number) {
  if (typeof value !== "string" || value.length > maxLength) return ""
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength)
}

function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin")
  if (!origin) return false
  try {
    const parsed = new URL(origin)
    if (parsed.origin !== origin || !["https:", "http:"].includes(parsed.protocol)) return false
  } catch { return false }

  const requestOrigin = new URL(request.url).origin
  const extraOrigins = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  return origin === requestOrigin || extraOrigins.includes(origin)
}

function clientKey(request: Request) {
  // Only trust headers overwritten by the hosting platform, not arbitrary client input.
  if (process.env.VERCEL !== "1") return "unknown"
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim().slice(0, 64) || "unknown"
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

async function idempotencyKey(...fields: string[]) {
  const day = new Date().toISOString().slice(0, 10)
  const bytes = new TextEncoder().encode(JSON.stringify([...fields, day]))
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
  return `boruch-contact/${hash}`
}

async function readBody(request: Request) {
  const reader = request.body?.getReader()
  if (!reader) throw new Error("400")
  const chunks: Uint8Array[] = []
  let size = 0
  let timeout: ReturnType<typeof setTimeout> | undefined
  const deadline = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => { void reader.cancel().catch(() => {}); reject(new Error("408")) }, 3000)
  })
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline])
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) { void reader.cancel().catch(() => {}); throw new Error("413") }
      chunks.push(value)
    }
    const bytes = new Uint8Array(size)
    let offset = 0
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } finally { clearTimeout(timeout); reader.releaseLock() }
}

async function handlePost(request: Request) {
  if (!allowedOrigin(request)) return json({ ok: false }, 403)

  const contentType = request.headers.get("content-type") ?? ""
  if (contentType.split(";")[0].trim().toLowerCase() !== "application/json") return json({ ok: false }, 415)
  if (request.headers.has("content-encoding") && request.headers.get("content-encoding") !== "identity") return json({ ok: false }, 415)

  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return json({ ok: false }, 413)
  if (!Number.isSafeInteger(contentLength) || contentLength < 0) return json({ ok: false }, 400)
  if (rateLimited(clientKey(request))) {
    const response = json({ ok: false }, 429)
    response.headers.set("Retry-After", String(RATE_WINDOW_MS / 1000))
    return response
  }

  let payload: ContactPayload
  try {
    const raw = await readBody(request)
    payload = JSON.parse(raw) as ContactPayload
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return json({ ok: false }, 400)
    if (Object.keys(payload).some((key) => !PAYLOAD_KEYS.has(key))) return json({ ok: false }, 400)
  } catch (error) {
    const status = error instanceof Error && ["413", "408"].includes(error.message) ? Number(error.message) : 400
    return json({ ok: false }, status)
  }

  if (payload.website !== undefined && (typeof payload.website !== "string" || payload.website.length > 200)) return json({ ok: false }, 400)
  if (payload.locale !== undefined && (typeof payload.locale !== "string" || !["pl", "en", "de", "uk"].includes(payload.locale))) return json({ ok: false }, 400)
  const website = cleanLine(payload.website, 200)
  if (website) return json({ ok: true })

  const loadedAt = typeof payload.formLoadedAt === "number" ? payload.formLoadedAt : NaN
  if (!Number.isFinite(loadedAt) || Date.now() - loadedAt < MIN_FILL_TIME_MS) return json({ ok: false }, 400)

  const name = cleanLine(payload.name, 100)
  const phone = cleanLine(payload.phone, 20)
  const email = cleanLine(payload.email, 160).toLowerCase()
  const rawService = cleanLine(payload.service, 100)
  const serviceIndex = /^service-\d{1,2}$/.test(rawService) ? Number(rawService.slice(8)) : -1
  const legacyIndex = LEGACY_SERVICES.map((labels) => labels.indexOf(rawService)).find((index) => index >= 0) ?? -1
  const service = SERVICES[serviceIndex] ?? SERVICES[legacyIndex] ?? rawService
  const message = cleanMessage(payload.message, 1200)
  const locale = typeof payload.locale === "string" && ["pl", "en", "de", "uk"].includes(payload.locale) ? payload.locale : "pl"

  const nameValid = /^[\p{L}][\p{L}\s'.-]{1,99}$/u.test(name)
  const phoneValid = /^\+?[0-9][0-9\s()-]{6,19}$/.test(phone) && /^[0-9]{7,15}$/.test(phone.replace(/\D/g, ""))
  const emailValid = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(email)
  const serviceValid = SERVICES.includes(service)
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
      "Idempotency-Key": await idempotencyKey(name, phone, email, service, message, locale),
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
    if (request.method === "OPTIONS") {
      const method = request.headers.get("access-control-request-method")
      const headers = request.headers.get("access-control-request-headers") ?? ""
      if (method !== "POST" || headers.split(",").some((header) => header.trim() && header.trim().toLowerCase() !== "content-type")) return json({ ok: false }, 403)
      return new Response(null, { status: 204, headers: { ...corsHeaders, "Access-Control-Max-Age": "600", "Cache-Control": "no-store" } })
    }
    const withCors = (response: Response) => {
      for (const [name, value] of Object.entries(corsHeaders)) response.headers.set(name, value)
      return response
    }
    if (request.method !== "POST") {
      const response = json({ ok: false }, 405)
      response.headers.set("Allow", "POST, OPTIONS")
      return withCors(response)
    }

    try {
      return withCors(await handlePost(request))
    } catch {
      console.error("BORUCH contact form failed")
      return withCors(json({ ok: false }, 500))
    }
  },
}
