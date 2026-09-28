import { Fragment } from "react"
import type { Metadata } from "next"
import { SiteShell } from "../site-shell"
import { Photo, photoSrc } from "../photo"
import { BookingCta } from "../booking-cta"
import { ServiceHero } from "../service/service-hero"
import { ServiceIntro } from "../service/service-intro"
import { ServiceProcess } from "../service/service-process"
import { ServiceSection } from "../service/service-section"
import { ServiceRelated } from "../service/service-related"
import { contact, localeOrder, routes, type Locale } from "@/lib/content"
import { getService, servicePrice, type ServiceSlug } from "@/lib/content/services"
import { siteConfig } from "@/lib/site-config"

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const { source } = getService(slug)
  return {
    title: { absolute: source.meta.title },
    description: source.meta.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: source.meta.title,
      description: source.meta.description,
      url: `https://boruchmyjnia.pl/${slug}`,
      images: [{ url: photoSrc(getService(slug).hero, 1600) }],
    },
  }
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug)
  const { sections } = service.source
  const breakAfter = Math.min(1, sections.length - 1)
  const alternates = Object.fromEntries(
    localeOrder.map((code) => [code, code === "pl" ? `/${slug}` : routes[code].services]),
  ) as Record<Locale, string>
  const price = servicePrice("pl", slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navTitle,
    description: service.source.meta.description,
    url: `https://boruchmyjnia.pl/${slug}`,
    areaServed: siteConfig.city,
    provider: { "@id": "https://boruchmyjnia.pl/#business" },
    ...(price ? { offers: { "@type": "Offer", priceCurrency: "PLN", description: price, url: contact.bookingUrl } } : {}),
  }

  return (
    <SiteShell locale="pl" page="services" alternates={alternates}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceHero service={service} />
      <ServiceIntro service={service} />
      <ServiceProcess service={service} />
      {sections.map((section, i) => (
        <Fragment key={section.heading}>
          <ServiceSection service={service} section={section} id={`section-${i + 1}`} />
          {i === breakAfter && (
            <div className="shell-wide grid pb-4 lg:grid-cols-12">
              <div data-reveal="mask" className="frame aspect-[4/3] lg:col-span-9 lg:col-start-4 lg:aspect-[16/8]">
                <Photo id={service.frames[2]} sizes="(min-width: 1024px) 75vw, 100vw" />
              </div>
            </div>
          )}
        </Fragment>
      ))}
      <ServiceRelated service={service} />
      <BookingCta locale="pl" />
    </SiteShell>
  )
}
