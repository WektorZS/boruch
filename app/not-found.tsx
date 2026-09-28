import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Błąd 404</p>
      <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">Strona nie znaleziona</h1>
      <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
        Strona, której szukasz, nie istnieje lub została przeniesiona. Sprawdź nasze usługi, cennik lub wróć na
        stronę główną.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button render={<Link href="/" />} size="lg" className="rounded-none">
          Strona główna
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button render={<a href={siteConfig.phoneHref} />} size="lg" variant="outline" className="rounded-none">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.phone}
        </Button>
      </div>
    </div>
  )
}
