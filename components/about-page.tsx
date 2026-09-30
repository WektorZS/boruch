import { ArrowRight, Hand, MapPin, ShieldCheck } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, routes, sources, ui, type Locale } from "@/lib/content"
import type { PhotoId } from "@/lib/photos"


const pageCopy = {
  pl: { story: "Poznaj nas", values: "Jak pracujemy", gallery: "Boruch od środka", social: "Obserwuj nas" },
  en: { story: "Meet us", values: "How we work", gallery: "Inside Boruch", social: "Follow us" },
  de: { story: "Lernen Sie uns kennen", values: "So arbeiten wir", gallery: "Einblick in Boruch", social: "Folgen Sie uns" },
  uk: { story: "Познайомтеся з нами", values: "Як ми працюємо", gallery: "Boruch зсередини", social: "Слідкуйте за нами" },
} satisfies Record<Locale, Record<string, string>>

export function AboutPage({ locale }: { locale: Locale }) {
  const about = sources[locale].about
  const src = sources[locale]
  const t = ui[locale]
  const copy = pageCopy[locale]
  const [opening, love, origin, ...closing] = about.paras
  const invitation = closing.length > 1 ? closing[closing.length - 1] : null
  const story = invitation ? closing.slice(0, -1) : closing

  return (
    <SiteShell locale={locale} page="about">


      <section aria-labelledby="page-title" className="page-hero relative isolate flex items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p62" priority sizes="100vw" position="50% 55%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.6)_0%,rgba(6,6,7,.6)_48%,rgba(6,6,7,.2)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
        <div className="shell-wide relative z-10 pb-14 lg:pb-16">
          <p className="eyebrow mb-7">{about.teamTitle ?? t.nav.about}</p>
          <h1 id="page-title" className="page-hero-title type-h1">{t.nav.about}</h1>
          {opening && <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/66">{opening}</p>}
        </div>
      </section>

      <section aria-labelledby="team-title" className="border-b border-white/10 bg-[#0a0a0b] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid gap-0 overflow-hidden lg:grid-cols-2">
          <figure data-reveal="mask" className="editorial-photo relative min-h-[23rem] overflow-hidden lg:min-h-[34rem]">
            <Photo id="team" sizes="(min-width: 1024px) 50vw, 100vw" position="50% 55%" />
            <figcaption className="absolute bottom-0 left-0 border-r border-t border-white/10 bg-black/75 px-6 py-4 text-[.72rem] font-bold uppercase tracking-[.16em] text-white/72 backdrop-blur-md">Boruch Myjnia / Szczecin</figcaption>
          </figure>
          <div className="flex flex-col justify-center bg-[#111112] p-7 sm:p-10 lg:p-10 xl:p-12">
            <p className="eyebrow">{copy.story}</p>
            <h2 id="team-title" data-reveal="" className="mt-7 type-h2 max-w-full">{about.teamTitle ?? t.nav.about}</h2>
            <div className="mt-8 flex max-w-2xl flex-col gap-5 text-pretty text-base leading-relaxed text-white/62">
              {origin && <p data-reveal="">{origin}</p>}
              {love && <p data-reveal="" className="border-l-2 border-brand pl-5 text-white/82">{love}</p>}
              {story.slice(0, 2).map((paragraph, index) => <p key={index} data-reveal="" style={{ "--d": index + 1 } as React.CSSProperties}>{paragraph}</p>)}
            </div>
            <p className="mt-8 home-signature text-[clamp(3rem,4vw,4rem)] leading-[1.2] text-white">{about.author}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center border border-white/12 text-white/66 transition-colors hover:border-brand hover:bg-brand hover:text-white"><FacebookIcon className="size-5" /></a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center border border-white/12 text-white/66 transition-colors hover:border-brand hover:bg-brand hover:text-white"><InstagramIcon className="size-5" /></a>
              <span className="ml-auto type-label text-white/65">{copy.social}</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="border-b border-white/10 bg-[#101011] py-14 lg:py-20">
        <div className="shell-wide">
          <p className="eyebrow">{t.nav.about}</p>
          <h2 id="values-title" className="mt-6 type-h2">{copy.values}</h2>
          <ul className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3 lg:gap-12">
            {about.features.map((feature, index) => {
              const Icon = [Hand, MapPin, ShieldCheck][index % 3]
              return <li key={feature} data-reveal="" className="flex items-start gap-4">
                <Icon className="mt-1 size-6 shrink-0 text-brand" strokeWidth={1.5} aria-hidden="true" />
                <strong className="type-h3 text-white/90">{feature}</strong>
              </li>
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="story-title" className="border-b border-white/10 bg-[#080809] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">{copy.gallery}</p>
            <h2 id="story-title" data-reveal="" className="mt-7 type-h2 max-w-full">{src.home.teamTitle ?? about.teamTitle}</h2>
            <div className="mt-8 flex max-w-xl flex-col gap-5 text-pretty text-base leading-relaxed text-white/58">
              {story.slice(2).map((paragraph, index) => <p key={index} data-reveal="" style={{ "--d": index } as React.CSSProperties}>{paragraph}</p>)}
              {invitation && <p data-reveal="" className="border-l border-brand pl-5 text-lg text-white/82">{invitation}</p>}
            </div>
            <a href={routes[locale].gallery} className="mt-9 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[.14em] text-white transition-colors hover:text-brand">{t.allPhotos}<ArrowRight className="size-4 text-brand" /></a>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            <figure data-reveal="mask" className="editorial-photo relative col-span-2 aspect-[16/10] overflow-hidden"><Photo id="p20" sizes="(min-width: 1024px) 58vw, 100vw" position="50% 45%" /></figure>
            <MiniPhoto id="p55" />
            <MiniPhoto id="p07" delay={1} />
          </div>
        </div>
      </section>

    </SiteShell>
  )
}

function MiniPhoto({ id, delay = 0 }: { id: PhotoId; delay?: number }) {
  return <figure data-reveal="mask" style={{ "--d": delay } as React.CSSProperties} className="editorial-photo relative aspect-[4/3] overflow-hidden"><Photo id={id} sizes="(min-width: 1024px) 30vw, 50vw" /></figure>
}
