import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"

const MAP_EMBED = "https://www.google.com/maps?q=Plac+Rod%C5%82a+8,+70-419+Szczecin&z=16&output=embed"

export function ContactPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

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
      <section aria-labelledby="page-title" className="relative isolate pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="shell-wide grid gap-7 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3"><p className="eyebrow">{t.nav.contact}</p></div>
          <div className="flex min-w-0 flex-col gap-7 lg:col-span-8 lg:col-start-5">
            <h1 id="page-title" data-reveal="" className="type-h1 max-w-[16ch] text-balance">{src.contact.h1}</h1>
            <div className="grid gap-6 border-t border-line pt-6">
              <p className="type-lead max-w-2xl text-pretty text-bone/75">{src.contact.sub}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={src.address.contactLabel} className="section-md">
        <div className="shell-wide grid gap-px bg-line lg:grid-cols-3">
          <a
            href={contact.phoneHref}
            data-reveal=""
            className="group flex min-h-56 flex-col justify-between gap-10 bg-ink-2 p-6 transition-colors hover:bg-ink-warm lg:p-8"
          >
            <span className="type-label text-ash">{t.phoneLabel}</span>
            <span className="type-h3 whitespace-nowrap transition-colors group-hover:text-highlight">
              {contact.phone}
            </span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            data-reveal=""
            style={{ "--d": 1 } as React.CSSProperties}
            className="group flex min-h-56 flex-col justify-between gap-10 bg-ink-2 p-6 transition-colors hover:bg-ink-warm lg:p-8"
          >
            <span className="type-label text-ash">{t.emailLabel}</span>
            <span className="type-h3 break-all transition-colors group-hover:text-highlight">{contact.email}</span>
          </a>
          <a
            href={contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal=""
            style={{ "--d": 2 } as React.CSSProperties}
            className="group flex min-h-56 flex-col justify-between gap-10 bg-wine p-6 text-bone transition-colors hover:bg-red-dark lg:p-8"
          >
            <span className="type-label flex items-center justify-between text-bone">
              Booksy
              <ArrowUpRight className="arrow-lift size-5" aria-hidden="true" />
            </span>
            <span className="type-h2">{t.booksy}</span>
          </a>
        </div>
      </section>

      <LocationSection locale={locale} />

      <section aria-label={t.openMap} className="border-t border-line">
        <div className="grid lg:grid-cols-12">
          <div data-reveal="mask" className="frame aspect-[4/3] lg:col-span-5 lg:aspect-auto">
            <Photo id="p28" sizes="(min-width: 1024px) 42vw, 100vw" position="42% 70%" />
          </div>
          <div className="relative aspect-[4/3] lg:col-span-7 lg:aspect-[16/11]">
            <iframe
              src={MAP_EMBED}
              title={`${t.openMap} - ${src.address.lines.join(", ")}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 opacity-85 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function LocationSection({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[3]

  return (
    <section aria-labelledby="location-title" className="surface-wine relative overflow-hidden border-t border-line-wine">
      <div className="shell-wide section-lg grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <p className="eyebrow">{slide.kicker}</p>
          <h2 id="location-title" data-reveal="" className="type-h2 max-w-[16ch] text-balance">{slide.title} {slide.sub}</h2>
          <div data-reveal="" className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <address className="flex flex-col gap-1 not-italic">
              <span className="type-label mb-2 text-ash">{src.address.locationLabel}</span>
              {src.address.lines.map((line) => <span key={line} className="type-h3 font-medium">{line}</span>)}
            </address>
            <div className="flex flex-col gap-3">
              <span className="type-label mb-1 text-ash">{src.address.contactLabel}</span>
              <a href={contact.phoneHref} className="link-draw w-fit text-lg">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="link-draw w-fit break-all">{contact.email}</a>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline group mt-3 w-fit">
                {t.openMap}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="relative flex min-h-64 flex-col items-center justify-center border border-line-wine bg-ink/35 p-8 lg:col-span-4 lg:col-start-9 lg:min-h-96">
          <span className="type-label mb-2 text-ash">PAZIM - {t.level}</span>
          <span data-reveal="" className="font-display text-[clamp(7rem,18vw,13rem)] font-semibold leading-none tracking-[-0.06em] text-bone [font-stretch:112%] [font-variation-settings:'wdth'_112]">-2</span>
        </div>
      </div>
    </section>
  )
}
