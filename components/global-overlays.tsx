"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { Analytics } from "@vercel/analytics/next"
import { Check, Cookie, Mail, MessageCircle, Phone, ShieldCheck, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { contact, localeLabels, localeOrder, routes, type Locale, type PageKey } from "@/lib/content"
import { useModalFocus } from "./use-modal-focus"

const COOKIE_NAME = "boruch_analytics_consent"
const COOKIE_MAX_AGE = 31536000

type Consent = "accepted" | "rejected" | null

const copy: Record<Locale, {
  contactButton: string
  contactTitle: string
  contactDescription: string
  form: string
  email: string
  call: string
  whatsapp: string
  closeContact: string
  cookieWelcome: string
  cookieTitle: string
  cookiePrompt: string
  cookieOptionalInfo: string
  languageLabel: string
  necessary: string
  necessaryDescription: string
  analytics: string
  analyticsDescription: string
  required: string
  optional: string
  changeAnytime: string
  settingsTitle: string
  settingsDescription: string
  selected: string
  save: string
  close: string
}> = {
  pl: {
    contactButton: "Skontaktuj się",
    contactTitle: "Jak chcesz się skontaktować?",
    contactDescription: "Wybierz najwygodniejszy sposób kontaktu z Boruch Myjnia.",
    form: "Przejdź do formularza",
    email: "Napisz e-mail",
    call: "Zadzwoń",
    whatsapp: "Napisz na WhatsApp",
    closeContact: "Zamknij kontakt",
    cookieWelcome: "Witaj w Boruch Myjnia",
    cookieTitle: "Ustawienia prywatności i cookies",
    cookiePrompt: "Wybierz, czy zgadzasz się na opcjonalną analitykę.",
    cookieOptionalInfo: "Strona działa normalnie również bez cookies analitycznych.",
    languageLabel: "Wybierz język",
    necessary: "Tylko niezbędne",
    necessaryDescription: "Wymagane do prawidłowego działania strony i zapamiętania wyboru.",
    analytics: "Niezbędne i analityczne",
    analyticsDescription: "Pomagają nam zrozumieć, jak odwiedzający korzystają ze strony.",
    required: "Niezbędne",
    optional: "Opcjonalne",
    changeAnytime: "Wybór możesz zmienić w każdej chwili ikoną ciasteczka w lewym dolnym rogu.",
    settingsTitle: "Ustawienia cookies",
    settingsDescription: "Zmień zgodę na opcjonalną analitykę.",
    selected: "Wybrane",
    save: "Zapisz wybór",
    close: "Zamknij",
  },
  en: {
    contactButton: "Contact us",
    contactTitle: "How would you like to contact us?",
    contactDescription: "Choose the easiest way to contact Boruch Myjnia.",
    form: "Open the contact form",
    email: "Send an e-mail",
    call: "Call us",
    whatsapp: "Message us on WhatsApp",
    closeContact: "Close contact options",
    cookieWelcome: "Welcome to Boruch Myjnia",
    cookieTitle: "Privacy and cookie settings",
    cookiePrompt: "Choose whether you consent to optional analytics.",
    cookieOptionalInfo: "The website works normally without analytics cookies.",
    languageLabel: "Choose language",
    necessary: "Essential only",
    necessaryDescription: "Required for the website to work and remember your choice.",
    analytics: "Essential and analytics",
    analyticsDescription: "Help us understand how visitors use the website.",
    required: "Essential",
    optional: "Optional",
    changeAnytime: "You can change your choice at any time using the cookie icon in the bottom-left corner.",
    settingsTitle: "Cookie settings",
    settingsDescription: "Change your optional analytics consent.",
    selected: "Selected",
    save: "Save choice",
    close: "Close",
  },
  de: {
    contactButton: "Kontakt",
    contactTitle: "Wie möchten Sie uns kontaktieren?",
    contactDescription: "Wählen Sie den bequemsten Kontaktweg zu Boruch Myjnia.",
    form: "Kontaktformular öffnen",
    email: "E-Mail schreiben",
    call: "Anrufen",
    whatsapp: "Über WhatsApp schreiben",
    closeContact: "Kontaktoptionen schließen",
    cookieWelcome: "Willkommen bei Boruch Myjnia",
    cookieTitle: "Datenschutz und Cookies",
    cookiePrompt: "Wählen Sie, ob Sie optionaler Analyse zustimmen.",
    cookieOptionalInfo: "Die Website funktioniert auch ohne Analyse-Cookies.",
    languageLabel: "Sprache wählen",
    necessary: "Nur notwendige",
    necessaryDescription: "Erforderlich für die Funktion der Website und zum Speichern Ihrer Auswahl.",
    analytics: "Notwendige und Analyse",
    analyticsDescription: "Helfen uns zu verstehen, wie Besucher die Website nutzen.",
    required: "Notwendig",
    optional: "Optional",
    changeAnytime: "Sie können Ihre Auswahl jederzeit über das Cookie-Symbol unten links ändern.",
    settingsTitle: "Cookie-Einstellungen",
    settingsDescription: "Ändern Sie Ihre Zustimmung zur optionalen Analyse.",
    selected: "Ausgewählt",
    save: "Auswahl speichern",
    close: "Schließen",
  },
  uk: {
    contactButton: "Зв'язатися",
    contactTitle: "Як ви хочете зв'язатися з нами?",
    contactDescription: "Оберіть найзручніший спосіб зв'язку з Boruch Myjnia.",
    form: "Відкрити форму",
    email: "Написати e-mail",
    call: "Зателефонувати",
    whatsapp: "Написати у WhatsApp",
    closeContact: "Закрити контакти",
    cookieWelcome: "Вітаємо в Boruch Myjnia",
    cookieTitle: "Конфіденційність і cookies",
    cookiePrompt: "Оберіть, чи погоджуєтеся ви на необов'язкову аналітику.",
    cookieOptionalInfo: "Сайт працює нормально і без аналітичних cookies.",
    languageLabel: "Оберіть мову",
    necessary: "Лише необхідні",
    necessaryDescription: "Потрібні для роботи сайту та збереження вашого вибору.",
    analytics: "Необхідні та аналітичні",
    analyticsDescription: "Допомагають зрозуміти, як відвідувачі користуються сайтом.",
    required: "Необхідні",
    optional: "Необов'язкові",
    changeAnytime: "Вибір можна змінити будь-коли за допомогою іконки cookies внизу ліворуч.",
    settingsTitle: "Налаштування cookies",
    settingsDescription: "Змініть згоду на необов'язкову аналітику.",
    selected: "Вибрано",
    save: "Зберегти вибір",
    close: "Закрити",
  },
}

function localeFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en"
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de"
  if (pathname === "/uk" || pathname.startsWith("/uk/")) return "uk"
  return "pl"
}

function pageFromPathname(pathname: string, locale: Locale): PageKey {
  const page = Object.entries(routes[locale]).find(([, path]) => path === pathname)?.[0]
  return (page as PageKey | undefined) ?? "home"
}

function LanguageFlag({ locale }: { locale: Locale }) {
  const flagClass = "h-3.5 w-[1.35rem] shrink-0 overflow-hidden ring-1 ring-white/15"

  if (locale === "pl") {
    return <svg viewBox="0 0 32 20" className={flagClass} aria-hidden="true"><path fill="#fff" d="M0 0h32v10H0z" /><path fill="#dc143c" d="M0 10h32v10H0z" /></svg>
  }

  if (locale === "en") {
    return (
      <svg viewBox="0 0 60 36" className={flagClass} aria-hidden="true">
        <path fill="#012169" d="M0 0h60v36H0z" />
        <path stroke="#fff" strokeWidth="8" d="m0 0 60 36M60 0 0 36" />
        <path stroke="#c8102e" strokeWidth="4" d="m0 0 60 36M60 0 0 36" />
        <path stroke="#fff" strokeWidth="12" d="M30 0v36M0 18h60" />
        <path stroke="#c8102e" strokeWidth="7" d="M30 0v36M0 18h60" />
      </svg>
    )
  }

  if (locale === "de") {
    return <svg viewBox="0 0 30 18" className={flagClass} aria-hidden="true"><path fill="#000" d="M0 0h30v6H0z" /><path fill="#dd0000" d="M0 6h30v6H0z" /><path fill="#ffce00" d="M0 12h30v6H0z" /></svg>
  }

  return <svg viewBox="0 0 30 18" className={flagClass} aria-hidden="true"><path fill="#0057b7" d="M0 0h30v9H0z" /><path fill="#ffd700" d="M0 9h30v9H0z" /></svg>
}

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.15 1.6 5.96L.1 24l6.3-1.65a11.86 11.86 0 0 0 5.65 1.44h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.17-1.23-6.15-3.42-8.42ZM12.06 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.88 9.88 0 0 1-1.52-5.28C2.17 6.43 6.6 2 12.05 2c2.64 0 5.12 1.03 6.99 2.9a9.86 9.86 0 0 1 2.89 7c0 5.45-4.43 9.9-9.87 9.9Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.61.56-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  )
}

function FloatingContact({ locale, pathname }: { locale: Locale; pathname: string }) {
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  useModalFocus(open, dialogRef, close)
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const updateVisibility = () => {
      if (window.scrollY <= 80) { setVisible(false); return }
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 420
      setVisible(!nearBottom)
    }
    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [])

  useEffect(() => {
    const openContact = () => setOpen(true)
    const handleContactClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-open-floating-contact]")) {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("open-floating-contact", openContact)
    document.addEventListener("click", handleContactClick)
    return () => {
      window.removeEventListener("open-floating-contact", openContact)
      document.removeEventListener("click", handleContactClick)
    }
  }, [])
  const whatsappHref = `https://wa.me/${contact.phoneHref.replace(/\D/g, "")}`
  const optionClass = "group flex min-h-14 items-center gap-3 border border-white/10 bg-white/[.025] px-4 py-3 text-left text-sm font-semibold leading-relaxed transition-colors hover:border-brand/60 hover:bg-brand/[.08]"

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        inert={!visible}
        aria-hidden={!visible}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`fixed bottom-[max(.75rem,env(safe-area-inset-bottom))] right-3 z-40 flex min-h-12 items-center gap-3 border border-white/10 bg-brand px-4 text-[.72rem] font-bold uppercase tracking-[.14em] text-white transition-[transform,opacity,background-color] duration-500 hover:bg-[#b91f27] sm:px-5 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {t.contactButton}
      </button>

      {open && (
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="floating-contact-title" className="fixed inset-0 z-[110] flex items-end justify-center bg-black/80 sm:items-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
          <section className="modal-sheet relative max-h-[90dvh] w-full max-w-lg overflow-y-auto border-t-[3px] border-brand bg-[#111112] p-6 sm:border sm:border-white/12 sm:p-8">
            <button type="button" onClick={() => setOpen(false)} aria-label={t.closeContact} className="absolute right-4 top-4 grid size-10 place-items-center border border-white/12 bg-black/30 text-white/60 transition-colors hover:border-brand hover:bg-brand hover:text-white">
              <X className="size-5" aria-hidden="true" />
            </button>
            <p className="text-[.72rem] font-bold uppercase tracking-[.18em] text-brand">Boruch Myjnia</p>
            <h2 id="floating-contact-title" className="mt-4 pr-6 font-display text-[clamp(1.45rem,5vw,1.95rem)] font-bold leading-[1.25] tracking-normal">{t.contactTitle}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">{t.contactDescription}</p>
            <div className="mt-7 grid gap-2">
              <a href={`${pathname === routes[locale].contact ? routes[locale].contact : routes[locale].home}#wycena`} onClick={() => setOpen(false)} className={optionClass}><MessageCircle className="size-5 text-brand" aria-hidden="true" />{t.form}</a>
              <a href={`mailto:${contact.email}`} className={optionClass}><Mail className="size-5 text-brand" aria-hidden="true" />{t.email}</a>
              <a href={contact.phoneHref} className={optionClass}><Phone className="size-5 text-brand" aria-hidden="true" /><span className="min-w-0"><span className="block text-xs font-medium text-white/65">{t.call}</span><span className="mt-0.5 block whitespace-nowrap">{contact.phone}</span></span></a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={optionClass}><span className="text-[#61c99a]"><WhatsAppIcon /></span>{t.whatsapp}</a>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

function readConsent(): Consent {
  const value = document.cookie.split("; ").find((item) => item.startsWith(`${COOKIE_NAME}=`))?.split("=")[1]
  return value === "accepted" || value === "rejected" ? value : null
}

function CookieConsent({ locale, pathname }: { locale: Locale; pathname: string }) {
  const t = copy[locale]
  const router = useRouter()
  const [isChangingLanguage, startLanguageTransition] = useTransition()
  const [ready, setReady] = useState(false)
  const [consent, setConsent] = useState<Consent>(null)
  const [editing, setEditing] = useState(false)
  const [draftConsent, setDraftConsent] = useState<Exclude<Consent, null>>("rejected")
  const [showSettingsButton, setShowSettingsButton] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const changeLanguage = (nextLocale: Locale) => {
    if (nextLocale === locale || isChangingLanguage) return
    const destination = routes[nextLocale][pageFromPathname(pathname, locale)]
    startLanguageTransition(() => {
      router.push(`${destination}${window.location.search}${window.location.hash}`, { scroll: false })
    })
  }

  useEffect(() => {
    setConsent(readConsent())
    setReady(true)
  }, [])

  useEffect(() => {
    const updateVisibility = () => {
      if (window.scrollY <= 80) { setShowSettingsButton(false); return }
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 350
      setShowSettingsButton(!nearBottom)
    }
    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [])

  const saveConsent = useCallback((value: Exclude<Consent, null>) => {
    const secure = window.location.protocol === "https:" ? "; Secure" : ""
    document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`
    setConsent(value)
    setEditing(false)
  }, [])

  const closeSettings = useCallback(() => setEditing(false), [])
  useModalFocus(ready && (consent === null || editing), dialogRef, editing ? closeSettings : undefined, locale)

  if (!ready) return null

  const firstVisit = consent === null
  const choiceClass = (active: boolean) => `group flex items-center gap-4 border p-4 text-left transition-colors sm:min-h-36 sm:flex-col sm:items-stretch sm:gap-0 sm:p-5 ${active ? "border-brand bg-brand/[.08]" : "border-white/12 bg-white/[.025] hover:border-brand/55"}`

  return (
    <>
      {process.env.NODE_ENV === "production" && consent === "accepted" ? <Analytics /> : null}

      {(firstVisit || editing) && (
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cookie-title" className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-6" onMouseDown={(event) => { if (editing && event.target === event.currentTarget) setEditing(false) }}>
          <section className="modal-sheet min-h-[68svh] max-h-[85svh] w-full max-w-none overflow-y-auto border-x-0 border-b-0 border-t-[3px] border-t-brand bg-[#111112] p-5 sm:min-h-0 sm:max-h-[92dvh] sm:max-w-2xl sm:border sm:border-white/12 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center text-brand"><Cookie className="size-7" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-[.72rem] font-bold uppercase tracking-[.18em] text-brand">{t.cookieWelcome}</p>
                <h2 id="cookie-title" className="mt-2 font-display text-[1.35rem] font-bold leading-[1.14] tracking-[-.01em] sm:text-[1.85rem] sm:leading-[1.14]">{editing ? t.settingsTitle : t.cookieTitle}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65 sm:mt-3 sm:text-sm">{editing ? t.settingsDescription : t.cookiePrompt}</p>
              </div>
              {editing && <button type="button" onClick={() => setEditing(false)} aria-label={t.close} className="grid size-10 shrink-0 place-items-center border border-white/12 text-white/58 transition-colors hover:border-brand hover:bg-brand hover:text-white"><X className="size-5" /></button>}
            </div>

            <div className="mt-5 flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[.72rem] font-medium uppercase tracking-[.12em] text-white/65">{t.languageLabel}</span>
              <div className="grid w-full grid-cols-4 gap-2 sm:w-auto sm:gap-1" role="group" aria-label={t.languageLabel}>
                {localeOrder.map((code) => {
                  const active = code === locale
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => changeLanguage(code)}
                      disabled={isChangingLanguage}
                      aria-pressed={active}
                      aria-label={`${localeLabels[code].short} - ${localeLabels[code].name}`}
                      title={localeLabels[code].name}
                      className={`flex min-h-10 min-w-11 items-center justify-center gap-1.5 border px-1.5 text-[.72rem] font-bold uppercase tracking-[.08em] transition-[background-color,color,border-color] disabled:cursor-wait disabled:opacity-60 sm:min-h-9 sm:min-w-14 sm:gap-2 sm:px-2 sm:tracking-[.1em] ${active ? "border-white/25 bg-white/12 text-white" : "border-transparent bg-white/[.045] text-white/55 hover:border-white/12 hover:bg-white/10 hover:text-white"}`}
                    >
                      <LanguageFlag locale={code} />
                      {localeLabels[code].short}
                    </button>
                  )
                })}
              </div>
            </div>

            {!editing && <p className="mt-5 border-l-2 border-brand pl-4 text-xs leading-relaxed text-white/65">{t.cookieOptionalInfo}</p>}

            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
              <button type="button" onClick={() => editing ? setDraftConsent("rejected") : saveConsent("rejected")} aria-pressed={editing ? draftConsent === "rejected" : undefined} className={choiceClass(editing && draftConsent === "rejected")}>
                <div className="flex items-center justify-between gap-3 sm:w-full sm:items-start">
                  <span className="grid size-10 shrink-0 place-items-center bg-white/[.06] text-white/55"><ShieldCheck className="size-5" aria-hidden="true" /></span>
                  <span className="hidden text-[.72rem] font-bold uppercase tracking-[.14em] text-white/65 sm:block">{editing && draftConsent === "rejected" ? t.selected : t.required}</span>
                </div>
                <div className="min-w-0 flex-1 sm:mt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm font-bold uppercase tracking-[.06em] sm:tracking-[.08em]">{t.necessary}</strong>
                    {editing && draftConsent === "rejected" && <span className="text-[.72rem] font-bold uppercase tracking-[.12em] text-white/65 sm:hidden">{t.selected}</span>}
                  </div>
                  <span className="mt-1.5 block text-[.82rem] leading-[1.5] text-white/65 sm:mt-2 sm:text-xs sm:leading-relaxed">{t.necessaryDescription}</span>
                </div>
              </button>
              <button type="button" onClick={() => editing ? setDraftConsent("accepted") : saveConsent("accepted")} aria-pressed={editing ? draftConsent === "accepted" : undefined} className={choiceClass(editing && draftConsent === "accepted")}>
                <div className="flex items-center justify-between gap-3 sm:w-full sm:items-start">
                  <span className="grid size-10 shrink-0 place-items-center bg-brand/15 text-brand"><Cookie className="size-5" aria-hidden="true" /></span>
                  <span className="hidden text-[.72rem] font-bold uppercase tracking-[.14em] text-brand sm:block">{editing && draftConsent === "accepted" ? t.selected : t.optional}</span>
                </div>
                <div className="min-w-0 flex-1 sm:mt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm font-bold uppercase tracking-[.06em] sm:tracking-[.08em]">{t.analytics}</strong>
                    <span className="text-[.72rem] font-bold uppercase tracking-[.12em] text-brand sm:hidden">{editing && draftConsent === "accepted" ? t.selected : t.optional}</span>
                  </div>
                  <span className="mt-1.5 block text-[.82rem] leading-[1.5] text-white/65 sm:mt-2 sm:text-xs sm:leading-relaxed">{t.analyticsDescription}</span>
                </div>
              </button>
            </div>

            {editing && (
              <button type="button" onClick={() => saveConsent(draftConsent)} className="mt-5 flex min-h-12 w-full items-center justify-center gap-3 bg-brand px-5 text-[.72rem] font-bold uppercase tracking-[.14em] text-white transition-colors hover:bg-[#b91f27]">
                <Check className="size-4" aria-hidden="true" />{t.save}
              </button>
            )}
            <p className="mt-5 border-t border-white/10 pt-4 text-center text-[.72rem] leading-relaxed text-white/65 sm:text-[.72rem]">{t.changeAnytime}</p>
          </section>
        </div>
      )}

      {!firstVisit && !editing && (
        <button type="button" onClick={() => { setDraftConsent(consent ?? "rejected"); setEditing(true) }} inert={!showSettingsButton} aria-hidden={!showSettingsButton} aria-haspopup="dialog" aria-label={t.settingsTitle} title={t.settingsTitle} className={`fixed bottom-[max(.75rem,env(safe-area-inset-bottom))] left-3 z-40 grid size-12 place-items-center border border-white/20 bg-[#111112] text-brand transition-[transform,opacity,background-color,color] duration-500 hover:bg-brand hover:text-white ${showSettingsButton ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
          <Cookie className="size-5" aria-hidden="true" />
        </button>
      )}
    </>
  )
}

export function GlobalOverlays() {
  const pathname = decodeURIComponent(usePathname()).replace(/\/$/, "") || "/"
  const locale = localeFromPathname(pathname)
  useEffect(() => { document.documentElement.lang = localeLabels[locale].htmlLang }, [locale])
  return <><FloatingContact locale={locale} pathname={pathname} /><CookieConsent locale={locale} pathname={pathname} /></>
}
