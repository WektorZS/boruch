import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Phone } from "lucide-react"
import type { Service } from "@/lib/services-data"
import { services, carSizeSurcharge } from "@/lib/services-data"
import { Button } from "@/components/ui/button"
import { CtaBand } from "@/components/cta-band"
import { ServiceIndex, formatServicePrice } from "@/components/service-index"
import { siteConfig, breadcrumbJsonLd } from "@/lib/site-config"

export function ServiceDetail({ service }: { service: Service }) {
  const sameCategory = services.filter((s) => s.slug !== service.slug && s.category === service.category)
  const otherServices = [...sameCategory, ...services.filter((s) => s.category !== service.category)].slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Strona główna", path: "/" },
              { name: "Usługi", path: "/uslugi" },
              { name: service.title, path: `/${service.slug}` },
            ]),
          ),
        }}
      />
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16 lg:px-8 lg:pb-24">
          <div>
            <nav aria-label="Ścieżka" className="text-xs text-background/50">
              <Link href="/uslugi" className="hover:text-background">
                Usługi
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span>{service.category === "myjnia" ? "Myjnia" : "Detailing"}</span>
            </nav>
            <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-[1.02] sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-background/70">{service.tagline}</p>

            <dl className="mt-10 flex flex-col gap-1 border-t border-background/15 pt-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-background/50">Cena</dt>
              <dd className="font-heading text-3xl font-bold text-accent">{formatServicePrice(service.priceFrom)}</dd>
              {service.priceNote && <dd className="text-sm text-background/60">{service.priceNote}</dd>}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-background/5 lg:aspect-[4/5]">
            <Image
              src={service.heroImage || "/placeholder.svg"}
              alt={`${service.title} — BORUCH Myjnia, Szczecin`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8 lg:py-28">
        <div className="flex max-w-2xl flex-col gap-5">
          <p className="eyebrow text-muted-foreground">O usłudze</p>
          {service.intro.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-pretty font-heading text-2xl font-medium leading-snug text-foreground sm:text-3xl"
                  : "text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold">{service.highlightsTitle}</h2>
          <ul className="mt-6 border-t border-border">
            {service.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-border py-4">
                <Check className="mt-1 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                <span className="text-pretty text-sm leading-relaxed text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="eyebrow text-muted-foreground">Proces</p>
          <h2 className="mt-5 max-w-xl text-balance font-heading text-3xl font-bold leading-tight sm:text-4xl">
            Jak wygląda usługa krok po kroku?
          </h2>
          <ol className="mt-14 flex flex-col gap-10 lg:flex-row lg:gap-8">
            {service.process.map((step, i) => (
              <li key={step.title} className="flex-1 border-t-2 border-foreground pt-6">
                <span className="font-heading text-sm font-bold tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <h2 className="text-balance font-heading text-3xl font-bold leading-tight sm:text-4xl">
            {service.whyUsTitle}
          </h2>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">{service.closing}</p>
          <p className="mt-6 max-w-md text-xs leading-relaxed text-muted-foreground">{carSizeSurcharge}</p>
        </div>
        <ul className="border-t border-border">
          {service.whyUs.map((item) => (
            <li key={item} className="flex items-start gap-3 border-b border-border py-4">
              <Check className="mt-1 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
              <span className="text-pretty text-sm leading-relaxed text-foreground/85">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">Zobacz także</h2>
            <Link
              href="/uslugi"
              className="flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Wszystkie usługi
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ServiceIndex services={otherServices} className="mt-8" />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
