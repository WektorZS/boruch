"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, ChevronDown, LoaderCircle } from "lucide-react"

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

const fieldClass = "min-h-12 w-full min-w-0 border border-white/20 bg-[#0a0a0b] px-4 text-base font-normal normal-case leading-relaxed tracking-normal text-white outline-none transition-colors placeholder:text-white/65 hover:border-white/35 focus:border-brand focus:ring-2 focus:ring-brand/25"
const labelClass = "grid gap-2.5 text-sm font-medium normal-case leading-relaxed tracking-normal text-white/75"

export function HomeContactForm({ locale }: { locale: Locale }) {
  const copy = formCopy[locale]
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [formLoadedAt] = useState(() => Date.now())
  const [serviceOpen, setServiceOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending" || status === "success") return
    const form = event.currentTarget
const formData = new FormData(form)

if (!selectedService) {
  setServiceOpen(true)
  return
}

setStatus("sending")

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact", {
        signal: AbortSignal.timeout(20000),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          service: formData.get("service"),
          message: formData.get("message"),
          privacyConsent: formData.get("privacyConsent") === "on",
          website: formData.get("website"),
          formLoadedAt,
          locale,
        }),
      })

      if (!response.ok || (await response.json()).ok !== true) throw new Error("Request failed")

      setStatus("success")
form.reset()
setSelectedService("")
setServiceOpen(false)
    } catch {
      setStatus("error")
    }
  }

  return (
    <form method="post" action={process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact"} onSubmit={handleSubmit} aria-busy={status === "sending"} className="relative grid gap-5">
      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`website-${locale}`}>Website</label>
        <input id={`website-${locale}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          {copy.name}
          <input className={fieldClass} name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required />
        </label>
        <label className={labelClass}>
          {copy.phone}
          <input className={fieldClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" minLength={7} maxLength={20} required />
        </label>
        <label className={labelClass}>
          {copy.email}
          <input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={160} required />
        </label>
        <div className={labelClass}>
  <span>{copy.service}</span>

  <div className="relative">
    <input
      type="hidden"
      name="service"
      value={selectedService}
    />

    <button
      type="button"
      onClick={() => setServiceOpen((current) => !current)}
      aria-haspopup="listbox"
      aria-expanded={serviceOpen}
      className={`${fieldClass} flex items-center justify-between gap-4 text-left`}
    >
      <span
        className={
          selectedService
            ? "min-w-0 flex-1 truncate text-white"
            : "min-w-0 flex-1 truncate text-white/65"
        }
      >
        {selectedService || copy.choose}
      </span>

      <ChevronDown
        className={`size-4 shrink-0 text-brand transition-transform duration-200 ${
          serviceOpen ? "rotate-180" : ""
        }`}
        aria-hidden="true"
      />
    </button>

    {serviceOpen && (
      <div
        role="listbox"
        className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[50svh] overflow-y-auto overscroll-contain border border-white/15 bg-[#0a0a0b] shadow-2xl"
      >
        {copy.services.map((service) => (
          <button
            key={service}
            type="button"
            role="option"
            aria-selected={selectedService === service}
            onClick={() => {
              setSelectedService(service)
              setServiceOpen(false)
            }}
            className="flex min-h-11 w-full items-center border-b border-white/8 px-4 py-2.5 text-left text-sm leading-snug text-white/75 transition-colors last:border-b-0 hover:bg-white/[.06] hover:text-white sm:min-h-12 sm:py-3 sm:text-base"
          >
            {service}
          </button>
        ))}
      </div>
    )}
  </div>
</div>
      </div>

      <label className={labelClass}>
        {copy.message}
        <textarea className={`${fieldClass} min-h-36 resize-y py-4 normal-case leading-relaxed tracking-normal`} name="message" minLength={5} maxLength={1200} required />
      </label>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/65">
        <input name="privacyConsent" type="checkbox" required className="mt-1 size-5 shrink-0 accent-[#d52b32]" />
        <span>{copy.consent}</span>
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending" || status === "success"} className="home-button home-button-red min-w-52 disabled:cursor-not-allowed disabled:opacity-55">
          {status === "sending" ? copy.sending : copy.submit}
          {status === "sending" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
        <p role="status" aria-live="polite" className={`flex items-center gap-2 text-sm leading-relaxed ${status === "success" ? "text-emerald-400" : status === "error" ? "text-[#ef6267]" : "text-white/65"}`}>
          {status === "success" && <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />}
          {status === "success" ? copy.success : status === "error" ? copy.error : null}
        </p>
      </div>
    </form>
  )
}
