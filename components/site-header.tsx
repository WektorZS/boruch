"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useModalFocus } from "./use-modal-focus"

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
  const menuRef = useRef<HTMLDivElement>(null)

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

  useModalFocus(open, menuRef, close)
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onResize = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener("change", onResize)
    return () => desktop.removeEventListener("change", onResize)
  }, [])

  const menuNav = nav

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-20 w-px" />

      <header
        data-scrolled={scrolled}
        className={cn(
          "group/header fixed inset-x-0 top-0 z-(--z-header) border-b border-white/10 bg-[#080809] transition-colors duration-300",
          "data-[scrolled=true]:bg-ink-2",
        )}
      >
        <div className="shell-wide flex h-(--header-h) items-center justify-between gap-4 transition-[height] duration-500 ease-(--ease-out) group-data-[scrolled=true]/header:h-(--header-h-compact)">
          <Wordmark href={homeHref} label={homeLabel} />

          <nav aria-label={labels.navigation} className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-7">
              {nav
                .filter((item) => item.key !== "home")
                .map((item) => (
                  <li key={item.key}>
                    <Link prefetch={false}
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
                      className="home-nav-link inline-flex min-h-10 items-center text-[.72rem] font-semibold uppercase tracking-[.14em] text-white/68 hover:text-white aria-[current=page]:text-white"
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
                  <Link prefetch={false}
                    href={lang.href}
                    hrefLang={lang.htmlLang}
                    lang={lang.htmlLang}
                    aria-label={`${lang.short} - ${lang.name}`}
                    aria-current={lang.active ? "true" : undefined}
                    className="relative grid size-8 place-items-center text-[.72rem] font-bold text-white/65 transition-colors hover:text-white aria-[current=true]:bg-white aria-[current=true]:text-black"
                  >
                    {lang.short}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden min-h-11 items-center gap-3 bg-brand px-5 text-[.72rem] font-bold uppercase tracking-[.14em] transition-colors hover:bg-[#aa1921] sm:flex"
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
              className="group flex h-11 items-center gap-3 lg:hidden"
            >
              <span className="type-label text-bone">{labels.menu}</span>
              <span aria-hidden="true" className="flex w-6 flex-col items-end gap-1.5">
                <span className="h-px w-6 origin-right bg-bone transition-transform duration-300 group-hover:scale-x-75 group-focus-visible:scale-x-75" />
                <span className="h-px w-6 origin-right scale-x-75 bg-brand transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        inert={!open}
        data-open={open}
        className={cn(
          "group/menu fixed inset-0 z-(--z-menu) flex flex-col overflow-hidden bg-ink-2 lg:hidden",
          "invisible opacity-0 transition-[opacity,visibility] duration-500 ease-(--ease-out) data-[open=true]:visible data-[open=true]:opacity-100",
        )}
      >
        <div className="shell-wide relative flex h-(--header-h-compact) items-center justify-between border-b border-line">
          <Wordmark href={homeHref} label={homeLabel} />
          <button ref={closeRef} type="button" onClick={close} className="group flex min-h-11 items-center gap-3">
            <span className="type-label text-bone">{labels.close}</span>
            <span aria-hidden="true" className="relative size-6">
              <span className="absolute left-0 top-1/2 h-px w-6 rotate-45 bg-bone transition-colors group-hover:bg-brand" />
              <span className="absolute left-0 top-1/2 h-px w-6 -rotate-45 bg-bone transition-colors group-hover:bg-brand" />
            </span>
          </button>
        </div>

        <nav aria-label={labels.navigation} className="shell-wide relative min-h-0 flex-1 overflow-y-auto py-3 sm:py-6">
          <ul className="flex flex-col">
            {menuNav.map((item, index) => (
              <li key={item.key} className="overflow-hidden border-b border-line">
                <Link prefetch={false}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.active ? "page" : undefined}
                  style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
                  className={cn(
                    "group flex min-h-14 items-center justify-between gap-4 py-3.5 transition-[transform,opacity] duration-500 ease-(--ease-out)",
                    "translate-y-4 opacity-0 group-data-[open=true]/menu:translate-y-0 group-data-[open=true]/menu:opacity-100",
                  )}
                >
                  <span className="min-w-0 font-display text-[clamp(1.65rem,6.8vw,2.8rem)] font-extrabold uppercase leading-[1.15] tracking-normal text-bone/85 [font-stretch:75%] [font-variation-settings:'wdth'_75] transition-colors group-hover:text-bone group-focus-visible:text-bone group-aria-[current=page]:text-bone">
                    {item.label}
                  </span>
                  <span aria-hidden="true" className="h-px w-8 shrink-0 origin-right bg-line transition-[background-color,transform] group-hover:scale-x-125 group-hover:bg-brand group-focus-visible:bg-brand group-aria-[current=page]:bg-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shell-wide menu-bottom relative shrink-0 flex flex-col gap-4 border-t border-line py-4">
          <ul aria-label={labels.language} className="flex gap-2">
            {languages.map((lang) => (
              <li key={lang.code}>
                <Link prefetch={false}
                  href={lang.href}
                  hrefLang={lang.htmlLang}
                  lang={lang.htmlLang}
                  aria-label={`${lang.short} - ${lang.name}`}
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
              <a href={phoneHref} className="link-draw w-fit whitespace-nowrap font-display text-xl font-semibold [font-stretch:115%] [font-variation-settings:'wdth'_115]">
                {phone}
              </a>
              <p className="text-xs leading-relaxed text-ash">{address.join(" - ")}</p>
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

function Wordmark({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <Link prefetch={false} href={href} aria-label={`Boruch Myjnia / Detailing - ${label}`} className={cn("group flex shrink-0 items-center gap-2 min-[360px]:gap-3", className)}>
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center bg-brand font-display text-[2rem] font-black uppercase leading-none text-bone min-[360px]:size-12 [font-stretch:75%] [font-variation-settings:'wdth'_75]"
      >
        B
      </span>
      <span aria-hidden="true" className="flex flex-col gap-0.5 leading-none">
        <span className="font-display text-[1.55rem] font-black uppercase tracking-[-0.02em] text-bone [font-stretch:80%] [font-variation-settings:'wdth'_80]">Boruch</span>
        <span className="mt-1 whitespace-nowrap text-[.625rem] font-semibold uppercase tracking-[.17em] text-white/65 min-[360px]:text-[.72rem]">Myjnia / detailing</span>
      </span>
    </Link>
  )
}
