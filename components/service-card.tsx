import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/lib/services-data"
import { ServiceIcon } from "@/components/service-icon"

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${service.slug}`}
      className="group relative flex flex-col justify-between gap-4 border border-border bg-card p-6 transition-colors hover:border-primary"
    >
      <div>
        <div className="flex h-11 w-11 items-center justify-center bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ServiceIcon icon={service.icon} className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-foreground">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.tagline}</p>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold text-foreground">
          {service.priceFrom === "do uzgodnienia" ? "Do uzgodnienia" : `od ${service.priceFrom.replace(/^od /, "")}`}
        </span>
        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </Link>
  )
}
