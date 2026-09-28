import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServiceCard } from "@/components/service-card"
import { CtaBand } from "@/components/cta-band"
import { services } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Usługi",
  description: "Pełna lista usług myjni ręcznej i studia detailingowego BORUCH Myjnia w Szczecinie.",
}

export default function UslugiPage() {
  const myjniaServices = services.filter((s) => s.category === "myjnia")
  const detailingServices = services.filter((s) => s.category === "detailing")

  return (
    <>
      <PageHero
        eyebrow="Usługi"
        title="Wszystko, czego potrzebuje Twoje auto"
        description="Od codziennego mycia ręcznego po pełny detailing: powłoki ceramiczne, folię PPF, korektę lakieru i zmianę koloru. Sprawdź, co robimy w BORUCH Myjnia."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Myjnia</p>
        <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Mycie ręczne</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myjniaServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground">Detailing</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Studio detailingowe</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detailingServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
