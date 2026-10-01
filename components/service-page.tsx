import { Fragment } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo, photoSrc } from "./photo"
import { contact, localeOrder, routes, sources, ui, type Locale } from "@/lib/content"
import { formatIndex, getService, serviceGroupTitle, servicePrice, type Service, type ServiceSlug } from "@/lib/content/services"
import type { ServiceBlock, ServiceSection as Section, ServiceStep } from "@/lib/content/types"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

type ServiceFamily = "wash" | "interior" | "finish"
const interiorServices: ServiceSlug[] = ["czyszczenie-wnetrza", "pranie-tapicerki", "czyszczenie-skor"]
function serviceFamily(service: Service): ServiceFamily {
  return interiorServices.includes(service.slug) ? "interior" : service.category === "myjnia" ? "wash" : "finish"
}

// Presentation only. Offer copy, prices and routing remain in their canonical sources.
const serviceArtDirection: Partial<Record<ServiceSlug, { heroPosition: string; detailPosition: string }>> = {
  "mycie-zewnatrz": { heroPosition: "50% 47%", detailPosition: "55% 52%" },
  "czyszczenie-wnetrza": { heroPosition: "53% 43%", detailPosition: "50% 47%" },
  "pranie-tapicerki": { heroPosition: "50% 50%", detailPosition: "50% 47%" },
  "czyszczenie-skor": { heroPosition: "50% 43%", detailPosition: "50% 50%" },
  "komplet": { heroPosition: "50% 54%", detailPosition: "50% 46%" },
  "folia-ppf": { heroPosition: "50% 56%", detailPosition: "50% 53%" },
  "powloka-ceramiczna": { heroPosition: "50% 60%", detailPosition: "50% 58%" },
  "zmiana-koloru-dechroming": { heroPosition: "50% 57%", detailPosition: "50% 58%" },
}

const relatedServices: Record<ServiceSlug, [ServiceSlug, ServiceSlug]> = {
  "mycie-zewnatrz": ["komplet", "woskowanie"],
  "czyszczenie-wnetrza": ["komplet", "pranie-tapicerki"],
  komplet: ["mycie-zewnatrz", "czyszczenie-wnetrza"],
  "pranie-tapicerki": ["czyszczenie-wnetrza", "czyszczenie-skor"],
  "czyszczenie-skor": ["czyszczenie-wnetrza", "pranie-tapicerki"],
  woskowanie: ["mycie-zewnatrz", "powloka-ceramiczna"],
  polerowanie: ["korekta-lakieru", "powloka-ceramiczna"],
  "korekta-lakieru": ["polerowanie", "powloka-ceramiczna"],
  "powloka-ceramiczna": ["korekta-lakieru", "folia-ppf"],
  "folia-ppf": ["powloka-ceramiczna", "zmiana-koloru-dechroming"],
  "przyciemnianie-szyb-i-lamp": ["folia-ppf", "zmiana-koloru-dechroming"],
  "zmiana-koloru-dechroming": ["folia-ppf", "przyciemnianie-szyb-i-lamp"],
}

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const { source } = getService(slug)
  return {
    title: { absolute: source.meta.title },
    description: source.meta.description,
    alternates: { canonical: `/${slug}/`, languages: {} },
    openGraph: {
      title: source.meta.title,
      description: source.meta.description,
      url: `${siteConfig.sourceUrl}/${slug}/`,
      images: [{ url: photoSrc(getService(slug).hero, 1600) }],
    },
    twitter: { card: "summary_large_image", title: source.meta.title, description: source.meta.description, images: [photoSrc(getService(slug).hero, 1600)] },
  }
}
export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug)
  const family = serviceFamily(service)
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
    url: `${siteConfig.sourceUrl}/${slug}/`,
    areaServed: siteConfig.city,
    provider: { "@id": `${siteConfig.sourceUrl}/#business` },
    ...(price ? { offers: { "@type": "Offer", priceCurrency: "PLN", description: price, url: contact.bookingUrl } } : {}),
  }

  return (
    <SiteShell locale="pl" page="services" alternates={alternates} breadcrumbs={[{ name: ui.pl.nav.home, path: "/" }, { name: ui.pl.nav.services, path: "/uslugi" }, { name: service.navTitle, path: `/${slug}` }]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceHero service={service} />
      <ServiceIntro service={service} />
      <ServiceProcess service={service} />
      {sections.map((section, i) => (
        <Fragment key={section.heading}>
          <ServiceSection service={service} section={section} id={`section-${i + 1}`} />
          {i === breakAfter && (
            <div className="shell-wide grid py-8 lg:grid-cols-12 lg:py-12">
              <figure className={family === "interior" ? "lg:col-span-8" : family === "wash" ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-12"}>
                <div data-reveal="mask" className={cn("frame editorial-photo aspect-[4/3]", family === "interior" ? "sm:aspect-[3/2]" : "sm:aspect-[16/9]")}>
                  <Photo id={service.frames[2]} sizes={family === "finish" ? "(min-width: 1600px) 1480px, 92vw" : family === "interior" ? "(min-width: 1600px) 985px, (min-width: 1024px) 61vw, 92vw" : "(min-width: 1600px) 1230px, (min-width: 1024px) 77vw, 92vw"} />
                </div>
                <figcaption className="mt-4 flex flex-wrap justify-between gap-3 text-xs leading-relaxed text-white/55"><span>{service.navTitle}</span><span>Boruch Myjnia / PAZIM</span></figcaption>
              </figure>
            </div>
          )}
        </Fragment>
      ))}
      <ServiceRelated service={service} />
    </SiteShell>
  )
}

function ServiceHero({ service }: { service: Service }) {
  const t = ui.pl
  const price = servicePrice("pl", service.slug)
  const group = serviceGroupTitle("pl", service.slug)
  const family = serviceFamily(service)
  const art = serviceArtDirection[service.slug]

  return (
    <section aria-labelledby="service-title" className={cn("page-hero relative isolate flex items-end overflow-hidden border-b border-white/10 pt-(--header-h)", `service-hero-${family}`)}>
      <div className={cn("enter-unmask absolute inset-0", family === "interior" && "lg:left-1/3")}><Photo id={service.hero} priority sizes={family === "interior" ? "(min-width: 1024px) 67vw, 100vw" : "100vw"} position={art?.heroPosition ?? "50% 56%"} /></div>
      <div aria-hidden="true" className={family === "interior" ? "absolute inset-0 bg-[linear-gradient(90deg,#080809_0%,rgba(8,8,9,.8)_32%,rgba(8,8,9,.2)_74%,rgba(8,8,9,.12)_100%)]" : "absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.65)_0%,rgba(6,6,7,.3)_58%,rgba(6,6,7,.08)_100%)]"} />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
      <div className="shell-wide relative z-10 grid gap-9 pb-14 lg:grid-cols-12 lg:items-end lg:pb-16">
        <div className="lg:col-span-9">
        <p className="eyebrow mb-7">{group}</p>
        <h1 id="service-title" className="page-hero-title type-h1 max-w-4xl">{service.navTitle}</h1>
          <div className="enter-fade mt-7 flex max-w-2xl flex-col gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="type-label text-ash">{service.source.headingSub}</p>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/65 first-letter:uppercase">{service.source.tagline}</p>
          </div>
        </div>
        <div className="enter-fade border-l border-brand pl-6 lg:col-span-3 lg:col-start-10" style={{ "--i": 3 } as React.CSSProperties}>
          <p className="type-label text-brand">{t.priceLabel}</p>
          <p className="mt-4 font-display text-[clamp(1.25rem,2vw,1.7rem)] font-bold leading-relaxed tracking-normal text-white">{price ?? t.individualQuote}</p>
          <div className="mt-6 flex flex-col gap-3"><a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">{t.book}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a><Link prefetch={false} href={routes.pl.pricing} className="btn btn-outline">{t.pricing}</Link></div>
        </div>
      </div>
    </section>
  )
}
function ServiceIntro({ service }: { service: Service }) {
  const [first, ...rest] = service.source.intro
  const family = serviceFamily(service)
  const art = serviceArtDirection[service.slug]
  const finish = family === "finish"
  return (
    <section aria-label={service.navTitle} className="section-lg border-b border-white/10 bg-[#0a0a0b]">
      <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className={cn("flex min-w-0 flex-col gap-7", family === "interior" ? "lg:col-span-6 lg:col-start-7 lg:order-2 lg:py-8" : finish ? "lg:col-span-5 lg:col-start-8 lg:order-2 lg:py-8" : "lg:col-span-7 lg:py-8")}>
          <p className="eyebrow">{service.navTitle}</p>
          <p data-reveal="" className="type-lead max-w-3xl text-pretty text-bone/90">{first}</p>
          <div className="flex max-w-2xl flex-col gap-5">
            {rest.map((para, i) => <p key={i} data-reveal="" style={{ "--d": i + 1 } as React.CSSProperties} className="type-body text-pretty text-bone/70">{para}</p>)}
          </div>
        </div>
        <figure className={cn("min-w-0", family === "interior" ? "lg:col-span-5 lg:order-1" : finish ? "lg:col-span-6 lg:order-1" : "lg:col-span-4 lg:col-start-9")}>
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div data-reveal="mask" className={cn("frame editorial-photo aspect-[4/3]", family === "interior" ? "sm:aspect-[4/5]" : finish ? "lg:aspect-[3/4]" : "lg:aspect-[4/5]")}><Photo id={service.frames[0]} sizes={finish ? "(min-width: 1600px) 720px, (min-width: 1024px) 46vw, 92vw" : family === "interior" ? "(min-width: 1600px) 600px, (min-width: 1024px) 38vw, 92vw" : "(min-width: 1600px) 480px, (min-width: 1024px) 30vw, 92vw"} position={art?.detailPosition} /></div>
            <figcaption className="mt-4 flex flex-wrap justify-between gap-3 text-xs leading-relaxed text-white/55"><span>{service.navTitle}</span><span>Boruch Myjnia</span></figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}

function ServiceProcess({ service }: { service: Service }) {
  const t = ui.pl
  const { steps, processTitle } = service.source
  if (steps.length === 0) return null
  const family = serviceFamily(service)
  const split = family !== "wash" && steps.length > 3 ? Math.ceil(steps.length / 2) : steps.length
  const before = steps.slice(0, split)
  const after = steps.slice(split)

  return (
    <section aria-labelledby="process-title" className="border-b border-white/10 bg-[#101011]">
      <div className="shell-wide section-lg">
        <div className="mb-12 grid gap-7 lg:mb-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3"><p className="eyebrow">{t.process}</p></div>
          <div className="lg:col-span-8 lg:col-start-5"><h2 id="process-title" data-reveal="" className="type-h2 max-w-3xl text-pretty">{processTitle ?? t.process}</h2></div>
        </div>
        <StepList steps={before} stepLabel={t.step} />
      </div>
      {family === "wash" && <div className="shell-wide pb-12 sm:pb-16"><div data-reveal="mask" className="frame editorial-photo aspect-[4/3] sm:aspect-[16/8]"><Photo id={service.frames[1]} sizes="(min-width: 1600px) 1480px, 92vw" /></div></div>}
      {after.length > 0 && (
        <>
          <div className={family === "interior" ? "shell-wide" : ""}><div data-reveal="mask" className={cn("frame editorial-photo aspect-[4/3] sm:aspect-[16/9]", family === "interior" ? "lg:aspect-[16/8]" : "lg:aspect-[5/2]")}><Photo id={service.frames[1]} sizes={family === "interior" ? "(min-width: 1600px) 1480px, 92vw" : "100vw"} /></div></div>
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
        <li key={step.title} data-reveal="" style={{ "--d": i % 3 } as React.CSSProperties} className={cn("group grid gap-4 border-t border-line transition-colors hover:border-line-strong md:grid-cols-12 md:gap-8", compact ? "py-7" : "py-7 lg:py-8")}>
          <p className="flex items-baseline gap-3 md:col-span-2 md:flex-col md:gap-2">
            <span className="type-index text-xl text-white/65 transition-colors group-hover:text-highlight lg:text-2xl">{formatIndex(start + i)}</span>
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
    <section aria-labelledby={id} className="section-md border-b border-white/10 bg-[#0a0a0b]">
      <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5"><h2 id={id} data-reveal="" className="type-h2 max-w-full text-balance lg:sticky lg:top-[calc(var(--header-h)+2rem)]">{section.heading}</h2></div>
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
          {group.texts.map((text, i) => <li key={i} data-reveal="" style={{ "--d": i % 4 } as React.CSSProperties} className="group flex items-start gap-5 border-t border-line py-5 transition-colors hover:bg-ink-warm/60 md:px-2"><span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-brand transition-transform group-hover:scale-150" /><span className="text-pretty text-base leading-relaxed text-bone md:text-lg">{text}</span></li>)}
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
    <section aria-labelledby={id} className="border-b border-white/10 bg-[#101011]">
      <div className="shell-wide section-md grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-6"><p className="eyebrow">{t.priceLabel}</p><h2 id={id} data-reveal="" className="type-h2 text-pretty">Cena usługi: {service.navTitle}</h2></div>
        <div data-reveal="" className="flex min-w-0 flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:items-end lg:text-right">
          <p className={price ? "font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-relaxed tracking-normal" : "font-display text-[clamp(1.5rem,2.4vw,2.3rem)] font-bold leading-relaxed text-bone/90"}>{price ?? t.individualQuote}</p>
          {linkText && <Link prefetch={false} href={routes.pl.pricing} className="group flex w-fit items-center gap-4 text-bone"><span className="type-label link-draw">{linkText}</span><ArrowRight className="arrow-shift size-5" aria-hidden="true" /></Link>}
        </div>
      </div>
    </section>
  )
}

function SummarySection({ section, id }: { section: Section; id: string }) {
  const [first, ...rest] = section.blocks.map((block) => block.text)
  return (
    <section aria-labelledby={id} className="section-lg border-b border-white/10 bg-[#101011]">
      <div className="shell-wide flex flex-col gap-10">
        <h2 id={id} className="eyebrow">{section.heading}</h2>
        <p data-reveal="" className="type-lead max-w-4xl text-pretty [overflow-wrap:anywhere]">{first}</p>
        {rest.length > 0 && <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:ml-[33%]">{rest.map((text, i) => <p key={i} data-reveal="" style={{ "--d": i + 1 } as React.CSSProperties} className="type-body text-pretty text-bone/75 md:text-lg md:leading-relaxed">{text}</p>)}</div>}
      </div>
    </section>
  )
}

function ServiceRelated({ service }: { service: Service }) {
  const t = ui.pl
  const neighbours = relatedServices[service.slug].map(getService)
  return (
    <section aria-labelledby="related-title" className="section-lg border-b border-white/10 bg-[#0a0a0b]">
      <div className="shell-wide flex flex-col gap-10">
        <div className="flex items-end justify-between gap-6">
          <h2 id="related-title" className="eyebrow">{t.related}</h2>
          <Link prefetch={false} href={routes.pl.services} className="group type-label flex items-center gap-3 text-bone"><span className="link-draw">{t.allServices}</span><ArrowRight className="arrow-shift size-4" aria-hidden="true" /></Link>
        </div>
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {neighbours.map((item) => (
            <li key={item.slug} className="bg-background">
              <Link prefetch={false} href={`/${item.slug}`} className="group relative flex min-h-56 flex-col justify-between gap-10 overflow-hidden p-6 lg:min-h-72 lg:p-8">
                <span aria-hidden="true" className="absolute inset-0 -z-0 opacity-65 transition-opacity duration-700 group-hover:opacity-85 group-focus-visible:opacity-85"><Photo id={item.hero} sizes="(min-width: 1600px) 730px, (min-width: 768px) 46vw, 92vw" className="scale-[1.03] transition-transform duration-1000 group-hover:scale-100 group-focus-visible:scale-100" /><span className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10" /></span>
                <span className="relative flex items-center justify-between"><span className="type-label text-ash">{item.category === "myjnia" ? "Myjnia" : "Detailing"}</span><ArrowRight className="arrow-shift size-5 text-bone" aria-hidden="true" /></span>
                <span className="type-h3 relative max-w-full text-balance">{item.navTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

