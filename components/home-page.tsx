"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import type { CSSProperties, MouseEvent } from "react"
import Link from "next/link"
import { Alex_Brush } from "next/font/google"
import useEmblaCarousel from "embla-carousel-react"
import {
  Armchair, ArrowLeft, ArrowRight, ArrowUpRight, Brush, ChevronDown,
  CircleDot, Clock3, Droplets, Droplet, Gem, Layers3, Mail, MapPin,
  PackageCheck, Palette, Pause, Play, Phone, ShieldCheck, Sparkles, Star,
  SunMedium, WandSparkles, Waves, X, Quote,
} from "lucide-react"
import { Photo } from "./photo"
import { HomeContactForm } from "./home-contact-form"
import { BoruchGoogleMap } from "./boruch-google-map"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"
import { serviceConfigs, serviceSummary } from "@/lib/content/services"
import type { PhotoId } from "@/lib/photos"
import { clsx as cn } from "clsx"

// This font is applied only to the handwritten signature.
const signatureFont = Alex_Brush({ weight: "400", style: "normal", subsets: ["latin"], display: "swap", preload: false })

const navOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]

const APPLE_MAPS_URL =
  "https://maps.apple.com/?q=BORUCH%20Myjnia%20Szczecin&ll=53.43292196110834,14.555987074586804"

const mapOpenCopy: Record<Locale, string> = {
  pl: "Otwórz w mapach",
  en: "Open in maps",
  de: "In Karten öffnen",
  uk: "Відкрити в картах",
}

function openPreferredMaps(event: MouseEvent<HTMLAnchorElement>) {
  if (typeof navigator === "undefined") return

  const isIOS =
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

  if (!isIOS) return

  event.preventDefault()

  window.open(
    APPLE_MAPS_URL,
    "_blank",
    "noopener,noreferrer",
  )
}


const heroPhotos: Array<{ id: PhotoId; position: string }> = [
  { id: "p11", position: "54% 58%" },
  { id: "p52", position: "55% 60%" },
  { id: "p43", position: "58% 55%" },
  { id: "p46", position: "50% 50%" },
]

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

const packageSaleCopy: Record<Locale, { title: string; without: string; sizeNote: string }> = {
  pl: { title: "W komplecie taniej", without: "Cena bez pakietu", sizeNote: "W pakiecie Komplet obowiązują osobne warianty: średnie auto od 240 zł, duże auto od 260 zł." },
  en: { title: "Better value as a package", without: "Price without the package", sizeNote: "The Complete package has separate variants: medium car from PLN 240, large car from PLN 260." },
  de: { title: "Im Paket günstiger", without: "Preis ohne Paket", sizeNote: "Für das Komplettpaket gelten eigene Varianten: mittelgroßes Auto ab 240 PLN, großes Auto ab 260 PLN." },
  uk: { title: "У комплекті вигідніше", without: "Ціна без пакета", sizeNote: "Для пакета Комплекс діють окремі варіанти: середнє авто від 240 PLN, велике авто від 260 PLN." },
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
    details: "Zobacz pełny cennik",
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

const editorialCopy = {
  pl: { previous: "Poprzedni slajd", next: "Następny slajd", pause: "Zatrzymaj slajdy", play: "Wznów slajdy", select: "Wybierz usługę", detail: "Poznaj usługę", why: "Każdy etap ręcznie.", studio: "Myjnia / Detailing / Szczecin", portfolio: "Wybrane realizacje", scope: "Zakres pielęgnacji", talk: "Porozmawiajmy o Twoim aucie." },
  en: { previous: "Previous slide", next: "Next slide", pause: "Pause slides", play: "Resume slides", select: "Choose a service", detail: "Explore the service", why: "Every stage by hand.", studio: "Car wash / Detailing / Szczecin", portfolio: "Selected work", scope: "Care included", talk: "Let's talk about your car." },
  de: { previous: "Vorherige Folie", next: "Nächste Folie", pause: "Folien pausieren", play: "Folien fortsetzen", select: "Leistung wählen", detail: "Leistung entdecken", why: "Jeder Schritt von Hand.", studio: "Autowäsche / Detailing / Szczecin", portfolio: "Ausgewählte Arbeiten", scope: "Pflegeumfang", talk: "Sprechen wir über Ihr Auto." },
  uk: { previous: "Попередній слайд", next: "Наступний слайд", pause: "Зупинити слайди", play: "Продовжити слайди", select: "Оберіть послугу", detail: "Дізнатися про послугу", why: "Кожен етап вручну.", studio: "Мийка / Детейлінг / Щецин", portfolio: "Вибрані роботи", scope: "Обсяг догляду", talk: "Поговорімо про ваше авто." },
} satisfies Record<Locale, Record<string, string>>

const careSteps: Record<Locale, Array<[string, string]>> = {
  pl: [
    ["Dobieramy zakres", "Sprawdzamy stan auta i dobieramy odpowiednie zabiegi, od podstawowej pielęgnacji po ochronę lakieru"],
    ["Pracujemy nad detalami", "Dbamy o wnętrze, karoserię i detale, które przy zwykłym myciu często zostają niezauważone."],
    ["Ustalamy dalszą pielęgnację", "Podpowiadamy, jak myć i pielęgnować auto po wykonanej usłudze."],
  ],
  en: [
    ["We choose the right scope", "We assess the condition of your car and select the right treatments, from basic care to paint protection."],
  ["We focus on the details", "We take care of the interior, bodywork and details that are often overlooked during a regular wash."],
  ["We plan further care", "We advise you on how to wash and maintain your car after the service."],
  ],
  de: [
    ["Wir wählen den passenden Umfang", "Wir prüfen den Zustand Ihres Fahrzeugs und wählen die passenden Maßnahmen - von der Basispflege bis zum Lackschutz."],
  ["Wir achten auf die Details", "Wir kümmern uns um Innenraum, Karosserie und Details, die bei einer normalen Wäsche oft übersehen werden."],
  ["Wir planen die weitere Pflege", "Wir beraten Sie, wie Sie Ihr Fahrzeug nach der Behandlung richtig waschen und pflegen."],
  ],
  uk: [
     ["Підбираємо обсяг робіт", "Оцінюємо стан автомобіля та підбираємо відповідні процедури - від базового догляду до захисту лакофарбового покриття."],
  ["Працюємо над деталями", "Дбаємо про салон, кузов і деталі, які під час звичайного миття часто залишаються непоміченими."],
  ["Плануємо подальший догляд", "Підказуємо, як правильно мити та доглядати за автомобілем після виконаної послуги."],
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
      { label: "Myjnia i detailing w Szczecinie", title: "SPA dla Twojego auta", text: "Kompleksowa pielęgnacja wnętrza i nadwozia z dbałością o każdy detal." },
      { label: "Folie ochronne i zmiana koloru", title: "Oklejanie aut", text: "Zabezpieczamy lakier folią PPF i odmieniamy wygląd samochodu bez trwałej ingerencji." },
      { label: "Detailing bez kompromisów", title: "Profesjonalne kosmetyki", text: "Pracujemy na sprawdzonych produktach, które są bezpieczne dla lakieru i wnętrza." },
      { label: "Dogodna lokalizacja", title: "W centrum Szczecina", text: "Znajdziesz nas na poziomie -2 parkingu podziemnego PAZIM, pod Radissonem." },
    ],
    whyLabel: "Dlaczego BORUCH",
    whyTitle: "Ręczna pielęgnacja auta od mycia po zabezpieczenie lakieru.",
    whyIntro: "Dbamy o samochód kompleksowo - od wnętrza po lakier. Każdy etap wykonujemy ręcznie, zwracając uwagę na detale i dobierając zakres pielęgnacji do konkretnego auta.",
    benefits: [
      ["Ręczna pielęgnacja", "Precyzyjna praca ręczna pozwala nam zadbać o miejsca, które łatwo pominąć."],
      ["Pełny zakres", "Kompleksowa pielęgnacja auta od podstawowego mycia po zaawansowaną ochronę lakieru."],
      ["Centrum Szczecina", "W samym centrum miasta, zostaw auto i skocz na zakupy do pobliskich galerii"],
    ],
    servicesIntro: "Wybierz podstawową pielęgnację albo pełne zabezpieczenie samochodu.",
    galleryCaptions: ["Korekta lakieru", "Folia PPF", "Detailing wnętrza", "Mycie ręczne", "Zabezpieczenie lakieru"],
    teamTitle: "Za każdym autem stoi konkretna ekipa.",
    teamBody: `Każdego dnia budzimy się z myślą o tym, aby dziś nadać blask kolejnej maszynie.
Kochamy auta, zdecydowanie bardziej te czyste i lśniące.
Stąd pomysł o założeniu myjni, gdzie dokładamy wszelkich starań,
aby Państwa 'perełki' wyglądały jak nowe!

Usługi naszej myjni to m.in. detailingowe mycie zewnątrz, nabłyszczanie opon, czyszczenie wnętrza: odkurzanie, czyszczenie i pielęgnacja kokpitu, mycie szyb, pranie tapicerki materiałowej, czyszczenie i impregnacja skór.
Oferujemy również takie usługi jak oklejanie folią PPF, zmiana koloru auta lub pojedynczych elementów (np. dechroming), a nawet przyciemnianie szyb i reflektorów.

Na liście naszych usług jest również polerowanie, korekta lakieru, aplikacja powłoki ceramicznej czy ręczne woskowanie pojazdu.
Oprócz miłości do aut łączy nas również przyjaźń i wspaniała atmosfera w zespole, co myślimy jest drugim najważniejszym spoiwem, które wpływa na doskonałą jakość i dokładność wykonania przez nas usług!
Zapraszamy Cię do nas i mamy nadzieję, że zadowolony.. wrócisz w nasze progi :)`,
    routeHint: "Wjedź na parking PAZIM i zjedź na parking podziemny.",
    reviewsLabel: "Opinie klientów",
    reviewsTitle: "Efekt, do którego chce się wracać.",
    reviewsIntro: "Zobacz, co o efektach naszej pracy mówią klienci, którzy oddali nam swoje samochody.",
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
      ["Czy muszę zostawić auto na cały dzień?", "To zależy od wybranej usługi. Podstawowe mycie i czyszczenie zajmuje mniej czasu, natomiast detailing, korekta lakieru, powłoka ceramiczna czy oklejanie folią PPF mogą wymagać pozostawienia auta na dłużej."],

["Czy mogę otrzymać wycenę przed wizytą?", "Tak. Przy prostszych usługach cena jest określona w cenniku, a przy detailingu, korekcie lakieru, PPF czy innych pracach indywidualnych wycena zależy od stanu auta i zakresu prac."],

["Czym różni się zwykłe mycie od detailingu?", "Mycie skupia się przede wszystkim na dokładnym oczyszczeniu auta, natomiast detailing obejmuje bardziej precyzyjną pielęgnację, renowację i zabezpieczenie wnętrza lub lakieru."],

["Czy folia PPF chroni lakier przed uszkodzeniami?", "Folia PPF tworzy warstwę ochronną na lakierze i pomaga zabezpieczyć go przed drobnymi zarysowaniami, odpryskami i innymi śladami codziennego użytkowania."],

["Czy korekta lakieru usuwa wszystkie rysy?", "Zakres korekty zależy od stanu i grubości lakieru. Przed wykonaniem usługi oceniamy powierzchnię i dobieramy taki zakres pracy, który pozwoli poprawić wygląd lakieru w bezpieczny sposób."],

["Czy po detailingu dostanę zalecenia dotyczące pielęgnacji auta?", "Tak. Po wykonaniu usługi podpowiadamy, jak myć i pielęgnować samochód, aby jak najdłużej utrzymać uzyskany efekt."],

["Czy zajmujecie się również wnętrzem samochodu?", "Tak. Oferujemy m.in. dokładne odkurzanie, czyszczenie kokpitu i elementów plastikowych, mycie szyb, pranie tapicerki materiałowej oraz czyszczenie i impregnację skór."],

["Czy można zabezpieczyć tylko wybrane elementy auta folią PPF?", "Oferujemy oklejanie całego auta folią PPF lub wybrane elementy karoserii, wnętrza jak i wybranych elementów."],
    ],
    contactLabel: "Kontakt i wycena",
    contactTitle: "Opowiedz nam, czego potrzebuje Twoje auto.",
    contactIntro: "Podaj podstawowe dane i opisz zakres prac. Odpowiemy z propozycją usługi albo poprosimy o dodatkowe zdjęcia.",
    contactDirect: "Napisz, czego potrzebuje Twoje auto.",
    contactBooksy: "Odpowiemy z propozycją usługi i dogodnym terminem.",
  },
  en: {
    heroSlides: [
    { label: "Car wash and detailing in Szczecin", title: "A spa for your car", text: "Complete interior and exterior care with attention to every detail." },
    { label: "Protective films and colour change", title: "Vehicle wrapping", text: "We protect the paint with PPF and transform the look of your car without permanent modification." },
    { label: "Detailing without compromise", title: "Professional car care products", text: "We work with proven products that are safe for both the paintwork and the interior." },
    { label: "Convenient location", title: "In central Szczecin", text: "You will find us on level -2 of the PAZIM underground car park, beneath the Radisson hotel." },
    ],
    whyLabel: "Why BORUCH",
    whyTitle: "Hands-on car care from washing to paint protection.",
    whyIntro: "One place for complete exterior and interior car care.",
    benefits: [
       ["Hand care", "Precise hands-on work allows us to take care of details that are easy to overlook."],
    ["Full range", "Complete car care, from a basic wash to advanced paint protection."],
    ["Central Szczecin", "Right in the city centre - leave your car with us and enjoy the nearby shopping centres while we work."],
    ],
    servicesIntro: "Choose essential care or complete protection for your car.",
    galleryCaptions: ["Paint correction", "PPF protection", "Interior detailing", "Hand wash", "Paint protection"],
    teamTitle: "A dedicated team stands behind every car.",
    teamBody: "BORUCH grew from a passion for clean and well-kept cars. We work carefully, without rushing, and take responsibility for the result.",
    routeHint: "Enter the PAZIM car park and drive down to level -2.",
    reviewsLabel: "Customer reviews",
    reviewsTitle: "Results worth coming back for.",
    reviewsIntro: "See what our customers say about the results after leaving their cars in our care.",
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
     ["Do I need to leave my car for the whole day?", "It depends on the service. A basic wash and cleaning takes less time, while detailing, paint correction, ceramic coating or PPF installation may require leaving the car with us for longer."],

  ["Can I get a quote before my visit?", "Yes. Simpler services have fixed prices in the price list, while detailing, paint correction, PPF and other individual work is priced according to the condition of the car and the scope of work."],

  ["What is the difference between a regular wash and detailing?", "A regular wash focuses mainly on thoroughly cleaning the car, while detailing involves more precise care, restoration and protection of the interior or paintwork."],

  ["Does PPF protect the paint from damage?", "PPF creates a protective layer over the paint and helps protect it against minor scratches, stone chips and other signs of everyday use."],

  ["Does paint correction remove all scratches?", "The extent of the correction depends on the condition and thickness of the paint. Before the service, we assess the surface and choose a safe level of correction to improve the appearance of the paintwork."],

  ["Will I get advice on how to care for my car after detailing?", "Yes. After the service, we explain how to wash and maintain your car so that the result lasts as long as possible."],

  ["Do you also work on car interiors?", "Yes. We offer services including thorough vacuuming, dashboard and plastic cleaning, window cleaning, fabric upholstery cleaning, as well as leather cleaning and protection."],

  ["Can I protect only selected parts of the car with PPF?", "Yes. We can apply PPF to the entire car or only to selected exterior panels, interior elements or other chosen parts."],
    ],
    contactLabel: "Contact and quote",
    contactTitle: "Tell us what your car needs.",
    contactIntro: "Share the key details and describe the work. We will reply with a suggested service or ask for additional photos.",
    contactDirect: "Tell us what your car needs.",
    contactBooksy: "We will suggest the right service and a convenient date.",
  },
  de: {
    heroSlides: [
       { label: "Autowäsche und Detailing in Stettin", title: "Wellness für Ihr Auto", text: "Umfassende Pflege von Innenraum und Karosserie mit Liebe zum Detail." },
    { label: "Schutzfolien und Farbwechsel", title: "Fahrzeugfolierung", text: "Wir schützen den Lack mit PPF und verändern die Optik Ihres Fahrzeugs ohne dauerhaften Eingriff." },
    { label: "Detailing ohne Kompromisse", title: "Professionelle Fahrzeugpflegeprodukte", text: "Wir arbeiten mit bewährten Produkten, die sowohl für den Lack als auch für den Innenraum sicher sind." },
    { label: "Günstige Lage", title: "Im Zentrum von Stettin", text: "Sie finden uns auf Ebene -2 der PAZIM Tiefgarage, unter dem Radisson Hotel." },
  ],
    whyLabel: "Warum BORUCH",
    whyTitle: "Manuelle Fahrzeugpflege von der Wäsche bis zum Lackschutz.",
    whyIntro: "Ein Ort für die komplette Pflege des Fahrzeugs innen und außen.",
    benefits: [
    ["Handarbeit", "Präzise Handarbeit ermöglicht es uns, auch Details zu pflegen, die leicht übersehen werden."],
    ["Komplettes Angebot", "Umfassende Fahrzeugpflege von der Basiswäsche bis zum hochwertigen Lackschutz."],
    ["Zentrum Stettins", "Mitten im Stadtzentrum - lassen Sie Ihr Auto bei uns und nutzen Sie die Zeit für einen Besuch in den nahegelegenen Einkaufszentren."],
    ],
    servicesIntro: "Wählen Sie eine Basispflege oder den vollständigen Schutz Ihres Fahrzeugs.",
    galleryCaptions: ["Lackkorrektur", "PPF Schutzfolie", "Innenraumdetailing", "Handwäsche", "Lackschutz"],
    teamTitle: "Hinter jedem Fahrzeug steht ein konkretes Team.",
    teamBody: "BORUCH entstand aus Leidenschaft für saubere und gepflegte Fahrzeuge. Wir arbeiten gründlich, ohne Eile und mit voller Verantwortung für das Ergebnis.",
    routeHint: "Fahren Sie in die PAZIM Tiefgarage und hinunter auf Ebene -2.",
    reviewsLabel: "Kundenmeinungen",
    reviewsTitle: "Ein Ergebnis, für das man gerne wiederkommt.",
    reviewsIntro: "Lesen Sie, was unsere Kunden über die Ergebnisse sagen, nachdem sie ihr Fahrzeug in unsere Hände gegeben haben.",
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
       ["Muss ich mein Auto den ganzen Tag bei Ihnen lassen?", "Das hängt von der gewählten Leistung ab. Eine Basiswäsche und Reinigung dauert kürzer, während Detailing, Lackkorrektur, Keramikversiegelung oder PPF-Folierung mehr Zeit in Anspruch nehmen können."],

  ["Kann ich vor dem Termin einen Kostenvoranschlag erhalten?", "Ja. Für einfachere Leistungen gelten feste Preise aus der Preisliste. Detailing, Lackkorrektur, PPF und andere individuelle Arbeiten werden je nach Fahrzeugzustand und Arbeitsumfang kalkuliert."],

  ["Was ist der Unterschied zwischen einer normalen Wäsche und Detailing?", "Eine normale Wäsche konzentriert sich vor allem auf die gründliche Reinigung des Fahrzeugs, während Detailing eine präzisere Pflege, Aufbereitung und den Schutz von Innenraum oder Lack umfasst."],

  ["Schützt PPF den Lack vor Beschädigungen?", "PPF bildet eine Schutzschicht auf dem Lack und hilft dabei, ihn vor feinen Kratzern, Steinschlägen und anderen Gebrauchsspuren zu schützen."],

  ["Entfernt eine Lackkorrektur alle Kratzer?", "Der Umfang der Lackkorrektur hängt vom Zustand und von der Lackstärke ab. Vor der Behandlung prüfen wir die Oberfläche und wählen einen sicheren Arbeitsumfang, der das Erscheinungsbild des Lacks verbessert."],

  ["Bekomme ich nach dem Detailing Pflegehinweise für mein Auto?", "Ja. Nach der Behandlung erklären wir Ihnen, wie Sie Ihr Fahrzeug richtig waschen und pflegen, damit das Ergebnis möglichst lange erhalten bleibt."],

  ["Bieten Sie auch Innenraumreinigung an?", "Ja. Wir bieten unter anderem gründliches Staubsaugen, die Reinigung von Armaturenbrett und Kunststoffteilen, Scheibenreinigung, Polsterreinigung sowie Lederreinigung und -pflege an."],

  ["Kann man nur ausgewählte Fahrzeugteile mit PPF schützen?", "Ja. Wir bieten PPF für das gesamte Fahrzeug oder nur für ausgewählte Karosserieteile, Innenraumelemente oder andere gewünschte Bereiche an."],
    ],
    contactLabel: "Kontakt und Angebot",
    contactTitle: "Sagen Sie uns, was Ihr Fahrzeug benötigt.",
    contactIntro: "Nennen Sie die wichtigsten Angaben und beschreiben Sie den Umfang. Wir antworten mit einem Vorschlag oder bitten um zusätzliche Fotos.",
    contactDirect: "Beschreiben Sie, was Ihr Fahrzeug benötigt.",
    contactBooksy: "Wir schlagen die passende Leistung und einen Termin vor.",
  },
  uk: {
    heroSlides: [
       { label: "Автомийка та детейлінг у Щецині", title: "SPA для вашого авто", text: "Комплексний догляд за салоном і кузовом з увагою до кожної деталі." },
    { label: "Захисні плівки та зміна кольору", title: "Обклеювання авто", text: "Захищаємо лак плівкою PPF і змінюємо вигляд автомобіля без постійного втручання." },
    { label: "Детейлінг без компромісів", title: "Професійна автокосметика", text: "Працюємо з перевіреними засобами, безпечними як для лакофарбового покриття, так і для салону." },
    { label: "Зручне розташування", title: "У центрі Щецина", text: "Ви знайдете нас на рівні -2 підземного паркінгу PAZIM, під готелем Radisson." },
    ],
    whyLabel: "Чому BORUCH",
    whyTitle: "Ручний догляд за авто від миття до захисту лаку.",
    whyIntro: "Одне місце для повного догляду за автомобілем зовні та всередині.",
    benefits: [
    ["Ручний догляд", "Точна ручна робота дозволяє нам подбати навіть про ті місця, які легко пропустити."],
["Повний комплекс", "Комплексний догляд за автомобілем - від базового миття до професійного захисту лакофарбового покриття."],
["Центр Щецина", "Ми знаходимося в самому центрі міста - залиште автомобіль у нас і скористайтеся часом на покупки в сусідніх торгових центрах."],
    ],
    servicesIntro: "Оберіть базовий догляд або повний захист автомобіля.",
    galleryCaptions: ["Корекція лаку", "Захисна плівка PPF", "Детейлінг салону", "Ручне миття", "Захист лаку"],
    teamTitle: "За кожним автомобілем стоїть конкретна команда.",
    teamBody: "BORUCH виріс із любові до чистих і доглянутих автомобілів. Працюємо уважно, без поспіху та відповідаємо за результат.",
    routeHint: "Заїдьте на паркінг PAZIM і спустіться на рівень -2.",
    reviewsLabel: "Відгуки клієнтів",
    reviewsTitle: "Результат, за яким хочеться повернутися.",
    reviewsIntro: "Дізнайтеся, що наші клієнти говорять про результат після того, як довірили нам свої автомобілі.",
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


const serviceExplorerCopy = {
    pl: {
      eyebrow: "Usługi",
      title: "Od mycia po ochronę lakieru.",
      intro: "Wybierz to, czego potrzebuje Twoje auto. Rozwiń usługę, żeby poznać jej zakres.",
      wash: "Myjnia",
      detailing: "Detailing",
      washDescription: "Czyste nadwozie, świeże wnętrze i regularna pielęgnacja.",
      detailingDescription: "Przywracanie połysku, ochrona lakieru i zmiana wyglądu auta.",
      details: "Poznaj usługę",
      expand: "Rozwiń zakres usługi",
      pricing: "Zobacz cennik",
allServices: "Wszystkie usługi",
advice: "Nie wiesz, od czego zacząć?",
adviceText: "Opisz nam auto i oczekiwany efekt. Pomożemy dobrać zakres prac.",
contact: "Zapytaj o swoje auto",
    },
    en: {
      eyebrow: "Services",
      title: "From a clean car to protected paint.",
      intro: "Choose what your car needs. Open a service to see what is included.",
      wash: "Car wash",
      detailing: "Detailing",
      washDescription: "Clean bodywork, a fresh interior and regular care.",
      detailingDescription: "Restoring shine, protecting paint and changing the look of your car.",
      details: "Explore the service",
      expand: "Show the service scope",
      pricing: "View pricing",
      allServices: "All services",
      advice: "Not sure where to start?",
      adviceText: "Tell us about your car and the result you want. We will help you choose the scope.",
      contact: "Ask about your car",
    },
    de: {
      eyebrow: "Leistungen",
      title: "Von der Wäsche bis zum Lackschutz.",
      intro: "Wählen Sie, was Ihr Auto braucht. Öffnen Sie eine Leistung, um den Umfang zu sehen.",
      wash: "Autowäsche",
      detailing: "Detailing",
      washDescription: "Saubere Karosserie, frischer Innenraum und regelmäßige Pflege.",
      detailingDescription: "Glanz wiederherstellen, den Lack schützen und die Optik verändern.",
      details: "Leistung ansehen",
      expand: "Leistungsumfang anzeigen",
      pricing: "Preise ansehen",
      allServices: "Alle Leistungen",
      advice: "Sie wissen nicht, wo Sie anfangen sollen?",
      adviceText: "Beschreiben Sie Ihr Auto und das gewünschte Ergebnis. Wir helfen bei der Auswahl.",
      contact: "Zum Fahrzeug anfragen",
    },
    uk: {
      eyebrow: "Послуги",
      title: "Від чистого авто до захисту лаку.",
      intro: "Оберіть те, що потрібно вашому авто. Розгорніть послугу, щоб переглянути її обсяг.",
      wash: "Мийка",
      detailing: "Детейлінг",
      washDescription: "Чистий кузов, свіжий салон і регулярний догляд.",
      detailingDescription: "Відновлення блиску, захист лаку та зміна вигляду авто.",
      details: "Дізнатися про послугу",
      expand: "Показати обсяг послуги",
      pricing: "Переглянути ціни",
      allServices: "Усі послуги",
      advice: "Не знаєте, з чого почати?",
      adviceText: "Розкажіть про авто й бажаний результат. Допоможемо підібрати обсяг робіт.",
      contact: "Запитати про своє авто",
    },
  } satisfies Record<Locale, Record<string, string>>

/**
 * Standalone replacement for the supplied home-page.tsx.
 * No server actions, API routes or runtime image optimizer are introduced.
 * Existing Photo, map, form, header and footer contracts are kept.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <div id="top" lang={localeLabels[locale].htmlLang} className="hp-rebuild">
      <style>{homeStyles}</style>
      {locale === "pl" && <link rel="preload" href="/fonts/roboto-flex-polish-v2.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />}
      <a href="#main" className="hp-skip">{ui[locale].skip}</a>
      <HomeHeader locale={locale} />
      <main id="main" tabIndex={-1} className="hp-main">
        <HomeHero locale={locale} />
        <HomeServices locale={locale} />
        <HomePortfolio locale={locale} />
        <HomeCare locale={locale} />
        <HomePackages locale={locale} />
        <HomeTeam locale={locale} />
        <HomeReviews locale={locale} />
        <HomeFaq locale={locale} />
        <HomeLocation locale={locale} />
        <HomeContact locale={locale} />
      </main>
      <HomeFooter locale={locale} />
    </div>
  )
}

function useReducedMotion() {
  // Start conservatively: automatic motion is enabled only after reading the preference.
  const [reduced, setReduced] = useState(true)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])
  return reduced
}

function SocialLinks({ locale, label = false }: { locale: Locale; label?: boolean }) {
  return (
    <div className="hp-socials">
      {label && <span className="hp-caption">{followCopy[locale]}</span>}
      <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hp-icon-button" aria-label="Facebook - BORUCH Myjnia">
        <span aria-hidden="true"><FacebookIcon className="size-5" /></span>
      </a>
      <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="hp-icon-button" aria-label="Instagram - BORUCH Myjnia">
        <span aria-hidden="true"><InstagramIcon className="size-5" /></span>
      </a>
    </div>
  )
}

function Ratings({ locale, className }: { locale: Locale; className?: string }) {
  const copy = homeCopy[locale]
  // These are the supplied platform ratings, not a calculated joint rating.
  return (
    <div className={cn("hp-ratings", className)}>
      {[
        { name: "Booksy", href: contact.bookingUrl, count: copy.booksyReviews },
        { name: "Google", href: contact.mapsUrl, count: copy.googleReviews },
      ].map((rating) => (
        <a key={rating.name} href={rating.href} target="_blank" rel="noopener noreferrer" className="hp-rating">
          <span className="hp-rating-score">5.0<span>/5</span></span>
          <span className="hp-rating-source"><strong>{rating.name}</strong><span>{rating.count}</span></span>
          <ArrowUpRight aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

function HomeHero({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  const t = ui[locale]
  const motion = editorialCopy[locale]
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const aliveRef = useRef(true)
  const decodingRef = useRef(new Set<number>())
  const [active, setActive] = useState(0)
  const [requested, setRequested] = useState(0)
  const [mounted, setMounted] = useState<number[]>([0])
  const [ready, setReady] = useState<number[]>([])
  const [failed, setFailed] = useState<number[]>([])
  const [userPaused, setUserPaused] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const [announcement, setAnnouncement] = useState("")
  const slide = copy.heroSlides[active]
  const total = Math.min(copy.heroSlides.length, heroPhotos.length)

  useEffect(() => {
    aliveRef.current = true
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateVisibility()
    document.addEventListener("visibilitychange", updateVisibility)
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: .12 },
    )
    if (heroRef.current) observer?.observe(heroRef.current)
    return () => {
      aliveRef.current = false
      observer?.disconnect()
      document.removeEventListener("visibilitychange", updateVisibility)
    }
  }, [])

  const markReady = useCallback((index: number, img: HTMLImageElement) => {
    if (!img.complete || img.naturalWidth === 0 || decodingRef.current.has(index)) return
    decodingRef.current.add(index)
    const finish = () => {
      decodingRef.current.delete(index)
      if (aliveRef.current && img.naturalWidth > 0) {
        setReady((current) => current.includes(index) ? current : [...current, index])
      }
    }
    if (typeof img.decode === "function") void img.decode().then(finish, finish)
    else finish()
  }, [])

  // Covers images already loaded from cache before the load handler was attached.
  useEffect(() => {
    heroRef.current?.querySelectorAll<HTMLImageElement>("[data-hero-photo] img").forEach((img) => {
      const index = Number(img.closest("[data-hero-photo]")?.getAttribute("data-hero-photo"))
      if (Number.isFinite(index)) markReady(index, img)
    })
  }, [mounted, markReady])

  useEffect(() => {
    if (ready.includes(requested)) setActive(requested)
  }, [ready, requested])

  const adjacent = useCallback((direction: number) => {
    for (let step = 1; step < total; step++) {
      const candidate = (active + direction * step + total * 2) % total
      if (!failed.includes(candidate)) return candidate
    }
    return active
  }, [active, failed, total])

  const prepare = useCallback((index: number) => {
    setMounted((current) => current.includes(index) ? current : [...current, index])
  }, [])

  const requestSlide = useCallback((index: number, manual = false) => {
    prepare(index)
    setRequested(index)
    if (manual) setAnnouncement(copy.heroSlides[index].title)
  }, [prepare, copy.heroSlides])

  const automatic = !reducedMotion && !userPaused && !focused && inView && pageVisible && requested === active

  useEffect(() => {
    if (!automatic || total < 2) return
    const next = adjacent(1)
    if (next === active) return
    const warm = window.setTimeout(() => prepare(next), 4300)
    const advance = window.setTimeout(() => requestSlide(next), 8000)
    return () => { window.clearTimeout(warm); window.clearTimeout(advance) }
  }, [automatic, active, total, adjacent, prepare, requestSlide])

  const longestWord = Math.max(...slide.title.split(/\s+/).map((word) => word.length))
  const titleStyle = { "--hp-word-factor": Math.min(10.5, Math.max(7.8, longestWord * .67)) } as CSSProperties
  const benefitsIcons = [Sparkles, ShieldCheck, MapPin]

  return (
    <>
      <div className="hp-opening">
        <section
          ref={heroRef}
          className="hp-hero"
          aria-labelledby="hp-hero-title"
          aria-roledescription={{ pl: "pokaz slajdów", en: "slideshow", de: "Diashow", uk: "слайд-шоу" }[locale]}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
          }}
        >
          <div className="hp-hero-images" aria-hidden="true">
            {mounted.map((index) => (
              <div
                key={index}
                data-hero-photo={index}
                className={cn("hp-hero-image", index === active && "is-active")}
                onLoadCapture={(event) => {
                  if (event.target instanceof HTMLImageElement) markReady(index, event.target)
                }}
                onErrorCapture={() => {
                  setFailed((current) => current.includes(index) ? current : [...current, index])
                  setRequested((current) => current === index ? active : current)
                }}
              >
                <Photo
                  id={heroPhotos[index].id}
                  priority={index === 0}
                  eager={index !== 0}
                  sizes="(min-width: 900px) 75vw, 100vw"
                  position={heroPhotos[index].position}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="hp-hero-shade" aria-hidden="true" />
          <div className="hp-shell hp-hero-inner">
            <div className="hp-hero-copy">
              <p className="hp-eyebrow hp-hero-eyebrow">{slide.label}</p>
              <h1 id="hp-hero-title" style={titleStyle}>{slide.title}</h1>
              <p className="hp-hero-description">{slide.text}</p>
              <div className="hp-hero-actions">
                <a href="#wycena" className="hp-button hp-button-primary">{t.nav.contact}<ArrowRight aria-hidden="true" /></a>
                <a href="#services" className="hp-button hp-button-secondary">{t.nav.services}<ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
            <div className="hp-hero-footer">
              <div className="hp-hero-tools">
                <SocialLinks locale={locale} label />
                <div className="hp-hero-controls">
                  <button type="button" className="hp-icon-button" aria-label={motion.previous} onClick={() => requestSlide(adjacent(-1), true)}><ArrowLeft aria-hidden="true" /></button>
                  <button
                    type="button"
                    className="hp-icon-button"
                    aria-label={userPaused || reducedMotion ? motion.play : motion.pause}
                    aria-pressed={userPaused || reducedMotion}
                    disabled={reducedMotion}
                    onClick={() => {
                      setUserPaused((current) => !current)
                      // An explicit resume is allowed even while the control keeps keyboard focus.
                      if (userPaused) setFocused(false)
                    }}
                  >{userPaused || reducedMotion ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button>
                  <button type="button" className="hp-icon-button" aria-label={motion.next} onClick={() => requestSlide(adjacent(1), true)}><ArrowRight aria-hidden="true" /></button>
                </div>
              </div>
              <Ratings locale={locale} className="hp-hero-ratings" />
            </div>
          </div>
          <p className="hp-sr-only" aria-live="polite">{announcement}</p>
        </section>
        <div className="hp-benefits">
          <div className="hp-shell hp-benefits-grid">
            {copy.benefits.map(([title, text], index) => {
              const Icon = benefitsIcons[index] ?? Sparkles
              return (
                <div key={title} className="hp-benefit">
                  <Icon aria-hidden="true" />
                  <div><h2>{title}</h2><p>{text}</p></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="hp-mobile-ratings hp-shell"><Ratings locale={locale} /></div>
    </>
  )
}

function serviceMenuIcon(slug: string, category: "myjnia" | "detailing") {
  const icons: Record<string, typeof Droplet> = {
    "mycie-zewnatrz": Droplet,
    "czyszczenie-wnetrza": Armchair,
    komplet: PackageCheck,
    "pranie-tapicerki": Waves,
    "czyszczenie-skor": Brush,
    woskowanie: Sparkles,
    polerowanie: CircleDot,
    "korekta-lakieru": WandSparkles,
    "powloka-ceramiczna": ShieldCheck,
    "folia-ppf": Layers3,
    "przyciemnianie-szyb-i-lamp": SunMedium,
    "zmiana-koloru-dechroming": Palette,
  }
  return icons[slug] ?? (category === "myjnia" ? Droplets : Gem)
}

function servicePhoto(slug: string): { id: PhotoId; position: string } {
  if (["czyszczenie-wnetrza", "pranie-tapicerki", "czyszczenie-skor"].includes(slug)) return { id: "p62", position: "50% 58%" }
  if (["folia-ppf", "zmiana-koloru-dechroming", "przyciemnianie-szyb-i-lamp"].includes(slug)) return { id: "p52", position: "55% 60%" }
  if (["korekta-lakieru", "polerowanie", "powloka-ceramiczna"].includes(slug)) return { id: "p39", position: "50% 55%" }
  return { id: "p29", position: "50% 58%" }
}

/** Keep the current photograph visible while the next one loads and decodes. */
function ServicePhoto({ photo }: { photo: { id: PhotoId; position: string } }) {
  const [visible, setVisible] = useState(photo.id)
  const [mounted, setMounted] = useState<Array<{ id: PhotoId; position: string }>>([photo])
  const [loaded, setLoaded] = useState<PhotoId[]>([])
  const wanted = useRef(photo.id)
  const alive = useRef(true)
  const host = useRef<HTMLDivElement>(null)
  wanted.current = photo.id

  useEffect(() => {
    alive.current = true
    return () => { alive.current = false }
  }, [])

  useEffect(() => {
    setMounted((current) => current.some((item) => item.id === photo.id) ? current : [...current, photo])
    if (loaded.includes(photo.id)) setVisible(photo.id)
  }, [photo.id, photo.position, loaded])

  const ready = useCallback((id: PhotoId, img: HTMLImageElement) => {
    if (!img.complete || !img.naturalWidth) return
    const finish = () => {
      if (!alive.current || !img.naturalWidth) return
      setLoaded((current) => current.includes(id) ? current : [...current, id])
      if (wanted.current === id) setVisible(id)
    }
    if (typeof img.decode === "function") void img.decode().then(finish, finish)
    else finish()
  }, [])

  useEffect(() => {
    host.current?.querySelectorAll<HTMLImageElement>("[data-service-photo] img").forEach((img) => {
      const id = img.closest("[data-service-photo]")?.getAttribute("data-service-photo") as PhotoId | null
      if (id) ready(id, img)
    })
  }, [mounted, ready])

  return (
    <div ref={host} className="hp-service-photo hp-photo-frame" aria-hidden="true">
      {mounted.map((item, index) => (
        <div
          key={item.id}
          data-service-photo={item.id}
          className={cn("hp-service-image", visible === item.id && "is-active")}
          onLoadCapture={(event) => {
            if (event.target instanceof HTMLImageElement) ready(item.id, event.target)
          }}
        >
          <Photo id={item.id} alt="" eager={index !== 0} sizes="(min-width: 1400px) 460px, (min-width: 900px) 35vw, 100vw" position={item.position} />
        </div>
      ))}
    </div>
  )
}

function HomeServices({ locale }: { locale: Locale }) {
  const copy = serviceExplorerCopy[locale]
  const [selectedSlug, setSelectedSlug] = useState(serviceConfigs[0]?.slug ?? "")
  const id = useId()
  const categories = ["myjnia", "detailing"] as const
  const selected = serviceConfigs.find((item) => item.slug === selectedSlug) ?? serviceConfigs[0]
  const summary = selected ? serviceSummary(locale, selected.slug) : null
  const titleFor = (item: (typeof serviceConfigs)[number]) => locale === "pl" ? item.navTitle : serviceSummary(locale, item.slug)?.title ?? item.navTitle
  const hrefFor = (slug: string) => locale === "pl" ? "/" + slug : routes[locale].services

  return (
    <section id="services" className="hp-section hp-services" aria-labelledby="hp-services-title">
      <div className="hp-shell">
        <header className="hp-section-head">
          <div><p className="hp-eyebrow">{copy.eyebrow}</p><h2 id="hp-services-title" className="hp-heading">{copy.title}</h2></div>
          <p className="hp-body">{homeCopy[locale].servicesIntro}</p>
        </header>
        <div className="hp-services-desktop">
          <div className="hp-service-groups">
            {categories.map((category) => {
              const items = serviceConfigs.filter((item) => item.category === category)
              if (!items.length) return null
              return (
                <div key={category} className="hp-service-group">
                  <h3>{category === "myjnia" ? copy.wash : copy.detailing}</h3>
                  <p className="hp-service-group-description">{category === "myjnia" ? copy.washDescription : copy.detailingDescription}</p>
                  <ul>
                    {items.map((item) => {
                      const Icon = serviceMenuIcon(item.slug, category)
                      const isActive = selected?.slug === item.slug
                      return (
                        <li key={item.slug}>
                          <button
                            type="button"
                            className={cn("hp-service-choice", isActive && "is-active")}
                            aria-pressed={isActive}
                            aria-controls={id + "-preview"}
                            onMouseEnter={() => setSelectedSlug(item.slug)}
                            onClick={() => setSelectedSlug(item.slug)}
                          >
                            <Icon aria-hidden="true" /><span>{titleFor(item)}</span><ArrowUpRight aria-hidden="true" className="hp-service-choice-arrow" />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
          {selected && (
            <div id={id + "-preview"} className="hp-service-preview">
              <ServicePhoto photo={servicePhoto(selected.slug)} />
              <div className="hp-service-preview-copy">
                <p className="hp-caption">{selected.category === "myjnia" ? copy.wash : copy.detailing}</p>
                <h3>{titleFor(selected)}</h3>
                <p className="hp-body">{summary?.text ?? serviceGroupCopy[locale][selected.category]}</p>
                <Link prefetch={false} href={hrefFor(selected.slug)} className="hp-link">{copy.details}<ArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
          )}
        </div>
        <div className="hp-services-mobile">
          {categories.map((category) => {
            const items = serviceConfigs.filter((item) => item.category === category)
            if (!items.length) return null
            return (
              <div key={category} className="hp-service-group">
                <h3>{category === "myjnia" ? copy.wash : copy.detailing}</h3>
                <p className="hp-service-group-description">{category === "myjnia" ? copy.washDescription : copy.detailingDescription}</p>
                <div>
                  {items.map((item) => {
                    const Icon = serviceMenuIcon(item.slug, category)
                    return (
                      <details key={item.slug} name={id + "-" + category} className="hp-service-detail">
                        <summary><Icon aria-hidden="true" /><span>{titleFor(item)}</span><ChevronDown aria-hidden="true" /></summary>
                        <div className="hp-service-detail-body">
                          <p className="hp-body">{serviceSummary(locale, item.slug)?.text ?? serviceGroupCopy[locale][category]}</p>
                          <Link prefetch={false} href={hrefFor(item.slug)} className="hp-link">{copy.details}<ArrowRight aria-hidden="true" /></Link>
                        </div>
                      </details>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div className="hp-services-footer">
          <Link prefetch={false} href={routes[locale].services} className="hp-link">{copy.allServices}<ArrowRight aria-hidden="true" /></Link>
          <Link prefetch={false} href={routes[locale].pricing} className="hp-link">{copy.pricing}<ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
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


function HomePortfolio({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const projects: Array<{ id: PhotoId; position: string }> = [
    { id: "p21", position: "50% 58%" },
    { id: "p62", position: "50% 58%" },
    { id: "p39", position: "50% 55%" },
  ]

  return (
    <section className="hp-section hp-portfolio" aria-labelledby="hp-portfolio-title">
      <div className="hp-shell">
        <header className="hp-section-head">
          <div>
            <p className="hp-eyebrow">{t.nav.gallery}</p>
            <h2 id="hp-portfolio-title" className="hp-heading">{src.home.projectsTitle}</h2>
          </div>
          <div>
            <p className="hp-body">{src.home.projectsText}</p>
            <Link prefetch={false} href={routes[locale].gallery} className="hp-link">
              {t.allPhotos}<ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </header>

        <div className="hp-portfolio-grid">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              prefetch={false}
              href={routes[locale].gallery}
              aria-label={`${t.allPhotos} ${index + 1}`}
              className={`hp-photo-frame hp-portfolio-photo hp-portfolio-photo-${index + 1}`}
            >
              <Photo
                id={project.id}
                sizes={index === 0 ? "(min-width: 1400px) 700px, (min-width: 900px) 54vw, 100vw" : "(min-width: 1400px) 540px, (min-width: 900px) 41vw, 100vw"}
                position={project.position}
              />
              <span className="hp-portfolio-open" aria-hidden="true"><ArrowUpRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeCare({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]

  return (
    <section className="hp-section hp-care" aria-labelledby="hp-care-title">
      <div className="hp-shell">
        <header className="hp-section-head">
          <div>
            <p className="hp-eyebrow">{copy.whyLabel}</p>
            <h2 id="hp-care-title" className="hp-heading">{editorialCopy[locale].why}</h2>
          </div>
          <div>
            <p className="hp-body">{copy.whyIntro}</p>
            <Link prefetch={false} href={routes[locale].about} className="hp-link">
              {ui[locale].nav.about}<ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </header>

        <ol className="hp-care-steps">
          {careSteps[locale].map(([title, text]) => (
            <li key={title} className="hp-care-step">
              <span className="hp-care-mark" aria-hidden="true" />
              <h3>{title}</h3>
              <p className="hp-body">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function HomePackages({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const sale = salesPackageCopy[locale]
  const currency = locale === "pl" ? "zł" : "PLN"
  const offers = [
    { title: sale.standard, price: 1000, items: sale.standardItems },
    { title: sale.premium, price: 1400, items: sale.premiumItems },
  ]

  return (
    <section className="hp-section hp-packages" aria-labelledby="hp-packages-title">
      <div className="hp-shell">
        <header className="hp-section-head">
          <div>
            <p className="hp-eyebrow">{t.pricing}</p>
            <h2 id="hp-packages-title" className="hp-heading">{src.home.packagesTitle}</h2>
          </div>
          <div className="hp-packages-header-link">
            <Link prefetch={false} href={routes[locale].pricing} className="hp-link">
              {{ pl: "Pełny cennik", en: "Full price list", de: "Vollständige Preisliste", uk: "Повний прайс" }[locale]}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </header>

        <div className="hp-packages-grid">
          {[1, 0, 2].map((index) => {
            const pkg = src.pricing.packages[index]
            if (!pkg) return null
            const featured = Boolean(pkg.popular)
            const priceMatches = pkg.price?.match(/\d[\d \u00a0]*(?:[.,]\d{1,2})?\s*(?:zł|PLN)/gi) ?? []
            const advertisedPrice = priceMatches.length === 1
              ? Number(priceMatches[0].replace(/(?:zł|PLN)/i, "").replace(/[\s\u00a0]/g, "").replace(",", "."))
              : null
            const showComparison = featured && advertisedPrice !== null && advertisedPrice < 240

            return (
              <article key={pkg.title} className={`hp-package${featured ? " hp-package-featured" : ""}`}>
                <div className="hp-package-intro">
                  {pkg.popular && <p className="hp-package-popular">{pkg.popular}</p>}
                  <h3>{pkg.title}</h3>
                  <p className="hp-body">{pkg.tagline}</p>
                </div>
                <div className="hp-package-scope">
                  <p className="hp-package-scope-label">{editorialCopy[locale].scope}</p>
                  <ul>{pkg.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  {pkg.discount && <p className="hp-package-discount">{pkg.discount}</p>}
                </div>
                <div className="hp-package-bottom">
                  {showComparison && (
                    <div className="hp-package-comparison">
                      <p>{packageSaleCopy[locale].title}</p>
                      <span>{packageSaleCopy[locale].without} <s>240 {currency}</s></span>
                      <strong className="hp-package-saving">
                        {{ pl: "Taniej o", en: "Save", de: "Sie sparen", uk: "Економія" }[locale]} {240 - (advertisedPrice ?? 240)} {currency}
                      </strong>
                    </div>
                  )}
                  <p className="hp-package-price">{pkg.price?.replace(/(\d)\s*(zł|PLN)/g, "$1 $2")}</p>
                  {pkg.note && <p className="hp-package-note">{pkg.note}</p>}
                </div>
              </article>
            )
          })}
        </div>

        <div className="hp-packages-notes">
          <p>* {src.pricing.packagesNote}</p>
          <p>{packageSaleCopy[locale].sizeNote}</p>
        </div>

        <div id="pakiet-sprzedaz" className="hp-sales" aria-labelledby="hp-sales-title">
          <div className="hp-sales-intro">
            <p className="hp-eyebrow">{sale.label}</p>
            <h3 id="hp-sales-title">{sale.title}</h3>
            <p className="hp-body">{sale.intro}</p>
            <Link prefetch={false} href={routes[locale].pricing} className="hp-link">
              {sale.details}<ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="hp-sales-offers">
            {offers.map((offer) => (
              <article key={offer.title} className="hp-sales-offer">
                <h4>{offer.title}</h4>
                <ul>{offer.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="hp-sales-price-line">
                  <p className="hp-package-price">{sale.from} {offer.price} {currency}</p>
                  <p className="hp-sales-time"><Clock3 aria-hidden="true" />{sale.time}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeTeam({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = homeCopy[locale]
  const title = src.home.teamTitle ?? copy.teamTitle
  const teaser = copy.teamBody.split(/\r?\n\s*\r?\n/)[0].trim()

  return (
    <section className="hp-section hp-team" aria-labelledby="hp-team-title">
      <div className="hp-shell hp-team-layout">
        <figure className="hp-team-figure">
          <div className="hp-photo-frame hp-team-photo">
            <Photo id="team" sizes="(min-width: 1400px) 560px, (min-width: 900px) 42vw, 100vw" position="50% 52.4%" />
          </div>
          <figcaption className="hp-caption">BORUCH Myjnia Szczecin</figcaption>
        </figure>
        <div className="hp-team-copy">
          <p className="hp-eyebrow">{t.nav.about}</p>
          <h2 id="hp-team-title" className="hp-heading">{title}</h2>
          {copy.teamTitle !== title && <p className="hp-team-lead">{copy.teamTitle}</p>}
          <p className="hp-body hp-team-teaser">{teaser}</p>
          <p className={`hp-team-signature ${signatureFont.className}`}>{src.home.author}</p>
          <div className="hp-team-links">
            <Link prefetch={false} href={routes[locale].about} className="hp-link">
              {t.nav.about}<ArrowUpRight aria-hidden="true" />
            </Link>
            <SocialLinks locale={locale} />
          </div>
        </div>
      </div>
    </section>
  )
}


type HomeReviewCardProps = {
  review: VerifiedReview
  locale: Locale
  isActive: boolean
  isInteractive: boolean
  onOpen: (opener: HTMLButtonElement) => void
}

function HomeReviewCard({ review, locale, isActive, isInteractive, onOpen }: HomeReviewCardProps) {
  const textRef = useRef<HTMLQuoteElement>(null)
  const [isTruncated, setIsTruncated] = useState(review.text.length > 180)

  useEffect(() => {
    if (!isActive) return
    const text = textRef.current
    if (!text) return
    let cancelled = false
    let frame = 0
    const measure = () => {
      if (cancelled) return
      setIsTruncated(text.scrollHeight > text.clientHeight + 1)
    }
    const scheduleMeasure = () => {
      if (cancelled) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    scheduleMeasure()
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMeasure)
    observer?.observe(text)
    if (!observer) window.addEventListener("resize", scheduleMeasure)
    void document.fonts?.ready.then(scheduleMeasure)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer?.disconnect()
      if (!observer) window.removeEventListener("resize", scheduleMeasure)
    }
  }, [isActive, review.text])

  return (
    <figure className="hp-review-card">
      <div className="hp-review-card-top">
        <span className="hp-review-stars" role="img" aria-label="5 / 5">
          {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}
        </span>
        <span className="hp-review-source">{review.source}</span>
      </div>
      <div className="hp-review-quote-wrap">
        <blockquote ref={textRef} lang="pl" className="hp-review-quote">„{review.text}”</blockquote>
        {isTruncated && (
          <button
            type="button"
            className="hp-review-more hp-link"
            tabIndex={isInteractive ? 0 : -1}
            aria-haspopup="dialog"
            onClick={(event) => onOpen(event.currentTarget)}
          >
            {reviewDialogCopy[locale].more}
            <ArrowRight aria-hidden="true" />
            <span className="hp-sr-only">: {review.name}</span>
          </button>
        )}
      </div>
      <figcaption className="hp-review-author">
        <strong lang="pl">{review.name}</strong>
        <span>{review.source} / BORUCH Myjnia Szczecin</span>
      </figcaption>
    </figure>
  )
}

function HomeReviews({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const backdropPointerRef = useRef(false)
  const [carouselReady, setCarouselReady] = useState(false)
  const [activeReview, setActiveReview] = useState(0)
  const [focusedReview, setFocusedReview] = useState<number | null>(null)
  const [selectedReview, setSelectedReview] = useState<VerifiedReview | null>(null)
  const dialogId = useId()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: carouselReady,
    align: "center",
    loop: true,
    skipSnaps: false,
    duration: reducedMotion ? 0 : 32,
    watchDrag: (_api, event) => {
      const target = event.target
      return !(target instanceof Element && target.closest("button, a, input, textarea, select"))
    },
  })
  const carouselDescription = { pl: "karuzela opinii", en: "reviews carousel", de: "Bewertungskarussell", uk: "карусель відгуків" }[locale]

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === "undefined") {
      setCarouselReady(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setCarouselReady(true)
      observer.disconnect()
    }, { rootMargin: "300px 0px" })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    const update = () => setActiveReview(emblaApi.selectedScrollSnap())
    update()
    emblaApi.on("select", update)
    emblaApi.on("reInit", update)
    return () => {
      emblaApi.off("select", update)
      emblaApi.off("reInit", update)
    }
  }, [emblaApi])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !selectedReview) return
    const body = document.body
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`
    }
    body.style.overflow = "hidden"
    dialog.scrollTop = 0
    if (!dialog.open) dialog.showModal()
    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [selectedReview])

  const closeReview = useCallback(() => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
    else setSelectedReview(null)
  }, [])

  const onDialogClosed = useCallback(() => {
    backdropPointerRef.current = false
    setSelectedReview(null)
    const opener = openerRef.current
    requestAnimationFrame(() => {
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    })
  }, [])

  return (
    <section ref={sectionRef} className="hp-section hp-reviews" aria-labelledby="hp-reviews-title">
      <div className="hp-shell">
        <div className="hp-section-head">
          <div>
            <p className="hp-eyebrow">{copy.reviewsLabel}</p>
            <h2 id="hp-reviews-title" className="hp-heading">{copy.reviewsTitle}</h2>
          </div>
          <p className="hp-body">{copy.reviewsIntro}</p>
        </div>

        <div
          ref={carouselReady ? emblaRef : undefined}
          className="hp-reviews-viewport"
          role="region"
          aria-roledescription={carouselDescription}
          aria-label={copy.reviewsLabel}
        >
          <div className="hp-reviews-track">
            {copy.reviews.map((review, index) => {
              const isActive = index === activeReview
              const isInteractive = isActive || focusedReview === index
              return (
                <div
                  key={`${review.source}-${review.name}`}
                  className={cn("hp-review-slide", isActive && "is-active")}
                  inert={!isInteractive}
                  aria-hidden={!isInteractive}
                  onFocusCapture={() => setFocusedReview(index)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setFocusedReview((current) => current === index ? null : current)
                    }
                  }}
                >
                  <HomeReviewCard
                    review={review}
                    locale={locale}
                    isActive={isActive}
                    isInteractive={isInteractive}
                    onOpen={(opener) => {
                      openerRef.current = opener
                      setSelectedReview(review)
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="hp-review-controls">
          <button type="button" className="hp-icon-button" disabled={!emblaApi} aria-label={reviewControls[locale].previous} onClick={() => emblaApi?.scrollPrev(reducedMotion)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <span className="hp-review-indicator" aria-hidden="true"><span /><span /><span /></span>
          <button type="button" className="hp-icon-button" disabled={!emblaApi} aria-label={reviewControls[locale].next} onClick={() => emblaApi?.scrollNext(reducedMotion)}>
            <ArrowRight aria-hidden="true" />
          </button>
          <p className="hp-sr-only" aria-live="polite" aria-atomic="true">{copy.reviews[activeReview]?.name}, {copy.reviews[activeReview]?.source}</p>
        </div>
        <Ratings locale={locale} className="hp-reviews-ratings" />
      </div>

      <dialog
        ref={dialogRef}
        className="hp-review-dialog"
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={`${dialogId}-text`}
        onClose={onDialogClosed}
        onCancel={(event) => { event.preventDefault(); closeReview() }}
        onPointerDown={(event) => {
          const box = event.currentTarget.getBoundingClientRect()
          backdropPointerRef.current = event.target === event.currentTarget && (
            event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom
          )
        }}
        onPointerUp={(event) => {
          const startedOutside = backdropPointerRef.current
          backdropPointerRef.current = false
          if (!startedOutside || event.target !== event.currentTarget) return
          const box = event.currentTarget.getBoundingClientRect()
          if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeReview()
        }}
        onPointerCancel={() => { backdropPointerRef.current = false }}
      >
        {selectedReview && (
          <div className="hp-review-dialog-body">
            <button autoFocus type="button" className="hp-icon-button hp-review-dialog-close" aria-label={reviewDialogCopy[locale].close} onClick={closeReview}><X aria-hidden="true" /></button>
            <div className="hp-review-stars" role="img" aria-label="5 / 5">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}
            </div>
            <p className="hp-review-dialog-label">{reviewDialogCopy[locale].label} - {selectedReview.source}</p>
            <h3 id={`${dialogId}-title`} lang="pl">{selectedReview.name}</h3>
            <Quote className="hp-review-dialog-mark" aria-hidden="true" />
            <blockquote id={`${dialogId}-text`} lang="pl">„{selectedReview.text}”</blockquote>
            <button type="button" className="hp-link hp-review-dialog-bottom-close" onClick={closeReview}>{reviewDialogCopy[locale].close}<X aria-hidden="true" /></button>
          </div>
        )}
      </dialog>
    </section>
  )
}



function HomeFaq({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  const [expanded, setExpanded] = useState(false)
  const id = useId()
  const labels = {
    pl: { more: "Więcej pytań", less: "Pokaż mniej" },
    en: { more: "More questions", less: "Show less" },
    de: { more: "Weitere Fragen", less: "Weniger anzeigen" },
    uk: { more: "Більше запитань", less: "Показати менше" },
  }[locale]

  return (
    <section className="hp-section hp-faq" aria-labelledby="hp-faq-title">
      <div className="hp-shell hp-faq-layout">
        <div>
          <p className="hp-eyebrow">{copy.faqLabel}</p>
          <h2 id="hp-faq-title" className="hp-heading">{copy.faqTitle}</h2>
          <p className="hp-body">{copy.faqIntro}</p>
        </div>
        <div>
          <div id={id + "-questions"} className="hp-faq-list">
            {copy.faq.map(([question, answer], index) => (
              <details key={question} name={id + "-faq"} hidden={!expanded && index >= 4}>
                <summary><span>{question}</span><ChevronDown aria-hidden="true" /></summary>
                <p className="hp-body">{answer}</p>
              </details>
            ))}
          </div>
          {copy.faq.length > 4 && (
            <button type="button" className="hp-link hp-faq-more" aria-expanded={expanded} aria-controls={id + "-questions"} onClick={() => setExpanded((current) => !current)}>
              {expanded ? labels.less : labels.more}<ChevronDown className={expanded ? "is-expanded" : ""} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function HomeLocation({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const labels = {
    pl: { title: "W centrum Szczecina.", label: "Lokalizacja", level: "Poziom parkingu" },
    en: { title: "In central Szczecin.", label: "Location", level: "Parking level" },
    de: { title: "Im Zentrum von Stettin.", label: "Standort", level: "Parkebene" },
    uk: { title: "У центрі Щецина.", label: "Розташування", level: "Рівень паркінгу" },
  }[locale]

  return (
    <section className="hp-section hp-location" aria-labelledby="hp-location-title">
      <div className="hp-shell hp-location-layout">
        <div>
          <p className="hp-eyebrow">{labels.label}</p>
          <h2 id="hp-location-title" className="hp-heading">{labels.title}</h2>
          <p className="hp-body">{homeCopy[locale].routeHint}</p>
          <div className="hp-location-information">
            <div className="hp-location-level"><span className="hp-caption">{labels.level}</span><strong>-2 <span>PAZIM</span></strong></div>
            <address>{src.address.lines.map((line) => <span key={line}>{line}</span>)}</address>
          </div>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={openPreferredMaps} className="hp-link">
            {mapOpenCopy[locale]}<ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="hp-location-map"><BoruchGoogleMap /></div>
      </div>
    </section>
  )
}

function HomeContact({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  return (
    <section id="wycena" className="hp-section hp-contact" aria-labelledby="hp-contact-title">
      <div className="hp-shell">
        <header className="hp-section-head">
          <div><p className="hp-eyebrow">{copy.contactLabel}</p><h2 id="hp-contact-title" className="hp-heading">{editorialCopy[locale].talk}</h2></div>
          <p className="hp-body">{copy.contactIntro}</p>
        </header>
        <div className="hp-contact-layout">
          <div className="hp-contact-direct">
            <p className="hp-contact-prompt">{copy.contactDirect}</p>
            <a href={contact.phoneHref} className="hp-contact-phone"><Phone aria-hidden="true" />{contact.phone}</a>
            <a href={"mailto:" + contact.email} className="hp-contact-email"><Mail aria-hidden="true" /><span>{contact.email}</span></a>
            <p className="hp-body">{copy.contactBooksy}</p>
            <SocialLinks locale={locale} label />
          </div>
          <div className="hp-contact-form"><HomeContactForm locale={locale} /></div>
        </div>
      </div>
    </section>
  )
}

function HomeFooter({ locale }: { locale: Locale }) {
  return <SiteFooter locale={locale} alternates={Object.fromEntries(localeOrder.map(code => [code, routes[code].home])) as Record<Locale, string>} showContactCta={false} />
}

const homeStyles = `
/* Scoped layout: no global resets or changes to shared header/footer/forms. */
.hp-rebuild {
  --hp-bg: #09090b;
  --hp-surface: #111113;
  --hp-ink: #f5f2ed;
  --hp-muted: #b7b5b3;
  --hp-accent: #df3039;
  --hp-line: rgb(245 242 237 / .14);
  --hp-ease: cubic-bezier(.22, .7, .22, 1);
  min-height: 100dvh;
  background: var(--hp-bg);
  color: var(--hp-ink);
}
.hp-rebuild .hp-main { padding-top: var(--header-h, 96px); outline: none; }
.hp-rebuild .hp-main *, .hp-rebuild .hp-main *::before, .hp-rebuild .hp-main *::after { box-sizing: border-box; }
.hp-rebuild .hp-main :is(h1,h2,h3,h4,p,figure,blockquote) { text-transform: none; }
.hp-rebuild .hp-main :is(h1,h2,h3,h4) { text-wrap: pretty; overflow-wrap: anywhere; }
.hp-rebuild .hp-main :is(a,button,summary):focus-visible { outline: 2px solid var(--hp-ink); outline-offset: 5px; }
.hp-rebuild .hp-main :is(a,button) { -webkit-tap-highlight-color: transparent; }
.hp-rebuild .hp-shell { width: calc(100% - 96px); max-width: 1320px; margin-inline: auto; min-width: 0; }
.hp-rebuild .hp-section { padding-block: clamp(60px, 6.5vw, 100px); }
.hp-rebuild :is(#services,#wycena,#pakiet-sprzedaz,#hp-reviews-title) { scroll-margin-top: calc(var(--header-h, 96px) + 24px); }
.hp-rebuild .hp-section-head {
  display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr);
  align-items: end; gap: 48px; margin: 0 0 40px;
}
.hp-rebuild .hp-section-head > *, .hp-rebuild .hp-faq-layout > *, .hp-rebuild .hp-location-layout > *, .hp-rebuild .hp-contact-layout > * { min-width: 0; }
.hp-rebuild .hp-eyebrow {
  display: flex; align-items: center; gap: 12px; margin: 0 0 20px;
  color: var(--hp-muted); font-size: 11px; font-weight: 600; line-height: 1.7;
  letter-spacing: .13em; text-transform: uppercase !important;
}
.hp-rebuild .hp-eyebrow::before { content: ""; flex: 0 0 25px; height: 1px; background: var(--hp-accent); }
.hp-rebuild .hp-heading {
  margin: 0; max-width: 24ch; color: var(--hp-ink);
  font-size: clamp(30px, 3.3vw, 46px); font-weight: 500;
  line-height: 1.24; letter-spacing: -.018em;
}
.hp-rebuild .hp-body { margin: 0; color: var(--hp-muted); font-size: 16px; line-height: 1.85; text-wrap: pretty; overflow-wrap: anywhere; }
.hp-rebuild .hp-caption { color: var(--hp-muted); font-size: 11px; font-weight: 500; line-height: 1.7; letter-spacing: .08em; }
.hp-rebuild .hp-link {
  display: inline-flex; width: fit-content; min-height: 44px; align-items: center; gap: 12px;
  margin-top: 20px; padding: 2px 0; border: 0; background: transparent;
  color: var(--hp-ink); font: inherit; font-size: 14px; font-weight: 500; line-height: 1.5;
  letter-spacing: normal; text-align: left; text-decoration: none; cursor: pointer;
  transition: color 180ms ease;
}
.hp-rebuild .hp-link svg { flex: 0 0 17px; width: 17px; height: 17px; color: var(--hp-accent); transition: transform 220ms var(--hp-ease); }
.hp-rebuild .hp-link:hover { color: #f0787f; }
.hp-rebuild .hp-link:hover svg { transform: translateX(3px); }
.hp-rebuild .hp-icon-button {
  display: inline-grid; flex: 0 0 44px; width: 44px; height: 44px; padding: 0; place-items: center;
  border: 1px solid var(--hp-line); border-radius: 0; background: transparent;
  color: var(--hp-ink); cursor: pointer; transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease;
}
.hp-rebuild .hp-icon-button svg { width: 18px; height: 18px; }
.hp-rebuild .hp-icon-button:hover { border-color: #f0787f; color: #f0787f; background: rgb(255 255 255 / .03); }
.hp-rebuild .hp-icon-button:disabled { opacity: .4; cursor: default; }
.hp-rebuild .hp-button {
  display: inline-flex; align-items: center; justify-content: center; min-height: 52px; gap: 26px;
  padding: 14px 23px; border: 1px solid var(--hp-line); border-radius: 0;
  font-size: 13px; line-height: 1.5; font-weight: 600; text-decoration: none;
  transition: background-color 180ms ease, border-color 180ms ease;
}
.hp-rebuild .hp-button svg { width: 18px; height: 18px; flex-shrink: 0; }
.hp-rebuild .hp-button-primary { background: #c42730; border-color: #c42730; color: #fff; }
.hp-rebuild .hp-button-primary:hover { background: #ad2029; border-color: #ad2029; }
.hp-rebuild .hp-button-secondary { background: rgb(9 9 11 / .7); color: var(--hp-ink); }
.hp-rebuild .hp-button-secondary:hover { background: #1c1c1f; border-color: rgb(255 255 255 / .4); }
.hp-rebuild .hp-skip {
  position: fixed; z-index: 10000; top: 12px; left: 12px; transform: translateY(-150%);
  padding: 12px 18px; background: #c42730; color: white; text-decoration: none; font-size: 14px;
}
.hp-rebuild .hp-skip:focus { transform: none; }
.hp-rebuild .hp-sr-only {
  position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
.hp-rebuild .hp-photo-frame { position: relative; overflow: hidden; background: #17171a; clip-path: polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px)); }
.hp-rebuild .hp-photo-frame img { transition: transform 650ms var(--hp-ease); }
@media (hover: hover) {
  .hp-rebuild a.hp-photo-frame:hover img { transform: scale(1.025); }
}
/* Opening screen: dark left reading area, generous photography on the right. */
.hp-rebuild .hp-opening { display: flex; flex-direction: column; min-height: calc(100svh - var(--header-h, 96px)); }
.hp-rebuild .hp-hero { position: relative; display: flex; flex: 1; min-height: min(640px, calc(100svh - var(--header-h, 96px) - 120px)); overflow: hidden; background: #09090b; isolation: isolate; }
.hp-rebuild .hp-hero-images { position: absolute; z-index: -2; inset: 0 0 0 24%; }
.hp-rebuild .hp-hero-image { position: absolute; inset: 0; opacity: 0; transition: opacity 800ms var(--hp-ease); }
.hp-rebuild .hp-hero-image.is-active { opacity: 1; }
.hp-rebuild .hp-hero-shade {
  position: absolute; z-index: -1; inset: 0; pointer-events: none;
  background: linear-gradient(90deg,#09090b 0%,rgb(9 9 11 / .94) 19%,rgb(9 9 11 / .65) 42%,rgb(9 9 11 / .14) 75%),linear-gradient(0deg,rgb(9 9 11 / .7),transparent 35%);
}
.hp-rebuild .hp-hero-inner { display: flex; flex-direction: column; justify-content: space-between; gap: 48px; padding-block: clamp(56px, 7vh, 96px) 32px; }
.hp-rebuild .hp-hero-copy { max-width: 760px; margin-block: auto; }
.hp-rebuild .hp-hero-eyebrow { color: #ef8a90; }
.hp-rebuild .hp-hero h1 { margin: 0; max-width: 18ch; color: var(--hp-ink); font-size: clamp(52px, 5.7vw, 84px); font-weight: 600; letter-spacing: -.025em; line-height: 1.14; }
.hp-rebuild .hp-hero-description { max-width: 47ch; margin: 26px 0 0; color: #d1cecb; font-size: 17px; line-height: 1.8; text-wrap: pretty; }
.hp-rebuild .hp-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.hp-rebuild .hp-hero-footer { display: flex; align-items: end; justify-content: space-between; gap: 32px; }
.hp-rebuild .hp-hero-tools { display: flex; align-items: center; flex-wrap: wrap; gap: 24px; }
.hp-rebuild .hp-socials { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.hp-rebuild .hp-socials > .hp-caption { margin-right: 9px; }
.hp-rebuild .hp-socials .hp-icon-button { border-color: transparent; }
.hp-rebuild .hp-socials .hp-icon-button:hover { border-color: var(--hp-line); }
.hp-rebuild .hp-hero-controls { display: flex; gap: 6px; }
.hp-rebuild .hp-ratings { display: flex; align-items: center; justify-content: center; gap: 32px; }
.hp-rebuild .hp-rating { display: flex; align-items: center; gap: 12px; min-height: 56px; color: var(--hp-ink); text-decoration: none; }
.hp-rebuild .hp-rating-score { color: #8ad4b5; font-size: 25px; font-weight: 500; letter-spacing: .015em; white-space: nowrap; }
.hp-rebuild .hp-rating-score > span { padding-left: 2px; font-size: 15px; color: #b1d8c8; }
.hp-rebuild .hp-rating-source { display: grid; gap: 4px; }
.hp-rebuild .hp-rating-source strong { font-size: 12px; line-height: 1.4; font-weight: 600; }
.hp-rebuild .hp-rating-source > span { font-size: 11px; color: var(--hp-muted); line-height: 1.5; }
.hp-rebuild .hp-rating > svg { width: 14px; height: 14px; color: var(--hp-accent); }
.hp-rebuild .hp-rating:hover .hp-rating-source strong { text-decoration: underline; text-underline-offset: 5px; }
.hp-rebuild .hp-benefits { border-block: 1px solid var(--hp-line); background: var(--hp-surface); }
.hp-rebuild .hp-benefits-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); }
.hp-rebuild .hp-benefit { display: flex; min-width: 0; align-items: center; gap: 17px; padding: 22px 24px; }
.hp-rebuild .hp-benefit:first-child { padding-left: 0; }
.hp-rebuild .hp-benefit:last-child { padding-right: 0; }
.hp-rebuild .hp-benefit + .hp-benefit { border-left: 1px solid var(--hp-line); }
.hp-rebuild .hp-benefit > svg { width: 19px; height: 19px; flex: 0 0 19px; color: var(--hp-accent); }
.hp-rebuild .hp-benefit h2 { margin: 0 0 5px; font-size: 13px; font-weight: 600; line-height: 1.6; letter-spacing: .015em; }
.hp-rebuild .hp-benefit p { margin: 0; color: var(--hp-muted); font-size: 12px; line-height: 1.65; text-wrap: pretty; }
.hp-rebuild .hp-mobile-ratings { display: none; }
/* Services: two compact directories and a genuinely useful photograph/description preview. */
.hp-rebuild .hp-services { background: var(--hp-surface); }
.hp-rebuild .hp-services-desktop { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(0,.75fr); gap: 48px; align-items: start; }
.hp-rebuild .hp-service-groups { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 30px; }
.hp-rebuild .hp-service-group { min-width: 0; }
.hp-rebuild .hp-service-group h3 { margin: 0 0 10px; font-size: 24px; font-weight: 500; line-height: 1.3; letter-spacing: -.01em; }
.hp-rebuild .hp-service-group-description { min-height: 65px; margin: 0 0 20px; color: var(--hp-muted); font-size: 13px; line-height: 1.75; }
.hp-rebuild .hp-service-group ul { padding: 0; margin: 0; border-top: 1px solid var(--hp-line); list-style: none; }
.hp-rebuild .hp-service-choice {
  position: relative; display: flex; align-items: center; gap: 12px; width: 100%; min-height: 70px;
  padding: 14px 4px; border: 0; border-bottom: 1px solid var(--hp-line); background: transparent;
  color: #cccac7; font: inherit; font-size: 14px; font-weight: 500; line-height: 1.5; text-align: left; cursor: pointer;
  transition: color 180ms ease, background-color 180ms ease;
}
.hp-rebuild .hp-service-choice > svg:first-child { flex: 0 0 18px; width: 18px; height: 18px; color: var(--hp-accent); }
.hp-rebuild .hp-service-choice > span { min-width: 0; flex: 1; overflow-wrap: anywhere; }
.hp-rebuild .hp-service-choice-arrow { flex: 0 0 14px; width: 14px; height: 14px; opacity: .35; }
.hp-rebuild .hp-service-choice:is(:hover,:focus-visible,.is-active) { color: var(--hp-ink); background: rgb(255 255 255 / .035); }
.hp-rebuild .hp-service-choice.is-active::before { content: ""; position: absolute; left: -10px; top: 24px; bottom: 24px; width: 2px; background: var(--hp-accent); }
.hp-rebuild .hp-service-choice.is-active .hp-service-choice-arrow { opacity: 1; color: var(--hp-accent); }
.hp-rebuild .hp-service-preview { min-width: 0; }
.hp-rebuild .hp-service-photo { aspect-ratio: 4 / 3; }
.hp-rebuild .hp-service-image { position: absolute; inset: 0; opacity: 0; transition: opacity 550ms var(--hp-ease); }
.hp-rebuild .hp-service-image.is-active { opacity: 1; }
.hp-rebuild .hp-service-preview-copy { padding-top: 22px; }
.hp-rebuild .hp-service-preview-copy > .hp-caption { margin: 0 0 9px; }
.hp-rebuild .hp-service-preview h3 { margin: 0 0 12px; font-size: 25px; font-weight: 500; line-height: 1.35; }
.hp-rebuild .hp-service-preview .hp-body { font-size: 14px; line-height: 1.8; }
.hp-rebuild .hp-services-footer { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 32px; padding-top: 24px; }
.hp-rebuild .hp-services-mobile { display: none; }
/* Practical information and a single, calm contact finale. */
.hp-rebuild .hp-faq { background: var(--hp-surface); border-block: 1px solid var(--hp-line); }
.hp-rebuild .hp-faq-layout { display: grid; grid-template-columns: minmax(0,.9fr) minmax(0,1.4fr); gap: 80px; }
.hp-rebuild .hp-faq-layout > div:first-child .hp-body { margin-top: 24px; max-width: 42ch; }
.hp-rebuild .hp-faq-list { border-top: 1px solid var(--hp-line); }
.hp-rebuild .hp-faq-list details { border-bottom: 1px solid var(--hp-line); }
.hp-rebuild :is(.hp-faq-list,.hp-service-detail) summary { display: flex; align-items: center; gap: 18px; min-height: 70px; padding-block: 20px; list-style: none; cursor: pointer; }
.hp-rebuild :is(.hp-faq-list,.hp-service-detail) summary::-webkit-details-marker { display: none; }
.hp-rebuild :is(.hp-faq-list,.hp-service-detail) summary > span { min-width: 0; flex: 1; font-size: 16px; line-height: 1.6; }
.hp-rebuild :is(.hp-faq-list,.hp-service-detail) summary > svg:last-child { width: 18px; height: 18px; flex: 0 0 18px; color: var(--hp-accent); transition: transform 220ms var(--hp-ease); }
.hp-rebuild :is(.hp-faq-list details[open],.hp-service-detail[open]) summary > svg:last-child { transform: rotate(180deg); }
.hp-rebuild .hp-faq-list details > .hp-body { padding: 0 34px 26px 0; font-size: 15px; }
.hp-rebuild .hp-faq-more .is-expanded { transform: rotate(180deg); }
.hp-rebuild .hp-location-layout { display: grid; grid-template-columns: minmax(0,.8fr) minmax(0,1.2fr); align-items: center; gap: 64px; }
.hp-rebuild .hp-location .hp-body { max-width: 42ch; margin-top: 20px; }
.hp-rebuild .hp-location-information { display: flex; flex-wrap: wrap; align-items: center; gap: 28px; margin-top: 26px; }
.hp-rebuild .hp-location-level { display: grid; gap: 10px; }
.hp-rebuild .hp-location-level strong { color: var(--hp-accent); font-size: 48px; font-weight: 500; line-height: 1.1; }
.hp-rebuild .hp-location-level strong > span { color: var(--hp-muted); font-size: 12px; letter-spacing: .05em; }
.hp-rebuild .hp-location address { display: grid; color: var(--hp-muted); font-style: normal; font-size: 14px; line-height: 1.8; }
.hp-rebuild .hp-location-map { position: relative; min-width: 0; height: 360px; overflow: hidden; background: #151518; }
.hp-rebuild .hp-contact { background: var(--hp-surface); border-top: 1px solid var(--hp-line); }
.hp-rebuild .hp-contact > .hp-shell > .hp-section-head { padding-bottom: 34px; border-bottom: 1px solid var(--hp-line); }
.hp-rebuild .hp-contact .hp-heading { max-width: 23ch; }
.hp-rebuild .hp-contact-layout { display: grid; grid-template-columns: minmax(0,.8fr) minmax(0,1.2fr); gap: 80px; }
.hp-rebuild .hp-contact-direct { display: flex; flex-direction: column; align-items: start; gap: 23px; }
.hp-rebuild .hp-contact-prompt { margin: 0; color: var(--hp-muted); font-size: 14px; line-height: 1.8; }
.hp-rebuild .hp-contact-phone { display: flex; align-items: center; gap: 12px; min-height: 44px; color: var(--hp-ink); font-size: clamp(21px,2vw,28px); font-weight: 500; line-height: 1.5; letter-spacing: .01em; text-decoration: none; overflow-wrap: anywhere; }
.hp-rebuild .hp-contact-email { display: flex; align-items: center; gap: 12px; min-height: 44px; color: var(--hp-ink); font-size: 15px; line-height: 1.5; text-decoration: none; }
.hp-rebuild .hp-contact-email > span { min-width: 0; overflow-wrap: anywhere; }
.hp-rebuild :is(.hp-contact-phone,.hp-contact-email) svg { width: 17px; height: 17px; flex: 0 0 17px; color: var(--hp-accent); }
.hp-rebuild :is(.hp-contact-phone,.hp-contact-email):hover { color: #f0787f; }
.hp-rebuild .hp-contact-direct .hp-body { max-width: 36ch; }
.hp-rebuild .hp-contact-form { min-width: 0; }
@media (max-width: 1199px) {
  .hp-rebuild .hp-shell { width: calc(100% - 64px); }
  .hp-rebuild .hp-services-desktop { gap: 32px; grid-template-columns: minmax(0,1.4fr) minmax(0,.8fr); }
  .hp-rebuild .hp-service-groups { gap: 20px; }
  .hp-rebuild .hp-hero-footer { align-items: start; gap: 24px; }
  .hp-rebuild .hp-hero-tools { flex-direction: column; align-items: start; gap: 12px; }
  .hp-rebuild .hp-ratings { gap: 24px; }
  .hp-rebuild .hp-hero-ratings { padding-top: 4px; }
  .hp-rebuild .hp-benefit { padding-inline: 20px; }
  .hp-rebuild .hp-faq-layout, .hp-rebuild .hp-location-layout, .hp-rebuild .hp-contact-layout { gap: 40px; }
}
@media (max-width: 899px) {
  .hp-rebuild .hp-shell { width: calc(100% - 40px); }
  .hp-rebuild .hp-main { padding-top: var(--header-h, 80px); }
  .hp-rebuild .hp-opening { min-height: 0; }
  .hp-rebuild .hp-hero { min-height: calc(100svh - var(--header-h, 80px)); }
  .hp-rebuild .hp-hero-images { inset: 0; }
  .hp-rebuild .hp-hero-shade { background: linear-gradient(90deg,rgb(9 9 11 / .72),rgb(9 9 11 / .18)),linear-gradient(0deg,rgb(9 9 11 / .94),rgb(9 9 11 / .45) 52%,rgb(9 9 11 / .18)); }
  .hp-rebuild .hp-hero-inner { padding-block: 48px 24px; gap: 42px; }
  .hp-rebuild .hp-hero-copy { max-width: 650px; }
  .hp-rebuild .hp-hero h1 { max-width: 20ch; font-size: min(clamp(38px,8vw,64px),calc((100vw - 40px) / var(--hp-word-factor))); line-height: 1.2; hyphens: auto; }
  .hp-rebuild .hp-hero-description { font-size: 16px; max-width: 44ch; }
  .hp-rebuild .hp-hero-tools { flex-direction: row; align-items: center; justify-content: space-between; width: 100%; }
  .hp-rebuild .hp-hero-ratings { display: none; }
  .hp-rebuild .hp-benefits-grid { grid-template-columns: minmax(0,1fr); }
  .hp-rebuild .hp-benefit, .hp-rebuild .hp-benefit:first-child, .hp-rebuild .hp-benefit:last-child { padding: 18px 0; }
  .hp-rebuild .hp-benefit + .hp-benefit { border-left: 0; border-top: 1px solid var(--hp-line); }
  .hp-rebuild .hp-benefit h2 { font-size: 13px; }
  .hp-rebuild .hp-benefit p { font-size: 13px; }
  .hp-rebuild .hp-mobile-ratings { display: block; padding-block: 22px; }
  .hp-rebuild .hp-mobile-ratings .hp-ratings { justify-content: start; flex-wrap: wrap; }
  .hp-rebuild .hp-section-head, .hp-rebuild .hp-faq-layout, .hp-rebuild .hp-location-layout, .hp-rebuild .hp-contact-layout { grid-template-columns: minmax(0,1fr); gap: 24px; }
  .hp-rebuild .hp-section-head { margin-bottom: 30px; }
  .hp-rebuild .hp-heading { max-width: 25ch; font-size: clamp(29px,5vw,40px); }
  .hp-rebuild .hp-services-desktop { display: none; }
  .hp-rebuild .hp-services-mobile { display: grid; grid-template-columns: minmax(0,1fr); gap: 36px; }
  .hp-rebuild .hp-service-group-description { min-height: 0; max-width: 50ch; margin-bottom: 16px; }
  .hp-rebuild .hp-service-detail { border-bottom: 1px solid var(--hp-line); }
  .hp-rebuild .hp-service-detail:first-child { border-top: 1px solid var(--hp-line); }
  .hp-rebuild .hp-service-detail summary { gap: 12px; min-height: 64px; padding-block: 16px; }
  .hp-rebuild .hp-service-detail summary > svg:first-child { width: 18px; height: 18px; flex: 0 0 18px; color: var(--hp-accent); }
  .hp-rebuild .hp-service-detail summary > span { font-size: 15px; }
  .hp-rebuild .hp-service-detail-body { padding: 0 0 22px 30px; }
  .hp-rebuild .hp-service-detail-body .hp-body { font-size: 14px; }
  .hp-rebuild .hp-faq-list summary { padding-block: 18px; }
  .hp-rebuild .hp-location-layout { gap: 32px; }
  .hp-rebuild .hp-location-map { height: 320px; }
  .hp-rebuild .hp-contact-layout { gap: 36px; }
  .hp-rebuild .hp-contact-direct { gap: 16px; }
}
@media (max-width: 600px) {
  .hp-rebuild .hp-shell { width: calc(100% - 32px); }
  .hp-rebuild .hp-section { padding-block: 56px; }
  .hp-rebuild .hp-body { font-size: 15px; line-height: 1.8; }
  .hp-rebuild .hp-eyebrow { margin-bottom: 17px; font-size: 10px; letter-spacing: .1em; }
  .hp-rebuild .hp-hero h1 { font-size: min(clamp(36px,10.5vw,52px),calc((100vw - 32px) / var(--hp-word-factor))); font-weight: 600; letter-spacing: -.015em; }
  .hp-rebuild .hp-hero-inner { padding-block: 36px 22px; }
  .hp-rebuild .hp-hero-description { margin-top: 20px; font-size: 15px; }
  .hp-rebuild .hp-hero-actions { margin-top: 26px; }
  .hp-rebuild .hp-hero-tools { gap: 16px; align-items: end; }
  .hp-rebuild .hp-hero-tools .hp-socials { max-width: 144px; gap: 4px; }
  .hp-rebuild .hp-hero-tools .hp-socials .hp-caption { flex-basis: 100%; }
  .hp-rebuild .hp-hero-controls { gap: 3px; }
  .hp-rebuild .hp-hero-controls .hp-icon-button { width: 40px; height: 44px; flex-basis: 40px; }
  .hp-rebuild .hp-hero-footer { gap: 0; }
  .hp-rebuild .hp-button { min-height: 50px; padding-inline: 20px; gap: 19px; }
  .hp-rebuild .hp-mobile-ratings .hp-ratings { justify-content: space-between; gap: 14px; }
  .hp-rebuild .hp-rating { gap: 8px; }
  .hp-rebuild .hp-rating-score { font-size: 22px; }
  .hp-rebuild .hp-rating-source > span { font-size: 11px; }
  .hp-rebuild .hp-rating > svg { display: none; }
  .hp-rebuild .hp-faq-layout { gap: 30px; }
  .hp-rebuild .hp-location-map { height: 300px; }
  .hp-rebuild .hp-location-information { gap: 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .hp-rebuild .hp-main *, .hp-rebuild .hp-main *::before, .hp-rebuild .hp-main *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .hp-rebuild .hp-link:hover svg, .hp-rebuild a.hp-photo-frame:hover img { transform: none; }
}
.hp-rebuild .hp-portfolio-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.28fr) minmax(0, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
  align-items: stretch;
}
.hp-rebuild .hp-portfolio-photo {
  display: block;
  min-width: 0;
  aspect-ratio: 16 / 10;
}
.hp-rebuild .hp-portfolio-photo-1 {
  grid-row: 1 / span 2;
  aspect-ratio: auto;
}
.hp-rebuild .hp-portfolio-open {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  background: #111;
  color: #fff;
  transition: background-color 180ms ease;
}
.hp-rebuild .hp-portfolio-open svg { width: 19px; height: 19px; }
.hp-rebuild .hp-portfolio-photo:hover .hp-portfolio-open,
.hp-rebuild .hp-portfolio-photo:focus-visible .hp-portfolio-open { background: #d52b32; }
.hp-rebuild .hp-care { border-block: 1px solid rgba(255,255,255,.12); }
.hp-rebuild .hp-care-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 44px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hp-rebuild .hp-care-step { min-width: 0; }
.hp-rebuild .hp-care-mark {
  display: block;
  width: 24px;
  height: 2px;
  margin-bottom: 20px;
  background: #d52b32;
}
.hp-rebuild .hp-care-step h3 {
  margin: 0 0 14px;
  color: #f4f2ef;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
}
.hp-rebuild .hp-care-step .hp-body { margin: 0; }
.hp-rebuild .hp-packages-header-link { align-self: end; justify-self: end; }
.hp-rebuild .hp-packages-header-link .hp-link { margin-top: 0; }
.hp-rebuild .hp-packages-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-block: 1px solid rgba(255,255,255,.18);
}
.hp-rebuild .hp-package {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 28px;
  padding: 32px;
}
.hp-rebuild .hp-package:first-child { padding-left: 0; }
.hp-rebuild .hp-package:last-child { padding-right: 0; }
.hp-rebuild .hp-package + .hp-package { border-left: 1px solid rgba(255,255,255,.14); }
.hp-rebuild .hp-package-intro { min-width: 0; }
.hp-rebuild .hp-package-popular {
  margin: 0 0 12px;
  color: #ef6a70;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}
.hp-rebuild .hp-package h3 {
  margin: 0 0 12px;
  color: #f4f2ef;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
  overflow-wrap: anywhere;
}
.hp-rebuild .hp-package-featured h3 { color: #ef6a70; }
.hp-rebuild .hp-package-intro .hp-body { margin: 0; font-size: 14px; }
.hp-rebuild .hp-package-scope-label {
  margin: 0 0 12px;
  color: rgba(255,255,255,.55);
  font-size: 12px;
  line-height: 1.5;
}
.hp-rebuild .hp-package-scope ul,
.hp-rebuild .hp-sales-offer ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0 0 0 18px;
  color: rgba(255,255,255,.75);
  font-size: 14px;
  line-height: 1.6;
  list-style: disc;
}
.hp-rebuild .hp-package-scope li,
.hp-rebuild .hp-sales-offer li { min-width: 0; padding-left: 3px; overflow-wrap: anywhere; }
.hp-rebuild .hp-package-scope li::marker,
.hp-rebuild .hp-sales-offer li::marker { color: #d52b32; font-size: 10px; }
.hp-rebuild .hp-package-discount {
  margin: 16px 0 0;
  color: rgba(255,255,255,.65);
  font-size: 14px;
  line-height: 1.6;
}
.hp-rebuild .hp-package-bottom { min-width: 0; margin-top: auto; padding-top: 4px; }
.hp-rebuild .hp-package-comparison { margin-bottom: 16px; font-size: 14px; line-height: 1.6; }
.hp-rebuild .hp-package-saving { display: block; margin-top: 5px; font-weight: 500; color: #ef8a90; }
.hp-rebuild .hp-package-comparison p { margin: 0 0 4px; color: #ef6a70; }
.hp-rebuild .hp-package-comparison span { color: rgba(255,255,255,.58); }
.hp-rebuild .hp-package-comparison s { margin-left: 4px; text-decoration-color: #d52b32; }
.hp-rebuild .hp-package-price {
  margin: 0;
  color: #f4f2ef;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -.02em;
  overflow-wrap: anywhere;
}
.hp-rebuild .hp-package-note,
.hp-rebuild .hp-packages-notes {
  color: rgba(255,255,255,.58);
  font-size: 12px;
  line-height: 1.7;
}
.hp-rebuild .hp-package-note { margin: 10px 0 0; }
.hp-rebuild .hp-packages-notes { max-width: 1000px; margin-top: 24px; }
.hp-rebuild .hp-packages-notes p { margin: 0 0 5px; }
.hp-rebuild .hp-sales {
  display: grid;
  grid-template-columns: minmax(0, .85fr) minmax(0, 1.6fr);
  gap: 48px;
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,.14);
  scroll-margin-top: 100px;
}
.hp-rebuild .hp-sales-intro { min-width: 0; }
.hp-rebuild .hp-sales-intro h3 {
  margin: 14px 0 18px;
  color: #f4f2ef;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.25;
}
.hp-rebuild .hp-sales-intro .hp-body { font-size: 14px; }
.hp-rebuild .hp-sales-offers { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.hp-rebuild .hp-sales-offer { display: flex; min-width: 0; flex-direction: column; padding-right: 28px; }
.hp-rebuild .hp-sales-offer + .hp-sales-offer { padding-left: 28px; padding-right: 0; border-left: 1px solid rgba(255,255,255,.14); }
.hp-rebuild .hp-sales-offer h4 {
  margin: 0 0 20px;
  color: #f4f2ef;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
}
.hp-rebuild .hp-sales-price-line { margin-top: auto; padding-top: 24px; }
.hp-rebuild .hp-sales-time { display: flex; align-items: center; gap: 7px; margin: 8px 0 0; color: rgba(255,255,255,.58); font-size: 12px; line-height: 1.5; }
.hp-rebuild .hp-sales-time svg { width: 14px; height: 14px; flex-shrink: 0; color: #d52b32; }
.hp-rebuild .hp-team { border-top: 1px solid rgba(255,255,255,.12); }
.hp-rebuild .hp-team-layout { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr); align-items: center; gap: 80px; }
.hp-rebuild .hp-team-figure { min-width: 0; margin: 0; }
.hp-rebuild .hp-team-photo { aspect-ratio: 4 / 5; }
.hp-rebuild .hp-team-figure .hp-caption { margin-top: 14px; }
.hp-rebuild .hp-team-copy { min-width: 0; }
.hp-rebuild .hp-team-lead { margin: 24px 0 0; color: rgba(255,255,255,.87); font-size: 20px; font-weight: 400; line-height: 1.5; }
.hp-rebuild .hp-team-teaser { margin-top: 20px; white-space: pre-line; }
.hp-rebuild .hp-team-signature { margin: 24px 0 16px; color: #f4f2ef; font-size: 48px; font-weight: 400; line-height: 1.3; }
.hp-rebuild .hp-team-links { display: flex; align-items: center; flex-wrap: wrap; gap: 20px 32px; margin-top: 24px; }
.hp-rebuild .hp-team-links .hp-link { margin-top: 0; }
@media (max-width: 1199px) {
  .hp-rebuild .hp-package { padding-inline: 24px; }
  .hp-rebuild .hp-sales { gap: 32px; }
  .hp-rebuild .hp-sales-offer { padding-right: 20px; }
  .hp-rebuild .hp-sales-offer + .hp-sales-offer { padding-left: 20px; }
  .hp-rebuild .hp-team-layout { gap: 48px; }
}
@media (max-width: 899px) {
  .hp-rebuild .hp-portfolio-grid,
  .hp-rebuild .hp-care-steps,
  .hp-rebuild .hp-packages-grid,
  .hp-rebuild .hp-sales,
  .hp-rebuild .hp-sales-offers,
  .hp-rebuild .hp-team-layout { grid-template-columns: minmax(0, 1fr); }
  .hp-rebuild .hp-portfolio-grid { gap: 18px; }
  .hp-rebuild .hp-portfolio-photo,
  .hp-rebuild .hp-portfolio-photo-1 { grid-row: auto; aspect-ratio: 4 / 3; }
  .hp-rebuild .hp-care-steps { gap: 28px; }
  .hp-rebuild .hp-care-mark { margin-bottom: 14px; }
  .hp-rebuild .hp-packages-header-link { justify-self: start; }
  .hp-rebuild .hp-package,
  .hp-rebuild .hp-package:first-child,
  .hp-rebuild .hp-package:last-child { gap: 22px; padding: 28px 0; }
  .hp-rebuild .hp-package + .hp-package { border-left: 0; border-top: 1px solid rgba(255,255,255,.14); }
  .hp-rebuild .hp-package-bottom { margin-top: 0; }
  .hp-rebuild .hp-sales { gap: 28px; margin-top: 40px; padding-top: 32px; }
  .hp-rebuild .hp-sales-offer,
  .hp-rebuild .hp-sales-offer + .hp-sales-offer { padding: 24px 0; border-left: 0; border-top: 1px solid rgba(255,255,255,.14); }
  .hp-rebuild .hp-sales-offer:first-child { padding-top: 0; border-top: 0; }
  .hp-rebuild .hp-sales-price-line { padding-top: 20px; }
  .hp-rebuild .hp-team-layout { gap: 32px; }
  .hp-rebuild .hp-team-figure { width: 100%; max-width: 560px; }
  .hp-rebuild .hp-team-signature { font-size: 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .hp-rebuild .hp-portfolio-open { transition: none; }
}

.hp-rebuild .hp-reviews {
  overflow: hidden;
  background: #0b0b0d;
}
.hp-rebuild .hp-reviews-viewport {
  margin-top: clamp(28px, 4vw, 48px);
  overflow: hidden;
  touch-action: pan-y pinch-zoom;
  cursor: grab;
}
.hp-rebuild .hp-reviews-viewport:active { cursor: grabbing; }
.hp-rebuild .hp-reviews-track {
  display: flex;
  align-items: stretch;
  gap: 24px;
  touch-action: pan-y pinch-zoom;
}
.hp-rebuild .hp-review-slide {
  flex: 0 0 46%;
  min-width: 0;
  opacity: .22;
  transition: opacity 360ms ease;
}
.hp-rebuild .hp-review-slide.is-active,
.hp-rebuild .hp-review-slide:focus-within { opacity: 1; }
.hp-rebuild .hp-review-card {
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  height: 370px;
  margin: 0;
  padding: 30px;
  border: 1px solid var(--hp-line);
  background: #121215;
  color: var(--hp-ink);
}
.hp-rebuild .hp-review-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.hp-rebuild .hp-review-stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--hp-accent);
}
.hp-rebuild .hp-review-stars svg { width: 15px; height: 15px; fill: currentColor; }
.hp-rebuild .hp-review-source {
  font-size: 11px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: .1em;
  color: var(--hp-muted);
  text-transform: uppercase;
}
.hp-rebuild .hp-review-quote-wrap { margin-top: 30px; }
.hp-rebuild .hp-review-quote {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin: 0;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -.015em;
  overflow-wrap: anywhere;
}
.hp-rebuild .hp-review-more {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 40px;
  margin-top: 8px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--hp-ink);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: normal;
  text-align: left;
  cursor: pointer;
}
.hp-rebuild .hp-review-more svg { width: 15px; height: 15px; color: var(--hp-accent); }
.hp-rebuild .hp-review-author {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: auto;
  padding-top: 22px;
  border-top: 1px solid var(--hp-line);
}
.hp-rebuild .hp-review-author strong { font-size: 16px; font-weight: 600; line-height: 1.35; }
.hp-rebuild .hp-review-author > span { font-size: 11px; line-height: 1.5; letter-spacing: .015em; color: var(--hp-muted); }
.hp-rebuild .hp-review-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 26px;
}
.hp-rebuild .hp-review-controls button:disabled { opacity: .4; cursor: default; }
.hp-rebuild .hp-review-indicator { display: flex; align-items: center; gap: 8px; }
.hp-rebuild .hp-review-indicator > span { display: block; width: 18px; height: 1px; background: var(--hp-line); }
.hp-rebuild .hp-review-indicator > span:nth-child(2) { width: 34px; height: 2px; background: var(--hp-accent); }
.hp-rebuild .hp-reviews-ratings {
  margin-top: 34px;
  padding-top: 30px;
  border-top: 1px solid var(--hp-line);
}
.hp-rebuild .hp-review-dialog {
  box-sizing: border-box;
  width: min(720px, calc(100% - 32px));
  max-width: 720px;
  max-height: 85vh;
  max-height: 85dvh;
  margin: auto;
  padding: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid var(--hp-line);
  border-top: 3px solid var(--hp-accent);
  border-radius: 0;
  background: #141417;
  color: var(--hp-ink);
}
.hp-rebuild .hp-review-dialog::backdrop { background: rgb(0 0 0 / .8); }
.hp-rebuild .hp-review-dialog-body { position: relative; padding: clamp(26px, 5vw, 46px); }
.hp-rebuild .hp-review-dialog-close { position: absolute; top: 16px; right: 16px; }
.hp-rebuild .hp-review-dialog-label { margin: 26px 50px 12px 0; font-size: 12px; line-height: 1.5; color: var(--hp-muted); }
.hp-rebuild .hp-review-dialog h3 { margin: 0 48px 0 0; font-size: clamp(25px, 4vw, 34px); font-weight: 600; line-height: 1.2; letter-spacing: -.02em; }
.hp-rebuild .hp-review-dialog-mark { display: block; width: 28px; height: 28px; margin-top: 28px; color: var(--hp-accent); }
.hp-rebuild .hp-review-dialog blockquote { margin: 20px 0 0; font-size: 18px; line-height: 1.8; overflow-wrap: anywhere; }
.hp-rebuild .hp-review-dialog-bottom-close { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; margin-top: 24px; border: 0; padding: 0; background: transparent; color: var(--hp-ink); font: inherit; font-size: 14px; cursor: pointer; }
.hp-rebuild .hp-review-dialog-bottom-close svg { width: 16px; height: 16px; color: var(--hp-accent); }
.hp-rebuild :is(.hp-review-more, .hp-review-dialog-bottom-close):focus-visible { outline: 2px solid var(--hp-ink); outline-offset: 5px; }
@media (max-width: 900px) {
  .hp-rebuild .hp-review-slide { flex-basis: 64%; }
  .hp-rebuild .hp-review-card { padding: 26px; }
  .hp-rebuild .hp-review-quote { font-size: 20px; }
}
@media (max-width: 600px) {
  .hp-rebuild .hp-reviews-track { gap: 16px; }
  .hp-rebuild .hp-review-slide { flex-basis: 100%; }
  .hp-rebuild .hp-review-card { height: 390px; padding: 24px; }
  .hp-rebuild .hp-review-quote-wrap { margin-top: 26px; }
  .hp-rebuild .hp-review-quote { -webkit-line-clamp: 5; font-size: 18px; letter-spacing: -.01em; }
  .hp-rebuild .hp-review-author { padding-top: 20px; }
  .hp-rebuild .hp-review-dialog-body { padding: 26px 24px; }
  .hp-rebuild .hp-review-dialog blockquote { font-size: 17px; line-height: 1.75; }
}
@media (prefers-reduced-motion: reduce) {
  .hp-rebuild .hp-review-slide { transition: none; }
}

`

