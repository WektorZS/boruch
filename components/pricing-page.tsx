import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"
import type { ServiceSlug } from "@/lib/content/services"
import { cn } from "@/lib/utils"

const otherServiceSlugs: ServiceSlug[] = [
  "czyszczenie-skor",
  "pranie-tapicerki",
  "woskowanie",
  "folia-ppf",
  "korekta-lakieru",
  "powloka-ceramiczna",
]

export function PricingPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const pricing = src.pricing
  const t = ui[locale]

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
            <p className="type-label text-brand">{pricing.packagesTitle}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {pricing.categories.map((category) => <li key={category} className="flex items-center gap-3 text-sm text-white/62"><span className="size-1.5 bg-brand" />{category}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* PAKIETY */}
      <section aria-labelledby="packages-title" className="section-lg border-b border-white/10 bg-[#0a0a0b]">
        <div className="shell-wide flex flex-col gap-10 lg:gap-14">
          <SectionHeading id="packages-title" eyebrow={t.pricing} title={pricing.packagesTitle} />
          <PricingPackages locale={locale} headingId="packages-title" />
        </div>
      </section>

      {/* POZOSTAŁE USŁUGI */}
      <section aria-labelledby="other-title" className="section-lg border-b border-white/10 bg-[#101011]">
        <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow mb-6">{t.nav.services}</p>
              <h2 id="other-title" data-reveal="" className="type-h2 max-w-[12ch] text-balance">{pricing.otherTitle}</h2>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-8">
            <ul className="grid border-b border-white/10 sm:grid-cols-2">
              {pricing.other.map((row, i) => {
                const slug = otherServiceSlugs[i]
                const href = locale === "pl" && slug ? "/" + slug : null
                const content = (
                  <>
                    <span className="type-h3 flex-1 text-pretty">{row.name}</span>
                    <PriceTag value={row.price} size="md" className="shrink-0 text-right" />
                    {href && <ArrowRight className="arrow-shift hidden size-5 shrink-0 text-ash sm:block" aria-hidden="true" />}
                  </>
                )
                const rowClass = "flex h-full flex-wrap items-end gap-x-6 gap-y-5 border-t border-white/10 py-6 transition-colors hover:border-brand/40 sm:flex-nowrap sm:px-5"
                return (
                  <li key={row.name} data-reveal="" style={{ "--d": i % 2 } as React.CSSProperties}>
                    {href ? <Link href={href} className={"group " + rowClass + " transition-colors hover:bg-ink-warm/50"}>{content}</Link> : <div className={rowClass}>{content}</div>}
                  </li>
                )
              })}
            </ul>
            {pricing.otherNote && <p data-reveal="" className="max-w-2xl text-pretty text-sm leading-relaxed text-bone/70 md:text-base">{pricing.otherNote}</p>}
          </div>
        </div>
      </section>

      <div className="shell-wide border-b border-white/10 py-10">
        <Link href={routes[locale].services} className="group flex w-fit items-center gap-4 text-bone">
          <span className="type-label link-draw">{t.allServices}</span>
          <ArrowRight className="arrow-shift size-5" aria-hidden="true" />
        </Link>
      </div>

      {/* REZERWACJA */}
      <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-t border-line">
        <div className="absolute inset-0 -z-10">
          <Photo id="p46" sizes="100vw" className="opacity-35" position="50% 60%" />
          <div className="absolute inset-0 bg-linear-to-r from-[#080809] via-[#080809]/90 to-[#270b0e]/65" />
        </div>
        <div className="shell-wide section-lg grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="flex max-w-4xl flex-col gap-6 lg:col-span-8">
            <p className="eyebrow">{t.book}</p>
            <h2 id="booking-title" data-reveal="" className="type-h1 max-w-[14ch] text-balance">{src.home.contactTitle}</h2>
            <p data-reveal="" style={{ "--d": 2 } as React.CSSProperties} className="type-lead max-w-xl text-pretty text-bone/80">{src.home.contactText}</p>
          </div>
          <div data-reveal="" style={{ "--d": 3 } as React.CSSProperties} className="flex flex-col gap-3 sm:flex-row lg:col-span-3 lg:col-start-10 lg:flex-col">
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group min-h-14 px-7">{t.booksy}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a>
            <a href={contact.phoneHref} className="btn btn-outline min-h-14 px-7"><Phone className="size-4 text-brand" />{contact.phone}</a>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function PricingPackages({ locale, headingId }: { locale: Locale; headingId?: string }) {
  const pricing = sources[locale].pricing
  const t = ui[locale]
  const order = [1, 0, 2]
  const currency = locale === "pl" ? "zł" : "PLN"
  return (
    <div className="flex flex-col">
      <ol aria-labelledby={headingId} className="grid gap-3 lg:grid-cols-3">
        {order.map((idx) => {
          const pkg = pricing.packages[idx]
          if (!pkg) return null
          const featured = Boolean(pkg.popular)
          return (
            <li key={pkg.title} data-reveal="" className={cn("relative flex min-h-full flex-col gap-7 border border-white/10 bg-[#101011] p-6 sm:p-8", featured && "border-brand/45 bg-[radial-gradient(circle_at_100%_0%,rgba(213,43,47,.16),transparent_18rem),#151112]")}>
              {featured && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand" />}
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-[clamp(1.8rem,2.8vw,2.7rem)] font-black uppercase leading-[1.02] tracking-[-.02em]">{pkg.title}</h3>
                  {pkg.popular && <span className="type-label bg-brand px-2 py-1 text-bone">{pkg.popular}</span>}
                </div>
                <p className="text-pretty leading-relaxed text-ash">{pkg.tagline}</p>
              </div>
              <div className="flex flex-1 flex-col gap-4 border-t border-line pt-6">
                {pkg.includedLabel && <p className="type-label text-ash">{pkg.includedLabel}</p>}
                <ul className="flex flex-col gap-2">
                  {pkg.items.map((item) => <li key={item} className="flex gap-3 leading-relaxed text-bone/85"><span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" />{item}</li>)}
                </ul>
                {pkg.discount && <p className="text-sm leading-relaxed text-bone/70">{pkg.discount}</p>}
              </div>
              <div className="flex flex-col gap-2 border-t border-line pt-6">
                {pkg.price && <PriceTag value={pkg.price} />}
                {pkg.note && <p className="type-label text-ash">{pkg.note}</p>}
              </div>
            </li>
          )
        })}
      </ol>
      <div data-reveal="" className="grid gap-8 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
        <p className="type-label text-bone lg:col-span-3">{t.sizes}</p>
        <dl className="grid grid-cols-3 gap-4 lg:col-span-6">
          {[{ label: t.compact, value: "+0" }, { label: t.medium, value: "+10" }, { label: t.large, value: "+30" }].map((row) => (
            <div key={row.label} className="flex flex-col gap-2 border-l border-line pl-4">
              <dt className="type-label text-ash">{row.label}</dt>
              <dd className="flex items-baseline gap-1.5"><span className="font-display text-3xl font-semibold tracking-[-0.03em] [font-stretch:108%] [font-variation-settings:'wdth'_108]">{row.value}</span><span className="type-label text-bone">{currency}</span></dd>
            </div>
          ))}
        </dl>
        <p className="text-pretty text-sm leading-relaxed text-bone/70 lg:col-span-3"><span className="text-highlight">* </span>{pricing.packagesNote}</p>
      </div>
    </div>
  )
}

function PriceTag({ value, className, size = "lg" }: { value: string; className?: string; size?: "lg" | "md" }) {
  const match = value.match(/^(\D*?)\s*([\d][\d\s.,]*)\s*(zł|PLN)?\s*(\*)?$/i)
  if (!match) return <span className={cn("font-display font-semibold [font-stretch:108%] [font-variation-settings:'wdth'_108]", className)}>{value}</span>
  const [, prefix, amount, currency, star] = match
  return (
    <span className={cn("inline-flex items-baseline gap-2 whitespace-nowrap", className)}>
      {prefix && <span className="type-label text-ash">{prefix}</span>}
      <span className={cn("font-display font-semibold leading-none tracking-[-0.035em] [font-stretch:112%] [font-variation-settings:'wdth'_112]", size === "lg" ? "text-[clamp(2.5rem,4vw,3.75rem)]" : "text-[clamp(1.4rem,2.2vw,2rem)]")}>{amount.trim()}</span>
      {currency && <span className="type-label text-bone">{currency}</span>}
      {star && <span className="text-highlight">{star}</span>}
    </span>
  )
}

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="eyebrow">{eyebrow}</p>
      <div className="border-t border-line-strong pt-7"><h2 id={id} data-reveal="" className="type-h2 max-w-[14ch] text-balance">{title}</h2></div>
    </div>
  )
}
