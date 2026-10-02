"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brush,
  Car,
  ChevronDown,
  CircleDot,
  Clock3,
  Droplets,
  Droplet,
  Gem,
  Layers3,
  MapPin,
  PackageCheck,
  Palette,
  Pause,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  WandSparkles,
  Waves,
  X,
} from "lucide-react"
import { Photo } from "./photo"
import { HomeContactForm } from "./home-contact-form"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { useModalFocus } from "./use-modal-focus"
import { FacebookIcon, InstagramIcon } from "./social-icons"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"
import { serviceConfigs, serviceSummary } from "@/lib/content/services"
import type { PhotoId } from "@/lib/photos"
import { clsx as cn } from "clsx"

const navOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]


const heroPhotos: Array<{ id: PhotoId; position: string }> = [
  { id: "p11", position: "54% 58%" },
  { id: "p52", position: "55% 60%" },
  { id: "p43", position: "58% 55%" },
  { id: "p46", position: "50% 50%" },
]

const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1188.4880132657092!2d14.555602179682984!3d53.43313691416123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aa090013a3e941%3A0x340f3074e34ebb22!2sBORUCH%20Myjnia%20R%C4%99czna%20%7C%20Oklejanie%20aut%20%7C%20Pow%C5%82oki%20Ceramiczne%20%7C%20Detailing%20%7C%20CarWash!5e0!3m2!1spl!2spl!4v1790893337748!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"

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
    ["Wir wählen den passenden Umfang", "Wir prüfen den Zustand Ihres Fahrzeugs und wählen die passenden Maßnahmen – von der Basispflege bis zum Lackschutz."],
  ["Wir achten auf die Details", "Wir kümmern uns um Innenraum, Karosserie und Details, die bei einer normalen Wäsche oft übersehen werden."],
  ["Wir planen die weitere Pflege", "Wir beraten Sie, wie Sie Ihr Fahrzeug nach der Behandlung richtig waschen und pflegen."],
  ],
  uk: [
     ["Підбираємо обсяг робіт", "Оцінюємо стан автомобіля та підбираємо відповідні процедури — від базового догляду до захисту лакофарбового покриття."],
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
    routeHint: "Wjedź na parking PAZIM i zjedź na poziom -2.",
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
    ["Чи потрібно залишати авто на весь день?", "Це залежить від обраної послуги. Базове миття та очищення займає менше часу, тоді як детейлінг, корекція лаку, керамічне покриття або нанесення PPF можуть потребувати більше часу."],

  ["Чи можу я отримати попередню оцінку вартості?", "Так. Для простіших послуг діють фіксовані ціни з прайсу, а детейлінг, корекція лаку, PPF та інші індивідуальні роботи оцінюються залежно від стану автомобіля та обсягу робіт."],

  ["Чим відрізняється звичайне миття від детейлінгу?", "Звичайне миття зосереджене насамперед на ретельному очищенні автомобіля, тоді як детейлінг включає більш точний догляд, відновлення та захист салону або лакофарбового покриття."],

  ["Чи захищає PPF лак від пошкоджень?", "PPF створює захисний шар на лакофарбовому покритті та допомагає захистити його від дрібних подряпин, сколів від каміння та інших слідів щоденної експлуатації."],

  ["Чи видаляє корекція лаку всі подряпини?", "Обсяг корекції залежить від стану та товщини лакофарбового покриття. Перед виконанням послуги ми оцінюємо поверхню та підбираємо безпечний обсяг робіт, який дозволяє покращити вигляд лаку."],

  ["Чи отримаю я рекомендації щодо догляду після детейлінгу?", "Так. Після виконання послуги ми підкажемо, як правильно мити та доглядати за автомобілем, щоб результат зберігався якомога довше."],

  ["Чи займаєтеся ви також салоном автомобіля?", "Так. Ми пропонуємо, зокрема, ретельне прибирання пилососом, очищення панелі приладів і пластикових елементів, миття скла, хімчистку тканинної оббивки, а також очищення й захист шкіри."],

  ["Чи можна захистити PPF лише окремі елементи автомобіля?", "Так. Ми можемо обклеїти PPF весь автомобіль або лише окремі елементи кузова, салону чи інші вибрані деталі."],

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

  const [activeImageSlide, setActiveImageSlide] = useState(0)
  const [activeTextSlide, setActiveTextSlide] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState([0])
  const [imageTransitionsReady, setImageTransitionsReady] = useState(false)
  const [textTransitionsReady, setTextTransitionsReady] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [heroPaused, setHeroPaused] = useState(false)

  const heroRef = useRef<HTMLElement>(null)

  const slide = copy.heroSlides[activeTextSlide]
  const hasLongTitleWord = slide.title
    .split(/\s+/)
    .some((word) => word.length >= 12)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(([entry]) => {
      setHeroVisible(entry.isIntersecting)
    })

    const onVisibility = () => {
      setHeroPaused(document.hidden)
    }

    observer.observe(hero)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  useEffect(() => {
    if (activeTextSlide === activeImageSlide) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const textChange = window.setTimeout(
      () => {
        setTextTransitionsReady(true)
        setActiveTextSlide(activeImageSlide)
      },
      reduceMotion ? 0 : 280,
    )

    return () => {
      window.clearTimeout(textChange)
    }
  }, [activeImageSlide, activeTextSlide])

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (!heroVisible || heroPaused || reduceMotion) return

    const next = (activeImageSlide + 1) % copy.heroSlides.length

    const preload = window.setTimeout(() => {
      setImageTransitionsReady(true)
      setLoadedSlides((current) =>
        current.includes(next) ? current : [...current, next],
      )
    }, 3500)

    const advance = window.setTimeout(() => {
      setImageTransitionsReady(true)
      setLoadedSlides((current) =>
        current.includes(next) ? current : [...current, next],
      )
      setActiveImageSlide(next)
    }, 5000)

    return () => {
      window.clearTimeout(preload)
      window.clearTimeout(advance)
    }
  }, [
    activeImageSlide,
    copy.heroSlides.length,
    heroVisible,
    heroPaused,
  ])

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
          {heroPhotos.map(
            (photo, index) =>
              loadedSlides.includes(index) && (
                <div
                  key={photo.id}
                  className={cn(
                    "absolute inset-0",
                    imageTransitionsReady &&
                      "transition-opacity duration-[1600ms] ease-in-out motion-reduce:transition-none",
                    index === activeImageSlide
                      ? "opacity-100"
                      : "opacity-0",
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
              ),
          )}

          <div className="hero-cinema-shade absolute inset-0" />
        </div>

        <div className="home-hero-shell hero-editorial-grid relative z-10">
          <div
            key={activeTextSlide}
            className={cn(
              "hero-editorial-copy hero-copy-contrast",
              textTransitionsReady && "home-hero-copy-animated",
            )}
            style={
              textTransitionsReady
                ? { animationDelay: "0ms" }
                : undefined
            }
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
              <a
                href="#wycena"
                className="home-button home-button-red"
              >
                {t.nav.contact}
                <ArrowRight
                  className="size-4"
                  aria-hidden="true"
                />
              </a>

              <Link
                prefetch={false}
                href={routes[locale].services}
                className="editorial-link"
              >
                {t.nav.services}
                <ArrowUpRight
                  className="size-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div
  className="hero-trust-totem"
  aria-label={copy.reviewsLabel}
>
  <div className="hero-editorial-bottom sm:hidden">
   <div className="flex items-center justify-center text-white">
  <span className="mr-2 text-[.72rem] font-bold uppercase tracking-[.13em] text-white">
    {followCopy[locale]}
  </span>

  <div className="flex items-center gap-0.5">
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

  <div className="hero-trust-item">
    <span className="hero-trust-kicker">
      Opinie Booksy
    </span>

    <strong className="hero-trust-score">
      5.0
    </strong>

    <span className="hero-trust-meta">
      {copy.booksyReviews}
    </span>
  </div>

  <div className="hero-trust-divider" />

  <div className="hero-trust-item">
    <span className="hero-trust-kicker">
      Opinie Google
    </span>

    <strong className="hero-trust-score">
      5.0
    </strong>

    <span className="hero-trust-meta">
      {copy.googleReviews}
    </span>
  </div>
</div>

      </div>

        <ul className="hero-benefits relative z-10 grid border-y border-white/10 bg-[#0e0e0f] sm:grid-cols-3">
          {copy.benefits.map(([title, text], index) => {
            const Icon = benefitIcons[index] ?? Car

            return (
              <li
                key={title}
                className="flex min-h-20 items-center justify-center border-b border-white/10 px-6 py-3.5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 lg:px-10"
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
    <section
      aria-labelledby="why-title"
      className="section-xl overflow-hidden bg-[#080809]"
    >
      <div className="home-shell grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="home-kicker">
            {copy.whyLabel}
          </p>

          <h2
            id="why-title"
            data-reveal=""
            className="editorial-display mt-7 max-w-[11ch]"
          >
            {editorialCopy[locale].why}
          </h2>

          <p className="mt-7 max-w-md text-base leading-relaxed text-white/62">
            {copy.whyIntro}
          </p>

          <Link
            prefetch={false}
            href={routes[locale].about}
            className="editorial-link mt-8 w-fit"
          >
            {t.nav.about}
            <ArrowUpRight
              className="size-4 text-brand"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ol className="border-t border-white/15 lg:col-span-6 lg:col-start-7">
          {careSteps[locale].map(([title, text], index) => (
            <li
              key={title}
              data-reveal=""
              className="group grid grid-cols-[2.25rem_minmax(0,1fr)] gap-5 border-b border-white/15 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-7 sm:py-8"
            >
              <span
                className="type-label pt-1 text-brand"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-normal text-white sm:text-2xl">
                  {title}
                </h3>

                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/58">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function serviceMenuIcon(
  slug: string,
  _title: string,
  category: "myjnia" | "detailing",
) {
  const icons = {
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
  } as const

  return (
    icons[slug as keyof typeof icons] ??
    (category === "myjnia" ? Droplets : Gem)
  )
}

function ServiceMenu({ locale }: { locale: Locale }) {
  const accordionId = useId()
  const t = ui[locale]
  const copy = {
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
  }[locale]

  const groups = (["myjnia", "detailing"] as const).map((category) => ({
    category,
    title: category === "myjnia" ? copy.wash : copy.detailing,
    description: category === "myjnia" ? copy.washDescription : copy.detailingDescription,
    Icon: category === "myjnia" ? Droplets : Gem,
    items: serviceConfigs
      .filter((service) => service.category === category)
      .map((service) => {
        const summary = serviceSummary(locale, service.slug)
        return {
          slug: service.slug,
          title: locale === "pl" ? service.navTitle : (summary?.title ?? service.navTitle),
          description: summary?.text ?? serviceGroupCopy[locale][category],
          href: locale === "pl" ? "/" + service.slug : routes[locale].services,
          Icon: serviceMenuIcon(service.slug, service.navTitle, category),
        }
      }),
  })).filter((group) => group.items.length > 0)

  return (
    <section id="services" aria-labelledby="services-title" className="service-rebuild">
      <div className="home-shell sr-shell">
        <header className="sr-header">
          <div>
            <p className="sr-eyebrow"><span aria-hidden="true" />{copy.eyebrow}</p>
            <h2 id="services-title" className="sr-title">{copy.title}</h2>
          </div>
          <p className="sr-intro">{copy.intro}</p>
        </header>

        <div className="sr-columns">
          {groups.map((group) => (
            <article
              key={group.category}
              className="sr-group"
              aria-labelledby={accordionId + "-" + group.category}
            >
              <header className="sr-group-header">
                <div className="sr-group-heading">
                  <group.Icon className="sr-group-icon" aria-hidden="true" strokeWidth={1.4} />
                  <h3 id={accordionId + "-" + group.category} className="sr-group-title">
                    {group.title}
                  </h3>
                </div>
                <p className="sr-group-description">{group.description}</p>
              </header>

          
              <ul className="sr-list" role="list">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <details className="sr-item" name={accordionId + "-" + group.category + "-services"}>
                      <summary className="sr-summary">
                        <span className="sr-service-icon" aria-hidden="true">
                          <item.Icon strokeWidth={1.5} />
                        </span>
                        <span className="sr-service-title">
                          {item.title}
                          <span className="sr-accessible"> - {copy.expand}</span>
                        </span>
                        <ChevronDown className="sr-chevron" aria-hidden="true" strokeWidth={1.6} />
                      </summary>
                      <div className="sr-detail">
                        <div className="sr-detail-inner">
                          <p className="sr-service-description">{item.description}</p>
                          <Link prefetch={false} href={item.href} className="sr-link sr-service-link">
                            {copy.details}
                            <ArrowUpRight aria-hidden="true" strokeWidth={1.6} />
                            <span className="sr-accessible">: {item.title}</span>
                          </Link>
                        </div>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <footer className="sr-footer">
          <div className="sr-advice">
            <span className="sr-advice-marker" aria-hidden="true"><Car strokeWidth={1.5} /></span>
            <div>
              <p className="sr-advice-title">{copy.advice}</p>
              <p className="sr-advice-text">{copy.adviceText}</p>
            </div>
          </div>
         <div className="sr-footer-links">
  <Link
    prefetch={false}
    href={routes[locale].services}
    className="sr-link"
  >
    {copy.allServices}
    <ArrowUpRight aria-hidden="true" strokeWidth={1.6} />
  </Link>

  <Link
    prefetch={false}
    href={routes[locale].pricing}
    className="sr-link"
  >
    {copy.pricing}
    <ArrowUpRight aria-hidden="true" strokeWidth={1.6} />
  </Link>

  <a href="#wycena" className="sr-contact-link">
    {copy.contact}
    <ArrowRight aria-hidden="true" strokeWidth={1.6} />
  </a>
</div>
        </footer>
      </div>

      <style>{`
        .service-rebuild {
          --sr-accent: var(--color-brand, #d52b32);
          --sr-ink: #f3f1ed;
          --sr-muted: #a4a4a8;
          --sr-line: rgba(255,255,255,.13);
          --sr-ease: cubic-bezier(.22,.61,.36,1);
          background: #111112;
          color: var(--sr-ink);
          padding-block: clamp(3.5rem, 6vw, 6rem);
          scroll-margin-top: calc(var(--header-h, 5rem) + 1rem);
          isolation: isolate;
        }
        .service-rebuild *, .service-rebuild *::before, .service-rebuild *::after {
          box-sizing: border-box;
        }
        .service-rebuild :is(h2,h3,p,ul) { margin: 0; }
        .service-rebuild .sr-shell { min-width: 0; }
        .service-rebuild .sr-header {
          display: grid;
          grid-template-columns: minmax(0,1.5fr) minmax(0,1fr);
          align-items: end;
          gap: 2rem 4rem;
          padding-bottom: clamp(2rem,4vw,3.25rem);
        }
        .service-rebuild .sr-eyebrow {
          display: flex;
          align-items: center;
          gap: .75rem;
          font-size: .75rem;
          font-weight: 600;
          line-height: 1.5;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #b9b9bc;
        }
        .service-rebuild .sr-eyebrow > span {
          width: 1.75rem;
          height: 1px;
          background: var(--sr-accent);
        }
        .service-rebuild .sr-title {
          max-width: 25ch;
          margin-top: 1.25rem;
          font-family: inherit;
          font-size: clamp(1.875rem,3.5vw,3.25rem);
          font-weight: 600;
          line-height: 1.16;
          letter-spacing: -.025em;
          text-transform: none;
          text-wrap: balance;
          overflow-wrap: anywhere;
          color: var(--sr-ink);
        }
        .service-rebuild .sr-intro {
          max-width: 38ch;
          font-size: 1rem;
          line-height: 1.75;
          font-weight: 400;
          letter-spacing: normal;
          color: var(--sr-muted);
        }
        .service-rebuild .sr-columns {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: clamp(2rem,5vw,5rem);
          gap: 0 clamp(2rem,5vw,5rem);
        }
        .service-rebuild .sr-group {
          min-width: 0;
        
        }
        .service-rebuild .sr-group:only-child { grid-column: 1 / -1; }
        @supports (grid-template-rows:subgrid) {
          .service-rebuild .sr-group {
            display: grid;
            grid-template-rows: subgrid;
            grid-row: span 2;
          }
          .service-rebuild .sr-list { align-self: start; }
        }
        .service-rebuild .sr-group-header {
          padding-block: 1.75rem;
          min-height: 9rem;
        }
        .service-rebuild .sr-group-heading {
          display: flex;
          align-items: center;
          gap: .875rem;
        }
        .service-rebuild .sr-group-icon {
          width: 1.75rem;
          height: 1.75rem;
          flex: none;
          color: var(--sr-accent);
        }
        .service-rebuild .sr-group-title {
          font-family: inherit;
          font-size: clamp(1.5rem,2.1vw,2rem);
          line-height: 1.25;
          font-weight: 600;
          letter-spacing: -.02em;
          text-transform: none;
          overflow-wrap: anywhere;
        }
        .service-rebuild .sr-group-description {
          margin-top: .875rem;
          max-width: 46ch;
          font-size: .9375rem;
          line-height: 1.7;
          color: var(--sr-muted);
        }
        .service-rebuild .sr-list {
          padding: 0;
          list-style: none;
          border-top: 1px solid var(--sr-line);
        }
        .service-rebuild .sr-list > li { border-bottom: 1px solid var(--sr-line); }
        .service-rebuild .sr-item { min-width: 0; }
        .service-rebuild .sr-summary {
          display: grid;
          grid-template-columns: 2rem minmax(0,1fr) 1.125rem;
          align-items: center;
          gap: 1rem;
          min-height: 5rem;
          padding: 1.125rem .25rem;
          cursor: pointer;
          list-style: none;
          color: #dfdfe1;
          transition: color 180ms ease;
        }
        .service-rebuild .sr-summary::-webkit-details-marker { display: none; }
        .service-rebuild .sr-summary::marker { content: ""; }
        .service-rebuild .sr-service-icon {
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          color: #939397;
          transition: color 180ms ease;
        }
        .service-rebuild .sr-service-icon > svg { width: 1.375rem; height: 1.375rem; }
        .service-rebuild .sr-service-title {
          font-size: clamp(1rem,1.1vw,1.125rem);
          line-height: 1.5;
          font-weight: 500;
          letter-spacing: -.005em;
          text-transform: none;
          overflow-wrap: anywhere;
        }
        .service-rebuild .sr-chevron {
          width: 1.125rem;
          height: 1.125rem;
          color: #939397;
          transition: transform 220ms var(--sr-ease), color 180ms ease;
        }
        .service-rebuild .sr-item[open] .sr-summary { color: var(--sr-ink); }
        .service-rebuild .sr-item[open] :is(.sr-service-icon,.sr-chevron) {
          color: var(--sr-accent);
        }
        .service-rebuild .sr-item[open] .sr-chevron { transform: rotate(180deg); }
        .service-rebuild .sr-detail { padding: 0 2.375rem 1.5rem 3.25rem; }
        .service-rebuild .sr-item[open] .sr-detail-inner {
          animation: sr-service-reveal 220ms var(--sr-ease) both;
        }
        .service-rebuild .sr-service-description {
          max-width: 52ch;
          font-size: .9375rem;
          line-height: 1.8;
          font-weight: 400;
          letter-spacing: normal;
          color: #b8b8bc;
          overflow-wrap: anywhere;
        }
        .service-rebuild .sr-link {
          display: inline-flex;
          align-items: center;
          gap: .625rem;
          width: fit-content;
          min-height: 2.75rem;
          color: var(--sr-ink);
          font-size: .875rem;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: normal;
          text-transform: none;
          text-decoration: none;
          transition: color 180ms ease;
        }
        .service-rebuild .sr-link > svg {
          width: 1rem;
          height: 1rem;
          flex: none;
          color: var(--sr-accent);
          transition: transform 220ms var(--sr-ease);
        }
        .service-rebuild .sr-service-link { margin-top: .75rem; }
        .service-rebuild .sr-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem 3rem;
          border-top: 1px solid var(--sr-line);
          margin-top: clamp(2.5rem,4vw,4rem);
          padding-top: 1.75rem;
        }
        .service-rebuild .sr-advice {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          max-width: 32rem;
        }
        .service-rebuild .sr-advice-marker {
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          flex: none;
          color: var(--sr-accent);
        }
        .service-rebuild .sr-advice-marker > svg { width: 1.5rem; height: 1.5rem; }
        .service-rebuild .sr-advice-title {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.6;
          letter-spacing: normal;
          color: #dfdfe1;
        }
        .service-rebuild .sr-advice-text {
          margin-top: .375rem;
          font-size: .875rem;
          line-height: 1.75;
          color: var(--sr-muted);
        }
        .service-rebuild .sr-footer-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.25rem 1.75rem;
          flex: none;
        }
        .service-rebuild .sr-contact-link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          min-height: 3rem;
          padding: .75rem 1rem;
          border: 1px solid rgba(255,255,255,.28);
          background: transparent;
          color: var(--sr-ink);
          font-size: .875rem;
          line-height: 1.5;
          font-weight: 500;
          letter-spacing: normal;
          text-transform: none;
          text-decoration: none;
          transition: border-color 180ms ease, background-color 180ms ease;
        }
        .service-rebuild .sr-contact-link > svg {
          width: 1rem;
          height: 1rem;
          flex: none;
          color: var(--sr-accent);
        }
        .service-rebuild :is(.sr-summary,.sr-link,.sr-contact-link):focus-visible {
          outline: 2px solid var(--sr-ink);
          outline-offset: 4px;
        }
        .service-rebuild .sr-accessible {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
          border: 0;
        }
        @media (hover:hover) {
          .service-rebuild .sr-summary:hover { color: #fff; }
          .service-rebuild .sr-summary:hover .sr-service-icon { color: var(--sr-accent); }
          .service-rebuild .sr-link:hover { color: #fff; text-decoration: underline; text-underline-offset: .3em; }
          .service-rebuild .sr-link:hover > svg { transform: translate(2px,-2px); }
          .service-rebuild .sr-contact-link:hover {
            border-color: var(--sr-accent);
            background: rgba(255,255,255,.035);
          }
        }
        @media (max-width:1100px) {
          .service-rebuild .sr-footer { align-items: flex-start; }
          .service-rebuild .sr-footer-links {
            flex-direction: column;
            align-items: flex-start;
            flex: 0 1 auto;
          }
        }
        @media (max-width:900px) {
          .service-rebuild .sr-header { grid-template-columns: 1fr; gap: 1.25rem; }
          .service-rebuild .sr-intro { max-width: 54ch; }
          .service-rebuild .sr-columns { grid-template-columns: 1fr; gap: 2.5rem; }
          .service-rebuild .sr-group { display: block; grid-row: auto; }
          .service-rebuild .sr-group-header { min-height: 0; padding-block: 1.5rem; }
          .service-rebuild .sr-summary { min-height: 4.5rem; }
          .service-rebuild .sr-footer { flex-direction: column; gap: 1.25rem; }
          .service-rebuild .sr-footer-links { flex-direction: row; gap: .75rem 1.5rem; }
        }
        @media (max-width:420px) {
          .service-rebuild .sr-summary { grid-template-columns: 1.75rem minmax(0,1fr) 1rem; gap: .75rem; }
          .service-rebuild .sr-detail { padding-left: 2.75rem; padding-right: .25rem; }
          .service-rebuild .sr-contact-link { width: 100%; }
          .service-rebuild .sr-footer-links { width: 100%; }
        }
        @keyframes sr-service-reveal {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion:reduce) {
          .service-rebuild *, .service-rebuild *::before, .service-rebuild *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

function WorkShowcase({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]

  const projects: Array<{
    id: PhotoId
    position: string
  }> = [
    { id: "p21", position: "50% 58%" },
    { id: "p62", position: "50% 58%" },
    { id: "p29", position: "50% 50%" },
    { id: "p39", position: "50% 55%" },
    { id: "p52", position: "50% 55%" },
    { id: "p46", position: "50% 52%" },
    { id: "p58", position: "50% 55%" },
    { id: "p11", position: "50% 55%" },
  ]

  return (
    <section
      aria-labelledby="work-title"
      className="section-xl overflow-hidden bg-[#080809]"
    >
      <div className="home-shell">
        <header className="mb-10 grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="home-kicker">
              {t.nav.gallery}
            </p>

            <h2
              id="work-title"
              data-reveal=""
              className="editorial-display mt-6"
            >
              {src.home.projectsTitle}
            </h2>
          </div>

          <div className="max-w-md lg:col-span-4 lg:col-start-9">
            <p className="text-pretty text-base leading-relaxed text-white/62">
              {src.home.projectsText}
            </p>

            <Link
              prefetch={false}
              href={routes[locale].gallery}
              className="group mt-5 inline-flex items-center gap-3 text-[.72rem] font-bold uppercase tracking-[.16em] text-white"
            >
              <span className="border-b border-white/25 pb-1 transition-colors duration-300 group-hover:border-brand">
                {t.allPhotos}
              </span>

              <ArrowUpRight
                className="size-4 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:gap-4">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              prefetch={false}
              href={routes[locale].gallery}
              aria-label={`${t.allPhotos} ${index + 1}`}
              className="group relative isolate aspect-[4/3] overflow-hidden bg-white/3"
            >
              <Photo
                id={project.id}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 25vw, 50vw"
                position={project.position}
                className="transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.045] group-focus-visible:scale-[1.045]"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/12 transition-colors duration-500 group-hover:bg-black/2 group-focus-visible:bg-black/2"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/65 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-3 sm:p-4">
                <span className="font-mono text-[.6rem] font-bold tracking-[.16em] text-white/60">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="grid size-8 place-items-center border border-white/20 bg-black/20 text-white/80 backdrop-blur-sm transition-[border-color,color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-brand/70 group-hover:text-white">
                  <ArrowUpRight
                    className="size-3.5"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>
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
  <div className="grid gap-7 pb-7 lg:grid-cols-12 lg:items-end">
  <div className="lg:col-span-7">
    <p className="home-kicker">{t.pricing}</p>
    <h2 id="packages-title" data-reveal="" className="editorial-display mt-6">{src.home.packagesTitle}</h2>
  </div>
  <Link prefetch={false} href={routes[locale].pricing} className="editorial-link lg:col-span-4 lg:col-start-9 lg:justify-self-end">
    {{ pl: "Pełny cennik", en: "Full price list", de: "Vollständige Preisliste", uk: "Повний прайс" }[locale]}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
  </Link>
</div>

        <div className="mt-8">
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
                      </div>
                    </div>
                  )}
                  <span className="block whitespace-nowrap font-display text-[clamp(1.9rem,2.5vw,2.5rem)] font-semibold leading-[1.14] tracking-normal">
  {pkg.price?.replace(/(\d)\s*(zł|PLN)/g, "$1 $2")}
</span>
                  {pkg.note && <span className="mt-3 block text-xs leading-relaxed text-white/60">{pkg.note}</span>}
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
          <Link prefetch={false} href={`${routes[locale].pricing}`} className="editorial-link mt-7">{copy.details}<ArrowRight className="size-4" aria-hidden="true" /></Link>
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
          <figure data-reveal="mask" className="home-photo-panel editorial-photo relative aspect-[4/5] self-center overflow-hidden">
  <Photo id="team" sizes="(min-width: 1600px) 580px, (min-width: 1024px) 42vw, 92vw" position="50% 52.4%" />
  <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-6 pb-5 pt-12 text-[.72rem] font-bold uppercase tracking-[.16em] text-white/85">
    BORUCH Myjnia Szczecin
  </figcaption>
</figure>

          <div className="relative flex flex-col justify-center overflow-hidden border-t border-white/10 p-6 sm:p-12 lg:border-t-0 lg:p-[clamp(3rem,5vw,5.5rem)]">
            <h2 id="team-title" data-reveal="" className="mt-6 text-[clamp(1.8rem,2.4vw,2.6rem)] font-light leading-[1.12] tracking-[-.015em] text-white">{src.home.teamTitle ?? t.nav.about}</h2>
            <p className="mt-8 max-w-2xl border-l border-brand pl-5 text-lg font-medium leading-relaxed text-white/78">{copy.teamTitle}</p>

           <div className="mt-7 max-w-2xl space-y-5 text-[.95rem] leading-7 text-white/56">
  <p className="whitespace-pre-line">{copy.teamBody}</p>
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
  const [showAll, setShowAll] = useState(false)

  const visibleFaq = showAll ? copy.faq : copy.faq.slice(0, 4)

  const moreLabel = {
    pl: "Więcej pytań",
    en: "More questions",
    de: "Weitere Fragen",
    uk: "Більше запитань",
  }[locale]

  const lessLabel = {
    pl: "Pokaż mniej",
    en: "Show less",
    de: "Weniger anzeigen",
    uk: "Показати менше",
  }[locale]

  return (
    <section
      aria-labelledby="faq-title"
      className="section-lg border-b border-white/10 bg-[#111112]"
    >
      <div className="home-shell grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="home-kicker">{copy.faqLabel}</p>

            <h2
              id="faq-title"
              data-reveal=""
              className="editorial-display mt-7"
            >
              {copy.faqTitle}
            </h2>

            <p className="mt-7 max-w-sm text-base leading-relaxed text-white/62">
              {copy.faqIntro}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-white/14">
            {visibleFaq.map(([question, answer]) => (
             <details
  key={question}
  name="home-faq"
  className="group relative border-b border-white/12"
>
                <summary className="flex min-h-18 cursor-pointer list-none items-center gap-5 py-6 text-left transition-colors hover:text-[#ef6267] [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 flex-1 text-[clamp(1rem,1.2vw,1.16rem)] font-medium normal-case leading-relaxed tracking-normal text-white transition-colors group-open:text-white">
                    {question}
                  </span>

                  <span className="grid size-8 shrink-0 place-items-center text-brand transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown
                      className="size-4"
                      aria-hidden="true"
                    />
                  </span>
                </summary>

                <div className="pb-7 pr-10 sm:pr-14">
  <div className="max-w-2xl border-l border-brand/55 pl-5">
    <p className="text-[.95rem] leading-7 text-white/58">
      {answer}
    </p>
  </div>
</div>
              </details>
            ))}
          </div>

          {copy.faq.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              aria-expanded={showAll}
              className="group mx-auto mt-8 flex min-h-14 flex-col items-center justify-center gap-2 text-[.7rem] font-bold uppercase tracking-[.15em] text-white/55 transition-colors hover:text-white"
            >
              <span>
                {showAll ? lessLabel : moreLabel}
              </span>

              <ChevronDown
                className={`size-5 text-brand transition-transform duration-300 ${
                  showAll
                    ? "rotate-180"
                    : "animate-bounce"
                }`}
                aria-hidden="true"
              />
            </button>
          )}
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

  const locationTitle = {
    pl: "W centrum Szczecina",
    en: "In central Szczecin",
    de: "Im Zentrum von Szczecin",
    uk: "У центрі Щецина",
  }[locale]

  const levelLabel = {
    pl: "Poziom parkingu",
    en: "Parking level",
    de: "Parkebene",
    uk: "Рівень паркінгу",
  }[locale]

  const routeLabel = {
    pl: "Jak do nas trafić",
    en: "How to find us",
    de: "So finden Sie uns",
    uk: "Як нас знайти",
  }[locale]

  return (
    <section
      aria-labelledby="location-title"
      className="border-y border-white/10 bg-[#0e0e0f] py-16 lg:py-24"
    >
      <div className="home-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:items-stretch lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="home-kicker text-[#ef6267]">
              {slide.kicker}
            </p>

            <h2
              id="location-title"
              data-reveal=""
              className="mt-7 max-w-lg font-display text-[clamp(2.4rem,3.8vw,4.4rem)] font-semibold leading-[1.02] tracking-[-.03em] text-white"
            >
              {locationTitle}
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/62">
              {copy.routeHint}
            </p>

            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
              <div>
                <span className="block text-[.65rem] font-medium uppercase tracking-[.16em] text-white/42">
                  {levelLabel}
                </span>

                <div className="mt-3 flex items-end gap-3">
                  <strong className="font-display text-[clamp(3.6rem,5vw,5.25rem)] font-semibold leading-none tracking-[-.04em] text-brand">
                    -2
                  </strong>

                  <span className="pb-1 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/55">
                    PAZIM
                  </span>
                </div>
              </div>

              <address className="flex items-start gap-4 not-italic">
                <MapPin
                  className="mt-1 size-4 shrink-0 text-brand"
                  aria-hidden="true"
                />

                <div>
                  <span className="mb-2 block text-[.65rem] font-medium uppercase tracking-[.16em] text-white/42">
                    {routeLabel}
                  </span>

                  <span className="flex flex-col text-sm leading-relaxed text-white/72">
                    {src.address.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </div>
              </address>
            </div>

            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link mt-9 w-fit"
            >
              {t.openMap}
              <ArrowUpRight
                className="size-4 text-brand"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="relative min-h-[24rem] overflow-hidden lg:min-h-[34rem] lg:border-l lg:border-white/10 lg:pl-8">
            <div className="relative h-full min-h-[24rem] overflow-hidden bg-[#151516] lg:min-h-[34rem]">
              <iframe
                title={`${t.openMap} - BORUCH Myjnia Szczecin`}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 block h-full w-full border-0 opacity-95 [filter:grayscale(.45)_invert(.88)_contrast(1.05)]"
              />
            </div>
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
            <div className="flex flex-col gap-5 pt-6">
              <a
  href={contact.phoneHref}
  className="inline-flex w-fit items-center gap-3 text-white transition-colors hover:text-[#ef6267]"
>
  {contact.phone}
  <ArrowUpRight className="size-5 text-brand" aria-hidden="true" />
</a>
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

