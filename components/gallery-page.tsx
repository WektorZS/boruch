import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SiteShell } from "./site-shell"
import { GalleryPortfolio } from "./gallery-portfolio"
import { InstagramIcon } from "./social-icons"
import { contact, sources, ui, type Locale } from "@/lib/content"
import { galleryOrder, type PhotoId } from "@/lib/photos"

const galleryCopy = {
  pl: {
    eyebrow: "Boruch Myjnia / Realizacje",
    headline: "Nasza praca. Z bliska.",
    collection: "Kadry z naszej myjni",
    place: "",
    scroll: "Zobacz realizacje",
    more: "Zobacz więcej zdjęć",
    finalKicker: "Jeszcze więcej kadrów",
    finalTitle: "Zajrzyj też na Instagram.",
    finalText: "Zobacz kolejne realizacje, detale i pracę naszej ekipy.",
    instagram: "Obserwuj Boruch Myjnia",
  },
  en: {
    eyebrow: "Boruch Myjnia / Our work",
    headline: "Our work. Up close.",
    collection: "From our workshop",
    place: "",
    scroll: "Explore our work",
    more: "Show more photos",
    finalKicker: "More from our workshop",
    finalTitle: "Find us on Instagram, too.",
    finalText: "See more projects, details and our team at work.",
    instagram: "Follow Boruch Myjnia",
  },
  de: {
    eyebrow: "Boruch Myjnia / Unsere Arbeit",
    headline: "Unsere Arbeit. Aus der Nähe.",
    collection: "Aus unserer Werkstatt",
    place: "",
    scroll: "Unsere Arbeiten ansehen",
    more: "Weitere Fotos anzeigen",
    finalKicker: "Noch mehr Einblicke",
    finalTitle: "Auch auf Instagram.",
    finalText: "Entdecken Sie weitere Arbeiten, Details und unser Team im Einsatz.",
    instagram: "Boruch Myjnia folgen",
  },
  uk: {
    eyebrow: "Boruch Myjnia / Наші роботи",
    headline: "Наша робота. Зблизька.",
    collection: "Кадри з нашої мийки",
    place: "",
    scroll: "Переглянути роботи",
    more: "Показати більше фото",
    finalKicker: "Ще більше кадрів",
    finalTitle: "Завітайте до нашого Instagram.",
    finalText: "Перегляньте інші роботи, деталі та нашу команду за роботою.",
    instagram: "Стежити за Boruch Myjnia",
  },
} satisfies Record<Locale, Record<string, string>>

// The old hero photograph becomes the opening gallery frame instead of appearing twice.
const portfolioIds = Array.from(new Set<PhotoId>(["p52", ...galleryOrder]))

export function GalleryPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = galleryCopy[locale]

  return (
    <SiteShell locale={locale} page="gallery">
      <div className="gallery-rebuild">
        <section className="gg-hero" aria-labelledby="page-title">
          <div className="gg-shell gg-hero-layout">
            <div>
              <p className="gg-kicker">{copy.eyebrow}</p>
              <h1 id="page-title">{t.nav.gallery}<span aria-hidden="true">.</span></h1>
              <p className="gg-headline">{copy.headline}</p>
            </div>
            <div className="gg-hero-aside">
              <p>{src.gallery.sub}</p>
              <div className="gg-hero-actions">
                <a
  href="https://www.facebook.com/p/Boruch-Myjnia-100085246333389/"
  target="_blank"
  rel="noopener noreferrer"
  className="gg-social"
>
  <span aria-hidden="true">
    <svg className="gg-social-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 22v-9h3l.5-4H13V6.5c0-1.1.3-1.5 1.5-1.5H17V1h-3c-3.3 0-5 2-5 5v3H6v4h3v9h4z" />
    </svg>
  </span>
  Facebook
</a>
                <a href="#realizacje" className="gg-link">{copy.scroll}<ArrowRight aria-hidden="true" strokeWidth={1.6} /></a>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="gg-social">
                  <span aria-hidden="true"><InstagramIcon className="gg-social-icon" /></span>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="realizacje" className="gg-collection" aria-labelledby="gg-collection-title">
          <div className="gg-shell">
            <header className="gg-collection-heading">
              <h2 id="gg-collection-title">{copy.collection}</h2>
              <p>{copy.place}</p>
            </header>
            <GalleryPortfolio
              ids={portfolioIds}
              locale={locale}
              labels={{
                photo: t.photo,
                of: t.of,
                prev: t.prev,
                next: t.next,
                close: t.closeLightbox,
                open: t.openPhoto,
                more: copy.more,
              }}
            />
          </div>
        </section>

        <section className="gg-finale" aria-labelledby="gg-finale-title">
          <div className="gg-shell gg-finale-layout">
            <div>
              <p className="gg-kicker">{copy.finalKicker}</p>
              <h2 id="gg-finale-title">{copy.finalTitle}</h2>
              <p className="gg-final-text">{copy.finalText}</p>
            </div>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="gg-instagram-button">
              <span aria-hidden="true"><InstagramIcon className="gg-social-icon" /></span>
              <span>{copy.instagram}</span>
              <ArrowUpRight aria-hidden="true" strokeWidth={1.6} />
            </a>
          </div>
        </section>

        <style>{GALLERY_PAGE_STYLES}</style>
      </div>
    </SiteShell>
  )
}

const GALLERY_PAGE_STYLES = `
  .gallery-rebuild {
    --gg-bg: #09090b;
    --gg-surface: #111113;
    --gg-ink: #f5f2ed;
    --gg-muted: #b7b5b3;
    --gg-accent: #df3039;
    --gg-line: rgba(245, 242, 237, .14);
    background: var(--gg-bg);
    color: var(--gg-ink);
    text-align: left;
  }
  .gallery-rebuild,
  .gallery-rebuild * { box-sizing: border-box; }
  .gallery-rebuild :where(h1, h2, p) { margin: 0; }
  .gallery-rebuild :where(h1, h2) { font-family: inherit; text-transform: none; overflow-wrap: anywhere; text-wrap: pretty; }
  .gallery-rebuild a { color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }
  .gallery-rebuild svg { display: block; flex-shrink: 0; }
  .gallery-rebuild .gg-shell { width: min(100% - 6rem, 1320px); margin-inline: auto; }
  .gallery-rebuild .gg-kicker { display: flex; align-items: center; gap: .8rem; color: var(--gg-muted); font-size: .75rem; font-weight: 650; line-height: 1.5; letter-spacing: .09em; }
  .gallery-rebuild .gg-kicker::before { content: ""; width: 1.75rem; height: 1px; flex-shrink: 0; background: var(--gg-accent); }
  .gallery-rebuild .gg-hero { padding-top: calc(var(--header-h, 96px) + clamp(3rem, 5vw, 5.5rem)); padding-bottom: clamp(3rem, 5vw, 5rem); border-bottom: 1px solid var(--gg-line); }
  .gallery-rebuild .gg-hero-layout { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, .7fr); align-items: end; gap: clamp(2rem, 6vw, 6rem); }
  .gallery-rebuild .gg-hero h1 { margin-top: 1.5rem; font-size: clamp(3.5rem, 6.3vw, 6rem); font-weight: 750; line-height: 1.1; letter-spacing: -.035em; }
  .gallery-rebuild .gg-hero h1 > span { color: var(--gg-accent); }
  .gallery-rebuild .gg-headline { margin-top: 1.3rem; font-size: clamp(1.25rem, 2vw, 1.625rem); font-weight: 450; line-height: 1.5; letter-spacing: -.015em; color: var(--gg-muted); }
  .gallery-rebuild .gg-hero-aside > p { max-width: 48ch; font-size: 1rem; line-height: 1.8; color: var(--gg-muted); text-wrap: pretty; }
  .gallery-rebuild .gg-hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1.75rem; margin-top: 1.25rem; }
  .gallery-rebuild .gg-link { display: inline-flex; min-height: 44px; align-items: center; gap: 1rem; font-size: .875rem; font-weight: 550; line-height: 1.5; }
  .gallery-rebuild .gg-link > svg { width: 18px; height: 18px; color: var(--gg-accent); }
  .gallery-rebuild .gg-social { display: inline-flex; min-height: 44px; align-items: center; gap: .65rem; font-size: .875rem; line-height: 1.5; color: var(--gg-muted); }
  .gallery-rebuild .gg-social-icon { width: 18px; height: 18px; }
  .gallery-rebuild .gg-social > span { color: var(--gg-accent); }
  .gallery-rebuild .gg-collection { padding-block: clamp(3rem, 5.5vw, 5rem); scroll-margin-top: calc(var(--header-h-compact, var(--header-h, 80px)) + 24px); }
  .gallery-rebuild .gg-collection-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding-bottom: 1.5rem; margin-bottom: 1.75rem; border-bottom: 1px solid var(--gg-line); }
  .gallery-rebuild .gg-collection-heading h2 { font-size: clamp(1.375rem, 2vw, 1.875rem); font-weight: 550; line-height: 1.4; letter-spacing: -.02em; }
  .gallery-rebuild .gg-collection-heading > p { flex-shrink: 0; font-size: .8125rem; line-height: 1.6; color: var(--gg-muted); }
  .gallery-rebuild .gg-finale { padding-block: clamp(3rem, 5.5vw, 4.75rem); background: var(--gg-surface); border-block: 1px solid var(--gg-line); }
  .gallery-rebuild .gg-finale-layout { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr); align-items: center; gap: 2.5rem; }
  .gallery-rebuild .gg-finale h2 { max-width: 30ch; margin-top: 1rem; font-size: clamp(1.75rem, 2.8vw, 2.5rem); font-weight: 600; line-height: 1.3; letter-spacing: -.025em; }
  .gallery-rebuild .gg-final-text { max-width: 55ch; margin-top: .85rem; color: var(--gg-muted); font-size: .9375rem; line-height: 1.8; }
  .gallery-rebuild .gg-instagram-button { display: inline-flex; min-height: 52px; align-items: center; justify-content: center; justify-self: end; gap: .85rem; padding: .85rem 1.2rem; border: 1px solid rgba(245, 242, 237, .3); font-size: .875rem; font-weight: 550; line-height: 1.5; transition: background-color 180ms, border-color 180ms; }
  .gallery-rebuild .gg-instagram-button > svg { width: 18px; height: 18px; margin-left: .3rem; color: var(--gg-accent); }
  .gallery-rebuild :where(a):focus-visible { outline: 2px solid var(--gg-ink); outline-offset: 5px; }
  @media (hover: hover) {
    .gallery-rebuild .gg-instagram-button:hover { border-color: rgba(245, 242, 237, .55); background: #242427; }
    .gallery-rebuild .gg-link:hover,
    .gallery-rebuild .gg-social:hover { color: #fff; }
  }
  @media (max-width: 1100px) {
    .gallery-rebuild .gg-shell { width: calc(100% - 4rem); }
  }
  @media (max-width: 900px) {
    .gallery-rebuild .gg-hero-layout { grid-template-columns: minmax(0, 1fr); gap: 1.75rem; }
    .gallery-rebuild .gg-hero-aside { max-width: 68ch; }
    .gallery-rebuild .gg-hero-aside > p { max-width: none; }
    .gallery-rebuild .gg-finale-layout { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
    .gallery-rebuild .gg-instagram-button { justify-self: start; }
  }
  @media (max-width: 760px) {
    .gallery-rebuild .gg-shell { width: calc(100% - 2.5rem); }
    .gallery-rebuild .gg-hero { padding-top: calc(var(--header-h, 80px) + 2.25rem); padding-bottom: 2.5rem; }
    .gallery-rebuild .gg-hero h1 { margin-top: 1rem; font-size: clamp(2.75rem, 10vw, 4.25rem); }
    .gallery-rebuild .gg-headline { font-size: 1.25rem; margin-top: .8rem; }
    .gallery-rebuild .gg-hero-layout { gap: 1.25rem; }
    .gallery-rebuild .gg-hero-aside > p { font-size: .9375rem; line-height: 1.75; }
    .gallery-rebuild .gg-hero-actions { gap: .5rem 1.5rem; margin-top: .75rem; }
    .gallery-rebuild .gg-collection { padding-block: 2.25rem; }
    .gallery-rebuild .gg-collection-heading { flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; padding-bottom: 1rem; }
    .gallery-rebuild .gg-collection-heading h2 { font-size: 1.375rem; line-height: 1.45; }
    .gallery-rebuild .gg-collection-heading > p { font-size: .75rem; }
    .gallery-rebuild .gg-finale { padding-block: 2.75rem; }
    .gallery-rebuild .gg-finale h2 { font-size: 1.875rem; }
  }
  @media (max-width: 390px) {
    .gallery-rebuild .gg-shell { width: calc(100% - 2rem); }
    .gallery-rebuild .gg-instagram-button { width: 100%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gallery-rebuild *,
    .gallery-rebuild *::before,
    .gallery-rebuild *::after { transition: none !important; animation: none !important; }
  }
`

