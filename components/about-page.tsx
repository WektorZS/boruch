import { Alex_Brush } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"
import type { PhotoId } from "@/lib/photos"

const alexBrush = Alex_Brush({ subsets: ["latin"], weight: "400", display: "swap" })

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

      <section aria-labelledby="page-title" className="relative isolate flex min-h-[720px] items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p62" priority sizes="100vw" position="50% 55%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.98)_0%,rgba(6,6,7,.84)_48%,rgba(6,6,7,.2)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
        <div className="shell-wide relative z-10 pb-14 lg:pb-16">
          <p className="eyebrow mb-7">{about.teamTitle ?? t.nav.about}</p>
          <h1 id="page-title" className="type-h1 max-w-[16ch] text-balance">{about.h1}</h1>
          {opening && <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/66">{opening}</p>}
        </div>
      </section>

      <section aria-labelledby="team-title" className="border-b border-white/10 bg-[#0a0a0b] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid gap-0 overflow-hidden lg:grid-cols-2">
          <figure data-reveal="mask" className="relative min-h-[28rem] overflow-hidden lg:min-h-[46rem]">
            <Photo id="team" sizes="(min-width: 1024px) 50vw, 100vw" position="50% 55%" />
            <figcaption className="absolute bottom-0 left-0 border-r border-t border-white/10 bg-black/75 px-6 py-4 text-[.62rem] font-bold uppercase tracking-[.16em] text-white/72 backdrop-blur-md">Boruch Myjnia / Szczecin</figcaption>
          </figure>
          <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#151516,#100b0c)] p-7 sm:p-10 lg:p-14 xl:p-16">
            <p className="eyebrow">{copy.story}</p>
            <h2 id="team-title" data-reveal="" className="mt-7 type-h2 max-w-[11ch]">{about.teamTitle ?? t.nav.about}</h2>
            <div className="mt-8 flex max-w-2xl flex-col gap-5 text-pretty text-base leading-relaxed text-white/62">
              {origin && <p data-reveal="">{origin}</p>}
              {love && <p data-reveal="" className="border-l-2 border-brand pl-5 text-white/82">{love}</p>}
              {story.slice(0, 2).map((paragraph, index) => <p key={index} data-reveal="" style={{ "--d": index + 1 } as React.CSSProperties}>{paragraph}</p>)}
            </div>
            <p className={`${alexBrush.className} mt-8 text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-white`}>{about.author}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center border border-white/12 text-white/66 transition-colors hover:border-brand hover:bg-brand hover:text-white"><FacebookIcon className="size-5" /></a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center border border-white/12 text-white/66 transition-colors hover:border-brand hover:bg-brand hover:text-white"><InstagramIcon className="size-5" /></a>
              <span className="ml-auto type-label text-white/34">{copy.social}</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="border-b border-white/10 bg-[#101011]">
        <div className="shell-wide grid lg:grid-cols-[.8fr_2.2fr]">
          <div className="flex flex-col justify-center border-b border-white/10 py-12 lg:border-b-0 lg:border-r lg:py-16 lg:pr-10">
            <p className="eyebrow">{copy.values}</p>
            <h2 id="values-title" className="mt-6 max-w-[10ch] font-display text-4xl font-black uppercase leading-[1.03] tracking-[-.02em]">{about.features.join(". ")}.</h2>
          </div>
          <ul className="grid sm:grid-cols-3">
            {about.features.map((feature, index) => (
              <li key={feature} data-reveal="" style={{ "--d": index } as React.CSSProperties} className="flex min-h-48 flex-col justify-between border-b border-white/10 py-8 sm:border-b-0 sm:border-r sm:px-7 lg:min-h-64 lg:p-10">
                <span className="size-2 bg-brand" aria-hidden="true" />
                <strong className="mt-12 max-w-[14ch] font-display text-2xl font-bold uppercase leading-[1.08] tracking-[-.01em] text-white/88">{feature}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="story-title" className="border-b border-white/10 bg-[#080809] py-16 sm:py-20 lg:py-28">
        <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">{copy.gallery}</p>
            <h2 id="story-title" data-reveal="" className="mt-7 type-h2 max-w-[11ch]">{src.home.teamTitle ?? about.teamTitle}</h2>
            <div className="mt-8 flex max-w-xl flex-col gap-5 text-pretty text-base leading-relaxed text-white/58">
              {story.slice(2).map((paragraph, index) => <p key={index} data-reveal="" style={{ "--d": index } as React.CSSProperties}>{paragraph}</p>)}
              {invitation && <p data-reveal="" className="border-l border-brand pl-5 text-lg text-white/82">{invitation}</p>}
            </div>
            <a href={routes[locale].gallery} className="mt-9 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[.14em] text-white transition-colors hover:text-brand">{t.allPhotos}<ArrowRight className="size-4 text-brand" /></a>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            <figure data-reveal="mask" className="relative col-span-2 aspect-[16/10] overflow-hidden"><Photo id="p20" sizes="(min-width: 1024px) 58vw, 100vw" position="50% 45%" /></figure>
            <MiniPhoto id="p55" />
            <MiniPhoto id="p07" delay={1} />
          </div>
        </div>
      </section>

    </SiteShell>
  )
}

function MiniPhoto({ id, delay = 0 }: { id: PhotoId; delay?: number }) {
  return <figure data-reveal="mask" style={{ "--d": delay } as React.CSSProperties} className="relative aspect-[4/5] overflow-hidden"><Photo id={id} sizes="(min-width: 1024px) 30vw, 50vw" /></figure>
}
