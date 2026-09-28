import { ArrowUpRight } from "lucide-react"
import { RevealText } from "./reveal-text"
import { contact, sources, ui, type Locale } from "@/lib/content"

/** PAZIM level −2: the location as a typographic signature. */
export function LocationSection({ locale, as = "h2" }: { locale: Locale; as?: "h1" | "h2" }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[3]

  return (
    <section aria-labelledby="location-title" className="relative overflow-hidden border-t border-line">
      <div className="shell-wide section-lg grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <p className="eyebrow">{slide.kicker}</p>
          <RevealText as={as} id="location-title" text={[slide.title, slide.sub]} className="type-display" />
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

        <div aria-hidden="true" className="relative flex flex-col items-start lg:col-span-5 lg:items-end">
          <span className="type-label mb-2 text-ash">
            PAZIM — {t.level}
          </span>
          <span
            data-reveal=""
            className="flex items-start font-display text-[clamp(10rem,42vw,30rem)] font-extrabold leading-[0.74] tracking-[-0.06em] [font-stretch:151%] [font-variation-settings:'wdth'_151]"
          >
            <span className="text-brand">−</span>
            <span className="text-bone">2</span>
          </span>
        </div>
      </div>
    </section>
  )
}
