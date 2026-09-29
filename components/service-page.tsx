import { Fragment } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo, photoSrc } from "./photo"
import { contact, localeOrder, routes, sources, ui, type Locale } from "@/lib/content"
import { formatIndex, getService, serviceGroupTitle, servicePrice, services, type Service, type ServiceSlug } from "@/lib/content/services"
import type { ServiceBlock, ServiceSection as Section, ServiceStep } from "@/lib/content/types"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const { source } = getService(slug)
  return {
    title: { absolute: source.meta.title },
    description: source.meta.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: source.meta.title,
      description: source.meta.description,
      url: `https://boruchmyjnia.pl/${slug}`,
      images: [{ url: photoSrc(getService(slug).hero, 1600) }],
    },
  }
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug)
  const { sections } = service.source
  const breakAfter = Math.min(1, sections.length - 1)
  const alternates = Object.fromEntries(
    localeOrder.map((code) => [code, code === "pl" ? `/${slug}` : routes[code].services]),
  ) as Record<Locale, string>
  const price = servicePrice("pl", slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navTitle,
    description: service.source.meta.description,
    url: `https://boruchmyjnia.pl/${slug}`,
    areaServed: siteConfig.city,
    provider: { "@id": "https://boruchmyjnia.pl/#business" },
    ...(price ? { offers: { "@type": "Offer", priceCurrency: "PLN", description: price, url: contact.bookingUrl } } : {}),
  }

  return (
    <SiteShell locale="pl" page="services" alternates={alternates}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceHero service={service} />
      <ServiceIntro service={service} />
      <ServiceProcess service={service} />
      {sections.map((section, i) => (
        <Fragment key={section.heading}>
          <ServiceSection service={service} section={section} id={`section-${i + 1}`} />
          {i === breakAfter && (
            <div className="shell-wide grid pb-4 lg:grid-cols-12">
              <div data-reveal="mask" className="frame aspect-[4/3] lg:col-span-9 lg:col-start-4 lg:aspect-[16/8]">
                <Photo id={service.frames[2]} sizes="(min-width: 1024px) 75vw, 100vw" />
              </div>
            </div>
          )}
        </Fragment>
      ))}
      <ServiceRelated service={service} />
      <BookingCta />
    </SiteShell>
  )
}

function ServiceHero({ service }: { service: Service }) {
  const t = ui.pl
  const price = servicePrice("pl", service.slug)
  const group = serviceGroupTitle("pl", service.slug)

  return (
    <section aria-labelledby="service-title" className="relative isolate pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
      <div className="shell-wide flex flex-col gap-9 lg:gap-12">
        <div className="enter-fade flex items-center justify-between gap-6" style={{ "--i": 0 } as React.CSSProperties}>
          <nav aria-label="Breadcrumb">
            <ol className="type-label flex flex-wrap items-center gap-2 text-ash">
              <li><Link href={routes.pl.services} className="transition-colors hover:text-bone">{t.nav.services}</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li className="text-bone">{group}</li>
            </ol>
          </nav>
          <p className="type-label text-ash"><span className="text-bone">{formatIndex(service.index)}</span> / {formatIndex(services.length)}</p>
        </div>
        <h1 id="service-title" className="enter-fade type-h1 max-w-[15ch] text-balance" style={{ "--i": 1 } as React.CSSProperties}>{service.source.heading}</h1>
        <div className="grid gap-8 border-t border-line pt-7 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="enter-fade flex flex-col gap-3 lg:col-span-6" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="type-label text-ash">{service.source.headingSub}</p>
            <p className="type-lead text-pretty text-bone first-letter:uppercase">{service.source.tagline}</p>
          </div>
          <div className="enter-fade flex flex-col gap-2 lg:col-span-2" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="type-label text-ash">{t.priceLabel}</p>
            <p className={price ? "type-h2 [font-stretch:115%] [font-variation-settings:'wdth'_115]" : "type-h3 text-bone/90"}>{price ?? t.individualQuote}</p>
          </div>
          <div className="enter-fade flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end" style={{ "--i": 4 } as React.CSSProperties}>
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">{t.book}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a>
            <Link href={routes.pl.pricing} className="btn btn-outline">{t.pricing}</Link>
          </div>
        </div>
      </div>
      <div className="shell-wide mt-12 lg:mt-16">
        <div className="enter-unmask frame frame-shade relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2/1]">
          <Photo id={service.hero} priority sizes="(min-width: 1680px) 1600px, 100vw" position="50% 60%" />
          <p className="type-label absolute bottom-5 left-5 z-10 flex items-center gap-3 text-bone lg:bottom-7 lg:left-7"><span aria-hidden="true" className="size-1.5 bg-brand" />BORUCH - Szczecin - PAZIM</p>
        </div>
      </div>
    </section>
  )
}

function ServiceIntro({ service }: { service: Service }) {
  const [first, ...rest] = service.source.intro
  return (
    <section aria-label={service.navTitle} className="section-lg">
      <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-10 lg:col-span-7 lg:pt-8">
          <p className="eyebrow">{service.navTitle}</p>
          <p data-reveal="" className="type-lead max-w-3xl text-pretty text-bone/90">{first}</p>
          <div className="flex max-w-2xl flex-col gap-5 lg:ml-[16%]">
            {rest.map((para, i) => <p key={i} data-reveal="" style={{ "--d": i + 1 } as React.CSSProperties} className="type-body text-pretty text-bone/70">{para}</p>)}
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div data-reveal="mask" className="frame aspect-[3/4] lg:sticky lg:top-[calc(var(--header-h)+2rem)]"><Photo id={service.frames[0]} sizes="(min-width: 1024px) 33vw, 100vw" /></div>
        </div>
      </div>
    </section>
  )
}

function ServiceProcess({ service }: { service: Service }) {
  const t = ui.pl
  const { steps, processTitle } = service.source
  if (steps.length === 0) return null
  const split = steps.length > 3 ? Math.ceil(steps.length / 2) : steps.length
  const before = steps.slice(0, split)
  const after = steps.slice(split)

  return (
    <section aria-labelledby="process-title" className="border-t border-line">
      <div className="shell-wide section-lg">
        <div className="mb-12 grid gap-7 lg:mb-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3"><p className="eyebrow">{t.process}</p></div>
          <div className="lg:col-span-8 lg:col-start-5"><h2 id="process-title" data-reveal="" className="type-h2 max-w-[16ch] text-balance">{processTitle ?? t.process}</h2></div>
        </div>
        <StepList steps={before} stepLabel={t.step} />
      </div>
      {after.length > 0 && (
        <>
          <div data-reveal="mask" className="frame aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2/1]"><Photo id={service.frames[1]} sizes="100vw" /></div>
          <div className="shell-wide section-lg"><StepList steps={after} start={split + 1} stepLabel={t.step} /></div>
        </>
      )}
    </section>
  )
}

function StepList({ steps, start = 1, stepLabel, compact = false }: { steps: ServiceStep[]; start?: number; stepLabel: string; compact?: boolean }) {
  return (
    <ol className="border-b border-line">
      {steps.map((step, i) => (
        <li key={step.title} data-reveal="" style={{ "--d": i % 3 } as React.CSSProperties} className={cn("group grid gap-4 border-t border-line transition-colors hover:border-line-strong md:grid-cols-12 md:gap-8", compact ? "py-7" : "py-9 lg:py-12")}>
          <p className="flex items-baseline gap-3 md:col-span-2 md:flex-col md:gap-2">
            <span className="type-index text-3xl text-bone transition-colors group-hover:text-highlight lg:text-4xl">{formatIndex(start + i)}</span>
            <span className="type-label text-ash">{stepLabel}</span>
          </p>
          <h3 className={cn("text-pretty md:col-span-4", compact ? "type-h3" : "type-h3 lg:text-[1.75rem] lg:leading-tight")}>{step.title}</h3>
          <div className="flex flex-col gap-4 md:col-span-6">{step.body.map((para, j) => <p key={j} className="type-body text-pretty text-bone/75">{para}</p>)}</div>
        </li>
      ))}
    </ol>
  )
}

function ServiceSection({ service, section, id }: { service: Service; section: Section; id: string }) {
  if (section.kind === "price") return <PriceSection service={service} section={section} id={id} />
  if (section.kind === "summary") return <SummarySection section={section} id={id} />
  return <ListSection section={section} id={id} />
}

function ListSection({ section, id }: { section: Section; id: string }) {
  return (
    <section aria-labelledby={id} className="section-md border-t border-line">
      <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5"><h2 id={id} data-reveal="" className="type-h2 max-w-[14ch] text-balance lg:sticky lg:top-[calc(var(--header-h)+2rem)]">{section.heading}</h2></div>
        <div className="lg:col-span-7">{section.kind === "process" && section.steps ? <StepList steps={section.steps} stepLabel={ui.pl.step} compact /> : <Blocks blocks={section.blocks} />}</div>
      </div>
    </section>
  )
}

function Blocks({ blocks }: { blocks: ServiceBlock[] }) {
  const groups: { type: ServiceBlock["type"]; texts: string[] }[] = []
  for (const block of blocks) {
    const last = groups[groups.length - 1]
    if (last && last.type === block.type) last.texts.push(block.text)
    else groups.push({ type: block.type, texts: [block.text] })
  }
  return (
    <div className="flex flex-col gap-8">
      {groups.map((group, g) => group.type === "item" ? (
        <ul key={g} className="border-b border-line">
          {group.texts.map((text, i) => <li key={i} data-reveal="" style={{ "--d": i % 4 } as React.CSSProperties} className="group flex items-start gap-5 border-t border-line py-5 transition-colors hover:bg-ink-warm/60 md:px-2"><span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-brand transition-transform group-hover:scale-150" /><span className="text-pretty text-lg leading-snug text-bone md:text-xl">{text}</span></li>)}
        </ul>
      ) : (
        <div key={g} className="flex max-w-2xl flex-col gap-4">{group.texts.map((text, i) => <p key={i} data-reveal="" className="type-body text-pretty text-bone/75 md:text-lg md:leading-relaxed">{text}</p>)}</div>
      ))}
    </div>
  )
}

function PriceSection({ service, section, id }: { service: Service; section: Section; id: string }) {
  const t = ui.pl
  const price = servicePrice("pl", service.slug)
  const linkText = section.blocks.find((block) => block.type === "text")?.text
  return (
    <section aria-labelledby={id} className="border-t border-line-wine bg-wine-deep/35">
      <div className="shell-wide section-md grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-6"><p className="eyebrow">{t.priceLabel}</p><h2 id={id} data-reveal="" className="type-h2 text-balance">{section.heading}</h2></div>
        <div data-reveal="" className="flex min-w-0 flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:items-end lg:text-right">
          <p className={price ? "type-h1 [font-stretch:108%] [font-variation-settings:'wdth'_108]" : "type-h2 text-balance text-bone/90"}>{price ?? t.individualQuote}</p>
          {linkText && <Link href={routes.pl.pricing} className="group flex w-fit items-center gap-4 text-bone"><span className="type-label link-draw">{linkText}</span><ArrowRight className="arrow-shift size-5" aria-hidden="true" /></Link>}
        </div>
      </div>
    </section>
  )
}

function SummarySection({ section, id }: { section: Section; id: string }) {
  const [first, ...rest] = section.blocks.map((block) => block.text)
  return (
    <section aria-labelledby={id} className="section-lg border-t border-line">
      <div className="shell-wide flex flex-col gap-10">
        <h2 id={id} className="eyebrow">{section.heading}</h2>
        <p data-reveal="" className="type-h2 max-w-4xl text-balance">{first}</p>
        {rest.length > 0 && <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:ml-[33%]">{rest.map((text, i) => <p key={i} data-reveal="" style={{ "--d": i + 1 } as React.CSSProperties} className="type-body text-pretty text-bone/75 md:text-lg md:leading-relaxed">{text}</p>)}</div>}
      </div>
    </section>
  )
}

function ServiceRelated({ service }: { service: Service }) {
  const t = ui.pl
  const i = service.index - 1
  const neighbours = [services[(i - 1 + services.length) % services.length], services[(i + 1) % services.length]]
  return (
    <section aria-labelledby="related-title" className="section-lg border-t border-line">
      <div className="shell-wide flex flex-col gap-10">
        <div className="flex items-end justify-between gap-6">
          <h2 id="related-title" className="eyebrow">{t.related}</h2>
          <Link href={routes.pl.services} className="group type-label flex items-center gap-3 text-bone"><span className="link-draw">{t.allServices}</span><ArrowRight className="arrow-shift size-4" aria-hidden="true" /></Link>
        </div>
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {neighbours.map((item) => (
            <li key={item.slug} className="bg-background">
              <Link href={`/${item.slug}`} className="group relative flex min-h-80 flex-col justify-between gap-10 overflow-hidden p-6 lg:min-h-[28rem] lg:p-8">
                <span aria-hidden="true" className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-45 group-focus-visible:opacity-45"><Photo id={item.hero} sizes="(min-width: 768px) 50vw, 100vw" className="scale-105 transition-transform duration-[1.4s] group-hover:scale-100" /></span>
                <span className="relative flex items-center justify-between"><span className="type-label text-ash">{formatIndex(item.index)} - {item.category === "myjnia" ? "Myjnia" : "Detailing"}</span><ArrowRight className="arrow-shift size-5 text-bone" aria-hidden="true" /></span>
                <span className="type-h2 relative max-w-[14ch] text-balance">{item.navTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function BookingCta() {
  const src = sources.pl
  const t = ui.pl
  return (
    <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-t border-line">
      <div className="absolute inset-0 -z-10">
        <Photo id="p06" sizes="100vw" className="opacity-35" position="50% 60%" />
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
  )
}
