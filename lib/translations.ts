// Real translated copy scraped from the live /en, /de, and /uk homepages on boruchmyjnia.pl.
// The source site only publishes translated content for the homepage — every other route
// (services, pricing, gallery, contact, about, booking) exists in Polish only and 404s in
// EN/DE/UK on the source site itself. To avoid inventing untranslated business copy, the
// localized nav below links back to the real Polish pages for anything beyond the homepage.

export type Locale = "en" | "de" | "uk"

export const locales: { code: Locale; href: string; label: string }[] = [
  { code: "en", href: "/en", label: "EN" },
  { code: "de", href: "/de", label: "DE" },
  { code: "uk", href: "/uk", label: "UK" },
]

export const localeDictionaries = {
  en: {
    htmlLang: "en",
    metaTitle: "BORUCH Hand Car Wash | Detailing & Vehicle Care | Szczecin",
    metaDescription:
      "Professional hand car wash and detailing studio in the center of Szczecin. Interior and exterior cleaning, ceramic coating, PPF wrap, window tinting, paint correction and color change.",
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      pricing: "Pricing",
      gallery: "Gallery",
      contact: "Contact",
      book: "Call Us",
    },
    hero: {
      eyebrow: "Szczecin — hand car wash & detailing",
      title: "SPA FOR YOUR CAR",
      subtitle: "BORUCH CAR WASH SZCZECIN",
      description:
        "Professional hand car wash and detailing in Szczecin - BORUCH. We use only professional car care products.",
    },
    packages: {
      interior: {
        label: "Interior cleaning",
        description: "We'll thoroughly take care of your car's interior",
        price: "from 120 PLN*",
        note: "*depending on the size of car",
        items: [
          "Vacuuming the Vehicle Interior",
          "Vacuuming the Trunk",
          "Cleaning Plastic Surfaces",
          "Cleaning and Maintaining the Dashboard",
          "Washing Windows",
        ],
      },
      exterior: {
        label: "Exterior cleaning",
        description: "Your car will be as clean as new",
        price: "from 100 PLN*",
        note: "*depending on the size of car",
        items: [
          "Pre-Wash by Hand",
          "Main Wash by Hand",
          "Application of Hydrophobic Coating",
          "Thorough Drying",
          "Cleaning Rubber Floor Mats",
          "Tire Glossing",
          "Wheel Washing",
        ],
      },
      full: {
        badge: "POPULAR",
        label: "Full package",
        description: "Comprehensive cleaning inside and out",
        price: "from 200 PLN*",
        note: "*depending on the size of car",
        detail: "Detailing interior cleaning along with an exterior cleaning package",
        discount: "The Full Package includes a discount on both interior and exterior cleaning.",
      },
      priceNote:
        "Prices apply to compact cars. Medium-sized cars (station wagons, sedans) +10 PLN. Large cars (SUVs, minivans) +20 PLN.",
    },
    about: {
      eyebrow: "Our Team",
      title: "Experienced team, excellent quality, in the city center",
      paragraphs: [
        "Every day, we wake up with the goal of bringing shine to another vehicle. We love cars, especially when they are clean and gleaming.",
        "This passion led us to establish our car wash, where we put in every effort to make your 'gems' look like new! We also offer car wrapping services, color changes, and wrapping individual elements with PPF, such as window and headlight tinting.",
        "In addition to our love for cars, we are united by friendship and a fantastic team atmosphere, which we believe is the second most important factor contributing to the excellent quality and precision of our services!",
        "We invite you to visit us, and we hope you'll be so satisfied that you'll return again. :)",
      ],
      signature: "Karol Bruch",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Call us to schedule a service or if you have any questions",
      locationLabel: "Location",
      contactLabel: "Contact Information",
    },
    fullServicesNote: "For the full list of services and pricing, see the Polish-language pages below.",
    servicesCta: "View services (Polish)",
    pricingCta: "View full price list (Polish)",
  },
  de: {
    htmlLang: "de",
    metaTitle: "BORUCH Handwäsche | Detailing & Fahrzeugpflege | Stettin",
    metaDescription:
      "Professionelle Handwäsche und Auto-Detailing im Zentrum von Stettin. Innen- und Außenreinigung, Keramikbeschichtung, PPF-Folierung, Scheibentönung, Lackkorrektur und Farbänderung.",
    nav: {
      home: "Startseite",
      about: "Über uns",
      services: "Angebote",
      pricing: "Preise",
      gallery: "Galerie",
      contact: "Kontakt",
      book: "Jetzt anrufen",
    },
    hero: {
      eyebrow: "Stettin — Handwäsche & Detailing",
      title: "WELLNESS FÜR IHR AUTO",
      subtitle: "BORUCH AUTOWASCH STETTIN",
      description:
        "Professionelle Handwäsche und Auto-Detailing in Szczecin - BORUCH. Wir nutzen nur professionelle Autopflege-Produkte.",
    },
    packages: {
      interior: {
        label: "Innenraum",
        description: "Wir kümmern uns gründlich um das Interieur Ihres Fahrzeugs",
        price: "ab 120 PLN*",
        note: "*abhängig von der Größe des Autos",
        items: [
          "Innenraum des Fahrzeugs saugen",
          "Kofferraum saugen",
          "Reinigung von Kunststoffflächen",
          "Reinigung und Pflege des Armaturenbretts",
          "Fenster waschen",
        ],
      },
      exterior: {
        label: "Außenbereich",
        description: "Ihr Auto wird wie neu sein",
        price: "ab 100 PLN*",
        note: "*abhängig von der Größe des Autos",
        items: [
          "Vorwäsche von Hand",
          "Hauptwäsche von Hand",
          "Anwendung eines hydrophoben Beschichtungsmittels",
          "Gründliches Trocknen",
          "Reinigung von Gummimatten",
          "Glanzer für Reifen",
          "Reinigung der Felgen",
        ],
      },
      full: {
        badge: "BELIEBT",
        label: "Komplettpaket",
        description: "Umfassende Reinigung innen und außen",
        price: "ab 200 PLN*",
        note: "*abhängig von der Größe des Autos",
        detail: "Detailreinigung des Innenraums zusammen mit einem Außenreinigungspaket",
        discount: "Das Komplettpaket beinhaltet einen Rabatt auf sowohl Innen- als auch Außenreinigung.",
      },
      priceNote:
        "Preise gelten für Kompaktwagen. Aufpreis von 10 PLN für Mittelklassefahrzeuge (Kombis, Limousinen) und 20 PLN für große Fahrzeuge (SUVs, Minivan).",
    },
    about: {
      eyebrow: "Unser Team",
      title: "Erfahrenes Team, ausgezeichnete Qualität, im Stadtzentrum",
      paragraphs: [
        "Jeden Tag wachen wir mit dem Ziel auf, einem weiteren Fahrzeug neuen Glanz zu verleihen. Wir lieben Autos, besonders wenn sie sauber und glänzend sind.",
        "Diese Leidenschaft hat uns dazu geführt, unsere Autowaschanlage zu gründen, in der wir alle Anstrengungen unternehmen, um Ihre „Schmuckstücke“ wie neu aussehen zu lassen! Wir bieten auch Dienstleistungen wie Fahrzeugfolierung, Farbänderungen und das Folieren einzelner Elemente mit PPF an, zum Beispiel Fenster- und Scheinwerfertönung.",
        "Neben unserer Liebe zu Autos verbindet uns auch Freundschaft und eine fantastische Teamatmosphäre, die wir für den zweitwichtigsten Faktor halten, der zur ausgezeichneten Qualität und Präzision unserer Dienstleistungen beiträgt.",
        "Wir laden Sie ein, uns zu besuchen, und hoffen, dass Sie so zufrieden sein werden, dass Sie uns gerne wieder besuchen. :)",
      ],
      signature: "Karol Bruch",
    },
    contact: {
      eyebrow: "Kontaktieren Sie uns",
      title: "Rufen Sie uns an, um einen Service zu vereinbaren oder wenn Sie Fragen haben",
      locationLabel: "Standort",
      contactLabel: "Kontaktinformation",
    },
    fullServicesNote: "Die vollständige Liste der Dienstleistungen und Preise finden Sie auf den polnischen Seiten.",
    servicesCta: "Angebote ansehen (Polnisch)",
    pricingCta: "Preisliste ansehen (Polnisch)",
  },
  uk: {
    htmlLang: "uk",
    metaTitle: "BORUCH Ручна автомийка | Детейлінг & Догляд за автомобілями | Щецин",
    metaDescription:
      "Професійне ручне миття та детейлінг-студія у центрі Щецина. Чищення салону та кузова, керамічне покриття, плівка PPF, тонування вікон, корекція лакофарбового покриття та зміна кольору.",
    nav: {
      home: "Головна",
      about: "Про нас",
      services: "Послуги",
      pricing: "Ціни",
      gallery: "Галерея",
      contact: "Контакти",
      book: "Подзвони нам",
    },
    hero: {
      eyebrow: "Щецин — ручна автомийка та детейлінг",
      title: "СПА ДЛЯ ВАШОГО АВТОМОБІЛЯ",
      subtitle: "BORUCH МИЙКА АВТОМОБІЛІВ ЩЕЦИН",
      description:
        "Професійне ручне миття та детайлінг автомобілів у Щецині - BORUCH. Ми використовуємо лише професійні засоби для догляду за автомобілем.",
    },
    packages: {
      interior: {
        label: "Інтер'єр",
        description: "Ми ретельно подбаємо про інтер'єр вашого автомобіля",
        price: "від 120 PLN*",
        note: "*залежно від розміру автомобіля",
        items: [
          "Пилососення інтер'єру автомобіля",
          "Пилососення багажника",
          "Чищення пластикових поверхонь",
          "Чищення та обслуговування панелі приладів",
          "Миття вікон",
        ],
      },
      exterior: {
        label: "Екстер'єр",
        description: "Ваш автомобіль буде як новий",
        price: "від 100 PLN*",
        note: "*залежно від розміру автомобіля",
        items: [
          "Попереднє миття вручну",
          "Основне миття вручну",
          "Нанесення гідрофобного покриття",
          "Ретельне висушування",
          "Чищення гумових килимків",
          "Глянцювання шин",
          "Миття коліс",
        ],
      },
      full: {
        badge: "Популярний",
        label: "Повний пакет",
        description: "Комплексне чищення всередині та ззовні",
        price: "від 200 PLN*",
        note: "*залежно від розміру автомобіля",
        detail: "Деталізація чищення інтер'єру разом з пакетом чищення екстер'єру",
        discount: "Повний пакет включає знижку на чищення інтер'єру та екстер'єру.",
      },
      priceNote:
        "Ціни діють для компактних авто. Середні авто (універсали, седани) +10 PLN. Великі авто (SUV, мінівени) +20 PLN.",
    },
    about: {
      eyebrow: "Наша Команда",
      title: "Досвідчена команда, відмінна якість, у центрі міста",
      paragraphs: [
        "Щодня ми прокидаємося з метою надати новий блиск ще одному автомобілю. Ми любимо автомобілі, особливо коли вони чисті та блискучі.",
        "Ця пристрасть спонукала нас створити нашу мийку, де ми докладаємо всіх зусиль, щоб ваші «коштовності» виглядали як нові! Ми також пропонуємо послуги з оклеювання автомобілів, зміни кольору та оклеювання окремих елементів плівкою PPF, таких як тонування вікон і фар.",
        "Окрім нашої любові до автомобілів, нас об'єднує дружба та фантастична атмосфера в команді, що, на нашу думку, є другим найважливішим фактором, який впливає на відмінну якість і точність наших послуг!",
      ],
      signature: "Karol Bruch",
    },
    contact: {
      eyebrow: "Контакти",
      title: "Подзвоніть нам, щоб замовити послугу або якщо у вас є питання",
      locationLabel: "Місцезнаходження",
      contactLabel: "Контактна інформація",
    },
    fullServicesNote: "Повний список послуг і цін доступний на польськомовних сторінках нижче.",
    servicesCta: "Переглянути послуги (польською)",
    pricingCta: "Переглянути прайс-лист (польською)",
  },
} as const

export type LocaleDictionary = (typeof localeDictionaries)[Locale]
