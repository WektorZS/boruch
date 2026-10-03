"use client"

import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, ChevronDown, LoaderCircle, Phone } from "lucide-react"
import type { Locale } from "@/lib/content"

const formCopy = {
  pl: {
    name: "Imię i nazwisko",
    phone: "Telefon",
    email: "E-mail",
    service: "Czego potrzebujesz?",
    choose: "Wybierz usługę",
    services: ["Mycie zewnętrzne", "Czyszczenie wnętrza", "Pakiet komplet", "Pranie tapicerki", "Czyszczenie i impregnacja skór", "Ręczne woskowanie", "Niewidzialna wycieraczka", "Serwis powłoki ceramicznej", "Polerowanie", "Korekta lakieru", "Powłoka ceramiczna lub kwarcowa", "Oklejanie auta, szyb i lamp folią", "Zmiana koloru / dechroming", "Pakiet Sprzedaż Standard", "Pakiet Sprzedaż Premium", "Inna usługa"],
    message: "Napisz krótko, czego potrzebuje Twoje auto",
    consent: "Zgadzam się na wykorzystanie podanych danych wyłącznie w celu odpowiedzi na moje zapytanie.",
    submit: "Wyślij zapytanie",
    sending: "Wysyłanie...",
    success: "Dziękujemy. Wiadomość została wysłana. Skontaktujemy się z Tobą możliwie szybko.",
    error: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń do nas.",
  },
  en: {
    name: "Full name",
    phone: "Phone",
    email: "E-mail",
    service: "What does your car need?",
    choose: "Choose a service",
    services: ["Exterior wash", "Interior cleaning", "Complete package", "Upholstery cleaning", "Leather cleaning and protection", "Hand waxing", "Hydrophobic glass coating", "Ceramic coating maintenance", "Polishing", "Paint correction", "Ceramic or quartz coating", "Car, window and lamp wrapping", "Colour change / dechroming", "Standard Sales Package", "Premium Sales Package", "Other service"],
    message: "Tell us briefly what your car needs",
    consent: "I agree to the use of my details solely to reply to this enquiry.",
    submit: "Send enquiry",
    sending: "Sending...",
    success: "Thank you. Your message has been sent. We will contact you as soon as possible.",
    error: "The message could not be sent. Please try again or call us.",
  },
  de: {
    name: "Vor- und Nachname",
    phone: "Telefon",
    email: "E-Mail",
    service: "Was benötigt Ihr Fahrzeug?",
    choose: "Leistung wählen",
    services: ["Außenwäsche", "Innenreinigung", "Komplettpaket", "Polsterreinigung", "Lederreinigung und Imprägnierung", "Handwachs", "Hydrophobe Glasversiegelung", "Keramikversiegelungs-Service", "Polieren", "Lackkorrektur", "Keramik- oder Quarzversiegelung", "Folierung von Auto, Scheiben und Leuchten", "Farbwechsel / Dechroming", "Verkaufspaket Standard", "Verkaufspaket Premium", "Andere Leistung"],
    message: "Beschreiben Sie kurz, was Ihr Fahrzeug benötigt",
    consent: "Ich stimme der Verwendung meiner Angaben ausschließlich zur Beantwortung dieser Anfrage zu.",
    submit: "Anfrage senden",
    sending: "Wird gesendet...",
    success: "Vielen Dank. Ihre Nachricht wurde gesendet. Wir melden uns so schnell wie möglich.",
    error: "Die Nachricht konnte nicht gesendet werden. Versuchen Sie es erneut oder rufen Sie uns an.",
  },
  uk: {
    name: "Ім'я та прізвище",
    phone: "Телефон",
    email: "E-mail",
    service: "Що потрібно вашому авто?",
    choose: "Оберіть послугу",
    services: ["Зовнішнє миття", "Чищення салону", "Комплексний пакет", "Чищення оббивки", "Чищення та захист шкіри", "Ручне воскування", "Гідрофобне покриття скла", "Обслуговування керамічного покриття", "Полірування", "Корекція лаку", "Керамічне або кварцове покриття", "Обклеювання авто, скла та фар плівкою", "Зміна кольору / dechroming", "Стандартний пакет для продажу", "Преміум пакет для продажу", "Інша послуга"],
    message: "Коротко опишіть, що потрібно вашому авто",
    consent: "Я погоджуюся на використання вказаних даних виключно для відповіді на мій запит.",
    submit: "Надіслати запит",
    sending: "Надсилання...",
    success: "Дякуємо. Повідомлення надіслано. Ми зв'яжемося з вами якнайшвидше.",
    error: "Не вдалося надіслати повідомлення. Спробуйте ще раз або зателефонуйте нам.",
  },
} satisfies Record<Locale, {
  name: string
  phone: string
  email: string
  service: string
  choose: string
  services: string[]
  message: string
  consent: string
  submit: string
  sending: string
  success: string
  error: string
}>

type Field = "name" | "phone" | "email" | "service" | "message" | "privacyConsent"
type Errors = Partial<Record<Field, string>>
const fieldOrder: readonly Field[] = ["name", "phone", "email", "service", "message", "privacyConsent"]
const extraCopy = {
  pl: {
    label: "Formularz kontaktowy", required: "Wszystkie pola są wymagane.", invalid: "Sprawdź zaznaczone pola.",
    name: "Wpisz imię i nazwisko, używając liter, bez cyfr.",
    phone: "Podaj numer telefonu zawierający od 7 do 15 cyfr.", email: "Podaj poprawny adres e-mail.",
    service: "Wybierz usługę.", message: "Wpisz od 5 do 1200 znaków, nie licząc spacji na początku i końcu.",
    privacyConsent: "Zaznacz zgodę, abyśmy mogli odpowiedzieć.",
    serviceHint: "Nie wiesz, co wybrać? Zaznacz „Inna usługa” i opisz samochód.",
    messageHint: "Podaj model auta, jego stan i to, na czym Ci zależy.",
    rate: "Zbyt wiele prób wysyłki. Spróbuj za kilka minut lub zadzwoń do nas.",
    unavailable: "Formularz jest chwilowo niedostępny. Spróbuj później lub zadzwoń do nas.",
    uncertain: "Nie udało się potwierdzić wysyłki. Wpisane dane zostały zachowane. Spróbuj później lub zadzwoń do nas.",
    success: "Wiadomość wysłana.", another: "Wyślij kolejne zapytanie", call: "Zadzwoń do nas",
    wash: "Myjnia", detailing: "Detailing", sale: "Przygotowanie do sprzedaży", other: "Pozostałe",
    noScript: "Do wysłania formularza potrzebny jest JavaScript. Możesz też skontaktować się z nami telefonicznie lub e-mailem.",
  },
  en: {
    label: "Contact form", required: "All fields are required.", invalid: "Check the highlighted fields.",
    name: "Enter your full name using letters, without numbers.",
    phone: "Enter a phone number containing 7 to 15 digits.", email: "Enter a valid e-mail address.",
    service: "Choose a service.", message: "Enter 5 to 1200 characters, excluding leading and trailing spaces.",
    privacyConsent: "Select the consent checkbox so we can reply.",
    serviceHint: "Not sure what to choose? Select “Other service” and describe your car.",
    messageHint: "Include your car model, its condition and what you would like us to do.",
    rate: "Too many attempts. Please try again in a few minutes or call us.",
    unavailable: "The form is temporarily unavailable. Please try later or call us.",
    uncertain: "We could not confirm delivery. Your details have been kept. Please try later or call us.",
    success: "Message sent.", another: "Send another enquiry", call: "Call us",
    wash: "Car wash", detailing: "Detailing", sale: "Preparation for sale", other: "Other",
    noScript: "JavaScript is required to send this form. You can also contact us by phone or e-mail.",
  },
  de: {
    label: "Kontaktformular", required: "Alle Felder sind erforderlich.", invalid: "Prüfen Sie die markierten Felder.",
    name: "Geben Sie Ihren Namen mit Buchstaben und ohne Ziffern ein.",
    phone: "Geben Sie eine Telefonnummer mit 7 bis 15 Ziffern ein.", email: "Geben Sie eine gültige E-Mail-Adresse ein.",
    service: "Wählen Sie eine Leistung.", message: "Geben Sie 5 bis 1200 Zeichen ein, ohne Leerzeichen am Anfang und Ende.",
    privacyConsent: "Bestätigen Sie die Einwilligung, damit wir antworten können.",
    serviceHint: "Unsicher? Wählen Sie „Andere Leistung“ und beschreiben Sie Ihr Fahrzeug.",
    messageHint: "Nennen Sie das Fahrzeugmodell, den Zustand und Ihre Wünsche.",
    rate: "Zu viele Versuche. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns an.",
    unavailable: "Das Formular ist vorübergehend nicht verfügbar. Bitte versuchen Sie es später oder rufen Sie uns an.",
    uncertain: "Der Versand konnte nicht bestätigt werden. Ihre Angaben bleiben erhalten. Bitte versuchen Sie es später oder rufen Sie uns an.",
    success: "Nachricht gesendet.", another: "Weitere Anfrage senden", call: "Rufen Sie uns an",
    wash: "Autowäsche", detailing: "Detailing", sale: "Verkaufsvorbereitung", other: "Weitere",
    noScript: "Zum Senden ist JavaScript erforderlich. Sie können uns auch telefonisch oder per E-Mail kontaktieren.",
  },
  uk: {
    label: "Контактна форма", required: "Усі поля обов'язкові.", invalid: "Перевірте позначені поля.",
    name: "Вкажіть ім'я та прізвище літерами, без цифр.",
    phone: "Вкажіть номер телефону, що містить від 7 до 15 цифр.", email: "Вкажіть правильну адресу електронної пошти.",
    service: "Оберіть послугу.", message: "Введіть від 5 до 1200 символів, без пробілів на початку та в кінці.",
    privacyConsent: "Надайте згоду, щоб ми могли відповісти.",
    serviceHint: "Не знаєте, що обрати? Виберіть «Інша послуга» та опишіть авто.",
    messageHint: "Вкажіть модель авто, його стан та ваші побажання.",
    rate: "Забагато спроб. Спробуйте за кілька хвилин або зателефонуйте нам.",
    unavailable: "Форма тимчасово недоступна. Спробуйте пізніше або зателефонуйте нам.",
    uncertain: "Не вдалося підтвердити надсилання. Введені дані збережено. Спробуйте пізніше або зателефонуйте нам.",
    success: "Повідомлення надіслано.", another: "Надіслати ще один запит", call: "Зателефонуйте нам",
    wash: "Мийка", detailing: "Детейлінг", sale: "Підготовка до продажу", other: "Інше",
    noScript: "Для надсилання потрібен JavaScript. Ви також можете зв'язатися з нами телефоном або електронною поштою.",
  },
} satisfies Record<Locale, Record<string, string>>

const serviceGroups = [
  { label: "wash", indices: [0, 1, 2, 3, 4] },
  { label: "detailing", indices: [5, 6, 7, 8, 9, 10, 11, 12] },
  { label: "sale", indices: [13, 14] },
  { label: "other", indices: [15] },
] as const

function cleanLine(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : ""
}

// Keep client validation aligned with the supplied API.
function validate(data: { name: string; phone: string; email: string; service: string; message: string; privacyConsent: boolean }, copy: (typeof extraCopy)[Locale]) {
  const errors: Errors = {}
  if (data.name.length > 100 || !/^[\p{L}][\p{L}\s'.-]{1,99}$/u.test(data.name)) errors.name = copy.name
  if (data.phone.length > 20 || !/^\+?[0-9][0-9\s()-]{6,19}$/.test(data.phone) || !/^[0-9]{7,15}$/.test(data.phone.replace(/\D/g, ""))) errors.phone = copy.phone
  if (data.email.length > 160 || !/^[a-z0-9.!#$%&'*+/=?^_\x60{|}~-]{1,64}@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(data.email)) errors.email = copy.email
  if (!/^service-(?:[0-9]|1[0-5])$/.test(data.service)) errors.service = copy.service
  if (data.message.trim().length < 5 || data.message.length > 1200) errors.message = copy.message
  if (!data.privacyConsent) errors.privacyConsent = copy.privacyConsent
  return errors
}

function waitForFillTime(loadedAt: number, signal: AbortSignal) {
  const remaining = Math.max(0, 2500 - (Date.now() - loadedAt) + 100)
  if (signal.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"))
  if (!remaining) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const abort = () => {
      window.clearTimeout(timer)
      signal.removeEventListener("abort", abort)
      reject(new DOMException("Aborted", "AbortError"))
    }
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", abort)
      resolve()
    }, remaining)
    signal.addEventListener("abort", abort, { once: true })
  })
}

export function HomeContactForm({ locale, phoneHref, phoneText }: {
  locale: Locale
  /** Optional fallback. Existing locale-only calls remain compatible. */
  phoneHref?: string
  phoneText?: string
}) {
  const copy = formCopy[locale]
  const extra = extraCopy[locale]
  const prefix = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const loadedAt = useRef(0)
  const locked = useRef(false)
  const mounted = useRef(true)
  const requestRef = useRef<AbortController | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Errors>({})
  const [feedback, setFeedback] = useState("")
  const [service, setService] = useState("")
  const [messageLength, setMessageLength] = useState(0)
  const busy = status === "sending"
  const id = (field: Field) => prefix + "-" + field
  const errorId = (field: Field) => id(field) + "-error"
  const selectedLabel = service ? copy.services[Number(service.slice(8))] : ""

  useEffect(() => {
    mounted.current = true
    loadedAt.current = Date.now()
    return () => { mounted.current = false; requestRef.current?.abort() }
  }, [])
  useEffect(() => { if (status === "success") successRef.current?.focus() }, [status])

  function clearError(field: Field) {
    setErrors(current => current[field] ? { ...current, [field]: undefined } : current)
    if (status === "error") { setStatus("idle"); setFeedback("") }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (locked.current || status === "success") return
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      name: cleanLine(formData.get("name")).replace(/[’‘]/g, "'"),
      phone: cleanLine(formData.get("phone")),
      email: cleanLine(formData.get("email")).toLowerCase(),
      service: cleanLine(formData.get("service")),
      message: String(formData.get("message") ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim(),
      privacyConsent: formData.get("privacyConsent") === "on",
    }
    const nextErrors = validate(data, extra)
    setErrors(nextErrors)
    setFeedback("")
    const firstInvalid = fieldOrder.find(field => nextErrors[field])
    if (firstInvalid) {
      setStatus("error")
      setFeedback(extra.invalid)
      form.querySelector<HTMLElement>('[name="' + firstInvalid + '"]')?.focus()
      return
    }

    locked.current = true
    setStatus("sending")
    const controller = new AbortController()
    requestRef.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 24_000)
    try {
      // Avoid rejecting a legitimate fast autofill at the API's 2.5 second threshold.
      if (!loadedAt.current) loadedAt.current = Date.now()
      await waitForFillTime(loadedAt.current, controller.signal)
      const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact", {
        method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ ...data, website: String(formData.get("website") ?? ""), formLoadedAt: loadedAt.current, locale }),
      })
      const result: unknown = await response.json().catch(() => null)
      const confirmed = result !== null && typeof result === "object" && "ok" in result && result.ok === true
      if (!response.ok || !confirmed) {
        if (!mounted.current) return
        setStatus("error")
        setFeedback(response.status === 429 ? extra.rate : response.status === 503 ? extra.unavailable : copy.error)
        return
      }
      if (!mounted.current) return
      form.reset()
      setService("")
      setMessageLength(0)
      setStatus("success")
    } catch {
      if (!mounted.current) return
      setStatus("error")
      setFeedback(extra.uncertain)
    } finally {
      window.clearTimeout(timeout)
      if (requestRef.current === controller) requestRef.current = null
      locked.current = false
    }
  }

  function startAgain() {
    loadedAt.current = Date.now()
    setService(""); setMessageLength(0); setErrors({}); setFeedback(""); setStatus("idle")
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus())
  }

  const fieldError = (field: Field) => errors[field] ? <span id={errorId(field)} className="bcf-field-error">{errors[field]}</span> : null

  return (
    <div className="boruch-contact-form" lang={locale}>
      <style>{formStyles}</style>
      <form ref={formRef} method="post" action={process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact"} onSubmit={handleSubmit} noValidate aria-label={extra.label} aria-busy={busy}>
        {status === "success" ? (
          <div ref={successRef} className="bcf-success" tabIndex={-1}>
            <CheckCircle2 size={32} strokeWidth={1.5} className="bcf-success-icon" aria-hidden="true" />
            <p className="bcf-success-title">{extra.success}</p>
            <p>{copy.success}</p>
            <button type="button" className="bcf-text-button" onClick={startAgain}>{extra.another}<ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        ) : (
          <>
            <p className="bcf-required-note">{extra.required}</p>
            <div className="bcf-honeypot" aria-hidden="true">
              <label htmlFor={prefix + "-website"}>Website</label>
              <input id={prefix + "-website"} name="website" type="text" maxLength={200} tabIndex={-1} autoComplete="off" />
            </div>
            <fieldset className="bcf-fields" disabled={busy}>
              <div className="bcf-field">
                <label htmlFor={id("name")}>{copy.name}</label>
                <input id={id("name")} name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required aria-invalid={!!errors.name} aria-describedby={errors.name ? errorId("name") : undefined} onChange={() => clearError("name")} />
                {fieldError("name")}
              </div>
              <div className="bcf-field">
                <label htmlFor={id("phone")}>{copy.phone}</label>
                <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" minLength={7} maxLength={20} required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? errorId("phone") : undefined} onChange={() => clearError("phone")} />
                {fieldError("phone")}
              </div>
              <div className="bcf-field bcf-full">
                <label htmlFor={id("email")}>{copy.email}</label>
                <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" maxLength={160} required aria-invalid={!!errors.email} aria-describedby={errors.email ? errorId("email") : undefined} onChange={() => clearError("email")} />
                {fieldError("email")}
              </div>
              <div className="bcf-field bcf-full">
                <label htmlFor={id("service")}>{copy.service}</label>
                <div className="bcf-select">
                  <select id={id("service")} name="service" value={service} required aria-invalid={!!errors.service} aria-describedby={prefix + "-service-hint" + (errors.service ? " " + errorId("service") : "")} onChange={event => { setService(event.currentTarget.value); clearError("service") }}>
                    <option value="" disabled>{copy.choose}</option>
                    {serviceGroups.map(group => <optgroup key={group.label} label={extra[group.label]}>
                      {group.indices.map(index => <option key={index} value={"service-" + index}>{copy.services[index]}</option>)}
                    </optgroup>)}
                  </select>
                  <ChevronDown size={18} className="bcf-select-arrow" aria-hidden="true" />
                </div>
                <p id={prefix + "-service-hint"} className="bcf-hint">{selectedLabel && selectedLabel.length > 35 ? selectedLabel : extra.serviceHint}</p>
                {fieldError("service")}
              </div>
              <div className="bcf-field bcf-full">
                <label htmlFor={id("message")}>{copy.message}</label>
                <textarea id={id("message")} name="message" rows={5} minLength={5} maxLength={1200} required aria-invalid={!!errors.message} aria-describedby={prefix + "-message-hint" + (errors.message ? " " + errorId("message") : "")} onChange={event => { setMessageLength(event.currentTarget.value.length); clearError("message") }} />
                <div className="bcf-message-help">
                  <p id={prefix + "-message-hint"} className="bcf-hint">{extra.messageHint}</p>
                  <span className="bcf-count" aria-hidden="true">{messageLength} / 1200</span>
                </div>
                {fieldError("message")}
              </div>
              <div className="bcf-consent bcf-full">
                <label htmlFor={id("privacyConsent")}>
                  <input id={id("privacyConsent")} name="privacyConsent" type="checkbox" required aria-invalid={!!errors.privacyConsent} aria-describedby={errors.privacyConsent ? errorId("privacyConsent") : undefined} onChange={() => clearError("privacyConsent")} />
                  <span>{copy.consent}</span>
                </label>
                {fieldError("privacyConsent")}
              </div>
            </fieldset>
            <div className="bcf-submit-row">
              <button type="submit" className="bcf-submit" disabled={busy}>
                <span>{busy ? copy.sending : copy.submit}</span>
                {busy ? <LoaderCircle size={18} className="bcf-spinner" aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
              </button>
            </div>
          </>
        )}
      </form>
      <div className="bcf-feedback" role="status" aria-live="polite" aria-atomic="true">
        {status === "error" && <p className="bcf-error-message">{feedback}</p>}
        {status === "success" && <span className="bcf-sr-only">{copy.success}</span>}
      </div>
      {status === "error" && phoneHref && <a href={phoneHref} className="bcf-call-link"><Phone size={16} aria-hidden="true" />{extra.call}{phoneText ? ": " + phoneText : ""}</a>}
      <noscript><style>{".boruch-contact-form form{display:none}"}</style><p className="bcf-hint">{extra.noScript}</p></noscript>
    </div>
  )
}

const formStyles = `
.boruch-contact-form {
  --bcf-ink: #f5f2ed;
  --bcf-muted: #b7b5b3;
  --bcf-line: rgba(245, 242, 237, .2);
  --bcf-field-line: rgba(245, 242, 237, .4);
  color: var(--bcf-ink);
  width: 100%;
  min-width: 0;
  font-size: 1rem;
}
.boruch-contact-form *, .boruch-contact-form *::before, .boruch-contact-form *::after { box-sizing: border-box; }
.boruch-contact-form :is(p, fieldset) { margin: 0; }
.boruch-contact-form :is(button, input, textarea, select) { font-family: inherit; font-style: normal; font-weight: 400; letter-spacing: normal; text-transform: none; }
.boruch-contact-form :is(button, a):focus-visible { outline: 2px solid var(--bcf-ink); outline-offset: 4px; }
.boruch-contact-form .bcf-required-note { margin-bottom: 1.4rem; color: var(--bcf-muted); font-size: .76rem; line-height: 1.65; }
.boruch-contact-form .bcf-fields { padding: 0; border: 0; min-width: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem 1.2rem; }
.boruch-contact-form .bcf-full { grid-column: 1 / -1; }
.boruch-contact-form .bcf-field { display: grid; align-content: start; gap: .5rem; min-width: 0; }
.boruch-contact-form .bcf-field > label { font-size: .85rem; line-height: 1.65; font-weight: 500; color: var(--bcf-ink); }
.boruch-contact-form .bcf-field :is(input, select, textarea) {
  display: block; width: 100%; max-width: 100%; min-width: 0; min-height: 50px; margin: 0;
  border: 1px solid var(--bcf-field-line); border-radius: 0; background: #09090b; color: var(--bcf-ink);
  padding: .75rem .9rem; font-size: 1rem; line-height: 1.5; outline: none; scroll-margin-block: 120px;
  transition: border-color 160ms ease, background-color 160ms ease;
}
.boruch-contact-form .bcf-field :is(input, select, textarea):focus { border-color: var(--bcf-ink); outline: 1px solid var(--bcf-ink); outline-offset: 2px; }
.boruch-contact-form .bcf-field [aria-invalid="true"] { border-color: #ef6267; }
.boruch-contact-form .bcf-field :is(input, select, textarea):disabled { opacity: .65; cursor: wait; }
.boruch-contact-form .bcf-field textarea { resize: vertical; min-height: 154px; }
.boruch-contact-form .bcf-select { position: relative; min-width: 0; }
.boruch-contact-form .bcf-select select { appearance: none; color-scheme: dark; padding-right: 2.6rem; cursor: pointer; }
.boruch-contact-form .bcf-select select:has(option[value=""]:checked) { color: var(--bcf-muted); }
.boruch-contact-form .bcf-select :is(option, optgroup) { background: #111113; color: var(--bcf-ink); }
.boruch-contact-form .bcf-select-arrow { position: absolute; right: .85rem; top: 50%; transform: translateY(-50%); color: var(--bcf-muted); pointer-events: none; }
.boruch-contact-form .bcf-hint { color: var(--bcf-muted); font-size: .76rem; line-height: 1.7; overflow-wrap: anywhere; }
.boruch-contact-form .bcf-message-help { display: flex; align-items: start; justify-content: space-between; flex-wrap: wrap; gap: .4rem 1rem; }
.boruch-contact-form .bcf-count { color: var(--bcf-muted); font-size: .7rem; line-height: 1.8; white-space: nowrap; font-variant-numeric: tabular-nums; }
.boruch-contact-form .bcf-field-error { display: block; color: #ef858a; font-size: .8rem; line-height: 1.6; overflow-wrap: anywhere; }
.boruch-contact-form .bcf-consent label { display: flex; gap: .8rem; align-items: flex-start; min-height: 44px; cursor: pointer; color: var(--bcf-muted); font-size: .8rem; line-height: 1.8; }
.boruch-contact-form .bcf-consent input { flex: 0 0 20px; width: 20px; height: 20px; margin: .24rem 0 0; accent-color: #c42730; }
.boruch-contact-form .bcf-consent input:focus-visible { outline: 2px solid var(--bcf-ink); outline-offset: 3px; }
.boruch-contact-form .bcf-consent .bcf-field-error { margin-top: .5rem; }
.boruch-contact-form .bcf-submit-row { margin-top: 1.5rem; }
.boruch-contact-form .bcf-submit {
  display: inline-flex; align-items: center; justify-content: space-between; gap: 1.6rem;
  min-height: 52px; min-width: 220px; max-width: 100%; border: 1px solid transparent; border-radius: 0;
  padding: .85rem 1.25rem; background: #c42730; color: #fff; font-size: .86rem; font-weight: 600; line-height: 1.6; cursor: pointer; transition: background-color 160ms ease;
}
.boruch-contact-form .bcf-submit svg { flex-shrink: 0; }
.boruch-contact-form .bcf-submit:disabled { opacity: .65; cursor: wait; }
.boruch-contact-form .bcf-feedback:not(:empty) { margin-top: 1rem; }
.boruch-contact-form .bcf-error-message { color: #ef858a; font-size: .85rem; line-height: 1.8; }
.boruch-contact-form :is(.bcf-call-link, .bcf-text-button) {
  display: inline-flex; align-items: center; gap: .75rem; min-height: 44px; max-width: 100%;
  margin-top: .5rem; padding: .5rem 0; border: 0; border-bottom: 1px solid var(--bcf-line); background: transparent; color: var(--bcf-ink);
  font-size: .84rem; font-weight: 500; line-height: 1.6; text-decoration: none; cursor: pointer;
}
.boruch-contact-form .bcf-call-link { flex-wrap: wrap; }
.boruch-contact-form .bcf-call-link svg { flex-shrink: 0; }
.boruch-contact-form .bcf-success { padding-block: 1.25rem 2rem; outline: none; }
.boruch-contact-form .bcf-success-icon { color: #83bba5; margin-bottom: 1.2rem; }
.boruch-contact-form .bcf-success .bcf-success-title { font-size: 1.6rem; font-weight: 500; line-height: 1.35; color: var(--bcf-ink); }
.boruch-contact-form .bcf-success > p:not(.bcf-success-title) { max-width: 48ch; margin-top: 1rem; font-size: .96rem; line-height: 1.8; color: var(--bcf-muted); }
.boruch-contact-form .bcf-success .bcf-text-button { margin-top: 1.4rem; }
.boruch-contact-form :is(.bcf-honeypot, .bcf-sr-only) { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
.boruch-contact-form .bcf-spinner { animation: bcf-spin 900ms linear infinite; }
@keyframes bcf-spin { to { transform: rotate(360deg); } }
@media (hover: hover) {
  .boruch-contact-form .bcf-field :is(input, select, textarea):not(:disabled):not(:focus):not([aria-invalid="true"]):hover { border-color: rgba(245, 242, 237, .6); }
  .boruch-contact-form .bcf-submit:not(:disabled):hover { background: #aa2028; }
  .boruch-contact-form :is(.bcf-call-link, .bcf-text-button):hover { color: #ef858a; }
}
@media (max-width: 599px) {
  .boruch-contact-form .bcf-fields { grid-template-columns: 1fr; gap: 1.15rem; }
  .boruch-contact-form .bcf-submit { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .boruch-contact-form :is(input, select, textarea, button) { transition: none; }
  .boruch-contact-form .bcf-spinner { animation: none; }
}
`

