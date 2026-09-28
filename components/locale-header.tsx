"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import { locales, localeRoutes, type Locale, type LocaleDictionary } from "@/lib/translations"

export function LocaleHeader({ locale, dict }: { locale: Locale; dict: LocaleDictionary }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const routes = localeRoutes[locale]

  const links = [
    { href: routes.home, label: dict.nav.home },
    { href: routes.about, label: dict.nav.about },
    { href: routes.services, label: dict.nav.services },
    { href: routes.pricing, label: dict.nav.pricing },
    { href: routes.gallery, label: dict.nav.gallery },
    { href: routes.contact, label: dict.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1 border border-border px-1 py-1 text-xs font-semibold uppercase">
            {locales.map((l) => (
              <Link
                key={l.code}
                href={l.href}
                className={`rounded-none px-2 py-1 ${l.code === locale ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-primary"}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/" className="px-2 py-1 text-foreground/70 hover:text-primary">
              PL
            </Link>
          </div>
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-foreground xl:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border py-3 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-1 border border-border px-1 py-1 text-xs font-semibold uppercase">
            {locales.map((l) => (
              <Link
                key={l.code}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`flex-1 rounded-none px-2 py-1.5 text-center ${l.code === locale ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex-1 px-2 py-1.5 text-center text-foreground/70"
            >
              PL
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center justify-center gap-1.5 border border-border py-2.5 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <Button render={<a href={siteConfig.phoneHref} />} className="rounded-none">
              {dict.nav.book}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
