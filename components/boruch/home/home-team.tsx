import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Photo } from "../photo"
import { routes, sources, ui, type Locale } from "@/lib/content"

export function HomeTeam({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const [opening, second, ...rest] = src.home.teamParas

  return (
    <section aria-labelledby="team-title" className="section-lg border-t border-line bg-ink-2">
      <div className="shell-wide grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-h-compact)+2rem)]">
            <figure data-reveal="mask" className="frame aspect-[4/5] w-full lg:aspect-[3/4]">
              <Photo id="team" sizes="(min-width: 1024px) 38vw, 100vw" position="50% 55%" />
            </figure>
            <p className="type-label flex items-center justify-between text-ash">
              <span>{src.home.author}</span>
              <span>PAZIM - {src.address.lines[2]}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
          <h2 id="team-title" className="eyebrow">
            {src.home.teamTitle ?? t.nav.about}
          </h2>
          {opening && <p data-reveal="" className="type-h2 max-w-[18ch] text-balance">{opening}</p>}
          {second && (
            <p data-reveal="" className="type-lead text-pretty text-bone/90">
              {second}
            </p>
          )}
          <div className="rule-signal" />
          <div className="measure flex flex-col gap-6">
            {rest.map((para, i) => (
              <p key={i} data-reveal="" className="type-body text-pretty text-bone/75">
                {para}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-6 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="flex items-center gap-4 font-display text-2xl font-semibold italic tracking-[-0.02em] [font-stretch:105%] [font-variation-settings:'wdth'_105]">
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              {src.home.author}
            </p>
            <Link href={routes[locale].about} className="type-label group flex w-fit items-center gap-3 text-bone">
              <span className="link-draw">{t.nav.about}</span>
              <ArrowRight className="arrow-shift size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
