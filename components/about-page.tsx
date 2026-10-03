import { ArrowRight, Check } from "lucide-react"
import { Alex_Brush } from "next/font/google"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, routes, sources, ui, type Locale } from "@/lib/content"

// Scoped to the signature below, never to the page or its headings.
const signatureFont = Alex_Brush({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  preload: false,
})

const pageCopy = {
  pl: {
    story: "Poznaj nas",
    team: "Nasza ekipa",
    values: "Jak pracujemy",
    social: "Obserwuj nas",
    gallery: "Zobacz nas w działaniu.",
    galleryBody: "Zajrzyj do naszej myjni. Zobacz samochody, nad którymi pracujemy, i efekty naszej pracy.",
    workshop: "Boruch Myjnia / PAZIM / Szczecin",
    fallback: [
      "Każdego dnia budzimy się z myślą o tym, aby dziś nadać blask kolejnej maszynie.",
      "Kochamy auta, zdecydowanie bardziej te czyste i lśniące.",
      "Stąd pomysł o założeniu myjni, gdzie dokładamy wszelkich starań, aby Państwa 'perełki' wyglądały jak nowe!",
    ],
  },
  en: {
    story: "Meet us",
    team: "Our team",
    values: "How we work",
    social: "Follow us",
    gallery: "See us at work.",
    galleryBody: "Step inside our workshop. See the cars we work on and the results of our care.",
    workshop: "Boruch Myjnia / PAZIM / Szczecin",
    fallback: [
      "Every morning, we wake up thinking about the next car we can bring back to a shine.",
      "We love cars, especially when they are clean and gleaming.",
      "That is why we opened our car wash, where we put every effort into making your pride and joy look like new.",
    ],
  },
  de: {
    story: "Lernen Sie uns kennen",
    team: "Unser Team",
    values: "So arbeiten wir",
    social: "Folgen Sie uns",
    gallery: "Sehen Sie uns bei der Arbeit.",
    galleryBody: "Schauen Sie in unsere Werkstatt. Entdecken Sie die Fahrzeuge, an denen wir arbeiten, und die Ergebnisse unserer Arbeit.",
    workshop: "Boruch Myjnia / PAZIM / Szczecin",
    fallback: [
      "Jeden Morgen denken wir daran, dem nächsten Fahrzeug neuen Glanz zu verleihen.",
      "Wir lieben Autos, besonders wenn sie sauber sind und glänzen.",
      "Deshalb haben wir unsere Autowäsche gegründet. Wir geben uns alle Mühe, damit Ihr Schmuckstück wieder wie neu aussieht.",
    ],
  },
  uk: {
    story: "Познайомтеся з нами",
    team: "Наша команда",
    values: "Як ми працюємо",
    social: "Слідкуйте за нами",
    gallery: "Подивіться, як ми працюємо.",
    galleryBody: "Зазирніть до нашої мийки. Перегляньте автомобілі, над якими ми працюємо, та результати нашої роботи.",
    workshop: "Boruch Myjnia / PAZIM / Szczecin",
    fallback: [
      "Щодня ми прокидаємося з думкою про те, як надати блиску ще одному автомобілю.",
      "Ми любимо автомобілі, особливо чисті та сяючі.",
      "Саме тому ми відкрили мийку, де докладаємо всіх зусиль, щоб ваш автомобіль виглядав як новий.",
    ],
  },
} satisfies Record<Locale, {
  story: string
  team: string
  values: string
  social: string
  gallery: string
  galleryBody: string
  workshop: string
  fallback: readonly string[]
}>

export function AboutPage({ locale }: { locale: Locale }) {
  const about = sources[locale].about
  const t = ui[locale]
  const copy = pageCopy[locale]

  // Preserve every source paragraph in its original order.
  const sourceParagraphs = about.paras.filter(paragraph => paragraph.trim().length > 0)
  const paragraphs = sourceParagraphs.length ? sourceParagraphs : copy.fallback
  const [opening, ...story] = paragraphs
  const features = about.features.filter(feature => feature.trim().length > 0)
  const author = about.author?.trim() || "Karol Bruch"

  return (
    <SiteShell locale={locale} page="about">
      <div className="about-rebuild" lang={locale}>
        <style>{aboutStyles}</style>

        <section className="ab-hero" aria-labelledby="page-title">
          <div className="ab-shell">
            <p className="ab-eyebrow">{copy.story}</p>
            <div className="ab-hero-grid">
              <h1 id="page-title" className="ab-title">
                {t.nav.about}<span className="ab-dot" aria-hidden="true">.</span>
              </h1>
              <p className="ab-opening">{opening}</p>
            </div>
            <div className="ab-hero-foot" aria-hidden="true">
              <span>Boruch Myjnia</span>
              <span>Szczecin / PAZIM</span>
            </div>
          </div>
        </section>

        <section className="ab-story" aria-labelledby="team-title">
          <div className="ab-shell ab-story-grid">
            <figure className="ab-portrait">
              <div className="ab-photo">
                <Photo
                  id="team"
                  priority
                  sizes="(min-width: 1416px) 600px, (min-width: 900px) 44vw, (min-width: 624px) 560px, (min-width: 600px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                  position="50% 52.4%"
                />
              </div>
              <figcaption className="ab-photo-caption">
                <span className="ab-caption-mark" aria-hidden="true" />
                {copy.workshop}
              </figcaption>
            </figure>

            <div className="ab-story-content">
              <p className="ab-eyebrow">Boruch Myjnia</p>
              <h2 id="team-title" className="ab-heading">
                {about.teamTitle?.trim() || copy.team}
              </h2>

              {story.length > 0 && (
                <div className="ab-prose">
                  {story.map((paragraph, index) => (
                    <p key={index} className={index === 0 ? "ab-prose-lead" : undefined}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <p className={`${signatureFont.className} ab-signature`} style={{ fontFamily: signatureFont.style.fontFamily }}>{author}</p>

              <div className="ab-social-row">
                <p className="ab-small-label">{copy.social}</p>
                <div className="ab-social-links">
                  <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="ab-social-link">
                    <span className="ab-social-icon" aria-hidden="true"><FacebookIcon className="ab-icon" /></span>
                    Facebook
                  </a>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="ab-social-link">
                    <span className="ab-social-icon" aria-hidden="true"><InstagramIcon className="ab-icon" /></span>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {features.length > 0 && (
          <section className="ab-values" aria-labelledby="values-title">
            <div className="ab-shell ab-values-layout">
              <div className="ab-values-heading">
                <p className="ab-eyebrow">Boruch Myjnia</p>
                <h2 id="values-title" className="ab-heading">{copy.values}</h2>
              </div>
              <ul className="ab-values-list">
                {features.map((feature, index) => (
                  <li key={`${index}-${feature}`}>
                    <Check className="ab-value-icon" size={20} strokeWidth={1.6} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="ab-gallery" aria-labelledby="about-gallery-title">
          <div className="ab-shell ab-gallery-grid">
            <div>
              <p className="ab-eyebrow">{t.nav.gallery}</p>
              <h2 id="about-gallery-title" className="ab-heading ab-gallery-title">{copy.gallery}</h2>
            </div>
            <div className="ab-gallery-action">
              <p>{copy.galleryBody}</p>
              <a href={routes[locale].gallery} className="ab-gallery-link">
                <span>{t.allPhotos}</span>
                <ArrowRight className="ab-arrow" size={20} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  )
}

const aboutStyles = `
.about-rebuild {
  --ab-bg: #09090b;
  --ab-surface: #111113;
  --ab-ink: #f5f2ed;
  --ab-muted: #b7b5b3;
  --ab-accent: #df3039;
  --ab-line: rgba(245, 242, 237, .14);
  --ab-ease: cubic-bezier(.22, .61, .36, 1);
  background: var(--ab-bg);
  color: var(--ab-ink);
  isolation: isolate;
}
.about-rebuild *,
.about-rebuild *::before,
.about-rebuild *::after { box-sizing: border-box; }
.about-rebuild :is(h1, h2, p, figure, ul) { margin: 0; }
.about-rebuild :is(h1, h2) {
  font-family: inherit;
  text-transform: none;
  overflow-wrap: anywhere;
  text-wrap: balance;
}
.about-rebuild a { color: inherit; text-decoration: none; }
.about-rebuild a:focus-visible {
  outline: 2px solid var(--ab-ink);
  outline-offset: 5px;
}
.about-rebuild .ab-shell {
  width: min(calc(100% - 6rem), 1320px);
  margin-inline: auto;
  min-width: 0;
}
.about-rebuild .ab-eyebrow,
.about-rebuild .ab-small-label,
.about-rebuild .ab-hero-foot,
.about-rebuild .ab-photo-caption {
  font-size: .7rem;
  font-weight: 650;
  line-height: 1.6;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.about-rebuild .ab-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ab-muted);
}
.about-rebuild .ab-eyebrow::before {
  content: "";
  width: 28px;
  height: 1px;
  flex: 0 0 28px;
  background: var(--ab-accent);
}
.about-rebuild .ab-hero {
  padding-block: clamp(3.5rem, 6vw, 6rem) 1.6rem;
  border-bottom: 1px solid var(--ab-line);
}
.about-rebuild .ab-hero-grid {
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  padding-block: 1.7rem 3rem;
}
.about-rebuild .ab-title {
  font-size: clamp(3.5rem, 6.4vw, 5.75rem);
  font-weight: 650;
  line-height: 1.12;
  letter-spacing: -.025em;
}
.about-rebuild .ab-dot { color: var(--ab-accent); }
.about-rebuild .ab-opening {
  max-width: 34ch;
  font-size: clamp(1.25rem, 1.65vw, 1.65rem);
  font-weight: 400;
  line-height: 1.65;
  color: var(--ab-ink);
  text-wrap: pretty;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
.about-rebuild .ab-hero-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: .5rem 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ab-line);
  color: var(--ab-muted);
  font-size: .65rem;
}
.about-rebuild .ab-story {
  padding-block: clamp(3rem, 6vw, 6rem);
}
.about-rebuild .ab-story-grid {
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  align-items: start;
  gap: clamp(2.5rem, 5vw, 5rem);
}
.about-rebuild .ab-portrait {
  position: sticky;
  top: 112px;
  min-width: 0;
}
.about-rebuild .ab-photo {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--ab-surface);
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}
.about-rebuild .ab-photo :is(picture, img) {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.about-rebuild .ab-photo img {
  object-fit: cover;
  filter: none;
  opacity: 1;
  transform: none;
}
.about-rebuild .ab-photo-caption {
  display: flex;
  align-items: center;
  gap: .8rem;
  margin-top: 1rem;
  color: var(--ab-muted);
  font-size: .62rem;
  letter-spacing: .08em;
}
.about-rebuild .ab-caption-mark {
  width: 5px;
  height: 5px;
  flex: 0 0 5px;
  background: var(--ab-accent);
}
.about-rebuild .ab-story-content { min-width: 0; padding-top: .5rem; }
.about-rebuild .ab-heading {
  margin-top: 1.2rem;
  font-size: clamp(1.9rem, 2.65vw, 2.7rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -.015em;
}
.about-rebuild .ab-prose {
  margin-top: 2rem;
  display: grid;
  gap: 1.25rem;
  max-width: 62ch;
  font-size: .97rem;
  line-height: 1.9;
  color: var(--ab-muted);
  text-wrap: pretty;
}
.about-rebuild .ab-prose p { white-space: pre-line; overflow-wrap: anywhere; }
.about-rebuild .ab-prose .ab-prose-lead {
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--ab-ink);
}
.about-rebuild .ab-signature {
  display: block;
  width: fit-content;
  max-width: 100%;
  margin-top: 2.25rem;
  padding-block: .12em .18em;
  font-size: clamp(3rem, 4.3vw, 3.75rem);
  font-weight: 400;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: 0;
  text-transform: none;
  overflow-wrap: normal;
  color: var(--ab-ink);
}
.about-rebuild .ab-social-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: .6rem 1.5rem;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--ab-line);
}
.about-rebuild .ab-small-label { color: var(--ab-muted); font-size: .65rem; }
.about-rebuild .ab-social-links { display: flex; flex-wrap: wrap; gap: .25rem 1.3rem; }
.about-rebuild .ab-social-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: .65rem;
  font-size: .84rem;
  font-weight: 500;
  transition: color 180ms var(--ab-ease);
}
.about-rebuild .ab-social-icon { display: inline-flex; flex-shrink: 0; }
.about-rebuild .ab-icon { width: 17px; height: 17px; }
.about-rebuild .ab-values {
  padding-block: clamp(2.75rem, 5vw, 4.5rem);
  border-block: 1px solid var(--ab-line);
  background: var(--ab-surface);
}
.about-rebuild .ab-values-layout {
  display: grid;
  grid-template-columns: .7fr 1.3fr;
  align-items: start;
  gap: clamp(2rem, 5vw, 5rem);
}
.about-rebuild .ab-values-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 2.25rem;
}
.about-rebuild .ab-values-list li {
  display: flex;
  align-items: flex-start;
  gap: .8rem;
  min-width: 0;
  padding-block: 1rem 1.2rem;
  border-top: 1px solid var(--ab-line);
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.65;
  text-wrap: pretty;
  overflow-wrap: anywhere;
}
.about-rebuild .ab-value-icon {
  flex: 0 0 20px;
  margin-top: .2rem;
  color: var(--ab-accent);
}
.about-rebuild .ab-gallery {
  padding-block: clamp(3rem, 5.5vw, 5.5rem);
  border-bottom: 1px solid var(--ab-line);
}
.about-rebuild .ab-gallery-grid {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  align-items: end;
  gap: clamp(2rem, 5vw, 5rem);
}
.about-rebuild .ab-gallery-title { max-width: 20ch; }
.about-rebuild .ab-gallery-action { min-width: 0; }
.about-rebuild .ab-gallery-action > p {
  max-width: 48ch;
  font-size: .95rem;
  line-height: 1.8;
  color: var(--ab-muted);
  text-wrap: pretty;
}
.about-rebuild .ab-gallery-link {
  display: inline-flex;
  min-height: 48px;
  max-width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem;
  margin-top: 1.4rem;
  padding: .7rem 0;
  border-bottom: 1px solid var(--ab-accent);
  font-size: .86rem;
  font-weight: 600;
  line-height: 1.6;
  transition: color 180ms var(--ab-ease), border-color 180ms var(--ab-ease);
}
.about-rebuild .ab-arrow {
  flex-shrink: 0;
  color: var(--ab-accent);
  transition: transform 220ms var(--ab-ease);
}
@media (hover: hover) {
  .about-rebuild .ab-social-link:hover,
  .about-rebuild .ab-gallery-link:hover { color: #ef6267; }
  .about-rebuild .ab-gallery-link:hover .ab-arrow { transform: translateX(4px); }
}
@media (max-width: 1199px) {
  .about-rebuild .ab-shell { width: calc(100% - 4rem); }
  .about-rebuild .ab-values-layout { grid-template-columns: 1fr; gap: 2rem; }
  .about-rebuild .ab-values-list { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 1.75rem; }
}
@media (max-width: 899px) {
  .about-rebuild .ab-hero-grid { grid-template-columns: 1fr; gap: 1.35rem; padding-bottom: 2rem; }
  .about-rebuild .ab-title { font-size: clamp(3.25rem, 8vw, 4.5rem); }
  .about-rebuild .ab-opening { max-width: 48ch; }
  .about-rebuild .ab-story-grid { grid-template-columns: 1fr; gap: 2.75rem; }
  .about-rebuild .ab-portrait { position: static; width: 100%; max-width: 560px; margin-inline: auto; }
  .about-rebuild .ab-prose { max-width: 70ch; }
  .about-rebuild .ab-story-content { padding-top: 0; }
  .about-rebuild .ab-values-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .about-rebuild .ab-gallery-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .about-rebuild .ab-gallery-title { max-width: none; }
}
@media (max-width: 599px) {
  .about-rebuild .ab-shell { width: calc(100% - 2.5rem); }
  .about-rebuild .ab-hero { padding-top: 2.75rem; padding-bottom: 1.1rem; }
  .about-rebuild .ab-hero-grid { padding-top: 1.25rem; gap: 1.25rem; }
  .about-rebuild .ab-title { font-size: clamp(2.75rem, 10vw, 3.75rem); line-height: 1.14; }
  .about-rebuild .ab-opening { font-size: 1.16rem; line-height: 1.65; }
  .about-rebuild .ab-hero-foot { font-size: .6rem; letter-spacing: .07em; }
  .about-rebuild .ab-eyebrow { font-size: .66rem; letter-spacing: .1em; }
  .about-rebuild .ab-story { padding-block: 2.25rem 2.75rem; }
  .about-rebuild .ab-story-grid { gap: 2.25rem; }
  .about-rebuild .ab-photo {
    aspect-ratio: 4 / 5;
    clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px));
  }
  .about-rebuild .ab-photo-caption { font-size: .6rem; letter-spacing: .065em; }
  .about-rebuild .ab-heading { font-size: clamp(1.75rem, 7vw, 2.15rem); line-height: 1.25; }
  .about-rebuild .ab-prose { margin-top: 1.4rem; gap: 1.15rem; font-size: .95rem; line-height: 1.85; }
  .about-rebuild .ab-prose .ab-prose-lead { font-size: 1.04rem; line-height: 1.8; }
  .about-rebuild .ab-signature { margin-top: 1.6rem; font-size: clamp(2.75rem, 12.5vw, 3.5rem); }
  .about-rebuild .ab-social-row { align-items: flex-start; flex-direction: column; gap: .4rem; margin-top: 1.25rem; }
  .about-rebuild .ab-social-links { gap: 1.5rem; }
  .about-rebuild .ab-values-list { grid-template-columns: 1fr; }
  .about-rebuild .ab-values-list li { padding-block: .9rem 1rem; font-size: 1rem; }
  .about-rebuild .ab-gallery-action > p { font-size: .94rem; }
}
@media (prefers-reduced-motion: reduce) {
  .about-rebuild :is(.ab-social-link, .ab-gallery-link, .ab-arrow) { transition: none; }
  .about-rebuild .ab-gallery-link:hover .ab-arrow { transform: none; }
}
`

