import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { localeDictionaries, localeRoutes } from "@/lib/translations"
import { siteConfig, breadcrumbJsonLd } from "@/lib/site-config"

const locale = "uk"
const dict = localeDictionaries[locale]
const routes = localeRoutes[locale]

export const metadata: Metadata = {
  title: dict.pages.contact.title,
  description: dict.pages.contact.description,
  alternates: {
    canonical: routes.contact,
    languages: {
      "pl-PL": "/kontakt",
      en: "/en/contact",
      de: "/de/kontakt",
      uk: "/uk/контакти",
      "x-default": "/kontakt",
    },
  },
}

export default function UkrainianContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: dict.nav.home, path: routes.home },
              { name: dict.pages.contact.eyebrow, path: routes.contact },
            ]),
          ),
        }}
      />
      <LocaleHeader locale={locale} dict={dict} />
      <main>
        <PageHero
          eyebrow={dict.pages.contact.eyebrow}
          title={dict.pages.contact.title}
          description={dict.pages.contact.description}
        />

        <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <dl className="border-t-2 border-foreground">
              <div className="border-b border-border py-6">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {dict.contact.locationLabel}
                </dt>
                <dd className="mt-2">
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xl font-semibold leading-snug underline-offset-4 hover:underline"
                  >
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </a>
                </dd>
              </div>
              <div className="border-b border-border py-6">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {dict.nav.book}
                </dt>
                <dd className="mt-2">
                  <a
                    href={siteConfig.phoneHref}
                    className="font-heading text-xl font-semibold underline-offset-4 hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div className="border-b border-border py-6">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {dict.contact.contactLabel}
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all font-heading text-xl font-semibold underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
            <Button
              render={<Link href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="mt-8 h-12 rounded-none px-6"
            >
              {dict.bookOnline}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="relative min-h-80 overflow-hidden bg-secondary lg:min-h-full">
            <iframe
              title={dict.pages.contact.title}
              src="https://www.google.com/maps?q=Plac+Rod%C5%82a+8,+Szczecin,+PAZIM&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <LocaleFooter locale={locale} dict={dict} />
    </>
  )
}
