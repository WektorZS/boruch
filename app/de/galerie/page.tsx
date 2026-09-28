import type { Metadata } from "next"
import { LocaleHeader } from "@/components/locale-header"
import { LocaleFooter } from "@/components/locale-footer"
import { PageHero } from "@/components/page-hero"
import { GalleryGrid } from "@/components/gallery-grid"
import { LocaleCtaBand } from "@/components/locale-cta-band"
import { localeDictionaries, localeRoutes } from "@/lib/translations"
import { breadcrumbJsonLd } from "@/lib/site-config"
import { galleryImages } from "@/lib/gallery-data"

const locale = "de"
const dict = localeDictionaries[locale]
const routes = localeRoutes[locale]

export const metadata: Metadata = {
  title: dict.pages.gallery.title,
  description: dict.pages.gallery.description,
  alternates: {
    canonical: routes.gallery,
    languages: {
      "pl-PL": "/galeria",
      en: "/en/gallery",
      de: "/de/galerie",
      uk: "/uk/галерея",
      "x-default": "/galeria",
    },
  },
}

export default function GermanGalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: dict.nav.home, path: routes.home },
              { name: dict.pages.gallery.eyebrow, path: routes.gallery },
            ]),
          ),
        }}
      />
      <LocaleHeader locale={locale} dict={dict} />
      <main>
        <PageHero
          eyebrow={dict.pages.gallery.eyebrow}
          title={dict.pages.gallery.title}
          description={dict.pages.gallery.description}
        />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <GalleryGrid images={galleryImages} />
        </section>

        <LocaleCtaBand dict={dict} />
      </main>
      <LocaleFooter locale={locale} dict={dict} />
    </>
  )
}
