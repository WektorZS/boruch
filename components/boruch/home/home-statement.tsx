import { Photo } from "../photo"
import { sources, type Locale } from "@/lib/content"

export function HomeStatement({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const claims = src.slides.slice(1, 3)

  return (
    <section className="surface-bone section-lg">
      <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <p className="eyebrow text-ink/55">{src.slides[0].title}</p>
          <p data-reveal="" className="type-h1 max-w-[16ch] text-balance text-ink">
            {src.home.sourceH1}
          </p>
        </div>
        <figure data-reveal="mask" className="frame aspect-[4/5] w-2/3 max-w-sm justify-self-end sm:w-1/2 lg:col-span-4 lg:col-start-9 lg:w-full">
          <Photo id="p00" sizes="(min-width: 1024px) 30vw, 65vw" />
        </figure>
      </div>

      <ol className="shell-wide mt-(--section-md) grid gap-px bg-ink/15 lg:grid-cols-2">
        {claims.map((claim, i) => (
          <li
            key={claim.title}
            data-reveal=""
            style={{ "--d": i } as React.CSSProperties}
            className="min-w-0 flex min-h-72 flex-col justify-between gap-10 bg-bone p-6 sm:p-8 lg:min-h-80 lg:p-10"
          >
            <span className="flex items-center justify-between gap-5">
              <span className="type-index text-xs text-red-controlled">{String(i + 2).padStart(2, "0")}</span>
              <span className="type-label min-w-0 break-words text-right text-ink/50">{claim.kicker}</span>
            </span>
            <span className="flex min-w-0 flex-col gap-3">
              <span className="type-h2 block max-w-full break-words text-ink">{claim.title}</span>
              <span className="type-h3 max-w-full break-words text-ink/55">
                {claim.sub}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
