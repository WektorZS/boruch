import { Photo } from "./photo"
import { sources, type Locale } from "@/lib/content"
import type { PhotoId } from "@/lib/photos"

/** Full-bleed photographic moment carrying the three source "why BORUCH" features. */
export function FeatureBand({ locale, photo = "hero-banner" }: { locale: Locale; photo?: PhotoId }) {
  const features = sources[locale].home.features

  return (
    <div className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden lg:h-[92svh]">
      <div data-reveal="mask" className="absolute inset-0 -z-10">
        <Photo id={photo} sizes="100vw" position="50% 45%" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/40 to-ink/10" />

      <ul className="shell-wide grid pb-10 pt-40 md:grid-cols-3 lg:pb-14">
        {features.map((feature, i) => (
          <li
            key={feature}
            data-reveal=""
            style={{ "--d": i } as React.CSSProperties}
            className="flex flex-col gap-3 border-t border-line-strong py-6 md:pr-8"
          >
            <span className="type-index text-xs text-highlight">{String(i + 1).padStart(2, "0")}</span>
            <span className="type-h2">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
