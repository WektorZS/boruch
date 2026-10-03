import { ArrowRight, CalendarCheck, Mail, MapPin, Phone } from "lucide-react"
import { SiteShell } from "./site-shell"
import { HomeContactForm } from "./home-contact-form"
import { BoruchGoogleMap } from "./boruch-google-map"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, sources, ui, type Locale } from "@/lib/content"

const pageCopy = {
  pl: {
    direct: "Kontakt bezpośredni",
    directText: "Zadzwoń, napisz lub opisz samochód w formularzu. Odpowiemy konkretnie i pomożemy dobrać usługę.",
    formLabel: "Formularz kontaktowy",
    formTitle: "Powiedz nam, czego potrzebuje Twoje auto.",
    formText: "Podaj podstawowe informacje i wybierz usługę. Wrócimy z odpowiedzią lub propozycją terminu.",
    location: "Lokalizacja",
    locationTitle: "W centrum Szczecina",
    directions: "Wjedź na parking podziemny PAZIM i zjedź na poziom -2.",
    booking: "Rezerwacja online",
  },
  en: {
    direct: "Direct contact",
    directText: "Call, write or describe your car in the form. We will answer clearly and help you choose the right service.",
    formLabel: "Contact form",
    formTitle: "Tell us what your car needs.",
    formText: "Share the essentials and choose a service. We will reply with guidance or an available date.",
    location: "Location",
    locationTitle: "In central Szczecin",
    directions: "Enter the PAZIM underground car park and drive down to level -2.",
    booking: "Online booking",
  },
  de: {
    direct: "Direkter Kontakt",
    directText: "Rufen Sie an, schreiben Sie uns oder beschreiben Sie Ihr Fahrzeug im Formular. Wir helfen bei der passenden Leistung.",
    formLabel: "Kontaktformular",
    formTitle: "Sagen Sie uns, was Ihr Auto benötigt.",
    formText: "Nennen Sie die wichtigsten Angaben und wählen Sie eine Leistung. Wir antworten mit einer Empfehlung oder einem Termin.",
    location: "Standort",
    locationTitle: "Im Zentrum von Szczecin",
    directions: "Fahren Sie in die PAZIM-Tiefgarage und hinunter auf Ebene -2.",
    booking: "Online-Buchung",
  },
  uk: {
    direct: "Прямий контакт",
    directText: "Зателефонуйте, напишіть або опишіть авто у формі. Ми допоможемо вибрати відповідну послугу.",
    formLabel: "Контактна форма",
    formTitle: "Розкажіть, що потрібно вашому авто.",
    formText: "Вкажіть основну інформацію та виберіть послугу. Ми відповімо і запропонуємо зручний час.",
    location: "Розташування",
    locationTitle: "У центрі Щецина",
    directions: "Заїдьте на підземний паркінг PAZIM і спустіться на рівень -2.",
    booking: "Онлайн-бронювання",
  },
} satisfies Record<Locale, Record<string, string>>

const detailCopy = {
  pl: { social: "Obserwuj nas", map: "Otwórz w Mapach Google", parking: "Parking PAZIM", level: "Poziom", bookingText: "Wybierz usługę i sprawdź dostępne terminy w Booksy.", formName: "Formularz kontaktowy" },
  en: { social: "Follow us", map: "Open in Google Maps", parking: "PAZIM car park", level: "Level", bookingText: "Choose a service and check available appointments on Booksy.", formName: "Contact form" },
  de: { social: "Folgen Sie uns", map: "In Google Maps öffnen", parking: "PAZIM-Tiefgarage", level: "Ebene", bookingText: "Wählen Sie eine Leistung und prüfen Sie verfügbare Termine bei Booksy.", formName: "Kontaktformular" },
  uk: { social: "Слідкуйте за нами", map: "Відкрити в Google Maps", parking: "Паркінг PAZIM", level: "Рівень", bookingText: "Оберіть послугу та перегляньте доступні записи в Booksy.", formName: "Контактна форма" },
} satisfies Record<Locale, Record<string, string>>

export function ContactPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = pageCopy[locale]
  const detail = detailCopy[locale]

  return (
    <SiteShell locale={locale} page="contact">
      <div className="contact-rebuild" lang={locale}>
        <style>{contactStyles}</style>

        <section className="cr-hero" aria-labelledby="page-title">
          <div className="cr-shell">
            <p className="cr-eyebrow">Boruch Myjnia</p>
            <div className="cr-hero-grid">
              <h1 id="page-title" className="cr-title">{t.nav.contact}<span className="cr-dot" aria-hidden="true">.</span></h1>
              <p className="cr-intro">{copy.directText}</p>
            </div>
          </div>
        </section>

        <section className="cr-inquiry" aria-labelledby="direct-title">
          <div className="cr-shell cr-inquiry-grid">
            <div className="cr-direct">
              <h2 id="direct-title" className="cr-small-heading">{copy.direct}</h2>

              <div className="cr-methods">
                <div className="cr-method">
                  <p className="cr-method-label"><Phone size={16} strokeWidth={1.6} aria-hidden="true" />{t.phoneLabel}</p>
                  <a href={contact.phoneHref} className="cr-phone">{contact.phone}</a>
                </div>
                <div className="cr-method">
                  <p className="cr-method-label"><Mail size={16} strokeWidth={1.6} aria-hidden="true" />{t.emailLabel}</p>
                  <a href={"mailto:" + contact.email} className="cr-email">{contact.email}</a>
                </div>
              </div>

              <div className="cr-booking">
                <p className="cr-method-label"><CalendarCheck size={17} strokeWidth={1.6} aria-hidden="true" />{copy.booking}</p>
                <p className="cr-booking-text">{detail.bookingText}</p>
                <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.booking + " - Booksy"} className="cr-booking-link">
                  Booksy<ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                </a>
              </div>

              <div className="cr-socials">
                <p className="cr-small-label">{detail.social}</p>
                <div className="cr-social-links">
                  <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="cr-social-link">
                    <span aria-hidden="true"><FacebookIcon className="cr-social-icon" /></span>Facebook
                  </a>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="cr-social-link">
                    <span aria-hidden="true"><InstagramIcon className="cr-social-icon" /></span>Instagram
                  </a>
                </div>
              </div>
            </div>

            <section id="wycena" className="cr-form-section" aria-labelledby="contact-form-title">
              <p className="cr-eyebrow">{copy.formLabel}</p>
              <h2 id="contact-form-title" className="cr-heading">{copy.formTitle}</h2>
              <p className="cr-form-intro">{copy.formText}</p>
              <HomeContactForm locale={locale} phoneHref={contact.phoneHref} phoneText={contact.phone} />
            </section>
          </div>
        </section>

        <section className="cr-location" aria-labelledby="location-title">
          <div className="cr-shell cr-location-grid">
            <div className="cr-location-copy">
              <p className="cr-eyebrow">{copy.location}</p>
              <h2 id="location-title" className="cr-heading">{copy.locationTitle}</h2>
              <address className="cr-address">
                {src.address.lines.map((line, index) => <span key={index}>{line}</span>)}
              </address>
              <div className="cr-parking">
                <span className="cr-level" aria-label={detail.level + " -2"}>-2</span>
                <div>
                  <p className="cr-parking-title">{detail.parking}</p>
                  <p className="cr-directions">{copy.directions}</p>
                </div>
              </div>
            </div>
            <div className="cr-map-area">
              <div className="cr-map-stage">
                <BoruchGoogleMap />
              </div>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="cr-map-link">
                <MapPin size={17} strokeWidth={1.6} aria-hidden="true" /><span>{detail.map}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  )
}

const contactStyles = `
.contact-rebuild {
  --cr-bg: #09090b;
  --cr-surface: #111113;
  --cr-ink: #f5f2ed;
  --cr-muted: #b7b5b3;
  --cr-accent: #df3039;
  --cr-line: rgba(245, 242, 237, .14);
  color: var(--cr-ink);
  background: var(--cr-bg);
}
.contact-rebuild *, .contact-rebuild *::before, .contact-rebuild *::after { box-sizing: border-box; }
.contact-rebuild :is(h1, h2, p, address) { margin: 0; }
.contact-rebuild :is(h1, h2) { font-family: inherit; text-transform: none; text-wrap: balance; overflow-wrap: anywhere; }
.contact-rebuild a { color: inherit; text-decoration: none; }
.contact-rebuild a:focus-visible { outline: 2px solid var(--cr-ink); outline-offset: 5px; }
.contact-rebuild .cr-shell { width: min(calc(100% - 6rem), 1320px); margin-inline: auto; min-width: 0; }
.contact-rebuild .cr-eyebrow, .contact-rebuild .cr-small-label {
  font-size: .7rem; font-weight: 650; line-height: 1.65; letter-spacing: .12em; text-transform: uppercase; color: var(--cr-muted);
}
.contact-rebuild .cr-eyebrow { display: flex; align-items: center; gap: 12px; }
.contact-rebuild .cr-eyebrow::before { content: ""; width: 28px; height: 1px; flex: 0 0 28px; background: var(--cr-accent); }
.contact-rebuild .cr-hero { padding-top: calc(var(--header-h, 0px) + clamp(3.5rem, 6vw, 6rem)); padding-bottom: clamp(2.5rem, 4vw, 4rem); border-bottom: 1px solid var(--cr-line); }
.contact-rebuild .cr-hero-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: clamp(2rem, 5vw, 5rem); margin-top: 1.7rem; }
.contact-rebuild .cr-title { font-size: clamp(3.5rem, 6.2vw, 5.75rem); font-weight: 650; line-height: 1.12; letter-spacing: -.025em; }
.contact-rebuild .cr-dot { color: var(--cr-accent); }
.contact-rebuild .cr-intro { max-width: 43ch; font-size: clamp(1.05rem, 1.4vw, 1.3rem); line-height: 1.8; color: var(--cr-muted); text-wrap: pretty; }
.contact-rebuild .cr-inquiry { padding-block: clamp(3rem, 5.5vw, 5.5rem); border-bottom: 1px solid var(--cr-line); }
.contact-rebuild .cr-inquiry-grid { display: grid; grid-template-columns: .9fr 1.1fr; align-items: start; gap: clamp(3rem, 6vw, 6rem); }
.contact-rebuild .cr-direct { min-width: 0; }
.contact-rebuild .cr-small-heading { font-size: 1.15rem; font-weight: 500; line-height: 1.6; letter-spacing: 0; }
.contact-rebuild .cr-methods { margin-top: 1.6rem; }
.contact-rebuild .cr-method { padding-block: 1.2rem 1.4rem; border-top: 1px solid var(--cr-line); }
.contact-rebuild .cr-method-label { display: flex; align-items: center; gap: .65rem; font-size: .78rem; font-weight: 500; line-height: 1.7; color: var(--cr-muted); }
.contact-rebuild .cr-method-label svg { flex-shrink: 0; color: var(--cr-accent); }
.contact-rebuild .cr-phone {
  display: inline-flex; align-items: center; min-height: 48px; max-width: 100%; margin-top: .5rem;
  font-size: clamp(1.6rem, 2.3vw, 2.15rem); font-weight: 500; line-height: 1.5; letter-spacing: .01em; font-variant-numeric: tabular-nums;
}
.contact-rebuild .cr-email { display: inline-flex; align-items: center; min-height: 44px; max-width: 100%; margin-top: .3rem; font-size: 1.06rem; line-height: 1.7; overflow-wrap: anywhere; }
.contact-rebuild :is(.cr-phone, .cr-email, .cr-social-link, .cr-map-link, .cr-booking-link) { transition: color 160ms ease; }
.contact-rebuild .cr-booking { padding-top: 1.4rem; border-top: 1px solid var(--cr-line); }
.contact-rebuild .cr-booking-text { max-width: 36ch; margin-top: .6rem; font-size: .9rem; line-height: 1.8; color: var(--cr-muted); text-wrap: pretty; }
.contact-rebuild .cr-booking-link { display: inline-flex; align-items: center; gap: 1.7rem; min-height: 44px; margin-top: .5rem; border-bottom: 1px solid var(--cr-accent); font-size: .88rem; font-weight: 600; }
.contact-rebuild .cr-booking-link svg { color: var(--cr-accent); }
.contact-rebuild .cr-socials { margin-top: 2.5rem; padding-top: 1.25rem; border-top: 1px solid var(--cr-line); }
.contact-rebuild .cr-social-links { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem 1.5rem; margin-top: .45rem; }
.contact-rebuild .cr-social-link { display: inline-flex; gap: .65rem; align-items: center; min-height: 44px; font-size: .85rem; font-weight: 500; }
.contact-rebuild .cr-social-link > span { display: inline-flex; flex-shrink: 0; }
.contact-rebuild .cr-social-icon { width: 18px; height: 18px; }
.contact-rebuild .cr-form-section { min-width: 0; padding-left: clamp(2rem, 4vw, 4rem); border-left: 1px solid var(--cr-line); scroll-margin-top: calc(var(--header-h, 96px) + 20px); }
.contact-rebuild .cr-heading { margin-top: 1.15rem; font-size: clamp(1.9rem, 2.5vw, 2.6rem); font-weight: 500; line-height: 1.25; letter-spacing: -.015em; }
.contact-rebuild .cr-form-intro { margin-block: 1.1rem 1.75rem; max-width: 55ch; font-size: .95rem; line-height: 1.8; color: var(--cr-muted); text-wrap: pretty; }
.contact-rebuild .cr-location { padding-block: clamp(3rem, 5.5vw, 5.5rem); background: var(--cr-surface); border-bottom: 1px solid var(--cr-line); }
.contact-rebuild .cr-location-grid { display: grid; grid-template-columns: .85fr 1.15fr; align-items: center; gap: clamp(2.5rem, 5vw, 5rem); }
.contact-rebuild .cr-location-copy { min-width: 0; }
.contact-rebuild .cr-address { display: grid; gap: .1rem; margin-top: 1.5rem; font-style: normal; font-size: 1rem; line-height: 1.8; color: var(--cr-muted); }
.contact-rebuild .cr-parking { display: flex; align-items: center; gap: 1.3rem; margin-top: 1.75rem; padding-top: 1.4rem; border-top: 1px solid var(--cr-line); }
.contact-rebuild .cr-level { flex-shrink: 0; font-size: 3.25rem; font-weight: 600; line-height: 1.2; letter-spacing: -.02em; color: var(--cr-accent); }
.contact-rebuild .cr-parking-title { font-size: .9rem; font-weight: 600; line-height: 1.7; }
.contact-rebuild .cr-directions { margin-top: .3rem; max-width: 42ch; font-size: .86rem; line-height: 1.8; color: var(--cr-muted); text-wrap: pretty; }
.contact-rebuild .cr-map-area { min-width: 0; }
.contact-rebuild .cr-map-stage { position: relative; height: clamp(320px, 28vw, 390px); overflow: hidden; background: #09090b; }
.contact-rebuild .cr-map-link { display: inline-flex; align-items: center; min-height: 44px; gap: .65rem; margin-top: .6rem; font-size: .8rem; font-weight: 500; line-height: 1.6; }
.contact-rebuild .cr-map-link svg { flex-shrink: 0; color: var(--cr-accent); }
@media (hover: hover) {
  .contact-rebuild :is(.cr-phone, .cr-email, .cr-social-link, .cr-map-link, .cr-booking-link):hover { color: #ef858a; }
}
@media (max-width: 1199px) {
  .contact-rebuild .cr-shell { width: calc(100% - 4rem); }
  .contact-rebuild .cr-inquiry-grid { grid-template-columns: .8fr 1.2fr; gap: 2rem; }
  .contact-rebuild .cr-form-section { padding-left: 2rem; }
  .contact-rebuild .cr-location-grid { gap: 2rem; }
}
@media (max-width: 899px) {
  .contact-rebuild .cr-hero-grid { grid-template-columns: 1fr; gap: 1.3rem; }
  .contact-rebuild .cr-title { font-size: clamp(3.25rem, 8vw, 4.5rem); }
  .contact-rebuild .cr-intro { max-width: 55ch; }
  .contact-rebuild .cr-inquiry-grid { grid-template-columns: 1fr; gap: 2.75rem; }
  .contact-rebuild .cr-form-section { padding: 2.5rem 0 0; border-left: 0; border-top: 1px solid var(--cr-line); }
  .contact-rebuild .cr-direct { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem; }
  .contact-rebuild .cr-small-heading, .contact-rebuild .cr-methods { grid-column: 1 / -1; }
  .contact-rebuild .cr-methods { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem; }
  .contact-rebuild .cr-socials { margin-top: 0; padding-top: 1.4rem; }
  .contact-rebuild .cr-location-grid { grid-template-columns: 1fr; gap: 2rem; }
  .contact-rebuild .cr-location-copy { max-width: 600px; }
  .contact-rebuild .cr-map-stage { height: 360px; }
}
@media (max-width: 599px) {
  .contact-rebuild .cr-shell { width: calc(100% - 2.5rem); }
  .contact-rebuild .cr-hero { padding-top: calc(var(--header-h, 0px) + 2.75rem); padding-bottom: 2rem; }
  .contact-rebuild .cr-hero-grid { margin-top: 1.25rem; gap: 1.2rem; }
  .contact-rebuild .cr-title { font-size: clamp(2.75rem, 10vw, 3.75rem); line-height: 1.14; }
  .contact-rebuild .cr-intro { font-size: 1rem; line-height: 1.8; }
  .contact-rebuild .cr-eyebrow { font-size: .66rem; letter-spacing: .1em; }
  .contact-rebuild .cr-inquiry { padding-block: 2.25rem 2.75rem; }
  .contact-rebuild .cr-direct, .contact-rebuild .cr-methods { display: block; }
  .contact-rebuild .cr-phone { font-size: 1.8rem; }
  .contact-rebuild .cr-email { font-size: 1rem; }
  .contact-rebuild .cr-socials { margin-top: 1.75rem; }
  .contact-rebuild .cr-heading { font-size: clamp(1.7rem, 7vw, 2.15rem); line-height: 1.28; }
  .contact-rebuild .cr-form-intro { font-size: .94rem; }
  .contact-rebuild .cr-location { padding-block: 2.75rem; }
  .contact-rebuild .cr-parking { gap: 1rem; }
  .contact-rebuild .cr-level { font-size: 2.8rem; }
  .contact-rebuild .cr-map-stage { height: 310px; }
}
@media (prefers-reduced-motion: reduce) {
  .contact-rebuild :is(.cr-phone, .cr-email, .cr-social-link, .cr-map-link, .cr-booking-link) { transition: none; }
}
`

