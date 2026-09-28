import { sources, ui, type Locale } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Splits source price strings like "od 110zł*" into prefix / amount / currency for typographic setting. */
export function PriceTag({ value, className, size = "lg" }: { value: string; className?: string; size?: "lg" | "md" }) {
  const match = value.match(/^(\D*?)\s*([\d][\d\s.,]*)\s*(zł|PLN)?\s*(\*)?$/i)
  if (!match) {
    return <span className={cn("font-display font-semibold uppercase [font-stretch:115%] [font-variation-settings:'wdth'_115]", className)}>{value}</span>
  }
  const [, prefix, amount, currency, star] = match
  return (
    <span className={cn("inline-flex items-baseline gap-2 whitespace-nowrap", className)}>
      {prefix && <span className="type-label text-ash">{prefix}</span>}
      <span
        className={cn(
          "font-display font-bold leading-none tracking-[-0.03em] [font-stretch:130%] [font-variation-settings:'wdth'_130]",
          size === "lg" ? "text-[clamp(2.75rem,5vw,4.5rem)]" : "text-[clamp(1.5rem,2.4vw,2.25rem)]",
        )}
      >
        {amount.trim()}
      </span>
      {currency && <span className="type-label text-bone">{currency}</span>}
      {star && <span className="text-highlight">{star}</span>}
    </span>
  )
}

/** Wash packages from the locale's pricing page, set as large rows with a clear hierarchy. */
export function PricingPackages({ locale, headingId }: { locale: Locale; headingId?: string }) {
  const pricing = sources[locale].pricing
  const t = ui[locale]
  // The source lists interior, exterior, complete; show the natural wash progression exterior → interior → complete.
  const order = [1, 0, 2]
  const currency = locale === "pl" ? "zł" : "PLN"

  return (
    <div className="flex flex-col">
      <ol aria-labelledby={headingId} className="border-t border-line-strong">
        {order.map((idx, position) => {
          const pkg = pricing.packages[idx]
          if (!pkg) return null
          const featured = Boolean(pkg.popular)
          return (
            <li
              key={pkg.title}
              data-reveal=""
              className={cn(
                "relative grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-14",
                featured && "bg-linear-to-r from-wine-deep/70 via-ink-warm/40 to-transparent",
              )}
            >
              {featured && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-brand" />}
              <span className={cn("type-index text-xs text-ash lg:col-span-1", featured && "pl-5 text-highlight lg:pl-5")}>
                {String(position + 1).padStart(2, "0")}
              </span>
              <div className={cn("flex flex-col gap-3 lg:col-span-4", featured && "pl-5 lg:pl-0")}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="type-h2">{pkg.title}</h3>
                  {pkg.popular && <span className="type-label bg-brand px-2 py-1 text-bone">{pkg.popular}</span>}
                </div>
                <p className="text-pretty leading-relaxed text-ash">{pkg.tagline}</p>
              </div>
              <div className={cn("flex flex-col gap-4 lg:col-span-4", featured && "pl-5 lg:pl-0")}>
                {pkg.includedLabel && <p className="type-label text-ash">{pkg.includedLabel}</p>}
                <ul className="flex flex-col gap-2">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-bone/85">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                {pkg.discount && <p className="text-sm leading-relaxed text-bone/70">{pkg.discount}</p>}
              </div>
              <div className={cn("flex flex-col gap-2 lg:col-span-3 lg:items-end lg:text-right", featured && "pl-5 lg:pl-0 lg:pr-6")}>
                {pkg.price && <PriceTag value={pkg.price} />}
                {pkg.note && <p className="type-label text-ash">{pkg.note}</p>}
              </div>
            </li>
          )
        })}
      </ol>

      <div data-reveal="" className="grid gap-8 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
        <p className="type-label text-bone lg:col-span-3 lg:col-start-2">{t.sizes}</p>
        <dl className="grid grid-cols-3 gap-4 lg:col-span-5">
          {[
            { label: t.compact, value: "+0" },
            { label: t.medium, value: "+10" },
            { label: t.large, value: "+30" },
          ].map((row) => (
            <div key={row.label} className="flex flex-col gap-2 border-l border-line pl-4">
              <dt className="type-label text-ash">{row.label}</dt>
              <dd className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold tracking-[-0.03em] [font-stretch:130%] [font-variation-settings:'wdth'_130]">{row.value}</span>
                <span className="type-label text-bone">{currency}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-pretty text-sm leading-relaxed text-bone/70 lg:col-span-3">
          <span className="text-highlight">* </span>
          {pricing.packagesNote}
        </p>
      </div>
    </div>
  )
}
