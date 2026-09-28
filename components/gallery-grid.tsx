"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import type { GalleryImage } from "@/lib/gallery-data"

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-[3/4] overflow-hidden border border-border"
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-background"
            aria-label="Zamknij podgląd"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active].src || "/placeholder.svg"}
              alt={images[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
