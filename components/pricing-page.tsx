import { Fragment } from "react"
import Link from "next/link"
import {
  Armchair,
  ArrowRight,
  Brush,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Layers3,
  Palette,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react"

import { SiteShell } from "./site-shell"
import { routes, sources, ui, type Locale } from "@/lib/content"
import type { ServiceSlug } from "@/lib/content/services"

type Localized = Record<Locale, string>

type PriceVariant = { name?: Localized; price: number | null; minutes: number | null }

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

    intro: "Pełna oferta Boruch Myjnia. Cena w zależności od rozmiaru auta i orientacyjny czas wykonania usługi.",

    service: "Usługa", scope: "Zakres", variant: "Wariant", price: "Cena od", time: "Szacunkowy czas", from: "od", quote: "Wycena indywidualna", timeQuote: "Czas ustalany indywidualnie", servicesButton: "Zobacz wszystkie usługi", scopeFallback: "Dokładny zakres dobierzemy do stanu auta podczas rezerwacji lub oględzin.",

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

    service: "Service", scope: "Scope", variant: "Variant", price: "Price from", time: "Estimated time", from: "from", quote: "Individual quote", timeQuote: "Duration agreed individually", servicesButton: "View all services", scopeFallback: "We match the exact scope to the condition of the car during booking or inspection.",

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

    service: "Leistung", scope: "Umfang", variant: "Variante", price: "Preis ab", time: "Geschätzte Dauer", from: "ab", quote: "Individuelle Preisermittlung", timeQuote: "Dauer individuell vereinbart", servicesButton: "Alle Leistungen ansehen", scopeFallback: "Den genauen Umfang stimmen wir bei der Buchung oder Besichtigung auf den Fahrzeugzustand ab.",

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

    service: "Послуга", scope: "Обсяг", variant: "Варіант", price: "Ціна від", time: "Орієнтовний час", from: "від", quote: "Індивідуальна оцінка", timeQuote: "Час виконання визначається індивідуально", servicesButton: "Переглянути всі послуги", scopeFallback: "Точний обсяг робіт підберемо відповідно до стану авто під час запису або огляду.",

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

  { id: "wrap", name: { pl: "Oklejanie auta, szyb i lamp folią", en: "Car, window and lamp wrapping", de: "Folierung von Auto, Scheiben und Leuchten", uk: "Обклеювання авто, скла та фар плівкою" }, slug: "folia-ppf", variants: [{ price: null, minutes: null }] },

  { id: "correction", name: { pl: "Korekta lakieru, polerowanie, glinkowanie", en: "Paint correction, polishing and claying", de: "Lackkorrektur, Polieren und Kneten", uk: "Корекція лаку, полірування та очищення глиною" }, slug: "korekta-lakieru", variants: [{ price: null, minutes: null }] },

  { id: "coating", name: { pl: "Aplikacja powłoki ceramicznej lub kwarcowej", en: "Ceramic or quartz coating application", de: "Keramik- oder Quarzversiegelung", uk: "Нанесення керамічного або кварцового покриття" }, slug: "powloka-ceramiczna", variants: [{ price: null, minutes: null }] },

  { id: "dechroming", name: { pl: "Dechroming auta", en: "Car dechroming", de: "Dechroming des Fahrzeugs", uk: "Дехромінг авто" }, description: { pl: "Oklejenie chromowanych elementów auta.", en: "Wrapping the car's chrome trim.", de: "Folierung der verchromten Fahrzeugteile.", uk: "Обклеювання хромованих елементів авто." }, slug: "zmiana-koloru-dechroming", variants: [{ price: null, minutes: null }] },

]

const saleItems: PriceItem[] = [

  { id: "sale-standard", name: { pl: "Pakiet Sprzedaż Standard", en: "Standard Sales Package", de: "Verkaufspaket Standard", uk: "Стандартний пакет для продажу" }, description: {

    pl: "Mycie detailingowe wnętrza i nadwozia, pranie tapicerki lub czyszczenie skór z impregnacją oraz woskowanie.", en: "Interior and exterior detailing, upholstery cleaning or leather care, plus waxing.", de: "Innen- und Außendetailing, Polster- oder Lederreinigung sowie Wachs.", uk: "Детейлінг салону та кузова, хімчистка оббивки або догляд за шкірою та нанесення воску.",

  }, variants: [{ price: 1000, minutes: 240 }] },

  { id: "sale-premium", name: { pl: "Pakiet Sprzedaż Premium z korektą lakieru", en: "Premium Sales Package with paint correction", de: "Verkaufspaket Premium mit Lackkorrektur", uk: "Преміум пакет для продажу з корекцією лаку" }, description: {

    pl: "Zakres Standard rozszerzony o glinkowanie i korektę lakieru w zakresie ustalonym po oględzinach.", en: "The Standard package extended with claying and paint correction agreed after inspection.", de: "Das Standardpaket ergänzt um Lackkneten und eine nach Besichtigung vereinbarte Lackkorrektur.", uk: "Стандартний пакет, доповнений очищенням глиною та корекцією лаку після огляду.",

  }, variants: [{ price: 1400, minutes: 240 }] },

]

const pageCopy = {
  pl: {
    eyebrow: "Boruch Myjnia / Cennik",
    headline: "Wybierz zakres. Porównaj ceny.",
    heroText: "Od regularnego mycia po ochronę lakieru. Wszystkie usługi, ceny od i orientacyjny czas w jednym miejscu.",
    jump: "Przejdź do cennika",
    navLabel: "Kategorie cennika",
    washNav: "Myjnia",
    detailingNav: "Detailing",
    saleNav: "Pakiet Sprzedaż",
    rulesTitle: "Zanim wybierzesz",
    scopeToggle: "Co obejmuje usługa?",
    compareLabel: "Porównanie cen myjni według wielkości auta",
    individual: "Zakres ustalamy po oględzinach",
    individualIntro: "Przy tych usługach stan auta i wybrany zakres mają największy wpływ na cenę.",
    fixedTitle: "Pielęgnacja z ceną od",
    bundle: "W komplecie taniej",
    bundleText: "Mycie z zewnątrz i czyszczenie wnętrza w jednej usłudze.",
    separately: "Osobno",
    saving: "Taniej o",
    coatingTitle: "Masz powłokę ochronną?",
    standard: "Standard",
    premium: "Premium",
    saleKicker: "Przygotowanie do sprzedaży",
    premiumNote: "Standard + korekta lakieru",
    standardNote: "Wnętrze + nadwozie + wosk",
    timeShort: "Orientacyjny czas",
    finalKicker: "Najpierw zakres, potem termin",
    finalTitle: "Cena to nie wszystko. Poznaj zakres.",
    finalText: "Sprawdź, co obejmują poszczególne usługi. Dokładny koszt prac potwierdzimy przed ich rozpoczęciem.",
    finalButton: "Poznaj nasze usługi",
    back: "Wróć do myjni",
  },
  en: {
    eyebrow: "Boruch Myjnia / Pricing",
    headline: "Choose the scope. Compare the prices.",
    heroText: "From regular washing to paint protection. Every service, starting price and estimated duration in one place.",
    jump: "Explore the price list",
    navLabel: "Pricing categories",
    washNav: "Car wash",
    detailingNav: "Detailing",
    saleNav: "Sales Package",
    rulesTitle: "Before you choose",
    scopeToggle: "What does the service include?",
    compareLabel: "Car wash prices by vehicle size",
    individual: "Scope agreed after inspection",
    individualIntro: "For these services, the vehicle's condition and the agreed scope have the greatest effect on the price.",
    fixedTitle: "Care with a starting price",
    bundle: "Better value together",
    bundleText: "Exterior washing and interior cleaning in one service.",
    separately: "Separately",
    saving: "Save",
    coatingTitle: "Does your car have a protective coating?",
    standard: "Standard",
    premium: "Premium",
    saleKicker: "Preparing your car for sale",
    premiumNote: "Standard + paint correction",
    standardNote: "Interior + exterior + wax",
    timeShort: "Estimated duration",
    finalKicker: "Choose the scope first",
    finalTitle: "Look beyond the price. Explore the scope.",
    finalText: "Find out what each service includes. We confirm the exact cost before starting the work.",
    finalButton: "Explore our services",
    back: "Back to car wash prices",
  },
  de: {
    eyebrow: "Boruch Myjnia / Preise",
    headline: "Umfang wählen. Preise vergleichen.",
    heroText: "Von der regelmäßigen Wäsche bis zum Lackschutz. Alle Leistungen, Einstiegspreise und ungefähren Zeiten an einem Ort.",
    jump: "Zur Preisliste",
    navLabel: "Kategorien der Preisliste",
    washNav: "Autowäsche",
    detailingNav: "Detailing",
    saleNav: "Verkaufspaket",
    rulesTitle: "Vor Ihrer Auswahl",
    scopeToggle: "Was ist enthalten?",
    compareLabel: "Waschpreise nach Fahrzeuggröße",
    individual: "Umfang nach Besichtigung",
    individualIntro: "Bei diesen Leistungen bestimmen Fahrzeugzustand und vereinbarter Umfang den Preis maßgeblich.",
    fixedTitle: "Pflege mit Einstiegspreis",
    bundle: "Im Paket günstiger",
    bundleText: "Außenwäsche und Innenraumreinigung in einer Leistung.",
    separately: "Einzeln",
    saving: "Sie sparen",
    coatingTitle: "Hat Ihr Auto eine Schutzbeschichtung?",
    standard: "Standard",
    premium: "Premium",
    saleKicker: "Vorbereitung für den Verkauf",
    premiumNote: "Standard + Lackkorrektur",
    standardNote: "Innenraum + Karosserie + Wachs",
    timeShort: "Ungefähre Dauer",
    finalKicker: "Zuerst den Umfang wählen",
    finalTitle: "Mehr als ein Preis. Der genaue Umfang.",
    finalText: "Erfahren Sie, was die einzelnen Leistungen umfassen. Die genauen Kosten bestätigen wir vor Arbeitsbeginn.",
    finalButton: "Unsere Leistungen ansehen",
    back: "Zurück zu den Waschpreisen",
  },
  uk: {
    eyebrow: "Boruch Myjnia / Ціни",
    headline: "Оберіть обсяг. Порівняйте ціни.",
    heroText: "Від регулярного миття до захисту лаку. Усі послуги, початкові ціни та орієнтовний час в одному місці.",
    jump: "Перейти до цін",
    navLabel: "Категорії прайс-листа",
    washNav: "Мийка",
    detailingNav: "Детейлінг",
    saleNav: "Пакет для продажу",
    rulesTitle: "Перш ніж обрати",
    scopeToggle: "Що входить до послуги?",
    compareLabel: "Порівняння цін на миття за розміром авто",
    individual: "Обсяг визначаємо після огляду",
    individualIntro: "Для цих послуг найбільший вплив на ціну мають стан авто та узгоджений обсяг робіт.",
    fixedTitle: "Догляд із початковою ціною",
    bundle: "Разом вигідніше",
    bundleText: "Миття кузова та чищення салону в одній послузі.",
    separately: "Окремо",
    saving: "Економія",
    coatingTitle: "Ваше авто має захисне покриття?",
    standard: "Standard",
    premium: "Premium",
    saleKicker: "Підготовка авто до продажу",
    premiumNote: "Standard + корекція лаку",
    standardNote: "Салон + кузов + віск",
    timeShort: "Орієнтовний час",
    finalKicker: "Спочатку оберіть обсяг",
    finalTitle: "Не лише ціна. Дізнайтеся про обсяг.",
    finalText: "Перегляньте, що включають окремі послуги. Точну вартість підтвердимо до початку робіт.",
    finalButton: "Переглянути наші послуги",
    back: "Повернутися до цін на миття",
  },
} satisfies Record<Locale, Record<string, string>>

const numberLocales: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-GB",
  de: "de-DE",
  uk: "uk-UA",
}

const itemIcons: Record<string, typeof Droplets> = {
  exterior: Droplets,
  interior: Armchair,
  complete: Layers3,
  wax: Sparkles,
  "invisible-wiper": Droplets,
  "ceramic-service": ShieldCheck,
  upholstery: Brush,
  leather: Armchair,
  wrap: Layers3,
  correction: Sparkles,
  coating: ShieldCheck,
  dechroming: Palette,
}

function formatAmount(value: number, locale: Locale) {
  return new Intl.NumberFormat(numberLocales[locale], {
    maximumFractionDigits: 0,
  }).format(value)
}

function duration(minutes: number | null, locale: Locale) {
  if (minutes === null) return tableCopy[locale].timeQuote

  const number = new Intl.NumberFormat(numberLocales[locale], {
    maximumFractionDigits: 1,
  })

  if (minutes < 60) return number.format(minutes) + " min"

  const hours = number.format(minutes / 60)
  if (locale === "pl") return "ok. " + hours + " godz."
  if (locale === "de") return "ca. " + hours + " Std."
  if (locale === "uk") return "бл. " + hours + " год."
  return "approx. " + hours + " hr"
}

function PriceAmount({ value, locale }: { value: number | null; locale: Locale }) {
  if (value === null) {
    return <span className="pc-quote">{tableCopy[locale].quote}</span>
  }

  return (
    <span className="pc-price">
      <span className="pc-price-from">{tableCopy[locale].from}</span>
      <span className="pc-price-number">{formatAmount(value, locale)}</span>
      <span className="pc-currency">{locale === "pl" ? "zł" : "PLN"}</span>
    </span>
  )
}

function ServiceIcon({ id }: { id: string }) {
  const Icon = itemIcons[id] ?? Sparkles
  return <Icon aria-hidden="true" strokeWidth={1.5} />
}

function TimeLabel({ minutes, locale, announceLabel = true }: { minutes: number | null; locale: Locale; announceLabel?: boolean }) {
  return (
    <span className="pc-time">
      <Clock3 aria-hidden="true" strokeWidth={1.6} />
      <span>
        {announceLabel && <span className="pc-sr-only">{tableCopy[locale].time}: </span>}
        {duration(minutes, locale)}
      </span>
    </span>
  )
}

function PriceScope({ item, scope, locale }: { item: PriceItem; scope: string[]; locale: Locale }) {
  const copy = tableCopy[locale]
  const design = pageCopy[locale]
  const content = scope.length > 0 ? (
    <ul className="pc-scope-list" role="list">
      {scope.map((entry, index) => (
        <li key={entry + "-" + index}>
          <Check aria-hidden="true" strokeWidth={1.7} />
          <span>{entry}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p>{item.description?.[locale] ?? copy.scopeFallback}</p>
  )

  return (
    <>
    <details className="pc-scope">
      <summary>
        <span>{design.scopeToggle}<span className="pc-sr-only">: {item.name[locale]}</span></span>
        <ChevronDown aria-hidden="true" strokeWidth={1.6} />
      </summary>
      <div className="pc-scope-content">
        {content}
      </div>
    </details>
    <div className="pc-print-scope pc-scope-content" aria-hidden="true">{content}</div>
    </>
  )
}

// Savings are calculated from the supplied prices, not stored as a separate promotion.
function separateWashPrice(index: number) {
  const exterior = washItems.find(item => item.id === "exterior")?.variants[index]?.price
  const interior = washItems.find(item => item.id === "interior")?.variants[index]?.price
  return typeof exterior === "number" && typeof interior === "number" ? exterior + interior : null
}

function WashPrice({
  item,
  variant,
  index,
  locale,
}: {
  item: PriceItem
  variant: PriceVariant
  index: number
  locale: Locale
}) {
  const design = pageCopy[locale]
  const currency = locale === "pl" ? "zł" : "PLN"
  const separate = item.id === "complete" ? separateWashPrice(index) : null
  const saving = separate !== null && variant.price !== null ? separate - variant.price : 0

  return (
    <div className="pc-wash-price">
      {saving > 0 && separate !== null && (
        <span className="pc-separate">
          {design.separately} {tableCopy[locale].from} <del>{formatAmount(separate, locale)} {currency}</del>
        </span>
      )}
      <PriceAmount value={variant.price} locale={locale} />
      {saving > 0 && (
        <span className="pc-saving">{design.saving} {formatAmount(saving, locale)} {currency}</span>
      )}
    </div>
  )
}

function SectionHeading({
  id,
  label,
  title,
  description,
}: {
  id: string
  label: string
  title: string
  description: string
}) {
  return (
    <header className="pc-section-heading">
      <div>
        <p className="pc-kicker">{label}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <p className="pc-section-intro">{description}</p>
    </header>
  )
}

function WashMatrix({ locale, scopeFor }: { locale: Locale; scopeFor: (item: PriceItem) => string[] }) {
  const copy = tableCopy[locale]
  const design = pageCopy[locale]
  const sizes = [sizeNames.small, sizeNames.medium, sizeNames.large]

  return (
    <section id="mycie" className="pc-section pc-wash" aria-labelledby="mycie-title">
      <div className="pc-shell">
        <SectionHeading
          id="mycie-title"
          label={design.washNav}
          title={copy.washTitle}
          description={copy.washIntro}
        />

        {/* A real table on desktop; separate service blocks on mobile.
            CSS shows only one version, including in the accessibility tree. */}
        <div className="pc-matrix-desktop">
          <table className="pc-matrix">
            <caption className="pc-sr-only">{design.compareLabel}. {copy.price}, {copy.time}.</caption>
            <colgroup>
              <col className="pc-service-col" />
              <col className="pc-size-col" span={3} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{copy.service}</th>
                {sizes.map((size, index) => (
                  <th scope="col" key={index}>
                    <span className="pc-size-heading">
                      <CarFront aria-hidden="true" strokeWidth={1.5} />
                      {size[locale]}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {washItems.map(item => (
                <Fragment key={item.id}>
                  <tr className={item.id === "complete" ? "pc-matrix-service pc-bundle-row" : "pc-matrix-service"}>
                    <th scope="row">
                      <div className="pc-service-heading">
                        <span className="pc-icon"><ServiceIcon id={item.id} /></span>
                        <div>
                          {item.id === "complete" && <span className="pc-bundle-label">{design.bundle}</span>}
                          <span className="pc-service-name">{item.name[locale]}</span>
                          <TimeLabel minutes={item.variants[0]?.minutes ?? null} locale={locale} />
                        </div>
                      </div>
                    </th>
                    {item.variants.map((variant, index) => (
                      <td key={index}>
                        <WashPrice item={item} variant={variant} index={index} locale={locale} />
                      </td>
                    ))}
                  </tr>
                  <tr className={item.id === "complete" ? "pc-matrix-scope pc-bundle-row" : "pc-matrix-scope"}>
                    <td colSpan={4}>
                      <PriceScope item={item} scope={scopeFor(item)} locale={locale} />
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pc-matrix-mobile">
          <ul className="pc-wash-list" role="list">
            {washItems.map(item => (
              <li key={item.id}>
                <article className={item.id === "complete" ? "pc-wash-block pc-bundle-block" : "pc-wash-block"}>
                  <div className="pc-service-heading">
                    <span className="pc-icon"><ServiceIcon id={item.id} /></span>
                    <div>
                      {item.id === "complete" && <span className="pc-bundle-label">{design.bundle}</span>}
                      <h3 className="pc-service-name">{item.name[locale]}</h3>
                      <TimeLabel minutes={item.variants[0]?.minutes ?? null} locale={locale} />
                    </div>
                  </div>
                  <dl className="pc-mobile-prices">
                    {item.variants.map((variant, index) => (
                      <div key={index}>
                        <dt>{variant.name?.[locale] ?? copy.variant}</dt>
                        <dd><WashPrice item={item} variant={variant} index={index} locale={locale} /></dd>
                      </div>
                    ))}
                  </dl>
                  <PriceScope item={item} scope={scopeFor(item)} locale={locale} />
                </article>
              </li>
            ))}
          </ul>
        </div>

        <aside className="pc-coating" aria-label={design.coatingTitle}>
          <ShieldCheck aria-hidden="true" strokeWidth={1.5} />
          <div>
            <h3>{design.coatingTitle}</h3>
            <p>{copy.coating}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function DetailRows({ items, locale }: { items: PriceItem[]; locale: Locale }) {
  const copy = tableCopy[locale]

  return (
    <ul className="pc-detail-list" role="list">
      {items.map(item => (
        <li key={item.id}>
          <article className="pc-detail-row">
            <div className="pc-detail-description">
              <span className="pc-icon"><ServiceIcon id={item.id} /></span>
              <div>
                <h4 className="pc-service-name">{item.name[locale]}</h4>
                {item.description && <p>{item.description[locale]}</p>}
              </div>
            </div>
            <div className="pc-detail-values">
              {item.variants.map((variant, index) => (
                <dl className="pc-detail-variant" key={index}>
                  <div>
                    <dt className="pc-sr-only">{variant.name?.[locale] ?? copy.price}</dt>
                    <dd><PriceAmount value={variant.price} locale={locale} /></dd>
                  </div>
                  <div className="pc-detail-duration">
                    <dt className="pc-sr-only">{copy.time}</dt>
                    <dd><TimeLabel minutes={variant.minutes} locale={locale} announceLabel={false} /></dd>
                  </div>
                </dl>
              ))}
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

function DetailingPrices({ locale }: { locale: Locale }) {
  const copy = tableCopy[locale]
  const design = pageCopy[locale]
  const withPrice = detailingItems.filter(item => item.variants.some(variant => variant.price !== null))
  const individual = detailingItems.filter(item => item.variants.every(variant => variant.price === null))

  return (
    <section id="detailing" className="pc-section pc-detailing" aria-labelledby="detailing-title">
      <div className="pc-shell">
        <SectionHeading
          id="detailing-title"
          label={design.detailingNav}
          title={copy.detailingTitle}
          description={copy.detailingIntro}
        />
        {withPrice.length > 0 && (
          <div className="pc-catalog-group">
            <h3 className="pc-catalog-label">{design.fixedTitle}</h3>
            <DetailRows items={withPrice} locale={locale} />
          </div>
        )}
        {individual.length > 0 && (
          <div className="pc-catalog-group pc-individual-group">
            <div className="pc-individual-heading">
              <h3 className="pc-catalog-label">{design.individual}</h3>
              <p>{design.individualIntro}</p>
            </div>
            <DetailRows items={individual} locale={locale} />
          </div>
        )}
      </div>
    </section>
  )
}

function SalesPackages({ locale }: { locale: Locale }) {
  const copy = tableCopy[locale]
  const design = pageCopy[locale]

  return (
    <section id="pakiet-sprzedaz" className="pc-section pc-sales" aria-labelledby="pakiet-sprzedaz-title">
      <div className="pc-shell">
        <SectionHeading
          id="pakiet-sprzedaz-title"
          label={design.saleKicker}
          title={copy.saleTitle}
          description={copy.saleIntro}
        />
        <div className="pc-sale-grid">
          {saleItems.map((item, index) => (
            <article className={index === 1 ? "pc-sale-package pc-sale-premium" : "pc-sale-package"} key={item.id}>
              <div className="pc-sale-head">
                <span className="pc-icon">
                  {index === 1
                    ? <Sparkles aria-hidden="true" strokeWidth={1.5} />
                    : <CarFront aria-hidden="true" strokeWidth={1.5} />}
                </span>
                <h3 aria-label={item.name[locale]}>{index === 1 ? design.premium : design.standard}</h3>
              </div>
              <p className="pc-sale-note">{index === 1 ? design.premiumNote : design.standardNote}</p>
              <p className="pc-sale-description">{item.description?.[locale] ?? copy.scopeFallback}</p>
              <div className="pc-sale-values">
                {item.variants.map((variant, variantIndex) => (
                  <dl key={variantIndex} className="pc-sale-variant">
                    <div>
                      <dt className="pc-sr-only">{variant.name?.[locale] ?? copy.price}</dt>
                      <dd><PriceAmount value={variant.price} locale={locale} /></dd>
                    </div>
                    <div>
                      <dt className="pc-value-label">{design.timeShort}</dt>
                      <dd><TimeLabel minutes={variant.minutes} locale={locale} announceLabel={false} /></dd>
                    </div>
                  </dl>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingPage({ locale }: { locale: Locale }) {
  const copy = tableCopy[locale]
  const design = pageCopy[locale]
  const t = ui[locale]
  const pricing = sources[locale].pricing
  const exteriorScope = pricing.packages[1]?.items ?? []
  const interiorScope = pricing.packages[0]?.items ?? []

  const scopeFor = (item: PriceItem) => {
    if (item.id === "exterior") return exteriorScope
    if (item.id === "interior") return interiorScope
    return Array.from(new Set([...exteriorScope, ...interiorScope]))
  }

  const categories = [
    { id: "mycie", label: design.washNav, Icon: Droplets },
    { id: "detailing", label: design.detailingNav, Icon: ShieldCheck },
    { id: "pakiet-sprzedaz", label: design.saleNav, Icon: Tag },
  ]

  const rules = [
    { title: copy.noticePrice, text: copy.noticePriceText, Icon: Tag },
    { title: copy.noticeTime, text: copy.noticeTimeText, Icon: Clock3 },
    { title: copy.noticeCondition, text: copy.noticeConditionText, Icon: Brush },
  ]

  return (
    <SiteShell locale={locale} page="pricing">
      <div className="pricing-rebuild">
        <section className="pc-hero" aria-labelledby="page-title">
          <div className="pc-shell pc-hero-layout">
            <div className="pc-hero-main">
              <p className="pc-kicker">{design.eyebrow}</p>
              <h1 id="page-title">{t.nav.pricing}<span aria-hidden="true">.</span></h1>
              <p className="pc-hero-headline">{design.headline}</p>
            </div>
            <div className="pc-hero-aside">
              <p>{design.heroText}</p>
              <a className="pc-button pc-button-primary" href="#mycie">
                {design.jump}
                <ArrowRight aria-hidden="true" strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </section>

        <nav className="pc-nav" aria-label={design.navLabel}>
          <ul className="pc-shell pc-nav-list" role="list">
            {categories.map(({ id, label, Icon }) => (
              <li key={id}>
                <a href={"#" + id}>
                  <Icon aria-hidden="true" strokeWidth={1.6} />
                  <span>{label}</span>
                  <ArrowRight className="pc-nav-arrow" aria-hidden="true" strokeWidth={1.6} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="pc-rules-section" aria-labelledby="pc-rules-title">
          <div className="pc-shell">
            <h2 id="pc-rules-title" className="pc-sr-only">{design.rulesTitle}</h2>
            <ul className="pc-rules" role="list">
              {rules.map(({ title, text, Icon }) => (
                <li key={title}>
                  <Icon aria-hidden="true" strokeWidth={1.5} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <WashMatrix locale={locale} scopeFor={scopeFor} />
        <DetailingPrices locale={locale} />
        <SalesPackages locale={locale} />

        <section className="pc-finale" aria-labelledby="pc-finale-title">
          <div className="pc-shell pc-finale-layout">
            <div>
              <p className="pc-kicker">{design.finalKicker}</p>
              <h2 id="pc-finale-title">{design.finalTitle}</h2>
              <p className="pc-final-text">{design.finalText}</p>
            </div>
            <div className="pc-final-actions">
              <Link prefetch={false} href={routes[locale].services} className="pc-button pc-button-primary">
                {design.finalButton}
                <ArrowRight aria-hidden="true" strokeWidth={1.6} />
              </Link>
              <a className="pc-text-link" href="#mycie">{design.back}<ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <style>{PRICING_STYLES}</style>
      </div>
    </SiteShell>
  )
}

// All styles are scoped to this page. No changes to the shared header/footer are required.
const PRICING_STYLES = `
  .pricing-rebuild {
    --pc-bg: #09090b;
    --pc-surface: #111113;
    --pc-ink: #f5f2ed;
    --pc-muted: #b7b5b3;
    --pc-accent: #df3039;
    --pc-line: rgba(245, 242, 237, .14);
    --pc-motion: 180ms;
    background: var(--pc-bg);
    color: var(--pc-ink);
    text-align: left;
    isolation: isolate;
  }
  .pricing-rebuild,
  .pricing-rebuild * { box-sizing: border-box; }
  .pricing-rebuild :where(h1, h2, h3, h4, p, ul, dl, dd) { margin: 0; }
  .pricing-rebuild :where(h1, h2, h3, h4) {
    font-family: inherit;
    text-transform: none;
    overflow-wrap: anywhere;
    text-wrap: pretty;
  }
  .pricing-rebuild :where(a, summary) { -webkit-tap-highlight-color: transparent; }
  .pricing-rebuild a { color: inherit; text-decoration: none; }
  .pricing-rebuild svg { display: block; flex-shrink: 0; }
  .pricing-rebuild .pc-shell {
    width: min(100% - 6rem, 1320px);
    margin-inline: auto;
  }
  .pricing-rebuild .pc-kicker {
    display: flex;
    align-items: center;
    gap: .8rem;
    color: var(--pc-muted);
    font-size: .75rem;
    font-weight: 650;
    line-height: 1.5;
    letter-spacing: .09em;
  }
  .pricing-rebuild .pc-kicker::before {
    content: "";
    width: 1.75rem;
    height: 1px;
    flex-shrink: 0;
    background: var(--pc-accent);
  }
  .pricing-rebuild .pc-hero {
    border-bottom: 1px solid var(--pc-line);
    padding-top: calc(var(--header-h, 96px) + clamp(3rem, 5vw, 5.5rem));
    padding-bottom: clamp(3rem, 5vw, 5rem);
  }
  .pricing-rebuild .pc-hero-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, .7fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
  }
  .pricing-rebuild .pc-hero h1 {
    margin-top: 1.5rem;
    font-size: clamp(3.5rem, 6.3vw, 6rem);
    font-weight: 750;
    line-height: 1.1;
    letter-spacing: -.035em;
  }
  .pricing-rebuild .pc-hero h1 > span { color: var(--pc-accent); }
  .pricing-rebuild .pc-hero-headline {
    max-width: 28ch;
    margin-top: 1.3rem;
    color: var(--pc-muted);
    font-size: clamp(1.25rem, 2vw, 1.625rem);
    font-weight: 450;
    line-height: 1.5;
    letter-spacing: -.015em;
    text-wrap: pretty;
  }
  .pricing-rebuild .pc-hero-aside > p {
    max-width: 43ch;
    margin-bottom: 1.75rem;
    color: var(--pc-muted);
    font-size: 1rem;
    line-height: 1.75;
  }
  .pricing-rebuild .pc-button {
    display: inline-flex;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: .85rem 1.25rem;
    border: 1px solid transparent;
    font-size: .875rem;
    font-weight: 650;
    line-height: 1.5;
    transition: background-color var(--pc-motion), border-color var(--pc-motion);
  }
  .pricing-rebuild .pc-button > svg { width: 18px; height: 18px; }
  .pricing-rebuild .pc-button-primary { background: #bf2029; color: #fff; }
  .pricing-rebuild .pc-text-link {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    gap: .9rem;
    font-size: .875rem;
    font-weight: 550;
    line-height: 1.5;
    color: var(--pc-muted);
  }
  .pricing-rebuild .pc-text-link > svg { width: 16px; height: 16px; color: var(--pc-accent); }
  .pricing-rebuild .pc-nav {
    position: sticky;
    top: var(--header-h-compact, var(--header-h, 80px));
    z-index: 25;
    border-bottom: 1px solid var(--pc-line);
    background: #111113;
  }
  .pricing-rebuild .pc-nav-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0;
    list-style: none;
  }
  .pricing-rebuild .pc-nav-list > li + li { border-left: 1px solid var(--pc-line); }
  .pricing-rebuild .pc-nav-list a {
    display: flex;
    min-height: 66px;
    align-items: center;
    gap: .75rem;
    padding: .75rem 1.4rem;
    font-size: .875rem;
    font-weight: 550;
    line-height: 1.45;
    transition: color var(--pc-motion), background-color var(--pc-motion);
  }
  .pricing-rebuild .pc-nav-list > li:first-child a { padding-left: 0; }
  .pricing-rebuild .pc-nav-list > li:last-child a { padding-right: 0; }
  .pricing-rebuild .pc-nav-list a > svg { width: 18px; height: 18px; color: var(--pc-accent); }
  .pricing-rebuild .pc-nav-list .pc-nav-arrow { margin-left: auto; color: var(--pc-muted); width: 16px; }
  .pricing-rebuild .pc-rules-section { padding-block: 2.4rem; }
  .pricing-rebuild .pc-rules {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1.5rem, 4vw, 4rem);
    padding: 0;
    list-style: none;
  }
  .pricing-rebuild .pc-rules > li { display: flex; align-items: flex-start; gap: 1rem; }
  .pricing-rebuild .pc-rules > li > svg {
    width: 20px;
    height: 20px;
    margin-top: .1rem;
    color: var(--pc-accent);
  }
  .pricing-rebuild .pc-rules h3 { font-size: .9375rem; line-height: 1.5; font-weight: 650; }
  .pricing-rebuild .pc-rules p { margin-top: .45rem; font-size: .875rem; line-height: 1.7; color: var(--pc-muted); }
  .pricing-rebuild .pc-section {
    padding-block: clamp(3.25rem, 6vw, 5.25rem);
    border-bottom: 1px solid var(--pc-line);
    scroll-margin-top: calc(var(--header-h-compact, var(--header-h, 80px)) + 100px);
  }
  .pricing-rebuild .pc-section-heading {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr);
    gap: 2rem;
    align-items: end;
    margin-bottom: 2.5rem;
  }
  .pricing-rebuild .pc-section-heading h2 {
    margin-top: .8rem;
    font-size: clamp(1.875rem, 3vw, 2.875rem);
    font-weight: 650;
    line-height: 1.25;
    letter-spacing: -.025em;
  }
  .pricing-rebuild .pc-section-intro {
    max-width: 43ch;
    color: var(--pc-muted);
    font-size: .9375rem;
    line-height: 1.75;
  }
  .pricing-rebuild .pc-matrix { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .pricing-rebuild .pc-service-col { width: 40%; }
  .pricing-rebuild .pc-size-col { width: 20%; }
  .pricing-rebuild .pc-matrix thead { border-top: 1px solid var(--pc-line); border-bottom: 1px solid var(--pc-line); }
  .pricing-rebuild .pc-matrix thead th {
    padding: 1rem 1rem;
    color: var(--pc-muted);
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.5;
    text-align: right;
    vertical-align: middle;
  }
  .pricing-rebuild .pc-matrix thead th:first-child { padding-left: 0; text-align: left; }
  .pricing-rebuild .pc-matrix thead th:last-child { padding-right: 0; }
  .pricing-rebuild .pc-size-heading { display: inline-flex; align-items: center; gap: .65rem; }
  .pricing-rebuild .pc-size-heading svg { width: 20px; height: 20px; }
  .pricing-rebuild .pc-matrix-service > th {
    padding: 1.8rem 1.75rem .7rem 0;
    text-align: left;
    font-weight: 400;
    vertical-align: top;
  }
  .pricing-rebuild .pc-matrix-service > td { padding: 1.8rem 1rem .7rem; text-align: right; vertical-align: middle; }
  .pricing-rebuild .pc-matrix-service > td:last-child { padding-right: 0; }
  .pricing-rebuild .pc-service-heading { display: flex; align-items: flex-start; gap: 1rem; }
  .pricing-rebuild .pc-service-heading > div { min-width: 0; }
  .pricing-rebuild .pc-icon {
    display: flex;
    width: 42px;
    min-height: 42px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    color: var(--pc-accent);
  }
  .pricing-rebuild .pc-icon > svg { width: 27px; height: 27px; }
  .pricing-rebuild .pc-service-name {
    display: block;
    font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: -.01em;
    overflow-wrap: anywhere;
  }
  .pricing-rebuild .pc-time {
    display: inline-flex;
    align-items: flex-start;
    gap: .45rem;
    color: var(--pc-muted);
    font-size: .8125rem;
    font-weight: 400;
    line-height: 1.6;
  }
  .pricing-rebuild .pc-time > svg { width: 15px; height: 15px; margin-top: .17rem; color: var(--pc-muted); }
  .pricing-rebuild .pc-service-heading .pc-time { margin-top: .5rem; }
  .pricing-rebuild .pc-price {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: inherit;
    gap: .3rem;
    font-variant-numeric: tabular-nums;
  }
  .pricing-rebuild .pc-price-from { font-size: .8125rem; font-weight: 400; color: var(--pc-muted); }
  .pricing-rebuild .pc-price-number {
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    font-weight: 650;
    line-height: 1.3;
    letter-spacing: -.015em;
    white-space: nowrap;
  }
  .pricing-rebuild .pc-currency { font-size: .875rem; font-weight: 500; color: var(--pc-ink); }
  .pricing-rebuild .pc-quote { display: inline-block; font-size: 1rem; font-weight: 550; line-height: 1.55; overflow-wrap: anywhere; }
  .pricing-rebuild .pc-wash-price { display: flex; flex-direction: column; align-items: flex-end; gap: .35rem; }
  .pricing-rebuild .pc-separate { color: var(--pc-muted); font-size: .8125rem; font-weight: 400; line-height: 1.6; }
  .pricing-rebuild .pc-separate del { margin-left: .25rem; text-decoration-color: var(--pc-muted); }
  .pricing-rebuild .pc-saving { color: #f08f95; font-size: .8125rem; font-weight: 550; line-height: 1.5; }
  .pricing-rebuild .pc-bundle-label {
    display: inline-block;
    margin-bottom: .6rem;
    color: #f08f95;
    font-size: .8125rem;
    font-weight: 600;
    line-height: 1.5;
  }
  .pricing-rebuild .pc-bundle-row > :first-child { border-left: 2px solid var(--pc-accent); padding-left: 1.2rem; }
  .pricing-rebuild .pc-matrix-scope { border-bottom: 1px solid var(--pc-line); }
  .pricing-rebuild .pc-matrix-scope > td { padding: .2rem 0 1.1rem 3.625rem; }
  .pricing-rebuild .pc-matrix-scope.pc-bundle-row > td { padding-left: 4.825rem; }
  .pricing-rebuild .pc-scope { min-width: 0; }
  .pricing-rebuild .pc-print-scope { display: none; }
  .pricing-rebuild .pc-scope > summary {
    display: flex;
    min-height: 44px;
    width: fit-content;
    max-width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    list-style: none;
    cursor: pointer;
    color: var(--pc-muted);
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.5;
    transition: color var(--pc-motion);
  }
  .pricing-rebuild .pc-scope > summary::-webkit-details-marker { display: none; }
  .pricing-rebuild .pc-scope > summary > svg { width: 17px; height: 17px; color: var(--pc-accent); transition: transform var(--pc-motion); }
  .pricing-rebuild .pc-scope[open] > summary > svg { transform: rotate(180deg); }
  .pricing-rebuild .pc-scope-content { max-width: 1060px; padding-block: .6rem .9rem; }
  .pricing-rebuild .pc-scope-content > p { max-width: 75ch; font-size: .9375rem; line-height: 1.75; color: var(--pc-muted); }
  .pricing-rebuild .pc-scope-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .8rem 2rem;
    padding: 0;
    list-style: none;
  }
  .pricing-rebuild .pc-scope-list > li { display: flex; align-items: flex-start; gap: .65rem; color: var(--pc-muted); font-size: .875rem; line-height: 1.65; }
  .pricing-rebuild .pc-scope-list > li > svg { width: 15px; height: 15px; margin-top: .25rem; color: var(--pc-accent); }
  .pricing-rebuild .pc-matrix-mobile { display: none; }
  .pricing-rebuild .pc-coating {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 1.75rem;
    padding: .3rem 0 .3rem 1.25rem;
    border-left: 2px solid var(--pc-line);
  }
  .pricing-rebuild .pc-coating > svg { width: 21px; height: 21px; margin-top: .15rem; color: var(--pc-accent); }
  .pricing-rebuild .pc-coating h3 { font-size: .9375rem; font-weight: 550; line-height: 1.5; }
  .pricing-rebuild .pc-coating p { max-width: 83ch; margin-top: .35rem; color: var(--pc-muted); font-size: .875rem; line-height: 1.75; }
  .pricing-rebuild .pc-detailing { background: var(--pc-surface); }
  .pricing-rebuild .pc-catalog-label { font-size: .8125rem; font-weight: 550; line-height: 1.5; letter-spacing: .015em; color: var(--pc-muted); }
  .pricing-rebuild .pc-catalog-group > .pc-catalog-label { padding-bottom: 1rem; }
  .pricing-rebuild .pc-detail-list { padding: 0; border-top: 1px solid var(--pc-line); list-style: none; }
  .pricing-rebuild .pc-detail-list > li { border-bottom: 1px solid var(--pc-line); }
  .pricing-rebuild .pc-detail-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(340px, .72fr);
    gap: 2rem;
    align-items: start;
    padding-block: 1.55rem;
  }
  .pricing-rebuild .pc-detail-description { display: flex; align-items: flex-start; gap: 1rem; min-width: 0; }
  .pricing-rebuild .pc-detail-description > div { min-width: 0; padding-top: .2rem; }
  .pricing-rebuild .pc-detail-description p { max-width: 58ch; margin-top: .55rem; font-size: .875rem; line-height: 1.75; color: var(--pc-muted); }
  .pricing-rebuild .pc-detail-values { min-width: 0; }
  .pricing-rebuild .pc-detail-variant { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .95fr); gap: 1.5rem; align-items: baseline; }
  .pricing-rebuild .pc-detail-variant + .pc-detail-variant { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--pc-line); }
  .pricing-rebuild .pc-detail-variant > div:first-child { text-align: right; }
  .pricing-rebuild .pc-detail-duration { padding-top: .35rem; text-align: right; }
  .pricing-rebuild .pc-individual-group { margin-top: 3.5rem; }
  .pricing-rebuild .pc-individual-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1.5rem;
    padding-bottom: 1rem;
  }
  .pricing-rebuild .pc-individual-heading > p { max-width: 57ch; color: var(--pc-muted); font-size: .875rem; line-height: 1.75; }
  .pricing-rebuild .pc-sale-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--pc-line); border-bottom: 1px solid var(--pc-line); }
  .pricing-rebuild .pc-sale-package { display: flex; min-width: 0; flex-direction: column; padding: 2.2rem 2.75rem 2.2rem 0; }
  .pricing-rebuild .pc-sale-package + .pc-sale-package { border-left: 1px solid var(--pc-line); padding-left: 2.75rem; padding-right: 0; }
  .pricing-rebuild .pc-sale-head { display: flex; align-items: center; gap: .75rem; }
  .pricing-rebuild .pc-sale-head .pc-icon { width: 36px; min-height: 36px; justify-content: flex-start; }
  .pricing-rebuild .pc-sale-head h3 { font-size: clamp(1.625rem, 2.3vw, 2.25rem); font-weight: 600; line-height: 1.3; letter-spacing: -.02em; }
  .pricing-rebuild .pc-sale-note { margin-top: 1rem; font-size: .875rem; font-weight: 550; line-height: 1.65; color: var(--pc-ink); }
  .pricing-rebuild .pc-sale-premium .pc-sale-note { color: #f08f95; }
  .pricing-rebuild .pc-sale-description { max-width: 56ch; margin-top: .7rem; color: var(--pc-muted); font-size: .9375rem; line-height: 1.8; }
  .pricing-rebuild .pc-sale-values { margin-top: auto; padding-top: 2.25rem; }
  .pricing-rebuild .pc-sale-variant { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1.25rem; }
  .pricing-rebuild .pc-sale-variant + .pc-sale-variant { margin-top: 1.5rem; }
  .pricing-rebuild .pc-sale-variant .pc-price-number { font-size: clamp(2rem, 2.6vw, 2.375rem); }
  .pricing-rebuild .pc-value-label { margin-bottom: .35rem; color: var(--pc-muted); font-size: .75rem; line-height: 1.5; }
  .pricing-rebuild .pc-finale { background: var(--pc-surface); padding-block: clamp(3.5rem, 6vw, 5.5rem); }
  .pricing-rebuild .pc-finale-layout { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr); gap: 3rem; align-items: center; }
  .pricing-rebuild .pc-finale h2 { max-width: 22ch; margin-top: 1rem; font-size: clamp(1.875rem, 3vw, 2.625rem); font-weight: 600; line-height: 1.3; letter-spacing: -.025em; }
  .pricing-rebuild .pc-final-text { max-width: 59ch; margin-top: 1rem; font-size: .9375rem; line-height: 1.8; color: var(--pc-muted); }
  .pricing-rebuild .pc-final-actions { display: flex; flex-direction: column; align-items: flex-end; gap: .8rem; }
  .pricing-rebuild :where(a, summary):focus-visible { outline: 2px solid var(--pc-ink); outline-offset: 5px; }
  .pricing-rebuild .pc-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  @media (hover: hover) {
    .pricing-rebuild .pc-button-primary:hover { background: #a71b23; }
    .pricing-rebuild .pc-nav-list a:hover { background: rgba(245, 242, 237, .04); }
    .pricing-rebuild .pc-scope > summary:hover,
    .pricing-rebuild .pc-text-link:hover { color: var(--pc-ink); }
  }
  @media (max-width: 1100px) {
    .pricing-rebuild .pc-shell { width: calc(100% - 4rem); }
    .pricing-rebuild .pc-service-col { width: 37%; }
    .pricing-rebuild .pc-size-col { width: 21%; }
    .pricing-rebuild .pc-detail-row { grid-template-columns: minmax(0, 1fr) minmax(290px, .85fr); gap: 1.5rem; }
    .pricing-rebuild .pc-detail-variant { gap: 1rem; }
    .pricing-rebuild .pc-individual-heading { display: block; }
    .pricing-rebuild .pc-individual-heading > p { margin-top: .5rem; }
    .pricing-rebuild .pc-sale-package { padding-right: 1.75rem; }
    .pricing-rebuild .pc-sale-package + .pc-sale-package { padding-left: 1.75rem; }
  }
  @media (max-width: 900px) {
    .pricing-rebuild .pc-hero-layout { grid-template-columns: minmax(0, 1fr); gap: 1.75rem; }
    .pricing-rebuild .pc-hero-aside { max-width: 58ch; }
    .pricing-rebuild .pc-hero-aside > p { max-width: none; margin-bottom: 1.25rem; }
    .pricing-rebuild .pc-section-heading { grid-template-columns: minmax(0, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .pricing-rebuild .pc-section-intro { max-width: 70ch; }
    .pricing-rebuild .pc-rules { gap: 1.5rem; }
    .pricing-rebuild .pc-rules > li { gap: .75rem; }
    .pricing-rebuild .pc-detail-row { grid-template-columns: minmax(0, 1fr) minmax(230px, .7fr); }
    .pricing-rebuild .pc-detail-variant { grid-template-columns: minmax(0, 1fr); gap: .55rem; }
    .pricing-rebuild .pc-detail-duration { padding-top: 0; }
    .pricing-rebuild .pc-finale-layout { grid-template-columns: minmax(0, 1fr); gap: 1.75rem; }
    .pricing-rebuild .pc-final-actions { align-items: flex-start; }
  }
  @media (max-width: 760px) {
    .pricing-rebuild .pc-shell { width: calc(100% - 2.5rem); }
    .pricing-rebuild .pc-hero { padding-top: calc(var(--header-h, 80px) + 2.5rem); padding-bottom: 2.5rem; }
    .pricing-rebuild .pc-hero h1 { font-size: clamp(2.75rem, 10vw, 4.25rem); margin-top: 1.25rem; }
    .pricing-rebuild .pc-hero-headline { max-width: 29ch; margin-top: 1rem; font-size: 1.25rem; }
    .pricing-rebuild .pc-hero-aside > p { font-size: .9375rem; line-height: 1.75; }
    .pricing-rebuild .pc-nav-list a { min-height: 62px; justify-content: center; padding: .7rem .65rem !important; text-align: center; gap: .4rem; font-size: .8125rem; }
    .pricing-rebuild .pc-nav-list a > svg { display: none; }
    .pricing-rebuild .pc-rules-section { padding-block: 1.75rem; }
    .pricing-rebuild .pc-rules { grid-template-columns: minmax(0, 1fr); gap: 1.2rem; }
    .pricing-rebuild .pc-rules > li { gap: 1rem; }
    .pricing-rebuild .pc-rules p { margin-top: .25rem; }
    .pricing-rebuild .pc-section { padding-block: 2.75rem; }
    .pricing-rebuild .pc-section-heading h2 { font-size: clamp(1.75rem, 5vw, 2.375rem); line-height: 1.3; }
    .pricing-rebuild .pc-matrix-desktop { display: none; }
    .pricing-rebuild .pc-matrix-mobile { display: block; }
    .pricing-rebuild .pc-wash-list { padding: 0; list-style: none; border-top: 1px solid var(--pc-line); }
    .pricing-rebuild .pc-wash-block { padding-block: 1.65rem 1.25rem; border-bottom: 1px solid var(--pc-line); }
    .pricing-rebuild .pc-wash-block .pc-icon { width: 32px; min-height: 32px; }
    .pricing-rebuild .pc-wash-block .pc-icon > svg { width: 24px; height: 24px; }
    .pricing-rebuild .pc-service-heading { gap: .8rem; }
    .pricing-rebuild .pc-wash-block .pc-service-name { font-size: 1.125rem; line-height: 1.5; }
    .pricing-rebuild .pc-bundle-block { position: relative; }
    .pricing-rebuild .pc-bundle-block::before { content: ""; position: absolute; inset: 0 auto 0 -10px; width: 2px; background: var(--pc-accent); }
    .pricing-rebuild .pc-mobile-prices { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin-top: 1.5rem; }
    .pricing-rebuild .pc-mobile-prices > div { min-width: 0; }
    .pricing-rebuild .pc-mobile-prices > div + div { padding-left: .75rem; border-left: 1px solid var(--pc-line); }
    .pricing-rebuild .pc-mobile-prices dt { min-height: 3em; margin-bottom: .5rem; font-size: .8125rem; font-weight: 500; line-height: 1.5; color: var(--pc-muted); overflow-wrap: anywhere; }
    .pricing-rebuild .pc-wash-price { align-items: flex-start; }
    .pricing-rebuild .pc-mobile-prices .pc-price { gap: .22rem; }
    .pricing-rebuild .pc-mobile-prices .pc-price-number { font-size: clamp(1.25rem, 4.7vw, 1.75rem); }
    .pricing-rebuild .pc-mobile-prices .pc-currency { font-size: .8125rem; }
    .pricing-rebuild .pc-mobile-prices .pc-price-from { font-size: .75rem; }
    .pricing-rebuild .pc-separate { font-size: .75rem; }
    .pricing-rebuild .pc-separate del { margin-left: 0; }
    .pricing-rebuild .pc-saving { font-size: .75rem; }
    .pricing-rebuild .pc-wash-block .pc-scope { margin-top: .8rem; }
    .pricing-rebuild .pc-scope > summary { width: 100%; }
    .pricing-rebuild .pc-scope-list { grid-template-columns: minmax(0, 1fr); gap: .65rem; }
    .pricing-rebuild .pc-coating { margin-top: 1.5rem; padding-left: .9rem; gap: .8rem; }
    .pricing-rebuild .pc-detail-row { grid-template-columns: minmax(0, 1fr); gap: 1rem; padding-block: 1.5rem; }
    .pricing-rebuild .pc-detail-description { gap: .8rem; }
    .pricing-rebuild .pc-detail-description .pc-icon { width: 32px; min-height: 32px; }
    .pricing-rebuild .pc-detail-description .pc-icon > svg { width: 24px; height: 24px; }
    .pricing-rebuild .pc-detail-description > div { padding-top: 0; }
    .pricing-rebuild .pc-detail-values { padding-left: 2.8rem; }
    .pricing-rebuild .pc-detail-variant { grid-template-columns: minmax(0, 1fr) auto; gap: .75rem; align-items: baseline; }
    .pricing-rebuild .pc-detail-variant > div:first-child { text-align: left; }
    .pricing-rebuild .pc-detail-duration { max-width: 18ch; }
    .pricing-rebuild .pc-detail-variant .pc-price-number { font-size: 1.65rem; }
    .pricing-rebuild .pc-detail-variant .pc-quote { font-size: .9375rem; }
    .pricing-rebuild .pc-individual-group { margin-top: 2.5rem; }
    .pricing-rebuild .pc-sale-grid { grid-template-columns: minmax(0, 1fr); }
    .pricing-rebuild .pc-sale-package { padding: 1.75rem 0; }
    .pricing-rebuild .pc-sale-package + .pc-sale-package { border-left: 0; border-top: 1px solid var(--pc-line); padding: 1.75rem 0; }
    .pricing-rebuild .pc-sale-values { padding-top: 1.5rem; }
    .pricing-rebuild .pc-sale-head h3 { font-size: 1.875rem; }
    .pricing-rebuild .pc-sale-variant .pc-price-number { font-size: 2.125rem; }
    .pricing-rebuild .pc-finale { padding-block: 3rem; }
    .pricing-rebuild .pc-finale h2 { font-size: 1.875rem; }
  }
  @media (max-width: 390px) {
    .pricing-rebuild .pc-shell { width: calc(100% - 2rem); }
    .pricing-rebuild .pc-mobile-prices { gap: .5rem; }
    .pricing-rebuild .pc-mobile-prices > div + div { padding-left: .5rem; }
    .pricing-rebuild .pc-detail-variant { grid-template-columns: minmax(0, 1fr); gap: .3rem; }
    .pricing-rebuild .pc-detail-duration { max-width: none; text-align: left; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pricing-rebuild *,
    .pricing-rebuild *::before,
    .pricing-rebuild *::after { transition: none !important; animation: none !important; }
    .pricing-rebuild { scroll-behavior: auto; }
  }
  @media (forced-colors: active) {
    .pricing-rebuild .pc-button { border-color: ButtonText; }
    .pricing-rebuild .pc-icon,
    .pricing-rebuild .pc-saving,
    .pricing-rebuild .pc-bundle-label { color: CanvasText; }
  }
  @media print {
    .pricing-rebuild { --pc-ink: #111; --pc-muted: #444; --pc-line: #bbb; color: #111; background: #fff; }
    .pricing-rebuild .pc-shell { width: 100%; }
    .pricing-rebuild .pc-hero { padding-top: 1rem; }
    .pricing-rebuild .pc-nav,
    .pricing-rebuild .pc-button,
    .pricing-rebuild .pc-final-actions { display: none; }
    .pricing-rebuild .pc-scope { display: none; }
    .pricing-rebuild .pc-print-scope { display: block; }
    .pricing-rebuild .pc-detailing,
    .pricing-rebuild .pc-finale { background: #fff; }
    .pricing-rebuild .pc-section { padding-block: 1.5rem; }
    .pricing-rebuild .pc-detail-row,
    .pricing-rebuild .pc-wash-block,
    .pricing-rebuild .pc-sale-package { break-inside: avoid; }
  }
`
