"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BrowserItem {
  slug: string
  index: string
  title: string
  text: string
  category: string
  price: string
  priced: boolean
  href: string
  image: { src: string; srcSet: string; alt: string; width: number; height: number }
}

interface ServiceBrowserProps {
  items: BrowserItem[]
  labels: { viewService: string; priceLabel: string; of: string }
}

export function ServiceBrowser({ items, labels }: ServiceBrowserProps) {
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1]))
  const current = items[active]
  const total = String(items.length).padStart(2, "0")

  const activate = (i: number) => {
    setActive(i)
    setSeen((prev) => {
      if (prev.has(i) && prev.has(i + 1)) return prev
      const next = new Set(prev)
      next.add(i)
      if (i + 1 < items.length) next.add(i + 1)
      return next
    })
  }

  return (
    <>
      {/* Desktop: indexed list + photographic stage */}
      <div className="shell-wide hidden grid-cols-12 gap-8 lg:grid">
        <ol className="col-span-6 flex flex-col border-t border-line">
          {items.map((item, i) => {
            const isActive = i === active
            return (
              <li key={item.slug} className="border-b border-line">
                <Link
                  href={item.href}
                  onMouseEnter={() => activate(i)}
                  onFocus={() => activate(i)}
                  data-active={isActive}
                  className="group relative grid grid-cols-[3.25rem_1fr_auto] items-baseline gap-4 py-[1.05rem] outline-offset-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-700 ease-(--ease-out) group-data-[active=true]:scale-x-100"
                  />
                  <span className="type-index text-xs text-ash transition-colors group-data-[active=true]:text-highlight">
                    {item.index}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[clamp(1.2rem,1.7vw,1.65rem)] font-semibold leading-tight tracking-[-0.02em] [font-stretch:108%] [font-variation-settings:'wdth'_108]",
                      "text-bone/40 transition-[color,transform] duration-500 ease-(--ease-out) group-hover:text-bone/80 group-data-[active=true]:translate-x-2 group-data-[active=true]:text-bone",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="type-label hidden text-ash transition-colors group-data-[active=true]:text-bone xl:inline">
                    {item.category}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>

        <div className="col-span-6 xl:col-span-6">
          <div className="sticky top-[calc(var(--header-h-compact)+1.5rem)] flex flex-col gap-6">
            <div className="frame aspect-[4/5] max-h-[calc(100svh-var(--header-h-compact)-12rem)] w-full">
              {items.map((item, i) =>
                seen.has(i) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={item.slug}
                    src={item.image.src}
                    srcSet={item.image.srcSet}
                    sizes="(min-width: 1680px) 800px, 46vw"
                    width={item.image.width}
                    height={item.image.height}
                    alt={i === active ? item.image.alt : ""}
                    aria-hidden={i === active ? undefined : true}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    data-active={i === active}
                    className="stage-img absolute inset-0 h-full w-full object-cover"
                  />
                ) : null,
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/85 via-transparent to-ink/30" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                <span className="type-label text-bone">
                  {current.index} <span className="text-ash">/ {total}</span>
                </span>
                <span className="type-label text-bone">{current.category}</span>
              </div>
              <div key={current.slug} className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 xl:p-8">
                <p className="max-w-lg text-pretty leading-relaxed text-bone/90 animate-in fade-in-0 slide-in-from-bottom-2 duration-700">
                  {current.text}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between gap-6 border-t border-line pt-5">
              <div className="flex flex-col gap-1">
                <span className="type-label text-ash">{labels.priceLabel}</span>
                <span
                  key={current.slug}
                  className={cn(
                    "font-display text-xl font-semibold [font-stretch:108%] [font-variation-settings:'wdth'_108] animate-in fade-in-0 duration-500",
                    current.priced ? "text-bone" : "text-bone/70",
                  )}
                >
                  {current.price}
                </span>
              </div>
              <Link href={current.href} className="btn btn-outline group">
                {labels.viewService}
                <ArrowRight className="arrow-shift size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet: swipeable photographic index */}
      <div className="max-w-full overflow-hidden lg:hidden">
        <ol className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-(--gutter) pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <li key={item.slug} className="w-[80vw] shrink-0 snap-start sm:w-[44vw]">
              <Link href={item.href} className="group flex flex-col gap-4">
                <div className="frame aspect-[4/5] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image.src}
                    srcSet={item.image.srcSet}
                    sizes="(min-width: 640px) 44vw, 80vw"
                    width={item.image.width}
                    height={item.image.height}
                    alt={item.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-active:scale-[0.985]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 top-0 flex justify-between p-4">
                    <span className="type-label text-bone">
                      {item.index} <span className="text-ash">/ {total}</span>
                    </span>
                    <span className="type-label text-bone">{item.category}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <span className="font-display text-2xl font-semibold leading-none tracking-[-0.025em] [font-stretch:108%] [font-variation-settings:'wdth'_108]">
                      {item.title}
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-bone" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-pretty text-[0.9375rem] leading-relaxed text-bone/75">{item.text}</p>
                <p className="type-label flex gap-2 text-ash">
                  {labels.priceLabel}
                  <span className={item.priced ? "text-bone" : "text-bone/70"}>{item.price}</span>
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
