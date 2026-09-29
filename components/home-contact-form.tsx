"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react"

import type { Locale } from "@/lib/content"

const formCopy = {
  pl: {
    name: "Imię i nazwisko",
    phone: "Telefon",
    email: "E-mail",
    service: "Czego potrzebujesz?",
    choose: "Wybierz usługę",
    services: ["Mycie ręczne", "Czyszczenie wnętrza", "Pakiet komplet", "Pranie tapicerki", "Powłoka ceramiczna", "Folia PPF", "Inna usługa"],
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
    services: ["Hand wash", "Interior cleaning", "Complete package", "Upholstery cleaning", "Ceramic coating", "PPF film", "Other service"],
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
    services: ["Handwäsche", "Innenreinigung", "Komplettpaket", "Polsterreinigung", "Keramikversiegelung", "PPF-Schutzfolie", "Andere Leistung"],
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
    services: ["Ручне миття", "Чищення салону", "Комплексний пакет", "Чищення оббивки", "Керамічне покриття", "Плівка PPF", "Інша послуга"],
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

const fieldClass = "min-h-14 w-full border border-white/14 bg-[#0a0a0b] px-4 text-sm text-white outline-none transition placeholder:text-white/28 hover:border-white/28 focus:border-brand focus:ring-2 focus:ring-brand/15"

export function HomeContactForm({ locale }: { locale: Locale }) {
  const copy = formCopy[locale]
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [formLoadedAt] = useState(() => Date.now())

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
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

      if (!response.ok) throw new Error("Request failed")

      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`website-${locale}`}>Website</label>
        <input id={`website-${locale}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-white/62">
          {copy.name}
          <input className={fieldClass} name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required />
        </label>
        <label className="grid gap-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-white/62">
          {copy.phone}
          <input className={fieldClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" minLength={7} maxLength={20} required />
        </label>
        <label className="grid gap-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-white/62">
          {copy.email}
          <input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={160} required />
        </label>
        <label className="grid gap-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-white/62">
          {copy.service}
          <select className={fieldClass} name="service" defaultValue="" required>
            <option value="" disabled>{copy.choose}</option>
            {copy.services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-white/62">
        {copy.message}
        <textarea className={`${fieldClass} min-h-36 resize-y py-4 normal-case leading-relaxed tracking-normal`} name="message" maxLength={1200} required />
      </label>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/48">
        <input name="privacyConsent" type="checkbox" required className="mt-1 size-4 shrink-0 accent-[#d52b32]" />
        <span>{copy.consent}</span>
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending" || status === "success"} className="home-button home-button-red min-w-52 disabled:cursor-not-allowed disabled:opacity-55">
          {status === "sending" ? copy.sending : copy.submit}
          {status === "sending" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
        <p aria-live="polite" className={`flex items-center gap-2 text-sm leading-relaxed ${status === "success" ? "text-emerald-400" : status === "error" ? "text-[#ef6267]" : "text-white/42"}`}>
          {status === "success" && <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />}
          {status === "success" ? copy.success : status === "error" ? copy.error : null}
        </p>
      </div>
    </form>
  )
}
