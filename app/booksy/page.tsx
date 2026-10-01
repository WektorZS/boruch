import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { Photo, photoSrc } from "@/components/photo"
import { siteConfig } from "@/lib/site-config"

const title = "Booksy - rezerwacja online"
const description = "Zarezerwuj wizytę w BORUCH Myjnia online przez Booksy - wybierz usługę i wolny termin."
const socialTitle = `${title} | Boruch Myjnia Szczecin`
const socialImage = photoSrc("p06", 1600)

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/booksy/", languages: {} },
  openGraph: {
    title: socialTitle,
    description,
    url: `${siteConfig.sourceUrl}/booksy/`,
    siteName: "Boruch Myjnia",
    locale: "pl_PL",
    type: "website",
    images: [{ url: socialImage, alt: "Boruch Myjnia Szczecin - rezerwacja online" }],
  },
  twitter: { card: "summary_large_image", title: socialTitle, description, images: [socialImage] },
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
        <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Wybierz dogodny termin</p>
            <h2 className="mt-6 editorial-display">Rezerwacja w kilku krokach</h2>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:col-start-6">
            <ol className="border-t border-white/15 text-base leading-relaxed text-white/75">
              {["Wybierz usługę i wariant odpowiedni do wielkości auta.", "Sprawdź dostępne terminy i wybierz godzinę wizyty.", "Potwierdź rezerwację bezpośrednio w Booksy."].map((step, index) => (
                <li key={step} className="flex items-start gap-5 border-b border-white/15 py-5"><span aria-hidden="true" className="type-index shrink-0 pt-0.5 text-sm text-brand">{String(index + 1).padStart(2, "0")}</span><span>{step}</span></li>
              ))}
            </ol>
            <p className="mt-7 text-sm leading-relaxed text-white/65">Nie wiesz, co wybrać? Zadzwoń do nas, pomożemy ustalić zakres.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
