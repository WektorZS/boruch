import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"
import type { PhotoId } from "@/lib/photos"

export function AboutPage({ locale }: { locale: Locale }) {
  const about = sources[locale].about
  const t = ui[locale]
  const [opening, love, origin, ...closing] = about.paras
  const invitation = closing.length > 1 ? closing[closing.length - 1] : null
  const bond = invitation ? closing.slice(0, -1) : closing

  return (
    <SiteShell locale={locale} page="about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: t.nav.home, path: routes[locale].home },
              { name: t.nav.about, path: routes[locale].about },
            ]),
          ),
        }}
      />
      <AboutIntro eyebrow={about.teamTitle ?? t.nav.about} title={about.h1} />

      {opening && (
        <section aria-label={about.teamTitle ?? t.nav.about} className="surface-bone section-lg">
          <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col gap-10 lg:col-span-6">
              <p className="eyebrow text-ink/55">{about.teamTitle ?? t.nav.about}</p>
              <p data-reveal="" className="type-h2 max-w-[18ch] text-balance text-ink">
                {opening}
              </p>
              {origin && (
                <p data-reveal="" className="type-lead max-w-2xl text-pretty text-ink/70">
                  {origin}
                </p>
              )}
              {love && (
                <p data-reveal="" className="type-h3 max-w-xl border-l-2 border-brand pl-5 text-pretty text-red-dark">
                  {love}
                </p>
              )}
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div data-reveal="mask" className="frame aspect-[4/5] w-full">
                <Photo id="team" sizes="(min-width: 1024px) 33vw, 66vw" position="50% 55%" />
              </div>
            </div>
          </div>
        </section>
      )}

      <FeatureBand locale={locale} photo="p20" />

      {bond.length > 0 && (
        <section aria-label={about.features.join(", ")} className="section-lg bg-ink-2">
          <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
            <p className="eyebrow lg:col-span-3">{about.features.join(" / ")}</p>
            <div className="grid gap-8 lg:col-span-8 lg:col-start-5 lg:grid-cols-2">
              {bond.map((para, i) => (
                <p
                  key={i}
                  data-reveal=""
                  style={{ "--d": i } as React.CSSProperties}
                  className="type-lead border-t border-line pt-6 text-pretty text-bone/80"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      <PhotoTriptych ids={["p55", "p07", "p44"]} />

      {invitation && (
        <section aria-label={about.author} className="surface-wine section-lg">
          <div className="shell-wide flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p data-reveal="" className="type-lead max-w-2xl text-pretty text-bone">
              {invitation}
            </p>
            <p data-reveal="" style={{ "--d": 1 } as React.CSSProperties} className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-brand" />
              <span className="type-h2 italic normal-case">{about.author}</span>
            </p>
          </div>
        </section>
      )}

      <LocationSection locale={locale} />
      <BookingCta locale={locale} photo="p58" />
    </SiteShell>
  )
}

function AboutIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section aria-labelledby="page-title" className="relative isolate pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
      <div className="shell-wide grid gap-7 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3"><p className="eyebrow">{eyebrow}</p></div>
        <div className="lg:col-span-8 lg:col-start-5">
          <h1 id="page-title" data-reveal="" className="type-h1 max-w-[16ch] text-balance">{title}</h1>
        </div>
      </div>
      <div className="shell-wide mt-12 lg:mt-16">
        <div className="enter-unmask frame aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2/1]">
          <Photo id="p62" priority sizes="(min-width: 1680px) 1600px, 100vw" position="50% 55%" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}

function FeatureBand({ locale, photo }: { locale: Locale; photo: PhotoId }) {
  const features = sources[locale].home.features
  return (
    <div className="relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden lg:h-[76svh]">
      <div data-reveal="mask" className="absolute inset-0 -z-10"><Photo id={photo} sizes="100vw" position="50% 45%" /></div>
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

function PhotoTriptych({ ids }: { ids: [PhotoId, PhotoId, PhotoId] }) {
  const [a, b, c] = ids
  return (
    <div className="shell-wide grid grid-cols-2 items-end gap-3 py-(--section-md) md:grid-cols-12 md:gap-5">
      <figure data-reveal="mask" className="frame col-span-2 aspect-[4/5] md:col-span-6"><Photo id={a} sizes="(min-width: 768px) 48vw, 100vw" /></figure>
      <figure data-reveal="mask" style={{ "--d": 1 } as React.CSSProperties} className="frame aspect-[3/4] md:col-span-3 md:mb-28"><Photo id={b} sizes="(min-width: 768px) 24vw, 50vw" /></figure>
      <figure data-reveal="mask" style={{ "--d": 2 } as React.CSSProperties} className="frame aspect-[3/4] md:col-span-3"><Photo id={c} sizes="(min-width: 768px) 24vw, 50vw" /></figure>
    </div>
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
              <a href={`mailto:${contact.email}`} className="link-draw w-fit break-all">{contact.email}</a>
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

function BookingCta({ locale, photo }: { locale: Locale; photo: PhotoId }) {
  const src = sources[locale]
  const t = ui[locale]
  return (
    <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-t border-line">
      <div className="absolute inset-0 -z-10">
        <Photo id={photo} sizes="100vw" className="opacity-35" position="50% 60%" />
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
