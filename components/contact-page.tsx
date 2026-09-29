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
      <section aria-labelledby="page-title" className="relative isolate flex min-h-[560px] items-end overflow-hidden border-b border-line pt-(--header-h)">
        <div className="enter-unmask frame absolute inset-0 border-0"><Photo id="p28" priority sizes="100vw" position="42% 70%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,.97)_0%,rgba(7,7,7,.8)_50%,rgba(7,7,7,.42)_100%)]" />
        <div className="shell-wide relative z-10 pb-14 lg:pb-16">
          <p className="eyebrow mb-7">{t.nav.contact}</p>
          <h1 id="page-title" className="type-h1 max-w-[13ch] text-balance">{src.contact.h1}</h1>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-bone/70">{src.contact.sub}</p>
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

      <section aria-labelledby="location-title" className="section-lg border-t border-line bg-wine-deep/20">
        <div className="shell-wide grid gap-3 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 border border-line bg-ink-2 p-6 sm:p-8 lg:col-span-5">
            <div><p className="eyebrow mb-6">{src.slides[3].kicker}</p><h2 id="location-title" className="type-h2 max-w-[12ch]">{src.slides[3].title} {src.slides[3].sub}</h2></div>
            <address className="flex flex-col gap-2 border-t border-line pt-6 not-italic">
              {src.address.lines.map((line) => <span key={line} className="text-lg font-semibold text-bone/85">{line}</span>)}
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline group mt-4 w-fit">{t.openMap}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a>
            </address>
          </div>
          <div className="relative aspect-[4/3] border border-line lg:col-span-7 lg:aspect-[16/10]">
            <iframe
              src={MAP_EMBED}
              title={`${t.openMap} - ${src.address.lines.join(", ")}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 opacity-75 [filter:grayscale(1)_invert(0.92)_sepia(.2)_hue-rotate(310deg)_contrast(.95)]"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
