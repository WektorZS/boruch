import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, MapPin, Menu, Phone } from "lucide-react"
import { Photo } from "./photo"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"
import { serviceGroupTitle, servicePrice, serviceSummary, services, type ServiceSlug } from "@/lib/content/services"
import { cn } from "@/lib/utils"

const navOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]

const featuredServiceSlugs: ServiceSlug[] = [
  "mycie-zewnatrz",
  "czyszczenie-wnetrza",
  "powloka-ceramiczna",
  "folia-ppf",
  "korekta-lakieru",
  "zmiana-koloru-dechroming",
]

export function HomePage({ locale }: { locale: Locale }) {
  const t = ui[locale]

  return (
    <div id="top" lang={locale === "pl" ? undefined : localeLabels[locale].htmlLang} className="home-root min-h-dvh bg-[#080708] text-bone">
      <a href="#main" className="fixed left-4 top-4 z-80 -translate-y-24 bg-brand px-4 py-3 text-xs font-bold uppercase tracking-[.16em] transition-transform focus:translate-y-0">
        {t.skip}
      </a>
      <HomeHeader locale={locale} />
      <main id="main">
        <HomeHero locale={locale} />
        <BrandManifest locale={locale} />
        <ServiceMenu locale={locale} />
        <WorkShowcase locale={locale} />
        <Packages locale={locale} />
        <TeamStory locale={locale} />
        <Location locale={locale} />
        <FinalCall locale={locale} />
      </main>
      <HomeFooter locale={locale} />
    </div>
  )
}

function HomeHeader({ locale }: { locale: Locale }) {
  const t = ui[locale]

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080708]/70 backdrop-blur-md">
      <div className="home-shell flex h-24 items-center gap-8">
        <Link href={routes[locale].home} aria-label={`BORUCH Myjnia - ${t.nav.home}`} className="group flex shrink-0 items-center gap-3">
          <span className="grid size-11 place-items-center bg-brand font-display text-3xl font-black leading-none transition-colors group-hover:bg-[#a91720]">B</span>
          <span className="flex flex-col">
            <span className="font-display text-[1.35rem] font-black uppercase leading-none tracking-[-.03em]">Boruch</span>
            <span className="mt-1 text-[.55rem] font-semibold uppercase tracking-[.24em] text-white/45">Myjnia / detailing</span>
          </span>
        </Link>

        <nav aria-label={t.navigation} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {navOrder.map((key) => (
              <li key={key}>
                <Link href={routes[locale][key]} className="home-nav-link text-[.68rem] font-semibold uppercase tracking-[.15em] text-white/62">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul aria-label={t.language} className="ml-2 hidden items-center gap-1 border-l border-white/12 pl-6 xl:flex">
          {localeOrder.map((code) => (
            <li key={code}>
              <Link href={routes[code].home} hrefLang={localeLabels[code].htmlLang} aria-current={code === locale ? "page" : undefined} className="grid size-8 place-items-center text-[.62rem] font-bold text-white/40 transition-colors hover:text-white aria-[current=page]:bg-white aria-[current=page]:text-black">
                {localeLabels[code].short}
              </Link>
            </li>
          ))}
        </ul>

        <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center gap-3 bg-brand px-5 text-[.68rem] font-bold uppercase tracking-[.14em] transition-colors hover:bg-[#aa1921] sm:flex">
          {t.book}<ArrowUpRight className="size-4" aria-hidden="true" />
        </a>

        <details className="home-mobile-menu ml-auto lg:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center border border-white/15 text-white">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">{t.menu}</span>
          </summary>
          <div className="fixed inset-x-0 top-24 min-h-[calc(100svh-6rem)] border-t border-white/10 bg-[#10080a] px-5 py-8 shadow-2xl">
            <nav aria-label={t.navigation}>
              <ul className="flex flex-col">
                {navOrder.map((key) => (
                  <li key={key} className="border-b border-white/10">
                    <Link href={routes[locale][key]} className="flex items-center justify-between py-5 font-display text-3xl font-black uppercase tracking-[-.02em]">
                      {t.nav[key]}<ArrowRight className="size-5 text-brand" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {localeOrder.map((code) => (
                <Link key={code} href={routes[code].home} hrefLang={localeLabels[code].htmlLang} aria-current={code === locale ? "page" : undefined} className="grid h-10 min-w-12 place-items-center border border-white/15 px-3 text-xs font-bold aria-[current=page]:border-brand aria-[current=page]:bg-brand">
                  {localeLabels[code].short}
                </Link>
              ))}
            </div>
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-8 flex min-h-14 w-full items-center justify-between bg-brand px-5 text-xs font-bold uppercase tracking-[.14em]">
              {t.book}<ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </div>
        </details>
      </div>
    </header>
  )
}

function HomeHero({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[0]

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-svh overflow-hidden bg-[#080708] pt-24">
      <div aria-hidden="true" className="home-wordmark absolute -bottom-[.11em] left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[clamp(11rem,27vw,29rem)] font-black uppercase leading-none">Boruch</div>
      <div className="home-shell grid min-h-[calc(100svh-6rem)] gap-12 py-12 lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-16">
        <div className="relative z-10 flex flex-col items-start lg:col-span-6">
          <p className="enter-fade mb-7 flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.2em] text-[#ef4a50]">
            <span className="h-px w-9 bg-brand" />{slide.title} - {slide.sub}
          </p>
          <h1 id="hero-title" className="home-hero-title max-w-[8ch] text-balance">
            <span className="line-mask"><span className="enter-rise block">{slide.kicker}</span></span>
          </h1>
          <p className="enter-fade mt-7 max-w-lg text-pretty text-base leading-relaxed text-white/58 sm:text-lg" style={{ "--i": 2 } as React.CSSProperties}>
            {src.home.sourceH1}
          </p>
          <div className="enter-fade mt-9 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="home-button home-button-red">
              {t.book}<ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <Link href={routes[locale].services} className="home-button home-button-dark">
              {t.nav.services}<ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[28rem] lg:col-span-6 lg:min-h-[42rem]">
          <div className="enter-unmask absolute inset-y-0 right-0 w-[90%] overflow-hidden border border-white/10 bg-[#151112] shadow-[0_35px_100px_rgba(0,0,0,.55)]">
            <Photo id="p28" priority sizes="(min-width: 1024px) 50vw, 90vw" position="58% 68%" className="opacity-90" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />
          </div>
          <div className="absolute bottom-7 left-0 flex h-36 w-36 flex-col justify-between bg-brand p-5 sm:h-44 sm:w-44 sm:p-6">
            <span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/75">PAZIM / {t.level}</span>
            <strong className="font-display text-7xl font-black leading-none tracking-[-.06em]">-2</strong>
          </div>
          <a href="#services" className="absolute -bottom-1 right-0 hidden items-center gap-3 border border-white/15 bg-[#080708] px-5 py-4 text-[.62rem] font-bold uppercase tracking-[.16em] text-white/55 transition-colors hover:text-white sm:flex">
            {t.scroll}<ArrowDown className="size-4 text-brand" aria-hidden="true" />
          </a>
        </div>
      </div>
      <ul className="relative z-10 grid border-y border-white/10 bg-black/60 backdrop-blur sm:grid-cols-3">
        {src.home.features.map((feature) => (
          <li key={feature} className="flex min-h-20 items-center gap-4 border-b border-white/10 px-6 last:border-b-0 sm:justify-center sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span aria-hidden="true" className="size-2 bg-brand" />
            <span className="text-[.68rem] font-bold uppercase tracking-[.15em] text-white/70">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function BrandManifest({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const first = src.home.teamParas[0]
  const second = src.home.teamParas[1]

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0c0b0c] py-24 lg:py-36">
      <div className="home-shell grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="home-kicker mb-7">{src.slides[0].title}</p>
          <p data-reveal="" className="home-section-title max-w-[12ch]">{first}</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p data-reveal="" className="border-l border-brand pl-6 text-pretty text-xl leading-relaxed text-white/72">{second}</p>
          <p className="mt-8 text-sm leading-relaxed text-white/42">{src.home.teamParas[2]}</p>
        </div>
      </div>
      <div className="home-shell mt-16 grid gap-3 md:grid-cols-12">
        <figure data-reveal="mask" className="relative aspect-[16/10] overflow-hidden md:col-span-8">
          <Photo id="p47" sizes="(min-width: 768px) 66vw, 100vw" position="50% 50%" />
        </figure>
        <div className="grid gap-3 md:col-span-4">
          <article className="flex min-h-48 flex-col justify-between bg-[#4b0c12] p-7">
            <span className="text-[.6rem] font-bold uppercase tracking-[.18em] text-white/48">{src.slides[1].kicker}</span>
            <p className="font-display text-4xl font-black uppercase leading-[.95] tracking-[-.035em]">{src.slides[1].title}</p>
            <p className="text-sm text-white/52">{src.slides[1].sub}</p>
          </article>
          <article className="flex min-h-48 flex-col justify-between border border-white/10 bg-[#111011] p-7">
            <span className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#ef4a50]">{src.slides[2].kicker}</span>
            <p className="font-display text-4xl font-black uppercase leading-[.95] tracking-[-.035em]">{src.slides[2].title}</p>
            <p className="text-sm text-white/42">{src.slides[2].sub}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function ServiceMenu({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const items = featuredServiceSlugs.map((slug) => {
    const service = services.find((entry) => entry.slug === slug)!
    const summary = serviceSummary(locale, slug)
    return {
      slug,
      title: locale === "pl" ? service.navTitle : (summary?.title ?? service.navTitle),
      text: summary?.text ?? service.source.intro[0],
      category: serviceGroupTitle(locale, slug),
      price: servicePrice(locale, slug) ?? t.individualQuote,
      photo: service.hero,
      href: locale === "pl" ? `/${slug}` : routes[locale].services,
    }
  })

  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-white/10 bg-[#4c0d13] py-24 lg:py-32">
      <div className="home-shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <p className="home-kicker text-white/62">{t.nav.services}</p>
            <h2 id="services-title" data-reveal="" className="home-section-title mt-6 max-w-[8ch]">{src.services.groups.map((group) => group.title).join(" / ")}</h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-white/62">{src.meta.services.description}</p>
            <Link href={routes[locale].services} className="home-button mt-9 border border-white/24 bg-transparent hover:bg-white hover:text-[#4c0d13]">
              {t.allServices}<ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ul className="divide-y divide-white/12 border-y border-white/12 lg:col-span-8">
          {items.map((item) => (
            <li key={item.slug} data-reveal="">
              <Link href={item.href} className="home-service-row group grid gap-5 py-6 sm:grid-cols-[9rem_1fr_auto] sm:items-center lg:py-7">
                <div className="relative aspect-[16/10] overflow-hidden bg-black/25">
                  <Photo id={item.photo} sizes="144px" className="opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <div>
                  <span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/45">{item.category}</span>
                  <h3 className="mt-2 font-display text-[clamp(1.65rem,3vw,2.75rem)] font-black uppercase leading-none tracking-[-.03em] transition-transform duration-500 group-hover:translate-x-2">{item.title}</h3>
                  <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/52">{item.text}</p>
                </div>
                <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                  <span className="whitespace-nowrap text-[.65rem] font-bold uppercase tracking-[.12em] text-white/72">{item.price}</span>
                  <span className="grid size-10 place-items-center border border-white/20 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#4c0d13]">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function WorkShowcase({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="work-title" className="overflow-hidden border-b border-white/10 bg-[#080708] py-24 lg:py-32">
      <div className="home-shell mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="home-kicker">{t.nav.gallery}</p>
          <h2 id="work-title" data-reveal="" className="home-section-title mt-6 max-w-[9ch]">{src.home.projectsTitle}</h2>
        </div>
        <div className="max-w-md">
          <p className="text-pretty text-sm leading-relaxed text-white/48">{src.home.projectsText}</p>
          <Link href={routes[locale].gallery} className="mt-6 inline-flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.16em] text-white">
            {t.allPhotos}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="home-shell grid gap-3 md:grid-cols-12 md:grid-rows-2">
        <figure data-reveal="mask" className="group relative aspect-[4/5] overflow-hidden md:col-span-5 md:row-span-2 md:aspect-auto">
          <Photo id="p20" sizes="(min-width: 768px) 42vw, 100vw" position="50% 58%" className="transition duration-1000 group-hover:scale-[1.025]" />
        </figure>
        <figure data-reveal="mask" className="group relative aspect-[16/9] overflow-hidden md:col-span-7">
          <Photo id="p62" sizes="(min-width: 768px) 58vw, 100vw" className="transition duration-1000 group-hover:scale-[1.025]" />
        </figure>
        <div className="grid gap-3 sm:grid-cols-2 md:col-span-7">
          <figure data-reveal="mask" className="group relative aspect-[4/3] overflow-hidden md:aspect-auto">
            <Photo id="p52" sizes="(min-width: 768px) 29vw, 50vw" className="transition duration-1000 group-hover:scale-[1.025]" />
          </figure>
          <figure data-reveal="mask" className="group relative aspect-[4/3] overflow-hidden md:aspect-auto">
            <Photo id="p05" sizes="(min-width: 768px) 29vw, 50vw" className="transition duration-1000 group-hover:scale-[1.025]" />
          </figure>
        </div>
      </div>
    </section>
  )
}

function Packages({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="packages-title" className="border-b border-white/10 bg-[#100e0f] py-24 lg:py-32">
      <div className="home-shell">
        <div className="grid gap-8 border-b border-white/12 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="home-kicker">{t.pricing}</p>
            <h2 id="packages-title" data-reveal="" className="home-section-title mt-6">{src.home.packagesTitle}</h2>
          </div>
          <Link href={routes[locale].pricing} className="inline-flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.16em] lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            {src.home.moreLink}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
          </Link>
        </div>

        <div className="divide-y divide-white/12">
          {src.pricing.packages.map((pkg) => (
            <article key={pkg.title} data-reveal="" className={cn("grid gap-8 py-10 lg:grid-cols-12 lg:items-start", pkg.popular && "relative before:absolute before:inset-y-0 before:-left-5 before:w-1 before:bg-brand")}>
              <div className="lg:col-span-4">
                {pkg.popular && <span className="mb-4 inline-block bg-brand px-2.5 py-1 text-[.55rem] font-bold uppercase tracking-[.16em]">{pkg.popular}</span>}
                <h3 className="font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[.9] tracking-[-.04em]">{pkg.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">{pkg.tagline}</p>
              </div>
              <div className="lg:col-span-5">
                {pkg.includedLabel && <p className="mb-4 text-[.58rem] font-bold uppercase tracking-[.16em] text-[#ef4a50]">{pkg.includedLabel}</p>}
                <ul className="grid gap-x-8 gap-y-2 text-sm text-white/66 sm:grid-cols-2">
                  {pkg.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-[.65em] h-px w-3 shrink-0 bg-brand" />{item}</li>)}
                </ul>
                {pkg.discount && <p className="mt-4 text-sm text-white/45">{pkg.discount}</p>}
              </div>
              <div className="flex flex-col lg:col-span-3 lg:items-end lg:text-right">
                <span className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] font-black uppercase leading-none tracking-[-.045em]">{pkg.price}</span>
                {pkg.note && <span className="mt-3 max-w-52 text-[.58rem] font-bold uppercase tracking-[.13em] text-white/38">{pkg.note}</span>}
              </div>
            </article>
          ))}
        </div>
        <p className="border-t border-white/12 pt-6 text-xs leading-relaxed text-white/38">* {src.pricing.packagesNote}</p>
      </div>
    </section>
  )
}

function TeamStory({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="team-title" className="border-b border-white/10 bg-[#080708]">
      <div className="grid lg:grid-cols-2">
        <figure data-reveal="mask" className="relative min-h-[32rem] overflow-hidden lg:min-h-[48rem]">
          <Photo id="team" sizes="(min-width: 1024px) 50vw, 100vw" position="50% 55%" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
          <figcaption className="absolute bottom-7 left-7 bg-[#080708] px-4 py-3 text-[.6rem] font-bold uppercase tracking-[.16em]">{src.home.author}</figcaption>
        </figure>
        <div className="flex flex-col justify-center bg-[#21090c] px-[var(--gutter)] py-20 lg:px-[clamp(4rem,7vw,8rem)]">
          <p className="home-kicker">{src.home.teamTitle ?? t.nav.about}</p>
          <h2 id="team-title" data-reveal="" className="home-section-title mt-7 max-w-[10ch]">{src.home.teamParas[0]}</h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/64">{src.home.teamParas[1]}</p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/42">{src.home.teamParas[2]}</p>
          <Link href={routes[locale].about} className="home-button home-button-dark mt-10 w-fit border-white/18">
            {t.nav.about}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Location({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[3]

  return (
    <section aria-labelledby="location-title" className="bg-[#080708] py-20 lg:py-28">
      <div className="home-shell grid overflow-hidden border border-white/10 lg:grid-cols-[.7fr_1.3fr]">
        <div className="flex min-h-80 flex-col justify-between bg-brand p-8 sm:p-10">
          <span className="text-[.62rem] font-bold uppercase tracking-[.2em] text-white/68">PAZIM / {t.level}</span>
          <strong className="font-display text-[clamp(7rem,15vw,12rem)] font-black leading-[.72] tracking-[-.07em]">-2</strong>
        </div>
        <div className="flex flex-col justify-between gap-12 bg-[#100e0f] p-8 sm:p-10 lg:p-14">
          <div>
            <p className="home-kicker">{slide.kicker}</p>
            <h2 id="location-title" data-reveal="" className="home-section-title mt-6 max-w-[10ch]">{slide.title} {slide.sub}</h2>
          </div>
          <div className="grid gap-8 border-t border-white/12 pt-8 sm:grid-cols-2">
            <address className="flex flex-col gap-1 not-italic text-white/68">
              <MapPin className="mb-3 size-5 text-brand" aria-hidden="true" />
              {src.address.lines.map((line) => <span key={line}>{line}</span>)}
            </address>
            <div className="flex flex-col items-start gap-4">
              <a href={contact.phoneHref} className="flex items-center gap-3 text-sm text-white/68 transition-colors hover:text-white"><Phone className="size-4 text-brand" aria-hidden="true" />{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all text-sm text-white/68 transition-colors hover:text-white"><Mail className="size-4 text-brand" aria-hidden="true" />{contact.email}</a>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-3 text-[.62rem] font-bold uppercase tracking-[.15em]">{t.openMap}<ArrowUpRight className="size-4 text-brand" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCall({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="booking-title" className="relative isolate min-h-[42rem] overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 -z-10">
        <Photo id="p06" sizes="100vw" position="50% 57%" className="opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,8,.96)_0%,rgba(8,7,8,.78)_48%,rgba(8,7,8,.25)_100%)]" />
      </div>
      <div className="home-shell flex min-h-[42rem] items-center py-20">
        <div className="max-w-4xl">
          <p className="home-kicker">{t.book}</p>
          <h2 id="booking-title" data-reveal="" className="home-hero-title mt-7 max-w-[9ch]">{src.home.contactTitle}</h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/58">{src.home.contactText}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="home-button home-button-red">{t.booksy}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
            <a href={contact.phoneHref} className="home-button home-button-dark">{t.call} - {contact.phone}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeFooter({ locale }: { locale: Locale }) {
  const t = ui[locale]

  return (
    <footer className="bg-[#050505]">
      <div className="home-shell grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href={routes[locale].home} className="font-display text-5xl font-black uppercase tracking-[-.05em]">Boruch<span className="text-brand">.</span></Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/38">{sources[locale].meta.home.description}</p>
        </div>
        <nav aria-label={t.navigation} className="md:col-span-4 md:col-start-6">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/58">
            {navOrder.map((key) => <li key={key}><Link href={routes[locale][key]} className="transition-colors hover:text-white">{t.nav[key]}</Link></li>)}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 text-sm text-white/58 md:col-span-2 md:col-start-11">
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Instagram</a>
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Facebook</a>
          <a href="#top" className="mt-4 inline-flex items-center gap-2 text-[.6rem] font-bold uppercase tracking-[.15em] text-white">{t.backToTop}<ArrowUpRight className="size-4 text-brand" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="home-shell flex flex-col gap-4 py-5 text-[.58rem] font-semibold uppercase tracking-[.14em] text-white/28 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BORUCH</span>
          <span>Szczecin / Plac Rodła 8 / PAZIM</span>
        </div>
      </div>
    </footer>
  )
}
