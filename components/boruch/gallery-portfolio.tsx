"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { Photo, photoSrc, photoSrcSet } from "./photo"
import { photos, type PhotoId } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** Nine-cell editorial rhythm on a 12-column grid: large/small, portrait/panoramic, offsets. */
const rhythm = [
  "col-span-2 md:col-span-7 aspect-[4/5]",
  "col-span-2 md:col-span-5 aspect-[4/5] md:mt-28",
  "col-span-2 md:col-span-12 aspect-[16/10] lg:aspect-[21/9]",
  "col-span-1 md:col-span-4 aspect-[3/4]",
  "col-span-1 md:col-span-4 aspect-[3/4] md:mt-16",
  "col-span-2 md:col-span-4 aspect-[4/3] md:aspect-[3/4] md:mt-32",
  "col-span-1 md:col-span-5 aspect-[3/4]",
  "col-span-1 md:col-span-7 aspect-[3/4] md:aspect-[4/3] md:self-end",
  "col-span-2 md:col-span-8 md:col-start-3 aspect-[16/10]",
]

interface GalleryLabels {
  photo: string
  of: string
  prev: string
  next: string
  close: string
  open: string
}

export function GalleryPortfolio({ ids, labels }: { ids: PhotoId[]; labels: GalleryLabels }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touchX = useRef<number | null>(null)
  const [active, setActive] = useState<number | null>(null)

  const open = (index: number) => {
    setActive(index)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  const step = useCallback(
    (delta: number) => setActive((i) => (i === null ? i : (i + delta + ids.length) % ids.length)),
    [ids.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => {
      setActive((i) => {
        if (i !== null) triggerRefs.current[i]?.focus()
        return null
      })
    }
    dialog.addEventListener("close", onClose)
    return () => dialog.removeEventListener("close", onClose)
  }, [])

  const current = active === null ? null : ids[active]
  const neighbours = active === null ? [] : [ids[(active + 1) % ids.length], ids[(active - 1 + ids.length) % ids.length]]

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-6 lg:gap-8">
        {ids.map((id, i) => (
          <li key={id} data-reveal="mask" style={{ "--d": i % 3 } as React.CSSProperties} className={cn("frame", rhythm[i % rhythm.length])}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el
              }}
              type="button"
              onClick={() => open(i)}
              aria-label={`${labels.open}: ${photos[id].alt} (${i + 1} ${labels.of} ${ids.length})`}
              className="group zoom-on-hover block h-full w-full cursor-zoom-in"
            >
              <Photo id={id} sizes="(min-width: 768px) 60vw, 50vw" />
              <span
                aria-hidden="true"
                className="type-label absolute bottom-3 left-3 bg-ink/70 px-2 py-1 text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? photos[current].alt : labels.photo}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1)
          if (e.key === "ArrowLeft") step(-1)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-bone backdrop:bg-ink/90"
      >
        {current && active !== null && (
          <div className="flex h-full flex-col">
            <div className="shell-wide flex items-center justify-between gap-4 py-4">
              <p className="type-label text-ash" aria-live="polite">
                {labels.photo} <span className="text-bone">{String(active + 1).padStart(2, "0")}</span> {labels.of} {ids.length}
              </p>
              <button type="button" onClick={close} className="btn btn-outline min-h-11 px-4" aria-label={labels.close}>
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current}
                src={photoSrc(current, 1600)}
                srcSet={photoSrcSet(current)}
                sizes="100vw"
                alt={photos[current].alt}
                className="lightbox-img max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={labels.prev}
                className="btn btn-outline absolute left-4 top-1/2 hidden min-h-12 -translate-y-1/2 bg-ink/60 px-4 md:inline-flex"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={labels.next}
                className="btn btn-outline absolute right-4 top-1/2 hidden min-h-12 -translate-y-1/2 bg-ink/60 px-4 md:inline-flex"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="shell-wide flex items-center justify-between gap-4 border-t border-line py-4">
              <p className="text-pretty text-sm text-bone/80">{photos[current].alt}</p>
              <div className="flex gap-2 md:hidden">
                <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className="btn btn-outline min-h-11 px-4">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label={labels.next} className="btn btn-outline min-h-11 px-4">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div aria-hidden="true" className="hidden">
              {neighbours.map((id) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={id} src={photoSrc(id, 1600)} alt="" />
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
