import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { GalleryPortfolio } from "./gallery-portfolio"
import { InstagramIcon } from "./social-icons"
import { contact, sources, ui, type Locale } from "@/lib/content"
import { galleryOrder } from "@/lib/photos"

export function GalleryPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <SiteShell locale={locale} page="gallery">


      <section aria-labelledby="page-title" className="editorial-hero relative border-b border-white/10 bg-[#080809]">
        <div className="shell-wide page-cover-grid">
          <div className="min-w-0">
            <p className="eyebrow mb-7">{t.nav.gallery}</p>
            <h1 id="page-title" className="page-cover-title">{t.nav.gallery}<span className="text-brand">.</span></h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/70">{src.gallery.sub}</p>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="editorial-link mt-8"><InstagramIcon className="size-4 text-brand" />Instagram</a>
          </div>
          <figure className="editorial-photo relative aspect-[4/3] overflow-hidden lg:aspect-[16/11]">
            <Photo id="p52" priority sizes="(min-width: 1600px) 850px, (min-width: 1024px) 56vw, 92vw" position="54% 58%" />
            <figcaption className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/65 to-transparent px-6 pb-5 pt-12 type-label text-white/80">Boruch Myjnia / PAZIM / Szczecin</figcaption>
          </figure>
        </div>
      </section>

      <section aria-label={src.gallery.sub} className="border-b border-white/10 bg-[#080809] py-12 sm:py-16 lg:py-20">
        <div className="shell-wide">
          <div className="mb-8 flex items-center justify-between gap-5 border-b border-white/10 pb-5">
            <h2 className="type-label text-white/70">{{ pl: "Kadry z naszej myjni", en: "From our workshop", de: "Aus unserer Werkstatt", uk: "Кадри з нашої мийки" }[locale]}</h2>
            <span className="type-label text-white/45">Boruch Myjnia</span>
          </div>
          <GalleryPortfolio
            ids={galleryOrder}
            labels={{ photo: t.photo, of: t.of, prev: t.prev, next: t.next, close: t.closeLightbox, open: t.openPhoto, more: { pl: "Zobacz więcej zdjęć", en: "Show more photos", de: "Weitere Fotos anzeigen", uk: "Показати більше фото" }[locale] }}
          />
        </div>
      </section>

    </SiteShell>
  )
}
