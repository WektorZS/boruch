"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Wordmark } from "./wordmark"
import { cn } from "@/lib/utils"

export interface HeaderNavItem {
  key: string
  label: string
  href: string
  active: boolean
}

export interface HeaderLanguage {
  code: string
  short: string
  name: string
  href: string
  htmlLang: string
  active: boolean
}

interface SiteHeaderProps {
  homeHref: string
  homeLabel: string
  nav: HeaderNavItem[]
  languages: HeaderLanguage[]
  labels: { book: string; menu: string; close: string; language: string; navigation: string; level: string }
  bookingUrl: string
  phone: string
  phoneHref: string
  address: string[]
}

export function SiteHeader({
  homeHref,
  homeLabel,
  nav,
  languages,
  labels,
  bookingUrl,
  phone,
  phoneHref,
  address,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 0)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open, close])

  const menuNav = nav

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-20 w-px" />

      <header
        data-scrolled={scrolled}
        className={cn(
          "group/header fixed inset-x-0 top-0 z-(--z-header) transition-[background-color,border-color,backdrop-filter] duration-500 ease-(--ease-out)",
          "border-b border-transparent bg-linear-to-b from-ink/70 to-transparent",
          "data-[scrolled=true]:border-line data-[scrolled=true]:bg-ink/88 data-[scrolled=true]:bg-none data-[scrolled=true]:backdrop-blur-md",
        )}
      >
        <div className="shell-wide flex h-(--header-h) items-center justify-between gap-6 transition-[height] duration-500 ease-(--ease-out) group-data-[scrolled=true]/header:h-(--header-h-compact)">
          <Wordmark href={homeHref} label={homeLabel} />

          <nav aria-label={labels.navigation} className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {nav
                .filter((item) => item.key !== "home")
                .map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
                      className="type-label link-draw text-bone/80 transition-colors hover:text-bone aria-[current=page]:text-bone"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <ul aria-label={labels.language} className="hidden items-center gap-1 xl:flex">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <Link
                    href={lang.href}
                    hrefLang={lang.htmlLang}
                    lang={lang.htmlLang}
                    aria-label={lang.name}
                    aria-current={lang.active ? "true" : undefined}
                    className="type-label relative flex h-8 min-w-8 items-center justify-center px-1.5 text-ash transition-colors hover:text-bone aria-[current=true]:text-bone"
                  >
                    {lang.short}
                    {lang.active && <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 h-px w-3 -translate-x-1/2 bg-brand" />}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary group hidden min-h-10 px-4 sm:inline-flex"
            >
              {labels.book}
              <ArrowUpRight className="arrow-lift size-3.5" aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex h-10 items-center gap-3 xl:hidden"
            >
              <span className="type-label text-bone">{labels.menu}</span>
              <span aria-hidden="true" className="flex w-6 flex-col items-end gap-1.5">
                <span className="h-px w-6 bg-bone transition-all duration-300 group-hover:w-4" />
                <span className="h-px w-4 bg-brand transition-all duration-300 group-hover:w-6" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        inert={!open}
        data-open={open}
        className={cn(
          "group/menu fixed inset-0 z-(--z-menu) flex flex-col bg-ink xl:hidden",
          "invisible opacity-0 transition-[opacity,visibility] duration-500 ease-(--ease-out) data-[open=true]:visible data-[open=true]:opacity-100",
        )}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-wine-deep/70 to-transparent" />

        <div className="shell-wide relative flex h-(--header-h-compact) items-center justify-between border-b border-line">
          <Wordmark href={homeHref} label={homeLabel} />
          <button ref={closeRef} type="button" onClick={close} className="group flex h-10 items-center gap-3">
            <span className="type-label text-bone">{labels.close}</span>
            <span aria-hidden="true" className="relative size-6">
              <span className="absolute left-0 top-1/2 h-px w-6 rotate-45 bg-bone transition-colors group-hover:bg-brand" />
              <span className="absolute left-0 top-1/2 h-px w-6 -rotate-45 bg-bone transition-colors group-hover:bg-brand" />
            </span>
          </button>
        </div>

        <nav aria-label={labels.navigation} className="shell-wide relative flex-1 overflow-y-auto py-8">
          <ol className="flex flex-col">
            {menuNav.map((item, i) => (
              <li key={item.key} className="overflow-hidden border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.active ? "page" : undefined}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                  className={cn(
                    "group flex items-baseline gap-5 py-4 transition-transform duration-700 ease-(--ease-out)",
                    "translate-y-full group-data-[open=true]/menu:translate-y-0",
                  )}
                >
                  <span className="type-index w-7 text-xs text-ash group-aria-[current=page]:text-highlight">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.75rem,7vw,3rem)] font-semibold leading-none tracking-[-0.025em] text-bone/85 [font-stretch:108%] [font-variation-settings:'wdth'_108] transition-colors group-hover:text-bone group-aria-[current=page]:text-bone">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="shell-wide relative flex flex-col gap-6 border-t border-line py-6">
          <ul aria-label={labels.language} className="flex gap-2">
            {languages.map((lang) => (
              <li key={lang.code}>
                <Link
                  href={lang.href}
                  hrefLang={lang.htmlLang}
                  lang={lang.htmlLang}
                  aria-label={lang.name}
                  aria-current={lang.active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className="type-label flex h-10 min-w-12 items-center justify-center border border-line px-3 text-ash transition-colors hover:border-line-strong hover:text-bone aria-[current=true]:border-brand aria-[current=true]:text-bone"
                >
                  {lang.short}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <a href={phoneHref} className="font-display text-xl font-semibold [font-stretch:115%] [font-variation-settings:'wdth'_115]">
                {phone}
              </a>
              <p className="type-label text-ash">{address.join(" · ")}</p>
            </div>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group w-full sm:w-auto">
              {labels.book}
              <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
