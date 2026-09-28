import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { priceGroups, priceDisclaimer } from "@/lib/pricing-data"
import { breadcrumbJsonLd } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Cennik",
  description: "Cennik usług myjni ręcznej i detailingu BORUCH Myjnia w Szczecinie — mycie, wnętrze, powłoki, folia PPF.",
  alternates: { canonical: "/cennik" },
}

export default function CennikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Strona główna", path: "/" },
              { name: "Cennik", path: "/cennik" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Cennik"
        title="Przejrzyste ceny bez niespodzianek"
        description="Poniżej znajdziesz orientacyjne ceny naszych usług. Dokładną kwotę potwierdzamy zawsze po obejrzeniu pojazdu."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {priceGroups.map((group) => (
            <div key={group.title}>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">{group.title}</h2>
              <ul className="mt-6 border-t-2 border-foreground">
                {group.items.map((item) => {
                  const content = (
                    <>
                      <span className="min-w-0">
                        <span className="block text-base font-medium text-foreground">{item.name}</span>
                        {item.note && (
                          <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted-foreground">
                            {item.note}
                          </span>
                        )}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 whitespace-nowrap font-heading text-base font-semibold tabular-nums text-foreground">
                        {item.price}
                        {item.href && (
                          <ArrowUpRight
                            className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </>
                  )
                  const rowClass = "flex items-baseline justify-between gap-6 border-b border-border py-5"
                  return (
                    <li key={item.name}>
                      {item.href ? (
                        <Link href={item.href} className={`group ${rowClass} transition-colors hover:bg-secondary sm:px-3`}>
                          {content}
                        </Link>
                      ) : (
                        <div className={`${rowClass} sm:px-3`}>{content}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">{priceDisclaimer}</p>
      </section>

      <CtaBand />
    </>
  )
}
