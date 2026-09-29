import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"

const pageOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]

export function SiteFooter({ locale, alternates }: { locale: Locale; alternates: Record<Locale, string> }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <footer className="border-t border-line bg-[#050505]">
      <div className="shell-wide grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Link href={routes[locale].home} className="flex w-fit items-center gap-3" aria-label={`BORUCH - ${t.nav.home}`}>
            <span aria-hidden="true" className="grid size-10 place-items-center bg-brand font-display text-2xl font-black [font-stretch:75%] [font-variation-settings:'wdth'_75]">B</span>
            <span className="flex flex-col leading-none"><span className="font-display text-2xl font-black uppercase [font-stretch:80%] [font-variation-settings:'wdth'_80]">Boruch</span><span className="type-label mt-1 text-[0.5rem] text-ash">Myjnia - detailing</span></span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-ash">{src.home.contactText}</p>
          <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group w-fit">{t.book}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a>
        </div>

        <nav aria-label={t.navigation} className="lg:col-span-2 lg:col-start-6">
          <p className="type-label mb-5 text-highlight">{t.navigation}</p>
          <ul className="flex flex-col gap-3">
            {pageOrder.map((key) => <li key={key}><Link href={routes[locale][key]} className="text-sm text-bone/75 transition-colors hover:text-bone">{t.nav[key]}</Link></li>)}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 lg:col-span-3">
          <p className="type-label text-highlight">{src.address.contactLabel}</p>
          <address className="flex flex-col gap-4 not-italic text-sm text-bone/75">
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 transition-colors hover:text-bone"><MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /><span>{src.address.lines.join(", ")}</span></a>
            <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-bone"><Phone className="size-4 text-brand" aria-hidden="true" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-bone"><Mail className="size-4 shrink-0 text-brand" aria-hidden="true" />{contact.email}</a>
          </address>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <p className="type-label text-highlight">{t.language}</p>
          <ul className="flex flex-wrap gap-2">
            {localeOrder.map((code) => (
              <li key={code}><Link href={alternates[code]} hrefLang={localeLabels[code].htmlLang} lang={localeLabels[code].htmlLang} aria-label={localeLabels[code].name} aria-current={code === locale ? "true" : undefined} className="type-label grid h-9 min-w-10 place-items-center border border-line px-2 text-ash transition-colors hover:border-line-strong hover:text-bone aria-[current=true]:border-brand aria-[current=true]:text-bone">{localeLabels[code].short}</Link></li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-2">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-bone/75 hover:text-bone">Instagram</a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-bone/75 hover:text-bone">Facebook</a>
          </div>
        </div>
      </div>

      <div className="shell-wide flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-label text-ash">© {new Date().getFullYear()} BORUCH</p>
        <a href="#top" className="type-label text-bone/70 transition-colors hover:text-bone">{t.backToTop}</a>
      </div>
    </footer>
  )
}
