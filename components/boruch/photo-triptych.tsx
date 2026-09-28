import { Photo } from "./photo"
import type { PhotoId } from "@/lib/photos"

/** Asymmetric three-image moment with staggered heights. */
export function PhotoTriptych({ ids }: { ids: [PhotoId, PhotoId, PhotoId] }) {
  const [a, b, c] = ids
  return (
    <div className="shell-wide grid grid-cols-2 items-end gap-3 py-(--section-md) md:grid-cols-12 md:gap-5">
      <figure data-reveal="mask" className="frame col-span-2 aspect-[4/5] md:col-span-6">
        <Photo id={a} sizes="(min-width: 768px) 48vw, 100vw" />
      </figure>
      <figure data-reveal="mask" style={{ "--d": 1 } as React.CSSProperties} className="frame aspect-[3/4] md:col-span-3 md:mb-28">
        <Photo id={b} sizes="(min-width: 768px) 24vw, 50vw" />
      </figure>
      <figure data-reveal="mask" style={{ "--d": 2 } as React.CSSProperties} className="frame aspect-[3/4] md:col-span-3">
        <Photo id={c} sizes="(min-width: 768px) 24vw, 50vw" />
      </figure>
    </div>
  )
}
