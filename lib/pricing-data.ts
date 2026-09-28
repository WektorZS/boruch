// Prices sourced directly from boruchmyjnia.pl/cennik (fetched live). Real figures only.

export interface PriceItem {
  name: string
  price: string
  note?: string
  href?: string
}

export interface PriceGroup {
  title: string
  items: PriceItem[]
}

export const priceGroups: PriceGroup[] = [
  {
    title: "Myjnia",
    items: [
      { name: "Czyszczenie zewnątrz", price: "od 110 zł", href: "/mycie-zewnatrz" },
      { name: "Czyszczenie wnętrza", price: "od 130 zł", href: "/czyszczenie-wnetrza" },
      { name: "Pakiet Komplet", price: "od 220 zł", note: "rabat na mycie + wnętrze", href: "/komplet" },
      { name: "Pranie tapicerki", price: "350 zł", href: "/pranie-tapicerki" },
      { name: "Czyszczenie i impregnacja skór", price: "do uzgodnienia", href: "/czyszczenie-skor" },
    ],
  },
  {
    title: "Detailing",
    items: [
      { name: "Oklejanie folią PPF / lamp / szyb, dechroming", price: "od 350 zł", href: "/folia-ppf" },
      { name: "Ręczne woskowanie", price: "400 zł", href: "/woskowanie" },
      { name: "Aplikacja powłoki ceramicznej", price: "do uzgodnienia", href: "/powloka-ceramiczna" },
      { name: "Korekta lakieru, polerowanie, glinkowanie", price: "do uzgodnienia", href: "/korekta-lakieru" },
      { name: "Przyciemnianie szyb i lamp", price: "do uzgodnienia", href: "/przyciemnianie-szyb-i-lamp" },
      { name: "Zmiana koloru / Dechroming", price: "od 350 zł", href: "/zmiana-koloru-dechroming" },
    ],
  },
]

export const priceDisclaimer =
  "Ceny dotyczą auta wielkości kompakt (małe). Auta średnie (kombi, sedan): +10 zł do ceny. Auta duże (SUV, minivan): +30 zł do ceny. Usługi oznaczone „do uzgodnienia” nie mają stałej ceny — zależą od stanu lakieru i etapów potrzebnych do uzyskania zadowalającego efektu."
