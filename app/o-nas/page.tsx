import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { siteConfig, breadcrumbJsonLd } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "O nas",
  description: "Poznaj BORUCH Myjnia — ręczną myjnię samochodową i studio detailingowe w centrum Szczecina.",
  alternates: {
    canonical: "/o-nas",
    languages: {
      "pl-PL": "/o-nas",
      en: "/en/about-us",
      de: "/de/uber-uns",
      uk: "/uk/про-нас",
      "x-default": "/o-nas",
    },
  },
}

export default function ONasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Strona główna", path: "/" },
              { name: "O nas", path: "/o-nas" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="O nas"
        title="Dbamy o każdy detal Twojego auta"
        description="BORUCH Myjnia to ręczna myjnia i studio detailingowe prowadzone przez Karola Brucha, w samym centrum Szczecina."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
        <div className="relative aspect-[4/5] overflow-hidden border border-border">
          <Image
            src="/images/home/hero-4-boruch-myjnia.jpg"
            alt="Wnętrze myjni ręcznej BORUCH Myjnia w Szczecinie"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-pretty leading-relaxed text-foreground/80">
            Nasza myjnia znajduje się na podziemnym parkingu PAZIM, przy Placu Rodła 8 w Szczecinie — w samym sercu
            miasta, blisko biur, urzędów i centrów handlowych. To sprawia, że mycie i detailing auta można łatwo
            wpleść w codzienne plany.
          </p>
          <p className="text-pretty leading-relaxed text-foreground/80">
            Łączymy tradycyjne, ręczne mycie samochodowe z pełną gamą usług detailingowych klasy premium: powłokami
            ceramicznymi, folią PPF, korektą lakieru, przyciemnianiem szyb i zmianą koloru nadwozia. Każdy pojazd
            traktujemy indywidualnie, dobierając środki i metody do jego stanu i potrzeb właściciela.
          </p>
          <p className="text-pretty leading-relaxed text-foreground/80">
            Rezerwację można umówić online przez Booksy lub telefonicznie — bez kolejek i bez niespodzianek
            cenowych.
          </p>

          <div className="mt-4 flex flex-col gap-4 border-t border-border pt-6">
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm hover:text-primary">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.line2}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
            </a>
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-sm hover:text-primary">
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm hover:text-primary">
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
