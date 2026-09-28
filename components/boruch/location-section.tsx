import { ArrowUpRight } from "lucide-react"
import { contact, sources, ui, type Locale } from "@/lib/content"

export function LocationSection({ locale, as = "h2" }: { locale: Locale; as?: "h1" | "h2" }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[3]

  return (
    <section aria-labelledby="location-title" className="surface-wine relative overflow-hidden border-t border-line-wine">
      <div className="shell-wide section-lg grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <p className="eyebrow">{slide.kicker}</p>
          {as === "h1" ? (
            <h1 id="location-title" data-reveal="" className="type-h1 max-w-[16ch] text-balance">{slide.title} {slide.sub}</h1>
          ) : (
            <h2 id="location-title" data-reveal="" className="type-h2 max-w-[16ch] text-balance">{slide.title} {slide.sub}</h2>
          )}
          <div data-reveal="" className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <address className="flex flex-col gap-1 not-italic">
              <span className="type-label mb-2 text-ash">{src.address.locationLabel}</span>
              {src.address.lines.map((line) => (
                <span key={line} className="type-h3 font-medium">
                  {line}
                </span>
              ))}
            </address>
            <div className="flex flex-col gap-3">
              <span className="type-label mb-1 text-ash">{src.address.contactLabel}</span>
              <a href={contact.phoneHref} className="link-draw w-fit text-lg">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="link-draw w-fit break-all">
                {contact.email}
              </a>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline group mt-3 w-fit">
                {t.openMap}
                <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="relative flex min-h-64 flex-col items-center justify-center border border-line-wine bg-ink/35 p-8 lg:col-span-4 lg:col-start-9 lg:min-h-96">
          <span className="type-label mb-2 text-ash">
            PAZIM - {t.level}
          </span>
          <span data-reveal="" className="font-display text-[clamp(7rem,18vw,13rem)] font-semibold leading-none tracking-[-0.06em] text-bone [font-stretch:112%] [font-variation-settings:'wdth'_112]">-2</span>
        </div>
      </div>
    </section>
  )
}
