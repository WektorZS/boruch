// Verified business information, sourced directly from boruchmyjnia.pl (fetched live).
// Do not invent or alter these facts — update only when the source site changes.

export const siteConfig = {
  name: "Boruch Myjnia",
  legalName: "BORUCH Myjnia Ręczna & Detailing",
  owner: "Karol Bruch",
  tagline: "SPA dla Twojego auta",
  city: "Szczecin",
  description:
    "Ręczna myjnia samochodowa i studio detailingowe w centrum Szczecina. Mycie zewnątrz i wnętrza, pranie tapicerki, powłoki ceramiczne, folia PPF, przyciemnianie szyb, korekta lakieru i zmiana koloru.",
  phone: "+48 534 095 265",
  phoneHref: "tel:+48534095265",
  email: "bruchkarol@gmail.com",
  address: {
    line1: "Plac Rodła 8",
    line2: "Parking podziemny PAZIM, poziom -2",
    postalCode: "70-419",
    city: "Szczecin",
    country: "Polska",
  },
  bookingUrl:
    "https://booksy.com/pl-pl/186342_boruch-myjnia-reczna-oklejanie-aut-powloki-ceramiczne-detailing-carwash-autowasch_motoryzacja_18078_szczecin",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Plac+Rodła+8+Szczecin+PAZIM",
  sourceUrl: "https://boruchmyjnia.pl",
} as const

export const primaryNav = [
  { title: "Strona główna", href: "/" },
  { title: "O nas", href: "/o-nas" },
  { title: "Usługi", href: "/uslugi" },
  { title: "Cennik", href: "/cennik" },
  { title: "Galeria", href: "/galeria" },
  { title: "Kontakt", href: "/kontakt" },
] as const

export const myjniaNav = [
  { title: "Mycie zewnątrz", href: "/mycie-zewnatrz" },
  { title: "Czyszczenie wnętrza", href: "/czyszczenie-wnetrza" },
  { title: "Pranie tapicerki", href: "/pranie-tapicerki" },
  { title: "Czyszczenie i impregnacja skór", href: "/czyszczenie-skor" },
  { title: "Pakiet Komplet", href: "/komplet" },
] as const

export const detailingNav = [
  { title: "Oklejanie folią PPF", href: "/folia-ppf" },
  { title: "Powłoka ceramiczna", href: "/powloka-ceramiczna" },
  { title: "Ręczne woskowanie", href: "/woskowanie" },
  { title: "Przyciemnianie szyb i lamp", href: "/przyciemnianie-szyb-i-lamp" },
  { title: "Korekta lakieru", href: "/korekta-lakieru" },
  { title: "Polerowanie", href: "/polerowanie" },
  { title: "Zmiana koloru / Dechroming", href: "/zmiana-koloru-dechroming" },
] as const
