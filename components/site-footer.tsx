import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"
import { services } from "@/lib/content/services"

const pageOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]

export function SiteFooter({ locale, alternates, showContactCta = true }: { locale: Locale; alternates: Record<Locale, string>; showContactCta?: boolean }) {
  const src = sources[locale]
  const t = ui[locale]
  const footerServices = src.services.groups.flatMap((group) => group.items).slice(0, 6)

  return (
    <footer className="border-t border-white/10 bg-[#080809]">
      {showContactCta && <div className="border-b border-white/10 bg-[#101011]">
        <div className="shell-wide grid gap-9 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t.nav.contact}</p>
            <h2 className="mt-6 type-h2">{src.home.contactTitle}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65">{src.home.contactText}</p>
          </div>
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:col-span-4 lg:col-start-9 lg:flex-col xl:col-span-5 xl:col-start-8 xl:items-end">
            <a href={contact.phoneHref} className="home-button home-button-red"><Phone className="size-4" aria-hidden="true" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="home-button home-button-dark"><Mail className="size-4 text-brand" aria-hidden="true" />{contact.email}</a>
          </div>
        </div>
      </div>}

      <div className="shell-wide grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Link prefetch={false} href={routes[locale].home} className="inline-flex flex-col font-display font-black uppercase tracking-normal"><span className="footer-wordmark">Boruch</span><span className="mt-2 text-xs font-semibold tracking-[.25em] text-white/65">Myjnia / Detailing</span></Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{src.meta.home.description}</p>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="group mt-8 flex max-w-sm items-center gap-5 border-l border-brand pl-5 text-sm leading-relaxed text-white/65 transition-colors hover:text-white">
            <span className="shrink-0 font-display text-4xl font-bold leading-none text-brand" aria-hidden="true">-2</span>
            <span>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-bone"><MapPin className="size-3.5" aria-hidden="true" />PAZIM / {t.level} -2</span>
              <span className="mt-2 block">{src.address.lines[0]}<br />{src.address.lines[3]}</span>
            </span>
          </a>
          <ul aria-label={t.language} className="mt-7 flex flex-wrap gap-2">
            {localeOrder.map((code) => (
              <li key={code}><Link prefetch={false} href={alternates[code]} hrefLang={localeLabels[code].htmlLang} lang={localeLabels[code].htmlLang} aria-label={`${localeLabels[code].short} - ${localeLabels[code].name}`} aria-current={code === locale ? "true" : undefined} className="grid h-9 min-w-10 place-items-center border border-white/12 px-2 text-[.72rem] font-bold text-white/65 transition-colors hover:border-white/30 hover:text-white aria-[current=true]:border-white/35 aria-[current=true]:bg-white aria-[current=true]:text-black">{localeLabels[code].short}</Link></li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.navigation} className="lg:col-span-2">
          <p className="mb-5 text-[.72rem] font-bold uppercase tracking-[.18em] text-white/80">{t.navigation}</p>
          <ul className="grid gap-3 text-sm text-white/58">
            {pageOrder.map((key) => <li key={key}><Link prefetch={false} href={routes[locale][key]} className="link-draw inline-block max-w-full py-1 hyphens-auto [overflow-wrap:anywhere] transition-colors hover:text-white">{t.nav[key]}</Link></li>)}
          </ul>
        </nav>

        <nav aria-label={t.nav.services} className="lg:col-span-3">
          <p className="mb-5 text-[.72rem] font-bold uppercase tracking-[.18em] text-white/80">{t.nav.services}</p>
          <ul className="grid gap-3 text-sm text-white/58">
            {footerServices.map((item) => <li key={item.title}><Link prefetch={false} href={locale === "pl" && services.some(service => service.slug === item.slug) ? `/${item.slug}` : routes[locale].services} className="link-draw inline-block max-w-full py-1 hyphens-auto [overflow-wrap:anywhere] transition-colors hover:text-white">{item.title}</Link></li>)}
          </ul>
        </nav>

        <div className="col-span-2 flex flex-col gap-3 text-sm text-white/58 lg:col-span-3">
          <p className="mb-2 text-[.72rem] font-bold uppercase tracking-[.18em] text-white/80">{t.nav.contact}</p>
          <a href={contact.phoneHref} className="flex min-h-8 items-center gap-3 transition-colors hover:text-white"><Phone className="size-4 text-brand" aria-hidden="true" /><span className="whitespace-nowrap">{contact.phone}</span></a>
          <a href={`mailto:${contact.email}`} className="flex min-h-8 items-center gap-3 transition-colors hover:text-white"><Mail className="size-4 text-brand" aria-hidden="true" /><span className="min-w-0 break-all">{contact.email}</span></a>
          <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="group mt-1 inline-flex min-h-10 w-fit items-center gap-3 font-semibold text-bone"><span className="link-draw">{t.book}</span><ArrowUpRight className="arrow-lift size-4 text-brand" aria-hidden="true" /></a>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5 text-xs font-semibold transition-colors hover:text-white"><InstagramIcon className="size-4" />Instagram</a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5 text-xs font-semibold transition-colors hover:text-white"><FacebookIcon className="size-4" />Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 bg-[#111112]">
        <div className="shell-wide flex flex-col gap-4 py-5 text-[.72rem] font-semibold uppercase tracking-[.14em] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BORUCH MYJNIA</span>
          <span>Szczecin / Plac Rodła 8 / PAZIM</span>
          <a href="#top" className="group inline-flex min-h-8 w-fit items-center gap-2 text-white/65 transition-colors hover:text-white">{t.backToTop}<ArrowUpRight className="arrow-lift size-4 text-brand" aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}
