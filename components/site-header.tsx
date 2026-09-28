"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { siteConfig, primaryNav, myjniaNav, detailingNav } from "@/lib/site-config"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            Strona główna
          </Link>
          <Link
            href="/o-nas"
            className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            O nas
          </Link>

          <div className="group relative">
            <Link
              href="/uslugi"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Usługi
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full grid w-[560px] -translate-x-1/2 grid-cols-2 gap-6 border border-border bg-card p-6 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Myjnia</p>
                <ul className="flex flex-col gap-2">
                  {myjniaNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground">
                  Detailing
                </p>
                <ul className="flex flex-col gap-2">
                  {detailingNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {primaryNav.slice(3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <Button asChild className="rounded-none">
            <Link href="/booksy">Umów wizytę</Link>
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
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            <Link href="/" onClick={() => setMobileOpen(false)} className="border-b border-border py-3 text-sm font-medium">
              Strona główna
            </Link>
            <Link
              href="/o-nas"
              onClick={() => setMobileOpen(false)}
              className="border-b border-border py-3 text-sm font-medium"
            >
              O nas
            </Link>

            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between border-b border-border py-3 text-left text-sm font-medium"
              aria-expanded={mobileServicesOpen}
            >
              Usługi
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="grid gap-4 border-b border-border py-3 pl-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Myjnia</p>
                  <ul className="flex flex-col gap-2">
                    {myjniaNav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={() => setMobileOpen(false)} className="text-sm text-foreground/80">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground">
                    Detailing
                  </p>
                  <ul className="flex flex-col gap-2">
                    {detailingNav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={() => setMobileOpen(false)} className="text-sm text-foreground/80">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {primaryNav.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border py-3 text-sm font-medium"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center justify-center gap-1.5 border border-border py-2.5 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <Button asChild className="rounded-none">
              <Link href="/booksy" onClick={() => setMobileOpen(false)}>
                Umów wizytę
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
