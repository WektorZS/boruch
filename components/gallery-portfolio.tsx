"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react"
import { ArrowLeft, ArrowRight, Expand, Grid2X2, LoaderCircle, RefreshCw, Rows3, X } from "lucide-react"

import { Photo, photoSrc, photoSrcSet } from "./photo"
import { photos, type PhotoId } from "@/lib/photos"
import type { Locale } from "@/lib/content"

interface GalleryLabels {
  photo: string
  of: string
  prev: string
  next: string
  close: string
  open: string
  more: string
}

interface GalleryPortfolioProps {
  ids: readonly PhotoId[]
  labels: GalleryLabels
  locale?: Locale
}

type View = "editorial" | "natural"
type LoadState = "idle" | "loading" | "ready" | "error"
type Frame = { id: PhotoId; src: string; key: number }
type Gesture = { x: number; y: number }
type MouseGesture = Gesture & { pointerId: number; dragging: boolean }

const copyByLocale = {
  pl: {
    layout: "Układ zdjęć",
    editorial: "Kompozycja",
    natural: "Pełne zdjęcia",
    hint: "Otwórz zdjęcie, aby zobaczyć je w całości.",
    shown: "Pokazano",
    empty: "Na razie nie ma zdjęć do wyświetlenia.",
    viewer: "Galeria Boruch Myjnia",
    loading: "Ładowanie zdjęcia",
    error: "Nie udało się załadować zdjęcia.",
    errorHint: "Spróbuj ponownie lub przejdź do kolejnego kadru.",
    retry: "Spróbuj ponownie",
    thumbs: "Wybierz zdjęcie",
  },
  en: {
    layout: "Photo layout",
    editorial: "Editorial layout",
    natural: "Full frames",
    hint: "Open a photo to see the complete frame.",
    shown: "Showing",
    empty: "There are no photos to display yet.",
    viewer: "Boruch Myjnia gallery",
    loading: "Loading photo",
    error: "The photo could not be loaded.",
    errorHint: "Try again or move to another photo.",
    retry: "Try again",
    thumbs: "Choose a photo",
  },
  de: {
    layout: "Bildansicht",
    editorial: "Komposition",
    natural: "Volle Bildformate",
    hint: "Öffnen Sie ein Foto, um das ganze Bild zu sehen.",
    shown: "Angezeigt",
    empty: "Zurzeit sind keine Fotos verfügbar.",
    viewer: "Galerie Boruch Myjnia",
    loading: "Foto wird geladen",
    error: "Das Foto konnte nicht geladen werden.",
    errorHint: "Versuchen Sie es erneut oder wählen Sie ein anderes Foto.",
    retry: "Erneut versuchen",
    thumbs: "Foto auswählen",
  },
  uk: {
    layout: "Вигляд галереї",
    editorial: "Композиція",
    natural: "Повні кадри",
    hint: "Відкрийте фото, щоб побачити його повністю.",
    shown: "Показано",
    empty: "Поки немає фотографій для відображення.",
    viewer: "Галерея Boruch Myjnia",
    loading: "Завантаження фото",
    error: "Не вдалося завантажити фото.",
    errorHint: "Спробуйте ще раз або перейдіть до іншого кадру.",
    retry: "Спробувати ще раз",
    thumbs: "Оберіть фото",
  },
} satisfies Record<Locale, Record<string, string>>

function photoCount(count: number, locale: Locale) {
  if (locale === "en") return count + (count === 1 ? " photo" : " photos")
  if (locale === "de") return count + (count === 1 ? " Foto" : " Fotos")
  if (locale === "uk") return count + " фото"
  if (count === 1) return "1 zdjęcie"
  const last = count % 10
  const lastTwo = count % 100
  return count + (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? " zdjęcia" : " zdjęć")
}

function tileGeometry(id: PhotoId, index: number): CSSProperties {
  const meta = photos[id]
  const originalRatio = meta.w / meta.h

  if (index === 0) {
    return {
      "--gp-span": 12,
      "--gp-ratio": originalRatio < 1 ? "4 / 3" : "2 / 1",
      "--gp-mobile-span": 2,
      "--gp-mobile-ratio": originalRatio < 1 ? "4 / 5" : "4 / 3",
      "--gp-natural-ratio": String(originalRatio),
    } as CSSProperties
  }

  const span = [5, 7, 7, 5, 6, 6][(index - 1) % 6]
  const mobileWide = (index - 1) % 3 === 2

  return {
    "--gp-span": span,
    "--gp-ratio": span === 6 ? "3 / 2" : span + " / 4",
    "--gp-mobile-span": mobileWide ? 2 : 1,
    "--gp-mobile-ratio": mobileWide ? "4 / 3" : originalRatio < 1 ? "4 / 5" : "1 / 1",
    "--gp-natural-ratio": String(originalRatio),
  } as CSSProperties
}

function tileSizes(index: number, view: View) {
  if (view === "natural") {
    return "(min-width: 1416px) 424px, (min-width: 1024px) calc((100vw - 144px) / 3), (min-width: 761px) calc((100vw - 88px) / 2), calc((100vw - 52px) / 2)"
  }

  if (index === 0) return "(min-width: 1416px) 1320px, (min-width: 1024px) calc(100vw - 96px), (min-width: 761px) calc(100vw - 64px), calc(100vw - 40px)"

  const span = [5, 7, 7, 5, 6, 6][(index - 1) % 6]
  const desktopWidth = Math.ceil((1320 - 24) * span / 12)
  const tabletPercent = Math.round(span / 12 * 100)
  const mobile = (index - 1) % 3 === 2 ? "calc(100vw - 40px)" : "calc((100vw - 52px) / 2)"

  return "(min-width: 1416px) " + desktopWidth + "px, (min-width: 761px) " + tabletPercent + "vw, " + mobile
}

export function GalleryPortfolio({ ids, labels, locale = "pl" }: GalleryPortfolioProps) {
  const copy = copyByLocale[locale]
  const collection = useMemo(() => Array.from(new Set(ids)).filter(id => Boolean(photos[id])), [ids])
  const uid = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const filmstripRef = useRef<HTMLElement>(null)
  const thumbnailRefs = useRef(new Map<PhotoId, HTMLButtonElement>())
  const pendingThumbnailFocus = useRef(false)
  const triggerRefs = useRef(new Map<PhotoId, HTMLButtonElement>())
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const pendingFocusRef = useRef<PhotoId | null>(null)
  const selectedRef = useRef<PhotoId | null>(null)
  const frameRef = useRef<Frame | null>(null)
  const requestRef = useRef(0)
  const touchRef = useRef<Gesture | null>(null)
  const mouseRef = useRef<MouseGesture | null>(null)
  const suppressClickRef = useRef(false)
  const backgroundPressRef = useRef(false)

  const [view, setView] = useState<View>("editorial")
  const [visibleCount, setVisibleCount] = useState(12)
  const [selected, setSelected] = useState<PhotoId | null>(null)
  const [frame, setFrame] = useState<Frame | null>(null)
  const [previousFrame, setPreviousFrame] = useState<Frame | null>(null)
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [retry, setRetry] = useState(0)
  const [viewportRevision, setViewportRevision] = useState(0)
  const [wideScreen, setWideScreen] = useState(false)

  const activeIndex = selected === null ? -1 : collection.indexOf(selected)
  const isOpen = activeIndex >= 0
  const multiple = collection.length > 1
  const displayed = Math.min(visibleCount, collection.length)
  const hasCurrentFrame = frame?.id === selected
  const loading = isOpen && (loadState === "loading" || !hasCurrentFrame) && loadState !== "error"

  const step = useCallback((delta: number) => {
    const index = selectedRef.current === null ? -1 : collection.indexOf(selectedRef.current)
    if (index < 0 || collection.length < 2) return
    const next = collection[(index + delta + collection.length) % collection.length]
    if (filmstripRef.current?.contains(document.activeElement)) {
      pendingThumbnailFocus.current = true
      closeRef.current?.focus({ preventScroll: true })
    } else if (document.activeElement?.closest(".gp-load-error")) {
      closeRef.current?.focus({ preventScroll: true })
    }
    selectedRef.current = next
    setLoadState("loading")
    setSelected(next)
  }, [collection])

  const open = (id: PhotoId, trigger: HTMLButtonElement) => {
    openerRef.current = trigger
    selectedRef.current = id
    setLoadState("loading")
    setSelected(id)
  }

  const close = useCallback(() => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
  }, [])

  const handleClose = useCallback(() => {
    requestRef.current += 1
    selectedRef.current = null
    frameRef.current = null
    touchRef.current = null
    mouseRef.current = null
    pendingThumbnailFocus.current = false
    backgroundPressRef.current = false
    setSelected(null)
    setFrame(null)
    setPreviousFrame(null)
    setLoadState("idle")
    requestAnimationFrame(() => {
      if (openerRef.current?.isConnected) {
        openerRef.current.focus({ preventScroll: true })
      } else {
        rootRef.current?.focus({ preventScroll: true })
      }
    })
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px) and (min-height: 481px)")
    const update = () => {
      if (!media.matches && filmstripRef.current?.contains(document.activeElement)) {
        closeRef.current?.focus({ preventScroll: true })
      }
      setWideScreen(media.matches)
    }
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  // The content is committed before showModal(), so autofocus always has a target.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
      closeRef.current?.focus({ preventScroll: true })
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    if (selected !== null && !collection.includes(selected)) {
      selectedRef.current = null
      setSelected(null)
    }
  }, [collection, selected])

  useEffect(() => {
    const id = pendingFocusRef.current
    if (!id) return
    pendingFocusRef.current = null
    triggerRefs.current.get(id)?.focus({ preventScroll: true })
  }, [visibleCount])

  useEffect(() => {
    if (!isOpen) return
    const body = document.body
    const oldOverflow = body.style.overflow
    const oldPadding = body.style.paddingRight
    const scrollbar = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
    if (scrollbar > 0) {
      body.style.paddingRight = parseFloat(getComputedStyle(body).paddingRight || "0") + scrollbar + "px"
    }
    body.style.overflow = "hidden"

    let timer: ReturnType<typeof setTimeout> | undefined
    const resize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setViewportRevision(value => value + 1), 160)
    }
    window.addEventListener("resize", resize)

    return () => {
      body.style.overflow = oldOverflow
      body.style.paddingRight = oldPadding
      window.removeEventListener("resize", resize)
      clearTimeout(timer)
    }
  }, [isOpen])

  // A decoded image replaces the visible frame atomically. Stale requests are ignored.
  useEffect(() => {
    if (!isOpen || selected === null) return
    const id = selected
    const ticket = ++requestRef.current
    let cancelled = false
    const image = new Image()
    const meta = photos[id]
    const stage = stageRef.current?.getBoundingClientRect()
    const width = Math.max(64, Math.ceil(Math.min(
      stage?.width || window.innerWidth - 32,
      (stage?.height || window.innerHeight * .65) * meta.w / meta.h,
    )))

    setLoadState("loading")
    image.decoding = "async"
    image.fetchPriority = "high"
    image.onload = async () => {
      try {
        await image.decode()
      } catch {
        if (!image.naturalWidth) {
          if (!cancelled && ticket === requestRef.current) setLoadState("error")
          return
        }
      }
      if (cancelled || ticket !== requestRef.current || selectedRef.current !== id) return

      const nextFrame = { id, src: image.currentSrc || image.src, key: ticket }
      const previous = frameRef.current
      if (previous?.id === id && previous.src === nextFrame.src) {
        setLoadState("ready")
        return
      }
      setPreviousFrame(previous?.src !== nextFrame.src ? previous : null)
      frameRef.current = nextFrame
      setFrame(nextFrame)
      setLoadState("ready")
    }
    image.onerror = () => {
      if (!cancelled && ticket === requestRef.current && selectedRef.current === id) {
        setLoadState("error")
      }
    }
    image.sizes = width + "px"
    image.srcset = photoSrcSet(id)
    image.src = photoSrc(id, width)

    return () => {
      cancelled = true
      image.onload = null
      image.onerror = null
    }
  }, [isOpen, selected, retry, viewportRevision])

  useEffect(() => {
    if (!frame) return
    const timer = setTimeout(() => setPreviousFrame(null), 320)
    return () => clearTimeout(timer)
  }, [frame])

  // Warm only the next full image, at its real fitted width, and only after the current one.
  useEffect(() => {
    if (!isOpen || loadState !== "ready" || !frame || frame.id !== selected || collection.length < 2) return
    const index = collection.indexOf(frame.id)
    const id = collection[(index + 1) % collection.length]
    if (id === frame.id) return
    const meta = photos[id]
    const stage = stageRef.current?.getBoundingClientRect()
    const width = Math.max(64, Math.ceil(Math.min(
      stage?.width || window.innerWidth - 32,
      (stage?.height || window.innerHeight * .65) * meta.w / meta.h,
    )))
    const image = new Image()
    image.decoding = "async"
    image.fetchPriority = "low"
    image.sizes = width + "px"
    image.srcset = photoSrcSet(id)
    image.src = photoSrc(id, width)
  }, [collection, frame, isOpen, loadState, selected, viewportRevision])

  const nearby = useMemo(() => {
    if (activeIndex < 0 || !wideScreen) return []
    const offsets = [-2, -1, 0, 1, 2]
    return Array.from(new Set(offsets.map(offset => (
      (activeIndex + offset + collection.length) % collection.length
    ))))
  }, [activeIndex, collection.length, wideScreen])

  const select = (id: PhotoId) => {
    if (id === selectedRef.current) return
    selectedRef.current = id
    setLoadState("loading")
    setSelected(id)
  }

  useEffect(() => {
    if (!pendingThumbnailFocus.current || selected === null) return
    pendingThumbnailFocus.current = false
    const target = thumbnailRefs.current.get(selected)
    if (target) target.focus({ preventScroll: true })
    else closeRef.current?.focus({ preventScroll: true })
  }, [selected, nearby])

  const navigateGesture = (start: Gesture, end: Gesture) => {
    const dx = end.x - start.x
    const dy = end.y - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1)
  }

  const frameIndex = frame ? collection.indexOf(frame.id) : -1
  const captionId = loadState === "error" ? selected : frame?.id
  const readyAnnouncement = loadState === "ready" && frame && frameIndex >= 0
    ? labels.photo + " " + (frameIndex + 1) + " " + labels.of + " " + collection.length + ". " + photos[frame.id].alt
    : loading ? copy.loading : ""

  return (
    <div className="gallery-portfolio" ref={rootRef} tabIndex={-1}>
      <div className="gp-toolbar">
        <div className="gp-collection-info">
          <p className="gp-total">{photoCount(collection.length, locale)}</p>
          <p className="gp-hint">{copy.hint}</p>
        </div>
        <div className="gp-view-options" role="group" aria-label={copy.layout}>
          <button type="button" aria-pressed={view === "editorial"} onClick={() => setView("editorial")}>
            <Rows3 aria-hidden="true" strokeWidth={1.6} />
            {copy.editorial}
          </button>
          <button type="button" aria-pressed={view === "natural"} onClick={() => setView("natural")}>
            <Grid2X2 aria-hidden="true" strokeWidth={1.6} />
            {copy.natural}
          </button>
        </div>
      </div>

      {collection.length === 0 ? (
        <p className="gp-empty">{copy.empty}</p>
      ) : (
        <ul className={"gp-grid gp-grid--" + view} role="list">
          {collection.slice(0, displayed).map((id, index) => (
            <li key={id} className={index === 0 ? "gp-tile gp-tile--cover" : "gp-tile"} style={tileGeometry(id, index)}>
              <button
                type="button"
                ref={element => {
                  if (element) triggerRefs.current.set(id, element)
                  else triggerRefs.current.delete(id)
                }}
                onClick={event => open(id, event.currentTarget)}
                aria-label={labels.open + ": " + photos[id].alt}
                className="gp-tile-button"
              >
                <span className="gp-photo-frame">
                  <Photo
                    id={id}
                    priority={index === 0}
                    position={photos[id].w > photos[id].h ? "50% 54%" : "50% 52%"}
                    sizes={tileSizes(index, view)}
                  />
                  <span className="gp-open-mark" aria-hidden="true"><Expand strokeWidth={1.6} /></span>
                </span>
                <span className="gp-tile-caption" aria-hidden="true">
                  <span>{photos[id].alt}</span>
                  <ArrowRight strokeWidth={1.5} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {collection.length > 0 && (
        <div className="gp-load-footer">
          <p className="gp-shown" role="status">{copy.shown} {displayed} {labels.of} {collection.length}</p>
          {displayed < collection.length && (
            <button
              type="button"
              className="gp-more"
              onClick={() => {
                pendingFocusRef.current = collection[displayed]
                setVisibleCount(count => Math.min(collection.length, count + 12))
              }}
            >
              {labels.more}<ArrowRight aria-hidden="true" strokeWidth={1.6} />
            </button>
          )}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="gp-viewer"
        aria-labelledby={uid + "-viewer-title"}
        onClose={handleClose}
        onKeyDown={event => {
          if (event.altKey || event.ctrlKey || event.metaKey) return
          if (event.key === "ArrowRight") { event.preventDefault(); step(1) }
          if (event.key === "ArrowLeft") { event.preventDefault(); step(-1) }
        }}
      >
        <div className="gp-viewer-layout">
          <header className="gp-viewer-top">
            <h2 id={uid + "-viewer-title"}>{copy.viewer}</h2>
            <p className="gp-position" aria-hidden="true">
              {Math.max(0, activeIndex + 1)} <span>/ {collection.length}</span>
            </p>
            <button ref={closeRef} className="gp-close" type="button" onClick={close} aria-label={labels.close}>
              <span>{labels.close}</span><X aria-hidden="true" strokeWidth={1.6} />
            </button>
          </header>

          <div
            ref={stageRef}
            className={multiple ? "gp-stage gp-stage--draggable" : "gp-stage"}
            onClick={event => {
              if (suppressClickRef.current) { suppressClickRef.current = false; return }
              if (event.target === event.currentTarget && backgroundPressRef.current) close()
            }}
            onTouchStart={event => {
              suppressClickRef.current = false
              backgroundPressRef.current = event.target === event.currentTarget
              if (event.touches.length !== 1 || (event.target as Element).closest("button")) {
                touchRef.current = null
                return
              }
              touchRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
            }}
            onTouchMove={event => {
              if (event.touches.length !== 1) touchRef.current = null
            }}
            onTouchEnd={event => {
              const start = touchRef.current
              touchRef.current = null
              const touch = event.changedTouches[0]
              if (!start || !touch) return
              suppressClickRef.current = Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 8
              navigateGesture(start, { x: touch.clientX, y: touch.clientY })
            }}
            onTouchCancel={() => { touchRef.current = null }}
            onPointerDown={event => {
              if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("button")) return
              backgroundPressRef.current = event.target === event.currentTarget
              if (!multiple) return
              mouseRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId, dragging: false }
              suppressClickRef.current = false
              event.preventDefault()
            }}
            onPointerMove={event => {
              const start = mouseRef.current
              if (event.pointerType === "mouse" && event.buttons !== 1) { mouseRef.current = null; return }
              if (!start || start.pointerId !== event.pointerId || start.dragging) return
              if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) {
                start.dragging = true
                suppressClickRef.current = true
                event.currentTarget.setPointerCapture(event.pointerId)
              }
            }}
            onPointerLeave={event => {
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) mouseRef.current = null
            }}
            onPointerUp={event => {
              const start = mouseRef.current
              mouseRef.current = null
              if (!start || start.pointerId !== event.pointerId) return
              const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
              suppressClickRef.current = start.dragging || moved > 8
              navigateGesture(start, { x: event.clientX, y: event.clientY })
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
            }}
            onPointerCancel={() => { mouseRef.current = null; suppressClickRef.current = true }}
          >
            <div className="gp-canvas" aria-hidden={loading || loadState === "error" ? true : undefined}>
              {loadState !== "error" && previousFrame && previousFrame.key !== frame?.key && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={"previous-" + previousFrame.key}
                  src={previousFrame.src}
                  width={photos[previousFrame.id].w}
                  height={photos[previousFrame.id].h}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="gp-viewer-image gp-image-previous"
                />
              )}
              {loadState !== "error" && frame && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={"current-" + frame.key}
                  src={frame.src}
                  width={photos[frame.id].w}
                  height={photos[frame.id].h}
                  alt={photos[frame.id].alt}
                  decoding="async"
                  draggable={false}
                  className="gp-viewer-image gp-image-current"
                  onError={() => {
                    if (frameRef.current?.key === frame.key && frame.id === selectedRef.current) setLoadState("error")
                  }}
                />
              )}
            </div>

            {loading && (
              <div className="gp-loading" aria-hidden="true">
                <LoaderCircle strokeWidth={1.5} /><span>{copy.loading}</span>
              </div>
            )}

            {loadState === "error" && (
              <div className="gp-load-error" role="alert">
                <p>{copy.error}</p>
                <span>{copy.errorHint}</span>
                <button type="button" onClick={() => {
                  closeRef.current?.focus({ preventScroll: true })
                  setRetry(value => value + 1)
                }}>
                  <RefreshCw aria-hidden="true" strokeWidth={1.6} />{copy.retry}
                </button>
              </div>
            )}

            {multiple && (
              <>
                <button type="button" className="gp-side-arrow gp-side-arrow--prev" onClick={() => step(-1)} aria-label={labels.prev}>
                  <ArrowLeft aria-hidden="true" strokeWidth={1.6} />
                </button>
                <button type="button" className="gp-side-arrow gp-side-arrow--next" onClick={() => step(1)} aria-label={labels.next}>
                  <ArrowRight aria-hidden="true" strokeWidth={1.6} />
                </button>
              </>
            )}
          </div>

          <footer className="gp-viewer-bottom">
            <p className="gp-viewer-caption" tabIndex={0}>{captionId ? photos[captionId].alt : ""}</p>
            {multiple && (
              <div className="gp-bottom-arrows">
                <button type="button" onClick={() => step(-1)} aria-label={labels.prev}><ArrowLeft aria-hidden="true" strokeWidth={1.6} /></button>
                <button type="button" onClick={() => step(1)} aria-label={labels.next}><ArrowRight aria-hidden="true" strokeWidth={1.6} /></button>
              </div>
            )}
          </footer>

          {wideScreen && multiple && nearby.length > 0 && (
            <nav ref={filmstripRef} className="gp-filmstrip" aria-label={copy.thumbs}>
              {nearby.map(index => {
                const id = collection[index]
                return (
                  <button
                    type="button"
                    key={id}
                    ref={element => {
                      if (element) thumbnailRefs.current.set(id, element)
                      else thumbnailRefs.current.delete(id)
                    }}
                    aria-label={labels.open + ": " + photos[id].alt}
                    aria-current={selected === id ? "true" : undefined}
                    onClick={() => select(id)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoSrc(id, 480)} width={photos[id].w} height={photos[id].h} alt="" decoding="async" fetchPriority="low" draggable={false} />
                  </button>
                )
              })}
            </nav>
          )}

          <p className="gp-sr-only" aria-live="polite" aria-atomic="true">{readyAnnouncement}</p>
        </div>
      </dialog>

      <style>{PORTFOLIO_STYLES}</style>
    </div>
  )
}

const PORTFOLIO_STYLES = `
  .gallery-portfolio {
    --gp-bg: #09090b;
    --gp-surface: #141416;
    --gp-ink: #f5f2ed;
    --gp-muted: #b7b5b3;
    --gp-accent: #df3039;
    --gp-line: rgba(245, 242, 237, .14);
    --gp-ease: cubic-bezier(.22, .61, .36, 1);
    color: var(--gp-ink);
    outline-offset: 6px;
  }
  .gallery-portfolio,
  .gallery-portfolio * { box-sizing: border-box; }
  .gallery-portfolio :where(ul, p, h2) { margin: 0; }
  .gallery-portfolio button { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .gallery-portfolio svg { display: block; flex-shrink: 0; }
  .gallery-portfolio .gp-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.25rem 2rem; padding-bottom: 1.75rem; }
  .gallery-portfolio .gp-total { font-size: .9375rem; font-weight: 550; line-height: 1.5; }
  .gallery-portfolio .gp-hint { margin-top: .4rem; color: var(--gp-muted); font-size: .8125rem; line-height: 1.65; }
  .gallery-portfolio .gp-view-options { display: flex; gap: .35rem; padding: .25rem; border: 1px solid var(--gp-line); }
  .gallery-portfolio .gp-view-options button { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; gap: .6rem; padding: .65rem .9rem; border: 1px solid transparent; background: transparent; color: var(--gp-muted); font-size: .8125rem; font-weight: 500; line-height: 1.5; transition: color 180ms, background-color 180ms, border-color 180ms; }
  .gallery-portfolio .gp-view-options button > svg { width: 17px; height: 17px; }
  .gallery-portfolio .gp-view-options button[aria-pressed="true"] { color: var(--gp-ink); background: #242427; border-color: rgba(245, 242, 237, .12); }
  .gallery-portfolio .gp-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); align-items: start; gap: 2.5rem 1.5rem; padding: 0; list-style: none; }
  .gallery-portfolio .gp-tile { grid-column: span var(--gp-span); min-width: 0; }
  .gallery-portfolio .gp-tile-button { display: block; width: 100%; padding: 0; border: 0; background: transparent; text-align: left; cursor: zoom-in; }
  .gallery-portfolio .gp-photo-frame {
    display: block;
    position: relative;
    isolation: isolate;
    aspect-ratio: var(--gp-ratio);
    width: 100%;
    overflow: hidden;
    background: var(--gp-surface);
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  }
  .gallery-portfolio .gp-photo-frame picture { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
  .gallery-portfolio .gp-photo-frame picture img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 420ms var(--gp-ease); }
  .gallery-portfolio .gp-open-mark { position: absolute; right: 1rem; bottom: 1rem; display: flex; width: 42px; height: 42px; align-items: center; justify-content: center; background: rgba(9, 9, 11, .8); border: 1px solid rgba(245, 242, 237, .3); color: #fff; pointer-events: none; transition: background-color 180ms, border-color 180ms; }
  .gallery-portfolio .gp-open-mark > svg { width: 18px; height: 18px; }
  .gallery-portfolio .gp-tile-caption { display: flex; align-items: flex-start; justify-content: space-between; gap: 1.2rem; padding-top: .9rem; color: var(--gp-muted); font-size: .875rem; font-weight: 400; line-height: 1.65; }
  .gallery-portfolio .gp-tile-caption > span { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .gallery-portfolio .gp-tile-caption > svg { width: 17px; height: 17px; margin-top: .2rem; color: var(--gp-accent); }
  .gallery-portfolio .gp-grid--natural { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .gallery-portfolio .gp-grid--natural .gp-tile { grid-column: auto; }
  .gallery-portfolio .gp-grid--natural .gp-photo-frame { aspect-ratio: var(--gp-natural-ratio); }
  .gallery-portfolio .gp-load-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.25rem; margin-top: 2.5rem; padding-top: 1.75rem; border-top: 1px solid var(--gp-line); }
  .gallery-portfolio .gp-shown { color: var(--gp-muted); font-size: .8125rem; line-height: 1.6; }
  .gallery-portfolio .gp-more { display: inline-flex; min-height: 50px; align-items: center; justify-content: center; gap: 1.25rem; padding: .85rem 1.25rem; border: 1px solid rgba(245, 242, 237, .3); background: transparent; font-size: .875rem; font-weight: 550; line-height: 1.5; transition: border-color 180ms, background-color 180ms; }
  .gallery-portfolio .gp-more > svg { width: 18px; height: 18px; color: var(--gp-accent); }
  .gallery-portfolio .gp-empty { padding-block: 3rem; border-block: 1px solid var(--gp-line); color: var(--gp-muted); line-height: 1.75; }

  .gallery-portfolio .gp-viewer {
    position: fixed;
    inset: 0;
    width: 100%;
    max-width: none;
    height: 100vh;
    height: 100dvh;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: var(--gp-bg);
    color: var(--gp-ink);
    overflow: hidden;
  }
  .gallery-portfolio .gp-viewer::backdrop { background: rgba(0, 0, 0, .92); }
  .gallery-portfolio .gp-viewer-layout { display: flex; height: 100%; min-height: 0; flex-direction: column; padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px); }
  .gallery-portfolio .gp-viewer-top { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 1rem; align-items: center; padding: .85rem 2rem; border-bottom: 1px solid var(--gp-line); }
  .gallery-portfolio .gp-viewer-top h2 { font: inherit; font-size: .8125rem; font-weight: 550; line-height: 1.5; text-transform: none; letter-spacing: 0; overflow-wrap: anywhere; }
  .gallery-portfolio .gp-position { font-size: .9375rem; font-weight: 550; line-height: 1.5; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .gallery-portfolio .gp-position > span { color: var(--gp-muted); font-weight: 400; }
  .gallery-portfolio .gp-close { display: inline-flex; min-height: 44px; justify-self: end; align-items: center; gap: .65rem; padding: .65rem .8rem; border: 1px solid var(--gp-line); background: transparent; font-size: .8125rem; font-weight: 500; line-height: 1.5; }
  .gallery-portfolio .gp-close > svg { width: 19px; height: 19px; }
  .gallery-portfolio .gp-stage { position: relative; flex: 1; min-height: 0; margin: 1.5rem 5.5rem; touch-action: pan-y pinch-zoom; }
  .gallery-portfolio .gp-stage--draggable { cursor: grab; }
  .gallery-portfolio .gp-stage--draggable:active { cursor: grabbing; }
  .gallery-portfolio .gp-canvas { position: absolute; inset: 0; pointer-events: none; }
  .gallery-portfolio .gp-viewer-image { position: absolute; top: 50%; left: 50%; display: block; width: auto; height: auto; max-width: 100%; max-height: 100%; object-fit: contain; transform: translate(-50%, -50%); pointer-events: auto; user-select: none; -webkit-user-select: none; }
  .gallery-portfolio .gp-image-current { animation: gp-photo-in 280ms var(--gp-ease) both; }
  .gallery-portfolio .gp-image-previous { animation: gp-photo-out 280ms var(--gp-ease) both; }
  .gallery-portfolio .gp-loading { position: absolute; bottom: 1rem; left: 50%; display: flex; max-width: calc(100% - 2rem); align-items: center; gap: .6rem; transform: translateX(-50%); padding: .7rem 1rem; background: rgba(9, 9, 11, .88); border: 1px solid var(--gp-line); color: var(--gp-muted); font-size: .8125rem; line-height: 1.5; pointer-events: none; }
  .gallery-portfolio .gp-loading > svg { width: 18px; height: 18px; animation: gp-spin 1s linear infinite; }
  .gallery-portfolio .gp-load-error { position: absolute; top: 50%; left: 50%; width: min(100% - 2rem, 400px); max-height: 100%; overflow-y: auto; padding: .25rem; transform: translate(-50%, -50%); text-align: center; cursor: default; }
  .gallery-portfolio .gp-load-error > p { font-size: 1.0625rem; font-weight: 550; line-height: 1.6; }
  .gallery-portfolio .gp-load-error > span { display: block; margin-top: .65rem; color: var(--gp-muted); font-size: .875rem; line-height: 1.7; }
  .gallery-portfolio .gp-load-error > button { display: inline-flex; min-height: 46px; align-items: center; gap: .7rem; margin-top: 1.25rem; padding: .7rem 1rem; border: 1px solid var(--gp-line); background: var(--gp-surface); font-size: .875rem; line-height: 1.5; }
  .gallery-portfolio .gp-load-error > button > svg { width: 17px; height: 17px; }
  .gallery-portfolio .gp-side-arrow { position: absolute; top: 50%; display: inline-flex; width: 48px; height: 48px; align-items: center; justify-content: center; transform: translateY(-50%); border: 1px solid var(--gp-line); background: var(--gp-surface); }
  .gallery-portfolio .gp-side-arrow > svg { width: 21px; height: 21px; }
  .gallery-portfolio .gp-side-arrow--prev { left: -4rem; }
  .gallery-portfolio .gp-side-arrow--next { right: -4rem; }
  .gallery-portfolio .gp-viewer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding: 1rem 2rem; border-top: 1px solid var(--gp-line); }
  .gallery-portfolio .gp-viewer-caption { max-width: 90ch; max-height: 5.1em; overflow-y: auto; color: var(--gp-muted); font-size: .875rem; font-weight: 400; line-height: 1.7; text-wrap: pretty; overflow-wrap: anywhere; }
  .gallery-portfolio .gp-bottom-arrows { display: none; gap: .5rem; flex-shrink: 0; }
  .gallery-portfolio .gp-bottom-arrows button { display: inline-flex; width: 46px; height: 46px; align-items: center; justify-content: center; border: 1px solid var(--gp-line); background: transparent; }
  .gallery-portfolio .gp-bottom-arrows button > svg { width: 20px; height: 20px; }
  .gallery-portfolio .gp-filmstrip { display: flex; flex-shrink: 0; justify-content: center; gap: .6rem; padding: .3rem 2rem 1rem; }
  .gallery-portfolio .gp-filmstrip button { display: block; width: 74px; height: 50px; padding: 0; border: 2px solid transparent; background: var(--gp-surface); opacity: .55; transition: opacity 180ms, border-color 180ms; }
  .gallery-portfolio .gp-filmstrip button[aria-current="true"] { border-color: var(--gp-accent); opacity: 1; }
  .gallery-portfolio .gp-filmstrip img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .gallery-portfolio:focus-visible,
  .gallery-portfolio :where(button, .gp-viewer-caption):focus-visible { outline: 2px solid var(--gp-ink); outline-offset: 5px; }
  .gallery-portfolio .gp-tile-button:focus-visible .gp-open-mark { border-color: var(--gp-accent); background: #b51f28; }
  .gallery-portfolio .gp-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  @keyframes gp-photo-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes gp-photo-out { from { opacity: 1; } to { opacity: 0; } }
  @keyframes gp-spin { to { transform: rotate(360deg); } }
  @media (hover: hover) {
    .gallery-portfolio .gp-view-options button:hover { color: var(--gp-ink); }
    .gallery-portfolio .gp-grid--editorial .gp-tile-button:hover picture img { transform: scale(1.025); }
    .gallery-portfolio .gp-tile-button:hover .gp-open-mark { border-color: var(--gp-accent); background: #b51f28; }
    .gallery-portfolio .gp-more:hover,
    .gallery-portfolio .gp-close:hover,
    .gallery-portfolio .gp-side-arrow:hover,
    .gallery-portfolio .gp-bottom-arrows button:hover { background: #242427; border-color: rgba(245, 242, 237, .35); }
    .gallery-portfolio .gp-filmstrip button:hover { opacity: 1; }
  }
  @media (max-width: 1023px) {
    .gallery-portfolio .gp-grid--natural { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 899px) {
    .gallery-portfolio .gp-stage { margin: 1rem 1.25rem; }
    .gallery-portfolio .gp-side-arrow { display: none; }
    .gallery-portfolio .gp-bottom-arrows { display: flex; }
    .gallery-portfolio .gp-viewer-top { padding-inline: 1.25rem; }
    .gallery-portfolio .gp-viewer-bottom { padding-inline: 1.25rem; }
  }
  @media (max-width: 760px) {
    .gallery-portfolio .gp-toolbar { gap: 1rem; padding-bottom: 1.5rem; }
    .gallery-portfolio .gp-view-options { width: 100%; }
    .gallery-portfolio .gp-view-options button { flex: 1; padding-inline: .5rem; font-size: .8125rem; }
    .gallery-portfolio .gp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem .75rem; }
    .gallery-portfolio .gp-tile { grid-column: span var(--gp-mobile-span); }
    .gallery-portfolio .gp-photo-frame { aspect-ratio: var(--gp-mobile-ratio); clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px)); }
    .gallery-portfolio .gp-grid--natural .gp-tile { grid-column: auto; }
    .gallery-portfolio .gp-open-mark { width: 34px; height: 34px; bottom: .65rem; right: .65rem; }
    .gallery-portfolio .gp-open-mark > svg { width: 16px; height: 16px; }
    .gallery-portfolio .gp-tile-caption { padding-top: .65rem; font-size: .8125rem; gap: .5rem; line-height: 1.6; }
    .gallery-portfolio .gp-tile-caption > svg { display: none; }
    .gallery-portfolio .gp-load-footer { margin-top: 2rem; padding-top: 1.5rem; }
    .gallery-portfolio .gp-more { width: 100%; }
    .gallery-portfolio .gp-viewer-top { grid-template-columns: minmax(0, 1fr) auto auto; gap: .75rem; padding: .65rem 1rem; }
    .gallery-portfolio .gp-viewer-top h2 { max-width: 20ch; font-size: .75rem; }
    .gallery-portfolio .gp-close { width: 44px; height: 44px; padding: 0; justify-content: center; }
    .gallery-portfolio .gp-close > span { display: none; }
    .gallery-portfolio .gp-stage { margin: .85rem .75rem; }
    .gallery-portfolio .gp-viewer-bottom { align-items: flex-start; gap: 1rem; padding: .85rem 1rem; }
    .gallery-portfolio .gp-viewer-caption { max-height: 6.8em; font-size: .8125rem; line-height: 1.7; }
    .gallery-portfolio .gp-position { font-size: .875rem; }
    .gallery-portfolio .gp-loading { bottom: .5rem; font-size: .75rem; }
  }
  @media (max-height: 480px) and (orientation: landscape) {
    .gallery-portfolio .gp-viewer-top { padding-block: .3rem; }
    .gallery-portfolio .gp-stage { margin-block: .5rem; }
    .gallery-portfolio .gp-viewer-bottom { padding-block: .35rem; }
    .gallery-portfolio .gp-viewer-caption { max-height: 3.4em; font-size: .75rem; }
    .gallery-portfolio .gp-filmstrip { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gallery-portfolio *,
    .gallery-portfolio *::before,
    .gallery-portfolio *::after { animation: none !important; transition: none !important; }
    .gallery-portfolio .gp-image-previous { opacity: 0; }
    .gallery-portfolio .gp-tile-button:hover picture img { transform: none; }
  }
  @media (forced-colors: active) {
    .gallery-portfolio .gp-view-options button[aria-pressed="true"],
    .gallery-portfolio .gp-filmstrip button[aria-current="true"] { border-color: Highlight; }
  }
`

