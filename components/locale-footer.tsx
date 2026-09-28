import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { siteConfig } from "@/lib/site-config"
import type { Locale, LocaleDictionary } from "@/lib/translations"

export function LocaleFooter({ locale, dict }: { locale: Locale; dict: LocaleDictionary }) {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo className="[&_span]:text-background" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">{dict.metaDescription}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-background/50">
            {dict.nav.services}
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/uslugi" className="text-sm text-background/80 hover:text-background">
                {dict.servicesCta}
              </Link>
            </li>
            <li>
              <Link href="/cennik" className="text-sm text-background/80 hover:text-background">
                {dict.pricingCta}
              </Link>
            </li>
            <li>
              <Link href="/galeria" className="text-sm text-background/80 hover:text-background">
                {dict.nav.gallery}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-background/50">
            {dict.contact.contactLabel}
          </p>
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
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p>{dict.fullServicesNote}</p>
        </div>
      </div>
    </footer>
  )
}
