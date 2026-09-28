import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "../site-shell"
import { HomeHero } from "../home/home-hero"
import { HomeStatement } from "../home/home-statement"
import { HomeRealizations } from "../home/home-realizations"
import { HomeTeam } from "../home/home-team"
import { ServiceIndexSection } from "../service-index-section"
import { FeatureBand } from "../feature-band"
import { PricingPackages } from "../pricing-packages"
import { PhotoTriptych } from "../photo-triptych"
import { LocationSection } from "../location-section"
import { BookingCta } from "../booking-cta"
import { SectionHeading } from "../section-heading"
import { routes, sources, ui, type Locale } from "@/lib/content"

export function HomePage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <SiteShell locale={locale} page="home">
      <HomeHero locale={locale} />
      <HomeStatement locale={locale} />
      <ServiceIndexSection locale={locale} />
      <HomeRealizations locale={locale} />
      <FeatureBand locale={locale} />

      <section aria-labelledby="packages-title" className="section-lg">
        <div className="shell-wide mb-12 lg:mb-16">
          <SectionHeading id="packages-title" eyebrow={t.pricing} title={src.home.packagesTitle} />
        </div>
        <div className="shell-wide">
          <PricingPackages locale={locale} headingId="packages-title" />
          <Link href={routes[locale].pricing} className="group mt-10 flex w-fit items-center gap-4 text-bone">
            <span className="type-label link-draw">{src.home.moreLink}</span>
            <ArrowRight className="arrow-shift size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <HomeTeam locale={locale} />
      <PhotoTriptych ids={["p21", "p62", "p59"]} />
      <LocationSection locale={locale} />
      <BookingCta locale={locale} />
    </SiteShell>
  )
}
