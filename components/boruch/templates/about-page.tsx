import { SiteShell } from "../site-shell"
import { PageIntro } from "../page-intro"
import { Photo } from "../photo"
import { FeatureBand } from "../feature-band"
import { PhotoTriptych } from "../photo-triptych"
import { LocationSection } from "../location-section"
import { BookingCta } from "../booking-cta"
import { breadcrumbJsonLd, routes, sources, ui, type Locale } from "@/lib/content"

/**
 * The full /o-nas story, told as a narrative progression.
 * Paragraph roles follow the source order: opening line, love of cars, why the wash exists,
 * the team bond, the invitation — then the author's signature.
 */
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
      <PageIntro eyebrow={about.teamTitle ?? t.nav.about} title={about.h1} photo="p62" photoPosition="50% 55%" />

      {opening && (
        <section aria-label={about.teamTitle ?? t.nav.about} className="section-xl">
          <div className="shell-wide flex flex-col gap-16 lg:gap-24">
            <p data-reveal="" className="type-display max-w-6xl text-balance normal-case leading-[0.98]">
              {opening}
            </p>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div data-reveal="mask" className="frame aspect-[580/1066] max-h-[80svh] w-full sm:w-2/3 lg:col-span-4 lg:w-full">
                <Photo id="team" sizes="(min-width: 1024px) 33vw, 66vw" position="50% 55%" />
              </div>
              <div className="flex flex-col justify-end gap-10 lg:col-span-7 lg:col-start-6">
                {love && (
                  <p data-reveal="" className="type-h1 text-balance normal-case text-highlight">
                    {love}
                  </p>
                )}
                {origin && (
                  <p data-reveal="" className="type-lead max-w-2xl text-pretty text-bone/85">
                    {origin}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <FeatureBand locale={locale} photo="p20" />

      {bond.length > 0 && (
        <section aria-label={about.features.join(", ")} className="section-xl">
          <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col gap-8 lg:col-span-8">
              {bond.map((para, i) => (
                <p
                  key={i}
                  data-reveal=""
                  style={{ "--d": i } as React.CSSProperties}
                  className="type-h2 text-pretty normal-case leading-[1.12] tracking-[-0.012em]"
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
        <section aria-label={about.author} className="section-lg">
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
