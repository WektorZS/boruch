"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Car, ChevronDown, Clock3, MapPin, Pause, Play, Quote, ShieldCheck, Sparkles, Star, X } from "lucide-react"
import { Photo } from "./photo"
import { HomeContactForm } from "./home-contact-form"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { useModalFocus } from "./use-modal-focus"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"
import { serviceConfigs, serviceSummary, type ServiceSlug } from "@/lib/content/services"
import type { PhotoId } from "@/lib/photos"
import { clsx as cn } from "clsx"

const navOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]


const heroPhotos: Array<{ id: PhotoId; position: string }> = [
  { id: "p11", position: "54% 58%" },
  { id: "p52", position: "55% 60%" },
  { id: "p43", position: "58% 55%" },
  { id: "p46", position: "50% 50%" },
]

const mapEmbedUrl = "https://www.google.com/maps?q=Plac+Rod%C5%82a+8,+70-419+Szczecin&z=16&output=embed"

const reviewControls: Record<Locale, { previous: string; next: string; select: string }> = {
  pl: { previous: "Poprzednia opinia", next: "Następna opinia", select: "Pokaż opinię" },
  en: { previous: "Previous review", next: "Next review", select: "Show review" },
  de: { previous: "Vorherige Bewertung", next: "Nächste Bewertung", select: "Bewertung anzeigen" },
  uk: { previous: "Попередній відгук", next: "Наступний відгук", select: "Показати відгук" },
}

const followCopy: Record<Locale, string> = {
  pl: "Obserwuj nas",
  en: "Follow us",
  de: "Folgen Sie uns",
  uk: "Слідкуйте за нами",
}

const reviewDialogCopy: Record<Locale, { more: string; close: string; label: string }> = {
  pl: { more: "Zobacz więcej", close: "Zamknij opinię", label: "Opinia klienta" },
  en: { more: "Read more", close: "Close review", label: "Customer review" },
  de: { more: "Mehr anzeigen", close: "Bewertung schließen", label: "Kundenbewertung" },
  uk: { more: "Показати більше", close: "Закрити відгук", label: "Відгук клієнта" },
}

const packageSaleCopy: Record<Locale, { title: string; without: string; save: string; sizeNote: string }> = {
  pl: { title: "W komplecie taniej", without: "Cena bez pakietu", save: "20 zł taniej", sizeNote: "W pakiecie Komplet obowiązują osobne warianty: średnie auto od 240 zł, duże auto od 260 zł." },
  en: { title: "Better value as a package", without: "Price without the package", save: "Save PLN 20", sizeNote: "The Complete package has separate variants: medium car from PLN 240, large car from PLN 260." },
  de: { title: "Im Paket günstiger", without: "Preis ohne Paket", save: "20 PLN günstiger", sizeNote: "Für das Komplettpaket gelten eigene Varianten: mittelgroßes Auto ab 240 PLN, großes Auto ab 260 PLN." },
  uk: { title: "У комплекті вигідніше", without: "Ціна без пакета", save: "На 20 PLN дешевше", sizeNote: "Для пакета Комплекс діють окремі варіанти: середнє авто від 240 PLN, велике авто від 260 PLN." },
}

const salesPackageCopy: Record<Locale, {
  label: string
  title: string
  intro: string
  standard: string
  premium: string
  standardItems: string[]
  premiumItems: string[]
  from: string
  time: string
  details: string
}> = {
  pl: {
    label: "Pakiet Sprzedaż",
    title: "Przygotuj auto do sprzedaży.",
    intro: "Kompleksowo odświeżymy wnętrze i nadwozie, aby samochód prezentował się lepiej w ogłoszeniu i podczas oględzin.",
    standard: "Standard",
    premium: "Premium z korektą lakieru",
    standardItems: ["Detailing wnętrza i nadwozia", "Pranie tapicerki lub pielęgnacja skór", "Ręczne woskowanie"],
    premiumItems: ["Pełny zakres pakietu Standard", "Glinkowanie lakieru", "Korekta lakieru dobrana po oględzinach"],
    from: "od",
    time: "około 4 godz.",
    details: "Zobacz zakres i ceny",
  },
  en: {
    label: "Sales Package",
    title: "Prepare your car for sale.",
    intro: "We refresh the interior and bodywork so the car looks better in the listing and during viewings.",
    standard: "Standard",
    premium: "Premium with paint correction",
    standardItems: ["Interior and exterior detailing", "Upholstery cleaning or leather care", "Hand waxing"],
    premiumItems: ["Full Standard package", "Paint claying", "Paint correction matched after inspection"],
    from: "from",
    time: "approx. 4 hr",
    details: "View scope and prices",
  },
  de: {
    label: "Verkaufspaket",
    title: "Bereiten Sie Ihr Auto für den Verkauf vor.",
    intro: "Wir frischen Innenraum und Karosserie auf, damit das Auto im Inserat und bei der Besichtigung besser wirkt.",
    standard: "Standard",
    premium: "Premium mit Lackkorrektur",
    standardItems: ["Innen- und Außendetailing", "Polster- oder Lederpflege", "Handwachs"],
    premiumItems: ["Komplettes Standardpaket", "Lackkneten", "Lackkorrektur nach Besichtigung"],
    from: "ab",
    time: "ca. 4 Std.",
    details: "Umfang und Preise ansehen",
  },
  uk: {
    label: "Пакет для продажу",
    title: "Підготуйте авто до продажу.",
    intro: "Ми освіжимо салон і кузов, щоб автомобіль краще виглядав в оголошенні та під час огляду.",
    standard: "Стандарт",
    premium: "Преміум з корекцією лаку",
    standardItems: ["Детейлінг салону та кузова", "Хімчистка або догляд за шкірою", "Ручне нанесення воску"],
    premiumItems: ["Повний пакет Стандарт", "Очищення лаку глиною", "Корекція лаку після огляду"],
    from: "від",
    time: "близько 4 год.",
    details: "Переглянути обсяг і ціни",
  },
}

const serviceGroupCopy: Record<Locale, { myjnia: string; detailing: string }> = {
  pl: {
    myjnia: "Ręczne mycie oraz kompleksowa pielęgnacja wnętrza i karoserii.",
    detailing: "Ochrona, korekta i zmiana wyglądu samochodu wykonana z pełną precyzją.",
  },
  en: {
    myjnia: "Hand washing and complete care for the interior and bodywork.",
    detailing: "Protection, correction and visual transformation carried out with precision.",
  },
  de: {
    myjnia: "Handwäsche und komplette Pflege von Innenraum und Karosserie.",
    detailing: "Schutz, Korrektur und optische Veränderung mit höchster Präzision.",
  },
  uk: {
    myjnia: "Ручне миття та комплексний догляд за салоном і кузовом.",
    detailing: "Захист, корекція та зміна вигляду автомобіля з повною точністю.",
  },
}

const serviceVisuals: Record<ServiceSlug, { id: PhotoId; position: string }> = {
  "mycie-zewnatrz": { id: "p46", position: "50% 55%" },
  "czyszczenie-wnetrza": { id: "p43", position: "50% 50%" },
  komplet: { id: "p11", position: "48% 55%" },
  "pranie-tapicerki": { id: "p44", position: "50% 55%" },
  "czyszczenie-skor": { id: "p68", position: "50% 50%" },
  woskowanie: { id: "p39", position: "50% 55%" },
  polerowanie: { id: "p21", position: "50% 58%" },
  "korekta-lakieru": { id: "p20", position: "50% 58%" },
  "powloka-ceramiczna": { id: "p58", position: "50% 55%" },
  "folia-ppf": { id: "p52", position: "50% 55%" },
  "przyciemnianie-szyb-i-lamp": { id: "p22", position: "50% 55%" },
  "zmiana-koloru-dechroming": { id: "p51", position: "50% 55%" },
}

const editorialCopy = {
  pl: { previous: "Poprzedni slajd", next: "Następny slajd", pause: "Zatrzymaj slajdy", play: "Wznów slajdy", select: "Wybierz usługę", detail: "Poznaj usługę", why: "Każdy etap ręcznie.", studio: "Myjnia / Detailing / Szczecin", portfolio: "Wybrane realizacje", scope: "Zakres pielęgnacji", talk: "Porozmawiajmy o Twoim aucie." },
  en: { previous: "Previous slide", next: "Next slide", pause: "Pause slides", play: "Resume slides", select: "Choose a service", detail: "Explore the service", why: "Every stage by hand.", studio: "Car wash / Detailing / Szczecin", portfolio: "Selected work", scope: "Care included", talk: "Let's talk about your car." },
  de: { previous: "Vorherige Folie", next: "Nächste Folie", pause: "Folien pausieren", play: "Folien fortsetzen", select: "Leistung wählen", detail: "Leistung entdecken", why: "Jeder Schritt von Hand.", studio: "Autowäsche / Detailing / Szczecin", portfolio: "Ausgewählte Arbeiten", scope: "Pflegeumfang", talk: "Sprechen wir über Ihr Auto." },
  uk: { previous: "Попередній слайд", next: "Наступний слайд", pause: "Зупинити слайди", play: "Продовжити слайди", select: "Оберіть послугу", detail: "Дізнатися про послугу", why: "Кожен етап вручну.", studio: "Мийка / Детейлінг / Щецин", portfolio: "Вибрані роботи", scope: "Обсяг догляду", talk: "Поговорімо про ваше авто." },
} satisfies Record<Locale, Record<string, string>>

const careSteps: Record<Locale, Array<[string, string]>> = {
  pl: [
    ["Dobieramy zakres", "Oglądamy auto i ustalamy, czego potrzebuje. Od zwykłego mycia po korektę i ochronę lakieru."],
    ["Pracujemy nad detalem", "Dobieramy środki do powierzchni. Czyścimy wnętrze, karoserię i miejsca, które łatwo przeoczyć."],
    ["Ustalamy dalszą pielęgnację", "Podpowiadamy, jak myć i pielęgnować auto po wykonanej usłudze."],
  ],
  en: [
    ["Agree on the scope", "We inspect the car and discuss what it needs, from a regular wash to paint correction and protection."],
    ["Work on the details", "We match products to each surface, cleaning the interior, bodywork and easily overlooked areas."],
    ["Plan future care", "We explain how to wash and care for your car after the service."],
  ],
  de: [
    ["Umfang abstimmen", "Wir sehen uns das Auto an und besprechen den Bedarf, von der Wäsche bis zur Lackkorrektur und zum Schutz."],
    ["Details bearbeiten", "Wir stimmen die Produkte auf jede Oberfläche ab und reinigen Innenraum, Karosserie und leicht übersehene Stellen."],
    ["Weitere Pflege besprechen", "Wir erklären, wie Sie Ihr Auto nach der Behandlung waschen und pflegen können."],
  ],
  uk: [
    ["Узгоджуємо обсяг", "Оглядаємо авто й визначаємо потреби: від звичайного миття до корекції та захисту лаку."],
    ["Працюємо над деталями", "Підбираємо засоби до поверхні. Очищаємо салон, кузов і місця, які легко не помітити."],
    ["Обговорюємо подальший догляд", "Пояснюємо, як мити та доглядати за авто після виконаної послуги."],
  ],
}

type VerifiedReview = {
  name: string
  text: string
  source: "Booksy" | "Google"
}

const verifiedReviewsSource: VerifiedReview[] = [
  {
    name: "Sandra",
    source: "Booksy",
    text: "Autko doczyszczone aż miło, a nie było łatwo. Po bytowaniu sierściucha w bagażniku nie ma śladu. Polecam.",
  },
  {
    name: "Kasia",
    source: "Booksy",
    text: "Auto wygląda jakby dopiero co wyjechało z salonu. Nawet masa psich kłaków nie przeszkodziła ekipie w super ogarnięciu Astry. Polecam serdecznie!",
  },
  {
    name: "Paweł",
    source: "Booksy",
    text: "Auto po wizycie wygląda nawet lepiej niż jak z salonu! Nałożony wosk świetnie sprawdził się w warunkach zimowych - brud znika po zwykłym spłukaniu na myjni. Super fachowcy! Najlepsza myjnia samochodowa w Szczecinie!",
  },
  {
    name: "Mariusz",
    source: "Booksy",
    text: "To kolejny raz kiedy wracam na mycie i sprzątanie samochodu. Za każdym razem jakość na najwyższym poziomie. Testowałem kilka innych miejsc w Szczecinie, ale tutaj dbają o każdy szczegół.",
  },
  {
    name: "Dorota",
    source: "Booksy",
    text: "Myślałam, że mojego auta nie da się już odgruzować, ale panowie odwalili kawał dobrej roboty, serdecznie dziękuję i polecam.",
  },
  {
    name: "Aneta",
    source: "Booksy",
    text: "Pierwszy raz korzystałam z usług tej myjni. Polecam z całego serca. Profesjonalne podejście, samochód czyściutki i pachnący. W środku wszystko dokładnie wyczyszczone. Autko jak z salonu. Dziękuję.",
  },
  {
    name: "Maja Bajdek",
    source: "Google",
    text: "Panowie bardzo dokładni! Auto po korekcie lakieru i ceramice wygląda jak lustro. Cena adekwatna do robocizny. Najlepsza myjnia w mieście.",
  },
  {
    name: "Karol Kobus",
    source: "Google",
    text: "Szczecin ma swoje myjnie, ale ta to inna liga. Szczególnie doceniam jakość i profesjonalizm. Regularnie tu wracam, bo widzę, że nie osiadają na laurach - zawsze czysto, zawsze dokładnie, zawsze z uśmiechem. Rzadko piszę opinie, ale tu po prostu trzeba było. Tak trzymać!",
  },
  {
    name: "Wojciech Łuczyniec",
    source: "Google",
    text: "Oddawałem swoje auto na wiele myjni, ale na tej zaopiekowali się nim najlepiej i wszystko zrobili tak jak chciałem. Nic dla nich nie jest problemem. Najlepsza myjnia jaka tylko może być, polecam bardzo. Lampy oklejone perfekcyjnie, korekta lakieru wykonana na najwyższym poziomie. Wnętrze wygląda jak nowe z salonu i to tylko dzięki BORUCH MYJNIA!",
  },
  {
    name: "Ada Majdanik",
    source: "Google",
    text: "Mimo ciężkiego przypadku, to co zostało zrobione z moim autem przeszło moje oczekiwania. Ponad 20-letnie auto wyglądało prawie jak nowe. Obsługa przemiła i widać, że lubią to co robią i robią to dobrze. Jestem zachwycona wynikami wizyty w tej myjni i na pewno będę tu wracać, bo naprawdę warto. Polecam każdemu, kto szuka miejsca, gdzie jego auto zostanie profesjonalnie zaopiekowane i które jest przyjazne dla portfela.",
  },
  {
    name: "Michał Giermak",
    source: "Google",
    text: "Bardzo uczciwe podejście. Nie udało się finalnie wykonać dechromingu ze względu na specyfikę części i folia została zdjęta przed wydaniem auta. Można było to zostawić i udawać, że jest okej, a po paru miesiącach zaczęłoby się psuć, ale zostałem potraktowany profesjonalnie. Nie zostałem obciążony żadnymi opłatami, a auto zostało umyte. Bardzo doceniam takie podejście i uczciwość względem klienta, zwłaszcza że właściciel stracił na to sporo czasu i pieniędzy. Zdecydowanie polecam i skorzystam ponownie, jeśli będzie okazja.",
  },
  {
    name: "Natalia Anna",
    source: "Google",
    text: "Pierwszy raz zostawiliśmy tam auto na pranie tapicerki i podsufitki. Prosiliśmy, żeby zająć się tylko środkiem auta, bo na następny dzień mieliśmy długo jechać autostradą i i tak byłoby brudne. Przychodzimy po odbiór, a tam auto lśni nie tylko od środka, ale i na zewnątrz, żeby lepiej było widać efekt, bez dodatkowych kosztów. Mega miła obsługa, a efekt naprawdę przerasta nasze oczekiwania. Polecam każdemu!",
  },
  {
    name: "Kamil Piątek",
    source: "Google",
    text: "Dziś pierwszy raz skorzystałem z myjni Boruch i jestem bardzo zadowolony. W ciągu jednej kawy w kawiarni auto wróciło czyste i pachnące. Kontakt z klientem również zasługuje na pochwałę. Polecam to miejsce.",
  },
  {
    name: "Dorota Młynarczyk",
    source: "Google",
    text: "Robią takie cuda, że szok! Mercedes wyszorowany na zewnątrz i w środku tak, że wygląda jak nowy. Bardzo polecam!",
  },
  {
    name: "Karol",
    source: "Google",
    text: "Samochód po wyjeździe z tej myjni wygląda jakby wyjechał z fabryki. Dobre ceny. Polecam każdemu, na pewno będzie zadowolony.",
  },
  {
    name: "Maja Chełkowska",
    source: "Google",
    text: "Bardzo profesjonalne i indywidualne podejście do każdego klienta. Pan właściciel bardzo uprzejmy. Polecam z całego serca.",
  },
]

const verifiedReviews = [0, 7, 1, 6, 2, 11, 4, 8, 3, 9, 5, 10, 12, 15, 13, 14].map((index) => verifiedReviewsSource[index])

const homeCopy = {
  pl: {
    heroSlides: [
      { label: "Myjnia i detailing w Szczecinie", title: "SPA dla Twojego auta", text: "Ręczna pielęgnacja, która przywraca czystość, połysk i świeżość każdego dnia." },
      { label: "Folie ochronne i zmiana koloru", title: "Oklejanie aut", text: "Zabezpieczamy lakier folią PPF i odmieniamy wygląd samochodu bez trwałej ingerencji." },
      { label: "Detailing bez kompromisów", title: "Profesjonalne kosmetyki", text: "Pracujemy na sprawdzonych produktach, które są bezpieczne dla lakieru i wnętrza." },
      { label: "Plac Rodła 8 / PAZIM", title: "W centrum Szczecina", text: "Znajdziesz nas na poziomie -2 parkingu podziemnego PAZIM." },
    ],
    whyLabel: "Dlaczego BORUCH",
    whyTitle: "Ręczna pielęgnacja auta od mycia po zabezpieczenie lakieru.",
    whyIntro: "Jedno miejsce, w którym zajmiemy się wyglądem samochodu wewnątrz i na zewnątrz.",
    benefits: [
      ["Ręczna pielęgnacja", "Każdy etap wykonujemy ręcznie i dobieramy go do stanu auta."],
      ["Pełny zakres", "Mycie, wnętrze, polerowanie, powłoki ceramiczne i folie PPF."],
      ["Centrum Szczecina", "Parking podziemny PAZIM, poziom -2 przy placu Rodła."],
    ],
    servicesIntro: "Wybierz podstawową pielęgnację albo pełne zabezpieczenie samochodu.",
    galleryCaptions: ["Korekta lakieru", "Folia PPF", "Detailing wnętrza", "Mycie ręczne", "Zabezpieczenie lakieru"],
    teamTitle: "Za każdym autem stoi konkretna ekipa.",
    teamBody: "BORUCH powstał z pasji do czystych i zadbanych samochodów. Pracujemy dokładnie, bez pośpiechu i z pełną odpowiedzialnością za efekt.",
    routeHint: "Wjedź na parking PAZIM i zjedź na poziom -2.",
    reviewsLabel: "Opinie klientów",
    reviewsTitle: "Efekt, do którego chce się wracać.",
    reviewsIntro: "Najlepiej mówią o nas kierowcy, którzy odebrali od nas swoje samochody.",
    reviewsSwipe: "Przesuń, aby zobaczyć kolejne opinie",
    reviewsLink: "Zobacz opinie i terminy",
    booksyReviews: "150 opinii",
    googleReviews: "79 opinii",
    googleReviewsLink: "Zobacz opinie Google",
    reviews: verifiedReviews,
    faqLabel: "Najczęstsze pytania",
    faqTitle: "Zanim zostawisz nam auto.",
    faqIntro: "Krótko i konkretnie. Jeśli nie znajdziesz odpowiedzi, zadzwoń lub napisz.",
    faq: [
      ["Czy trzeba rezerwować termin?", "Rezerwacja przez Booksy daje pewny termin. Przy prostszych usługach możesz też zadzwonić i zapytać o najbliższe wolne miejsce."],
      ["Ile trwa usługa?", "Czas zależy od zakresu i stanu samochodu. Mycie trwa krócej, a detailing, powłoka ceramiczna lub folia PPF wymagają pozostawienia auta na dłużej."],
      ["Czy cena zależy od wielkości auta?", "Tak. Ceny podstawowe dotyczą mniejszych aut, a dopłata za większy samochód jest opisana w cenniku. Usługi detailingowe wyceniamy po ocenie zakresu prac."],
      ["Jak trafić do myjni?", "Wjedź na parking podziemny PAZIM przy placu Rodła 8 i zjedź na poziom -2. Na miejscu znajdziesz oznaczenia BORUCH."],
    ],
    contactLabel: "Kontakt i wycena",
    contactTitle: "Opowiedz nam, czego potrzebuje Twoje auto.",
    contactIntro: "Podaj podstawowe dane i opisz zakres prac. Odpowiemy z propozycją usługi albo poprosimy o dodatkowe zdjęcia.",
    contactDirect: "Napisz, czego potrzebuje Twoje auto.",
    contactBooksy: "Odpowiemy z propozycją usługi i dogodnym terminem.",
  },
  en: {
    heroSlides: [
      { label: "Car wash and detailing in Szczecin", title: "A spa for your car", text: "Hands-on care that restores cleanliness, shine and freshness every day." },
      { label: "Protective films and colour change", title: "Vehicle wrapping", text: "We protect paint with PPF and transform your car without permanent modification." },
      { label: "Detailing without compromise", title: "Professional products", text: "We use proven products that are safe for your paintwork and interior." },
      { label: "Plac Rodła 8 / PAZIM", title: "Central Szczecin", text: "You will find us on level -2 of the PAZIM underground car park." },
    ],
    whyLabel: "Why BORUCH",
    whyTitle: "Hands-on car care from washing to paint protection.",
    whyIntro: "One place for complete exterior and interior car care.",
    benefits: [
      ["Hand care", "Every stage is completed by hand and matched to the condition of your car."],
      ["Complete service", "Washing, interiors, polishing, ceramic coatings and PPF."],
      ["Central Szczecin", "PAZIM underground car park, level -2 by Plac Rodła."],
    ],
    servicesIntro: "Choose essential care or complete protection for your car.",
    galleryCaptions: ["Paint correction", "PPF protection", "Interior detailing", "Hand wash", "Paint protection"],
    teamTitle: "A dedicated team stands behind every car.",
    teamBody: "BORUCH grew from a passion for clean and well-kept cars. We work carefully, without rushing, and take responsibility for the result.",
    routeHint: "Enter the PAZIM car park and drive down to level -2.",
    reviewsLabel: "Customer reviews",
    reviewsTitle: "Results worth coming back for.",
    reviewsIntro: "The best account of our work comes from drivers collecting their cars.",
    reviewsSwipe: "Swipe to see more reviews",
    reviewsLink: "See reviews and appointments",
    booksyReviews: "150 reviews",
    googleReviews: "79 reviews",
    googleReviewsLink: "See Google reviews",
    reviews: verifiedReviews,
    faqLabel: "Frequently asked questions",
    faqTitle: "Before you leave your car with us.",
    faqIntro: "Short and specific. If your question is not here, call or write to us.",
    faq: [
      ["Do I need to book?", "Booking through Booksy secures your appointment. For simpler services, you can also call and ask about the nearest available time."],
      ["How long does a service take?", "It depends on the scope and condition of the car. A wash is quicker, while detailing, ceramic coating or PPF requires more time."],
      ["Does the price depend on car size?", "Yes. Base prices apply to smaller cars and the surcharge for larger vehicles is listed in the price list. Detailing is quoted after assessing the scope."],
      ["How do I find the car wash?", "Enter the PAZIM underground car park at Plac Rodła 8 and drive down to level -2. BORUCH signs will guide you on site."],
    ],
    contactLabel: "Contact and quote",
    contactTitle: "Tell us what your car needs.",
    contactIntro: "Share the key details and describe the work. We will reply with a suggested service or ask for additional photos.",
    contactDirect: "Tell us what your car needs.",
    contactBooksy: "We will suggest the right service and a convenient date.",
  },
  de: {
    heroSlides: [
      { label: "Autowäsche und Detailing in Stettin", title: "Wellness für Ihr Auto", text: "Sorgfältige Handarbeit für Sauberkeit, Glanz und Frische im Alltag." },
      { label: "Schutzfolien und Farbwechsel", title: "Fahrzeugfolierung", text: "Wir schützen den Lack mit PPF und verändern die Optik ohne dauerhaften Eingriff." },
      { label: "Detailing ohne Kompromisse", title: "Professionelle Produkte", text: "Wir arbeiten mit bewährten Produkten, die Lack und Innenraum schonen." },
      { label: "Plac Rodła 8 / PAZIM", title: "Im Zentrum von Stettin", text: "Sie finden uns auf Ebene -2 der PAZIM Tiefgarage." },
    ],
    whyLabel: "Warum BORUCH",
    whyTitle: "Manuelle Fahrzeugpflege von der Wäsche bis zum Lackschutz.",
    whyIntro: "Ein Ort für die komplette Pflege des Fahrzeugs innen und außen.",
    benefits: [
      ["Handarbeit", "Jeder Schritt wird von Hand und passend zum Fahrzeugzustand ausgeführt."],
      ["Komplettes Angebot", "Wäsche, Innenraum, Politur, Keramikversiegelung und PPF."],
      ["Zentrum Stettins", "PAZIM Tiefgarage, Ebene -2 am Plac Rodła."],
    ],
    servicesIntro: "Wählen Sie eine Basispflege oder den vollständigen Schutz Ihres Fahrzeugs.",
    galleryCaptions: ["Lackkorrektur", "PPF Schutzfolie", "Innenraumdetailing", "Handwäsche", "Lackschutz"],
    teamTitle: "Hinter jedem Fahrzeug steht ein konkretes Team.",
    teamBody: "BORUCH entstand aus Leidenschaft für saubere und gepflegte Fahrzeuge. Wir arbeiten gründlich, ohne Eile und mit voller Verantwortung für das Ergebnis.",
    routeHint: "Fahren Sie in die PAZIM Tiefgarage und hinunter auf Ebene -2.",
    reviewsLabel: "Kundenmeinungen",
    reviewsTitle: "Ein Ergebnis, für das man gerne wiederkommt.",
    reviewsIntro: "Am besten berichten die Fahrer über uns, die ihr Fahrzeug bei uns abgeholt haben.",
    reviewsSwipe: "Wischen Sie für weitere Bewertungen",
    reviewsLink: "Bewertungen und Termine ansehen",
    booksyReviews: "150 Bewertungen",
    googleReviews: "79 Bewertungen",
    googleReviewsLink: "Google-Bewertungen ansehen",
    reviews: verifiedReviews,
    faqLabel: "Häufige Fragen",
    faqTitle: "Bevor Sie Ihr Fahrzeug abgeben.",
    faqIntro: "Kurz und konkret. Wenn Ihre Frage fehlt, rufen Sie uns an oder schreiben Sie uns.",
    faq: [
      ["Muss ich einen Termin buchen?", "Eine Buchung über Booksy sichert Ihren Termin. Bei einfacheren Leistungen können Sie auch anrufen und nach dem nächsten freien Termin fragen."],
      ["Wie lange dauert eine Leistung?", "Das hängt vom Umfang und Zustand des Fahrzeugs ab. Eine Wäsche dauert kürzer, während Detailing, Keramikversiegelung oder PPF mehr Zeit benötigen."],
      ["Hängt der Preis von der Fahrzeuggröße ab?", "Ja. Die Grundpreise gelten für kleinere Fahrzeuge. Zuschläge für größere Fahrzeuge stehen in der Preisliste. Detailing wird nach Prüfung des Umfangs kalkuliert."],
      ["Wie finde ich die Waschanlage?", "Fahren Sie in die PAZIM Tiefgarage am Plac Rodła 8 und hinunter auf Ebene -2. Vor Ort weisen BORUCH Schilder den Weg."],
    ],
    contactLabel: "Kontakt und Angebot",
    contactTitle: "Sagen Sie uns, was Ihr Fahrzeug benötigt.",
    contactIntro: "Nennen Sie die wichtigsten Angaben und beschreiben Sie den Umfang. Wir antworten mit einem Vorschlag oder bitten um zusätzliche Fotos.",
    contactDirect: "Beschreiben Sie, was Ihr Fahrzeug benötigt.",
    contactBooksy: "Wir schlagen die passende Leistung und einen Termin vor.",
  },
  uk: {
    heroSlides: [
      { label: "Автомийка та детейлінг у Щецині", title: "SPA для вашого авто", text: "Ручний догляд, що повертає чистоту, блиск і свіжість щодня." },
      { label: "Захисні плівки та зміна кольору", title: "Обклеювання авто", text: "Захищаємо лак плівкою PPF і змінюємо вигляд авто без постійного втручання." },
      { label: "Детейлінг без компромісів", title: "Професійна косметика", text: "Використовуємо перевірені засоби, безпечні для лаку та салону." },
      { label: "Plac Rodła 8 / PAZIM", title: "У центрі Щецина", text: "Ви знайдете нас на рівні -2 підземного паркінгу PAZIM." },
    ],
    whyLabel: "Чому BORUCH",
    whyTitle: "Ручний догляд за авто від миття до захисту лаку.",
    whyIntro: "Одне місце для повного догляду за автомобілем зовні та всередині.",
    benefits: [
      ["Ручний догляд", "Кожен етап виконуємо вручну та підбираємо до стану автомобіля."],
      ["Повний спектр", "Миття, салон, полірування, керамічні покриття та PPF."],
      ["Центр Щецина", "Підземний паркінг PAZIM, рівень -2 біля Plac Rodła."],
    ],
    servicesIntro: "Оберіть базовий догляд або повний захист автомобіля.",
    galleryCaptions: ["Корекція лаку", "Захисна плівка PPF", "Детейлінг салону", "Ручне миття", "Захист лаку"],
    teamTitle: "За кожним автомобілем стоїть конкретна команда.",
    teamBody: "BORUCH виріс із любові до чистих і доглянутих автомобілів. Працюємо уважно, без поспіху та відповідаємо за результат.",
    routeHint: "Заїдьте на паркінг PAZIM і спустіться на рівень -2.",
    reviewsLabel: "Відгуки клієнтів",
    reviewsTitle: "Результат, за яким хочеться повернутися.",
    reviewsIntro: "Найкраще про нашу роботу розповідають водії, які забрали у нас свої автомобілі.",
    reviewsSwipe: "Гортайте, щоб переглянути більше відгуків",
    reviewsLink: "Переглянути відгуки та вільні години",
    booksyReviews: "150 відгуків",
    googleReviews: "79 відгуків",
    googleReviewsLink: "Переглянути відгуки Google",
    reviews: verifiedReviews,
    faqLabel: "Часті запитання",
    faqTitle: "Перш ніж залишити нам авто.",
    faqIntro: "Коротко і конкретно. Якщо тут немає відповіді, зателефонуйте або напишіть нам.",
    faq: [
      ["Чи потрібно бронювати час?", "Бронювання через Booksy гарантує вибраний час. Для простіших послуг можна також зателефонувати й запитати про найближче вільне місце."],
      ["Скільки триває послуга?", "Це залежить від обсягу робіт і стану автомобіля. Миття триває менше, а детейлінг, керамічне покриття або PPF потребують більше часу."],
      ["Чи залежить ціна від розміру авто?", "Так. Базові ціни стосуються менших авто, а доплата за більший автомобіль вказана в прайсі. Детейлінг оцінюємо після визначення обсягу робіт."],
      ["Як знайти автомийку?", "Заїдьте на підземний паркінг PAZIM за адресою Plac Rodła 8 і спустіться на рівень -2. На місці вас скерують позначення BORUCH."],
    ],
    contactLabel: "Контакт і оцінка",
    contactTitle: "Розкажіть, що потрібно вашому авто.",
    contactIntro: "Вкажіть основні дані та опишіть обсяг робіт. Ми запропонуємо послугу або попросимо додаткові фото.",
    contactDirect: "Напишіть, що потрібно вашому авто.",
    contactBooksy: "Ми запропонуємо відповідну послугу та зручний час.",
  },
} satisfies Record<Locale, {
  heroSlides: Array<{ label: string; title: string; text: string }>
  whyLabel: string
  whyTitle: string
  whyIntro: string
  benefits: [string, string][]
  servicesIntro: string
  galleryCaptions: string[]
  teamTitle: string
  teamBody: string
  routeHint: string
  reviewsLabel: string
  reviewsTitle: string
  reviewsIntro: string
  reviewsSwipe: string
  reviewsLink: string
  booksyReviews: string
  googleReviews: string
  googleReviewsLink: string
  reviews: VerifiedReview[]
  faqLabel: string
  faqTitle: string
  faqIntro: string
  faq: [string, string][]
  contactLabel: string
  contactTitle: string
  contactIntro: string
  contactDirect: string
  contactBooksy: string
}>

export function HomePage({ locale }: { locale: Locale }) {
  const t = ui[locale]

  return (
    <div id="top" lang={localeLabels[locale].htmlLang} className="home-root min-h-dvh bg-[#080809] text-bone">
      {locale === "pl" && <link rel="preload" href="/fonts/roboto-flex-polish-v2.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />}
      <a href="#main" className="fixed left-4 top-4 z-80 -translate-y-24 bg-brand px-4 py-3 text-xs font-bold uppercase tracking-[.16em] transition-transform focus:translate-y-0">
        {t.skip}
      </a>
      <HomeHeader locale={locale} />
      <main id="main" className="home-main" tabIndex={-1}>
        <HomeHero locale={locale} />
        <WhyBoruch locale={locale} />
        <ServiceMenu locale={locale} />
        <WorkShowcase locale={locale} />
        <Packages locale={locale} />
        <SalesPackage locale={locale} />
        <Reviews locale={locale} />
        <TeamStory locale={locale} />
        <HomeFaq locale={locale} />
        <Location locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <HomeFooter locale={locale} />
    </div>
  )
}

function HomeHeader({ locale }: { locale: Locale }) {
  const t = ui[locale]
  return <SiteHeader
    homeHref={routes[locale].home}
    homeLabel={t.nav.home}
    nav={[{ key: "home", label: t.nav.home, href: routes[locale].home, active: true }, ...navOrder.map(key => ({ key, label: t.nav[key], href: routes[locale][key], active: false }))]}
    languages={localeOrder.map(code => ({ code, short: localeLabels[code].short, name: localeLabels[code].name, htmlLang: localeLabels[code].htmlLang, href: routes[code].home, active: code === locale }))}
    labels={{ book: t.book, menu: t.menu, close: t.close, language: t.language, navigation: t.navigation, level: t.level }}
    bookingUrl={contact.bookingUrl}
    phone={contact.phone}
    phoneHref={contact.phoneHref}
    address={[sources[locale].address.lines[0], `PAZIM ${sources[locale].address.lines[2]}`]}
  />
}

function HeroRatings({ copy, className }: { copy: (typeof homeCopy)[Locale]; className?: string }) {
  return (
    <div className={cn("flex w-full items-stretch border-l border-white/14 bg-[#101011] sm:w-auto", className)}>
      <span className="grid min-h-16 min-w-20 place-items-center border-r border-[#238965]/75 bg-[#176b4f]/15 px-3 font-display text-xl font-black tracking-[.01em] text-[#75c9a9] sm:min-h-20 sm:min-w-24 sm:text-2xl">5.0/5</span>
      <span className="flex min-w-0 flex-1 flex-col justify-center divide-y divide-white/10 sm:flex-none">
        <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer"  className="group flex min-h-8 items-center gap-3 px-4 py-2 transition-colors hover:bg-white/[.06] sm:min-w-56 sm:px-5">
          <span className="min-w-0 flex-1">
            <strong className="block text-[.72rem] font-bold uppercase tracking-[.14em] text-white">Booksy</strong>
            <span className="mt-0.5 block text-[.72rem] text-white/65">5.0 / 5 - {copy.booksyReviews}</span>
          </span>
          <ArrowUpRight className="size-3.5 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
        <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer"  className="group flex min-h-8 items-center gap-3 px-4 py-2 transition-colors hover:bg-white/[.06] sm:px-5">
          <span className="min-w-0 flex-1">
            <strong className="block text-[.72rem] font-bold uppercase tracking-[.14em] text-white">Google</strong>
            <span className="mt-0.5 block text-[.72rem] text-white/65">5.0 / 5 - {copy.googleReviews}</span>
          </span>
          <ArrowUpRight className="size-3.5 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </span>
    </div>
  )
}

function HomeHero({ locale }: { locale: Locale }) {
  const t = ui[locale]
  const copy = homeCopy[locale]
  const benefitIcons = [Sparkles, ShieldCheck, MapPin]
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState([0])
  const [transitionsReady, setTransitionsReady] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [heroPaused, setHeroPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const slide = copy.heroSlides[activeSlide]
  const hasLongTitleWord = slide.title.split(/\s+/).some((word) => word.length >= 12)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting))
    const onVisibility = () => setHeroPaused(document.hidden)
    observer.observe(hero)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!heroVisible || heroPaused || !autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const next = (activeSlide + 1) % copy.heroSlides.length
    // Keep the next slide out of the critical loading window on a slow mobile connection.
    const preload = window.setTimeout(() => {
      setTransitionsReady(true)
      setLoadedSlides(current => current.includes(next) ? current : [...current, next])
    }, 3500)
    const advance = window.setTimeout(() => setActiveSlide(next), 5000)
    return () => { window.clearTimeout(preload); window.clearTimeout(advance) }
  }, [activeSlide, copy.heroSlides.length, heroVisible, heroPaused, autoplay])

  const changeSlide = (direction: number) => {
    setTransitionsReady(true)
    const next = (activeSlide + direction + heroPhotos.length) % heroPhotos.length
    setLoadedSlides(current => current.includes(next) ? current : [...current, next])
    setActiveSlide(next)
  }

  return (
  <>
    <section
      ref={heroRef}
      onFocusCapture={() => setHeroPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHeroPaused(document.hidden)
        }
      }}
      aria-labelledby="hero-title"
      className="editorial-hero relative isolate bg-[#080809] pt-(--header-h)"
    >
      <div className="hero-cinema" aria-hidden="true">
        {heroPhotos.map((photo, index) => loadedSlides.includes(index) && (
          <div
            key={photo.id}
            className={cn(
              "absolute inset-0",
              transitionsReady && "transition-[opacity,transform] duration-[700ms] ease-out motion-reduce:transition-none",
              transitionsReady && (index === activeSlide ? "scale-100 opacity-100" : "scale-[1.035] opacity-0"),
            )}
          >
            <Photo
              id={photo.id}
              priority={index === 0}
              sizes="(min-width: 1024px) 66vw, (min-width: 640px) 82vw, 100vw"
              position={photo.position}
              className="home-hero-photo saturate-[.88] contrast-[1.04]"
            />
          </div>
        ))}
        <div className="hero-cinema-shade absolute inset-0" />
      </div>

      <div className="home-hero-shell hero-editorial-grid relative z-10">
  <div
    key={activeSlide}
    className={cn(
      "hero-editorial-copy hero-copy-contrast",
      activeSlide > 0 && "home-hero-copy-animated",
    )}
  >
    <p className="mb-8 flex items-center gap-3 text-[.72rem] font-medium uppercase tracking-[.16em] text-white/82">
      <span className="h-px w-7 shrink-0 bg-brand" />
      {slide.label}
    </p>

    <h1
      id="hero-title"
      className={cn(
        "cinematic-title",
        hasLongTitleWord && "cinematic-title-long",
      )}
    >
      {slide.title}
    </h1>

    <p className="mt-7 max-w-[32rem] text-pretty text-base leading-relaxed text-white/78 sm:text-lg">
      {slide.text}
    </p>

    <div className="mt-9 flex flex-wrap items-center gap-7">
      <a href="#wycena" className="home-button home-button-red">
        {t.nav.contact}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>

      <Link
        prefetch={false}
        href={routes[locale].services}
        className="editorial-link"
      >
        {t.nav.services}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  </div>

  <div
    className="hero-trust-totem"
    aria-label={copy.reviewsLabel}
  >
    <div className="hero-trust-item">
      <span className="hero-trust-kicker">Opinie Booksy</span>
      <strong className="hero-trust-score">5.0</strong>
      <span className="hero-trust-meta">{copy.booksyReviews}</span>
    </div>

    <div className="hero-trust-divider" />

    <div className="hero-trust-item">
      <span className="hero-trust-kicker">Opinie Google</span>
      <strong className="hero-trust-score">5.0</strong>
      <span className="hero-trust-meta">{copy.googleReviews}</span>
    </div>
  </div>

 <div className="hero-editorial-bottom sm:hidden">
  <div className="flex items-center gap-3 text-white">
    <span className="text-[.72rem] font-bold uppercase tracking-[.13em] text-white">
      {followCopy[locale]}
    </span>

    <a
      href={contact.facebook}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="grid size-10 place-items-center text-white transition-colors hover:text-brand"
    >
      <FacebookIcon className="size-5" />
    </a>

    <a
      href={contact.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="grid size-10 place-items-center text-white transition-colors hover:text-brand"
    >
      <InstagramIcon className="size-5" />
    </a>
  </div>
</div>
</div>

      <ul className="hero-benefits relative z-10 grid border-y border-white/10 bg-[#0e0e0f] sm:grid-cols-3">
        {copy.benefits.map(([title, text], index) => {
          const Icon = benefitIcons[index] ?? Car

          return (
            <li
              key={title}
              className="flex min-h-24 items-center justify-center border-b border-white/10 px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 lg:px-10"
            >
              <div className="flex w-full max-w-sm items-center justify-center gap-4">
                <Icon
                  className="size-5 shrink-0 text-brand"
                  aria-hidden="true"
                />

                <div className="flex min-w-0 flex-col gap-1.5">
                  <strong className="text-[.72rem] font-bold uppercase tracking-[.14em] text-white/88">
                    {title}
                  </strong>

                  <span className="text-[.8rem] leading-snug text-white/65">
                    {text}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
          </ul>
    </section>
  </>
)
}

function WhyBoruch({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="why-title" className="section-xl overflow-hidden bg-[#080809]">
      <div className="home-shell why-editorial">
        <div className="why-editorial-heading">
          <p className="home-kicker">{copy.whyLabel}</p>
          <h2 id="why-title" data-reveal="" className="editorial-display mt-7">{editorialCopy[locale].why}</h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/65">{copy.whyIntro}</p>
          <Link prefetch={false} href={routes[locale].about} className="editorial-link mt-7">{t.nav.about}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <ol className="why-editorial-steps">
          {careSteps[locale].map(([title, text], index) => <li key={title}>
            <span className="type-label pt-1 text-brand" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h3 className="font-display text-xl font-medium leading-snug sm:text-2xl">{title}</h3><p className="mt-3 max-w-xl text-base leading-relaxed text-white/65">{text}</p></div>
          </li>)}
        </ol>
      </div>
    </section>
  )
}

function ServiceMenu({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = homeCopy[locale]
  const [activeService, setActiveService] = useState<ServiceSlug>("mycie-zewnatrz")
  const [previousService, setPreviousService] = useState<ServiceSlug>("mycie-zewnatrz")
  const [readyService, setReadyService] = useState<ServiceSlug>("mycie-zewnatrz")
  const [category, setCategory] = useState<"myjnia" | "detailing">("myjnia")
  const selectService = (slug: ServiceSlug) => {
    if (slug === activeService) return
    setPreviousService(readyService)
    setActiveService(slug)
  }
  const groups = (["myjnia", "detailing"] as const).map((category, groupIndex) => ({
    category,
    title: src.services.groups[groupIndex]?.title ?? category,
    description: serviceGroupCopy[locale][category],
    items: serviceConfigs.filter((service) => service.category === category).map((service) => {
      const summary = serviceSummary(locale, service.slug)
      return {
        slug: service.slug,
        title: locale === "pl" ? service.navTitle : (summary?.title ?? service.navTitle),
        description: summary?.text ?? serviceGroupCopy[locale][category],
        href: locale === "pl" ? `/${service.slug}` : routes[locale].services,
      }
    }),
  }))
  const activeItem = groups.flatMap(group => group.items).find(item => item.slug === activeService) ?? groups[0].items[0]
  const visual = serviceVisuals[activeService]
  const activeGroup = groups.find(group => group.category === category) ?? groups[0]
  const changeCategory = (next: "myjnia" | "detailing") => {
    setCategory(next)
    selectService(serviceConfigs.find(service => service.category === next)!.slug)
  }

  return (
    <section id="services" aria-labelledby="services-title" className="section-xl service-explorer bg-[#111112]">
      <div className="home-shell">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="home-kicker text-white/62">{t.nav.services}</p>
            <h2 id="services-title" data-reveal="" className="editorial-display mt-6">{src.services.groups.map((group) => group.title).join(" / ")}</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-base leading-relaxed text-white/58">{copy.servicesIntro}</p>
            <Link prefetch={false} href={routes[locale].services} className="mt-6 inline-flex items-center gap-3 text-[.72rem] font-bold uppercase tracking-[.16em] text-white transition-colors hover:text-[#ef6267]">
              {t.allServices}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <div className="explorer-categories" aria-label={editorialCopy[locale].select}>
              {groups.map(group => <button key={group.category} type="button" aria-pressed={category === group.category} onClick={() => changeCategory(group.category)}>{group.title}</button>)}
            </div>
            <p className="mb-7 mt-5 max-w-md text-sm leading-relaxed text-white/65">{activeGroup.description}</p>
            <label className="block lg:hidden"><span className="sr-only">{editorialCopy[locale].select}</span><select value={activeService} onChange={event => selectService(event.target.value as ServiceSlug)} className="mb-6 w-full border-b border-white/25 bg-transparent py-4 text-base text-white">{activeGroup.items.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
            <ol className="hidden border-t border-white/15 lg:block">
              {activeGroup.items.map(item => <li key={item.slug}>
                <button type="button" onMouseEnter={() => selectService(item.slug)} onFocus={() => selectService(item.slug)} onClick={() => selectService(item.slug)} aria-pressed={activeService === item.slug} className="explorer-service">
                  <span className="type-index text-xs">{String(serviceConfigs.findIndex(service => service.slug === item.slug) + 1).padStart(2, "0")}</span>
                  <span>{item.title}</span><ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                </button>
              </li>)}
            </ol>
          </div>
          <div className="min-w-0 lg:col-span-7">
          <figure className="explorer-stage relative aspect-[4/3] overflow-hidden bg-[#171718] lg:aspect-[5/4]">
            {previousService !== activeService && <Photo id={serviceVisuals[previousService].id} sizes="(min-width: 1600px) 590px, (min-width: 1024px) 40vw, 92vw" position={serviceVisuals[previousService].position} />}
            <div key={activeService} onLoadCapture={() => setReadyService(activeService)} className={cn("absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none", readyService === activeService ? "opacity-100" : "opacity-0")}>
              <Photo id={visual.id} sizes="(min-width: 1600px) 590px, (min-width: 1024px) 40vw, 92vw" position={visual.position} eager={activeService !== "mycie-zewnatrz"} />
            </div>
            <figcaption className="absolute left-0 top-0 bg-[#111112] pb-3 pr-5 text-[.65rem] uppercase tracking-[.18em] text-white/70">{activeGroup.title} / BORUCH</figcaption>
          </figure>
          <div key={activeService} className="explorer-description home-hero-copy-animated mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div><h3 className="font-display text-2xl font-semibold leading-snug">{activeItem.title}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">{activeItem.description}</p></div>
            <Link prefetch={false} href={activeItem.href} className="editorial-link w-fit">{editorialCopy[locale].detail}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkShowcase({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = homeCopy[locale]
  const projects: { id: PhotoId; position: string; label: string }[] = [
    { id: "p21", position: "50% 58%", label: copy.galleryCaptions[0] },
    { id: "p62", position: "50% 58%", label: copy.galleryCaptions[1] },
    { id: "p29", position: "50% 50%", label: copy.galleryCaptions[2] },
    { id: "p39", position: "50% 55%", label: copy.galleryCaptions[4] },
  ]

  return (
    <section aria-labelledby="work-title" className="section-xl overflow-hidden bg-[#080809]">
      <div className="home-shell mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="home-kicker">{t.nav.gallery}</p>
          <h2 id="work-title" data-reveal="" className="editorial-display mt-6">{src.home.projectsTitle}</h2>
        </div>
        <div className="max-w-md lg:col-span-4 lg:col-start-9">
          <p className="text-pretty text-base leading-relaxed text-white/65">{src.home.projectsText}</p>
          <Link prefetch={false} href={routes[locale].gallery} className="mt-6 inline-flex items-center gap-3 text-[.72rem] font-bold uppercase tracking-[.16em] text-white">
            {t.allPhotos}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="home-shell portfolio-editorial">
        {projects.map((project, index) => <figure key={project.id} className="portfolio-project">
          <Link prefetch={false} href={routes[locale].gallery} aria-label={`${project.label} - ${t.allPhotos}`} className="group block">
            <div className="portfolio-image relative overflow-hidden">
              <Photo id={project.id} sizes="(min-width: 1600px) 740px, (min-width: 640px) 46vw, 92vw" position={project.position} className="transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.035] group-focus-visible:scale-[1.035]" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-transparent group-focus-visible:bg-transparent" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-b border-white/15 py-5">
              <span className="flex min-w-0 items-baseline gap-4"><span className="text-xs tabular-nums text-white/45" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium tracking-[.03em]">{project.label}</span></span><ArrowUpRight className="size-4 shrink-0 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5" aria-hidden="true" />
            </figcaption>
          </Link>
        </figure>)}
      </div>
    </section>
  )
}

function Packages({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const packageOrder = [1, 0, 2]

  return (
    <section aria-labelledby="packages-title" className="section-xl bg-[#101011]">
      <div className="home-shell">
        <div className="grid gap-7 border-b border-white/12 pb-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="home-kicker">{t.pricing}</p>
            <h2 id="packages-title" data-reveal="" className="editorial-display mt-6">{src.home.packagesTitle}</h2>
          </div>
          <Link prefetch={false} href={routes[locale].pricing} className="editorial-link lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            {{ pl: "Pełny cennik", en: "Full price list", de: "Vollständige Preisliste", uk: "Повний прайс" }[locale]}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 border-t border-white/15">
          {packageOrder.map(index => {
            const pkg = src.pricing.packages[index]
            if (!pkg) return null
            const featured = Boolean(pkg.popular)
            return (
              <article key={pkg.title} data-reveal="" className={cn("editorial-price-row", featured && "editorial-price-featured")}>
                <div>
                  {pkg.popular && <span className="mb-3 block text-xs font-medium uppercase tracking-[.16em] text-brand">{pkg.popular}</span>}
                  <h3 className="max-w-full font-display text-[clamp(1.4rem,1.8vw,1.85rem)] font-semibold leading-[1.25] tracking-normal">{pkg.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">{pkg.tagline}</p>
                </div>
                <div>
                  <p className="mb-4 text-[.65rem] font-medium uppercase tracking-[.14em] text-white/50">{editorialCopy[locale].scope}</p>
                  <ul className="package-scope text-sm leading-relaxed text-white/75">
                    {pkg.items.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-[.45em] size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />{item}</li>)}
                  </ul>
                  {pkg.discount && <p className="mt-4 text-[.875rem] leading-relaxed text-white/65">{pkg.discount}</p>}
                </div>
                <div className="package-price">
                  {featured && (
                    <div className="mb-5">
                      <strong className="block text-xs font-semibold text-[#ff686e]">{packageSaleCopy[locale].title}</strong>
                      <div className="mt-2 flex flex-col gap-1 text-sm">
                        <span className="text-white/62">{packageSaleCopy[locale].without} <s className="ml-1 text-white/78 decoration-brand decoration-2">240 {locale === "pl" ? "zł" : "PLN"}</s></span>
                        <span className="font-semibold text-white">{packageSaleCopy[locale].save}</span>
                      </div>
                    </div>
                  )}
                  <span className="block whitespace-nowrap font-display text-[clamp(1.9rem,2.5vw,2.5rem)] font-semibold uppercase leading-[1.14] tracking-normal">{pkg.price?.replace(/(\d)\s*(zł|PLN)/g, "$1 $2")}</span>
                  {pkg.note && <span className="mt-3 block text-xs leading-relaxed text-white/60">{pkg.note}</span>}
                  <Link prefetch={false} href={routes[locale].pricing} className="editorial-link mt-5">{t.pricing}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
                </div>
              </article>
            )
          })}
        </div>
        <p className="mt-7 text-xs leading-relaxed text-white/65">* {src.pricing.packagesNote}<span className="mt-2 block">{packageSaleCopy[locale].sizeNote}</span></p>
      </div>
    </section>
  )
}

function SalesPackage({ locale }: { locale: Locale }) {
  const copy = salesPackageCopy[locale]
  const currency = locale === "pl" ? "zł" : "PLN"
  const offers = [
    { title: copy.standard, price: 1000, items: copy.standardItems },
    { title: copy.premium, price: 1400, items: copy.premiumItems },
  ]

  return (
    <section id="pakiet-sprzedaz" aria-labelledby="sales-package-title" className="section-lg scroll-mt-24 border-b border-white/10 bg-[#080809]">
      <div className="home-shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="home-kicker">{copy.label}</p>
          <h2 id="sales-package-title" data-reveal="" className="editorial-display mt-6">{copy.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65">{copy.intro}</p>
          <Link prefetch={false} href={`${routes[locale].pricing}#pakiet-sprzedaz`} className="editorial-link mt-7">{copy.details}<ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <div className="lg:col-span-7">
          <div className="grid border-y border-white/15 sm:grid-cols-2 sm:divide-x sm:divide-white/15">
            {offers.map((offer) => <article key={offer.title} className="flex flex-col border-b border-white/10 py-7 last:border-b-0 sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:pr-0">
              <h3 className="font-display text-xl font-semibold leading-[1.3] tracking-normal">{offer.title}</h3>
              <ul className="mb-7 mt-5 grid gap-2.5 text-sm leading-relaxed text-white/65">{offer.items.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-[.55em] size-1 shrink-0 bg-brand" aria-hidden="true" />{item}</li>)}</ul>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-5">
                <strong className="font-display text-2xl font-black uppercase tracking-[.01em]">{copy.from} {offer.price} {currency}</strong>
                <span className="flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[.12em] text-white/65"><Clock3 className="size-3.5 text-brand" />{copy.time}</span>
              </div>
            </article>)}
          </div>

        </div>
      </div>
    </section>
  )
}

function TeamStory({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = homeCopy[locale]

  return (
    <section aria-labelledby="team-title" className="section-lg border-y border-white/10 bg-[#111112]">
      <div className="home-shell">
        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          <figure data-reveal="mask" className="home-photo-panel editorial-photo relative aspect-[4/5] self-start overflow-hidden">
            <Photo id="team" sizes="(min-width: 1600px) 580px, (min-width: 1024px) 42vw, 92vw" position="50% 52.4%" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-6 pb-5 pt-12 text-[.72rem] font-bold uppercase tracking-[.16em] text-white/85">BORUCH Myjnia Szczecin</figcaption>
          </figure>

          <div className="relative flex flex-col justify-center overflow-hidden border-t border-white/10 p-6 sm:p-12 lg:border-l lg:border-t-0 lg:p-[clamp(3rem,5vw,5.5rem)]">
            <p className="home-kicker">{t.nav.about}</p>
            <h2 id="team-title" data-reveal="" className="mt-6 text-[clamp(1.8rem,2.4vw,2.6rem)] font-light leading-[1.12] tracking-[-.015em] text-white">{src.home.teamTitle ?? t.nav.about}</h2>
            <p className="mt-8 max-w-2xl border-l border-brand pl-5 text-lg font-medium leading-relaxed text-white/78">{copy.teamTitle}</p>

            <div className="mt-7 max-w-2xl space-y-5 text-[.95rem] leading-7 text-white/56">
              <p>{copy.teamBody}</p>
            </div>

            <p className="home-signature relative mt-9 text-[clamp(3.25rem,4vw,3.75rem)] leading-[1.2] text-white">{src.home.author}</p>

            <div className="relative mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-7">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center text-white/75 transition-colors hover:text-brand">
                <FacebookIcon className="size-5" />
              </a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center text-white/75 transition-colors hover:text-brand">
                <InstagramIcon className="size-5" />
              </a>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={t.openMap} className="grid size-11 place-items-center text-white/75 transition-colors hover:text-brand">
                <MapPin className="size-4" aria-hidden="true" />
              </a>
              <Link prefetch={false} href={routes[locale].about} className="ml-auto inline-flex min-h-11 items-center gap-3 px-2 text-[.72rem] font-bold uppercase tracking-[.15em] text-white transition-colors hover:text-[#ef6267]">
                {t.nav.about}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, isActive, locale, onOpen, mobileCarousel = false, measure = true }: { review: VerifiedReview; isActive: boolean; locale: Locale; onOpen: () => void; mobileCarousel?: boolean; measure?: boolean }) {
  const visibleTextRef = useRef<HTMLQuoteElement>(null)
  const fullTextRef = useRef<HTMLParagraphElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    if (!measure) return
    const visibleText = visibleTextRef.current
    const fullText = fullTextRef.current
    if (!visibleText || !fullText) return

    const checkTruncation = () => setIsTruncated(fullText.getBoundingClientRect().height > visibleText.getBoundingClientRect().height + 2)
    const frame = requestAnimationFrame(checkTruncation)
    const observer = new ResizeObserver(checkTruncation)
    observer.observe(visibleText)
    observer.observe(fullText)
    window.addEventListener("resize", checkTruncation)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", checkTruncation)
    }
  }, [review.text, isActive, measure])

  return (
    <figure
      className={cn(
        "editorial-quote relative flex flex-col overflow-hidden p-6 transition-opacity duration-500 lg:p-9",
        mobileCarousel
          ? isActive
            ? "min-h-[25rem] md:min-h-[23rem] scale-100 opacity-100"
            : "min-h-[25rem] md:min-h-[20rem]"
          : isActive
            ? "min-h-[23rem]"
            : "hidden min-h-[20rem] md:flex",
      )}
    >
      <div className="relative flex items-center justify-between gap-5">
        <div className="flex gap-1 text-brand" role="img" aria-label="5 / 5">
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" aria-hidden="true" />)}
        </div>
        <span className="text-[.72rem] font-bold uppercase tracking-[.16em] text-white/65">{review.source}</span>
      </div>
      <Quote className="mt-8 size-9 text-brand" strokeWidth={1} aria-hidden="true" />
      <div className="relative mt-5 pb-9">
        <blockquote ref={visibleTextRef} className={cn(mobileCarousel ? "line-clamp-5 md:line-clamp-3" : "line-clamp-3", "font-display font-normal leading-[1.5]", isActive ? "text-xl text-white/90 sm:text-[1.6rem]" : "text-lg text-white/64")}>„{review.text}”</blockquote>
        {measure && <p ref={fullTextRef} aria-hidden="true" className={cn("pointer-events-none invisible absolute left-0 top-0 w-full font-display font-normal leading-[1.5]", isActive ? "text-xl sm:text-[1.6rem]" : "text-lg")}>„{review.text}”</p>}
        {isTruncated && (
          <button type="button" onClick={onOpen} className="group/more mt-4 inline-flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[.14em] text-brand transition-colors hover:text-[#ff676d]">
            {reviewDialogCopy[locale].more}
            <ArrowRight className="size-3.5 transition-transform group-hover/more:translate-x-1" aria-hidden="true" />
          </button>
        )}
      </div>
      <figcaption className="mt-auto flex flex-col gap-1 border-t border-white/15 pt-6">
        <strong className="text-base font-semibold tracking-normal text-white/88">{review.name}</strong>
        <span className="mt-1.5 block text-[.72rem] font-bold uppercase tracking-[.16em] text-white/65">{review.source} / BORUCH Myjnia Szczecin</span>
      </figcaption>
    </figure>
  )
}

function Reviews({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  const sectionRef = useRef<HTMLElement>(null)
  const [carouselReady, setCarouselReady] = useState(false)
  const [activeReview, setActiveReview] = useState(0)
  const [selectedReview, setSelectedReview] = useState<VerifiedReview | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel({ active: carouselReady, align: "center", loop: true, skipSnaps: false, duration: 32 })
  const reviewCount = copy.reviews.length
  const openReview = (review: VerifiedReview) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelectedReview(review)
  }

  const closeReview = useCallback(() => {
    setSelectedReview(null)
    requestAnimationFrame(() => openerRef.current?.focus())
  }, [])

  useModalFocus(Boolean(selectedReview), dialogRef, closeReview)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !("IntersectionObserver" in window)) {
      setCarouselReady(true)
      return
    }
    // Keep carousel layout measurements out of the hero's initial rendering work.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCarouselReady(true)
        observer.disconnect()
      }
    }, { rootMargin: "400px 0px" })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!desktopEmblaApi) return
    const updateActiveReview = () => setActiveReview(desktopEmblaApi.selectedScrollSnap())
    updateActiveReview()
    desktopEmblaApi.on("select", updateActiveReview)
    desktopEmblaApi.on("reInit", updateActiveReview)
    return () => {
      desktopEmblaApi.off("select", updateActiveReview)
      desktopEmblaApi.off("reInit", updateActiveReview)
    }
  }, [desktopEmblaApi])

  const showPreviousReview = () => desktopEmblaApi?.scrollPrev(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  const showNextReview = () => desktopEmblaApi?.scrollNext(window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  return (
    <section ref={sectionRef} aria-labelledby="reviews-title" className="home-reviews section-xl relative overflow-hidden bg-[#0a0a0b]">
      <div className="home-shell home-reviews-content relative">
        <div className="grid gap-7 border-b border-white/10 pb-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
          <p className="home-kicker">{copy.reviewsLabel}</p>
          <h2 id="reviews-title" data-reveal="" className="editorial-display mt-7 max-w-[25ch]">{copy.reviewsTitle}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/65 lg:col-span-4">{copy.reviewsIntro}</p>
        </div>

        <div className="relative mt-6 [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)] md:mt-10 md:[mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]">
          <div ref={carouselReady ? desktopEmblaRef : undefined} className="cursor-grab overflow-hidden active:cursor-grabbing" role="region" aria-roledescription="carousel" aria-label={copy.reviewsLabel}>
            <div className="-ml-3 flex touch-pan-y items-center py-5 md:-ml-5 md:py-8">
              {copy.reviews.map((review, index) => {
                const isActive = index === activeReview
                const isBefore = (index - activeReview + reviewCount) % reviewCount > reviewCount / 2
                return (
                  <div key={`${review.source}-${review.name}`} className="min-w-0 shrink-0 basis-[98%] pl-3 md:basis-[42%] md:pl-5" inert={!isActive} aria-hidden={!isActive}>
                    <div className={cn(
                      "relative h-full transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none",
                      isActive ? "z-20 scale-100 opacity-100" : isBefore
                        ? "z-10 scale-[.9] opacity-30 md:origin-right md:scale-[.7] md:opacity-15"
                        : "z-10 scale-[.9] opacity-30 md:origin-left md:scale-[.7] md:opacity-15",
                    )}>
                      <ReviewCard review={review} isActive={isActive} locale={locale} onOpen={() => openReview(review)} mobileCarousel measure={carouselReady && isActive} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-[.72rem] font-bold uppercase tracking-[.14em] text-white/65 md:hidden">{copy.reviewsSwipe}</p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" onClick={showPreviousReview} aria-label={reviewControls[locale].previous} className="grid size-11 place-items-center border border-white/14 bg-white/[.035] text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <div className="flex min-w-28 items-center justify-center gap-2" aria-live="polite">
            <span className="sr-only">{copy.reviews[activeReview].name}</span>
            <span className="h-px w-5 bg-white/18" aria-hidden="true" />
            <span className="h-0.5 w-10 bg-brand" aria-hidden="true" />
            <span className="h-px w-5 bg-white/18" aria-hidden="true" />
          </div>
          <button type="button" onClick={showNextReview} aria-label={reviewControls[locale].next} className="grid size-11 place-items-center border border-white/14 bg-white/[.035] text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white">
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
          <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer"  className="group flex items-center gap-4 border border-white/10 bg-[#111112] p-4 transition-colors hover:border-brand/55">
            <span className="grid h-12 min-w-16 shrink-0 place-items-center border border-[#238965]/75 bg-[#176b4f]/15 px-2 font-display text-base font-black text-[#75c9a9]">5.0/5</span>
            <span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-white">Booksy</strong><span className="mt-1 block text-xs text-white/65">{copy.booksyReviews}</span></span>
            <ArrowUpRight className="size-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer"  className="group flex items-center gap-4 border border-white/10 bg-[#111112] p-4 transition-colors hover:border-brand/55">
            <span className="grid h-12 min-w-16 shrink-0 place-items-center border border-[#238965]/75 bg-[#176b4f]/15 px-2 font-display text-base font-black text-[#75c9a9]">5.0/5</span>
            <span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-white">Google</strong><span className="mt-1 block text-xs text-white/65">{copy.googleReviews}</span></span>
            <ArrowUpRight className="size-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {selectedReview && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-dialog-title"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-6"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeReview() }}
        >
          <div className="modal-sheet relative max-h-[90dvh] w-full overflow-y-auto border-t border-brand/55 bg-[#121213] sm:max-w-3xl sm:border sm:border-white/12">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand" aria-hidden="true" />
            <button data-review-close type="button" onClick={closeReview} aria-label={reviewDialogCopy[locale].close} className="absolute right-4 top-4 z-10 grid size-11 place-items-center border border-white/12 bg-black/45 text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white sm:right-6 sm:top-6">
              <X className="size-5" aria-hidden="true" />
            </button>
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="flex gap-1 text-brand" aria-label="5 / 5">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-5 fill-current" aria-hidden="true" />)}
              </div>
              <p className="mt-5 text-[.72rem] font-bold uppercase tracking-[.18em] text-brand">{reviewDialogCopy[locale].label} - {selectedReview.source}</p>
              <h3 id="review-dialog-title" className="mt-4 font-display text-[clamp(1.5rem,4.8vw,2.25rem)] font-bold leading-snug tracking-normal">{selectedReview.name}</h3>
              <div className="my-7 h-px bg-white/10 sm:my-9" />
              <div className="relative max-w-2xl">
                <p className="relative text-base font-medium leading-8 text-white/78 sm:text-lg sm:leading-9">„{selectedReview.text}”</p>
              </div>
              <button type="button" onClick={closeReview} className="mt-9 inline-flex items-center gap-3 text-[.72rem] font-bold uppercase tracking-[.15em] text-brand transition-colors hover:text-[#ff676d]">
                {reviewDialogCopy[locale].close}<X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function HomeFaq({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]

  return (
    <section aria-labelledby="faq-title" className="section-lg border-b border-white/10 bg-[#111112]">
      <div className="home-shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="home-kicker">{copy.faqLabel}</p>
          <h2 id="faq-title" data-reveal="" className="editorial-display mt-7">{copy.faqTitle}</h2>
          <p className="mt-7 max-w-sm text-base leading-relaxed text-white/65">{copy.faqIntro}</p>
        </div>

        <div className="border-t border-white/12 lg:col-span-7 lg:col-start-6">
          {copy.faq.map(([question, answer]) => (
            <details key={question} className="group border-b border-white/12">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[clamp(1rem,1.25vw,1.18rem)] font-medium normal-case leading-relaxed tracking-normal transition-colors hover:text-[#ef6267] [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <span className="grid size-6 shrink-0 place-items-center text-brand transition-transform group-open:rotate-180">
                  <ChevronDown className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pr-12 text-base leading-relaxed text-white/65">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const slide = src.slides[3]
  const copy = homeCopy[locale]
  const locationTitle = { pl: "W centrum Szczecina", en: "In central Szczecin", de: "Im Zentrum von Szczecin", uk: "У центрі Щецина" }[locale]

  return (
    <section aria-labelledby="location-title" className="border-y border-white/10 bg-[#0e0e0f] py-16 lg:py-20">
      <div className="home-shell">
        <div className="relative grid overflow-hidden lg:grid-cols-[.42fr_.83fr_.95fr]">
          <div className="relative flex min-h-40 flex-col justify-between overflow-hidden bg-[#0a0a0b] p-8 sm:p-10 lg:min-h-80">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-brand" aria-hidden="true" />
          <span className="text-[.72rem] font-bold uppercase tracking-[.2em] text-white/58">PAZIM / {t.level}</span>
          <strong className="font-display text-[clamp(5rem,8vw,7.25rem)] font-black leading-[.9] tracking-normal text-[#ee343e]">-2</strong>
          </div>
          <div className="relative flex flex-col justify-between overflow-hidden bg-[#111112] p-8 sm:p-10 lg:min-h-80">
          <div>
            <p className="home-kicker text-[#ef6267]">{slide.kicker}</p>
            <h2 id="location-title" data-reveal="" className="mt-6 font-display text-[clamp(1.8rem,2.5vw,2.65rem)] font-semibold leading-[1.2] tracking-normal">{locationTitle}</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/64">{copy.routeHint}</p>
          </div>
          <address className="relative mt-8 flex items-start gap-3 border-t border-brand/25 pt-5 not-italic text-sm leading-relaxed text-white/72">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <span className="flex flex-col">{src.address.lines.map((line) => <span key={line}>{line}</span>)}</span>
          </address>
          </div>
          <div className="group relative min-h-64 overflow-hidden border-t border-white/10 bg-[#151516] lg:min-h-80 lg:border-l lg:border-t-0">
          <iframe
            title={`${t.openMap} - BORUCH Myjnia Szczecin`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 block h-full w-full border-0 opacity-90 [filter:grayscale(.72)_invert(.92)_sepia(.22)_hue-rotate(305deg)_contrast(1.02)]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/42 via-transparent to-transparent" aria-hidden="true" />
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 right-0 flex min-h-12 items-center justify-between bg-[#0a0a0b] px-4 text-[.72rem] font-bold uppercase tracking-[.14em] text-white transition-colors hover:bg-brand">
            {t.openMap}<ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]

  return (
    <section id="wycena" aria-labelledby="contact-form-title" className="section-xl bg-[#111112]">
      <div className="home-shell">
        <div className="mb-12 grid gap-7 border-b border-white/15 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="home-kicker">{copy.contactLabel}</p><h2 id="contact-form-title" data-reveal="" className="editorial-display mt-7">{editorialCopy[locale].talk}</h2></div>
          <p className="max-w-md text-base leading-relaxed text-white/65 lg:col-span-4">{copy.contactIntro}</p>
        </div>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-5 border-t border-white/15 pt-6">
              <a href={contact.phoneHref} className="editorial-contact-phone">{contact.phone}<ArrowUpRight className="size-5 text-brand" aria-hidden="true" /></a>
              <a href={`mailto:${contact.email}`} className="editorial-link w-fit break-all">{contact.email}<ArrowUpRight className="size-4 text-brand" aria-hidden="true" /></a>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-white/65">{copy.contactBooksy}</p>
              <Link prefetch={false} href={routes[locale].pricing} className="editorial-link mt-2 w-fit">{ui[locale].pricing}<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
          </div>
        <div data-reveal="" className="lg:col-span-7">
          <HomeContactForm locale={locale} />
        </div>
        </div>
      </div>
    </section>
  )
}

function HomeFooter({ locale }: { locale: Locale }) {
  return <SiteFooter locale={locale} alternates={Object.fromEntries(localeOrder.map(code => [code, routes[code].home])) as Record<Locale, string>} showContactCta={false} />
}
