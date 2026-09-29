import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/boruch/site-shell"
import { Photo } from "@/components/boruch/photo"
import { siteConfig, breadcrumbJsonLd } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Booksy - rezerwacja online",
  description: "Zarezerwuj wizytę w BORUCH Myjnia online przez Booksy - wybierz usługę i wolny termin.",
  alternates: { canonical: "/booksy" },
}

export default function BooksyPage() {
  return (
    <SiteShell locale="pl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Strona główna", path: "/" },
              { name: "Booksy", path: "/booksy" },
            ]),
          ),
        }}
      />
      <section aria-labelledby="page-title" className="relative isolate pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="shell-wide grid gap-7 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3"><p className="eyebrow">Rezerwacja online</p></div>
          <div className="flex min-w-0 flex-col gap-7 lg:col-span-8 lg:col-start-5">
            <h1 id="page-title" data-reveal="" className="type-h1 max-w-[16ch] text-balance">Umów wizytę na Booksy</h1>
            <div className="grid gap-6 border-t border-line pt-6">
              <p className="type-lead max-w-2xl text-pretty text-bone/75">Wybierz usługę i wolny termin bezpośrednio w systemie Booksy - bez telefonowania i bez czekania na odpowiedź.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-lg">
        <div className="shell-wide grid gap-px bg-line lg:grid-cols-12">
          <div data-reveal="mask" className="frame aspect-[4/5] lg:col-span-7 lg:aspect-auto">
            <Photo id="p06" sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="surface-wine flex min-h-96 flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-5 lg:p-12">
            <p className="type-h2 max-w-[12ch] text-balance">Umów wizytę na Booksy</p>
            <div className="flex flex-col gap-3">
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                Otwórz Booksy
                <ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
              </a>
              <a href={siteConfig.phoneHref} className="btn btn-outline">{siteConfig.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
