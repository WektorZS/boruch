import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Photo } from "../photo"
import { contact, routes, sources, ui, type Locale } from "@/lib/content"

/** Greedily groups campaign words into short display lines (max ~8 characters, never splitting a word). */
function campaignLines(text: string) {
  const lines: string[] = []
  for (const word of text.split(/\s+/)) {
    const last = lines[lines.length - 1]
    if (last && `${last} ${word}`.length <= 8) lines[lines.length - 1] = `${last} ${word}`
    else lines.push(word)
  }
  return lines
}

export function HomeHero({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[0]
  const h1 = locale === "pl" ? "Myjnia ręczna i detailing w Szczecinie" : src.home.sourceH1
  const lines = campaignLines(slide.kicker)
  const longest = Math.max(...lines.map((l) => l.length))
  const vw = Math.min(12.6, 88 / (longest * 0.9))

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden lg:block">
      <div className="enter-unmask frame relative h-[66svh] w-full lg:absolute lg:inset-y-0 lg:left-[36%] lg:right-0 lg:h-auto">
        <Photo id="p28" priority sizes="(min-width: 1024px) 64vw, 100vw" position="42% 72%" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/55 via-transparent to-ink lg:bg-linear-to-r lg:from-ink lg:via-ink/10 lg:to-ink/20" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-1/3 bg-linear-to-b from-ink/80 to-transparent lg:block" />
      </div>

      <div className="shell-wide relative z-10 -mt-[24svh] flex flex-1 flex-col justify-end gap-10 pb-8 lg:mt-0 lg:min-h-svh lg:justify-between lg:pb-10 lg:pt-[calc(var(--header-h)+3rem)]">
        <div className="enter-fade hidden items-start justify-between lg:flex" style={{ "--i": 2 } as React.CSSProperties}>
          <p className="type-label flex items-center gap-3 text-bone">
            <span aria-hidden="true" className="size-1.5 bg-brand" />
            {slide.title} — {slide.sub}
          </p>
          <p className="type-label text-right text-bone/80">
            {src.address.lines[0]}
            <br />
            PAZIM · {src.address.lines[2]}
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-14">
          <p className="type-campaign" style={{ fontSize: `clamp(2.9rem, ${vw}vw, 13.5rem)` }}>
            {lines.map((line, i) => (
              <span key={line} className="line-mask">
                <span className="enter-rise block" style={{ "--i": i } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </p>

          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1
              id="hero-title"
              className="enter-fade type-h3 max-w-md text-pretty text-bone/90 lg:col-span-5"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {h1}
            </h1>
            <div className="enter-fade flex flex-col gap-3 sm:flex-row lg:col-span-5" style={{ "--i": 2 } as React.CSSProperties}>
              <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                {t.book}
                <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
              </a>
              <Link href={routes[locale].services} className="btn btn-outline">
                {t.nav.services}
              </Link>
            </div>
            <div className="enter-fade hidden items-center justify-end gap-4 lg:col-span-2 lg:flex" style={{ "--i": 3 } as React.CSSProperties}>
              <span className="type-label text-ash">{t.scroll}</span>
              <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-line">
                <span className="scroll-cue absolute inset-0 bg-bone" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
