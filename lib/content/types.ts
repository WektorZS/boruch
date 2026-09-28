export type Locale = "pl" | "en" | "de" | "uk"

export type PageKey = "home" | "about" | "services" | "pricing" | "gallery" | "contact"

export interface PageMeta {
  title: string
  description: string
}

export interface Slide {
  kicker: string
  title: string
  sub: string
}

export interface WashPackage {
  title: string
  items: string[]
  includedLabel?: string
  price?: string
  note?: string
  popular?: string
  tagline: string
  discount?: string
}

export interface PriceRow {
  name: string
  price: string
}

export interface ServiceSummary {
  slug: string
  title: string
  text: string
}

export interface LocaleSource {
  locale: Locale
  meta: Record<PageKey, PageMeta>
  slides: Slide[]
  home: {
    sourceH1: string
    projectsTitle: string
    projectsText: string
    features: string[]
    teamTitle: string | null
    teamParas: string[]
    author: string
    packagesTitle: string
    moreLink: string
    contactTitle: string
    contactText: string
  }
  about: {
    h1: string
    teamTitle: string | null
    paras: string[]
    author: string
    features: string[]
  }
  contact: { h1: string; sub: string }
  gallery: { h1: string; sub: string }
  pricing: {
    h1: string
    sub: string
    categories: string[]
    packagesTitle: string
    packagesNote: string
    packages: WashPackage[]
    otherTitle: string
    other: PriceRow[]
    otherNote?: string
  }
  services: {
    groups: { title: string; items: ServiceSummary[] }[]
    trustedTitle: string
  }
  address: {
    brand: string[]
    locationLabel: string
    lines: string[]
    contactLabel: string
  }
}

export interface ServiceStep {
  title: string
  body: string[]
}

export interface ServiceBlock {
  type: "item" | "text"
  text: string
}

export interface ServiceSection {
  heading: string
  kind: "list" | "price" | "summary" | "process"
  blocks: ServiceBlock[]
  steps?: ServiceStep[]
}

export interface ServiceSource {
  slug: string
  heading: string
  headingSub: string
  tagline: string
  intro: string[]
  processTitle: string | null
  steps: ServiceStep[]
  sections: ServiceSection[]
  meta: PageMeta
}
