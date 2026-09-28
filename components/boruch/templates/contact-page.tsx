import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "../site-shell"
import { PageIntro } from "../page-intro"
import { LocationSection } from "../location-section"
import { Photo } from "../photo"
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
      <PageIntro eyebrow={t.nav.contact} title={src.contact.h1} sub={src.contact.sub} />

      <section aria-label={src.address.contactLabel} className="section-md">
        <div className="shell-wide grid gap-px bg-line lg:grid-cols-3">
          <a
            href={contact.phoneHref}
            data-reveal=""
            className="group flex min-h-64 flex-col justify-between gap-10 bg-background p-6 transition-colors hover:bg-ink-warm lg:p-8"
          >
            <span className="type-label text-ash">{t.phoneLabel}</span>
            <span className="type-h1 whitespace-nowrap text-[clamp(1.9rem,3.4vw,3.25rem)] transition-colors group-hover:text-highlight">
              {contact.phone}
            </span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            data-reveal=""
            style={{ "--d": 1 } as React.CSSProperties}
            className="group flex min-h-64 flex-col justify-between gap-10 bg-background p-6 transition-colors hover:bg-ink-warm lg:p-8"
          >
            <span className="type-label text-ash">{t.emailLabel}</span>
            <span className="type-h2 break-all normal-case transition-colors group-hover:text-highlight">{contact.email}</span>
          </a>
          <a
            href={contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal=""
            style={{ "--d": 2 } as React.CSSProperties}
            className="group flex min-h-64 flex-col justify-between gap-10 bg-brand p-6 text-bone transition-colors hover:bg-red-dark lg:p-8"
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
              title={`${t.openMap} — ${src.address.lines.join(", ")}`}
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
