import { ArrowUpRight } from "lucide-react"
import { Photo } from "./photo"
import { RevealText } from "./reveal-text"
import { contact, sources, ui, type Locale } from "@/lib/content"
import type { PhotoId } from "@/lib/photos"

/** Large reservation moment: source "contact" heading and text, Booksy + phone. */
export function BookingCta({ locale, photo = "p06" }: { locale: Locale; photo?: PhotoId }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-t border-line">
      <div className="absolute inset-0 -z-10">
        <Photo id={photo} sizes="100vw" className="opacity-35" position="50% 60%" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-wine-deep/50 to-transparent" />
      </div>

      <div className="shell-wide section-lg flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-4xl flex-col gap-6">
          <p className="eyebrow">{t.book}</p>
          <RevealText id="booking-title" text={src.home.contactTitle} className="type-display" />
          <p data-reveal="" style={{ "--d": 2 } as React.CSSProperties} className="type-lead max-w-xl text-pretty text-bone/80">
            {src.home.contactText}
          </p>
        </div>
        <div data-reveal="" style={{ "--d": 3 } as React.CSSProperties} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group min-h-14 px-7">
            {t.booksy}
            <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
          </a>
          <a href={contact.phoneHref} className="btn btn-outline min-h-14 px-7">
            {t.call} · {contact.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
