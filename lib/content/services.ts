import type { PhotoId } from "@/lib/photos"
import { servicesSource } from "./generated/services-pl"
import { sources } from "./index"
import type { Locale, ServiceSource } from "./types"

export type ServiceSlug =
  | "mycie-zewnatrz"
  | "czyszczenie-wnetrza"
  | "komplet"
  | "pranie-tapicerki"
  | "czyszczenie-skor"
  | "woskowanie"
  | "polerowanie"
  | "korekta-lakieru"
  | "powloka-ceramiczna"
  | "folia-ppf"
  | "przyciemnianie-szyb-i-lamp"
  | "zmiana-koloru-dechroming"

export interface ServiceConfig {
  slug: ServiceSlug
  /** Link label used by the source site's own service navigation. */
  navTitle: string
  category: "myjnia" | "detailing"
  /** Canonical price from /cennik, or null when /cennik does not confirm an individual price. */
  price: string | null
  hero: PhotoId
  frames: [PhotoId, PhotoId, PhotoId]
}

/** Order used by the signature service index (01–12). */
export const serviceConfigs: ServiceConfig[] = [
  { slug: "mycie-zewnatrz", navTitle: "Mycie zewnątrz", category: "myjnia", price: "od 110 zł", hero: "p69", frames: ["p46", "p60", "p01"] },
  { slug: "czyszczenie-wnetrza", navTitle: "Czyszczenie wnętrza", category: "myjnia", price: "od 130 zł", hero: "p63", frames: ["p29", "p55", "p57"] },
  { slug: "komplet", navTitle: "Pakiet Komplet", category: "myjnia", price: "od 220 zł", hero: "p65", frames: ["p73", "p67", "p66"] },
  { slug: "pranie-tapicerki", navTitle: "Pranie tapicerki", category: "myjnia", price: "400,00 zł", hero: "p44", frames: ["p45", "p50", "p64"] },
  { slug: "czyszczenie-skor", navTitle: "Czyszczenie i impregnacja skór", category: "myjnia", price: "350,00 zł", hero: "p68", frames: ["p31", "p67", "p32"] },
  { slug: "woskowanie", navTitle: "Ręczne woskowanie", category: "detailing", price: "od 350,00 zł", hero: "p51", frames: ["p52", "p15", "p14"] },
  { slug: "polerowanie", navTitle: "Polerowanie", category: "detailing", price: null, hero: "p02", frames: ["p03", "p25", "p36"] },
  { slug: "korekta-lakieru", navTitle: "Korekta lakieru", category: "detailing", price: null, hero: "p23", frames: ["p24", "p06", "p58"] },
  { slug: "powloka-ceramiczna", navTitle: "Powłoka ceramiczna", category: "detailing", price: null, hero: "p47", frames: ["p39", "p13", "p11"] },
  { slug: "folia-ppf", navTitle: "Oklejanie aut folią PPF", category: "detailing", price: null, hero: "p07", frames: ["p12", "p09", "p08"] },
  { slug: "przyciemnianie-szyb-i-lamp", navTitle: "Przyciemnianie szyb i lamp", category: "detailing", price: null, hero: "p28", frames: ["p71", "p35", "p19"] },
  { slug: "zmiana-koloru-dechroming", navTitle: "Zmiana koloru / Dechroming", category: "detailing", price: null, hero: "p04", frames: ["p20", "p21", "p33"] },
]

export interface Service extends ServiceConfig {
  source: ServiceSource
  index: number
}

export const services: Service[] = /* @__PURE__ */ serviceConfigs.map((config, i) => ({
  ...config,
  index: i + 1,
  source: servicesSource[config.slug],
}))

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug)
  if (!service) throw new Error(`Unknown service: ${slug}`)
  return service
}

// Shared short descriptions for the home explorer and service index.
const serviceDescriptions = {
  "mycie-zewnatrz": {
    pl: "Ręczne mycie nadwozia, felg i szyb. Dokładne osuszenie i pielęgnacja zewnętrznych detali.",
    en: "Hand washing of the body, wheels and glass. Careful drying and care for exterior details.",
    de: "Handwäsche von Karosserie, Felgen und Scheiben. Sorgfältiges Trocknen und Pflege der Außendetails.",
    uk: "Ручне миття кузова, дисків і скла. Ретельне сушіння та догляд за зовнішніми деталями.",
  },
  "czyszczenie-wnetrza": {
    pl: "Odkurzanie kabiny i bagażnika, czyszczenie kokpitu, plastików oraz szyb.",
    en: "Vacuuming the cabin and boot, with cleaning of the dashboard, plastics and glass.",
    de: "Saugen von Innenraum und Kofferraum sowie Reinigung von Cockpit, Kunststoffen und Scheiben.",
    uk: "Прибирання салону й багажника пилососом, чищення панелі приладів, пластику та скла.",
  },
  komplet: {
    pl: "Mycie nadwozia i czyszczenie wnętrza w jednym pakiecie, podczas jednej wizyty.",
    en: "Exterior washing and interior cleaning in one package, during one visit.",
    de: "Außenwäsche und Innenreinigung in einem Paket bei einem Besuch.",
    uk: "Миття кузова та чищення салону в одному пакеті за один візит.",
  },
  "pranie-tapicerki": {
    pl: "Czyszczenie materiałowej tapicerki metodą ekstrakcyjną. Zakres dobieramy do elementów i stopnia zabrudzenia.",
    en: "Extraction cleaning of fabric upholstery. The scope depends on the surfaces and level of soiling.",
    de: "Sprühextraktionsreinigung der Stoffpolster. Der Umfang richtet sich nach den Flächen und dem Verschmutzungsgrad.",
    uk: "Екстракційне чищення тканинної оббивки. Обсяг залежить від елементів і ступеня забруднення.",
  },
  "czyszczenie-skor": {
    pl: "Usunięcie zabrudzeń ze skórzanej tapicerki i impregnacja dopasowana do jej rodzaju.",
    en: "Cleaning leather upholstery and applying protection suited to the type of leather.",
    de: "Reinigung der Lederpolster und eine auf die Lederart abgestimmte Imprägnierung.",
    uk: "Чищення шкіряної оббивки та нанесення захисту відповідно до типу шкіри.",
  },
  woskowanie: {
    pl: "Przygotowanie lakieru i ręczna aplikacja wosku dla połysku i ochrony hydrofobowej.",
    en: "Paint preparation and hand application of wax for gloss and hydrophobic protection.",
    de: "Lackvorbereitung und Wachsauftrag von Hand für Glanz und hydrophoben Schutz.",
    uk: "Підготовка лаку та ручне нанесення воску для блиску й гідрофобного захисту.",
  },
  polerowanie: {
    pl: "Odświeżenie lakieru i usunięcie drobnych defektów przez polerowanie.",
    en: "Polishing to refresh the paint and remove minor surface defects.",
    de: "Polieren zum Auffrischen des Lacks und Entfernen kleiner Oberflächendefekte.",
    uk: "Полірування для оновлення лаку та усунення дрібних дефектів поверхні.",
  },
  "korekta-lakieru": {
    pl: "Jedno- lub wieloetapowa praca nad rysami i zmatowieniami. Zakres ustalamy po ocenie lakieru.",
    en: "Single- or multi-stage work on scratches and dullness. The scope is agreed after inspecting the paint.",
    de: "Ein- oder mehrstufige Bearbeitung von Kratzern und Mattstellen. Der Umfang wird nach der Lackprüfung festgelegt.",
    uk: "Одно- або багатоступенева робота з подряпинами й потьмянінням. Обсяг визначаємо після огляду лаку.",
  },
  "powloka-ceramiczna": {
    pl: "Aplikacja powłoki na przygotowany lakier. Dobór wariantu i zalecenia dotyczące późniejszej pielęgnacji.",
    en: "Coating application on prepared paint, with a choice of treatment and guidance on aftercare.",
    de: "Beschichtung des vorbereiteten Lacks mit Auswahl der Variante und Hinweisen zur weiteren Pflege.",
    uk: "Нанесення покриття на підготовлений лак, вибір варіанта та рекомендації з подальшого догляду.",
  },
  "folia-ppf": {
    pl: "Folia ochronna na wybrane elementy nadwozia lub całe auto. Zakres oklejania ustalamy przed montażem.",
    en: "Protective film for selected body panels or the whole car. The coverage is agreed before installation.",
    de: "Lackschutzfolie für einzelne Karosserieteile oder das ganze Fahrzeug. Der Umfang wird vor der Montage vereinbart.",
    uk: "Захисна плівка для окремих елементів кузова або всього авто. Обсяг узгоджуємо перед монтажем.",
  },
  "przyciemnianie-szyb-i-lamp": {
    pl: "Dobór stopnia przyciemnienia i aplikacja folii na szyby lub lampy samochodu.",
    en: "Selection of tint level and film application to the car's windows or lights.",
    de: "Auswahl des Tönungsgrads und Folienmontage an Scheiben oder Leuchten des Fahrzeugs.",
    uk: "Вибір ступеня тонування та нанесення плівки на скло або фари автомобіля.",
  },
  "zmiana-koloru-dechroming": {
    pl: "Oklejenie nadwozia folią kolorową lub zmiana wykończenia chromowanych elementów.",
    en: "Colour wrapping of the body or a change of finish for chrome trim.",
    de: "Farbfolierung der Karosserie oder Änderung der Oberfläche verchromter Zierteile.",
    uk: "Обклеювання кузова кольоровою плівкою або зміна оздоблення хромованих елементів.",
  },
} satisfies Record<ServiceSlug, Record<Locale, string>>

/** Keep the source title and routing fields, with one concise description per service. */
export function serviceSummary(locale: Locale, slug: ServiceSlug) {
  const effective = slug === "polerowanie" ? "korekta-lakieru" : slug
  for (const group of sources[locale].services.groups) {
    const item = group.items.find((i) => i.slug === effective)
    if (item) return { ...item, text: serviceDescriptions[slug][locale] }
  }
  return null
}

/** Source group title ("Myjnia" / "DETAILING") the service belongs to on that locale's services page. */
export function serviceGroupTitle(locale: Locale, slug: ServiceSlug) {
  const effective = slug === "polerowanie" ? "korekta-lakieru" : slug
  const group = sources[locale].services.groups.find((g) => g.items.some((i) => i.slug === effective))
  return group?.title ?? ""
}

/**
 * Canonical price for a service in a locale, read from that locale's own pricing page.
 * Packages: [0] interior, [1] exterior, [2] complete. Other: [0] leather, [1] upholstery, [2] waxing.
 * Everything else has no confirmed individual price and returns null ("Wycena indywidualna").
 */
const priceSource: Partial<Record<ServiceSlug, ["packages" | "other", number]>> = {
  "czyszczenie-wnetrza": ["packages", 0],
  "mycie-zewnatrz": ["packages", 1],
  komplet: ["packages", 2],
  "czyszczenie-skor": ["other", 0],
  "pranie-tapicerki": ["other", 1],
  woskowanie: ["other", 2],
}

export function servicePrice(locale: Locale, slug: ServiceSlug): string | null {
  const ref = priceSource[slug]
  if (!ref) return null
  const pricing = sources[locale].pricing
  const raw = ref[0] === "packages" ? pricing.packages[ref[1]]?.price : pricing.other[ref[1]]?.price
  if (!raw) return null
  const value = raw.replace(/\*$/, "").trim().replace(/(\d)\s*(zł|PLN)(?=$|\s)/gi, "$1 $2")
  const from = { pl: "od", en: "from", de: "ab", uk: "від" }[locale]
  return value.toLowerCase().startsWith(from) ? value : `${from} ${value}`
}

export function formatIndex(n: number) {
  return String(n).padStart(2, "0")
}
