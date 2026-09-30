import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { siteConfig } from "@/lib/site-config"

export default function NotFound() {
  return (
    <SiteShell locale="pl" page="home">
    <section className="shell-wide flex min-h-[75svh] flex-col items-start justify-center py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Błąd 404</p>
      <h1 className="mt-5 type-h1">Tu nie ma tej strony.</h1>
      <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
        Strona, której szukasz, nie istnieje lub została przeniesiona. Sprawdź nasze usługi, cennik lub wróć na
        stronę główną.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link prefetch={false} href="/" className="home-button home-button-red">
          Strona główna
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a href={siteConfig.phoneHref} className="home-button home-button-dark">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.phone}
        </a>
      </div>
    </section>
    </SiteShell>
  )
}
