import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { routes, sources, ui, type Locale } from "@/lib/content"
import type { PhotoId } from "@/lib/photos"
import { services, serviceSummary } from "@/lib/content/services"

const clients = [
  { file: "radisson", name: "Radisson Blu" },
  { file: "avis", name: "Avis" },
  { file: "unity-line", name: "Unity Line" },
  { file: "baltica", name: "Baltica" },
  { file: "fitnessworld", name: "Fitness World" },
  { file: "mooveno", name: "Mooveno" },
  { file: "umwz", name: "Urząd Marszałkowski Województwa Zachodniopomorskiego" },
  { file: "logo-type", name: "Wilhelmsen" },
]

const pageCopy = {
  pl: { intro: "Pełny zakres pielęgnacji", introText: "Od regularnego mycia po zaawansowane zabezpieczenie lakieru. Wybierz zakres lub skontaktuj się z nami, a dobierzemy usługę do stanu auta.", trusted: "Zaufali nam", choose: "Wybierz zakres" },
  en: { intro: "Complete car care", introText: "From regular washing to advanced paint protection. Choose a service or contact us and we will match it to your car.", trusted: "Trusted by", choose: "Choose a service" },
  de: { intro: "Komplette Fahrzeugpflege", introText: "Von der regelmäßigen Wäsche bis zum hochwertigen Lackschutz. Wählen Sie eine Leistung oder lassen Sie sich beraten.", trusted: "Unsere Kunden", choose: "Leistung wählen" },
  uk: { intro: "Повний догляд за авто", introText: "Від регулярного миття до професійного захисту лаку. Оберіть послугу або зверніться до нас за порадою.", trusted: "Нам довіряють", choose: "Оберіть послугу" },
} satisfies Record<Locale, Record<string, string>>

const categoryCopy = {
  pl: { wash: "Regularna pielęgnacja nadwozia i wnętrza. Od ręcznego mycia po czyszczenie tapicerki i skór.", detailing: "Praca nad wykończeniem auta. Renowacja lakieru, ochrona powierzchni i indywidualne zmiany wyglądu.", additional: "Zadbaj o ochronę szyb, odśwież powłokę lub przygotuj samochód do sprzedaży.", pricing: "Zakres i ceny", photo: "Z naszej hali w PAZIM" },
  en: { wash: "Regular care for the exterior and interior. From hand washing to upholstery and leather cleaning.", detailing: "Attention to the finish. Paint restoration, surface protection and individual changes to the car's appearance.", additional: "Protect the glass, maintain a coating or prepare your car for sale.", pricing: "Scope and prices", photo: "Inside our PAZIM studio" },
  de: { wash: "Regelmäßige Pflege von Karosserie und Innenraum. Von der Handwäsche bis zur Polster- und Lederreinigung.", detailing: "Arbeit am Finish. Lackaufbereitung, Oberflächenschutz und individuelle Veränderungen am Fahrzeug.", additional: "Scheiben schützen, eine Beschichtung pflegen oder das Auto für den Verkauf vorbereiten.", pricing: "Umfang und Preise", photo: "In unserer Halle im PAZIM" },
  uk: { wash: "Регулярний догляд за кузовом і салоном. Від ручного миття до чищення оббивки та шкіри.", detailing: "Увага до оздоблення. Відновлення лаку, захист поверхонь та індивідуальні зміни вигляду авто.", additional: "Захистіть скло, оновіть покриття або підготуйте автомобіль до продажу.", pricing: "Обсяг та ціни", photo: "У нашій студії в PAZIM" },
} satisfies Record<Locale, Record<string, string>>

const extraServiceGroup = {
  pl: {
    title: "Pakiety i pielęgnacja dodatkowa",
    items: [
      { id: "niewidzialna-wycieraczka", title: "Niewidzialna wycieraczka", text: "Hydrofobowa ochrona szyb ułatwiająca odprowadzanie wody podczas jazdy.", anchor: "detailing" },
      { id: "serwis-powloki", title: "Serwis powłoki ceramicznej", text: "Mycie, dekontaminacja i odświeżenie właściwości ochronnych powłoki ceramicznej.", anchor: "detailing" },
      { id: "sprzedaz-standard", title: "Pakiet Sprzedaż Standard", text: "Kompleksowe przygotowanie wnętrza i nadwozia, pranie lub pielęgnacja skór oraz woskowanie.", anchor: "pakiet-sprzedaz" },
      { id: "sprzedaz-premium", title: "Pakiet Sprzedaż Premium", text: "Pełne przygotowanie auta do sprzedaży rozszerzone o glinkowanie i korektę lakieru.", anchor: "pakiet-sprzedaz" },
    ],
  },
  en: {
    title: "Packages and additional care",
    items: [
      { id: "invisible-wiper", title: "Hydrophobic glass coating", text: "Hydrophobic protection that helps water run off the glass while driving.", anchor: "detailing" },
      { id: "coating-service", title: "Ceramic coating maintenance", text: "Washing, decontamination and restoration of the coating's protective properties.", anchor: "detailing" },
      { id: "sale-standard", title: "Standard Sales Package", text: "Interior and exterior preparation, upholstery or leather care, plus waxing.", anchor: "pakiet-sprzedaz" },
      { id: "sale-premium", title: "Premium Sales Package", text: "Complete sales preparation extended with claying and paint correction.", anchor: "pakiet-sprzedaz" },
    ],
  },
  de: {
    title: "Pakete und Zusatzpflege",
    items: [
      { id: "glasversiegelung", title: "Hydrophobe Glasversiegelung", text: "Hydrophober Schutz, durch den Wasser während der Fahrt leichter von den Scheiben abperlt.", anchor: "detailing" },
      { id: "beschichtungsservice", title: "Keramikversiegelungs-Service", text: "Wäsche, Dekontamination und Auffrischung der Schutzeigenschaften der Beschichtung.", anchor: "detailing" },
      { id: "verkauf-standard", title: "Verkaufspaket Standard", text: "Innen- und Außenaufbereitung, Polster- oder Lederpflege sowie Wachs.", anchor: "pakiet-sprzedaz" },
      { id: "verkauf-premium", title: "Verkaufspaket Premium", text: "Komplette Verkaufsvorbereitung mit Lackkneten und Lackkorrektur.", anchor: "pakiet-sprzedaz" },
    ],
  },
  uk: {
    title: "Пакети та додатковий догляд",
    items: [
      { id: "hydrophobic-glass", title: "Гідрофобне покриття скла", text: "Захист, завдяки якому вода легше стікає зі скла під час руху.", anchor: "detailing" },
      { id: "coating-service", title: "Обслуговування керамічного покриття", text: "Миття, деконтамінація та відновлення захисних властивостей покриття.", anchor: "detailing" },
      { id: "sale-standard", title: "Стандартний пакет для продажу", text: "Підготовка салону та кузова, хімчистка або догляд за шкірою та нанесення воску.", anchor: "pakiet-sprzedaz" },
      { id: "sale-premium", title: "Преміум пакет для продажу", text: "Повна підготовка до продажу з очищенням глиною та корекцією лаку.", anchor: "pakiet-sprzedaz" },
    ],
  },
} satisfies Record<Locale, { title: string; items: { id: string; title: string; text: string; anchor: string }[] }>

export function ServicesPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = pageCopy[locale]
  const category = categoryCopy[locale]
  const groups = [
    ...src.services.groups.map((group) => ({
      title: group.title,
      items: services.filter(service => service.category === (group.title.toLowerCase() === "myjnia" || group === src.services.groups[0] ? "myjnia" : "detailing")).map(service => {
        const item = serviceSummary(locale, service.slug)
        const polishingTitle = { pl: "Polerowanie", en: "Polishing", de: "Polieren", uk: "Полірування" }[locale]
        return { id: service.slug, title: locale === "pl" ? service.navTitle : service.slug === "polerowanie" ? polishingTitle : (item?.title ?? service.navTitle), text: item?.text ?? service.source.tagline, href: locale === "pl" ? `/${service.slug}` : null }
      }),
    })),
    {
      title: extraServiceGroup[locale].title,
      items: extraServiceGroup[locale].items.map((item) => ({ ...item, href: `${routes[locale].pricing}#${item.anchor}` })),
    },
  ]

  return (
    <SiteShell locale={locale} page="services">


      <section aria-labelledby="page-title" className="bg-[#080809]">
        <div className="shell-wide service-index-cover">
          <div className="min-w-0">
            <p className="eyebrow mb-7">{copy.intro}</p>
            <h1 id="page-title" className="page-cover-title">{t.nav.services}<span className="text-brand">.</span></h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/75">{copy.introText}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60">{src.meta.services.description}</p>
            <Link prefetch={false} href={routes[locale].pricing} className="editorial-link mt-8">{t.pricing}<ArrowRight className="size-4 text-brand" aria-hidden="true" /></Link>
          </div>
          <figure className="enter-unmask overflow-hidden"><Photo id="p62" priority sizes="(min-width: 1024px) 55vw, 92vw" position="65% 52%" /><figcaption className="absolute bottom-0 right-0 bg-[#080809] pl-5 pt-3 text-[.65rem] uppercase tracking-[.16em] text-white/65">BORUCH / PAZIM / -2</figcaption></figure>
        </div>
      </section>

      <nav aria-label={copy.choose} className="border-b border-white/10 bg-[#101011]">
        <div className="shell-wide flex flex-wrap gap-x-8 gap-y-1 py-4 sm:gap-x-12">
          {groups.map((group, index) => <a key={group.title} href={`#service-group-${index}`} className="group inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"><span className="link-draw">{group.title}</span><ArrowRight className="size-3.5 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" /></a>)}
        </div>
      </nav>

      {groups.map((group, groupIndex) => {
        const additional = groupIndex === groups.length - 1
        const visual: PhotoId = groupIndex === 0 ? "p46" : "p20"
        return (
        <section id={`service-group-${groupIndex}`} key={group.title} aria-labelledby={`group-${groupIndex}`} className={`scroll-mt-28 border-b border-white/10 section-lg ${groupIndex % 2 === 0 ? "bg-[#0a0a0b]" : "bg-[#101011]"}`}>
          <div className="shell-wide">
            <div className="service-index-category">
              <div>
                <p className="eyebrow">{t.nav.services}</p>
                <h2 id={`group-${groupIndex}`} className="editorial-display mt-5">{group.title}</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">{additional ? category.additional : groupIndex === 0 ? category.wash : category.detailing}</p>
                <Link prefetch={false} href={routes[locale].pricing} className="group mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-white/80 hover:text-white"><span className="link-draw">{category.pricing}</span><ArrowRight className="arrow-shift size-4 text-brand" aria-hidden="true" /></Link>
              </div>
              {!additional && <figure data-reveal="mask"><Photo id={visual} sizes="(min-width: 1024px) 55vw, 92vw" position={groupIndex === 1 ? "50% 60%" : "55% 50%"} /><figcaption className="absolute bottom-0 right-0 bg-[#101011] pl-5 pt-3 text-[.65rem] uppercase tracking-[.14em] text-white/65">{category.photo}</figcaption></figure>}
            </div>
            <ul className="border-b border-white/15">
              {group.items.map((item, index) => {
                const href = item.href
                const content = (
                  <>
                    <span className="type-index text-xs text-brand" aria-hidden="true">{String(index + 1 + (groupIndex === 1 ? 5 : additional ? 12 : 0)).padStart(2, "0")}</span>
                    <strong className="min-w-0 text-pretty font-display text-xl font-medium leading-snug tracking-normal text-white/90 sm:text-2xl">{item.title}</strong>
                    <span className="min-w-0 max-w-xl text-sm leading-relaxed text-white/65">{item.text}</span>
                    {href ? <span className="grid size-11 shrink-0 place-items-center self-center text-white/65 transition-colors group-hover:text-brand group-focus-visible:text-brand"><span className="sr-only">{t.viewService}</span><ArrowRight className="arrow-shift size-5" aria-hidden="true" /></span> : <span aria-hidden="true" />}
                  </>
                )
                const rowClass = "service-index-row group transition-colors"
                return <li key={item.id} data-reveal="" style={{ "--d": index % 3 } as React.CSSProperties}>{href ? <Link prefetch={false} href={href} className={rowClass}>{content}</Link> : <div className={rowClass}>{content}</div>}</li>
              })}
            </ul>
          </div>
        </section>
      )})}

      <section aria-labelledby="trusted-title" className="border-b border-white/10 bg-[#080809] py-14 sm:py-16">
        <div className="shell-wide">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">BORUCH</p><h2 id="trusted-title" className="mt-5 font-display text-3xl font-black uppercase tracking-[-.02em]">{src.services.trustedTitle}</h2></div>
            <p className="type-label text-white/65">{copy.trusted}</p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            {clients.map((client) => <li key={client.file} className="flex min-h-24 items-center justify-center border-b border-r border-white/8 p-5"><img src={`/images/clients/${client.file}.webp`} alt={client.name} loading="lazy" decoding="async" className="max-h-10 max-w-full object-contain opacity-45 grayscale invert transition duration-300 hover:opacity-90" /></li>)}
          </ul>
        </div>
      </section>

    </SiteShell>
  )
}
