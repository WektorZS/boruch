import { Photo } from "./photo"
import { sources, type Locale } from "@/lib/content"
import type { PhotoId } from "@/lib/photos"

export function FeatureBand({ locale, photo = "hero-banner" }: { locale: Locale; photo?: PhotoId }) {
  const features = sources[locale].home.features

  return (
    <div className="relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden lg:h-[76svh]">
      <div data-reveal="mask" className="absolute inset-0 -z-10">
        <Photo id={photo} sizes="100vw" position="50% 45%" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/40 to-ink/10" />

      <ul className="shell-wide grid pb-8 pt-40 md:grid-cols-3 lg:pb-12">
        {features.map((feature, i) => (
          <li
            key={feature}
            data-reveal=""
            style={{ "--d": i } as React.CSSProperties}
            className="flex flex-col gap-4 border-t border-bone/30 py-6 md:pr-8"
          >
            <span className="type-index text-xs text-highlight">{String(i + 1).padStart(2, "0")}</span>
            <span className="type-h3 max-w-[18ch] break-words">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
