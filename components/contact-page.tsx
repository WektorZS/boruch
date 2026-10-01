import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react"
import { SiteShell } from "./site-shell"
import { HomeContactForm } from "./home-contact-form"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, sources, ui, type Locale } from "@/lib/content"

const MAP_EMBED = "https://www.google.com/maps?q=Plac+Rod%C5%82a+8,+70-419+Szczecin&z=16&output=embed"

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

export function ContactPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = pageCopy[locale]

  return (
    <SiteShell locale={locale} page="contact">


      <section aria-labelledby="page-title" className="editorial-hero relative border-b border-white/10 bg-[#080809]">
        <div className="shell-wide grid gap-10 pb-12 pt-[calc(var(--header-h)+4rem)] lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12 lg:pb-16">
          <div className="min-w-0">
            <p className="eyebrow mb-7">{t.nav.contact}</p>
            <h1 id="page-title" className="page-cover-title">{t.nav.contact}<span className="text-brand">.</span></h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">{copy.directText}</p>
            <div className="mt-9 border-t border-white/10 pt-6">
              <p className="type-label text-white/60">{copy.direct}</p>
              <a href={contact.phoneHref} aria-label={`${t.phoneLabel}: ${contact.phone}`} className="contact-method group mt-4 inline-flex min-h-12 items-center gap-3 text-2xl font-semibold leading-relaxed tracking-normal text-white sm:text-3xl">
                <Phone className="size-5 shrink-0 text-brand" aria-hidden="true" /><span className="link-draw">{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} aria-label={`${t.emailLabel}: ${contact.email}`} className="contact-method group mt-2 flex min-h-11 w-fit items-center gap-3 text-base text-white/75"><Mail className="size-4 shrink-0 text-brand" aria-hidden="true" /><span className="link-draw [overflow-wrap:anywhere]">{contact.email}</span></a>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy.booking} - Booksy`} className="btn btn-primary gap-3"><CalendarCheck className="size-4" aria-hidden="true" />Booksy</a>
                <a href="#wycena" className="group inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-white/80"><span className="link-draw">{copy.formLabel}</span><ArrowRight className="arrow-shift size-4 text-brand" aria-hidden="true" /></a>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-white/75"><FacebookIcon className="size-4 text-brand" />Facebook</a>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-white/75"><InstagramIcon className="size-4 text-brand" />Instagram</a>
              </div>
            </div>
          </div>
          <section id="wycena" aria-labelledby="contact-form-title" className="min-w-0 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="eyebrow">{copy.formLabel}</p>
            <h2 id="contact-form-title" className="mt-5 text-pretty font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-snug tracking-normal text-white">{copy.formTitle}</h2>
            <p className="mb-8 mt-4 max-w-xl text-base leading-relaxed text-white/65">{copy.formText}</p>
            <HomeContactForm locale={locale} />
          </section>
        </div>
      </section>

      <section aria-labelledby="location-title" className="section-lg relative overflow-hidden border-b border-white/10 bg-[#080809]">
        <div className="shell-wide relative grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="eyebrow">{copy.location}</p>
            <h2 id="location-title" className="editorial-display mt-7 max-w-full">{copy.locationTitle}</h2>
            <p className="mt-6 max-w-md border-l-2 border-brand pl-5 text-base leading-relaxed text-white/80">{copy.directions}</p>
            <address className="mt-7 not-italic text-sm leading-relaxed text-white/70">
              {src.address.lines.map((line) => <span key={line} className="block">{line}</span>)}
            </address>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="editorial-link mt-7 w-fit">{t.openMap}<ArrowRight className="size-4 text-brand" aria-hidden="true" /></a>
          </div>
          <div className="relative min-h-80 overflow-hidden lg:col-span-7 lg:min-h-96">
            <iframe
              src={MAP_EMBED}
              title={`${t.openMap} - ${src.address.lines.join(", ")}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 opacity-90 [filter:grayscale(.72)_invert(.92)_sepia(.22)_hue-rotate(305deg)_contrast(1.02)]"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
