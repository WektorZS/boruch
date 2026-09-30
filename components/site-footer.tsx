import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"

const pageOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]

export function SiteFooter({ locale, alternates }: { locale: Locale; alternates: Record<Locale, string> }) {
  const src = sources[locale]
  const t = ui[locale]
  const footerServices = src.services.groups.flatMap((group) => group.items).slice(0, 6)

  return (
    <footer className="bg-[#050505]">
      <div className="border-y border-white/10 bg-[radial-gradient(circle_at_82%_20%,rgba(225,38,46,.13),transparent_30%),#101011]">
        <div className="shell-wide grid gap-9 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t.nav.contact}</p>
            <h2 className="mt-6 max-w-[15ch] font-display text-[clamp(2.35rem,3.7vw,3.5rem)] font-black uppercase leading-[1.04] tracking-[-.02em]">{src.home.contactTitle}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45">{src.home.contactText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:col-start-9 lg:justify-end">
            <a href={contact.phoneHref} className="home-button home-button-red"><Phone className="size-4" aria-hidden="true" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="home-button home-button-dark"><Mail className="size-4 text-brand" aria-hidden="true" />{contact.email}</a>
          </div>
        </div>
      </div>

      <div className="shell-wide grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href={routes[locale].home} className="font-display text-5xl font-black uppercase tracking-[-.02em]">Boruch<span className="text-brand">.</span></Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/38">{src.meta.home.description}</p>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-7 flex max-w-xs items-start gap-3 border-l border-brand pl-4 text-sm leading-relaxed text-white/58 transition-colors hover:text-white">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <span>{src.address.lines.slice(0, 3).join(", ")}</span>
          </a>
          <ul aria-label={t.language} className="mt-7 flex flex-wrap gap-2">
            {localeOrder.map((code) => (
              <li key={code}><Link href={alternates[code]} hrefLang={localeLabels[code].htmlLang} lang={localeLabels[code].htmlLang} aria-label={localeLabels[code].name} aria-current={code === locale ? "true" : undefined} className="grid h-9 min-w-10 place-items-center border border-white/12 px-2 text-[.6rem] font-bold text-white/42 transition-colors hover:border-white/30 hover:text-white aria-[current=true]:border-white/35 aria-[current=true]:bg-white aria-[current=true]:text-black">{localeLabels[code].short}</Link></li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.navigation} className="lg:col-span-2">
          <p className="mb-5 text-[.6rem] font-bold uppercase tracking-[.18em] text-brand">{t.navigation}</p>
          <ul className="grid gap-3 text-sm text-white/58">
            {pageOrder.map((key) => <li key={key}><Link href={routes[locale][key]} className="transition-colors hover:text-white">{t.nav[key]}</Link></li>)}
          </ul>
        </nav>

        <nav aria-label={t.nav.services} className="lg:col-span-3">
          <p className="mb-5 text-[.6rem] font-bold uppercase tracking-[.18em] text-brand">{t.nav.services}</p>
          <ul className="grid gap-3 text-sm text-white/58">
            {footerServices.map((item) => <li key={item.title}><Link href={routes[locale].services} className="transition-colors hover:text-white">{item.title}</Link></li>)}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 text-sm text-white/58 lg:col-span-3">
          <p className="mb-2 text-[.6rem] font-bold uppercase tracking-[.18em] text-brand">{t.nav.contact}</p>
          <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white"><Phone className="size-4 text-brand" aria-hidden="true" />{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white"><Mail className="size-4 text-brand" aria-hidden="true" />{contact.email}</a>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 border border-white/12 px-4 py-3 text-[.58rem] font-bold uppercase tracking-[.13em] transition-colors hover:border-brand hover:text-white"><InstagramIcon className="size-4 text-brand" />Instagram</a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 border border-white/12 px-4 py-3 text-[.58rem] font-bold uppercase tracking-[.13em] transition-colors hover:border-brand hover:text-white"><FacebookIcon className="size-4 text-brand" />Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="shell-wide flex flex-col gap-4 py-5 text-[.58rem] font-semibold uppercase tracking-[.14em] text-white/28 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BORUCH MYJNIA</span>
          <span>Szczecin / Plac Rodła 8 / PAZIM</span>
          <a href="#top" className="inline-flex items-center gap-2 text-white/55 transition-colors hover:text-white">{t.backToTop}<ArrowUpRight className="size-4 text-brand" aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}
