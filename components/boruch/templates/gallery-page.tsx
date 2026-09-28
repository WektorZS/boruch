import { SiteShell } from "../site-shell"
import { PageIntro } from "../page-intro"
import { GalleryPortfolio } from "../gallery-portfolio"
import { BookingCta } from "../booking-cta"
import { breadcrumbJsonLd, routes, sources, ui, type Locale } from "@/lib/content"
import { galleryOrder } from "@/lib/photos"

export function GalleryPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <SiteShell locale={locale} page="gallery">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: t.nav.home, path: routes[locale].home },
              { name: t.nav.gallery, path: routes[locale].gallery },
            ]),
          ),
        }}
      />
      <PageIntro
        eyebrow={t.nav.gallery}
        title={src.gallery.h1}
        sub={src.gallery.sub}
        meta={`${t.photo} 01 - ${galleryOrder.length}`}
      />
      <section aria-label={src.gallery.sub} className="section-md">
        <div className="shell-wide">
          <GalleryPortfolio
            ids={galleryOrder}
            labels={{
              photo: t.photo,
              of: t.of,
              prev: t.prev,
              next: t.next,
              close: t.closeLightbox,
              open: t.openPhoto,
            }}
          />
        </div>
      </section>
      <BookingCta locale={locale} photo="p25" />
    </SiteShell>
  )
}
