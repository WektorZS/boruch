import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo, photoSrc, photoSrcSet } from "./photo"
import { ServiceBrowser, type BrowserItem } from "./service-browser"
import { contact, routes, sources, ui, type Locale } from "@/lib/content"
import { formatIndex, serviceGroupTitle, servicePrice, serviceSummary, services } from "@/lib/content/services"
import { photos } from "@/lib/photos"
import { cn } from "@/lib/utils"

export function HomePage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <SiteShell locale={locale} page="home">
      {/* HERO */}
      <HomeHero locale={locale} />

      {/* WPROWADZENIE MARKI */}
      <HomeStatement locale={locale} />

      {/* USŁUGI */}
      <ServicesSection locale={locale} />

      {/* REALIZACJE */}
      <RealizationsSection locale={locale} />

      {/* PEŁNOEKRANOWE ZDJĘCIE I ZALETY */}
      <FeatureBand locale={locale} />

      {/* CENNIK */}
      <section aria-labelledby="packages-title" className="section-lg">
        <div className="shell-wide mb-12 lg:mb-16">
          <SectionHeading id="packages-title" eyebrow={t.pricing} title={src.home.packagesTitle} />
        </div>
        <div className="shell-wide">
          <PricingPackages locale={locale} headingId="packages-title" />
          <Link href={routes[locale].pricing} className="group mt-10 flex w-fit items-center gap-4 text-bone">
            <span className="type-label link-draw">{src.home.moreLink}</span>
            <ArrowRight className="arrow-shift size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ZESPÓŁ */}
      <TeamSection locale={locale} />

      {/* TRZY ZDJĘCIA */}
      <div className="shell-wide grid grid-cols-2 items-end gap-3 py-(--section-md) md:grid-cols-12 md:gap-5">
        <figure data-reveal="mask" className="frame col-span-2 aspect-[4/5] md:col-span-6">
          <Photo id="p21" sizes="(min-width: 768px) 48vw, 100vw" />
        </figure>
        <figure data-reveal="mask" style={{ "--d": 1 } as React.CSSProperties} className="frame aspect-[3/4] md:col-span-3 md:mb-28">
          <Photo id="p62" sizes="(min-width: 768px) 24vw, 50vw" />
        </figure>
        <figure data-reveal="mask" style={{ "--d": 2 } as React.CSSProperties} className="frame aspect-[3/4] md:col-span-3">
          <Photo id="p59" sizes="(min-width: 768px) 24vw, 50vw" />
        </figure>
      </div>

      {/* LOKALIZACJA */}
      <LocationSection locale={locale} />

      {/* REZERWACJA */}
      <BookingSection locale={locale} />
    </SiteShell>
  )
}

function HomeHero({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[0]
  const h1 = locale === "pl" ? "Myjnia ręczna i detailing w Szczecinie" : src.home.sourceH1

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-svh overflow-hidden bg-ink">
      <div className="enter-unmask frame absolute inset-x-0 top-0 h-[58svh] lg:inset-y-0 lg:left-[43%] lg:right-0 lg:h-auto">
        <Photo id="p28" priority sizes="(min-width: 1024px) 64vw, 100vw" position="42% 72%" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/30 via-transparent to-ink lg:bg-linear-to-r lg:from-ink lg:via-ink/15 lg:to-ink/15" />
      </div>
      <div className="shell-wide relative z-10 flex min-h-svh flex-col justify-end pb-8 pt-[50svh] lg:justify-between lg:pb-10 lg:pt-[calc(var(--header-h)+3.5rem)]">
        <div className="enter-fade hidden items-start justify-between lg:flex" style={{ "--i": 1 } as React.CSSProperties}>
          <p className="type-label flex items-center gap-3 text-bone/85">
            <span aria-hidden="true" className="size-1.5 bg-brand" />
            {slide.title} - {slide.sub}
          </p>
          <p className="type-label text-right text-bone/80">{src.address.lines[0]}<br />PAZIM - {src.address.lines[2]}</p>
        </div>
        <div className="flex max-w-[52rem] flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-4">
            <p className="enter-fade type-label text-highlight lg:hidden" style={{ "--i": 1 } as React.CSSProperties}>{slide.title} - {slide.sub}</p>
            <p className="type-display max-w-[10ch] text-balance text-bone">
              <span className="line-mask"><span className="enter-rise block" style={{ "--i": 1 } as React.CSSProperties}>{slide.kicker}</span></span>
            </p>
          </div>
          <div className="grid gap-7 border-t border-line-strong pt-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 id="hero-title" className="enter-fade max-w-md text-pretty text-[1.05rem] leading-relaxed text-bone/80 lg:col-span-6" style={{ "--i": 2 } as React.CSSProperties}>{h1}</h1>
            <div className="enter-fade flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end" style={{ "--i": 3 } as React.CSSProperties}>
              <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                {t.book}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" />
              </a>
              <Link href={routes[locale].services} className="btn btn-outline">{t.nav.services}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-(--gutter) z-10 hidden items-center gap-4 lg:flex">
        <span className="type-label text-ash">{t.scroll}</span>
        <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-line"><span className="scroll-cue absolute inset-0 bg-bone" /></span>
      </div>
    </section>
  )
}

function HomeStatement({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const claims = src.slides.slice(1, 3)
  return (
    <section className="surface-bone section-lg">
      <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <p className="eyebrow text-ink/55">{src.slides[0].title}</p>
          <p data-reveal="" className="type-h1 max-w-[16ch] text-balance text-ink">{src.home.sourceH1}</p>
        </div>
        <figure data-reveal="mask" className="frame aspect-[4/5] w-2/3 max-w-sm justify-self-end sm:w-1/2 lg:col-span-4 lg:col-start-9 lg:w-full">
          <Photo id="p00" sizes="(min-width: 1024px) 30vw, 65vw" />
        </figure>
      </div>
      <ol className="shell-wide mt-(--section-md) grid gap-px bg-ink/15 lg:grid-cols-2">
        {claims.map((claim, i) => (
          <li key={claim.title} data-reveal="" style={{ "--d": i } as React.CSSProperties} className="min-w-0 flex min-h-72 flex-col justify-between gap-10 bg-bone p-6 sm:p-8 lg:min-h-80 lg:p-10">
            <span className="flex items-center justify-between gap-5">
              <span className="type-index text-xs text-red-controlled">{String(i + 2).padStart(2, "0")}</span>
              <span className="type-label min-w-0 break-words text-right text-ink/50">{claim.kicker}</span>
            </span>
            <span className="flex min-w-0 flex-col gap-3">
              <span className="type-h2 block max-w-full break-words text-ink">{claim.title}</span>
              <span className="type-h3 max-w-full break-words text-ink/55">{claim.sub}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ServicesSection({ locale }: { locale: Locale }) {
  const t = ui[locale]
  const groups = sources[locale].services.groups
  return (
    <section aria-labelledby="service-index-title" className="section-lg border-t border-line">
      <div className="shell-wide mb-12 lg:mb-16">
        <SectionHeading
          id="service-index-title"
          eyebrow={t.nav.services}
          title={groups.map((group) => group.title).join(" / ")}
          action={<Link href={routes[locale].services} className="type-label group flex w-fit items-center gap-3 text-bone"><span className="link-draw">{t.allServices}</span><ArrowRight className="arrow-shift size-4" aria-hidden="true" /></Link>}
        />
      </div>
      <ServiceBrowser items={browserItems(locale)} labels={{ viewService: t.viewService, priceLabel: t.priceLabel, of: t.of }} />
    </section>
  )
}

function browserItems(locale: Locale): BrowserItem[] {
  const t = ui[locale]
  const list = locale === "pl" ? services : services.filter((service) => service.slug !== "polerowanie")
  return list.map((service, i) => {
    const summary = serviceSummary(locale, service.slug)
    const price = servicePrice(locale, service.slug)
    const meta = photos[service.hero]
    return {
      slug: service.slug,
      index: formatIndex(i + 1),
      title: locale === "pl" ? service.navTitle : (summary?.title ?? service.navTitle),
      text: service.slug === "polerowanie" ? service.source.intro[0] : (summary?.text ?? service.source.intro[0]),
      category: serviceGroupTitle(locale, service.slug),
      price: price ?? t.individualQuote,
      priced: price !== null,
      href: "/" + service.slug,
      image: { src: photoSrc(service.hero, 960), srcSet: photoSrcSet(service.hero), alt: meta.alt, width: meta.w, height: meta.h },
    }
  })
}

function RealizationsSection({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  return (
    <section aria-labelledby="realizations-title" className="section-lg border-t border-line">
      <div className="shell-wide mb-12 lg:mb-16">
        <SectionHeading
          id="realizations-title"
          eyebrow={t.nav.gallery}
          title={src.home.projectsTitle}
          intro={src.home.projectsText}
          action={<Link href={routes[locale].gallery} className="type-label group flex w-fit items-center gap-3 text-bone"><span className="link-draw">{t.allPhotos}</span><ArrowRight className="arrow-shift size-4" aria-hidden="true" /></Link>}
        />
      </div>
      <div className="shell-wide grid grid-cols-2 gap-2 md:grid-cols-12 md:gap-3">
        <figure data-reveal="mask" className="frame zoom-on-hover col-span-2 aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto"><Photo id="p20" sizes="(min-width: 768px) 56vw, 100vw" position="50% 60%" /></figure>
        <figure data-reveal="mask" style={{ "--d": 1 } as React.CSSProperties} className="frame zoom-on-hover col-span-2 aspect-[4/3] md:col-span-5"><Photo id="p46" sizes="(min-width: 768px) 40vw, 100vw" /></figure>
        <figure data-reveal="mask" style={{ "--d": 2 } as React.CSSProperties} className="frame zoom-on-hover aspect-[3/4] md:col-span-3"><Photo id="p68" sizes="(min-width: 768px) 24vw, 50vw" /></figure>
        <figure data-reveal="mask" style={{ "--d": 3 } as React.CSSProperties} className="frame zoom-on-hover aspect-[3/4] md:col-span-2"><Photo id="p31" sizes="(min-width: 768px) 16vw, 50vw" /></figure>
        <figure data-reveal="mask" className="frame zoom-on-hover col-span-2 aspect-[3/4] md:col-span-4 md:col-start-2"><Photo id="p05" sizes="(min-width: 768px) 32vw, 100vw" /></figure>
        <figure data-reveal="mask" style={{ "--d": 1 } as React.CSSProperties} className="frame zoom-on-hover col-span-2 aspect-[16/10] self-end md:col-span-7"><Photo id="p52" sizes="(min-width: 768px) 56vw, 100vw" /></figure>
      </div>
    </section>
  )
}

function FeatureBand({ locale }: { locale: Locale }) {
  const features = sources[locale].home.features
  return (
    <div className="relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden lg:h-[76svh]">
      <div data-reveal="mask" className="absolute inset-0 -z-10"><Photo id="hero-banner" sizes="100vw" position="50% 45%" /></div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/40 to-ink/10" />
      <ul className="shell-wide grid pb-8 pt-40 md:grid-cols-3 lg:pb-12">
        {features.map((feature, i) => (
          <li key={feature} data-reveal="" style={{ "--d": i } as React.CSSProperties} className="flex flex-col gap-4 border-t border-bone/30 py-6 md:pr-8">
            <span className="type-index text-xs text-highlight">{String(i + 1).padStart(2, "0")}</span>
            <span className="type-h3 max-w-[18ch] break-words">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PricingPackages({ locale, headingId }: { locale: Locale; headingId?: string }) {
  const pricing = sources[locale].pricing
  const t = ui[locale]
  const order = [1, 0, 2]
  const currency = locale === "pl" ? "zł" : "PLN"
  return (
    <div className="flex flex-col">
      <ol aria-labelledby={headingId} className="grid gap-px bg-line-strong lg:grid-cols-3">
        {order.map((idx, position) => {
          const pkg = pricing.packages[idx]
          if (!pkg) return null
          const featured = Boolean(pkg.popular)
          return (
            <li key={pkg.title} data-reveal="" className={cn("relative flex min-h-full flex-col gap-8 bg-ink-2 p-6 sm:p-8 lg:p-9", featured && "bg-linear-to-br from-wine via-wine-deep to-ink-warm")}>
              {featured && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand" />}
              <span className={cn("type-index text-xs text-ash", featured && "text-bone")}>{String(position + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="type-h2">{pkg.title}</h3>
                  {pkg.popular && <span className="type-label bg-brand px-2 py-1 text-bone">{pkg.popular}</span>}
                </div>
                <p className="text-pretty leading-relaxed text-ash">{pkg.tagline}</p>
              </div>
              <div className="flex flex-1 flex-col gap-4 border-t border-line pt-6">
                {pkg.includedLabel && <p className="type-label text-ash">{pkg.includedLabel}</p>}
                <ul className="flex flex-col gap-2">
                  {pkg.items.map((item) => <li key={item} className="flex gap-3 leading-relaxed text-bone/85"><span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" />{item}</li>)}
                </ul>
                {pkg.discount && <p className="text-sm leading-relaxed text-bone/70">{pkg.discount}</p>}
              </div>
              <div className="flex flex-col gap-2 border-t border-line pt-6">
                {pkg.price && <PriceTag value={pkg.price} />}
                {pkg.note && <p className="type-label text-ash">{pkg.note}</p>}
              </div>
            </li>
          )
        })}
      </ol>
      <div data-reveal="" className="grid gap-8 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
        <p className="type-label text-bone lg:col-span-3">{t.sizes}</p>
        <dl className="grid grid-cols-3 gap-4 lg:col-span-6">
          {[{ label: t.compact, value: "+0" }, { label: t.medium, value: "+10" }, { label: t.large, value: "+30" }].map((row) => (
            <div key={row.label} className="flex flex-col gap-2 border-l border-line pl-4">
              <dt className="type-label text-ash">{row.label}</dt>
              <dd className="flex items-baseline gap-1.5"><span className="font-display text-3xl font-semibold tracking-[-0.03em] [font-stretch:108%] [font-variation-settings:'wdth'_108]">{row.value}</span><span className="type-label text-bone">{currency}</span></dd>
            </div>
          ))}
        </dl>
        <p className="text-pretty text-sm leading-relaxed text-bone/70 lg:col-span-3"><span className="text-highlight">* </span>{pricing.packagesNote}</p>
      </div>
    </div>
  )
}

function PriceTag({ value }: { value: string }) {
  const match = value.match(/^(\D*?)\s*([\d][\d\s.,]*)\s*(zł|PLN)?\s*(\*)?$/i)
  if (!match) return <span className="font-display font-semibold [font-stretch:108%] [font-variation-settings:'wdth'_108]">{value}</span>
  const [, prefix, amount, currency, star] = match
  return (
    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
      {prefix && <span className="type-label text-ash">{prefix}</span>}
      <span className="font-display text-[clamp(2.5rem,4vw,3.75rem)] font-semibold leading-none tracking-[-0.035em] [font-stretch:112%] [font-variation-settings:'wdth'_112]">{amount.trim()}</span>
      {currency && <span className="type-label text-bone">{currency}</span>}
      {star && <span className="text-highlight">{star}</span>}
    </span>
  )
}

function TeamSection({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const [opening, second, ...rest] = src.home.teamParas
  return (
    <section aria-labelledby="team-title" className="section-lg border-t border-line bg-ink-2">
      <div className="shell-wide grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-h-compact)+2rem)]">
            <figure data-reveal="mask" className="frame aspect-[4/5] w-full lg:aspect-[3/4]"><Photo id="team" sizes="(min-width: 1024px) 38vw, 100vw" position="50% 55%" /></figure>
            <p className="type-label flex items-center justify-between text-ash"><span>{src.home.author}</span><span>PAZIM - {src.address.lines[2]}</span></p>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
          <h2 id="team-title" className="eyebrow">{src.home.teamTitle ?? t.nav.about}</h2>
          {opening && <p data-reveal="" className="type-h2 max-w-[18ch] text-balance">{opening}</p>}
          {second && <p data-reveal="" className="type-lead text-pretty text-bone/90">{second}</p>}
          <div className="rule-signal" />
          <div className="measure flex flex-col gap-6">{rest.map((para, i) => <p key={i} data-reveal="" className="type-body text-pretty text-bone/75">{para}</p>)}</div>
          <div className="flex flex-col gap-6 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="flex items-center gap-4 font-display text-2xl font-semibold italic tracking-[-0.02em] [font-stretch:105%] [font-variation-settings:'wdth'_105]"><span aria-hidden="true" className="h-px w-10 bg-brand" />{src.home.author}</p>
            <Link href={routes[locale].about} className="type-label group flex w-fit items-center gap-3 text-bone"><span className="link-draw">{t.nav.about}</span><ArrowRight className="arrow-shift size-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function LocationSection({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[3]
  return (
    <section aria-labelledby="location-title" className="surface-wine relative overflow-hidden border-t border-line-wine">
      <div className="shell-wide section-lg grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <p className="eyebrow">{slide.kicker}</p>
          <h2 id="location-title" data-reveal="" className="type-h2 max-w-[16ch] text-balance">{slide.title} {slide.sub}</h2>
          <div data-reveal="" className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <address className="flex flex-col gap-1 not-italic">
              <span className="type-label mb-2 text-ash">{src.address.locationLabel}</span>
              {src.address.lines.map((line) => <span key={line} className="type-h3 font-medium">{line}</span>)}
            </address>
            <div className="flex flex-col gap-3">
              <span className="type-label mb-1 text-ash">{src.address.contactLabel}</span>
              <a href={contact.phoneHref} className="link-draw w-fit text-lg">{contact.phone}</a>
              <a href={"mailto:" + contact.email} className="link-draw w-fit break-all">{contact.email}</a>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline group mt-3 w-fit">{t.openMap}<ArrowUpRight className="arrow-lift size-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="relative flex min-h-64 flex-col items-center justify-center border border-line-wine bg-ink/35 p-8 lg:col-span-4 lg:col-start-9 lg:min-h-96">
          <span className="type-label mb-2 text-ash">PAZIM - {t.level}</span>
          <span data-reveal="" className="font-display text-[clamp(7rem,18vw,13rem)] font-semibold leading-none tracking-[-0.06em] text-bone [font-stretch:112%] [font-variation-settings:'wdth'_112]">-2</span>
        </div>
      </div>
    </section>
  )
}

function BookingSection({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
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

function SectionHeading({ id, eyebrow, title, intro, action }: { id: string; eyebrow: string; title: string; intro?: string; action?: React.ReactNode }) {
  return (
    <div className="grid gap-7 lg:grid-cols-12 lg:gap-8">
      <div className="flex items-start justify-between gap-5 lg:col-span-3"><p className="eyebrow">{eyebrow}</p></div>
      <div className="flex min-w-0 flex-col gap-7 lg:col-span-8 lg:col-start-5">
        <h2 id={id} data-reveal="" className="type-h2 max-w-[16ch] text-balance">{title}</h2>
        {(intro || action) && (
          <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            {intro && <p className="type-lead max-w-2xl text-pretty text-bone/75">{intro}</p>}
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
