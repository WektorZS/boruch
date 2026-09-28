import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { GalleryGrid } from "@/components/gallery-grid"
import { CtaBand } from "@/components/cta-band"
import { galleryImages } from "@/lib/gallery-data"

export const metadata: Metadata = {
  title: "Galeria",
  description: "Zobacz realizacje BORUCH Myjnia — mycie ręczne, detailing i pielęgnację samochodów w Szczecinie.",
}

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeria"
        title="Efekty naszej pracy"
        description="Kilka zdjęć z naszej hali w Szczecinie — realizacje mycia ręcznego, czyszczenia wnętrz i detailingu."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <GalleryGrid images={galleryImages} />
      </section>

      <CtaBand />
    </>
  )
}
