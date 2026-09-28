import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "../site-shell"
import { PageIntro } from "../page-intro"
import { PriceTag, PricingPackages } from "../pricing-packages"
import { SectionHeading } from "../section-heading"
import { BookingCta } from "../booking-cta"
import { breadcrumbJsonLd, routes, sources, ui, type Locale } from "@/lib/content"
import { formatIndex, type ServiceSlug } from "@/lib/content/services"

/** Source order of "Pozostałe usługi" rows mapped to the PL service pages they describe. */
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
      <PageIntro eyebrow={t.nav.pricing} title={pricing.h1} sub={pricing.sub}>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {pricing.categories.map((category, i) => (
            <li key={category} className="type-label flex items-center gap-3 text-bone">
              <span className="text-ash">{formatIndex(i + 1)}</span>
              {category}
            </li>
          ))}
        </ul>
      </PageIntro>

      <section aria-labelledby="packages-title" className="section-lg">
        <div className="shell-wide flex flex-col gap-10 lg:gap-14">
          <SectionHeading id="packages-title" eyebrow={t.pricing} title={pricing.packagesTitle} />
          <PricingPackages locale={locale} headingId="packages-title" />
        </div>
      </section>

      <section aria-labelledby="other-title" className="section-lg border-t border-line bg-ink-2">
        <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow mb-6">{t.nav.services}</p>
              <h2 id="other-title" data-reveal="" className="type-h2 max-w-[12ch] text-balance">{pricing.otherTitle}</h2>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-8">
            <ul className="border-t border-line-strong">
              {pricing.other.map((row, i) => {
                const slug = otherServiceSlugs[i]
                const href = locale === "pl" && slug ? `/${slug}` : null
                const content = (
                  <>
                    <span className="type-index text-xs text-ash">{formatIndex(i + 1)}</span>
                    <span className="type-h3 flex-1 text-pretty">{row.name}</span>
                    <PriceTag value={row.price} size="md" className="shrink-0 text-right" />
                    {href && <ArrowRight className="arrow-shift hidden size-5 shrink-0 text-ash sm:block" aria-hidden="true" />}
                  </>
                )
                const rowClass = "flex flex-wrap items-baseline gap-x-6 gap-y-3 py-7 sm:flex-nowrap md:px-3"
                return (
                  <li key={row.name} data-reveal="" style={{ "--d": i % 3 } as React.CSSProperties} className="border-b border-line">
                    {href ? (
                      <Link href={href} className={`group ${rowClass} transition-colors hover:bg-ink-warm/50`}>
                        {content}
                      </Link>
                    ) : (
                      <div className={rowClass}>{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
            {pricing.otherNote && (
              <p data-reveal="" className="max-w-2xl text-pretty text-sm leading-relaxed text-bone/70 md:text-base">
                {pricing.otherNote}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="shell-wide section-md border-t border-line">
        <Link href={routes[locale].services} className="group flex w-fit items-center gap-4 text-bone">
          <span className="type-label link-draw">{t.allServices}</span>
          <ArrowRight className="arrow-shift size-5" aria-hidden="true" />
        </Link>
      </div>
      <BookingCta locale={locale} photo="p51" />
    </SiteShell>
  )
}
