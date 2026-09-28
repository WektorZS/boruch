import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { priceGroups, priceDisclaimer } from "@/lib/pricing-data"

export const metadata: Metadata = {
  title: "Cennik",
  description: "Cennik usług myjni ręcznej i detailingu BORUCH Myjnia w Szczecinie — mycie, wnętrze, powłoki, folia PPF.",
}

export default function CennikPage() {
  return (
    <>
      <PageHero
        eyebrow="Cennik"
        title="Przejrzyste ceny bez niespodzianek"
        description="Poniżej znajdziesz orientacyjne ceny naszych usług. Dokładną kwotę potwierdzamy zawsze po obejrzeniu pojazdu."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          {priceGroups.map((group) => (
            <div key={group.title} className="border border-border bg-card">
              <div className="border-b border-border bg-secondary/40 px-6 py-4">
                <h2 className="font-heading text-xl font-bold text-foreground">{group.title}</h2>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} className="border-b border-border px-6 py-4 last:border-none">
                    <Link
                      href={item.href ?? "#"}
                      className="group flex items-center justify-between gap-4 hover:text-primary"
                    >
                      <span>
                        <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                          {item.name}
                        </span>
                        {item.note && <span className="mt-0.5 block text-xs text-muted-foreground">{item.note}</span>}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground">
                        {item.price}
                        <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
          {priceDisclaimer}
        </p>
      </section>

      <CtaBand />
    </>
  )
}
