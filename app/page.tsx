import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaBand } from "@/components/cta-band"
import { ServiceIndex } from "@/components/service-index"
import { services } from "@/lib/services-data"
import { siteConfig } from "@/lib/site-config"

export default function Home() {
  const myjniaServices = services.filter((s) => s.category === "myjnia")
  const detailingServices = services.filter((s) => s.category === "detailing")

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden bg-foreground text-background">
        <Image
          src="/images/home/hero-1-myjnia-reczna.jpg"
          alt="Wnętrze samochodu po detailingu w BORUCH Myjnia, Szczecin"
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
          <p className="eyebrow text-accent">{siteConfig.city} — myjnia ręczna &amp; detailing</p>
          <h1 className="mt-6 max-w-3xl text-balance font-heading text-5xl font-bold leading-[0.98] sm:text-7xl lg:text-8xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-background/70 sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/booksy" />}
              size="lg"
              className="h-12 rounded-none bg-accent px-6 text-accent-foreground hover:bg-accent/90"
            >
              Zarezerwuj online
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              render={<a href={siteConfig.phoneHref} />}
              size="lg"
              variant="outline"
              className="h-12 rounded-none border-background/25 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </Button>
          </div>
          <p className="mt-12 flex items-center gap-3 border-t border-background/15 pt-6 text-sm text-background/60">
            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {siteConfig.address.line1}, {siteConfig.address.line2}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-muted-foreground">Usługi</p>
            <h2 className="mt-5 max-w-xl text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl">
              Od mycia ręcznego po pełny detailing
            </h2>
          </div>
          <Link
            href="/uslugi"
            className="flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Wszystkie usługi
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Myjnia
            </h3>
            <ServiceIndex services={myjniaServices} />
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Studio detailingowe
            </h3>
            <ServiceIndex services={detailingServices} />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-8 lg:py-28">
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
            <Image
              src="/images/home/hero-3-autodetailing.jpg"
              alt="Studio detailingowe BORUCH Myjnia na parkingu PAZIM w Szczecinie"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">O nas</p>
            <h2 className="mt-5 text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl">
              Prowadzi Karol Bruch
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              BORUCH Myjnia to ręczna myjnia samochodowa i studio detailingowe w samym centrum Szczecina — na
              podziemnym parkingu PAZIM przy Placu Rodła 8. Łączymy dokładność ręcznego mycia z pełną gamą usług
              detailingowych: od powłok ceramicznych i folii PPF, po korektę lakieru i zmianę koloru.
            </p>
            <Button render={<Link href="/o-nas" />} size="lg" className="mt-9 h-12 rounded-none px-6">
              Poznaj nas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
