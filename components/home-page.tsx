"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, Car, ChevronDown, Clock3, Mail, MapPin, Menu, Quote, Phone, ShieldCheck, Sparkles, Star } from "lucide-react"
import { Photo } from "./photo"
import { HomeContactForm } from "./home-contact-form"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"
import { serviceGroupTitle, servicePrice, serviceSummary, services, type ServiceSlug } from "@/lib/content/services"
import type { PhotoId } from "@/lib/photos"
import { cn } from "@/lib/utils"

const navOrder: PageKey[] = ["services", "pricing", "gallery", "about", "contact"]

const featuredServiceSlugs: ServiceSlug[] = [
  "mycie-zewnatrz",
  "czyszczenie-wnetrza",
  "komplet",
  "pranie-tapicerki",
  "powloka-ceramiczna",
  "folia-ppf",
]

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
    reviewsLink: "Zobacz opinie i terminy",
    booksyReviews: "150 opinii",
    googleReviews: "79 opinii",
    googleReviewsLink: "Zobacz opinie Google",
    reviews: [
      ["Karol K.", "Rzadko piszę opinie, ale tu po prostu trzeba było. Tak trzymać!"],
      ["Artur M.", "Auto odzyskało dawny blask. Dobra robota Panowie. Polecam."],
      ["Klient BORUCH", "Byłem już na kilku myjniach ręcznych, ale tutaj zadbali o moje auto najlepiej."],
    ],
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
    contactDirect: "Wolisz załatwić to od razu?",
    contactBooksy: "Termin możesz również wybrać bezpośrednio w Booksy.",
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
    reviewsLink: "See reviews and appointments",
    booksyReviews: "150 reviews",
    googleReviews: "79 reviews",
    googleReviewsLink: "See Google reviews",
    reviews: [
      ["Karol K.", "I rarely write reviews, but this place deserved one. Keep it up!"],
      ["Artur M.", "The car regained its former shine. Great work, gentlemen. Recommended."],
      ["BORUCH customer", "I have used several hand car washes, but my car was cared for best here."],
    ],
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
    contactDirect: "Prefer to arrange it now?",
    contactBooksy: "You can also choose an appointment directly on Booksy.",
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
    reviewsLink: "Bewertungen und Termine ansehen",
    booksyReviews: "150 Bewertungen",
    googleReviews: "79 Bewertungen",
    googleReviewsLink: "Google-Bewertungen ansehen",
    reviews: [
      ["Karol K.", "Ich schreibe selten Bewertungen, aber hier musste es einfach sein. Weiter so!"],
      ["Artur M.", "Das Auto hat seinen früheren Glanz zurück. Tolle Arbeit. Klare Empfehlung."],
      ["BORUCH Kunde", "Ich war schon bei mehreren Handwäschen, aber hier wurde mein Auto am besten gepflegt."],
    ],
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
    contactDirect: "Möchten Sie es sofort erledigen?",
    contactBooksy: "Einen Termin können Sie auch direkt über Booksy wählen.",
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
    reviewsLink: "Переглянути відгуки та вільні години",
    booksyReviews: "150 відгуків",
    googleReviews: "79 відгуків",
    googleReviewsLink: "Переглянути відгуки Google",
    reviews: [
      ["Karol K.", "Я рідко пишу відгуки, але тут просто мусив. Так тримати!"],
      ["Artur M.", "Автомобіль повернув колишній блиск. Чудова робота. Рекомендую."],
      ["Клієнт BORUCH", "Я був на кількох ручних мийках, але тут про моє авто подбали найкраще."],
    ],
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
    contactDirect: "Хочете домовитися одразу?",
    contactBooksy: "Вільний час також можна вибрати безпосередньо в Booksy.",
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
  reviewsLink: string
  booksyReviews: string
  googleReviews: string
  googleReviewsLink: string
  reviews: [string, string][]
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

function shortServiceText(text: string) {
  const end = text.indexOf(".")
  return end === -1 ? text : text.slice(0, end + 1)
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = ui[locale]

  return (
    <div id="top" lang={locale === "pl" ? undefined : localeLabels[locale].htmlLang} className="home-root min-h-dvh bg-[#080809] text-bone">
      <a href="#main" className="fixed left-4 top-4 z-80 -translate-y-24 bg-brand px-4 py-3 text-xs font-bold uppercase tracking-[.16em] transition-transform focus:translate-y-0">
        {t.skip}
      </a>
      <HomeHeader locale={locale} />
      <main id="main">
        <HomeHero locale={locale} />
        <WhyBoruch locale={locale} />
        <ServiceMenu locale={locale} />
        <WorkShowcase locale={locale} />
        <Packages locale={locale} />
        <TeamStory locale={locale} />
        <Reviews locale={locale} />
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080809]/92 shadow-[0_12px_40px_rgba(0,0,0,.18)] backdrop-blur-md">
      <div className="home-shell flex h-24 items-center gap-8">
        <Link href={routes[locale].home} aria-label={`BORUCH Myjnia - ${t.nav.home}`} className="group flex shrink-0 items-center gap-3">
          <span className="grid size-12 place-items-center bg-brand font-display text-[2rem] font-black leading-none transition-colors group-hover:bg-[#a91720]">B</span>
          <span className="flex flex-col">
            <span className="font-display text-[1.55rem] font-black uppercase leading-none tracking-[-.03em]">Boruch</span>
            <span className="mt-1 text-[.58rem] font-semibold uppercase tracking-[.22em] text-white/48">Myjnia / detailing</span>
          </span>
        </Link>

        <nav aria-label={t.navigation} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {navOrder.map((key) => (
              <li key={key}>
                <Link href={routes[locale][key]} className="home-nav-link text-[.72rem] font-semibold uppercase tracking-[.14em] text-white/68">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul aria-label={t.language} className="ml-2 hidden items-center gap-1 border-l border-white/12 pl-6 xl:flex">
          {localeOrder.map((code) => (
            <li key={code}>
              <Link href={routes[code].home} hrefLang={localeLabels[code].htmlLang} aria-current={code === locale ? "page" : undefined} className="grid size-8 place-items-center text-[.62rem] font-bold text-white/40 transition-colors hover:text-white aria-[current=page]:bg-white aria-[current=page]:text-black">
                {localeLabels[code].short}
              </Link>
            </li>
          ))}
        </ul>

        <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center gap-3 bg-brand px-5 text-[.68rem] font-bold uppercase tracking-[.14em] transition-colors hover:bg-[#aa1921] sm:flex">
          {t.book}<ArrowUpRight className="size-4" aria-hidden="true" />
        </a>

        <details className="home-mobile-menu ml-auto lg:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center border border-white/15 text-white">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">{t.menu}</span>
          </summary>
          <div className="fixed inset-x-0 top-24 min-h-[calc(100svh-6rem)] border-t border-white/10 bg-[#101011] px-5 py-8 shadow-2xl">
            <nav aria-label={t.navigation}>
              <ul className="flex flex-col">
                {navOrder.map((key) => (
                  <li key={key} className="border-b border-white/10">
                    <Link href={routes[locale][key]} className="flex items-center justify-between py-5 font-display text-3xl font-black uppercase tracking-[-.02em]">
                      {t.nav[key]}<ArrowRight className="size-5 text-brand" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {localeOrder.map((code) => (
                <Link key={code} href={routes[code].home} hrefLang={localeLabels[code].htmlLang} aria-current={code === locale ? "page" : undefined} className="grid h-10 min-w-12 place-items-center border border-white/15 px-3 text-xs font-bold aria-[current=page]:border-brand aria-[current=page]:bg-brand">
                  {localeLabels[code].short}
                </Link>
              ))}
            </div>
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-8 flex min-h-14 w-full items-center justify-between bg-brand px-5 text-xs font-bold uppercase tracking-[.14em]">
              {t.book}<ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </div>
        </details>
      </div>
    </header>
  )
}

function HomeHero({ locale }: { locale: Locale }) {
  const t = ui[locale]
  const copy = homeCopy[locale]
  const benefitIcons = [Sparkles, ShieldCheck, MapPin]
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = copy.heroSlides[activeSlide]

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) return

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % copy.heroSlides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [copy.heroSlides.length])

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#080809] pt-24">
      <div className="absolute inset-0" aria-hidden="true">
        {heroPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out motion-reduce:transition-none",
              index === activeSlide ? "scale-100 opacity-100" : "scale-[1.035] opacity-0",
            )}
          >
            <Photo
              id={photo.id}
              priority={index === 0}
              sizes="100vw"
              position={photo.position}
              className="saturate-[.72] contrast-[1.06]"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,.96)_0%,rgba(5,5,6,.87)_32%,rgba(5,5,6,.48)_66%,rgba(5,5,6,.34)_100%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-[#080809]" />
      </div>

      <div className="home-hero-shell relative z-10 flex min-h-[calc(100svh-14rem)] flex-1 items-center py-14 sm:py-20 lg:min-h-[calc(100svh-13rem)]">
        <div key={activeSlide} className="home-hero-copy flex max-w-3xl flex-col items-start">
          <p className="mb-7 flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.2em] text-[#ef4a50]">
            <span className="h-px w-9 bg-brand" />{slide.label}
          </p>
          <h1 id="hero-title" className="home-hero-title max-w-[10ch] text-balance">{slide.title}</h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/68 sm:text-lg">{slide.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="home-button home-button-red">
              {t.book}<ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <Link href={routes[locale].services} className="home-button home-button-dark">
              {t.nav.services}<ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-6 flex flex-col-reverse items-start gap-4 sm:inset-x-[clamp(1.25rem,2.5vw,3rem)] sm:bottom-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:bottom-10">
          <div className="flex items-center gap-2" role="group" aria-label={`${t.photo} ${activeSlide + 1} ${t.of} ${copy.heroSlides.length}`}>
            {copy.heroSlides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`${t.photo} ${index + 1}`}
                aria-current={index === activeSlide ? "true" : undefined}
                className={cn(
                  "h-1.5 transition-all duration-500",
                  index === activeSlide ? "w-11 bg-brand" : "w-5 bg-white/32 hover:bg-white/70",
                )}
              />
            ))}
          </div>

          <div className="flex items-stretch border border-white/14 bg-[#0b0b0c]/86 shadow-[0_18px_50px_rgba(0,0,0,.3)] backdrop-blur-md">
            <span className="grid min-h-16 min-w-20 place-items-center border-r border-[#238965]/75 bg-[#176b4f]/15 px-3 font-display text-xl font-black tracking-[-.04em] text-[#75c9a9] sm:min-h-20 sm:min-w-24 sm:text-2xl">4.9/5</span>
            <span className="flex min-w-0 flex-col justify-center divide-y divide-white/10">
              <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy.reviewsLink}: 4.9 / 5, ${copy.booksyReviews}`} className="group flex min-h-8 items-center gap-3 px-4 py-2 transition-colors hover:bg-white/[.06] sm:min-w-56 sm:px-5">
                <span className="min-w-0 flex-1">
                  <strong className="block text-[.6rem] font-bold uppercase tracking-[.14em] text-white">Booksy</strong>
                  <span className="mt-0.5 block text-[.62rem] text-white/48">4.9 / 5 - {copy.booksyReviews}</span>
                </span>
                <ArrowUpRight className="size-3.5 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy.googleReviewsLink}: 4.9 / 5, ${copy.googleReviews}`} className="group flex min-h-8 items-center gap-3 px-4 py-2 transition-colors hover:bg-white/[.06] sm:px-5">
                <span className="min-w-0 flex-1">
                  <strong className="block text-[.6rem] font-bold uppercase tracking-[.14em] text-white">Google</strong>
                  <span className="mt-0.5 block text-[.62rem] text-white/48">4.9 / 5 - {copy.googleReviews}</span>
                </span>
                <ArrowUpRight className="size-3.5 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </span>
          </div>
        </div>
      </div>

      <ul className="relative z-10 grid border-y border-white/10 bg-[#0e0e0f]/92 backdrop-blur-md sm:grid-cols-3">
        {copy.benefits.map(([title, text], index) => {
          const Icon = benefitIcons[index] ?? Car
          return (
            <li key={title} className="flex min-h-32 items-start gap-5 border-b border-white/10 px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:px-10">
              <Icon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="flex flex-col gap-2">
                <strong className="text-[.7rem] font-bold uppercase tracking-[.14em] text-white/84">{title}</strong>
                <span className="max-w-xs text-sm leading-relaxed text-white/42">{text}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function WhyBoruch({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  const src = sources[locale]
  const t = ui[locale]

  return (
    <section aria-labelledby="why-title" className="border-b border-white/10 bg-[#0a0a0b] py-24 lg:py-32">
      <div className="home-shell grid gap-14 lg:grid-cols-12 lg:items-stretch">
        <figure data-reveal="mask" className="relative min-h-[34rem] overflow-hidden lg:col-span-6 lg:min-h-[44rem]">
          <Photo id="p46" sizes="(min-width: 1024px) 50vw, 100vw" position="52% 50%" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-5 border-t border-white/12 bg-black/45 px-6 py-5 backdrop-blur-sm">
            <span className="text-[.62rem] font-bold uppercase tracking-[.16em] text-white/70">BORUCH / Szczecin</span>
            <span className="h-px w-16 bg-brand" />
          </figcaption>
        </figure>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <p className="home-kicker">{copy.whyLabel}</p>
          <h2 id="why-title" data-reveal="" className="home-section-title mt-7 max-w-[11ch]">{copy.whyTitle}</h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/52">{copy.whyIntro}</p>
          <p data-reveal="" className="mt-8 max-w-xl border-l border-brand pl-6 text-base leading-relaxed text-white/42">{src.home.teamParas[2]}</p>
          <Link href={routes[locale].services} className="home-button home-button-dark mt-10 w-fit">{t.allServices}<ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}

function ServiceMenu({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = homeCopy[locale]
  const items = featuredServiceSlugs.map((slug) => {
    const service = services.find((entry) => entry.slug === slug)!
    const summary = serviceSummary(locale, slug)
    return {
      slug,
      title: locale === "pl" ? service.navTitle : (summary?.title ?? service.navTitle),
      text: shortServiceText(summary?.text ?? service.source.intro[0]),
      category: serviceGroupTitle(locale, slug),
      price: servicePrice(locale, slug) ?? t.individualQuote,
      photo: service.hero,
      href: locale === "pl" ? `/${slug}` : routes[locale].services,
    }
  })

  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-white/10 bg-[#111112] py-24 lg:py-32">
      <div className="home-shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <p className="home-kicker text-white/62">{t.nav.services}</p>
            <h2 id="services-title" data-reveal="" className="home-section-title mt-6 max-w-[8ch]">{src.services.groups.map((group) => group.title).join(" / ")}</h2>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-white/58">{copy.servicesIntro}</p>
            <Link href={routes[locale].services} className="home-button mt-9 border border-white/24 bg-transparent hover:bg-white hover:text-black">
              {t.allServices}<ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ul className="divide-y divide-white/12 border-y border-white/12 lg:col-span-8">
          {items.map((item) => (
            <li key={item.slug} data-reveal="">
              <Link href={item.href} className="home-service-row group grid gap-6 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-center lg:py-7">
                <div className="relative aspect-[16/10] overflow-hidden bg-black/25">
                  <Photo id={item.photo} sizes="176px" className="opacity-76 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <div>
                  <span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/45">{item.category}</span>
                  <h3 className="mt-2 font-display text-[clamp(1.55rem,2.6vw,2.45rem)] font-black uppercase leading-[1.02] tracking-[-.03em] transition-transform duration-500 group-hover:translate-x-2">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/52">{item.text}</p>
                  <span className="mt-4 block text-[.65rem] font-bold uppercase tracking-[.12em] text-white/78">{item.price}</span>
                </div>
                <div className="flex items-center justify-end">
                  <span className="grid size-11 place-items-center border border-white/20 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function WorkShowcase({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = homeCopy[locale]

  return (
    <section aria-labelledby="work-title" className="overflow-hidden border-b border-white/10 bg-[#080809] py-24 lg:py-32">
      <div className="home-shell mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="home-kicker">{t.nav.gallery}</p>
          <h2 id="work-title" data-reveal="" className="home-section-title mt-6 max-w-[9ch]">{src.home.projectsTitle}</h2>
        </div>
        <div className="max-w-md lg:col-span-4 lg:col-start-9">
          <p className="text-pretty text-base leading-relaxed text-white/48">{src.home.projectsText}</p>
          <Link href={routes[locale].gallery} className="mt-6 inline-flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.16em] text-white">
            {t.allPhotos}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="home-shell grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[20rem_20rem]">
        <figure data-reveal="mask" className="group relative aspect-[4/5] overflow-hidden sm:col-span-2 lg:col-span-6 lg:row-span-2 lg:aspect-auto">
          <Photo id="p20" sizes="(min-width: 1024px) 50vw, 100vw" position="50% 58%" className="transition duration-1000 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-transparent to-transparent" />
          <figcaption className="absolute bottom-0 left-0 p-6 text-[.65rem] font-bold uppercase tracking-[.15em]">{copy.galleryCaptions[0]}</figcaption>
        </figure>
        <figure data-reveal="mask" className="group relative aspect-[4/3] overflow-hidden lg:col-span-3 lg:aspect-auto">
          <Photo id="p62" sizes="(min-width: 1024px) 25vw, 50vw" className="transition duration-1000 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-transparent to-transparent" />
          <figcaption className="absolute bottom-0 left-0 p-5 text-[.62rem] font-bold uppercase tracking-[.15em]">{copy.galleryCaptions[1]}</figcaption>
        </figure>
        <figure data-reveal="mask" className="group relative aspect-[4/3] overflow-hidden lg:col-span-3 lg:aspect-auto">
          <Photo id="p43" sizes="(min-width: 1024px) 25vw, 50vw" position="50% 65%" className="transition duration-1000 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-transparent to-transparent" />
          <figcaption className="absolute bottom-0 left-0 p-5 text-[.62rem] font-bold uppercase tracking-[.15em]">{copy.galleryCaptions[2]}</figcaption>
        </figure>
        <figure data-reveal="mask" className="group relative aspect-[4/3] overflow-hidden lg:col-span-3 lg:aspect-auto">
          <Photo id="p46" sizes="(min-width: 1024px) 25vw, 50vw" className="transition duration-1000 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-transparent to-transparent" />
          <figcaption className="absolute bottom-0 left-0 p-5 text-[.62rem] font-bold uppercase tracking-[.15em]">{copy.galleryCaptions[3]}</figcaption>
        </figure>
        <figure data-reveal="mask" className="group relative aspect-[4/3] overflow-hidden lg:col-span-3 lg:aspect-auto">
          <Photo id="p39" sizes="(min-width: 1024px) 25vw, 50vw" className="transition duration-1000 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-transparent to-transparent" />
          <figcaption className="absolute bottom-0 left-0 p-5 text-[.62rem] font-bold uppercase tracking-[.15em]">{copy.galleryCaptions[4]}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Packages({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const packageOrder = [1, 2, 0]

  return (
    <section aria-labelledby="packages-title" className="border-b border-white/10 bg-[#101011] py-24 lg:py-32">
      <div className="home-shell">
        <div className="grid gap-8 border-b border-white/12 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="home-kicker">{t.pricing}</p>
            <h2 id="packages-title" data-reveal="" className="home-section-title mt-6">{src.home.packagesTitle}</h2>
          </div>
          <Link href={routes[locale].pricing} className="inline-flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.16em] lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            {src.home.moreLink}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {packageOrder.map((index) => {
            const pkg = src.pricing.packages[index]
            if (!pkg) return null
            const featured = Boolean(pkg.popular)
            return (
              <article key={pkg.title} data-reveal="" className={cn("relative flex min-h-[34rem] flex-col border border-white/10 bg-[#0a0a0b] p-7 sm:p-8", featured && "border-brand/65 bg-[#151516] lg:-translate-y-3")}>
                {featured && <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden="true" />}
                <div>
                  {pkg.popular && <span className="mb-5 inline-block bg-brand px-2.5 py-1 text-[.55rem] font-bold uppercase tracking-[.16em]">{pkg.popular}</span>}
                  <h3 className="font-display text-[clamp(2.15rem,3.5vw,3.5rem)] font-black uppercase leading-[1.02] tracking-[-.04em]">{pkg.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/48">{pkg.tagline}</p>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  {pkg.includedLabel && <p className="mb-4 text-[.58rem] font-bold uppercase tracking-[.16em] text-[#ef4a50]">{pkg.includedLabel}</p>}
                  <ul className="space-y-2.5 text-sm leading-relaxed text-white/68">
                    {pkg.items.slice(0, 5).map((item) => <li key={item} className="flex gap-3"><span className="mt-[.7em] h-px w-3 shrink-0 bg-brand" />{item}</li>)}
                  </ul>
                  {pkg.discount && <p className="mt-5 text-sm leading-relaxed text-white/46">{pkg.discount}</p>}
                </div>
                <div className="mt-auto border-t border-white/10 pt-7">
                  <span className="block whitespace-nowrap font-display text-[clamp(2.8rem,4.5vw,4.4rem)] font-black uppercase leading-none tracking-[-.045em]">{pkg.price}</span>
                  {pkg.note && <span className="mt-3 block text-[.58rem] font-bold uppercase tracking-[.13em] text-white/38">{pkg.note}</span>}
                  <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className={cn("home-button mt-7 w-full", featured ? "home-button-red" : "home-button-dark")}>{t.book}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
                </div>
              </article>
            )
          })}
        </div>
        <p className="mt-7 text-xs leading-relaxed text-white/38">* {src.pricing.packagesNote}</p>
      </div>
    </section>
  )
}

function TeamStory({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = homeCopy[locale]
  const storyParagraphs = [
    src.home.teamParas.slice(0, 3).join(" "),
    src.home.teamParas.slice(3, 5).join(" "),
    src.home.teamParas.slice(5).join(" "),
  ].filter(Boolean)

  return (
    <section aria-labelledby="team-title" className="border-b border-white/10 bg-[#080809] py-20 lg:py-28">
      <div className="home-shell">
        <div className="grid overflow-hidden border border-white/10 bg-[#111112] lg:grid-cols-[.9fr_1.1fr]">
          <figure data-reveal="mask" className="relative min-h-[34rem] overflow-hidden lg:min-h-[48rem]">
            <Photo id="team" sizes="(min-width: 1024px) 42vw, 100vw" position="50% 58%" className="scale-[1.03]" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/48 via-transparent to-black/10" />
            <figcaption className="absolute bottom-0 left-0 border-r border-t border-white/10 bg-[#080809]/92 px-5 py-4 text-[.6rem] font-bold uppercase tracking-[.16em] backdrop-blur-sm">BORUCH / Szczecin</figcaption>
          </figure>

          <div className="relative flex flex-col justify-center overflow-hidden p-8 sm:p-12 lg:p-[clamp(3rem,5vw,5.5rem)]">
            <span className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-brand/[.055] blur-[90px]" aria-hidden="true" />
            <p className="home-kicker">{t.nav.about}</p>
            <h2 id="team-title" data-reveal="" className="mt-6 text-[clamp(2.2rem,3.5vw,3.5rem)] font-light leading-[1.08] tracking-[-.04em] text-white">{src.home.teamTitle ?? t.nav.about}</h2>
            <p className="mt-8 max-w-2xl border-l border-brand pl-5 text-lg font-medium leading-relaxed text-white/78">{copy.teamTitle}</p>

            <div className="mt-7 max-w-2xl space-y-5 text-[.95rem] leading-7 text-white/56">
              {storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <p className="home-signature relative mt-9 text-[clamp(3.8rem,5.5vw,5.75rem)] leading-[1.2] text-white">{src.home.author}</p>

            <div className="relative mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-7">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center border border-white/14 text-white/65 transition-colors hover:border-brand hover:bg-brand hover:text-white">
                <span className="font-sans text-lg font-black lowercase" aria-hidden="true">f</span>
              </a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center border border-white/14 text-white/65 transition-colors hover:border-brand hover:bg-brand hover:text-white">
                <span className="text-[.62rem] font-black uppercase tracking-[-.02em]" aria-hidden="true">IG</span>
              </a>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={t.openMap} className="grid size-11 place-items-center border border-white/14 text-white/65 transition-colors hover:border-brand hover:bg-brand hover:text-white">
                <MapPin className="size-4" aria-hidden="true" />
              </a>
              <Link href={routes[locale].about} className="ml-auto inline-flex min-h-11 items-center gap-3 px-2 text-[.62rem] font-bold uppercase tracking-[.15em] text-white transition-colors hover:text-[#ef6267]">
                {t.nav.about}<ArrowRight className="size-4 text-brand" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Reviews({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]
  const [activeReview, setActiveReview] = useState(0)
  const reviewCount = copy.reviews.length
  const visibleReviews = [-1, 0, 1].map((offset) => ({
    offset,
    review: copy.reviews[(activeReview + offset + reviewCount) % reviewCount],
  }))

  const showPreviousReview = () => {
    setActiveReview((current) => (current - 1 + reviewCount) % reviewCount)
  }

  const showNextReview = () => {
    setActiveReview((current) => (current + 1) % reviewCount)
  }

  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden border-b border-white/10 bg-[#0a0a0b] py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-52 top-1/2 size-[34rem] -translate-y-1/2 rounded-full bg-brand/[.055] blur-[130px]" />
      <div className="home-shell relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="home-kicker">{copy.reviewsLabel}</p>
          <h2 id="reviews-title" data-reveal="" className="home-section-title mt-7 max-w-[11ch]">{copy.reviewsTitle}</h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/48">{copy.reviewsIntro}</p>
        </div>

        <div className="mt-14 grid items-center gap-4 md:grid-cols-[.82fr_1.18fr_.82fr] lg:gap-5">
          {visibleReviews.map(({ offset, review }) => {
            const [name, text] = review
            const isActive = offset === 0
            return (
              <figure
                key={`${offset}-${name}`}
                className={cn(
                  "relative flex flex-col overflow-hidden border p-7 transition-all duration-500 lg:p-9",
                  isActive
                    ? "min-h-[23rem] border-brand/45 bg-[#151516] shadow-[0_28px_90px_rgba(0,0,0,.34),0_0_0_1px_rgba(218,38,48,.08)]"
                    : "hidden min-h-[20rem] scale-[.92] border-white/10 bg-white/[.025] opacity-40 md:flex",
                )}
              >
                <span className={cn("absolute left-0 top-0 h-0.5 bg-brand transition-all duration-500", isActive ? "w-20" : "w-10")} aria-hidden="true" />
                <span className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[9rem] font-black leading-none text-white/[.035]" aria-hidden="true">“</span>
                <div className="relative flex gap-1 text-brand" aria-label="5 / 5">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" aria-hidden="true" />)}
                </div>
                <Quote className="mt-10 size-8 text-white/12" strokeWidth={1.3} aria-hidden="true" />
                <blockquote className={cn("mt-5 font-medium leading-relaxed", isActive ? "text-lg text-white/84 sm:text-xl" : "text-base text-white/64")}>„{text}”</blockquote>
                <figcaption className="mt-auto border-t border-white/10 pt-6">
                  <strong className="text-sm font-bold uppercase tracking-[.1em] text-white/88">{name}</strong>
                  <span className="mt-1.5 block text-[.58rem] font-bold uppercase tracking-[.16em] text-white/35">Booksy / BORUCH Szczecin</span>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" onClick={showPreviousReview} aria-label={reviewControls[locale].previous} className="grid size-11 place-items-center border border-white/14 bg-white/[.035] text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <div className="flex items-center" role="group" aria-label={copy.reviewsLabel}>
            {copy.reviews.map(([name], index) => (
              <button key={name} type="button" onClick={() => setActiveReview(index)} aria-label={`${reviewControls[locale].select} ${index + 1}`} aria-current={index === activeReview ? "true" : undefined} className="group grid size-10 place-items-center">
                <span className={cn("block h-1.5 transition-all duration-300", index === activeReview ? "w-7 bg-brand" : "w-1.5 bg-white/25 group-hover:bg-white/50")} aria-hidden="true" />
              </button>
            ))}
          </div>
          <button type="button" onClick={showNextReview} aria-label={reviewControls[locale].next} className="grid size-11 place-items-center border border-white/14 bg-white/[.035] text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white">
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
          <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.reviewsLink} className="group flex items-center gap-4 border border-white/10 bg-[#111112] p-4 transition-colors hover:border-brand/55">
            <span className="grid h-12 min-w-16 shrink-0 place-items-center border border-[#238965]/75 bg-[#176b4f]/15 px-2 font-display text-base font-black text-[#75c9a9]">4.9/5</span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm font-bold text-white">Booksy</strong>
              <span className="mt-1 block text-xs text-white/42">{copy.booksyReviews}</span>
            </span>
            <ArrowUpRight className="size-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.googleReviewsLink} className="group flex items-center gap-4 border border-white/10 bg-[#111112] p-4 transition-colors hover:border-brand/55">
            <span className="grid h-12 min-w-16 shrink-0 place-items-center border border-[#238965]/75 bg-[#176b4f]/15 px-2 font-display text-base font-black text-[#75c9a9]">4.9/5</span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm font-bold text-white">Google</strong>
              <span className="mt-1 block text-xs text-white/42">{copy.googleReviews}</span>
            </span>
            <ArrowUpRight className="size-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function HomeFaq({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale]

  return (
    <section aria-labelledby="faq-title" className="border-b border-white/10 bg-[#111112] py-24 lg:py-32">
      <div className="home-shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="home-kicker">{copy.faqLabel}</p>
          <h2 id="faq-title" data-reveal="" className="home-section-title mt-7 max-w-[9ch]">{copy.faqTitle}</h2>
          <p className="mt-7 max-w-sm text-base leading-relaxed text-white/48">{copy.faqIntro}</p>
        </div>

        <div className="border-t border-white/12 lg:col-span-7 lg:col-start-6">
          {copy.faq.map(([question, answer]) => (
            <details key={question} className="group border-b border-white/12">
              <summary className="flex min-h-24 cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-[clamp(1.3rem,2vw,1.8rem)] font-black uppercase leading-[1.08] tracking-[-.025em] transition-colors hover:text-[#ef6267] [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <span className="grid size-10 shrink-0 place-items-center border border-white/15 text-brand transition-transform group-open:rotate-180">
                  <ChevronDown className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pr-12 text-base leading-relaxed text-white/52">{answer}</p>
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

  return (
    <section aria-labelledby="location-title" className="bg-[#080809] py-16 lg:py-20">
      <div className="home-shell">
        <div className="relative grid overflow-hidden border border-white/10 shadow-[0_32px_90px_rgba(0,0,0,.28)] lg:grid-cols-[.42fr_.83fr_.95fr]">
          <div className="relative flex min-h-48 flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_55%_88%,rgba(218,38,48,.2),transparent_55%),#0a0a0b] p-8 sm:p-10 lg:min-h-80">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-brand" aria-hidden="true" />
          <span className="text-[.62rem] font-bold uppercase tracking-[.2em] text-white/58">PAZIM / {t.level}</span>
          <strong className="font-display text-[clamp(6rem,10vw,9rem)] font-black leading-[.72] tracking-[-.07em] text-[#ee343e] drop-shadow-[0_12px_32px_rgba(218,38,48,.2)]">-2</strong>
          </div>
          <div className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,#121213_0%,#101011_68%,#1c0b0e_100%)] p-8 sm:p-10 lg:min-h-80">
          <span className="pointer-events-none absolute -bottom-24 -right-20 size-64 rounded-full bg-brand/[.07] blur-[70px]" aria-hidden="true" />
          <div>
            <p className="home-kicker text-[#ef6267]">{slide.kicker}</p>
            <h2 id="location-title" data-reveal="" className="mt-6 max-w-[11ch] font-display text-[clamp(2.4rem,3.8vw,4rem)] font-black uppercase leading-[.98] tracking-[-.04em]">{slide.title} {slide.sub}</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/64">{copy.routeHint}</p>
          </div>
          <address className="relative mt-8 flex items-start gap-3 border-t border-brand/25 pt-5 not-italic text-sm leading-relaxed text-white/72">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <span className="flex flex-col">{src.address.lines.map((line) => <span key={line}>{line}</span>)}</span>
          </address>
          </div>
          <div className="group relative min-h-64 overflow-hidden border-t border-white/10 bg-[#151516] lg:min-h-80 lg:border-l lg:border-t-0">
          <iframe
            title={`${t.openMap} - BORUCH Szczecin`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 block h-full w-full border-0 opacity-90 [filter:grayscale(.72)_invert(.92)_sepia(.22)_hue-rotate(305deg)_contrast(1.02)]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/42 via-transparent to-transparent" aria-hidden="true" />
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 right-0 flex min-h-12 items-center justify-between bg-[#0a0a0b]/92 px-4 text-[.6rem] font-bold uppercase tracking-[.14em] text-white backdrop-blur-md transition-colors hover:bg-brand">
            {t.openMap}<ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({ locale }: { locale: Locale }) {
  const t = ui[locale]
  const copy = homeCopy[locale]

  return (
    <section id="wycena" aria-labelledby="contact-form-title" className="border-y border-white/10 bg-[#111112] py-24 lg:py-32">
      <div className="home-shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="home-kicker">{copy.contactLabel}</p>
            <h2 id="contact-form-title" data-reveal="" className="home-section-title mt-7 max-w-[10ch]">{copy.contactTitle}</h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/55">{copy.contactIntro}</p>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 text-sm text-white/58">
              <p className="flex items-start gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /><span><strong className="block text-white/86">{copy.contactDirect}</strong>{copy.contactBooksy}</span></p>
              <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white"><Phone className="size-4 text-brand" aria-hidden="true" />{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white"><Mail className="size-4 text-brand" aria-hidden="true" />{contact.email}</a>
              <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="home-button home-button-dark mt-3 w-fit">{t.booksy}<ArrowUpRight className="size-4 text-brand" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div data-reveal="" className="border border-white/10 bg-[#080809] p-6 sm:p-9 lg:col-span-7 lg:p-12">
          <HomeContactForm locale={locale} />
        </div>
      </div>
    </section>
  )
}

function HomeFooter({ locale }: { locale: Locale }) {
  const t = ui[locale]

  return (
    <footer className="bg-[#050505]">
      <div className="home-shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href={routes[locale].home} className="font-display text-6xl font-black uppercase tracking-[-.05em]">Boruch<span className="text-brand">.</span></Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/38">{sources[locale].meta.home.description}</p>
        </div>
        <nav aria-label={t.navigation} className="md:col-span-3 md:col-start-6">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/58">
            {navOrder.map((key) => <li key={key}><Link href={routes[locale][key]} className="transition-colors hover:text-white">{t.nav[key]}</Link></li>)}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 text-sm text-white/58 md:col-span-3 md:col-start-10">
          <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white"><Phone className="size-4 text-brand" aria-hidden="true" />{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white"><Mail className="size-4 text-brand" aria-hidden="true" />{contact.email}</a>
          <div className="mt-3 flex gap-5">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Instagram</a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Facebook</a>
          </div>
          <a href="#top" className="mt-4 inline-flex items-center gap-2 text-[.6rem] font-bold uppercase tracking-[.15em] text-white">{t.backToTop}<ArrowUpRight className="size-4 text-brand" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="home-shell flex flex-col gap-4 py-5 text-[.58rem] font-semibold uppercase tracking-[.14em] text-white/28 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BORUCH</span>
          <span>Szczecin / Plac Rodła 8 / PAZIM</span>
        </div>
      </div>
    </footer>
  )
}
