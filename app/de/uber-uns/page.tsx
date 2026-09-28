import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { PageHero } from "@/components/page-hero"
import { LocaleCtaBand } from "@/components/locale-cta-band"
import { localeDictionaries, localeRoutes } from "@/lib/translations"
import { siteConfig, breadcrumbJsonLd } from "@/lib/site-config"

const locale = "de"
const dict = localeDictionaries[locale]
const routes = localeRoutes[locale]

export const metadata: Metadata = {
  title: dict.pages.about.title,
  description: dict.pages.about.description,
  alternates: {
    canonical: routes.about,
    languages: {
      "pl-PL": "/o-nas",
      en: "/en/about-us",
      de: "/de/uber-uns",
      uk: "/uk/про-нас",
      "x-default": "/o-nas",
    },
  },
}

export default function GermanAboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: dict.nav.home, path: routes.home },
              { name: dict.pages.about.eyebrow, path: routes.about },
            ]),
          ),
        }}
      />
      <LocaleHeader locale={locale} dict={dict} />
      <main>
        <PageHero
          eyebrow={dict.pages.about.eyebrow}
          title={dict.pages.about.title}
          description={dict.pages.about.description}
        />

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
          <div className="relative aspect-[4/5] overflow-hidden border border-border">
            <Image
              src="/images/home/hero-4-boruch-myjnia.jpg"
              alt={dict.about.title}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-5">
            {dict.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-pretty leading-relaxed text-foreground/80">
                {paragraph}
              </p>
            ))}

            <div className="mt-4 flex flex-col gap-4 border-t border-border pt-6">
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm hover:text-primary"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </a>
              <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-sm hover:text-primary">
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm hover:text-primary">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </section>

        <LocaleCtaBand dict={dict} />
      </main>
      <LocaleFooter locale={locale} dict={dict} />
    </>
  )
}
