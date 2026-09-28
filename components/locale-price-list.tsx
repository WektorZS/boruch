import type { LocaleDictionary } from "@/lib/translations"

export function LocalePriceList({ dict }: { dict: LocaleDictionary }) {
  const { packages } = dict
  const { pricing } = dict.pages

  const mainPackages = [
    { name: packages.interior.label, price: packages.interior.price, note: packages.interior.note },
    { name: packages.exterior.label, price: packages.exterior.price, note: packages.exterior.note },
    { name: packages.full.label, price: packages.full.price, note: packages.full.note },
  ]

  return (
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{dict.nav.pricing}</h2>
        <ul className="mt-6 border-t-2 border-foreground">
          {mainPackages.map((item) => (
            <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-border py-5 sm:px-3">
              <span className="min-w-0">
                <span className="block text-base font-medium text-foreground">{item.name}</span>
                <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted-foreground">
                  {item.note}
                </span>
              </span>
              <span className="shrink-0 whitespace-nowrap font-heading text-base font-semibold tabular-nums text-foreground">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{pricing.otherServicesTitle}</h2>
        <ul className="mt-6 border-t-2 border-foreground">
          {pricing.otherServices.map((item) => (
            <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-border py-5 sm:px-3">
              <span className="min-w-0 text-base font-medium text-foreground">{item.name}</span>
              <span className="shrink-0 whitespace-nowrap font-heading text-base font-semibold tabular-nums text-foreground">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
