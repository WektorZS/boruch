import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"

const pageOrder: PageKey[] = ["home", "services", "pricing", "gallery", "about", "contact"]

export function SiteFooter({ locale, alternates }: { locale: Locale; alternates: Record<Locale, string> }) {
  const src = sources[locale]
  const t = ui[locale]
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-wine-deep/60 via-ink-warm/30 to-transparent" />

      <div className="shell-wide relative grid gap-14 pt-(--section-md) lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <p className="eyebrow">
            {src.slides[0].title} · {src.slides[0].sub}
          </p>
          <p className="type-h2 max-w-[14ch] text-balance">{src.slides[0].kicker}</p>
          <div className="flex flex-wrap gap-3">
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
              {t.booksy}
              <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
            </a>
            <a href={contact.phoneHref} className="btn btn-outline">
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-6">
          <div className="min-w-0 flex flex-col gap-4">
            <p className="type-label text-ash">{src.address.locationLabel}</p>
            <address className="flex flex-col gap-1 not-italic leading-relaxed text-bone/85">
              {src.address.lines.map((line) => (
                <span key={line} className={line.includes("-2") ? "font-semibold text-bone" : undefined}>
                  {line}
                </span>
              ))}
            </address>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="type-label link-draw w-fit text-bone">
              {t.openMap}
            </a>
          </div>

          <div className="min-w-0 flex flex-col gap-4">
            <p className="type-label text-ash">{src.address.contactLabel}</p>
            <a href={contact.phoneHref} className="link-draw w-fit text-bone/85 hover:text-bone">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="link-draw w-fit break-all text-bone/85 hover:text-bone">
              {contact.email}
            </a>
            <div className="mt-2 flex flex-col gap-2">
              <p className="type-label text-ash">{t.follow}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="type-label link-draw text-bone">
                  Instagram
                </a>
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="type-label link-draw text-bone">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <nav aria-label={t.navigation} className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <p className="type-label text-ash">{t.navigation}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
              {pageOrder.map((key) => (
                <li key={key}>
                  <Link href={routes[locale][key]} className="link-draw text-bone/85 hover:text-bone">
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
            <ul aria-label={t.language} className="mt-3 flex gap-1">
              {localeOrder.map((code) => (
                <li key={code}>
                  <Link
                    href={alternates[code]}
                    hrefLang={localeLabels[code].htmlLang}
                    lang={localeLabels[code].htmlLang}
                    aria-label={localeLabels[code].name}
                    aria-current={code === locale ? "true" : undefined}
                    className="type-label flex h-9 min-w-10 items-center justify-center border border-line px-2 text-ash transition-colors hover:text-bone aria-[current=true]:border-brand aria-[current=true]:text-bone"
                  >
                    {localeLabels[code].short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="shell-wide relative mt-(--section-md) flex items-end justify-between gap-6 border-t border-line py-8">
        <p aria-hidden="true" className="font-display text-[clamp(3.75rem,9vw,8.5rem)] font-semibold uppercase leading-none tracking-[-0.045em] text-bone [font-stretch:125%] [font-variation-settings:'wdth'_125]">
          Boruch
        </p>
        <p className="type-label hidden max-w-48 text-right text-ash sm:block">{src.address.brand.join(" ")}</p>
      </div>

      <div className="shell-wide relative flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-label text-ash">
          © {year} {t.rights}
        </p>
        <p className="type-label text-ash">
          {src.address.lines[0]} - PAZIM {src.address.lines[2]} - {src.address.lines[3]}
        </p>
        <a href="#top" className="type-label link-draw w-fit text-bone">
          {t.backToTop}
        </a>
      </div>
    </footer>
  )
}
