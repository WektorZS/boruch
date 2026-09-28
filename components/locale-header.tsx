"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import { locales, type Locale, type LocaleDictionary } from "@/lib/translations"

export function LocaleHeader({ locale, dict }: { locale: Locale; dict: LocaleDictionary }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: "/o-nas", label: dict.nav.about },
    { href: "/uslugi", label: dict.nav.services },
    { href: "/cennik", label: dict.nav.pricing },
    { href: "/galeria", label: dict.nav.gallery },
    { href: "/kontakt", label: dict.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
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
            className="flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
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
