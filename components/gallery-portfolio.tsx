"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react"
import { Photo, photoSrc, photoSrcSet } from "./photo"
import { photos, type PhotoId } from "@/lib/photos"
import { cn } from "@/lib/utils"

const rhythm = [
  "col-span-2 md:col-span-8 aspect-[16/10]",
  "col-span-1 md:col-span-4 aspect-[3/4]",
  "col-span-1 md:col-span-4 aspect-[3/4]",
  "col-span-2 md:col-span-8 aspect-[16/10]",
]

interface GalleryLabels {
  photo: string
  of: string
  prev: string
  next: string
  close: string
  open: string
  more: string
}

export function GalleryPortfolio({ ids, labels }: { ids: PhotoId[]; labels: GalleryLabels }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const [previous, setPrevious] = useState<PhotoId | null>(null)
  const [loaded, setLoaded] = useState<PhotoId | null>(null)
  const [visibleCount, setVisibleCount] = useState(12)
  const opener = useRef(0)

  const open = (index: number) => {
    opener.current = index
    setPrevious(null)
    setLoaded(null)
    setActive(index)
    dialogRef.current?.showModal()
    requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }))
  }

  const close = () => dialogRef.current?.close()

  const step = useCallback((delta: number) => {
    if (active === null) return
    const next = (active + delta + ids.length) % ids.length
    if (next === active) return
    // Keep the last decoded frame visible if the user advances faster than a photo loads.
    setPrevious(loaded === ids[active] ? ids[active] : previous)
    setLoaded(null)
    setActive(next)
  }, [active, ids, loaded, previous])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => {
      setActive(null)
      setPrevious(null)
      setLoaded(null)
      triggerRefs.current[opener.current]?.focus({ preventScroll: true })
    }
    dialog.addEventListener("close", onClose)
    return () => dialog.removeEventListener("close", onClose)
  }, [])

  const isOpen = active !== null
  useEffect(() => {
    if (!isOpen) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = overflow }
  }, [isOpen])

  const current = active === null ? null : ids[active]
  const neighbours = active === null ? [] : [ids[(active + 1) % ids.length], ids[(active - 1 + ids.length) % ids.length]]

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12 lg:gap-7">
        {ids.slice(0, visibleCount).map((id, i) => (
          <li key={id} data-reveal="mask" style={{ "--d": i % 3 } as React.CSSProperties} className={cn("editorial-photo relative isolate overflow-hidden", rhythm[i % rhythm.length])}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el
              }}
              type="button"
              onClick={() => open(i)}
              aria-label={`${labels.open}: ${photos[id].alt} (${i + 1} ${labels.of} ${ids.length})`}
              className="gallery-tile group zoom-on-hover block h-full w-full cursor-zoom-in"
            >
              <Photo id={id} position={photos[id].w > photos[id].h ? "50% 54%" : "50% 62%"} sizes={i % 4 === 0 || i % 4 === 3 ? "(min-width: 1600px) 965px, (min-width: 768px) 64vw, 92vw" : "(min-width: 1600px) 475px, (min-width: 768px) 32vw, 46vw"} />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 bg-linear-to-t from-black/75 to-transparent p-5 pt-16 text-left text-sm leading-relaxed text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span>{photos[id].alt}</span><Expand className="size-5 shrink-0" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {visibleCount < ids.length && <div className="mt-10 flex justify-center">
        <button type="button" className="btn btn-outline gap-3" onClick={() => {
          const firstNew = visibleCount
          setVisibleCount(count => Math.min(ids.length, count + 12))
          requestAnimationFrame(() => triggerRefs.current[firstNew]?.focus({ preventScroll: true }))
        }}>{labels.more}<ArrowRight className="size-4 text-brand" aria-hidden="true" /></button>
      </div>}

      <dialog
        ref={dialogRef}
        aria-label={current ? photos[current].alt : labels.photo}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); step(1) }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1) }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        onTouchStart={(e) => {
          if (e.touches.length !== 1) { touchStart.current = null; return }
          touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }}
        onTouchEnd={(e) => {
          if (!touchStart.current) return
          const dx = e.changedTouches[0].clientX - touchStart.current.x
          const dy = e.changedTouches[0].clientY - touchStart.current.y
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1)
          touchStart.current = null
        }}
        onTouchCancel={() => { touchStart.current = null }}
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-bone backdrop:bg-ink/90"
      >
        {current && active !== null && (
          <div className="flex h-full flex-col">
            <div className="shell-wide flex items-center justify-between gap-4 py-4">
              <p className="type-label text-ash" aria-live="polite">
                {labels.photo} <span className="text-bone">{String(active + 1).padStart(2, "0")}</span> {labels.of} {ids.length}
              </p>
              <button ref={closeRef} type="button" onClick={close} className="btn btn-outline min-h-11 px-4" aria-label={labels.close}>
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
              <div className="relative h-full w-full">
                {previous && previous !== current && <img
                  src={photoSrc(previous, 1600)} srcSet={photoSrcSet(previous)} sizes="100vw"
                  width={photos[previous].w} height={photos[previous].h} alt="" aria-hidden="true"
                  className={cn("absolute inset-0 h-full w-full object-contain transition-opacity duration-500", loaded === current ? "opacity-0" : "opacity-100")}
                />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={current}
                  src={photoSrc(current, 1600)}
                  srcSet={photoSrcSet(current)}
                  sizes="100vw"
                  width={photos[current].w}
                  height={photos[current].h}
                  alt={photos[current].alt}
                  decoding="async"
                  draggable={false}
                  onLoad={() => setLoaded(current)}
                  className={cn("lightbox-img absolute inset-0 h-full w-full object-contain transition-opacity duration-500", loaded === current ? "opacity-100" : "opacity-0")}
                />
              </div>
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
                <img key={id} src={photoSrc(id, 960)} srcSet={photoSrcSet(id)} sizes="100vw" alt="" decoding="async" fetchPriority="low" />
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
