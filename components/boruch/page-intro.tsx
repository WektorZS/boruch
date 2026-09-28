import { Photo } from "./photo"
import { SectionHeading } from "./section-heading"
import type { PhotoId } from "@/lib/photos"

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

export function PageIntro({ eyebrow, title, sub, meta, photo, photoPosition, children }: PageIntroProps) {
  return (
    <section aria-labelledby="page-title" className="relative isolate pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
      <div className="shell-wide">
        <SectionHeading
          id="page-title"
          as="h1"
          size="page"
          eyebrow={eyebrow}
          title={title}
          intro={sub}
          meta={meta}
          action={children}
        />
      </div>

      {photo && (
        <div className="shell-wide mt-12 lg:mt-16">
          <div className="enter-unmask frame aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2/1]">
            <Photo id={photo} priority sizes="(min-width: 1680px) 1600px, 100vw" position={photoPosition} />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
          </div>
        </div>
      )}
    </section>
  )
}
