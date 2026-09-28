import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { siteConfig, breadcrumbJsonLd } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt do BORUCH Myjnia w Szczecinie — telefon, e-mail, adres i rezerwacja online przez Booksy.",
  alternates: {
    canonical: "/kontakt",
    languages: {
      "pl-PL": "/kontakt",
      en: "/en/contact",
      de: "/de/kontakt",
      uk: "/uk/контакти",
      "x-default": "/kontakt",
    },
  },
}

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Strona główna", path: "/" },
              { name: "Kontakt", path: "/kontakt" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Kontakt"
        title="Zapraszamy do naszej hali"
        description="Plac Rodła 8, parking podziemny PAZIM, poziom -2 — w samym centrum Szczecina."
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <dl className="border-t-2 border-foreground">
            <div className="border-b border-border py-6">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Adres</dt>
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
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Telefon</dt>
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
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">E-mail</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all font-heading text-xl font-semibold underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div className="border-b border-border py-6">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Godziny i terminy
              </dt>
              <dd className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
                Aktualne godziny otwarcia oraz dostępne terminy sprawdzisz najszybciej w systemie rezerwacji Booksy —
                kalendarz jest tam zawsze aktualny.
              </dd>
            </div>
          </dl>
          <Button render={<Link href="/booksy" />} size="lg" className="mt-8 h-12 rounded-none px-6">
            Zarezerwuj online
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="relative min-h-80 overflow-hidden bg-secondary lg:min-h-full">
          <iframe
            title="Mapa — BORUCH Myjnia, Plac Rodła 8, Szczecin"
            src="https://www.google.com/maps?q=Plac+Rod%C5%82a+8,+Szczecin,+PAZIM&output=embed"
            className="absolute inset-0 h-full w-full border-0 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}
