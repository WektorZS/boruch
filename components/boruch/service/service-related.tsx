import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Photo } from "../photo"
import { routes, ui } from "@/lib/content"
import { formatIndex, services, type Service } from "@/lib/content/services"

/** Previous and next services in the 01–12 index, so the catalogue reads as one continuous sequence. */
export function ServiceRelated({ service }: { service: Service }) {
  const t = ui.pl
  const i = service.index - 1
  const neighbours = [services[(i - 1 + services.length) % services.length], services[(i + 1) % services.length]]

  return (
    <section aria-labelledby="related-title" className="section-lg border-t border-line">
      <div className="shell-wide flex flex-col gap-10">
        <div className="flex items-end justify-between gap-6">
          <h2 id="related-title" className="eyebrow">
            {t.related}
          </h2>
          <Link href={routes.pl.services} className="group type-label flex items-center gap-3 text-bone">
            <span className="link-draw">{t.allServices}</span>
            <ArrowRight className="arrow-shift size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {neighbours.map((s) => (
            <li key={s.slug} className="bg-background">
              <Link
                href={`/${s.slug}`}
                className="group relative flex min-h-80 flex-col justify-between gap-10 overflow-hidden p-6 lg:min-h-[28rem] lg:p-8"
              >
                <span aria-hidden="true" className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-45 group-focus-visible:opacity-45">
                  <Photo id={s.hero} sizes="(min-width: 768px) 50vw, 100vw" className="scale-105 transition-transform duration-[1.4s] group-hover:scale-100" />
                </span>
                <span className="relative flex items-center justify-between">
                  <span className="type-label text-ash">
                    {formatIndex(s.index)} - {s.category === "myjnia" ? "Myjnia" : "Detailing"}
                  </span>
                  <ArrowRight className="arrow-shift size-5 text-bone" aria-hidden="true" />
                </span>
                <span className="type-h2 relative max-w-[14ch] text-balance">{s.navTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
