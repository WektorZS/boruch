import Link from "next/link"
import { Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function CtaBand() {
  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Umów wizytę w BORUCH Myjnia</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            {siteConfig.address.line1}, {siteConfig.address.line2} — {siteConfig.city}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            variant="secondary"
            className="rounded-none border border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href={siteConfig.phoneHref}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </Button>
          <Button asChild className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/booksy">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Zarezerwuj online
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
