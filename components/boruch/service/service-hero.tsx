import Link from "next/link"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { Photo } from "../photo"
import { contact, routes, ui } from "@/lib/content"
import { formatIndex, serviceGroupTitle, servicePrice, services, type Service } from "@/lib/content/services"
import { fitVw, groupWords } from "@/lib/text"

export function ServiceHero({ service }: { service: Service }) {
  const t = ui.pl
  const { source } = service
  const lines = groupWords(source.heading, 14)
  const vw = fitVw(lines, 90, 9.6)
  const price = servicePrice("pl", service.slug)
  const group = serviceGroupTitle("pl", service.slug)

  return (
    <section aria-labelledby="service-title" className="relative isolate pt-[calc(var(--header-h)+2.5rem)] lg:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="shell-wide flex flex-col gap-10 lg:gap-14">
        <div className="enter-fade flex items-center justify-between gap-6" style={{ "--i": 0 } as React.CSSProperties}>
          <nav aria-label="Breadcrumb">
            <ol className="type-label flex flex-wrap items-center gap-2 text-ash">
              <li>
                <Link href={routes.pl.services} className="transition-colors hover:text-bone">
                  {t.nav.services}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3" />
              </li>
              <li className="text-bone">{group}</li>
            </ol>
          </nav>
          <p className="type-label text-ash">
            <span className="text-bone">{formatIndex(service.index)}</span> / {formatIndex(services.length)}
          </p>
        </div>

        <h1 id="service-title" className="type-display" style={{ fontSize: `clamp(2.4rem, ${vw}vw, 9.25rem)` }}>
          {lines.map((line, i) => (
            <span key={`${line}-${i}`} className="line-mask">
              <span className="enter-rise block" style={{ "--i": i } as React.CSSProperties}>
                {line}
              </span>
            </span>
          ))}
          <span className="sr-only"> — {source.headingSub}</span>
        </h1>

        <div className="grid gap-8 border-t border-line pt-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="enter-fade flex flex-col gap-3 lg:col-span-5" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="type-label text-ash">{source.headingSub}</p>
            <p className="type-lead text-pretty text-bone first-letter:uppercase">{source.tagline}</p>
          </div>
          <div className="enter-fade flex flex-col gap-2 lg:col-span-3" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="type-label text-ash">{t.priceLabel}</p>
            <p
              className={
                price
                  ? "type-h2 [font-stretch:115%] [font-variation-settings:'wdth'_115]"
                  : "type-h3 uppercase text-bone/90"
              }
            >
              {price ?? t.individualQuote}
            </p>
          </div>
          <div
            className="enter-fade flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
              {t.book}
              <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
            </a>
            <Link href={routes.pl.pricing} className="btn btn-outline">
              {t.pricing}
            </Link>
          </div>
        </div>
      </div>

      <div className="shell-wide mt-10 lg:mt-14">
        <div className="enter-unmask frame frame-shade relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
          <Photo id={service.hero} priority sizes="(min-width: 1680px) 1600px, 100vw" position="50% 60%" />
          <p className="type-label absolute bottom-5 left-5 z-10 flex items-center gap-3 text-bone lg:bottom-7 lg:left-7">
            <span aria-hidden="true" className="size-1.5 bg-brand" />
            BORUCH — Szczecin · PAZIM
          </p>
        </div>
      </div>
    </section>
  )
}
