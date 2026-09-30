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

      <section aria-labelledby="page-title" className="relative isolate flex min-h-[680px] items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p25" priority sizes="100vw" position="50% 60%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.98)_0%,rgba(6,6,7,.84)_50%,rgba(6,6,7,.3)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
        <div className="shell-wide relative z-10 grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-7">{t.nav.gallery}</p>
            <h1 id="page-title" className="type-h1 max-w-[18ch] text-balance">{src.gallery.h1}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/62">{src.gallery.sub}</p>
          </div>
          <div className="border-l border-brand pl-6 lg:col-span-3 lg:col-start-10">
            <p className="type-label text-brand">Boruch Myjnia</p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{src.home.projectsText}</p>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-white transition-colors hover:text-brand">Instagram<ArrowUpRight className="size-4 text-brand" /></a>
          </div>
        </div>
      </section>

      <section aria-label={src.gallery.sub} className="border-b border-white/10 bg-[#0a0a0b] py-14 sm:py-16 lg:py-20">
        <div className="shell-wide">
          <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">{t.nav.gallery}</p><h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3.4rem)] font-black uppercase leading-none tracking-[-.02em]">{src.home.projectsTitle}</h2></div>
            <p className="max-w-xl text-sm leading-relaxed text-white/45">{src.home.projectsText}</p>
          </div>
          <GalleryPortfolio
            ids={galleryOrder}
            labels={{ photo: t.photo, of: t.of, prev: t.prev, next: t.next, close: t.closeLightbox, open: t.openPhoto }}
          />
        </div>
      </section>

      <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-t border-line">
        <div className="absolute inset-0 -z-10">
          <Photo id="p43" sizes="100vw" className="opacity-35" position="50% 60%" />
          <div className="absolute inset-0 bg-linear-to-r from-[#080809] via-[#080809]/90 to-[#270b0e]/65" />
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
