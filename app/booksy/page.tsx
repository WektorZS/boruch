import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Photo } from "@/components/photo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Booksy - rezerwacja online",
  description: "Zarezerwuj wizytę w BORUCH Myjnia online przez Booksy - wybierz usługę i wolny termin.",
  alternates: { canonical: "/booksy/", languages: {} },
}

export default function BooksyPage() {
  return (
    <SiteShell locale="pl" breadcrumbs={[{ name: "Strona główna", path: "/" }, { name: "Rezerwacja online", path: "/booksy" }]}>
      <section aria-labelledby="page-title" className="page-hero relative isolate flex items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p06" priority sizes="100vw" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.6)_0%,rgba(6,6,7,.6)_52%,rgba(6,6,7,.36)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
        <div className="shell-wide relative z-10 pb-14 lg:pb-16">
          <p className="eyebrow mb-7">Rezerwacja online</p>
          <h1 id="page-title" className="page-hero-title type-h1">Umów wizytę na Booksy</h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/62">Wybierz usługę i wolny termin bezpośrednio w systemie Booksy - bez telefonowania i bez czekania na odpowiedź.</p>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#0a0a0b] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid lg:grid-cols-12">
          <div data-reveal="mask" className="editorial-photo relative aspect-[16/10] overflow-hidden lg:col-span-6 lg:aspect-auto">
            <Photo id="p25" sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="flex flex-col justify-between gap-8 bg-[#111112] p-7 sm:p-10 lg:col-span-6 lg:p-12">
            <div><p className="eyebrow">Wybierz dogodny termin</p><h2 className="mt-6 type-h2">Rezerwacja w kilku krokach</h2>
              <ol className="mt-7 grid gap-4 text-base leading-relaxed text-white/75"><li>Wybierz usługę i wariant odpowiedni do wielkości auta.</li><li>Sprawdź dostępne terminy i wybierz godzinę wizyty.</li><li>Potwierdź rezerwację bezpośrednio w Booksy.</li></ol>
              <p className="mt-5 text-sm leading-relaxed text-white/65">Nie wiesz, co wybrać? Zadzwoń do nas, pomożemy ustalić zakres.</p>
            </div>
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
