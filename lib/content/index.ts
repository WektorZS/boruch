import type { Metadata } from "next"
import { plSource } from "./generated/pl"
import { enSource } from "./generated/en"
import { deSource } from "./generated/de"
import { ukSource } from "./generated/uk"
import type { Locale, LocaleSource, PageKey } from "./types"

export type { Locale, PageKey } from "./types"

export const SITE_URL = "https://boruchmyjnia.pl"

export const sources: Record<Locale, LocaleSource> = {
  pl: plSource,
  en: enSource,
  de: deSource,
  uk: ukSource,
}

export const routes: Record<Locale, Record<PageKey, string>> = {
  pl: { home: "/", about: "/o-nas", services: "/uslugi", pricing: "/cennik", gallery: "/galeria", contact: "/kontakt" },
  en: { home: "/en", about: "/en/about-us", services: "/en/services", pricing: "/en/pricing", gallery: "/en/gallery", contact: "/en/contact" },
  de: { home: "/de", about: "/de/uber-uns", services: "/de/angebote", pricing: "/de/preise", gallery: "/de/galerie", contact: "/de/kontakt" },
  uk: { home: "/uk", about: "/uk/про-нас", services: "/uk/послуги", pricing: "/uk/ціни", gallery: "/uk/галерея", contact: "/uk/контакти" },
}

export const localeOrder: Locale[] = ["pl", "en", "de", "uk"]

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string }> = {
  pl: { short: "PL", name: "Polski", htmlLang: "pl" },
  en: { short: "EN", name: "English", htmlLang: "en" },
  de: { short: "DE", name: "Deutsch", htmlLang: "de" },
  uk: { short: "UA", name: "Українська", htmlLang: "uk" },
}

export function alternatesFor(page: PageKey) {
  return {
    "pl-PL": routes.pl[page],
    en: routes.en[page],
    de: routes.de[page],
    uk: routes.uk[page],
    "x-default": routes.pl[page],
  }
}

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const meta = sources[locale].meta[page]
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: routes[locale][page], languages: alternatesFor(page) },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${routes[locale][page]}`,
      locale: { pl: "pl_PL", en: "en_GB", de: "de_DE", uk: "uk_UA" }[locale],
    },
  }
}

export const contact = {
  phone: "+48 534 095 265",
  phoneHref: "tel:+48534095265",
  email: "bruchkarol@gmail.com",
  bookingUrl:
    "https://booksy.com/pl-pl/186342_boruch-myjnia-reczna-oklejanie-aut-powloki-ceramiczne-detailing-carwash-autowasch_motoryzacja_18078_szczecin",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=BORUCH+Myjnia+R%C4%99czna+Plac+Rod%C5%82a+8+Szczecin",
  facebook: "https://www.facebook.com/Boruch-Myjnia-101966125989872",
  instagram: "https://www.instagram.com/boruchmyjnia/",
}

/** Interface chrome only (navigation, controls, labels). All page copy comes from the source files. */
export const ui: Record<
  Locale,
  {
    nav: Record<PageKey, string>
    book: string
    call: string
    menu: string
    close: string
    language: string
    skip: string
    viewService: string
    allServices: string
    pricing: string
    individualQuote: string
    level: string
    openMap: string
    booksy: string
    follow: string
    photo: string
    of: string
    prev: string
    next: string
    closeLightbox: string
    rights: string
    sizes: string
    backToTop: string
    scroll: string
    process: string
    related: string
    allPhotos: string
    step: string
    openPhoto: string
    phoneLabel: string
    emailLabel: string
    priceLabel: string
    navigation: string
    compact: string
    medium: string
    large: string
  }
> = {
  pl: {
    nav: { home: "Strona główna", about: "O nas", services: "Usługi", pricing: "Cennik", gallery: "Galeria", contact: "Kontakt" },
    book: "Zarezerwuj",
    call: "Zadzwoń do nas",
    menu: "Menu",
    close: "Zamknij",
    language: "Język",
    skip: "Przejdź do treści",
    viewService: "Zobacz usługę",
    allServices: "Wszystkie usługi",
    pricing: "Cennik",
    individualQuote: "Wycena indywidualna",
    level: "Poziom",
    openMap: "Otwórz w Mapach Google",
    booksy: "Rezerwacja online - Booksy",
    follow: "Obserwuj",
    photo: "Zdjęcie",
    of: "z",
    prev: "Poprzednie zdjęcie",
    next: "Następne zdjęcie",
    closeLightbox: "Zamknij podgląd",
    rights: "Boruch Myjnia Szczecin",
    sizes: "Dopłaty za wielkość auta",
    backToTop: "Do góry",
    scroll: "Przewiń",
    process: "Przebieg usługi",
    related: "Zobacz również",
    allPhotos: "Zobacz galerię",
    step: "Etap",
    openPhoto: "Powiększ zdjęcie",
    phoneLabel: "Telefon",
    emailLabel: "E-mail",
    priceLabel: "Cena",
    navigation: "Nawigacja",
    compact: "Kompakt",
    medium: "Kombi, sedan",
    large: "SUV, minivan",
  },
  en: {
    nav: { home: "Home", about: "About Us", services: "Services", pricing: "Pricing", gallery: "Gallery", contact: "Contact" },
    book: "Book now",
    call: "Call Us",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
    viewService: "View service",
    allServices: "All services",
    pricing: "Pricing",
    individualQuote: "Individual quote",
    level: "Level",
    openMap: "Open in Google Maps",
    booksy: "Online booking - Booksy",
    follow: "Follow",
    photo: "Photo",
    of: "of",
    prev: "Previous photo",
    next: "Next photo",
    closeLightbox: "Close preview",
    rights: "Boruch Myjnia Szczecin",
    sizes: "Vehicle size surcharges",
    backToTop: "Back to top",
    scroll: "Scroll",
    process: "Process",
    related: "See also",
    allPhotos: "View gallery",
    step: "Step",
    openPhoto: "Enlarge photo",
    phoneLabel: "Phone",
    emailLabel: "E-mail",
    priceLabel: "Price",
    navigation: "Navigation",
    compact: "Compact",
    medium: "Estate, sedan",
    large: "SUV, minivan",
  },
  de: {
    nav: { home: "Startseite", about: "Über uns", services: "Angebote", pricing: "Preise", gallery: "Galerie", contact: "Kontakt" },
    book: "Termin buchen",
    call: "Anrufen",
    menu: "Menü",
    close: "Schließen",
    language: "Sprache",
    skip: "Zum Inhalt springen",
    viewService: "Leistung ansehen",
    allServices: "Alle Angebote",
    pricing: "Preise",
    individualQuote: "Individuelles Angebot",
    level: "Ebene",
    openMap: "In Google Maps öffnen",
    booksy: "Online-Buchung - Booksy",
    follow: "Folgen",
    photo: "Foto",
    of: "von",
    prev: "Vorheriges Foto",
    next: "Nächstes Foto",
    closeLightbox: "Vorschau schließen",
    rights: "Boruch Myjnia Szczecin",
    sizes: "Aufpreis nach Fahrzeuggröße",
    backToTop: "Nach oben",
    scroll: "Scrollen",
    process: "Ablauf",
    related: "Siehe auch",
    allPhotos: "Zur Galerie",
    step: "Schritt",
    openPhoto: "Foto vergrößern",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    priceLabel: "Preis",
    navigation: "Navigation",
    compact: "Kompakt",
    medium: "Kombi, Limousine",
    large: "SUV, Minivan",
  },
  uk: {
    nav: { home: "Головна", about: "Про нас", services: "Послуги", pricing: "Ціни", gallery: "Галерея", contact: "Контакти" },
    book: "Забронювати",
    call: "Зателефонуйте нам",
    menu: "Меню",
    close: "Закрити",
    language: "Мова",
    skip: "Перейти до змісту",
    viewService: "Переглянути послугу",
    allServices: "Усі послуги",
    pricing: "Ціни",
    individualQuote: "Індивідуальна оцінка",
    level: "Рівень",
    openMap: "Відкрити в Google Maps",
    booksy: "Онлайн-бронювання - Booksy",
    follow: "Стежте за нами",
    photo: "Фото",
    of: "з",
    prev: "Попереднє фото",
    next: "Наступне фото",
    closeLightbox: "Закрити перегляд",
    rights: "Boruch Myjnia Szczecin",
    sizes: "Доплата за розмір авто",
    backToTop: "Нагору",
    scroll: "Гортайте",
    process: "Процес",
    related: "Дивіться також",
    allPhotos: "Переглянути галерею",
    step: "Етап",
    openPhoto: "Збільшити фото",
    phoneLabel: "Телефон",
    emailLabel: "E-mail",
    priceLabel: "Ціна",
    navigation: "Навігація",
    compact: "Компакт",
    medium: "Універсал, седан",
    large: "SUV, мінівен",
  },
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
