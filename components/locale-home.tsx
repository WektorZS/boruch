import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import type { Locale, LocaleDictionary } from "@/lib/translations"

export function LocaleHome({ locale, dict }: { locale: Locale; dict: LocaleDictionary }) {
  const packages = [dict.packages.interior, dict.packages.exterior]

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden bg-foreground text-background">
        <Image
          src="/images/home/hero-1-myjnia-reczna.jpg"
          alt="BORUCH hand car wash & detailing, Szczecin"
          fill
          sizes="100vw"
          className="-z-10 object-cover lg:left-[35%] lg:w-[65%]"
          priority
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/20 lg:bg-gradient-to-r lg:from-foreground lg:from-35% lg:via-foreground/60 lg:to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-40 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div>
            <p className="eyebrow text-accent">{dict.hero.eyebrow}</p>
            <h1 className="mt-6 max-w-3xl text-balance font-heading text-5xl font-bold leading-[0.98] sm:text-7xl lg:text-8xl">
              {dict.hero.title}
            </h1>
            <p className="mt-3 text-lg font-semibold text-background/85">{dict.hero.subtitle}</p>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-background/75 sm:text-lg">
              {dict.hero.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                render={<a href={siteConfig.phoneHref} />}
                size="lg"
                className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {dict.nav.book}
              </Button>
              <Button
                render={<Link href="/uslugi" />}
                size="lg"
                variant="secondary"
                className="rounded-none border border-background/25 bg-transparent text-background hover:bg-background/10"
              >
                {dict.servicesCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-background/70">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.address.line1}, {siteConfig.address.line2}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.label} className="flex flex-col border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{pkg.label}</p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>
              <p className="mt-4 font-heading text-2xl font-bold text-foreground">{pkg.price}</p>
              <p className="text-xs text-muted-foreground">{pkg.note}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="relative flex flex-col border border-accent bg-accent/10 p-6">
            <span className="absolute -top-3 left-6 bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-accent-foreground">
              {dict.packages.full.badge}
            </span>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {dict.packages.full.label}
            </p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {dict.packages.full.description}
            </p>
            <p className="mt-4 font-heading text-2xl font-bold text-foreground">{dict.packages.full.price}</p>
            <p className="text-xs text-muted-foreground">{dict.packages.full.note}</p>
            <p className="mt-5 text-sm leading-relaxed text-foreground/85">{dict.packages.full.detail}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{dict.packages.full.discount}</p>
          </div>
        </div>
        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">{dict.packages.priceNote}</p>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <Image
                src="/images/home/hero-3-autodetailing.jpg"
                alt="BORUCH detailing studio, Szczecin"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{dict.about.eyebrow}</p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {dict.about.title}
              </h2>
              {dict.about.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              <p className="mt-5 font-heading text-lg font-semibold text-foreground">{dict.about.signature}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground">
              {dict.contact.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {dict.contact.title}
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button render={<a href={siteConfig.phoneHref} />} size="lg" className="rounded-none">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.phone}
              </Button>
              <Button render={<Link href="/kontakt" />} size="lg" variant="outline" className="rounded-none">
                {dict.nav.contact}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {dict.contact.locationLabel}
            </p>
            <p className="mt-2 text-pretty leading-relaxed text-foreground">
              BORUCH
              <br />
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {dict.contact.contactLabel}
            </p>
            <div className="mt-2 flex flex-col gap-2 text-foreground">
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          {dict.fullServicesNote}{" "}
          <Link href="/uslugi" className="font-semibold text-primary hover:underline">
            {dict.servicesCta}
          </Link>{" "}
          ·{" "}
          <Link href="/cennik" className="font-semibold text-primary hover:underline">
            {dict.pricingCta}
          </Link>
        </p>
      </section>
    </>
  )
}
