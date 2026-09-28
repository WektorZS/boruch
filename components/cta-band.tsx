import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function CtaBand() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Rezerwacja</p>
          <h2 className="mt-5 text-balance font-heading text-3xl font-bold leading-tight sm:text-5xl">
            Umów wizytę w BORUCH Myjnia
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-background/65">
            {siteConfig.address.line1}, {siteConfig.address.line2} — {siteConfig.city}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            render={<Link href="/booksy" />}
            size="lg"
            className="h-12 rounded-none bg-accent px-6 text-accent-foreground hover:bg-accent/90"
          >
            Zarezerwuj online
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            render={<a href={siteConfig.phoneHref} />}
            size="lg"
            variant="outline"
            className="h-12 rounded-none border-background/25 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </Button>
        </div>
      </div>
    </section>
  )
}
