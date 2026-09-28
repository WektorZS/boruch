"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { siteConfig, primaryNav, myjniaNav, detailingNav } from "@/lib/site-config"
import { locales } from "@/lib/translations"
import { cn } from "@/lib/utils"

const navLink = "whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href))
  const closeMenu = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Główna" className="hidden items-center lg:flex">
          <Link href="/o-nas" className={cn(navLink, isActive("/o-nas") ? "text-foreground" : "text-muted-foreground")}>
            O nas
          </Link>

          <div className="group relative">
            <Link
              href="/uslugi"
              className={cn(
                navLink,
                "flex items-center gap-1",
                isActive("/uslugi") ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Usługi
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="invisible absolute left-1/2 top-full grid w-[560px] -translate-x-1/2 grid-cols-2 gap-8 border border-border bg-popover p-7 opacity-0 shadow-2xl shadow-foreground/10 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {[
                { label: "Myjnia", items: myjniaNav },
                { label: "Detailing", items: detailingNav },
              ].map((col) => (
                <div key={col.label}>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    {col.label}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {primaryNav.slice(3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(navLink, isActive(item.href) ? "text-foreground" : "text-muted-foreground")}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center text-[11px] font-semibold uppercase tracking-wider" aria-label="Język">
            <span className="px-1.5 py-1 text-foreground" aria-current="true">
              PL
            </span>
            {locales.map((l) => (
              <Link key={l.code} href={l.href} className="px-1.5 py-1 text-muted-foreground hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-foreground xl:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <Button render={<Link href="/booksy" />} className="h-10 whitespace-nowrap rounded-none px-5">
            Zarezerwuj online
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-background px-4 pb-8 pt-2 sm:px-6 lg:hidden">
          <nav aria-label="Główna" className="flex flex-col">
            <Link href="/" onClick={closeMenu} className="border-b border-border py-4 font-heading text-lg font-semibold">
              Strona główna
            </Link>
            <Link href="/o-nas" onClick={closeMenu} className="border-b border-border py-4 font-heading text-lg font-semibold">
              O nas
            </Link>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between border-b border-border py-4 text-left font-heading text-lg font-semibold"
              aria-expanded={mobileServicesOpen}
            >
              Usługi
              <ChevronDown
                className={cn("h-5 w-5 transition-transform", mobileServicesOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {mobileServicesOpen && (
              <div className="grid gap-6 border-b border-border py-5">
                {[
                  { label: "Myjnia", items: myjniaNav },
                  { label: "Detailing", items: detailingNav },
                ].map((col) => (
                  <div key={col.label}>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      {col.label}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {col.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} onClick={closeMenu} className="text-sm text-foreground/85">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {primaryNav.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-border py-4 font-heading text-lg font-semibold"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
            <span className="flex-1 bg-foreground py-2 text-center text-background">PL</span>
            {locales.map((l) => (
              <Link
                key={l.code}
                href={l.href}
                onClick={closeMenu}
                className="flex-1 border border-border py-2 text-center text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button render={<Link href="/booksy" onClick={closeMenu} />} size="lg" className="h-12 rounded-none">
              Zarezerwuj online
            </Button>
            <Button render={<a href={siteConfig.phoneHref} />} size="lg" variant="outline" className="h-12 rounded-none">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
