import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Photo } from "@/components/photo"
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
      <section aria-labelledby="page-title" className="relative isolate flex min-h-[560px] items-end overflow-hidden border-b border-line pt-(--header-h)">
        <div className="enter-unmask frame absolute inset-0 border-0"><Photo id="p06" priority sizes="100vw" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,.97)_0%,rgba(7,7,7,.82)_52%,rgba(7,7,7,.42)_100%)]" />
        <div className="shell-wide relative z-10 pb-14 lg:pb-16">
          <p className="eyebrow mb-7">Rezerwacja online</p>
          <h1 id="page-title" className="type-h1 max-w-[12ch] text-balance">Umów wizytę na Booksy</h1>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-bone/70">Wybierz usługę i wolny termin bezpośrednio w systemie Booksy - bez telefonowania i bez czekania na odpowiedź.</p>
        </div>
      </section>
      <section className="section-lg">
        <div className="shell-wide grid gap-px bg-line lg:grid-cols-12">
          <div data-reveal="mask" className="frame aspect-[4/5] lg:col-span-7 lg:aspect-auto">
            <Photo id="p25" sizes="(min-width: 1024px) 58vw, 100vw" />
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
