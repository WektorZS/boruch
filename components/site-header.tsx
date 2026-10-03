"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { clsx as cn } from "clsx"
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
  labels: {
    book: string
    menu: string
    close: string
    language: string
    navigation: string
    level: string
  }
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

    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    )

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
    const onResize = () => {
      if (desktop.matches) setOpen(false)
    }

    desktop.addEventListener("change", onResize)
    return () => desktop.removeEventListener("change", onResize)
  }, [])

  const menuNav = nav

  return (
    <>
      <div
        ref={sentinel}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-20 w-px"
      />

      <header
        data-scrolled={scrolled}
        className={cn(
          "group/header fixed inset-x-0 top-0 z-(--z-header) border-b border-white/10 bg-[#080809] transition-colors duration-300",
          "data-[scrolled=true]:bg-ink-2",
        )}
      >
        <div className="shell-wide flex h-(--header-h) items-center transition-[height] duration-300 ease-(--ease-out) group-data-[scrolled=true]/header:h-(--header-h-compact)">
          <Wordmark href={homeHref} label={homeLabel} />

          <div className="hidden flex-1 justify-center lg:flex">
            <nav aria-label={labels.navigation}>
              <ul className="flex items-center gap-7 xl:gap-9">
                {nav
                  .filter((item) => item.key !== "home")
                  .map((item) => (
                    <li key={item.key}>
                      <Link
                        prefetch={false}
                        href={item.href}
                        aria-current={item.active ? "page" : undefined}
                        className="home-nav-link inline-flex min-h-10 items-center text-[.72rem] font-medium uppercase tracking-[.12em] text-white/68 hover:text-white aria-[current=page]:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-5 lg:ml-0 lg:border-l lg:border-white/15 lg:pl-5 xl:pl-7">
            <ul
              aria-label={labels.language}
              className="hidden items-center gap-1 xl:flex"
            >
              {languages.map((lang) => (
                <li key={lang.code}>
                  <Link
                    prefetch={false}
                    href={lang.href}
                    hrefLang={lang.htmlLang}
                    lang={lang.htmlLang}
                    aria-label={`${lang.short} - ${lang.name}`}
                    aria-current={lang.active ? "true" : undefined}
                    className="relative grid size-8 place-items-center text-[.65rem] font-medium text-white/65 transition-colors hover:text-white aria-[current=true]:border-b aria-[current=true]:border-brand aria-[current=true]:text-white"
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
              className="group hidden min-h-11 items-center gap-3 bg-brand px-5 text-[.7rem] font-medium uppercase tracking-[.12em] transition-colors hover:bg-[#aa1921] sm:flex"
            >
              {labels.book}
              <ArrowUpRight
                className="arrow-lift size-3.5"
                aria-hidden="true"
              />
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

              <span
                aria-hidden="true"
                className="flex w-6 flex-col items-end gap-1.5"
              >
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
          "group/menu fixed inset-0 z-(--z-menu) flex flex-col overflow-hidden bg-[#080809] lg:hidden",
          "invisible opacity-0 transition-[opacity,visibility] duration-300 ease-(--ease-out)",
          "data-[open=true]:visible data-[open=true]:opacity-100",
        )}
      >
        {/* Mobile menu — top */}
        <div className="shell-wide flex h-(--header-h-compact) shrink-0 items-center justify-between border-b border-white/10">
          <Wordmark href={homeHref} label={homeLabel} onClick={close} />

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="group flex min-h-11 items-center gap-3"
          >
            <span className="hidden font-outfit text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/55 min-[380px]:block">
              {labels.close}
            </span>

            <span
              aria-hidden="true"
              className="relative grid size-10 place-items-center rounded-full border border-white/12 transition-colors group-hover:border-white/25 group-hover:bg-white/5"
            >
              <span className="absolute h-px w-4.5 rotate-45 bg-white transition-colors group-hover:bg-brand" />
              <span className="absolute h-px w-4.5 -rotate-45 bg-white transition-colors group-hover:bg-brand" />
            </span>
          </button>
        </div>

        {/* Mobile menu — navigation */}
        <nav
          aria-label={labels.navigation}
          className="shell-wide min-h-0 flex-1 overflow-y-auto"
        >
          <div className="flex min-h-full flex-col justify-center py-5 sm:py-7">
            <ul className="flex flex-col">
              {menuNav.map((item, index) => (
                <li
                  key={item.key}
                  className="overflow-hidden border-b border-white/8 first:border-t first:border-white/8"
                >
                  <Link
                    prefetch={false}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={item.active ? "page" : undefined}
                    style={{
                      transitionDelay: open ? `${50 + index * 35}ms` : "0ms",
                    }}
                    className={cn(
                      "group/link flex min-h-14 items-center justify-between gap-5 py-3.5",
                      "translate-y-3 opacity-0 transition-[transform,opacity] duration-300 ease-(--ease-out)",
                      "group-data-[open=true]/menu:translate-y-0 group-data-[open=true]/menu:opacity-100",
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1.5 shrink-0 rounded-full bg-white/18 transition-colors duration-300",
                          "group-hover/link:bg-brand group-focus-visible/link:bg-brand",
                          item.active && "bg-brand",
                        )}
                      />

                      <span
                        className={cn(
                          "font-outfit text-[1.22rem] font-semibold leading-tight tracking-[-0.015em] text-white/72 transition-colors",
                          "min-[380px]:text-[1.3rem]",
                          "group-hover/link:text-white group-focus-visible/link:text-white",
                          item.active && "text-white",
                        )}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative h-px w-6 shrink-0 bg-white/14 transition-all duration-300",
                        "after:absolute after:right-0 after:top-1/2 after:size-1.5 after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-white/28",
                        "group-hover/link:w-8 group-hover/link:bg-brand group-hover/link:after:border-brand",
                        "group-focus-visible/link:w-8 group-focus-visible/link:bg-brand group-focus-visible/link:after:border-brand",
                        item.active && "w-8 bg-brand after:border-brand",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile menu — bottom */}
        <div className="shrink-0 border-t border-white/10 bg-[#0b0b0c]">
          <div className="shell-wide py-4">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/8 pb-4">
              <span className="font-outfit text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/35">
                {labels.language}
              </span>

              <ul
                aria-label={labels.language}
                className="flex items-center gap-1"
              >
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <Link
                      prefetch={false}
                      href={lang.href}
                      hrefLang={lang.htmlLang}
                      lang={lang.htmlLang}
                      aria-label={`${lang.short} - ${lang.name}`}
                      aria-current={lang.active ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "relative flex h-8 min-w-9 items-center justify-center px-2",
                        "font-outfit text-[0.68rem] font-semibold uppercase text-white/40 transition-colors hover:text-white",
                        "aria-[current=true]:text-white",
                        "aria-[current=true]:after:absolute aria-[current=true]:after:inset-x-2 aria-[current=true]:after:-bottom-px aria-[current=true]:after:h-px aria-[current=true]:after:bg-brand",
                      )}
                    >
                      {lang.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-end min-[420px]:justify-between">
              <div className="min-w-0">
                <a
                  href={phoneHref}
                  className="font-outfit text-[1.05rem] font-semibold tracking-[-0.015em] text-white transition-colors hover:text-brand"
                >
                  {phone}
                </a>

                <p className="mt-1 max-w-56 text-[0.68rem] leading-relaxed text-white/38">
                  {address.join(" · ")}
                </p>
              </div>

              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 w-full items-center justify-center gap-3 bg-brand px-4 font-outfit text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#aa1921] min-[420px]:w-auto min-[420px]:shrink-0"
              >
                {labels.book}
                <ArrowUpRight
                  className="arrow-lift size-3.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Wordmark({
  href,
  label,
  className,
  onClick,
}: {
  href: string
  label: string
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      onClick={onClick}
      aria-label={`Boruch Myjnia & Detailing - ${label}`}
      className={cn("group flex shrink-0 items-center gap-3", className)}
    >
      <Image
        src="/images/logo.webp"
        alt=""
        width={82}
        height={82}
        priority
        className="size-11 shrink-0 object-contain min-[360px]:size-13"
      />

      <span aria-hidden="true" className="flex flex-col leading-none">
        <span
          aria-hidden="true"
          className="flex translate-y-[3.2px] flex-col items-center leading-none text-center"
        >
          <span className="font-outfit whitespace-nowrap text-[1.35rem] font-bold tracking-[-0.02em] text-white">
            Boruch Myjnia
          </span>

          <span className="font-outfit mt-1 whitespace-nowrap text-[0.82rem] font-medium tracking-[-0.01em] text-white/90">
            &amp; detailing
          </span>
        </span>
      </span>
    </Link>
  )
}
