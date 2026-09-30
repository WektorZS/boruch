import { photos, type PhotoId } from "@/lib/photos"
import { cn } from "@/lib/utils"

export function photoSrc(id: PhotoId, width?: number) {
  const meta = photos[id]
  const size = width ? (meta.sizes.find((s) => s >= width) ?? meta.sizes[meta.sizes.length - 1]) : meta.sizes[meta.sizes.length - 1]
  return `/images/photos/${id}-${size}.webp`
}

export function photoSrcSet(id: PhotoId) {
  return photos[id].sizes.map((s) => `/images/photos/${id}-${s}.webp ${s}w`).join(", ")
}

interface PhotoProps {
  id: PhotoId
  sizes: string
  className?: string
  alt?: string
  priority?: boolean
  /** Load before the image enters the viewport without competing with the hero image. */
  eager?: boolean
  /** CSS object-position, e.g. "50% 80%". */
  position?: string
}

/** Authentic BORUCH photograph rendered as a responsive, static-export friendly <img>. */
export function Photo({ id, sizes, className, alt, priority = false, eager = false, position }: PhotoProps) {
  const meta = photos[id]
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoSrc(id, 960)}
      srcSet={photoSrcSet(id)}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={alt ?? meta.alt}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      style={position ? { objectPosition: position } : undefined}
      className={cn("h-full w-full object-cover", className)}
    />
  )
}
