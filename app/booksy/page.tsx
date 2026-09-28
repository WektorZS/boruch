import type { Metadata } from "next"
import { Calendar, ExternalLink, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Booksy — rezerwacja online",
  description: "Zarezerwuj wizytę w BORUCH Myjnia online przez Booksy — wybierz usługę i wolny termin.",
}

export default function BooksyPage() {
  return (
    <PageHero
      eyebrow="Rezerwacja online"
      title="Umów wizytę na Booksy"
      description="Wybierz usługę i wolny termin bezpośrednio w systemie Booksy — bez telefonowania i bez czekania na odpowiedź."
    >
      <div className="mt-8 flex flex-wrap gap-4">
        <Button asChild size="lg" className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
          <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Otwórz Booksy
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="rounded-none border border-background/25 bg-transparent text-background hover:bg-background/10"
        >
          <a href={siteConfig.phoneHref}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </Button>
      </div>
    </PageHero>
  )
}
