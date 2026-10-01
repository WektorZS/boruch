import { photos, type PhotoId } from "@/lib/photos"
import { clsx as cn } from "clsx"

// Versioned files can be cached for a year without retaining an older photo after an update.
const optimizedPhotos: ReadonlySet<PhotoId> = new Set(["p11", "p20", "p39", "p43", "p46", "p52", "p60", "p62"])

function photoSizes(id: PhotoId) {
  if (id === "p60") return [480, 768, 960, 1280]
  const sizes = photos[id].sizes
  return optimizedPhotos.has(id) ? [...new Set([...sizes, 768, 1280])].filter(size => size <= sizes[sizes.length - 1]).sort((a, b) => a - b) : sizes
}

export function photoSrc(id: PhotoId, width?: number, format: "webp" | "avif" = "webp") {
  const sizes = photoSizes(id)
  const size = width ? (sizes.find((s) => s >= width) ?? sizes[sizes.length - 1]) : sizes[sizes.length - 1]
  const folder = id === "p60" ? "optimized-v3/" : id === "p11" && format === "avif" && size <= 960 ? "hero-v2/" : optimizedPhotos.has(id) ? "optimized-v1/" : ""
  return `/images/photos/${folder}${id}-${size}.${format}`
}

export function photoSrcSet(id: PhotoId, format: "webp" | "avif" = "webp") {
  return photoSizes(id).map((size) => `${photoSrc(id, size, format)} ${size}w`).join(", ")
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
    <>
    {priority && optimizedPhotos.has(id) && <link rel="preload" as="image" type="image/avif" href={photoSrc(id, 960, "avif")} imageSrcSet={photoSrcSet(id, "avif")} imageSizes={sizes} fetchPriority="high" />}
    {/* A full-size block is required for the section's clip-path reveal and lazy-loading bounds. */}
    <picture className="absolute inset-0 block h-full w-full">
      {optimizedPhotos.has(id) && <source type="image/avif" srcSet={photoSrcSet(id, "avif")} sizes={sizes} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoSrc(id, 960)}
        srcSet={photoSrcSet(id)}
        sizes={sizes}
        width={meta.w}
        height={meta.h}
        alt={alt ?? meta.alt}
        loading={priority || eager ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "auto" : "async"}
        draggable={false}
        style={position ? { objectPosition: position } : undefined}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    </picture>
    </>
  )
}
