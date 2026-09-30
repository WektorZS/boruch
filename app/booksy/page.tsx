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
      <section aria-labelledby="page-title" className="relative isolate flex min-h-[660px] items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p06" priority sizes="100vw" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.98)_0%,rgba(6,6,7,.88)_52%,rgba(6,6,7,.36)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
        <div className="shell-wide relative z-10 pb-14 lg:pb-16">
          <p className="eyebrow mb-7">Rezerwacja online</p>
          <h1 id="page-title" className="type-h1 max-w-[14ch] text-balance">Umów wizytę na Booksy</h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/62">Wybierz usługę i wolny termin bezpośrednio w systemie Booksy - bez telefonowania i bez czekania na odpowiedź.</p>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#0a0a0b] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid lg:grid-cols-12">
          <div data-reveal="mask" className="relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-auto">
            <Photo id="p25" sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="flex min-h-96 flex-col justify-between gap-10 bg-[radial-gradient(circle_at_100%_0%,rgba(213,43,47,.16),transparent_22rem),#151112] p-7 sm:p-10 lg:col-span-5 lg:p-14">
            <div><p className="eyebrow">Rezerwacja online</p><p className="mt-7 type-h2 max-w-[12ch] text-balance">Umów wizytę na Booksy</p></div>
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
