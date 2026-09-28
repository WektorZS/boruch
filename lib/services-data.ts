// Content sourced and translated/condensed from the live pages of boruchmyjnia.pl
// (fetched directly from /mycie-zewnatrz, /czyszczenie-wnetrza, /komplet, etc).
// All claims, process steps and prices below are taken from the source site — nothing invented.

export type ServiceCategory = "myjnia" | "detailing"

export interface ProcessStep {
  title: string
  text: string
}

export interface Service {
  slug: string
  title: string
  metaTitle: string
  category: ServiceCategory
  icon:
    | "droplets"
    | "sparkles"
    | "washing-machine"
    | "armchair"
    | "gem"
    | "shield"
    | "hexagon"
    | "hand"
    | "contrast"
    | "wand"
    | "disc"
    | "palette"
  tagline: string
  priceFrom: string
  priceNote?: string
  heroImage: string
  intro: string[]
  highlightsTitle: string
  highlights: string[]
  process: ProcessStep[]
  whyUsTitle: string
  whyUs: string[]
  closing: string
}

export const carSizeSurcharge =
  "Ceny dotyczą auta wielkości kompakt (małe). Auta średnie (kombi, sedan) — +10 zł do ceny. Auta duże (SUV, minivan) — +30 zł do ceny."

export const services: Service[] = [
  {
    slug: "mycie-zewnatrz",
    title: "Mycie zewnątrz",
    metaTitle: "Mycie auta Szczecin — ręczne mycie zewnętrzne",
    category: "myjnia",
    icon: "droplets",
    tagline: "Twoje auto będzie czyste jak z salonu",
    priceFrom: "110 zł",
    priceNote: "w zależności od wielkości auta",
    heroImage: "/images/gallery/gallery-01.jpg",
    intro: [
      "Mycie zewnątrz samochodu to podstawowy, ale niezwykle istotny element pielęgnacji auta, który wpływa na estetykę, ochronę lakieru i trwałość powierzchni lakierniczej.",
      "W Boruch Myjnia oferujemy profesjonalne mycie ręczne, które dokładnie usuwa brud, kurz, owady i resztki soli, jednocześnie zabezpieczając lakier i inne powierzchnie zewnętrzne przed uszkodzeniami. Pracujemy wyłącznie na bezpiecznych, sprawdzonych środkach przyjaznych dla lakieru, uszczelek i elementów plastikowych.",
    ],
    highlightsTitle: "Co wchodzi w skład zestawu?",
    highlights: [
      "Ręczne mycie wstępne",
      "Ręczne mycie zasadnicze",
      "Aplikacja powłoki hydrofobowej",
      "Dokładne suszenie",
      "Mycie gumowych dywaników",
      "Nabłyszczanie opon",
      "Mycie felg",
    ],
    process: [
      {
        title: "Wstępne spłukanie auta",
        text: "Pojazd spłukujemy wodą pod wysokim ciśnieniem, usuwając luźne zabrudzenia — kurz, pył, błoto, resztki owadów — zanim przejdziemy do mycia ręcznego.",
      },
      {
        title: "Delikatne mycie ręczne karoserii",
        text: "Karoserię myjemy ręcznie gąbkami i mikrofibrą przy użyciu szamponów o neutralnym pH, które skutecznie usuwają zabrudzenia bez ryzyka dla lakieru.",
      },
      {
        title: "Czyszczenie felg i opon",
        text: "Felgi czyścimy specjalistycznymi preparatami usuwającymi pył hamulcowy, a opony zabezpieczamy środkami przywracającymi im głęboki, czarny kolor.",
      },
      {
        title: "Suszenie samochodu",
        text: "Auto jest dokładnie suszone ręcznikami z mikrofibry i sprężonym powietrzem, dzięki czemu nie zostają żadne zacieki wodne.",
      },
    ],
    whyUsTitle: "Dlaczego mycie zewnątrz w BORUCH Myjnia?",
    whyUs: [
      "Profesjonalne, bezpieczne środki czyszczące najwyższej jakości",
      "Ręczne mycie — dokładniejsze i delikatniejsze niż myjnie automatyczne",
      "Dbałość o każdy detal: karoserię, felgi, opony, szyby",
      "Indywidualne podejście do stanu pojazdu i potrzeb klienta",
      "Opcjonalne dodatkowe zabezpieczenie lakieru woskiem lub powłoką",
    ],
    closing:
      "Mycie zewnątrz samochodu w BORUCH Myjnia to usługa wykonywana z najwyższą starannością — bezpieczne środki i ręczne mycie gwarantują perfekcyjną czystość i zabezpieczenie powierzchni każdego dnia.",
  },
  {
    slug: "czyszczenie-wnetrza",
    title: "Czyszczenie wnętrza",
    metaTitle: "Czyszczenie wnętrza auta Szczecin — detailing wnętrza",
    category: "myjnia",
    icon: "sparkles",
    tagline: "Zajmiemy się wnętrzem auta od A do Z",
    priceFrom: "130 zł",
    priceNote: "w zależności od wielkości auta",
    heroImage: "/images/gallery/gallery-02.jpg",
    intro: [
      "Wnętrze pojazdu to przestrzeń, w której spędzamy najwięcej czasu — dlatego jego czystość, świeżość i higiena są kluczowe nie tylko dla komfortu, ale i zdrowia.",
      "W BORUCH Myjnia oferujemy profesjonalne czyszczenie wnętrza auta, które obejmuje dokładne odkurzanie, mycie, czyszczenie plastików, szyb, nawiewów i trudno dostępnych zakamarków — na bezpiecznych, certyfikowanych środkach czyszczących.",
    ],
    highlightsTitle: "Co wchodzi w skład zestawu?",
    highlights: [
      "Odkurzanie wnętrza pojazdu",
      "Odkurzanie bagażnika",
      "Czyszczenie elementów plastikowych",
      "Czyszczenie i pielęgnacja kokpitu",
      "Mycie szyb",
      "Neutralizacja zapachów (opcjonalnie)",
    ],
    process: [
      {
        title: "Odkurzanie całego wnętrza",
        text: "Dokładnie odkurzamy dywaniki, wykładzinę, przestrzenie pod siedzeniami, bagażnik i szczeliny między fotelami specjalistycznymi odkurzaczami z końcówkami detailingowymi.",
      },
      {
        title: "Czyszczenie plastików i kokpitu",
        text: "Deskę rozdzielczą, boczki drzwi, schowki i nawiewy czyścimy antystatycznymi środkami, które zapobiegają ponownemu osadzaniu się kurzu.",
      },
      {
        title: "Czyszczenie szyb od wewnątrz",
        text: "Szyby czyścimy profesjonalnymi płynami bez smug, co poprawia widoczność i bezpieczeństwo jazdy.",
      },
      {
        title: "Detale i wykończenie",
        text: "Na koniec dbamy o szczeliny, kratki nawiewów, przyciski, kierownicę i pasy bezpieczeństwa — każdy centymetr z chirurgiczną precyzją.",
      },
    ],
    whyUsTitle: "Co zyskujesz, wybierając czyszczenie wnętrza?",
    whyUs: [
      "Kompletną higienę i czystość, również w trudno dostępnych miejscach",
      "Usunięcie nieprzyjemnych zapachów, bakterii, roztoczy i alergenów",
      "Ochronę kokpitu, plastików i nawiewów przed promieniowaniem UV",
      "Zwiększenie wartości pojazdu przy sprzedaży",
      "Świeżość, elegancję i komfort podróży — jak w nowym aucie",
    ],
    closing:
      "Każde wnętrze traktujemy indywidualnie — z troską o każdy detal. Umów się na czyszczenie wnętrza samochodu i przekonaj się, jak wiele może zmienić precyzyjna, ręczna pielęgnacja.",
  },
  {
    slug: "pranie-tapicerki",
    title: "Pranie tapicerki",
    metaTitle: "Pranie tapicerki samochodowej Szczecin",
    category: "myjnia",
    icon: "washing-machine",
    tagline: "Dogłębne czyszczenie foteli, kanap, podsufitki i dywaników",
    priceFrom: "350 zł",
    heroImage: "/images/gallery/gallery-03.jpg",
    intro: [
      "Z biegiem czasu tapicerka samochodowa chłonie kurz, brud, pot, resztki jedzenia, sierść i wilgoć. Nawet przy regularnym odkurzaniu zanieczyszczenia wnikają głęboko w strukturę materiału, powodując plamy, nieprzyjemne zapachy i rozwój drobnoustrojów.",
      "W Boruch Myjnia korzystamy z ekstrakcyjnych odkurzaczy piorących i atestowanych środków czyszczących, dzięki czemu usuwamy zabrudzenia, alergeny i zapachy aż do warstwy pianki tapicerskiej — w pełni bezpiecznie dla ludzi i tkanin.",
    ],
    highlightsTitle: "Co możemy zaoferować jako pranie tapicerki?",
    highlights: [
      "Fotele przednie i tylne",
      "Kanapy tylne",
      "Podsufitka (jeśli stan materiału na to pozwala)",
      "Boczne panele drzwi z materiałem",
      "Dywaniki materiałowe i wykładzina podłogowa",
      "Bagażnik (tapicerowane elementy)",
      "Podłokietniki i zagłówki",
    ],
    process: [
      {
        title: "Początkowe odkurzanie tapicerki",
        text: "Usuwamy kurz, okruchy, piasek i sierść specjalistycznymi ssawkami detailingowymi, docierając do szczelin i zagięć.",
      },
      {
        title: "Naniesienie środka prespray i odplamianie",
        text: "Rozpylamy aktywną pianę rozpuszczającą zabrudzenia, a trudne plamy usuwamy skoncentrowanymi środkami punktowymi.",
      },
      {
        title: "Czyszczenie ręczne i mechaniczne",
        text: "Szorujemy tapicerkę miękkimi szczotkami lub padami orbitalnymi, wydobywając brud z głębokich warstw materiału bez uszkodzenia struktury.",
      },
      {
        title: "Płukanie ekstrakcyjne i suszenie",
        text: "Rozpuszczony brud i nadmiar wilgoci zasysamy odkurzaczem piorącym, płukając wielokrotnie aż woda będzie czysta; na końcu tapicerka jest przewietrzana i podsuszana.",
      },
    ],
    whyUsTitle: "Zalety profesjonalnego prania tapicerki",
    whyUs: [
      "Dokładne usunięcie plam, brudu i nieprzyjemnych zapachów",
      "Bezpieczne środki klasy premium, które nie niszczą materiału",
      "Dogłębna dezynfekcja tapicerki, przyjazna alergikom",
      "Odświeżony wygląd i wyższy komfort jazdy",
      "Możliwość ozonowania lub aromatu premium na życzenie",
    ],
    closing:
      "Usługa sprawdza się w autach rodzinnych, taksówkach i pojazdach firmowych, gdzie czystość wnętrza jest wizytówką właściciela. Zadbamy o Twoje wnętrze tak, jakby było nasze.",
  },
  {
    slug: "czyszczenie-skor",
    title: "Czyszczenie i impregnacja skór",
    metaTitle: "Czyszczenie skór Szczecin — impregnacja tapicerki skórzanej",
    category: "myjnia",
    icon: "armchair",
    tagline: "Kompleksowa pielęgnacja tapicerki skórzanej",
    priceFrom: "do uzgodnienia",
    heroImage: "/images/gallery/gallery-04.jpg",
    intro: [
      "Tapicerka skórzana to synonim luksusu i prestiżu we wnętrzu samochodu. Aby zachowała nieskazitelny wygląd, miękkość i trwałość, wymaga regularnego czyszczenia i odpowiedniego zabezpieczenia.",
      "W Boruch Myjnia oferujemy kompleksowe czyszczenie i impregnację tapicerki skórzanej, bezpieczne dla każdego rodzaju skóry: gładkiej, perforowanej, lakierowanej czy nielakierowanej.",
    ],
    highlightsTitle: "Czym się zajmujemy",
    highlights: [
      "Fotele przednie i tylne",
      "Zagłówki i podłokietniki",
      "Tapicerowane boczki drzwi",
      "Kierownica i mieszek zmiany biegów",
      "Dekoracyjne wstawki skórzane",
    ],
    process: [
      {
        title: "Odkurzenie i przygotowanie",
        text: "Dokładnie odkurzamy tapicerkę, w tym szwy i zagłębienia, usuwając piasek i drobinki, które mogłyby zarysować powierzchnię skóry.",
      },
      {
        title: "Aplikacja środka czyszczącego",
        text: "Nanosimy specjalistyczny środek dobrany do rodzaju skóry, który rozpuszcza brud, tłuszcz, pot i plamy bez naruszania struktury materiału.",
      },
      {
        title: "Neutralizacja i impregnacja",
        text: "Skórę przemywamy neutralizatorem pH, a następnie aplikujemy profesjonalny impregnat, który odżywia materiał i tworzy barierę ochronną przed potem, wodą i UV.",
      },
      {
        title: "Finalne polerowanie",
        text: "Całość delikatnie polerujemy miękką mikrofibrą, uzyskując naturalny, satynowy wygląd bez sztucznego połysku.",
      },
    ],
    whyUsTitle: "Dlaczego warto zadbać o tapicerkę skórzaną?",
    whyUs: [
      "Przywracasz oryginalny kolor i wygląd skóry",
      "Zwiększasz komfort jazdy i estetykę wnętrza",
      "Chronisz skórę przed szybkim starzeniem i pękaniem",
      "Zwiększasz wartość pojazdu przy sprzedaży",
      "Zyskujesz trwały efekt bez śliskiego filmu",
    ],
    closing:
      "Pracujemy na renomowanych preparatach, z doświadczeniem i precyzją, dbając o każdy detal Twojego wnętrza. Umów się już dziś i przekonaj się, jak Twoje auto może wyglądać po profesjonalnej pielęgnacji.",
  },
  {
    slug: "komplet",
    title: "Pakiet Komplet",
    metaTitle: "Kompleksowe mycie auta Szczecin — Pakiet Komplet",
    category: "myjnia",
    icon: "gem",
    tagline: "Kompleksowe czyszczenie wewnątrz i zewnątrz",
    priceFrom: "220 zł",
    priceNote: "w zależności od wielkości auta — rabat na czyszczenie wnętrza i zewnątrz",
    heroImage: "/images/gallery/gallery-05.jpg",
    intro: [
      "Szukasz pełnego odświeżenia auta, które sprawi, że będzie wyglądało i pachniało jak nowe? Nasz Pakiet Komplet łączy profesjonalne mycie zewnętrzne, dokładne czyszczenie wnętrza oraz elementy pielęgnacyjne i konserwujące, które zapewniają trwały efekt.",
      "To idealna opcja zarówno dla samochodów prywatnych, jak i służbowych — przed sprzedażą, po wakacjach lub po zimie. Stawiamy na detailingową precyzję i bezpieczne środki klasy premium.",
    ],
    highlightsTitle: "Co obejmuje pakiet?",
    highlights: [
      "Dwufazowe mycie karoserii i mycie na dwa wiadra",
      "Czyszczenie nadkoli, wnęk drzwi i felg",
      "Odkurzanie wnętrza wraz z bagażnikiem",
      "Czyszczenie plastików, kokpitu, nawiewów i progów",
      "Mycie szyb od wewnątrz i zewnątrz",
      "Neutralizacja nieprzyjemnych zapachów",
      "Szybki wosk hydrofobowy na karoserię",
    ],
    process: [
      {
        title: "Mycie zewnętrzne premium",
        text: "Zaczynamy od dwufazowego mycia — aktywna piana i ręczne mycie na dwa wiadra rękawicami z mikrofibry, bez ryzyka zarysowań lakieru.",
      },
      {
        title: "Czyszczenie wnętrza",
        text: "Odkurzamy całe wnętrze wraz z bagażnikiem, czyścimy plastiki i kokpit środkami antystatycznymi dla matowego, fabrycznego wykończenia.",
      },
      {
        title: "Pielęgnacja i zabezpieczenie",
        text: "Aplikujemy szybki wosk hydrofobowy podbijający połysk lakieru oraz dressingi do plastików i impregnat do tapicerki.",
      },
      {
        title: "Pranie tapicerki (opcjonalnie)",
        text: "Pakiet można poszerzyć o pranie tapicerki materiałowej lub czyszczenie skór, usuwające plamy i nieprzyjemne zapachy.",
      },
    ],
    whyUsTitle: "Dlaczego warto wybrać Pakiet Komplet?",
    whyUs: [
      "Kompleksowe czyszczenie auta z każdej strony",
      "Bezpieczne środki najwyższej jakości",
      "Dokładność, której nie oferują zwykłe myjnie",
      "Wszystko załatwione podczas jednej wizyty",
      "Idealny przed sprzedażą, po zimie lub dla flot firmowych",
    ],
    closing:
      "Zadbaj o swoje auto kompleksowo. Wybierz Pakiet Komplet w BORUCH Myjnia — bo czystość to nie tylko wygląd, ale również komfort i dbałość o prestiż Twojego pojazdu.",
  },
  {
    slug: "folia-ppf",
    title: "Oklejanie folią PPF",
    metaTitle: "Folia PPF Szczecin — oklejanie folią PPF",
    category: "detailing",
    icon: "shield",
    tagline: "Profesjonalna ochrona lakieru premium",
    priceFrom: "350 zł",
    heroImage: "/images/gallery/gallery-06.jpg",
    intro: [
      "Folia PPF (Paint Protection Film) to obecnie najskuteczniejszy sposób na zabezpieczenie lakieru przed zarysowaniami, odpryskami, solą drogową, owadami i innymi czynnikami zewnętrznymi.",
      "W BORUCH Myjnia oferujemy oklejanie auta folią PPF z użyciem najwyższej jakości folii ochronnych, niemal niewidocznych dla oka, a jednocześnie niezwykle trwałych i elastycznych — dla kierowców, którzy chcą zachować perfekcyjny wygląd auta przez wiele lat.",
    ],
    highlightsTitle: "Co możemy okleić folią PPF?",
    highlights: [
      "Pakiet frontowy — maska, błotniki, zderzak, lusterka",
      "Pakiet rozszerzony — dodatkowo słupki A, próg załadunkowy, lampy",
      "Pakiet pełny — całe auto, każdy lakierowany element",
      "Elementy niestandardowe — progi, wnęki, spoilery, słupki piano black",
    ],
    process: [
      {
        title: "Przygotowanie i mycie detailingowe",
        text: "Wykonujemy mycie wstępne, ręczne, dekontaminację lakieru i dokładne odtłuszczenie karoserii — czysta powierzchnia to podstawa perfekcyjnej aplikacji.",
      },
      {
        title: "Aplikacja folii PPF",
        text: "Folię nakładamy ręcznie i precyzyjnie, wykorzystując szablony komputerowe (plotery) lub cięcia ręczne, rozciąganą i aplikowaną na mokro dla idealnego spasowania.",
      },
      {
        title: "Wygrzewanie i kontrola jakości",
        text: "Folia jest osuszana i wygrzewana lampami IR, co stabilizuje jej ułożenie, a następnie kontrolujemy wszystkie krawędzie i linie cięcia.",
      },
    ],
    whyUsTitle: "Dlaczego oklejanie folią PPF w BORUCH Myjnia?",
    whyUs: [
      "Doświadczenie w aplikacji folii klasy premium (np. Llumar, XPEL, 3M)",
      "Idealne warunki do aplikacji — czyste, zamknięte pomieszczenie",
      "Dbałość o szczegóły i indywidualne podejście do każdego auta",
      "Efekt samoregeneracji — drobne rysy znikają pod wpływem ciepła",
      "Możliwość łączenia z powłoką ceramiczną lub stylizacją",
    ],
    closing:
      "Chroń to, co najcenniejsze w Twoim aucie. Zainwestuj w oklejanie auta folią PPF w BORUCH Myjnia i ciesz się nieskazitelnym lakierem przez lata.",
  },
  {
    slug: "powloka-ceramiczna",
    title: "Powłoka ceramiczna",
    metaTitle: "Powłoka ceramiczna Szczecin — ochrona i połysk lakieru",
    category: "detailing",
    icon: "hexagon",
    tagline: "Ochrona i połysk lakieru na lata",
    priceFrom: "do uzgodnienia",
    priceNote: "dostępne warianty: 2, 5 i 7 lat",
    heroImage: "/images/gallery/gallery-07.jpg",
    intro: [
      "Powłoka ceramiczna to jedna z najskuteczniejszych metod długoterminowego zabezpieczenia lakieru samochodu przed wpływem czynników zewnętrznych. Dzięki nanotechnologii tworzy niewidzialną, twardą i odporną barierę ochronną.",
      "W BORUCH Myjnia oferujemy aplikację profesjonalnych powłok ceramicznych klasy premium marek Fireball, Gyeon, Soft99 i Kisho, które gwarantują głęboki połysk i trwałość nawet do 7 lat.",
    ],
    highlightsTitle: "Dostępne warianty",
    highlights: ["2-letnia powłoka ceramiczna", "5-letnia powłoka ceramiczna", "7-letnia powłoka ceramiczna"],
    process: [
      {
        title: "Mycie detailingowe i dekontaminacja",
        text: "Dokładnie oczyszczamy karoserię z smoły, lotnej rdzy i osadów drogowych specjalistyczną chemią bezpieczną dla lakieru i uszczelek.",
      },
      {
        title: "Inspekcja i korekta lakieru",
        text: "Wykonujemy jedno- lub wieloetapową korektę lakieru, usuwając mikro-rysy i przywracając maksymalną głębię koloru przed aplikacją powłoki.",
      },
      {
        title: "Odtłuszczanie i aplikacja",
        text: "Powierzchnię odtłuszczamy alkoholem izopropylowym, a powłokę nanosimy ręcznie aplikatorami i mikrofibrą w kontrolowanych warunkach hali.",
      },
      {
        title: "Utwardzanie i kontrola jakości",
        text: "Pojazd trafia do strefy wygrzewania, gdzie powłoka osiąga maksymalną twardość, po czym przeprowadzamy dokładną kontrolę każdego elementu.",
      },
    ],
    whyUsTitle: "Dlaczego warto nałożyć powłokę ceramiczną?",
    whyUs: [
      "Trwała ochrona przed solą, brudem, ptasimi odchodami, sokami z drzew",
      "Efekt hydrofobowy — woda i zabrudzenia spływają z karoserii",
      "Mikroodporność na zarysowania i uszkodzenia mechaniczne",
      "Odporność na UV — brak blaknięcia lakieru",
      "Wyższa wartość pojazdu przy odsprzedaży",
    ],
    closing:
      "Zadbaj o swój samochód na poziomie premium. Postaw na powłokę ceramiczną w BORUCH Myjnia i ciesz się perfekcyjnym wyglądem i ochroną lakieru przez lata.",
  },
  {
    slug: "woskowanie",
    title: "Ręczne woskowanie",
    metaTitle: "Woskowanie auta Szczecin — ręczne woskowanie",
    category: "detailing",
    icon: "hand",
    tagline: "Ochrona i połysk lakieru",
    priceFrom: "400 zł",
    heroImage: "/images/gallery/gallery-08.jpg",
    intro: [
      "Ręczne woskowanie to jedna z najstarszych, ale wciąż bardzo skutecznych metod zabezpieczenia lakieru. W BORUCH Myjnia łączymy tradycję z nowoczesnością, korzystając z wosków syntetycznych i naturalnych (carnauba).",
      "W odróżnieniu od maszynowego nabłyszczania, ręczne nakładanie wosku pozwala na precyzyjne pokrycie każdego elementu karoserii, co przekłada się na lepszą trwałość i głębszy połysk.",
    ],
    highlightsTitle: "Co daje ręczne woskowanie?",
    highlights: [
      "Ochrona przed UV, solą drogową i kwaśnymi deszczami",
      "Zabezpieczenie przed brudem — auto dłużej pozostaje czyste",
      "Efekt hydrofobowy — woda i błoto spływają z karoserii",
      "Lustrzany połysk i podbicie koloru lakieru",
      "Ułatwione mycie auta po woskowaniu",
    ],
    process: [
      {
        title: "Mycie i dekontaminacja lakieru",
        text: "Usuwamy smołę, żywicę, pył z klocków hamulcowych i lotną rdzę precyzyjnym myciem detailingowym.",
      },
      {
        title: "Odtłuszczenie powierzchni",
        text: "Karoserię dokładnie odtłuszczamy specjalistycznymi preparatami, by wosk dobrze związał się z powierzchnią.",
      },
      {
        title: "Ręczna aplikacja wosku",
        text: "Wosk nanosimy ręcznie miękkimi aplikatorami, dobierając rodzaj — twardy, miękki, syntetyczny lub naturalny carnauba.",
      },
      {
        title: "Docieranie i polerowanie",
        text: "Po czasie utwardzania wosk jest wypolerowany miękkimi mikrofibrami, co daje efekt głębokiego połysku i lustrzanego odbicia.",
      },
    ],
    whyUsTitle: "Dlaczego woskowanie u nas?",
    whyUs: [
      "Pracujemy wyłącznie na renomowanych markach wosków",
      "Ręczna aplikacja — maksymalna precyzja i trwałość",
      "Bezpieczne środki, bez silikonów i taniej chemii",
      "Możliwość połączenia z innymi usługami detailingowymi",
    ],
    closing:
      "Umów się na ręczne woskowanie w BORUCH Myjnia i daj swojemu lakierowi to, na co zasługuje — naturalny blask i trwałą ochronę.",
  },
  {
    slug: "przyciemnianie-szyb-i-lamp",
    title: "Przyciemnianie szyb i lamp",
    metaTitle: "Przyciemnianie szyb Szczecin — folia na szyby i lampy",
    category: "detailing",
    icon: "contrast",
    tagline: "Styl, komfort i ochrona w jednym",
    priceFrom: "do uzgodnienia",
    heroImage: "/images/gallery/gallery-09.jpg",
    intro: [
      "Przyciemnianie szyb i lamp to usługa, która łączy estetykę, prywatność i funkcjonalność. W BORUCH Myjnia wykonujemy przyciemnianie przy użyciu profesjonalnych folii najwyższej jakości, zapewniających trwałość, bezpieczeństwo i zgodność z przepisami prawa.",
      "Dzięki odpowiednio dobranej folii samochód zyskuje nowoczesny, elegancki wygląd, a wnętrze staje się bardziej komfortowe — termicznie i wizualnie.",
    ],
    highlightsTitle: "Co daje przyciemnianie szyb?",
    highlights: [
      "Zmniejszenie nagrzewania wnętrza latem — ochrona przed słońcem nawet do 70%",
      "Zwiększenie prywatności — mniej widoczna zawartość wnętrza",
      "Ochrona przed promieniowaniem UV tapicerki i plastików",
      "Redukcja oślepiającego światła reflektorów nocą",
      "Wzmocnienie szyby, utrudniające jej rozbicie przy wypadku",
    ],
    process: [
      {
        title: "Konsultacja i dobór stopnia przyciemnienia",
        text: "Doradzamy odpowiedni stopień przyciemnienia zgodny z prawem — najczęściej 15%, 20%, 35% lub 50% przepuszczalności światła.",
      },
      {
        title: "Przygotowanie i przycinanie folii",
        text: "Szyby czyścimy w bezpyłowym środowisku, a folię cięte ręcznie lub ploterami dopasowujemy indywidualnie do modelu pojazdu.",
      },
      {
        title: "Aplikacja i suszenie",
        text: "Po montażu folia jest suszona i zabezpieczona, a cały pojazd sprawdzany pod kątem detali i estetyki wykończenia.",
      },
    ],
    whyUsTitle: "Dlaczego przyciemnianie w BORUCH Myjnia?",
    whyUs: [
      "Certyfikowane folie klasy premium (np. 3M, Llumar, SunTek)",
      "Pełna zgodność z przepisami prawa",
      "Nie uszkadzamy oryginalnych elementów auta",
      "Gwarancja na folię i montaż",
      "Możliwość łączenia z innymi usługami detailingowymi",
    ],
    closing:
      "Wybierz przyciemnianie szyb i lamp w BORUCH Myjnia — zrobimy to profesjonalnie, bezpiecznie i zgodnie z Twoimi oczekiwaniami.",
  },
  {
    slug: "korekta-lakieru",
    title: "Korekta lakieru",
    metaTitle: "Korekta lakieru Szczecin — usuwanie rys i defektów",
    category: "detailing",
    icon: "wand",
    tagline: "Przywróć blask swojemu samochodowi",
    priceFrom: "do uzgodnienia",
    heroImage: "/images/gallery/gallery-10.jpg",
    intro: [
      "Korekta lakieru to zaawansowany proces, którego celem jest usunięcie mikrozarysowań, utlenień, hologramów i innych defektów lakieru powstałych na skutek mycia automatycznego, promieni UV czy codziennego użytkowania auta.",
      "W BORUCH Myjnia wykonujemy korektę na maszynach Dual Action (DA) i rotacyjnych, z użyciem past marek Koch Chemie, Menzerna, Flex, Rupes i ADBL, bezpiecznie przywracając lakierowi głębię koloru i efekt nowości.",
    ],
    highlightsTitle: "Co daje korekta lakieru?",
    highlights: [
      "Usunięcie zarysowań, swirli i hologramów",
      "Przywrócenie głębi koloru i połysku lakieru",
      "Przygotowanie powierzchni pod powłokę ceramiczną lub wosk",
      "Profesjonalny efekt bez potrzeby ponownego lakierowania",
    ],
    process: [
      {
        title: "Diagnostyka i pomiar grubości lakieru",
        text: "Miernikiem grubości sprawdzamy stan powłoki i oceniamy zakres bezpiecznej korekty, wykrywając miejsca wcześniej polerowane.",
      },
      {
        title: "Mycie detailingowe i dekontaminacja",
        text: "Usuwamy piach, smołę, opiłki metalu i inne zanieczyszczenia, stosując deironizer i glinkowanie przed polerowaniem.",
      },
      {
        title: "Dobór techniki i polerowanie maszynowe",
        text: "W zależności od stanu lakieru wybieramy korektę jedno-, dwu- lub trójetapową — od usunięcia 50–70% rys do efektu „show car”.",
      },
      {
        title: "Odtłuszczenie i kontrola efektu",
        text: "Po każdym etapie odtłuszczamy lakier IPA, oceniamy realny postęp i wykonujemy lokalne poprawki w razie potrzeby.",
      },
    ],
    whyUsTitle: "Dlaczego korekta lakieru w BORUCH Myjnia?",
    whyUs: [
      "Profesjonalne środki i maszyny klasy premium",
      "Każde auto traktujemy indywidualnie, bez pośpiechu",
      "Realne efekty bez maskowania rys",
      "Możliwość łączenia z powłoką ceramiczną lub folią PPF",
    ],
    closing:
      "Twoje auto zasługuje na nowy blask. Zadbaj o perfekcyjny wygląd lakieru dzięki korekcie lakieru w BORUCH Myjnia — profesjonalnie, bezpiecznie i z gwarantowanym efektem.",
  },
  {
    slug: "polerowanie",
    title: "Polerowanie",
    metaTitle: "Polerowanie auta Szczecin — renowacja lakieru",
    category: "detailing",
    icon: "disc",
    tagline: "Nadaj swojemu autu nowy połysk",
    priceFrom: "do uzgodnienia",
    heroImage: "/images/gallery/gallery-11.jpg",
    intro: [
      "Polerowanie lakieru to usługa, która pozwala w spektakularny sposób odświeżyć wygląd samochodu — usuwamy zmatowienia, drobne zarysowania i utlenienia lakieru, poprawiając głębię koloru bez konieczności lakierowania karoserii.",
      "W BORUCH Myjnia wykonujemy polerowanie na maszynach DA i rotacyjnych z pastami marek Menzerna, Koch Chemie, Rupes i ADBL, pracując na zimno, by nie przegrzewać lakieru.",
    ],
    highlightsTitle: "Co daje polerowanie lakieru?",
    highlights: [
      "Widoczne odświeżenie wyglądu auta",
      "Usunięcie zmatowień, lekkich rys i nalotów",
      "Efekt szklistości i głębokiego koloru",
      "Przygotowanie lakieru pod powłokę ceramiczną lub wosk",
    ],
    process: [
      {
        title: "Ocena lakieru i pomiar grubości",
        text: "Sprawdzamy stan powłoki lakierniczej miernikiem oraz analizujemy głębokość rys, by polerowanie było w pełni bezpieczne.",
      },
      {
        title: "Mycie wstępne i dekontaminacja",
        text: "Wielofazowe mycie detailingowe i glinkowanie karoserii usuwają wszystko, co mogłoby zakłócić proces polerowania.",
      },
      {
        title: "Dobór metody i praca maszynowa",
        text: "W zależności od stanu lakieru proponujemy polerowanie jednorazowe (One Step), wykończeniowe (Finish) lub pełne (Cut + Polish, korekta do 70% rys).",
      },
      {
        title: "Odtłuszczanie i inspekcja",
        text: "Powierzchnię odtłuszczamy preparatem IPA, by zobaczyć realny efekt i wykonać ewentualne poprawki w trudnych miejscach.",
      },
    ],
    whyUsTitle: "Dlaczego polerowanie w BORUCH Myjnia?",
    whyUs: [
      "Doświadczenie i pasja do detailingu",
      "Najwyższej jakości sprzęt i środki do polerowania",
      "Bezpieczeństwo i precyzja na każdym etapie",
      "Efekty widoczne od razu — lakier jak lustro",
    ],
    closing:
      "Chcesz, aby Twoje auto znów lśniło jak nowe? Postaw na profesjonalne polerowanie lakieru w BORUCH Myjnia — efekt, który mówi sam za siebie.",
  },
  {
    slug: "zmiana-koloru-dechroming",
    title: "Zmiana koloru / Dechroming",
    metaTitle: "Zmiana koloru auta Szczecin — dechroming i oklejanie",
    category: "detailing",
    icon: "palette",
    tagline: "Nowoczesny wygląd i ochrona w jednym",
    priceFrom: "350 zł",
    heroImage: "/images/home/hero-2-car-wrapping.jpg",
    intro: [
      "Zmiana koloru auta folią + dechroming to kompleksowy sposób na całkowitą transformację wizualną Twojego pojazdu — szybko, efektownie i bez ingerencji w oryginalny lakier.",
      "Zmiana koloru polega na precyzyjnym oklejeniu całej karoserii wysokiej jakości folią winylową (mat, połysk, satyna, perła, carbon). Dechroming to oklejenie chromowanych elementów — listew, oznaczeń, grilla, końcówek wydechu — folią czarną matową, błyszczącą lub satynową, dla efektu „Black Pack”.",
    ],
    highlightsTitle: "Zalety zmiany koloru i dechromingu",
    highlights: [
      "Ochrona lakieru przed zarysowaniami i promieniowaniem UV",
      "Folia jest odklejalna — możliwość powrotu do oryginalnego wyglądu",
      "Ogromna paleta kolorów i efektów specjalnych",
      "Tańsza i szybsza alternatywa dla lakierowania",
      "Brak odblasków i lepsze dopasowanie chromów do koloru auta",
    ],
    process: [
      {
        title: "Konsultacja i dobór folii",
        text: "Pomagamy dobrać kolor i efekt wykończenia (mat, połysk, satyna, carbon) oraz ustalamy, które elementy chromowane zostaną poddane dechromingowi.",
      },
      {
        title: "Przygotowanie powierzchni",
        text: "Wykonujemy dokładne mycie detailingowe, dekontaminację i odtłuszczenie, a elementy takie jak klamki i listwy demontujemy dla idealnych krawędzi.",
      },
      {
        title: "Aplikacja folii na karoserię",
        text: "Cała karoseria zostaje precyzyjnie oklejona wybraną folią, z dbałością o każdy detal — linie załamań, przetłoczenia, zakamarki.",
      },
      {
        title: "Wygrzewanie i kontrola jakości",
        text: "Folie są dokładnie wygrzewane dla maksymalnej trwałości, a na końcu kontrolujemy jakość wykończenia krawędzi.",
      },
    ],
    whyUsTitle: "Dlaczego zmiana koloru w BORUCH Myjnia?",
    whyUs: [
      "Doświadczeni aplikatorzy z precyzyjnym okiem do detali",
      "Wyłącznie folie premium — trwałość i perfekcyjne dopasowanie",
      "Bezpieczny proces — folia nie uszkadza lakieru",
      "Gwarancja satysfakcji i atrakcyjny wygląd auta",
    ],
    closing:
      "Zmień wygląd swojego auta bez lakierowania! Wybierz zmianę koloru i dechroming w BORUCH Myjnia i ciesz się zupełnie nowym stylem swojego pojazdu.",
  },
]

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}

export function getServicesByCategory(category: ServiceCategory) {
  return services.filter((s) => s.category === category)
}
