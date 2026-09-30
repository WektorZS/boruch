import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { breadcrumbJsonLd, routes, sources, ui, type Locale } from "@/lib/content"
import { servicePrice, type ServiceSlug } from "@/lib/content/services"

const packageBySlug: Partial<Record<ServiceSlug, number>> = {
  "czyszczenie-wnetrza": 0,
  "mycie-zewnatrz": 1,
  komplet: 2,
}

const tableCopy = {
  pl: { title: "Pełny cennik usług", intro: "Wszystkie usługi z naszej oferty w jednym miejscu. Przy pracach zależnych od stanu auta cenę potwierdzamy po krótkich oględzinach.", service: "Usługa", scope: "Zakres usługi", details: "Zobacz usługę", noDetails: "Szczegóły ustalamy indywidualnie" },
  en: { title: "Complete price list", intro: "All services from our offer in one place. For work depending on the condition of the car, we confirm the price after a short inspection.", service: "Service", scope: "Scope", details: "View service", noDetails: "Details agreed individually" },
  de: { title: "Vollständige Preisliste", intro: "Alle Leistungen aus unserem Angebot an einem Ort. Bei Arbeiten, deren Preis vom Fahrzeugzustand abhängt, bestätigen wir ihn nach einer kurzen Besichtigung.", service: "Leistung", scope: "Leistungsumfang", details: "Leistung ansehen", noDetails: "Details nach Absprache" },
  uk: { title: "Повний прайс-лист", intro: "Усі послуги з нашої пропозиції в одному місці. Для робіт, вартість яких залежить від стану авто, ціну підтверджуємо після короткого огляду.", service: "Послуга", scope: "Обсяг робіт", details: "Переглянути послугу", noDetails: "Деталі узгоджуємо індивідуально" },
} satisfies Record<Locale, Record<string, string>>

export function PricingPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const pricing = src.pricing
  const t = ui[locale]
  const copy = tableCopy[locale]
  const currency = locale === "pl" ? "zł" : "PLN"

  return (
    <SiteShell locale={locale} page="pricing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: t.nav.home, path: routes[locale].home },
              { name: t.nav.pricing, path: routes[locale].pricing },
            ]),
          ),
        }}
      />

      <section aria-labelledby="page-title" className="relative isolate flex min-h-[660px] items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p51" priority sizes="100vw" position="55% 58%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.98)_0%,rgba(6,6,7,.9)_50%,rgba(6,6,7,.38)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
        <div className="shell-wide relative z-10 grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-7">{t.nav.pricing}</p>
            <h1 id="page-title" className="type-h1 max-w-[18ch] text-balance">{pricing.h1}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/62">{pricing.sub}</p>
          </div>
          <div className="border-l border-brand pl-6 lg:col-span-3 lg:col-start-10">
            <p className="type-label text-brand">{copy.title}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {src.services.groups.map((group) => <li key={group.title} className="flex items-center gap-3 text-sm text-white/62"><span className="size-1.5 bg-brand" />{group.title}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="price-list-title" className="border-b border-white/10 bg-[#0a0a0b] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide">
          <div className="grid gap-7 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">{t.nav.pricing}</p>
              <h2 id="price-list-title" className="mt-6 type-h2 max-w-[16ch] text-balance">{copy.title}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/52 lg:col-span-5 lg:text-base">{copy.intro}</p>
          </div>

          <div className="grid border-b border-white/10 py-8 lg:grid-cols-12 lg:items-center">
            <p className="type-label mb-6 text-white/55 lg:col-span-3 lg:mb-0">{t.sizes}</p>
            <dl className="grid grid-cols-3 lg:col-span-6">
              {[
                { label: t.compact, value: "0" },
                { label: t.medium, value: "+10" },
                { label: t.large, value: "+30" },
              ].map((row) => (
                <div key={row.label} className="border-l border-white/12 px-4 first:border-l-0 first:pl-0 sm:px-6 sm:first:pl-0">
                  <dt className="text-[.58rem] font-bold uppercase tracking-[.14em] text-white/38">{row.label}</dt>
                  <dd className="mt-2 flex items-baseline gap-1.5"><strong className="font-display text-2xl font-bold tracking-[-.02em]">{row.value}</strong><span className="text-[.6rem] font-bold uppercase text-white/45">{currency}</span></dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-white/38 lg:col-span-3 lg:mt-0">{pricing.packagesNote}</p>
          </div>

          <div className="flex flex-col">
            {src.services.groups.map((group, groupIndex) => (
              <section key={group.title} aria-labelledby={`price-group-${groupIndex}`} className="border-b border-white/10 py-12 last:border-b-0 lg:py-16">
                <div className="mb-7 flex items-end justify-between gap-6">
                  <h3 id={`price-group-${groupIndex}`} className="font-display text-[clamp(2rem,3.4vw,3.25rem)] font-black uppercase leading-none tracking-[-.02em]">{group.title}</h3>
                </div>

                <div className="border-t border-white/12">
                  <div className="hidden grid-cols-[minmax(14rem,1.05fr)_minmax(22rem,1.8fr)_11rem_3rem] gap-6 border-b border-white/12 py-4 text-[.58rem] font-bold uppercase tracking-[.15em] text-white/35 lg:grid">
                    <span>{copy.service}</span>
                    <span>{copy.scope}</span>
                    <span className="text-right">{t.priceLabel}</span>
                    <span aria-hidden="true" />
                  </div>
                  <ol>
                    {group.items.map((item, index) => {
                      const slug = item.slug as ServiceSlug
                      const price = servicePrice(locale, slug) ?? t.individualQuote
                      const packageIndex = packageBySlug[slug]
                      const pkg = packageIndex === undefined ? null : pricing.packages[packageIndex]
                      const href = locale === "pl" ? `/${slug}` : null
                      const row = (
                        <>
                          <div>
                            <span className="mb-2 block text-[.56rem] font-bold uppercase tracking-[.14em] text-brand lg:hidden">{copy.service}</span>
                            <strong className="font-display text-[clamp(1.4rem,2vw,1.85rem)] font-bold uppercase leading-[1.08] tracking-[-.012em] text-white/92">{item.title}</strong>
                          </div>
                          <div>
                            <span className="mb-2 block text-[.56rem] font-bold uppercase tracking-[.14em] text-white/35 lg:hidden">{copy.scope}</span>
                            <p className="text-sm leading-relaxed text-white/48">{item.text}</p>
                            {pkg && <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-relaxed text-white/65">{pkg.items.map((included) => <li key={included} className="flex items-center gap-2"><span className="size-1 bg-brand" />{included}</li>)}</ul>}
                          </div>
                          <div className="lg:text-right">
                            <span className="mb-2 block text-[.56rem] font-bold uppercase tracking-[.14em] text-white/35 lg:hidden">{t.priceLabel}</span>
                            <strong className="text-sm font-bold uppercase tracking-[.05em] text-white/85">{price}</strong>
                          </div>
                          <div className="flex items-end justify-end">
                            {href ? <ArrowRight className="size-5 text-brand transition-transform group-hover:translate-x-1" aria-label={copy.details} /> : <span className="sr-only">{copy.noDetails}</span>}
                          </div>
                        </>
                      )
                      const rowClass = "group grid gap-6 border-b border-white/10 py-7 last:border-b-0 lg:grid-cols-[minmax(14rem,1.05fr)_minmax(22rem,1.8fr)_11rem_3rem] lg:items-start lg:gap-6 lg:py-8"
                      return <li key={item.slug} data-reveal="" style={{ "--d": index % 3 } as React.CSSProperties}>{href ? <Link href={href} className={rowClass}>{row}</Link> : <div className={rowClass}>{row}</div>}</li>
                    })}
                  </ol>
                </div>
              </section>
            ))}
          </div>

          {pricing.otherNote && <p className="max-w-3xl border-l border-brand pl-5 text-sm leading-relaxed text-white/50">{pricing.otherNote}</p>}
        </div>
      </section>
    </SiteShell>
  )
}
