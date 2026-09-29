import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"
import { serviceConfigs, servicePrice, type ServiceSlug } from "@/lib/content/services"

const clients = [
  { file: "radisson", name: "Radisson Blu" },
  { file: "avis", name: "Avis" },
  { file: "unity-line", name: "Unity Line" },
  { file: "baltica", name: "Baltica" },
  { file: "fitnessworld", name: "Fitness World" },
  { file: "mooveno", name: "Mooveno" },
  { file: "umwz", name: "Urząd Marszałkowski Województwa Zachodniopomorskiego" },
  { file: "logo-type", name: "Wilhelmsen" },
]

export function ServicesPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <SiteShell locale={locale} page="services">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: t.nav.home, path: routes[locale].home }, { name: t.nav.services, path: routes[locale].services }])) }} />

      <section aria-labelledby="page-title" className="relative isolate flex min-h-[620px] items-end overflow-hidden border-b border-line pt-(--header-h)">
        <div className="enter-unmask frame absolute inset-0 border-0"><Photo id="p47" priority sizes="100vw" position="50% 65%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,.97)_0%,rgba(7,7,7,.82)_48%,rgba(7,7,7,.35)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/45" />
        <div className="shell-wide relative z-10 pb-14 lg:pb-16">
          <div className="max-w-3xl">
            <p className="eyebrow mb-7">{t.nav.services}</p>
            <h1 id="page-title" className="type-h1 max-w-[12ch] text-balance">{t.nav.services}</h1>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-bone/70">{src.meta.services.description}</p>
          </div>
        </div>
      </section>

      {src.services.groups.map((group) => (
        <section key={group.title} aria-labelledby={`group-${group.title}`} className="section-lg border-b border-line odd:bg-ink even:bg-ink-2">
          <div className="shell-wide">
            <div className="mb-10 border-b border-line-strong pb-7">
              <h2 id={`group-${group.title}`} className="type-h2">{group.title}</h2>
            </div>
            <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item, i) => {
                const config = serviceConfigs.find((service) => service.slug === item.slug)
                const slug = item.slug as ServiceSlug
                const href = locale === "pl" && config ? `/${slug}` : null
                const price = config ? servicePrice(locale, slug) : null
                const card = (
                  <div className="group flex h-full min-h-64 flex-col border border-line bg-ink p-6 transition-colors hover:border-line-wine hover:bg-ink-warm">
                    <div className="mb-8 flex items-start justify-between gap-5">
                      <span className="type-label text-highlight">{group.title}</span>
                      {href && <ArrowRight className="arrow-shift size-5 text-ash group-hover:text-highlight" aria-hidden="true" />}
                    </div>
                    <h3 className="type-h3 max-w-[16ch] text-balance">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-ash">{item.text}</p>
                    <div className="mt-auto flex items-end justify-between gap-5 border-t border-line pt-5">
                      <span className="type-label text-ash">{t.priceLabel}</span>
                      <span className="font-display text-lg font-bold text-bone">{price ?? t.individualQuote}</span>
                    </div>
                  </div>
                )
                return <li key={item.slug} data-reveal="" style={{ "--d": i % 3 } as React.CSSProperties}>{href ? <Link href={href} className="block h-full">{card}</Link> : card}</li>
              })}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="trusted-title" className="section-md border-b border-line bg-wine-deep/20">
        <div className="shell-wide">
          <p className="eyebrow mb-6">BORUCH</p>
          <h2 id="trusted-title" className="type-h2 mb-10 max-w-[15ch]">{src.services.trustedTitle}</h2>
          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {clients.map((client) => <li key={client.file} className="flex aspect-[5/3] items-center justify-center bg-[#0b0a0b] p-6"><img src={`/images/clients/${client.file}.webp`} alt={client.name} loading="lazy" decoding="async" className="max-h-12 max-w-full object-contain opacity-55 grayscale invert transition hover:opacity-90" /></li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10"><Photo id="p65" sizes="100vw" className="opacity-25" position="50% 60%" /><div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-wine-deep/70" /></div>
        <div className="shell-wide section-lg grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="eyebrow mb-6">{t.book}</p><h2 id="booking-title" className="type-h1 max-w-[12ch]">{src.home.contactTitle}</h2><p className="mt-5 max-w-xl text-bone/70">{src.home.contactText}</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end"><a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">{t.booksy}<ArrowUpRight className="arrow-lift size-4" /></a><Link href={routes[locale].pricing} className="btn btn-outline">{t.pricing}</Link></div>
        </div>
      </section>
    </SiteShell>
  )
}
