import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RevealText } from "./reveal-text"
import { photoSrc, photoSrcSet } from "./photo"
import { ServiceBrowser, type BrowserItem } from "./service-browser"
import { routes, sources, ui, type Locale } from "@/lib/content"
import { formatIndex, serviceGroupTitle, servicePrice, serviceSummary, services } from "@/lib/content/services"
import { photos } from "@/lib/photos"

export function browserItems(locale: Locale): BrowserItem[] {
  const t = ui[locale]
  // Non-Polish sources describe polishing together with paint correction, so it is not listed separately there.
  const list = locale === "pl" ? services : services.filter((s) => s.slug !== "polerowanie")

  return list.map((service, i) => {
    const summary = serviceSummary(locale, service.slug)
    const price = servicePrice(locale, service.slug)
    const meta = photos[service.hero]
    return {
      slug: service.slug,
      index: formatIndex(i + 1),
      title: locale === "pl" ? service.navTitle : (summary?.title ?? service.navTitle),
      text: service.slug === "polerowanie" ? service.source.intro[0] : (summary?.text ?? service.source.intro[0]),
      category: serviceGroupTitle(locale, service.slug),
      price: price ?? t.individualQuote,
      priced: price !== null,
      href: `/${service.slug}`,
      image: { src: photoSrc(service.hero, 960), srcSet: photoSrcSet(service.hero), alt: meta.alt, width: meta.w, height: meta.h },
    }
  })
}

export function ServiceIndexSection({ locale, withHeader = true }: { locale: Locale; withHeader?: boolean }) {
  const t = ui[locale]
  const groups = sources[locale].services.groups

  return (
    <section aria-labelledby={withHeader ? "service-index-title" : undefined} className="section-lg border-t border-line">
      {withHeader && (
        <div className="shell-wide mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">{t.nav.services}</p>
            <RevealText id="service-index-title" text={groups.map((g) => g.title).join(" / ")} className="type-display" />
          </div>
          <Link href={routes[locale].services} className="type-label group flex w-fit items-center gap-3 text-bone">
            <span className="link-draw">{t.allServices}</span>
            <ArrowRight className="arrow-shift size-4" aria-hidden="true" />
          </Link>
        </div>
      )}
      <ServiceBrowser items={browserItems(locale)} labels={{ viewService: t.viewService, priceLabel: t.priceLabel, of: t.of }} />
    </section>
  )
}
