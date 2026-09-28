import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import type { Service } from "@/lib/services-data"
import { services, carSizeSurcharge } from "@/lib/services-data"
import { ServiceIcon } from "@/components/service-icon"
import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"

export function ServiceDetail({ service }: { service: Service }) {
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={service.category === "myjnia" ? "Myjnia" : "Detailing"}
        title={service.title}
        description={service.tagline}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            {service.priceFrom === "do uzgodnienia" ? "Cena do uzgodnienia" : `od ${service.priceFrom}`}
          </span>
          {service.priceNote && <span className="text-sm text-background/70">{service.priceNote}</span>}
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
        <div>
          <div className="flex h-12 w-12 items-center justify-center bg-secondary text-primary">
            <ServiceIcon icon={service.icon} className="h-6 w-6" />
          </div>
          <div className="mt-6 flex flex-col gap-4">
            {service.intro.map((paragraph, i) => (
              <p key={i} className="text-pretty leading-relaxed text-foreground/80">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden border border-border">
          <Image
            src={service.heroImage || "/placeholder.svg"}
            alt={`${service.title} — Boruch Myjnia, Szczecin`}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">{service.highlightsTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 border border-border bg-card p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">Jak wygląda usługa krok po kroku?</h2>
        <ol className="mt-8 flex flex-col gap-6">
          {service.process.map((step, i) => (
            <li key={step.title} className="flex gap-5 border-b border-border pb-6 last:border-none">
              <span className="font-heading text-2xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-pretty leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">{service.whyUsTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.whyUs.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-background/85">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-background/80">
            {service.closing}
          </p>
          <p className="mt-6 text-xs text-background/50">{carSizeSurcharge}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">Pozostałe usługi</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex flex-col gap-3 border border-border p-5 transition-colors hover:border-primary"
            >
              <div className="flex h-9 w-9 items-center justify-center bg-secondary text-primary">
                <ServiceIcon icon={s.icon} className="h-4 w-4" />
              </div>
              <span className="font-heading text-sm font-semibold text-foreground">{s.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
