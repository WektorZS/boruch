import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
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
    level: "PAZIM / poziom",
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
    level: "PAZIM / level",
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
    level: "PAZIM / Ebene",
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
    level: "PAZIM / рівень",
    booking: "Онлайн-бронювання",
  },
} satisfies Record<Locale, Record<string, string>>

export function ContactPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = pageCopy[locale]

  return (
    <SiteShell locale={locale} page="contact">


      <section aria-labelledby="page-title" className="editorial-hero relative border-b border-white/10 bg-[#0a0a0b] pt-(--header-h)">
        <div className="shell-wide grid gap-10 pb-12 pt-20 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-20 lg:pt-24">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-7">{t.nav.contact}</p>
            <h1 id="page-title" className="page-hero-title type-h1">{t.nav.contact}</h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/70">{copy.directText}</p>
            <div className="mt-9 border-t border-white/10 pt-6">
              <p className="type-label text-white/60">{copy.direct}</p>
              <a href={contact.phoneHref} aria-label={`${t.phoneLabel}: ${contact.phone}`} className="contact-method group mt-4 inline-flex min-h-12 items-center gap-3 text-2xl font-semibold leading-relaxed tracking-normal text-white sm:text-3xl">
                <Phone className="size-5 text-brand" aria-hidden="true" /><span className="link-draw">{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} aria-label={`${t.emailLabel}: ${contact.email}`} className="contact-method group mt-2 flex min-h-11 w-fit items-center gap-3 text-base text-white/75"><Mail className="size-4 text-brand" aria-hidden="true" /><span className="link-draw [overflow-wrap:anywhere]">{contact.email}</span></a>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary gap-3"><CalendarCheck className="size-4" aria-hidden="true" />Booksy</a>
                <a href="#wycena" className="group inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-white/80"><span className="link-draw">{copy.formLabel}</span><ArrowRight className="arrow-shift size-4 text-brand" aria-hidden="true" /></a>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{copy.booking}</p>
            </div>
          </div>
          <figure className="editorial-photo relative aspect-[16/11] overflow-hidden lg:col-span-5 lg:col-start-8 lg:aspect-[4/5]">
            <Photo id="p33" priority sizes="(min-width: 1600px) 640px, (min-width: 1024px) 42vw, 92vw" position="50% 64%" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 bg-linear-to-t from-black/80 to-transparent px-6 pb-5 pt-16">
              <span className="type-label text-white/85">{copy.level}</span><span className="text-4xl font-semibold leading-none text-white">-2</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="wycena" aria-labelledby="contact-form-title" className="border-b border-white/10 bg-[#101011] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow">{copy.formLabel}</p>
              <h2 id="contact-form-title" data-reveal="" className="mt-7 type-h2 max-w-full">{copy.formTitle}</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">{copy.formText}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-white/75"><FacebookIcon className="size-4 text-brand" />Facebook</a>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-white/75"><InstagramIcon className="size-4 text-brand" />Instagram</a>
              </div>
            </div>
          </div>
          <div data-reveal="" className="lg:border-l lg:border-white/10 lg:col-span-7 lg:col-start-6 lg:pl-10">
            <HomeContactForm locale={locale} />
          </div>
        </div>
      </section>

      <section aria-labelledby="location-title" className="relative overflow-hidden border-b border-white/10 bg-[#080809] py-16 sm:py-20 lg:py-24">
        <div className="shell-wide relative grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="eyebrow">{copy.location}</p>
            <h2 id="location-title" className="mt-7 type-h2 max-w-full">{copy.locationTitle}</h2>
            <p className="mt-6 max-w-md border-l-2 border-brand pl-5 text-base leading-relaxed text-white/80">{copy.directions}</p>
            <address className="mt-7 not-italic text-sm leading-relaxed text-white/70">
              {src.address.lines.map((line) => <span key={line} className="block">{line}</span>)}
            </address>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="group mt-7 inline-flex min-h-11 w-fit items-center gap-3 text-xs font-bold uppercase tracking-widest text-white"><span className="link-draw">{t.openMap}</span><ArrowRight className="arrow-shift size-4 text-brand" /></a>
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
