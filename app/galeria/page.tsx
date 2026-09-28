import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { GalleryGrid } from "@/components/gallery-grid"
import { CtaBand } from "@/components/cta-band"
import { galleryImages } from "@/lib/gallery-data"
import { breadcrumbJsonLd } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Galeria",
  description: "Zobacz realizacje BORUCH Myjnia — mycie ręczne, detailing i pielęgnację samochodów w Szczecinie.",
  alternates: { canonical: "/galeria" },
}

export default function GaleriaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Strona główna", path: "/" },
              { name: "Galeria", path: "/galeria" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Galeria"
        title="Efekty naszej pracy"
        description="Kilka zdjęć z naszej hali w Szczecinie — realizacje mycia ręcznego, czyszczenia wnętrz i detailingu."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <GalleryGrid images={galleryImages} />
      </section>

      <CtaBand />
    </>
  )
}
