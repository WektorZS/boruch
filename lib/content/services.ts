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

export const services: Service[] = serviceConfigs.map((config, i) => ({
  ...config,
  index: i + 1,
  source: servicesSource[config.slug],
}))

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug)
  if (!service) throw new Error(`Unknown service: ${slug}`)
  return service
}

/** Summary copy for a service in a given locale, taken from that locale's services page. */
export function serviceSummary(locale: Locale, slug: ServiceSlug) {
  const effective = slug === "polerowanie" ? "korekta-lakieru" : slug
  for (const group of sources[locale].services.groups) {
    const item = group.items.find((i) => i.slug === effective)
    if (item) return item
  }
  return null
}

export function formatIndex(n: number) {
  return String(n).padStart(2, "0")
}
