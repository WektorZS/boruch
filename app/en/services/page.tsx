import type { Metadata } from "next"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { PageHero } from "@/components/page-hero"
import { LocaleServiceList } from "@/components/locale-service-list"
import { LocaleCtaBand } from "@/components/locale-cta-band"
import { localeDictionaries, localeRoutes } from "@/lib/translations"
import { breadcrumbJsonLd } from "@/lib/site-config"

const locale = "en"
const dict = localeDictionaries[locale]
const routes = localeRoutes[locale]

export const metadata: Metadata = {
  title: dict.pages.services.title,
  description: dict.pages.services.description,
  alternates: {
    canonical: routes.services,
    languages: {
      "pl-PL": "/uslugi",
      en: "/en/services",
      de: "/de/angebote",
      uk: "/uk/послуги",
      "x-default": "/uslugi",
    },
  },
}

export default function EnglishServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: dict.nav.home, path: routes.home },
              { name: dict.pages.services.eyebrow, path: routes.services },
            ]),
          ),
        }}
      />
      <LocaleHeader locale={locale} dict={dict} />
      <main>
        <PageHero
          eyebrow={dict.pages.services.eyebrow}
          title={dict.pages.services.title}
          description={dict.pages.services.description}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="grid gap-8 py-16 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16 lg:py-24">
            <div>
              <p className="eyebrow text-muted-foreground">{dict.pages.services.carwashLabel}</p>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                {dict.pages.services.carwashTitle}
              </h2>
            </div>
            <LocaleServiceList items={dict.pages.services.carwash} />
          </section>

          <section className="grid gap-8 border-t border-border py-16 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16 lg:py-24">
            <div>
              <p className="eyebrow text-muted-foreground">{dict.pages.services.detailingLabel}</p>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                {dict.pages.services.detailingTitle}
              </h2>
            </div>
            <LocaleServiceList items={dict.pages.services.detailing} />
          </section>
        </div>

        <LocaleCtaBand dict={dict} />
      </main>
      <LocaleFooter locale={locale} dict={dict} />
    </>
  )
}
