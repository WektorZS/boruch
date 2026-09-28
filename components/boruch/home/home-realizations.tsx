import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Photo } from "../photo"
import { RevealText } from "../reveal-text"
import { routes, sources, ui, type Locale } from "@/lib/content"

export function HomeRealizations({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="realizations-title" className="section-lg border-t border-line">
      <div className="shell-wide mb-12 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="eyebrow">{t.nav.gallery}</p>
          <RevealText id="realizations-title" text={src.home.projectsTitle} className="type-display" />
        </div>
        <div data-reveal="" className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
          <p className="text-pretty leading-relaxed text-bone/75">{src.home.projectsText}</p>
          <Link href={routes[locale].gallery} className="type-label group flex w-fit items-center gap-3 text-bone">
            <span className="link-draw">{t.allPhotos}</span>
            <ArrowRight className="arrow-shift size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="shell-wide grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4 lg:gap-5">
        <figure data-reveal="mask" className="frame zoom-on-hover col-span-2 aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto">
          <Photo id="p20" sizes="(min-width: 768px) 56vw, 100vw" position="50% 60%" />
        </figure>
        <figure data-reveal="mask" style={{ "--d": 1 } as React.CSSProperties} className="frame zoom-on-hover col-span-2 aspect-[4/3] md:col-span-5">
          <Photo id="p46" sizes="(min-width: 768px) 40vw, 100vw" />
        </figure>
        <figure data-reveal="mask" style={{ "--d": 2 } as React.CSSProperties} className="frame zoom-on-hover aspect-[3/4] md:col-span-3 md:mt-10">
          <Photo id="p68" sizes="(min-width: 768px) 24vw, 50vw" />
        </figure>
        <figure data-reveal="mask" style={{ "--d": 3 } as React.CSSProperties} className="frame zoom-on-hover aspect-[3/4] md:col-span-2">
          <Photo id="p31" sizes="(min-width: 768px) 16vw, 50vw" />
        </figure>
        <figure data-reveal="mask" className="frame zoom-on-hover col-span-2 aspect-[3/4] md:col-span-4 md:col-start-2 md:-mt-16">
          <Photo id="p05" sizes="(min-width: 768px) 32vw, 100vw" />
        </figure>
        <figure data-reveal="mask" style={{ "--d": 1 } as React.CSSProperties} className="frame zoom-on-hover col-span-2 aspect-[16/10] self-end md:col-span-7">
          <Photo id="p52" sizes="(min-width: 768px) 56vw, 100vw" />
        </figure>
      </div>
    </section>
  )
}
