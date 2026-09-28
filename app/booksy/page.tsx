import type { Metadata } from "next"
import { Calendar, ExternalLink, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { siteConfig, breadcrumbJsonLd } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Booksy — rezerwacja online",
  description: "Zarezerwuj wizytę w BORUCH Myjnia online przez Booksy — wybierz usługę i wolny termin.",
  alternates: { canonical: "/booksy" },
}

export default function BooksyPage() {
  return (
    <>
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
      <PageHero
      eyebrow="Rezerwacja online"
      title="Umów wizytę na Booksy"
      description="Wybierz usługę i wolny termin bezpośrednio w systemie Booksy — bez telefonowania i bez czekania na odpowiedź."
    >
      <div className="mt-8 flex flex-wrap gap-4">
        <Button
          render={<a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" />}
          size="lg"
          className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Calendar className="h-4 w-4" aria-hidden="true" />
          Otwórz Booksy
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          render={<a href={siteConfig.phoneHref} />}
          size="lg"
          variant="secondary"
          className="rounded-none border border-background/25 bg-transparent text-background hover:bg-background/10"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.phone}
        </Button>
      </div>
    </PageHero>
    </>
  )
}
