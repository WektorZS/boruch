import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "../site-shell"
import { PageIntro } from "../page-intro"
import { Photo } from "../photo"
import { TrustedBy } from "../trusted-by"
import { BookingCta } from "../booking-cta"
import { breadcrumbJsonLd, routes, sources, ui, type Locale } from "@/lib/content"
import { formatIndex, serviceConfigs, type ServiceSlug } from "@/lib/content/services"

export function ServicesPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const total = src.services.groups.reduce((n, g) => n + g.items.length, 0)
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
      <PageIntro
        eyebrow={t.nav.services}
        title={t.nav.services}
        meta={`${formatIndex(total)} - ${src.services.groups.map((g) => g.title).join(" / ")}`}
        photo="p47"
        photoPosition="50% 65%"
      />

      {src.services.groups.map((group, g) => (
        <section key={group.title} aria-labelledby={`group-${g}`} className={g % 2 === 1 ? "section-lg bg-ink-2" : "section-lg"}>
          <div className="shell-wide flex flex-col gap-10 lg:gap-14">
            <div className="grid gap-5 border-b border-line-strong pb-7 md:grid-cols-12 md:items-end">
              <p className="type-index text-xs text-highlight md:col-span-1">{formatIndex(g + 1)}</p>
              <h2 id={`group-${g}`} className="type-h1 min-w-0 max-w-full break-words md:col-span-8">
                {group.title}
              </h2>
              <p className="type-label text-ash md:col-span-3 md:text-right">{formatIndex(group.items.length)}</p>
            </div>
            <ol>
              {group.items.map((item) => {
                running += 1
                const config = serviceConfigs.find((c) => c.slug === item.slug)
                const href = locale === "pl" && config ? `/${item.slug as ServiceSlug}` : null
                const Row = (
                  <div className="grid gap-5 py-7 md:min-h-40 md:grid-cols-12 md:items-center md:gap-8 lg:py-8">
                    <span className="type-index text-sm text-ash md:col-span-1">{formatIndex(running)}</span>
                    <h3 className="type-h3 text-balance transition-colors group-hover:text-highlight md:col-span-4">{item.title}</h3>
                    <p className="text-pretty leading-relaxed text-bone/70 md:col-span-4">{item.text}</p>
                    <div className="hidden items-center justify-end gap-4 md:col-span-3 md:flex">
                      {config && (
                        <span aria-hidden="true" className="frame block aspect-[4/3] w-28 opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 lg:w-36">
                          <Photo id={config.hero} sizes="112px" />
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
                        {Row}
                        <span className="sr-only">{t.viewService}</span>
                      </Link>
                    ) : (
                      <div className="group md:px-3">{Row}</div>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      ))}

      <TrustedBy title={src.services.trustedTitle} />
      <div className="shell-wide section-md">
        <Link href={routes[locale].pricing} className="group flex w-fit items-center gap-4 text-bone">
          <span className="type-label link-draw">{src.home.moreLink}</span>
          <ArrowRight className="arrow-shift size-5" aria-hidden="true" />
        </Link>
      </div>
      <BookingCta locale={locale} photo="p65" />
    </SiteShell>
  )
}
