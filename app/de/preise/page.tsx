import type { Metadata } from "next"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { PageHero } from "@/components/page-hero"
import { LocalePriceList } from "@/components/locale-price-list"
import { LocaleCtaBand } from "@/components/locale-cta-band"
import { localeDictionaries, localeRoutes } from "@/lib/translations"
import { breadcrumbJsonLd } from "@/lib/site-config"

const locale = "de"
const dict = localeDictionaries[locale]
const routes = localeRoutes[locale]

export const metadata: Metadata = {
  title: dict.pages.pricing.title,
  description: dict.pages.pricing.description,
  alternates: { canonical: routes.pricing },
}

export default function GermanPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: dict.nav.home, path: routes.home },
              { name: dict.pages.pricing.eyebrow, path: routes.pricing },
            ]),
          ),
        }}
      />
      <LocaleHeader locale={locale} dict={dict} />
      <main>
        <PageHero
          eyebrow={dict.pages.pricing.eyebrow}
          title={dict.pages.pricing.title}
          description={dict.pages.pricing.description}
        />

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <LocalePriceList dict={dict} />
          <p className="mt-14 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {dict.pages.pricing.disclaimer}
          </p>
        </section>

        <LocaleCtaBand dict={dict} />
      </main>
      <LocaleFooter locale={locale} dict={dict} />
    </>
  )
}
