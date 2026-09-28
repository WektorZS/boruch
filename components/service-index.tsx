import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Service } from "@/lib/services-data"
import { cn } from "@/lib/utils"

export function formatServicePrice(priceFrom: string) {
  if (priceFrom === "do uzgodnienia") return "Wycena indywidualna"
  return `od ${priceFrom.replace(/^od\s+/, "")}`
}

export function ServiceIndex({
  services,
  showTagline = true,
  className,
}: {
  services: Service[]
  showTagline?: boolean
  className?: string
}) {
  return (
    <ul className={cn("border-t border-border", className)}>
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/${service.slug}`}
            className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-border py-5 transition-colors hover:bg-secondary sm:px-3"
          >
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
              {service.title}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap text-sm font-medium tabular-nums text-foreground">
              {formatServicePrice(service.priceFrom)}
              <ArrowUpRight
                className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                aria-hidden="true"
              />
            </span>
            {showTagline && (
              <span className="col-span-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:col-span-1">
                {service.tagline}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
