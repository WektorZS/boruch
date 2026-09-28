import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Photo } from "../photo"
import { contact, routes, sources, ui, type Locale } from "@/lib/content"

export function HomeHero({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[0]
  const h1 = locale === "pl" ? "Myjnia ręczna i detailing w Szczecinie" : src.home.sourceH1

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-svh overflow-hidden bg-ink">
      <div className="enter-unmask frame absolute inset-x-0 top-0 h-[58svh] lg:inset-y-0 lg:left-[43%] lg:right-0 lg:h-auto">
        <Photo id="p28" priority sizes="(min-width: 1024px) 64vw, 100vw" position="42% 72%" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/30 via-transparent to-ink lg:bg-linear-to-r lg:from-ink lg:via-ink/15 lg:to-ink/15" />
      </div>

      <div className="shell-wide relative z-10 flex min-h-svh flex-col justify-end pb-8 pt-[50svh] lg:justify-between lg:pb-10 lg:pt-[calc(var(--header-h)+3.5rem)]">
        <div className="enter-fade hidden items-start justify-between lg:flex" style={{ "--i": 1 } as React.CSSProperties}>
          <p className="type-label flex items-center gap-3 text-bone/85">
            <span aria-hidden="true" className="size-1.5 bg-brand" />
            {slide.title} - {slide.sub}
          </p>
          <p className="type-label text-right text-bone/80">
            {src.address.lines[0]}
            <br />PAZIM - {src.address.lines[2]}
          </p>
        </div>

        <div className="flex max-w-[52rem] flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-4">
            <p className="enter-fade type-label text-highlight lg:hidden" style={{ "--i": 1 } as React.CSSProperties}>
              {slide.title} - {slide.sub}
            </p>
            <p className="type-display max-w-[10ch] text-balance text-bone">
              <span className="line-mask">
                <span className="enter-rise block" style={{ "--i": 1 } as React.CSSProperties}>
                  {slide.kicker}
                </span>
              </span>
            </p>
          </div>

          <div className="grid gap-7 border-t border-line-strong pt-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1
              id="hero-title"
              className="enter-fade max-w-md text-pretty text-[1.05rem] leading-relaxed text-bone/80 lg:col-span-6"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {h1}
            </h1>
            <div className="enter-fade flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end" style={{ "--i": 3 } as React.CSSProperties}>
              <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                {t.book}
                <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
              </a>
              <Link href={routes[locale].services} className="btn btn-outline">
                {t.nav.services}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-(--gutter) z-10 hidden items-center gap-4 lg:flex">
        <span className="type-label text-ash">{t.scroll}</span>
        <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-0 bg-bone" />
        </span>
      </div>
    </section>
  )
}
