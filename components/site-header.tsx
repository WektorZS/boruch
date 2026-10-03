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

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

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
              className="group flex min-h-11 items-center gap-3 border-l border-white/10 pl-4 lg:hidden"
            >
              <span className="font-outfit text-[.68rem] font-medium uppercase tracking-[.14em] text-white/68 transition-colors group-hover:text-white">
                {labels.menu}
              </span>

              <span
                aria-hidden="true"
                className="relative block h-4 w-6"
              >
                <span className="absolute left-0 top-1 h-px w-6 origin-right bg-white transition-transform duration-300 group-hover:scale-x-75" />
                <span className="absolute bottom-1 right-0 h-px w-4 bg-brand transition-[width] duration-300 group-hover:w-6" />
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
        aria-hidden={!open}
        inert={!open}
        data-open={open}
        className={cn(
          "group/menu pointer-events-none fixed inset-0 z-(--z-menu) flex translate-y-2 flex-col overflow-hidden bg-[#080809] opacity-0 invisible",
          "transition-[opacity,transform,visibility] duration-300 ease-(--ease-out) motion-reduce:transition-none",
          "data-[open=true]:pointer-events-auto data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100 lg:hidden",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/8 blur-3xl"
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          {/* Mobile menu — top */}
          <div className="shell-wide flex h-(--header-h-compact) shrink-0 items-center justify-between border-b border-white/10">
            <Wordmark href={homeHref} label={homeLabel} onClick={close} />

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="group flex min-h-11 items-center gap-3 touch-manipulation"
            >
              <span className="hidden font-outfit text-[.66rem] font-medium uppercase tracking-[.14em] text-white/45 transition-colors group-hover:text-white/75 min-[390px]:block">
                {labels.close}
              </span>

              <span
                aria-hidden="true"
                className="relative grid size-10 place-items-center border border-white/12 bg-white/2 transition-[border-color,background-color] duration-200 group-hover:border-white/25 group-hover:bg-white/5"
              >
                <span className="absolute h-px w-4.5 rotate-45 bg-white/85 transition-colors group-hover:bg-brand" />
                <span className="absolute h-px w-4.5 -rotate-45 bg-white/85 transition-colors group-hover:bg-brand" />
              </span>
            </button>
          </div>

          {/* Mobile menu — navigation */}
          <nav
            aria-label={labels.navigation}
            className="shell-wide min-h-0 flex-1 overflow-y-auto overscroll-contain"
          >
            <div className="flex min-h-full flex-col justify-center py-5 min-[390px]:py-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-outfit text-[.6rem] font-semibold uppercase tracking-[.2em] text-white/28">
                  {labels.navigation}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-white/8" />
              </div>

              <ul className="border-t border-white/9">
                {nav.map((item, index) => {
                  const number = String(index + 1).padStart(2, "0")

                  return (
                    <li
                      key={item.key}
                      className="relative overflow-hidden border-b border-white/9"
                    >
                      <Link
                        prefetch={false}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={item.active ? "page" : undefined}
                        style={{
                          transitionDelay: open
                            ? `${55 + index * 32}ms`
                            : "0ms",
                        }}
                        className={cn(
                          "group/link relative flex min-h-13 translate-x-3 items-center gap-3.5 px-1 py-2.5 opacity-0",
                          "transition-[transform,opacity,background-color] duration-300 ease-(--ease-out) motion-reduce:transition-none",
                          "group-data-[open=true]/menu:translate-x-0 group-data-[open=true]/menu:opacity-100",
                          "hover:bg-white/2.5 focus-visible:bg-white/2.5",
                          item.active && "bg-white/2.5",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-5 w-px shrink-0 bg-white/10 transition-colors duration-200",
                            "group-hover/link:bg-brand/70 group-focus-visible/link:bg-brand/70",
                            item.active && "bg-brand",
                          )}
                        />

                        <span
                          aria-hidden="true"
                          className={cn(
                            "w-6 shrink-0 font-outfit text-[.58rem] font-semibold tabular-nums tracking-[.12em] text-white/22 transition-colors",
                            "group-hover/link:text-white/38 group-focus-visible/link:text-white/38",
                            item.active && "text-brand",
                          )}
                        >
                          {number}
                        </span>

                        <span
                          className={cn(
                            "min-w-0 flex-1 font-outfit text-[1.08rem] font-medium leading-tight tracking-[-.015em] text-white/68 transition-colors min-[390px]:text-[1.14rem]",
                            "group-hover/link:text-white group-focus-visible/link:text-white",
                            item.active && "font-semibold text-white",
                          )}
                        >
                          {item.label}
                        </span>

                        <ArrowUpRight
                          aria-hidden="true"
                          className={cn(
                            "size-4 shrink-0 text-white/20 transition-[color,transform] duration-200",
                            "group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-brand",
                            "group-focus-visible/link:-translate-y-0.5 group-focus-visible/link:translate-x-0.5 group-focus-visible/link:text-brand",
                            item.active && "text-brand",
                          )}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Mobile menu — bottom */}
          <div className="shrink-0 border-t border-white/10 bg-[#0b0b0c]/96 backdrop-blur-sm">
            <div className="shell-wide pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3.5">
                <span className="font-outfit text-[.6rem] font-semibold uppercase tracking-[.18em] text-white/28">
                  {labels.language}
                </span>

                <ul
                  aria-label={labels.language}
                  className="flex items-center gap-0.5"
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
                          "relative grid h-8 min-w-9 place-items-center px-2 font-outfit text-[.65rem] font-semibold uppercase text-white/38 transition-colors",
                          "hover:text-white focus-visible:text-white",
                          "aria-[current=true]:text-white",
                          "aria-[current=true]:after:absolute aria-[current=true]:after:inset-x-2 aria-[current=true]:after:bottom-0 aria-[current=true]:after:h-px aria-[current=true]:after:bg-brand",
                        )}
                      >
                        {lang.short}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-3 pt-3.5 min-[430px]:grid-cols-[1fr_auto] min-[430px]:items-center min-[430px]:gap-5">
                <div className="min-w-0">
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-7 items-center font-outfit text-[.98rem] font-semibold tracking-[-.015em] text-white transition-colors hover:text-brand focus-visible:text-brand"
                  >
                    {phone}
                  </a>

                  <p className="mt-0.5 max-w-64 truncate text-[.66rem] leading-relaxed text-white/32 min-[430px]:max-w-72">
                    {address.join(" · ")}
                  </p>
                </div>

                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta flex min-h-11 w-full items-center justify-between gap-5 bg-brand px-4 font-outfit text-[.66rem] font-semibold uppercase tracking-[.11em] text-white transition-colors duration-200 hover:bg-[#aa1921] focus-visible:bg-[#aa1921] min-[430px]:w-auto min-[430px]:min-w-40"
                >
                  <span>{labels.book}</span>
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 group-focus-visible/cta:-translate-y-0.5 group-focus-visible/cta:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
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

      <span
        aria-hidden="true"
        className="flex translate-y-[3.2px] flex-col items-center leading-none text-center"
      >
        <span className="font-outfit whitespace-nowrap text-[1.35rem] font-bold tracking-[-.02em] text-white">
          Boruch Myjnia
        </span>

        <span className="font-outfit mt-1 whitespace-nowrap text-[.82rem] font-medium tracking-[-.01em] text-white/90">
          &amp; detailing
        </span>
      </span>
    </Link>
  )
}
