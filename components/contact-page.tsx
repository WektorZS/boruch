import { ArrowRight, CalendarCheck, Mail, MapPin, Phone } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { HomeContactForm } from "./home-contact-form"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: t.nav.home, path: routes[locale].home },
              { name: t.nav.contact, path: routes[locale].contact },
            ]),
          ),
        }}
      />

      <section aria-labelledby="page-title" className="relative isolate flex min-h-[680px] items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p28" priority sizes="100vw" position="48% 68%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.98)_0%,rgba(6,6,7,.9)_45%,rgba(6,6,7,.38)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/55" />
        <div className="shell-wide relative z-10 grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-9">
            <p className="eyebrow mb-7">{t.nav.contact}</p>
            <h1 id="page-title" className="page-hero-title type-h1">{src.contact.h1}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/62">{src.contact.sub}</p>
          </div>
          <div className="border-l border-brand pl-6 lg:col-span-3 lg:col-start-10">
            <p className="type-label text-brand">{copy.direct}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/58">{copy.directText}</p>
            <a href={contact.phoneHref} className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-brand">
              <Phone className="size-4 text-brand" aria-hidden="true" />{contact.phone}
            </a>
          </div>
        </div>
      </section>

      <section aria-label={copy.direct} className="border-b border-white/10 bg-[#0b0b0c]">
        <div className="shell-wide grid sm:grid-cols-2 lg:grid-cols-4">
          <ContactLink icon={<Phone className="size-5" />} label={t.phoneLabel} value={contact.phone} href={contact.phoneHref} />
          <ContactLink icon={<Mail className="size-5" />} label={t.emailLabel} value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLink icon={<CalendarCheck className="size-5" />} label={copy.booking} value="Booksy" href={contact.bookingUrl} external />
          <ContactLink icon={<MapPin className="size-5" />} label={copy.location} value="Plac Rodła 8" href={contact.mapsUrl} external />
        </div>
      </section>

      <section aria-labelledby="contact-form-title" className="border-b border-white/10 bg-[#101011] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow">{copy.formLabel}</p>
              <h2 id="contact-form-title" data-reveal="" className="mt-7 max-w-[11ch] font-display text-[clamp(2.5rem,4.2vw,4.4rem)] font-black uppercase leading-[1.02] tracking-[-.025em]">{copy.formTitle}</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/52">{copy.formText}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-[.14em] text-white/68 transition-colors hover:border-brand hover:text-white"><FacebookIcon className="size-4 text-brand" />Facebook</a>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-[.14em] text-white/68 transition-colors hover:border-brand hover:text-white"><InstagramIcon className="size-4 text-brand" />Instagram</a>
              </div>
            </div>
          </div>
          <div data-reveal="" className="border-l border-white/10 pl-0 lg:col-span-7 lg:col-start-6 lg:pl-10">
            <HomeContactForm locale={locale} />
          </div>
        </div>
      </section>

      <section aria-labelledby="location-title" className="relative overflow-hidden border-b border-white/10 bg-[#080809] py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/3 top-1/2 size-[34rem] -translate-y-1/2 rounded-full bg-brand/[.055] blur-[130px]" />
        <div className="shell-wide relative grid overflow-hidden border border-white/10 lg:grid-cols-[.72fr_1.05fr_1.6fr]">
          <div className="relative flex min-h-64 flex-col justify-between border-b border-white/10 bg-[#0b0b0c] p-7 lg:min-h-[30rem] lg:border-b-0 lg:border-r lg:p-9">
            <p className="type-label text-white/45">{copy.level}</p>
            <span className="font-display text-[clamp(6rem,10vw,10rem)] font-black leading-none tracking-[-.06em] text-brand">-2</span>
          </div>
          <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#151516,#120a0b)] p-7 sm:p-10 lg:p-12">
            <p className="eyebrow">{copy.location}</p>
            <h2 id="location-title" className="mt-7 type-h2 max-w-[10ch]">{copy.locationTitle}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/62">{copy.directions}</p>
            <address className="mt-8 border-t border-brand/35 pt-6 not-italic text-sm leading-relaxed text-white/72">
              {src.address.lines.map((line) => <span key={line} className="block">{line}</span>)}
            </address>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-white transition-colors hover:text-brand">{t.openMap}<ArrowRight className="size-4 text-brand" /></a>
          </div>
          <div className="relative min-h-[24rem] overflow-hidden lg:min-h-[30rem]">
            <iframe
              src={MAP_EMBED}
              title={`${t.openMap} - ${src.address.lines.join(", ")}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 opacity-80 [filter:grayscale(.85)_invert(.9)_sepia(.25)_hue-rotate(310deg)_contrast(.95)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#120a0b] to-transparent" />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function ContactLink({ icon, label, value, href, external = false }: { icon: React.ReactNode; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex min-h-40 items-end justify-between gap-5 border-b border-white/10 py-7 sm:px-6 lg:border-b-0 lg:border-r lg:px-7">
      <span className="min-w-0">
        <span className="type-label text-white/38">{label}</span>
        <strong className="mt-3 block break-words text-base font-semibold text-white/84 transition-colors group-hover:text-white">{value}</strong>
      </span>
      <span className="grid size-11 shrink-0 place-items-center border border-white/12 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">{icon}</span>
    </a>
  )
}
