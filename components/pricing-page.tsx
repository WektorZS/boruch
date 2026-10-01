import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, Clock3 } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { routes, sources, ui, type Locale } from "@/lib/content"
import type { ServiceSlug } from "@/lib/content/services"

type Localized = Record<Locale, string>
type PriceVariant = { name?: Localized; price: number | null; minutes: number }
type PriceItem = {
  id: string
  name: Localized
  description?: Localized
  slug?: ServiceSlug
  variants: PriceVariant[]
}

const tableCopy = {
  pl: {
    title: "Pełny cennik usług",
    intro: "Aktualna oferta zgodna z Booksy. Wariant auta, cena początkowa i orientacyjny czas są podane przy każdej usłudze.",
    service: "Usługa", scope: "Zakres", variant: "Wariant", price: "Cena od", time: "Szacunkowy czas", from: "od", quote: "Wycena indywidualna", details: "Zobacz szczegóły usługi", scopeFallback: "Dokładny zakres dobierzemy do stanu auta podczas rezerwacji lub oględzin.",
    noticePrice: "Ceny od", noticePriceText: "Podane kwoty dotyczą przeciętnie zabrudzonego auta.",
    noticeTime: "Czas orientacyjny", noticeTimeText: "Rzeczywisty czas zależy od stanu i wielkości samochodu.",
    noticeCondition: "Mocne zabrudzenia", noticeConditionText: "Jeśli auto wymaga większego nakładu pracy, potwierdzimy koszt przed rozpoczęciem usługi.",
    coating: "Auto z dodatkową powłoką ochronną wymaga innych środków myjących. Do ceny mycia zewnętrznego doliczamy 20 zł.",
    washTitle: "Mycie i wnętrze", washIntro: "Podstawowe pakiety z ceną dobraną do wielkości samochodu.",
    detailingTitle: "Pielęgnacja i detailing", detailingIntro: "Zabiegi ochronne, renowacyjne i zmieniające wygląd auta.",
    saleTitle: "Pakiet Sprzedaż", saleIntro: "Kompleksowe przygotowanie samochodu, które podnosi jego atrakcyjność przed wystawieniem ogłoszenia.",
  },
  en: {
    title: "Complete price list",
    intro: "The current Booksy offer. Vehicle variant, starting price and estimated duration are shown for every service.",
    service: "Service", scope: "Scope", variant: "Variant", price: "Price from", time: "Estimated time", from: "from", quote: "Individual quote", details: "View service details", scopeFallback: "We match the exact scope to the condition of the car during booking or inspection.",
    noticePrice: "Starting prices", noticePriceText: "The listed amounts apply to an averagely soiled car.",
    noticeTime: "Estimated duration", noticeTimeText: "The actual duration depends on the condition and size of the car.",
    noticeCondition: "Heavy soiling", noticeConditionText: "If the car requires additional work, we confirm the cost before starting.",
    coating: "Cars with an additional protective coating require different cleaning products. We add PLN 20 to the exterior wash price.",
    washTitle: "Washing and interior", washIntro: "Core packages with prices matched to the size of the car.",
    detailingTitle: "Care and detailing", detailingIntro: "Protective, restorative and appearance-changing treatments.",
    saleTitle: "Sales Package", saleIntro: "Complete preparation that makes the car more attractive before it is listed for sale.",
  },
  de: {
    title: "Vollständige Preisliste",
    intro: "Das aktuelle Booksy-Angebot. Fahrzeugvariante, Startpreis und geschätzte Dauer stehen bei jeder Leistung.",
    service: "Leistung", scope: "Umfang", variant: "Variante", price: "Preis ab", time: "Geschätzte Dauer", from: "ab", quote: "Individuelle Preisermittlung", details: "Details ansehen", scopeFallback: "Den genauen Umfang stimmen wir bei der Buchung oder Besichtigung auf den Fahrzeugzustand ab.",
    noticePrice: "Preise ab", noticePriceText: "Die angegebenen Beträge gelten für ein durchschnittlich verschmutztes Auto.",
    noticeTime: "Ungefähre Dauer", noticeTimeText: "Die tatsächliche Dauer hängt von Zustand und Größe des Autos ab.",
    noticeCondition: "Starke Verschmutzung", noticeConditionText: "Bei höherem Arbeitsaufwand bestätigen wir die Kosten vor Beginn.",
    coating: "Autos mit zusätzlicher Schutzbeschichtung benötigen andere Reinigungsmittel. Für die Außenwäsche berechnen wir 20 PLN zusätzlich.",
    washTitle: "Wäsche und Innenraum", washIntro: "Grundpakete mit Preisen passend zur Fahrzeuggröße.",
    detailingTitle: "Pflege und Detailing", detailingIntro: "Schutz, Aufbereitung und optische Veränderungen des Fahrzeugs.",
    saleTitle: "Verkaufspaket", saleIntro: "Komplette Vorbereitung, die das Auto vor dem Verkauf attraktiver macht.",
  },
  uk: {
    title: "Повний прайс-лист",
    intro: "Актуальна пропозиція Booksy. Для кожної послуги вказані тип авто, початкова ціна та орієнтовний час.",
    service: "Послуга", scope: "Обсяг", variant: "Варіант", price: "Ціна від", time: "Орієнтовний час", from: "від", quote: "Індивідуальна оцінка", details: "Переглянути деталі", scopeFallback: "Точний обсяг робіт підберемо відповідно до стану авто під час запису або огляду.",
    noticePrice: "Ціни від", noticePriceText: "Вказані суми стосуються автомобіля із середнім рівнем забруднення.",
    noticeTime: "Орієнтовний час", noticeTimeText: "Фактичний час залежить від стану та розміру автомобіля.",
    noticeCondition: "Сильне забруднення", noticeConditionText: "Якщо потрібно більше роботи, ми підтвердимо вартість до її початку.",
    coating: "Для авто з додатковим захисним покриттям потрібні інші засоби. До зовнішнього миття додається 20 PLN.",
    washTitle: "Миття та салон", washIntro: "Основні пакети з ціною відповідно до розміру автомобіля.",
    detailingTitle: "Догляд і детейлінг", detailingIntro: "Захисні, відновлювальні та стилістичні процедури.",
    saleTitle: "Пакет для продажу", saleIntro: "Комплексна підготовка, яка підвищує привабливість автомобіля перед продажем.",
  },
} satisfies Record<Locale, Record<string, string>>

const sizeNames = {
  small: { pl: "Małe auto", en: "Small car", de: "Kleines Auto", uk: "Мале авто" },
  medium: { pl: "Średnie auto", en: "Medium car", de: "Mittelgroßes Auto", uk: "Середнє авто" },
  large: { pl: "Duże auto", en: "Large car", de: "Großes Auto", uk: "Велике авто" },
} satisfies Record<string, Localized>

const washItems: PriceItem[] = [
  { id: "exterior", name: { pl: "Mycie auta z zewnątrz", en: "Exterior car wash", de: "Außenwäsche", uk: "Зовнішнє миття авто" }, slug: "mycie-zewnatrz", variants: [
    { name: sizeNames.small, price: 110, minutes: 60 }, { name: sizeNames.medium, price: 120, minutes: 60 }, { name: sizeNames.large, price: 140, minutes: 60 },
  ] },
  { id: "interior", name: { pl: "Czyszczenie i mycie wnętrza", en: "Interior cleaning", de: "Innenraumreinigung", uk: "Чищення салону" }, slug: "czyszczenie-wnetrza", variants: [
    { name: sizeNames.small, price: 130, minutes: 60 }, { name: sizeNames.medium, price: 140, minutes: 60 }, { name: sizeNames.large, price: 160, minutes: 60 },
  ] },
  { id: "complete", name: { pl: "Komplet - mycie zewnątrz i wewnątrz", en: "Complete exterior and interior wash", de: "Komplettwäsche außen und innen", uk: "Комплекс - миття кузова та салону" }, slug: "komplet", variants: [
    { name: sizeNames.small, price: 220, minutes: 120 }, { name: sizeNames.medium, price: 240, minutes: 120 }, { name: sizeNames.large, price: 260, minutes: 120 },
  ] },
]

const detailingItems: PriceItem[] = [
  { id: "wax", name: { pl: "Ręczne woskowanie", en: "Hand waxing", de: "Handwachs", uk: "Ручне нанесення воску" }, slug: "woskowanie", variants: [{ price: 350, minutes: 120 }] },
  { id: "invisible-wiper", name: { pl: "Niewidzialna wycieraczka", en: "Hydrophobic glass coating", de: "Hydrophobe Glasversiegelung", uk: "Гідрофобне покриття скла" }, description: {
    pl: "Hydrofobowa powłoka na szyby, dzięki której krople wody łatwiej spływają pod wpływem pędu powietrza.", en: "A hydrophobic glass coating that helps water droplets run off while driving.", de: "Eine hydrophobe Glasversiegelung, durch die Wasser während der Fahrt leichter abperlt.", uk: "Гідрофобне покриття скла, завдяки якому краплі води легше стікають під час руху.",
  }, variants: [{ price: 200, minutes: 30 }] },
  { id: "ceramic-service", name: { pl: "Serwis powłoki ceramicznej", en: "Ceramic coating maintenance", de: "Keramikversiegelungs-Service", uk: "Обслуговування керамічного покриття" }, description: {
    pl: "Mycie, dekontaminacja i odświeżenie powłoki boosterem. Serwis zalecany co 6 miesięcy.", en: "Washing, decontamination and refreshing the coating with a booster. Recommended every 6 months.", de: "Wäsche, Dekontamination und Auffrischung mit einem Booster. Alle 6 Monate empfohlen.", uk: "Миття, деконтамінація та оновлення покриття бустером. Рекомендовано кожні 6 місяців.",
  }, variants: [{ price: 500, minutes: 180 }] },
  { id: "upholstery", name: { pl: "Pranie tapicerki", en: "Upholstery cleaning", de: "Polsterreinigung", uk: "Хімчистка оббивки" }, slug: "pranie-tapicerki", variants: [{ price: 400, minutes: 180 }] },
  { id: "leather", name: { pl: "Czyszczenie skór z impregnacją", en: "Leather cleaning and protection", de: "Lederreinigung und Imprägnierung", uk: "Чищення та захист шкіри" }, slug: "czyszczenie-skor", variants: [{ price: 350, minutes: 180 }] },
  { id: "wrap", name: { pl: "Oklejanie auta, szyb i lamp folią", en: "Car, window and lamp wrapping", de: "Folierung von Auto, Scheiben und Leuchten", uk: "Обклеювання авто, скла та фар плівкою" }, slug: "folia-ppf", variants: [{ price: null, minutes: 180 }] },
  { id: "correction", name: { pl: "Korekta lakieru, polerowanie, glinkowanie", en: "Paint correction, polishing and claying", de: "Lackkorrektur, Polieren und Kneten", uk: "Корекція лаку, полірування та очищення глиною" }, slug: "korekta-lakieru", variants: [{ price: null, minutes: 240 }] },
  { id: "coating", name: { pl: "Aplikacja powłoki ceramicznej lub kwarcowej", en: "Ceramic or quartz coating application", de: "Keramik- oder Quarzversiegelung", uk: "Нанесення керамічного або кварцового покриття" }, slug: "powloka-ceramiczna", variants: [{ price: null, minutes: 240 }] },
  { id: "dechroming", name: { pl: "Dechroming auta", en: "Car dechroming", de: "Dechroming des Fahrzeugs", uk: "Дехромінг авто" }, description: { pl: "Oklejenie chromowanych elementów auta.", en: "Wrapping the car's chrome trim.", de: "Folierung der verchromten Fahrzeugteile.", uk: "Обклеювання хромованих елементів авто." }, slug: "zmiana-koloru-dechroming", variants: [{ price: null, minutes: 240 }] },
]

const saleItems: PriceItem[] = [
  { id: "sale-standard", name: { pl: "Pakiet Sprzedaż Standard", en: "Standard Sales Package", de: "Verkaufspaket Standard", uk: "Стандартний пакет для продажу" }, description: {
    pl: "Mycie detailingowe wnętrza i nadwozia, pranie tapicerki lub czyszczenie skór z impregnacją oraz woskowanie.", en: "Interior and exterior detailing, upholstery cleaning or leather care, plus waxing.", de: "Innen- und Außendetailing, Polster- oder Lederreinigung sowie Wachs.", uk: "Детейлінг салону та кузова, хімчистка оббивки або догляд за шкірою та нанесення воску.",
  }, variants: [{ price: 1000, minutes: 240 }] },
  { id: "sale-premium", name: { pl: "Pakiet Sprzedaż Premium z korektą lakieru", en: "Premium Sales Package with paint correction", de: "Verkaufspaket Premium mit Lackkorrektur", uk: "Преміум пакет для продажу з корекцією лаку" }, description: {
    pl: "Zakres Standard rozszerzony o glinkowanie i korektę lakieru w zakresie ustalonym po oględzinach.", en: "The Standard package extended with claying and paint correction agreed after inspection.", de: "Das Standardpaket ergänzt um Lackkneten und eine nach Besichtigung vereinbarte Lackkorrektur.", uk: "Стандартний пакет, доповнений очищенням глиною та корекцією лаку після огляду.",
  }, variants: [{ price: 1400, minutes: 240 }] },
]

function duration(minutes: number, locale: Locale) {
  if (minutes < 60) return `${minutes} min`
  const hours = minutes / 60
  return locale === "pl" ? `ok. ${hours} godz.` : locale === "de" ? `ca. ${hours} Std.` : locale === "uk" ? `бл. ${hours} год.` : `approx. ${hours} hr`
}

function PriceScope({ item, scope, locale }: { item: PriceItem; scope: string[]; locale: Locale }) {
  const copy = tableCopy[locale]
  return <details className="price-scope group">
    <summary aria-label={`${copy.scope}: ${item.name[locale]}`} className="flex min-h-11 list-none items-center justify-between gap-4 text-sm font-semibold text-white/75 transition-colors hover:text-white">{copy.scope}<span aria-hidden="true" className="text-xl font-normal text-brand group-open:rotate-45">+</span></summary>
    {scope.length > 0
      ? <ul className="grid gap-x-8 gap-y-2 pb-4 pt-2 text-sm leading-relaxed text-white/70 sm:grid-cols-2 lg:grid-cols-3">{scope.map(entry => <li key={entry} className="flex items-start gap-3"><span className="mt-2 size-1 shrink-0 bg-brand" aria-hidden="true" /><span>{entry}</span></li>)}</ul>
      : <p className="pb-4 pt-2 text-sm leading-relaxed text-white/70">{item.description?.[locale] ?? copy.scopeFallback}</p>}
  </details>
}

function WashMatrix({ locale, scopeFor }: { locale: Locale; scopeFor: (item: PriceItem) => string[] }) {
  const copy = tableCopy[locale]
  const currency = locale === "pl" ? "zł" : "PLN"
  return <section id="mycie" aria-labelledby="mycie-title" className="scroll-mt-28 border-b border-white/10 py-12 lg:py-14">
    <div className="mb-8 grid gap-4 lg:grid-cols-12 lg:items-end">
      <h3 id="mycie-title" className="type-h2 lg:col-span-7">{copy.washTitle}</h3>
      <p className="max-w-xl text-base leading-relaxed text-white/65 lg:col-span-5">{copy.washIntro}</p>
    </div>
    <table className="pricing-matrix w-full table-fixed border-collapse text-left">
      <caption className="sr-only">{copy.washTitle} - {copy.price}, {copy.time}</caption>
      <thead><tr className="border-y border-white/15 text-sm font-semibold text-white/65">
        <th scope="col" className="w-[43%] py-4 pr-6">{copy.service}</th>
        {[sizeNames.small, sizeNames.medium, sizeNames.large].map(size => <th key={size[locale]} scope="col" className="w-[19%] py-4 text-right">{size[locale]}</th>)}
      </tr></thead>
      <tbody>{washItems.map(item => <Fragment key={item.id}>
        <tr>
          <th scope="row" className="py-6 pr-6 font-normal">
            <span className="block font-display text-xl font-bold leading-snug text-white">{item.name[locale]}</span>
            <span className="mt-2 flex items-center gap-2 text-sm text-white/60"><Clock3 className="size-3.5 text-brand" aria-hidden="true" /><span className="sr-only">{copy.time}: </span>{duration(item.variants[0].minutes, locale)}</span>
            {locale === "pl" && item.slug && <Link prefetch={false} href={`/${item.slug}`} className="group mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 hover:text-white"><span className="link-draw">{copy.details}</span><ArrowRight className="arrow-shift size-3.5 text-brand" aria-hidden="true" /></Link>}
          </th>
          {item.variants.map((variant, index) => <td key={index} className="py-6 text-right align-top">
            <span className="pricing-mobile-label mb-2 text-xs leading-relaxed text-white/65">{variant.name?.[locale]}</span>
            <span className="block text-lg font-bold leading-relaxed tabular-nums text-white sm:text-xl"><span className="text-xs font-normal text-white/60">{copy.from}</span> {variant.price} <span className="text-sm font-medium">{currency}</span></span>
          </td>)}
        </tr>
        <tr className="pricing-scope-row border-b border-white/12"><td colSpan={4} className="pb-4"><PriceScope item={item} scope={scopeFor(item)} locale={locale} /></td></tr>
      </Fragment>)}</tbody>
    </table>
  </section>
}

function PriceGroup({ id, title, intro, items, locale, scopeFor }: { id: string; title: string; intro: string; items: PriceItem[]; locale: Locale; scopeFor?: (item: PriceItem) => string[] }) {
  const copy = tableCopy[locale]
  const currency = locale === "pl" ? "zł" : "PLN"
  return (
    <section id={id} aria-labelledby={id + "-title"} className="scroll-mt-28 border-b border-white/10 py-12 last:border-b-0 lg:py-14">
      <div className="mb-8 grid gap-4 lg:grid-cols-12 lg:items-end">
        <h3 id={id + "-title"} className="type-h2 lg:col-span-7">{title}</h3>
        <p className="max-w-xl text-sm leading-relaxed text-white/65 lg:col-span-5">{intro}</p>
      </div>
      <table className="price-catalog-table block w-full table-fixed border-collapse text-left lg:table">
        <caption className="sr-only">{title} - {copy.price} / {copy.time}</caption>
        <thead className="sr-only lg:not-sr-only lg:table-header-group">
          <tr className="border-y border-white/15 text-xs font-semibold text-white/65">
            <th scope="col" className="w-[40%] py-4 pr-6">{copy.service}</th>
            <th scope="col" className="w-[35%] py-4 pr-8">{copy.scope}</th>
            <th scope="col" className="w-[25%] py-4 text-right">{copy.price} / {copy.time}</th>
          </tr>
        </thead>
        <tbody className="block lg:table-row-group">
          {items.map(item => {
            const href = locale === "pl" && item.slug ? "/" + item.slug : null
            const scope = scopeFor?.(item) ?? []
            return <tr key={item.id} className="grid min-w-0 gap-3 border-b border-white/12 py-6 align-top sm:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)] sm:gap-x-8 lg:table-row lg:py-0">
              <th scope="row" className="block min-w-0 font-normal sm:col-start-1 lg:table-cell lg:py-7 lg:pr-8">
                <span className="block text-pretty font-display text-xl font-bold leading-snug text-white">{item.name[locale]}</span>
                {href && <Link prefetch={false} href={href} className="group mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 hover:text-white"><span className="link-draw">{copy.details}</span><ArrowRight className="arrow-shift size-3.5 text-brand" aria-hidden="true" /></Link>}
              </th>
              <td className="block min-w-0 sm:col-start-1 lg:table-cell lg:py-7 lg:pr-8">
                <PriceScope item={item} scope={scope} locale={locale} />
              </td>
              <td className="block min-w-0 pt-2 sm:col-start-2 sm:row-start-1 sm:row-span-2 sm:pt-0 lg:table-cell lg:py-7">
                <dl className="divide-y divide-white/10">
                  {item.variants.map((variant, index) => <div key={index} className="flex min-w-0 flex-col gap-2 py-3 first:pt-0 sm:items-end sm:text-right">
                    <dt className={variant.name ? "text-sm leading-relaxed text-white/75" : "sr-only"}>{variant.name?.[locale] ?? copy.price}</dt>
                    <dd className="text-lg font-bold leading-relaxed tabular-nums text-white">{variant.price === null ? copy.quote : <><span className="text-sm font-normal text-white/60">{copy.from}</span> {variant.price} <span className="text-sm font-medium">{currency}</span></>}</dd>
                    <dt className="sr-only">{copy.time}</dt>
                    <dd className="flex items-center gap-2 text-sm leading-relaxed text-white/60"><Clock3 className="size-3.5 text-brand" aria-hidden="true" />{duration(variant.minutes, locale)}</dd>
                  </div>)}
                </dl>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </section>
  )
}

export function PricingPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const pricing = src.pricing
  const t = ui[locale]
  const copy = tableCopy[locale]
  const exteriorScope = pricing.packages[1]?.items ?? []
  const interiorScope = pricing.packages[0]?.items ?? []
  const washScope = (item: PriceItem) => item.id === "exterior" ? exteriorScope : item.id === "interior" ? interiorScope : [...exteriorScope, ...interiorScope]

  return (
    <SiteShell locale={locale} page="pricing">

      <section aria-labelledby="page-title" className="relative border-b border-white/10 bg-[#101011] pt-(--header-h)">
        <div className="shell-wide grid items-center gap-10 pb-12 pt-24 sm:pb-16 lg:grid-cols-12 lg:gap-16 lg:pt-28">
          <div className="lg:col-span-8"><p className="eyebrow mb-5">Boruch Myjnia / Booksy</p><h1 id="page-title" className="page-hero-title type-h1">{t.nav.pricing}</h1><p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">{copy.intro}</p></div>
          <div className="lg:col-span-4"><div className="frame editorial-photo aspect-[16/8] sm:aspect-[16/7] lg:aspect-[4/3]"><Photo id="p51" priority sizes="(min-width: 1600px) 450px, (min-width: 1024px) 30vw, 92vw" position="55% 58%" /></div></div>
        </div>
      </section>

      <nav aria-label={copy.title} className="sticky top-(--header-h) z-30 border-b border-white/10 bg-[#101011]">
        <ul className="shell-wide grid grid-cols-3 gap-3 py-2 sm:flex sm:gap-8">
          {[["mycie", copy.washTitle], ["detailing", copy.detailingTitle], ["pakiet-sprzedaz", copy.saleTitle]].map(([id, label]) => <li key={id}><a href={`#${id}`} className="group flex min-h-12 items-center gap-2 text-xs font-semibold leading-relaxed text-white/75 transition-colors hover:text-white sm:text-sm"><span className="link-draw">{label}</span><ArrowRight className="hidden size-3.5 shrink-0 text-brand sm:block" aria-hidden="true" /></a></li>)}
        </ul>
      </nav>

      <section aria-labelledby="price-list-title" className="border-b border-white/10 bg-[#0a0a0b] py-12 sm:py-16 lg:py-20">
        <div className="shell-wide">
          <h2 id="price-list-title" className="sr-only">{copy.title}</h2>
          <div className="grid gap-x-10 border-b border-white/10 sm:grid-cols-3">{[[copy.noticePrice, copy.noticePriceText], [copy.noticeTime, copy.noticeTimeText], [copy.noticeCondition, copy.noticeConditionText]].map(([title, text]) => <div key={title} className="border-b border-white/10 py-5 last:border-b-0 sm:border-b-0 sm:pb-8"><strong className="text-sm font-semibold text-white/85">{title}</strong><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">{text}</p></div>)}</div>
          <WashMatrix locale={locale} scopeFor={washScope} />
          <p className="my-6 border-l border-brand py-1 pl-5 text-sm leading-relaxed text-white/65">{copy.coating}</p>
          <PriceGroup id="detailing" title={copy.detailingTitle} intro={copy.detailingIntro} items={detailingItems} locale={locale} />
          <PriceGroup id="pakiet-sprzedaz" title={copy.saleTitle} intro={copy.saleIntro} items={saleItems} locale={locale} />
        </div>
      </section>
    </SiteShell>
  )
}
