import { Photo } from "./photo"
import type { PhotoId } from "@/lib/photos"
import { cn } from "@/lib/utils"

interface PageIntroProps {
  eyebrow: string
  /** Source H1, kept verbatim. */
  title: string
  sub?: string
  /** Mono meta label at the right of the eyebrow row, e.g. a count. */
  meta?: string
  photo?: PhotoId
  photoPosition?: string
  children?: React.ReactNode
}

/** Inner-page opening: eyebrow row, large source H1, source sub-line, optional full-width photograph. */
export function PageIntro({ eyebrow, title, sub, meta, photo, photoPosition, children }: PageIntroProps) {
  const words = title.split(/\s+/)

  return (
    <section aria-labelledby="page-title" className="relative isolate pt-[calc(var(--header-h)+2.5rem)] lg:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="shell-wide flex flex-col gap-10 lg:gap-14">
        <div className="enter-fade flex flex-wrap items-center justify-between gap-4 sm:gap-6" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="eyebrow">{eyebrow}</p>
          {meta && <p className="type-label ml-auto max-w-[70%] text-right text-ash">{meta}</p>}
        </div>

        <h1 id="page-title" className="type-h1 max-w-6xl text-balance lg:text-[clamp(3rem,5.6vw,6rem)]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden pt-[0.18em] -mt-[0.18em] pb-[0.06em] align-top">
              <span className="enter-rise inline-block" style={{ "--i": Math.floor(i / 3) } as React.CSSProperties}>
                {word}
              </span>
              {i < words.length - 1 ? "\u00a0" : null}
            </span>
          ))}
        </h1>

        {(sub || children) && (
          <div
            className={cn(
              "enter-fade flex flex-col gap-8 border-t border-line pt-6 lg:flex-row lg:items-end lg:justify-between",
            )}
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {sub && <p className="type-lead max-w-xl text-pretty text-bone/85">{sub}</p>}
            {children}
          </div>
        )}
      </div>

      {photo && (
        <div className="shell-wide mt-10 lg:mt-14">
          <div className="enter-unmask frame aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/8]">
            <Photo id={photo} priority sizes="(min-width: 1680px) 1600px, 100vw" position={photoPosition} />
          </div>
        </div>
      )}
    </section>
  )
}
