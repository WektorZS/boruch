import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { siteConfig, myjniaNav, detailingNav } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="border-t border-background/10 bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">{siteConfig.description}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-background/50">Myjnia</p>
          <ul className="flex flex-col gap-2">
            {myjniaNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-background/80 hover:text-background">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-background/50">Detailing</p>
          <ul className="flex flex-col gap-2">
            {detailingNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-background/80 hover:text-background">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-background/50">Kontakt</p>
          <ul className="flex flex-col gap-3 text-sm text-background/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={siteConfig.phoneHref} className="hover:text-background">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-background">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Wszystkie prawa zastrzeżone.
          </p>
          <p>Szczecin, Plac Rodła 8 — Parking podziemny PAZIM</p>
        </div>
      </div>
    </footer>
  )
}
