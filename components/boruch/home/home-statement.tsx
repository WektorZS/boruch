import { Photo } from "../photo"
import { RevealText } from "../reveal-text"
import { sources, type Locale } from "@/lib/content"

/** Brand statement: source H1 as editorial statement, then the source slider claims as indexed campaign rows. */
export function HomeStatement({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const claims = src.slides.slice(1, 3)

  return (
    <section className="section-lg">
      <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <p className="eyebrow">{src.slides[0].title}</p>
          <RevealText as="p" text={src.home.sourceH1} className="type-h1 max-w-[18ch] text-balance" />
        </div>
        <figure data-reveal="mask" className="frame aspect-[3/4] w-2/3 max-w-xs self-end justify-self-end sm:w-1/2 lg:col-span-3 lg:col-start-10 lg:w-full">
          <Photo id="p00" sizes="(min-width: 1024px) 22vw, 60vw" />
        </figure>
      </div>

      <ol className="shell-wide mt-(--section-md) flex flex-col">
        {claims.map((claim, i) => (
          <li
            key={claim.title}
            className={`grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:items-baseline lg:gap-8 lg:py-14 ${i === claims.length - 1 ? "border-b" : ""}`}
          >
            <span className="type-index text-xs text-highlight lg:col-span-1">{String(i + 2).padStart(2, "0")}</span>
            <span className="type-label text-ash lg:col-span-3">{claim.kicker}</span>
            <span className={`flex min-w-0 flex-col gap-2 lg:col-span-8 ${i % 2 === 1 ? "lg:items-end lg:text-right" : ""}`}>
              <RevealText as="span" text={claim.title} className="type-display block max-w-full break-words" />
              <span data-reveal="" style={{ "--d": 2 } as React.CSSProperties} className="type-h3 max-w-full break-words uppercase text-ash">
                {claim.sub}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
