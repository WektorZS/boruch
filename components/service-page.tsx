import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo, photoSrc } from "./photo"
import { contact, localeOrder, routes, ui, type Locale } from "@/lib/content"
import { formatIndex, getService, serviceGroupTitle, servicePrice, type Service, type ServiceSlug } from "@/lib/content/services"
import type { ServiceBlock, ServiceSection as Section, ServiceStep } from "@/lib/content/types"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { photos, type PhotoId } from "@/lib/photos"

// Short introductions support the full technical scope below. Prices stay canonical.
const servicePresentation: Record<ServiceSlug, { intro: string; detail: string; headings: string[]; heroPosition?: string; detailPhoto?: PhotoId }> = {
  "mycie-zewnatrz": {
    intro: "Ręczne mycie nadwozia, felg i szyb z dokładnym osuszeniem auta.",
    detail: "Środki i sposób mycia dobieramy do powierzchni oraz istniejącego zabezpieczenia lakieru. Dodatkowe woskowanie możesz zamówić osobno.",
    headings: ["Jak dbamy o nadwozie?", "Efekt mycia", "Cena"], heroPosition: "50% 47%", detailPhoto: "p01",
  },
  "czyszczenie-wnetrza": {
    intro: "Odkurzanie kabiny i bagażnika, czyszczenie kokpitu, plastików oraz szyb.",
    detail: "Zajmujemy się także trudno dostępnymi miejscami. Pranie tapicerki lub pielęgnację skór można dobrać do podstawowego zakresu.",
    headings: ["Co zyskujesz?", "Cena"], heroPosition: "53% 43%", detailPhoto: "p29",
  },
  komplet: {
    intro: "Mycie nadwozia i czyszczenie wnętrza podczas jednej wizyty.",
    detail: "Komplet łączy dwa podstawowe zakresy myjni w niższej cenie niż zamawiane osobno. Pranie tapicerki i dodatkowe zabezpieczenie lakieru są opcjonalnym rozszerzeniem.",
    headings: ["Co obejmuje Komplet?", "Kiedy wybrać pakiet?", "Cena"], heroPosition: "50% 54%", detailPhoto: "p67",
  },
  "pranie-tapicerki": {
    intro: "Czyszczenie materiałowej tapicerki, które sięga głębiej niż odkurzanie.",
    detail: "Odkurzamy, rozpuszczamy zabrudzenia i płuczemy materiał metodą ekstrakcyjną. Zakres obejmujący podsufitkę, dywaniki lub inne elementy ustalamy przy rezerwacji.",
    headings: ["Zakres prania", "Co daje czyszczenie?", "Cena"], heroPosition: "50% 50%", detailPhoto: "p45",
  },
  "czyszczenie-skor": {
    intro: "Czyszczenie i zabezpieczenie skórzanej tapicerki bez tłustego wykończenia.",
    detail: "Usuwamy zabrudzenia, a następnie impregnujemy skórę. Preparaty i sposób pracy dobieramy do rodzaju oraz stanu tapicerki.",
    headings: ["Zakres pielęgnacji", "Dlaczego warto?", "Cena"], heroPosition: "50% 43%", detailPhoto: "p31",
  },
  woskowanie: {
    intro: "Ręczna aplikacja wosku na oczyszczony i przygotowany lakier.",
    detail: "Wosk nadaje połysk i właściwości hydrofobowe. Dobieramy go do oczekiwanego efektu oraz sposobu użytkowania samochodu.",
    headings: ["Co daje wosk?", "Przygotowanie i aplikacja", "Cena"], detailPhoto: "p52",
  },
  polerowanie: {
    intro: "Odświeżenie lakieru przez usunięcie zmatowień i drobnych defektów.",
    detail: "Przed pracą oceniamy powierzchnię i mierzymy grubość lakieru. Metodę oraz zakres polerowania dobieramy do jego stanu.",
    headings: ["Efekt polerowania", "Kiedy warto?", "Cena", "Jak pracujemy"], detailPhoto: "p03",
  },
  "korekta-lakieru": {
    intro: "Praca nad rysami i defektami, które odbierają lakierowi połysk.",
    detail: "Zakres korekty ustalamy po inspekcji i pomiarze lakieru. Może być jedno- lub wieloetapowy, zależnie od stanu powierzchni i oczekiwanego efektu.",
    headings: ["Efekt korekty", "Kiedy warto?", "Cena", "Jak pracujemy"], detailPhoto: "p24",
  },
  "powloka-ceramiczna": {
    intro: "Zabezpieczenie przygotowanego lakieru powłoką ceramiczną.",
    detail: "Powłoka ułatwia utrzymanie czystości i podkreśla połysk. Dobór wariantu, przygotowanie lakieru oraz późniejsza pielęgnacja są częścią ustalanego zakresu.",
    headings: ["Warianty powłoki", "Co daje ceramika?", "Cena", "Jak pracujemy"], heroPosition: "50% 60%", detailPhoto: "p39",
  },
  "folia-ppf": {
    intro: "Folia ochronna na wybrane elementy nadwozia lub całe auto.",
    detail: "PPF tworzy dodatkową warstwę chroniącą lakier. Dobieramy zakres oklejania, przygotowujemy powierzchnię i kontrolujemy dopasowanie folii na krawędziach.",
    headings: ["Zakres oklejania", "Jak pracujemy", "Cena", "Co daje folia PPF?"], heroPosition: "50% 56%",
  },
  "przyciemnianie-szyb-i-lamp": {
    intro: "Dobór i aplikacja folii do szyb lub lamp samochodu.",
    detail: "Stopień przyciemnienia oraz zakres prac ustalamy przed montażem. Poniżej znajdziesz osobno proces dla szyb i lamp.",
    headings: ["Przyciemnianie lamp", "Folia na szybach", "Folia na lampach", "Cena", "Jak pracujemy"],
  },
  "zmiana-koloru-dechroming": {
    intro: "Zmiana wyglądu nadwozia bez ponownego lakierowania.",
    detail: "Możesz wybrać oklejenie auta folią kolorową lub zmianę wykończenia chromowanych detali. Kolor, fakturę i zakres ustalamy podczas konsultacji.",
    headings: ["Zmiana koloru", "Dechroming", "Cena", "Jak pracujemy"], heroPosition: "50% 57%", detailPhoto: "p20",
  },
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

function servicePricingHref(slug: ServiceSlug) {
  const anchor = ["mycie-zewnatrz", "czyszczenie-wnetrza", "komplet"].includes(slug) ? "mycie" : "detailing"
  return `${routes.pl.pricing}#${anchor}`
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
  const { sections } = service.source
  const presentation = servicePresentation[slug]
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
      {presentation.detailPhoto && <ServiceDetail photo={presentation.detailPhoto} />}
      {sections.map((section, i) => section.kind === "summary" || section.kind === "price" ? null : (
        <ServiceSection key={section.heading} section={section} heading={presentation.headings[i] ?? section.heading} id={`section-${i + 1}`} />
      ))}
      <PriceSection service={service} id="service-price" />
      <ServiceFaq service={service} />
      <ServiceRelated service={service} />
    </SiteShell>
  )
}

function ServiceHero({ service }: { service: Service }) {
  const t = ui.pl
  const price = servicePrice("pl", service.slug)
  const group = serviceGroupTitle("pl", service.slug)
  const presentation = servicePresentation[service.slug]

  return (
    <section aria-labelledby="service-title" className="bg-[#080809]">
      <div className="shell-wide service-cover">
        <div className="min-w-0">
          <p className="eyebrow mb-7">{group}</p>
          <h1 id="service-title" className="service-cover-title">{service.navTitle}</h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70">{presentation.intro}</p>
          <div className="mt-8 border-t border-white/15 pt-5">
            <p className="text-xs text-white/60">{t.priceLabel}</p>
            <p className="mt-2 text-xl font-medium leading-relaxed text-white">{price ?? t.individualQuote}</p>
            <div className="mt-5 flex flex-wrap items-center gap-6"><a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">{t.book}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a><Link prefetch={false} href={servicePricingHref(service.slug)} className="editorial-link">Ceny i warianty<ArrowRight className="size-4" aria-hidden="true" /></Link></div>
          </div>
        </div>
        <figure className="service-cover-visual editorial-photo enter-unmask"><Photo id={service.hero} priority sizes="(min-width: 1600px) 888px, (min-width: 1024px) 56vw, (min-width: 640px) 46vw, 92vw" position={presentation.heroPosition ?? "50% 56%"} /><figcaption className="absolute bottom-0 right-0 bg-[#080809] pl-6 pt-3 text-[.65rem] uppercase tracking-[.16em] text-white/65">BORUCH MYJNIA / {group}</figcaption></figure>
      </div>
    </section>
  )
}
function ServiceIntro({ service }: { service: Service }) {
  const { detail } = servicePresentation[service.slug]
  return (
    <section aria-label={service.navTitle} className="section-lg border-b border-white/10 bg-[#0a0a0b]">
      <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4"><p className="eyebrow">Zakres dopasowany do auta</p></div>
        <div className="min-w-0 lg:col-span-8">
          <p data-reveal="" className="max-w-3xl text-pretty font-display text-[clamp(1.25rem,1.7vw,1.75rem)] font-normal leading-relaxed text-bone/85">{detail}</p>
        </div>
      </div>
    </section>
  )
}

function ServiceProcess({ service }: { service: Service }) {
  const t = ui.pl
  const { steps } = service.source
  if (steps.length === 0) return null

  return (
    <section id="service-process" aria-labelledby="process-title" className="scroll-mt-24 bg-[#101011]">
      <div className="shell-wide section-lg">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-4">
            <p className="eyebrow">{t.process}</p>
            <h2 id="process-title" data-reveal="" className="editorial-display mt-5">{service.slug === "przyciemnianie-szyb-i-lamp" ? "Przyciemnianie szyb." : "Jak przebiega usługa?"}</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">Zakres prac ustalamy przed rozpoczęciem. Opcjonalne zabiegi są oznaczone przy poszczególnych etapach.</p>
          </div>
          <ol className="min-w-0 border-b border-white/15 lg:col-span-8">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-white/15">
                <details className="group" open={index === 0}>
                  <summary className="grid cursor-pointer list-none grid-cols-[2rem_minmax(0,1fr)_1rem] items-start gap-4 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="type-index pt-1 text-xs text-brand" aria-hidden="true">{formatIndex(index + 1)}</span>
                    <h3 className="text-pretty font-display text-lg font-medium leading-snug text-white/90 sm:text-xl">{step.title}</h3>
                    <ChevronDown className="mt-1 size-4 text-brand transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="grid gap-4 pb-6 pl-12 sm:pr-8">{step.body.map((paragraph, i) => <p key={i} className="type-body text-white/65">{paragraph}</p>)}</div>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </div>
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

function ServiceDetail({ photo }: { photo: PhotoId }) {
  return (
    <div className="border-b border-white/10 bg-[#0a0a0b]">
      <figure className="shell-wide py-10 lg:py-14">
        <div className="editorial-photo relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
          <Photo id={photo} sizes="(min-width: 1600px) 1480px, 92vw" position="50% 56%" />
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs leading-relaxed text-white/60">
          <span>{photos[photo].alt}</span>
          <Link prefetch={false} href={routes.pl.gallery} className="group inline-flex min-h-11 items-center gap-3 font-medium text-white/80 hover:text-white">Zobacz realizacje<ArrowRight className="arrow-shift size-4 text-brand" aria-hidden="true" /></Link>
        </figcaption>
      </figure>
    </div>
  )
}

function ServiceSection({ section, heading, id }: { section: Section; heading: string; id: string }) {
  return (
    <section aria-labelledby={id} className="section-md border-b border-white/10 bg-[#0a0a0b]">
      <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-4"><h2 id={id} data-reveal="" className="editorial-display max-w-full">{heading}</h2></div>
        <div className="min-w-0 lg:col-span-8">{section.kind === "process" && section.steps ? <StepList steps={section.steps} stepLabel={ui.pl.step} compact /> : <Blocks blocks={section.blocks} />}</div>
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
          {group.texts.map((text, i) => <li key={i} className="flex items-start gap-4 border-t border-line py-4"><span aria-hidden="true" className="mt-[0.65em] size-1 shrink-0 bg-brand" /><span className="text-pretty text-base leading-relaxed text-bone/85">{text}</span></li>)}
        </ul>
      ) : (
        <div key={g} className="flex max-w-2xl flex-col gap-4">{group.texts.map((text, i) => <p key={i} className="type-body text-pretty text-bone/70">{text}</p>)}</div>
      ))}
    </div>
  )
}

function PriceSection({ service, id }: { service: Service; id: string }) {
  const t = ui.pl
  const price = servicePrice("pl", service.slug)
  const pricingHref = servicePricingHref(service.slug)
  return (
    <section aria-labelledby={id} className="border-b border-white/10 bg-[#101011]">
      <div className="shell-wide section-md grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-4"><p className="eyebrow">{t.priceLabel}</p><h2 id={id} className="editorial-display">Ceny i warianty.</h2><p className="max-w-sm text-sm leading-relaxed text-white/60">Cena zależy od wielkości auta, jego stanu i wybranego zakresu. Warianty oraz szacunkowy czas znajdziesz w cenniku.</p></div>
        <div className="flex min-w-0 flex-col items-start gap-5 lg:col-span-8">
          <p className={price ? "font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-relaxed tracking-normal" : "font-display text-[clamp(1.5rem,2.4vw,2.3rem)] font-bold leading-relaxed text-bone/90"}>{price ?? t.individualQuote}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link prefetch={false} href={pricingHref} className="editorial-link">Zobacz pełny cennik<ArrowRight className="size-4 text-brand" aria-hidden="true" /></Link>
            <Link prefetch={false} href={`${routes.pl.contact}#wycena`} className="inline-flex min-h-11 items-center text-sm text-white/70 transition-colors hover:text-white">Zapytaj o zakres</Link>
          </div>
          <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-base font-medium tracking-wide text-white/85 transition-colors hover:text-white"><span className="text-xs font-normal text-white/60">Telefon</span>{contact.phone}</a>
        </div>
      </div>
    </section>
  )
}

function ServiceFaq({ service }: { service: Service }) {
  const price = servicePrice("pl", service.slug)
  const questions = [
    ["Jak zarezerwować termin?", "Wybierz termin na naszym profilu Booksy albo zadzwoń pod numer +48 534 095 265. Jeśli nie wiesz, jaki zakres wybrać, opisz nam stan samochodu."],
    ["Od czego zależy cena?", price ? `Usługa kosztuje ${price}. Ostateczna kwota zależy od wariantu, wielkości auta i zabrudzenia. Szczegóły oraz dopłaty znajdziesz w cenniku.` : "Tę usługę wyceniamy indywidualnie. Kwota zależy od stanu samochodu i zakresu prac. Skontaktuj się z nami, aby omówić swój samochód."],
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
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <h2 id="related-title" className="eyebrow">{t.related}</h2>
          <Link prefetch={false} href={routes.pl.services} className="group type-label flex items-center gap-3 text-bone"><span className="link-draw">{t.allServices}</span><ArrowRight className="arrow-shift size-4" aria-hidden="true" /></Link>
        </div>
        <ul className="grid gap-x-12 border-b border-white/15 md:grid-cols-2">
          {neighbours.map((item) => (
            <li key={item.slug} className="border-t border-white/15">
              <Link prefetch={false} href={`/${item.slug}`} className="group grid grid-cols-[minmax(0,1fr)_1.25rem] gap-x-6 gap-y-3 py-7">
                <span className="type-label text-white/55">{item.category === "myjnia" ? "Myjnia" : "Detailing"}</span>
                <ArrowRight className="arrow-shift row-span-3 mt-1 size-5 self-center text-brand" aria-hidden="true" />
                <h3 className="min-w-0 text-pretty font-display text-xl font-medium leading-snug text-white/90 transition-colors group-hover:text-white sm:text-2xl">{item.navTitle}</h3>
                <p className="min-w-0 max-w-xl text-sm leading-relaxed text-white/60">{servicePresentation[item.slug].intro}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

