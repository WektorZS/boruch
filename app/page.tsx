import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaBand } from "@/components/cta-band"
import { ServiceCard } from "@/components/service-card"
import { services } from "@/lib/services-data"
import { siteConfig } from "@/lib/site-config"

export default function Home() {
  const myjniaServices = services.filter((s) => s.category === "myjnia")
  const detailingServices = services.filter((s) => s.category === "detailing")

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              {siteConfig.city} — myjnia ręczna &amp; detailing
            </p>
            <h1 className="mt-5 max-w-xl text-balance font-heading text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-background/75 sm:text-lg">
              {siteConfig.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/booksy">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Zarezerwuj online
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-none border border-background/25 bg-transparent text-background hover:bg-background/10"
              >
                <a href={siteConfig.phoneHref}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-background/70">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.address.line1}, {siteConfig.address.line2}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-background/15 sm:aspect-[5/6]">
              <Image
                src="/images/home/hero-1-myjnia-reczna.jpg"
                alt="Ręczne mycie samochodu w Boruch Myjnia, Szczecin"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-40 border border-border bg-background p-4 text-foreground shadow-xl sm:block">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Rezerwacja online przez Booksy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Myjnia</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Mycie ręczne</h2>
          </div>
          <Link
            href="/uslugi"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80"
          >
            Wszystkie usługi
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myjniaServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground">Detailing</p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Studio detailingowe
              </h2>
            </div>
            <Link
              href="/uslugi"
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80"
            >
              Wszystkie usługi
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detailingServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden border border-border order-2 lg:order-1">
            <Image
              src="/images/home/hero-3-autodetailing.jpg"
              alt="Studio detailingowe Boruch Myjnia — Szczecin"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">O nas</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Prowadzi Karol Bruch
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              BORUCH Myjnia to ręczna myjnia samochodowa i studio detailingowe w samym centrum Szczecina — na
              podziemnym parkingu PAZIM przy Placu Rodła 8. Łączymy dokładność ręcznego mycia z pełną gamą usług
              detailingowych: od powłok ceramicznych i folii PPF, po korektę lakieru i zmianę koloru.
            </p>
            <Button asChild className="mt-7 rounded-none">
              <Link href="/o-nas">
                Poznaj nas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
