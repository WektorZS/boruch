import { Fragment } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
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
      <ServiceFaq service={service} />
      <ServiceRelated service={service} />
    </SiteShell>
  )
}

function ServiceHero({ service }: { service: Service }) {
  const t = ui.pl
  const price = servicePrice("pl", service.slug)
  const group = serviceGroupTitle("pl", service.slug)
  const art = serviceArtDirection[service.slug]

  return (
    <section aria-labelledby="service-title" className="bg-[#080809]">
      <div className="shell-wide service-cover">
        <div className="min-w-0">
        <p className="eyebrow mb-7">{group}</p>
        <h1 id="service-title" className="service-cover-title">{service.navTitle}</h1>
          <div className="enter-fade mt-6 flex max-w-xl flex-col gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="type-label text-ash">{service.source.headingSub}</p>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/65 first-letter:uppercase">{service.source.tagline}</p>
          </div>
          <div className="mt-8 border-t border-white/15 pt-5">
            <p className="text-xs text-white/60">{t.priceLabel}</p>
            <p className="mt-2 text-xl font-medium leading-relaxed text-white">{price ?? t.individualQuote}</p>
            <div className="mt-5 flex flex-wrap items-center gap-6"><a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">{t.book}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a><a href="#service-process" className="editorial-link">{t.process}<ArrowRight className="size-4" aria-hidden="true" /></a></div>
          </div>
        </div>
        <figure className="service-cover-visual editorial-photo enter-unmask"><Photo id={service.hero} priority sizes="(min-width: 1600px) 888px, (min-width: 1024px) 56vw, (min-width: 640px) 46vw, 92vw" position={art?.heroPosition ?? "50% 56%"} /><figcaption className="absolute bottom-0 right-0 bg-[#080809] pl-6 pt-3 text-[.65rem] uppercase tracking-[.16em] text-white/65">BORUCH MYJNIA / {group}</figcaption></figure>
      </div>
    </section>
  )
}
function ServiceIntro({ service }: { service: Service }) {
  const [first, ...rest] = service.source.intro
  return (
    <section aria-label={service.navTitle} className="section-lg border-b border-white/10 bg-[#0a0a0b]">
      <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-2"><p className="eyebrow">{service.navTitle}</p></div>
        <div className="min-w-0 lg:col-span-10">
          <p data-reveal="" className="max-w-5xl font-display text-[clamp(1.5rem,2.5vw,2.5rem)] font-normal leading-[1.5] text-bone/90">{first}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-10">
            {rest.map((para, i) => <p key={i} data-reveal="" style={{ "--d": i + 1 } as React.CSSProperties} className="type-body text-pretty text-bone/70">{para}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceProcess({ service }: { service: Service }) {
  const t = ui.pl
  const { steps, processTitle } = service.source
  if (steps.length === 0) return null

  return (
    <section id="service-process" aria-labelledby="process-title" className="scroll-mt-24 bg-[#101011]">
      <div className="shell-wide section-lg">
        <div className="service-process-layout">
          <div className="service-process-image">
            <p className="eyebrow">{t.process}</p>
            <h2 id="process-title" data-reveal="" className="editorial-display mt-5">{processTitle ?? t.process}</h2>
            <figure data-reveal="mask" className="relative mt-8 aspect-[4/5] overflow-hidden"><Photo id={service.frames[0]} sizes="(min-width: 1600px) 520px, (min-width: 640px) 42vw, 92vw" position={serviceArtDirection[service.slug]?.detailPosition} /></figure>
          </div>
          <ol className="service-process-steps">
            {steps.map((step, index) => <li key={step.title} data-reveal=""><span className="type-index pt-1 text-sm text-brand">{formatIndex(index + 1)}</span><div><h3>{step.title}</h3><div className="mt-4 grid gap-4">{step.body.map((paragraph, i) => <p key={i} className="type-body text-white/65">{paragraph}</p>)}</div></div></li>)}
          </ol>
        </div>
      </div>
      <div data-reveal="mask" className="relative aspect-[4/3] overflow-hidden sm:aspect-[21/8]"><Photo id={service.frames[1]} sizes="100vw" /></div>
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
          <h3 className={cn("text-pretty font-display font-semibold leading-[1.3] md:col-span-4", compact ? "text-lg" : "text-xl lg:text-2xl")}>{step.title}</h3>
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
        <div className="lg:col-span-5"><h2 id={id} data-reveal="" className="editorial-display max-w-full lg:sticky lg:top-[calc(var(--header-h)+2rem)]">{section.heading}</h2></div>
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
        <div className="flex flex-col gap-6 lg:col-span-6"><p className="eyebrow">{t.priceLabel}</p><h2 id={id} data-reveal="" className="editorial-display">Cena usługi: {service.navTitle}</h2></div>
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

function ServiceFaq({ service }: { service: Service }) {
  const price = servicePrice("pl", service.slug)
  const questions = [
    ["Jak zarezerwować termin?", "Wybierz termin na naszym profilu Booksy albo zadzwoń pod numer +48 534 095 265. Jeśli nie wiesz, jaki zakres wybrać, opisz nam stan samochodu."],
    ["Od czego zależy cena?", price ? `Cena początkowa tej usługi to ${price}. Ostateczna kwota zależy od wariantu, wielkości auta i zabrudzenia. Szczegóły oraz dopłaty znajdziesz w cenniku.` : "Tę usługę wyceniamy indywidualnie. Kwota zależy od stanu samochodu i zakresu prac. Skontaktuj się z nami, aby omówić swój samochód."],
    ["Ile czasu trzeba przeznaczyć na usługę?", "Czas zależy od zakresu prac oraz stanu samochodu. Szacunkowe czasy wybranych usług są podane w cenniku. Przy rezerwacji ustalimy szczegóły pozostawienia i odbioru auta."],
    ["Gdzie zostawić samochód?", "Znajdziesz nas na poziomie -2 parkingu podziemnego PAZIM przy placu Rodła 8 w Szczecinie. Wjedź na parking i kieruj się do Boruch Myjnia."],
  ]
  return <section aria-labelledby="service-faq-title" className="section-lg bg-[#080809]"><div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-20"><div className="lg:col-span-5"><p className="eyebrow">Przed wizytą</p><h2 id="service-faq-title" className="editorial-display mt-6">Dobrze wiedzieć.</h2></div><div className="border-t border-white/15 lg:col-span-7">{questions.map(([question, answer]) => <details key={question} className="group border-b border-white/15"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-medium [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="size-4 shrink-0 text-brand transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-8 text-sm leading-relaxed text-white/65">{answer}</p></details>)}</div></div></section>
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
                <span aria-hidden="true" className="absolute inset-0 -z-0 opacity-90 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"><Photo id={item.hero} sizes="(min-width: 1600px) 730px, (min-width: 768px) 46vw, 92vw" className="scale-[1.03] transition-transform duration-700 group-hover:scale-100 group-focus-visible:scale-100" /><span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10" /></span>
                <span className="relative flex items-center justify-between"><span className="type-label text-ash">{item.category === "myjnia" ? "Myjnia" : "Detailing"}</span><ArrowRight className="arrow-shift size-5 text-bone" aria-hidden="true" /></span>
                <span className="relative max-w-full text-pretty font-display text-xl font-semibold leading-[1.3] sm:text-2xl">{item.navTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

