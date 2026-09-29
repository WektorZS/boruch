import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { GalleryPortfolio } from "./gallery-portfolio"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"
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

      <section aria-labelledby="page-title" className="relative isolate pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="shell-wide grid gap-7 lg:grid-cols-12 lg:gap-8">
          <div className="flex items-start justify-between gap-5 lg:col-span-3">
            <p className="eyebrow">{t.nav.gallery}</p>
            <div className="type-label ml-auto text-right text-ash lg:hidden">{t.photo} 01 - {galleryOrder.length}</div>
          </div>
          <div className="flex min-w-0 flex-col gap-7 lg:col-span-8 lg:col-start-5">
            <h1 id="page-title" data-reveal="" className="type-h1 max-w-[16ch] text-balance">{src.gallery.h1}</h1>
            <div className="grid gap-6 border-t border-line pt-6">
              <p className="type-lead max-w-2xl text-pretty text-bone/75">{src.gallery.sub}</p>
            </div>
          </div>
          <div className="type-label hidden text-right text-ash lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:block">
            {t.photo} 01 - {galleryOrder.length}
          </div>
        </div>
      </section>

      <section aria-label={src.gallery.sub} className="section-md">
        <div className="shell-wide">
          <GalleryPortfolio
            ids={galleryOrder}
            labels={{ photo: t.photo, of: t.of, prev: t.prev, next: t.next, close: t.closeLightbox, open: t.openPhoto }}
          />
        </div>
      </section>

      <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-t border-line">
        <div className="absolute inset-0 -z-10">
          <Photo id="p25" sizes="100vw" className="opacity-35" position="50% 60%" />
          <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/30" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-wine-deep/50 to-transparent" />
        </div>
        <div className="shell-wide section-lg grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="flex max-w-4xl flex-col gap-6 lg:col-span-8">
            <p className="eyebrow">{t.book}</p>
            <h2 id="booking-title" data-reveal="" className="type-h1 max-w-[14ch] text-balance">{src.home.contactTitle}</h2>
            <p data-reveal="" style={{ "--d": 2 } as React.CSSProperties} className="type-lead max-w-xl text-pretty text-bone/80">{src.home.contactText}</p>
          </div>
          <div data-reveal="" style={{ "--d": 3 } as React.CSSProperties} className="flex flex-col gap-3 sm:flex-row lg:col-span-3 lg:col-start-10 lg:flex-col">
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group min-h-14 px-7">
              {t.booksy}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
            </a>
            <a href={contact.phoneHref} className="btn btn-outline min-h-14 px-7">{t.call} · {contact.phone}</a>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
