import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ServiceIndex } from "@/components/service-index"
import { CtaBand } from "@/components/cta-band"
import { services } from "@/lib/services-data"
import { breadcrumbJsonLd } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Usługi",
  description: "Pełna lista usług myjni ręcznej i studia detailingowego BORUCH Myjnia w Szczecinie.",
  alternates: {
    canonical: "/uslugi",
    languages: {
      "pl-PL": "/uslugi",
      en: "/en/services",
      de: "/de/angebote",
      uk: "/uk/послуги",
      "x-default": "/uslugi",
    },
  },
}

export default function UslugiPage() {
  const groups = [
    { label: "Myjnia", title: "Mycie ręczne", items: services.filter((s) => s.category === "myjnia") },
    { label: "Detailing", title: "Studio detailingowe", items: services.filter((s) => s.category === "detailing") },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Strona główna", path: "/" },
              { name: "Usługi", path: "/uslugi" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Usługi"
        title="Wszystko, czego potrzebuje Twoje auto"
        description="Od codziennego mycia ręcznego po pełny detailing: powłoki ceramiczne, folię PPF, korektę lakieru i zmianę koloru. Sprawdź, co robimy w BORUCH Myjnia."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {groups.map((group, i) => (
          <section
            key={group.label}
            className={`grid gap-8 py-16 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16 lg:py-24 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div>
              <p className="eyebrow text-muted-foreground">{group.label}</p>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl">{group.title}</h2>
            </div>
            <ServiceIndex services={group.items} />
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  )
}
