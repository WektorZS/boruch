import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt do BORUCH Myjnia w Szczecinie — telefon, e-mail, adres i rezerwacja online przez Booksy.",
}

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Zapraszamy do naszej hali"
        description="Plac Rodła 8, parking podziemny PAZIM, poziom -2 — w samym centrum Szczecina."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 border border-border bg-card p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">Adres</p>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm leading-relaxed text-muted-foreground hover:text-primary"
              >
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 border border-border bg-card p-5">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">Telefon</p>
              <a href={siteConfig.phoneHref} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 border border-border bg-card p-5">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">E-mail</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 border border-border bg-card p-5">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">Rezerwacja online</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Umów wizytę bez telefonowania — przez system Booksy.
              </p>
              <Button asChild className="mt-3 rounded-none" size="sm">
                <Link href="/booksy">Zarezerwuj na Booksy</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-[4/3] overflow-hidden border border-border">
            <iframe
              title="Mapa — BORUCH Myjnia, Plac Rodła 8, Szczecin"
              src="https://www.google.com/maps?q=Plac+Rod%C5%82a+8,+Szczecin,+PAZIM&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex items-start gap-4 border border-border bg-secondary/40 p-5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-foreground/80">
              Aktualne godziny otwarcia oraz dostępne terminy sprawdzisz najszybciej w systemie rezerwacji Booksy —
              kalendarz jest tam zawsze aktualny.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
