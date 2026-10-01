import { ArrowRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, routes, sources, ui, type Locale } from "@/lib/content"


const pageCopy = {
  pl: { story: "Poznaj nas", values: "Jak pracujemy", gallery: "Boruch od środka", social: "Obserwuj nas" },
  en: { story: "Meet us", values: "How we work", gallery: "Inside Boruch", social: "Follow us" },
  de: { story: "Lernen Sie uns kennen", values: "So arbeiten wir", gallery: "Einblick in Boruch", social: "Folgen Sie uns" },
  uk: { story: "Познайомтеся з нами", values: "Як ми працюємо", gallery: "Boruch зсередини", social: "Слідкуйте за нами" },
} satisfies Record<Locale, Record<string, string>>

export function AboutPage({ locale }: { locale: Locale }) {
  const about = sources[locale].about
  const t = ui[locale]
  const copy = pageCopy[locale]
  const [opening, love, origin, ...closing] = about.paras
  const invitation = closing.length > 1 ? closing[closing.length - 1] : null
  const story = invitation ? closing.slice(0, -1) : closing

  return (
    <SiteShell locale={locale} page="about">


      <section aria-labelledby="page-title" className="editorial-hero atelier-story relative border-b border-white/10 bg-[#080809]">
        <div className="shell-wide page-cover-grid">
          <div className="min-w-0">
            <p className="eyebrow mb-7">{copy.story}</p>
            <h1 id="page-title" className="page-cover-title">{t.nav.about}<span className="text-brand">.</span></h1>
            {opening && <p className="mt-8 max-w-xl text-pretty type-lead text-white/85">{opening}</p>}
            {love && <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">{love}</p>}
            <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
              <span className="type-label text-white/60">{copy.social}</span>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center text-white/75 transition-colors hover:text-brand"><FacebookIcon className="size-5" /></a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center text-white/75 transition-colors hover:text-brand"><InstagramIcon className="size-5" /></a>
            </div>
          </div>
          <figure className="page-cover-portrait page-cover-team editorial-photo relative aspect-[3/4] w-full overflow-hidden">
            <Photo id="team" priority sizes="(min-width: 1024px) 432px, 92vw" position="50% 52.4%" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-6 pb-5 pt-12 type-label text-white/85">Boruch Myjnia / PAZIM / Szczecin</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="team-title" className="section-lg border-b border-white/10 bg-[#0a0a0b]">
        <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Boruch Myjnia</p>
            <h2 id="team-title" data-reveal="" className="editorial-display mt-7">{about.teamTitle ?? t.nav.about}</h2>
            {origin && <p data-reveal="" className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/75">{origin}</p>}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex max-w-2xl flex-col gap-6 text-pretty text-base leading-relaxed text-white/65">
              {story.map((paragraph, index) => <p key={index} data-reveal="" style={{ "--d": index } as React.CSSProperties}>{paragraph}</p>)}
            </div>
            <p className="mt-7 home-signature text-[clamp(3rem,4vw,4rem)] leading-[1.2] text-white">{about.author}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="section-md border-b border-white/10 bg-[#101011]">
        <div className="shell-wide">
          <h2 id="values-title" className="eyebrow">{copy.values}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-10 lg:gap-16">
            {about.features.map(feature => <li key={feature} data-reveal="" className="border-t border-white/15 pt-6">
              <strong className="font-display text-xl font-medium leading-snug text-white/90 sm:text-2xl">{feature}</strong>
            </li>)}
          </ul>
        </div>
      </section>

      <section aria-label={copy.gallery} className="border-b border-white/10 bg-[#080809] py-9 sm:py-12">
        <div className="shell-wide flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          {invitation && <p className="max-w-2xl border-l border-brand pl-5 text-pretty text-base leading-relaxed text-white/75">{invitation}</p>}
          <a href={routes[locale].gallery} className="editorial-link shrink-0">{t.allPhotos}<ArrowRight className="size-4 text-brand" aria-hidden="true" /></a>
        </div>
      </section>

    </SiteShell>
  )
}
