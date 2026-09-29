import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"
import { formatIndex, serviceConfigs, type ServiceSlug } from "@/lib/content/services"

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
  const total = src.services.groups.reduce((number, group) => number + group.items.length, 0)
  let running = 0

  return (
    <SiteShell locale={locale} page="services">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: t.nav.home, path: routes[locale].home },
              { name: t.nav.services, path: routes[locale].services },
            ]),
          ),
        }}
      />

      {/* HERO */}
      <section aria-labelledby="page-title" className="relative isolate pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="shell-wide grid gap-7 lg:grid-cols-12 lg:gap-8">
          <div className="flex items-start justify-between gap-5 lg:col-span-3">
            <p className="eyebrow">{t.nav.services}</p>
            <p className="type-label ml-auto text-right text-ash lg:hidden">
              {formatIndex(total)} - {src.services.groups.map((group) => group.title).join(" / ")}
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-7 lg:col-span-8 lg:col-start-5">
            <h1 id="page-title" data-reveal="" className="type-h1 max-w-[16ch] text-balance">{t.nav.services}</h1>
          </div>
          <p className="type-label hidden text-right text-ash lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:block">
            {formatIndex(total)} - {src.services.groups.map((group) => group.title).join(" / ")}
          </p>
        </div>
        <div className="shell-wide mt-12 lg:mt-16">
          <div className="enter-unmask frame aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2/1]">
            <Photo id="p47" priority sizes="(min-width: 1680px) 1600px, 100vw" position="50% 65%" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* GRUPY USŁUG */}
      {src.services.groups.map((group, groupIndex) => (
        <section key={group.title} aria-labelledby={"group-" + groupIndex} className={groupIndex % 2 === 1 ? "section-lg bg-ink-2" : "section-lg"}>
          <div className="shell-wide flex flex-col gap-10 lg:gap-14">
            <div className="grid gap-5 border-b border-line-strong pb-7 md:grid-cols-12 md:items-end">
              <p className="type-index text-xs text-highlight md:col-span-1">{formatIndex(groupIndex + 1)}</p>
              <h2 id={"group-" + groupIndex} className="type-h1 min-w-0 max-w-full break-words md:col-span-8">{group.title}</h2>
              <p className="type-label text-ash md:col-span-3 md:text-right">{formatIndex(group.items.length)}</p>
            </div>
            <ol>
              {group.items.map((item) => {
                running += 1
                const config = serviceConfigs.find((service) => service.slug === item.slug)
                const href = locale === "pl" && config ? "/" + (item.slug as ServiceSlug) : null
                const row = (
                  <div className="grid gap-5 py-7 md:min-h-40 md:grid-cols-12 md:items-center md:gap-8 lg:py-8">
                    <span className="type-index text-sm text-ash md:col-span-1">{formatIndex(running)}</span>
                    <h3 className="type-h3 text-balance transition-colors group-hover:text-highlight md:col-span-4">{item.title}</h3>
                    <p className="text-pretty leading-relaxed text-bone/70 md:col-span-4">{item.text}</p>
                    <div className="hidden items-center justify-end gap-4 md:col-span-3 md:flex">
                      {config && (
                        <span aria-hidden="true" className="frame block aspect-[4/3] w-28 opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 lg:w-36">
                          <Photo id={config.hero} sizes="144px" />
                        </span>
                      )}
                      {href && <ArrowRight className="arrow-shift size-5 shrink-0 text-bone" aria-hidden="true" />}
                    </div>
                  </div>
                )
                return (
                  <li key={item.slug} data-reveal="" className="border-b border-line">
                    {href ? (
                      <Link href={href} className="group block transition-colors hover:bg-wine-deep/25 md:px-3">
                        {row}
                        <span className="sr-only">{t.viewService}</span>
                      </Link>
                    ) : (
                      <div className="group md:px-3">{row}</div>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      ))}

      {/* PARTNERZY */}
      <section aria-labelledby="trusted-title" className="section-md border-t border-line">
        <div className="shell-wide flex flex-col gap-10">
          <h2 id="trusted-title" data-reveal="" className="type-h2">{src.services.trustedTitle}</h2>
          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {clients.map((client, i) => (
              <li key={client.file} data-reveal="" style={{ "--d": i % 4 } as React.CSSProperties} className="group flex aspect-[5/3] items-center justify-center bg-bone p-6 lg:p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={"/images/clients/" + client.file + ".webp"} alt={client.name} loading="lazy" decoding="async" className="max-h-14 w-auto max-w-full object-contain opacity-75 mix-blend-multiply grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="shell-wide section-md">
        <Link href={routes[locale].pricing} className="group flex w-fit items-center gap-4 text-bone">
          <span className="type-label link-draw">{src.home.moreLink}</span>
          <ArrowRight className="arrow-shift size-5" aria-hidden="true" />
        </Link>
      </div>

      {/* REZERWACJA */}
      <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-t border-line">
        <div className="absolute inset-0 -z-10">
          <Photo id="p65" sizes="100vw" className="opacity-35" position="50% 60%" />
          <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/30" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-wine-deep/50 to-transparent" />
        </div>
        <div className="shell-wide section-lg grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="flex max-w-4xl flex-col gap-6 lg:col-span-8">
            <p className="eyebrow">{t.book}</p>
            <h2 id="booking-title" data-reveal="" className="type-h1 max-w-[14ch] text-balance">{src.home.contactTitle}</h2>
            <p data-reveal="" style={{ "--d": 2 } as React.CSSProperties} className="type-lead max-w-xl text-pretty text-bone/80">{src.home.contactText}</p>
          </div>
          <div data-reveal="" style={{ "--d": 3 } as React.CSSProperties} className="flex flex-col gap-3 sm:flex-row lg:col-span-3 lg:col-start-10 lg:flex-col">
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group min-h-14 px-7">{t.booksy}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a>
            <a href={contact.phoneHref} className="btn btn-outline min-h-14 px-7">{t.call} · {contact.phone}</a>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
