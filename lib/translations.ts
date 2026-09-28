// Real translated copy scraped from the live /en, /de, and /uk pages on boruchmyjnia.pl.
// The source site publishes translated content for the homepage, services, pricing,
// gallery, about-us, and contact pages in each language. Prices mirror the verified
// Polish figures in lib/pricing-data.ts; only the labels are translated per locale.

export type Locale = "en" | "de" | "uk"

export const locales: { code: Locale; href: string; label: string }[] = [
  { code: "en", href: "/en", label: "EN" },
  { code: "de", href: "/de", label: "DE" },
  { code: "uk", href: "/uk", label: "UK" },
]

// Real slugs verified live on boruchmyjnia.pl for each locale (Ukrainian slugs are Cyrillic).
export const localeRoutes: Record<
  Locale,
  { home: string; about: string; services: string; pricing: string; gallery: string; contact: string }
> = {
  en: {
    home: "/en",
    about: "/en/about-us",
    services: "/en/services",
    pricing: "/en/pricing",
    gallery: "/en/gallery",
    contact: "/en/contact",
  },
  de: {
    home: "/de",
    about: "/de/uber-uns",
    services: "/de/angebote",
    pricing: "/de/preise",
    gallery: "/de/galerie",
    contact: "/de/kontakt",
  },
  uk: {
    home: "/uk",
    about: "/uk/про-нас",
    services: "/uk/послуги",
    pricing: "/uk/ціни",
    gallery: "/uk/галерея",
    contact: "/uk/контакти",
  },
}

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
        price: "from 130 PLN*",
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
        price: "from 110 PLN*",
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
        price: "from 220 PLN*",
        note: "*depending on the size of car",
        detail: "Detailing interior cleaning along with an exterior cleaning package",
        discount: "The Full Package includes a discount on both interior and exterior cleaning.",
      },
      priceNote:
        "Prices apply to compact cars. Medium-sized cars (station wagons, sedans) +10 PLN. Large cars (SUVs, minivans) +30 PLN.",
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
    servicesCta: "View all services",
    pricingCta: "View pricing",
    bookOnline: "Book online",
    pages: {
      services: {
        eyebrow: "Services",
        title: "Everything your car needs",
        description:
          "From everyday hand washing to full detailing: ceramic coatings, PPF film, paint correction and colour change. See what we do at BORUCH Myjnia.",
        detailingLabel: "Detailing",
        detailingTitle: "Detailing studio",
        carwashLabel: "Carwash",
        carwashTitle: "Hand car washing",
        detailing: [
          {
            title: "Wrapping With PPF Film",
            description:
              "We offer professional vehicle wrapping with clear PPF protective film, which effectively protects the paintwork against chips, scratches and other mechanical damage for years.",
          },
          {
            title: "Window And Lamp Tinting",
            description:
              "Enhance the driving comfort and aesthetics of your vehicle by tinting the windows and lamps. This service not only improves the appearance of the car, but also protects against excessive interior heating and UV radiation.",
          },
          {
            title: "Ceramic Coating",
            description:
              "Protect your car's paintwork for years to come with a ceramic coating. It provides protection from the weather, scratches and also makes it easier to keep clean and shiny.",
          },
          {
            title: "Paint Correction, Polishing",
            description:
              "Restore the paintwork to its factory shine by removing minor scratches and dullness. The process includes claying, polishing and paint correction, significantly improving the aesthetics of the vehicle.",
          },
          {
            title: "Colour Change, Dechroming",
            description:
              "Change the look of your car with a film! No need for painting. Choose matte, gloss or satin, and also perform dechroming, changing chrome parts to black or another colour. A modern look and protection in one!",
          },
          {
            title: "Manual Waxing",
            description:
              "Protect your car's paintwork from the elements with manual waxing. This service adds depth of colour, shine and protects the bodywork from minor scratches.",
          },
        ],
        carwash: [
          {
            title: "Detailing Car Washing",
            description:
              "Restore the shine of your bodywork with a manual pre-wash and basic wash, application of a hydrophobic coating, thorough drying, manual rim wash, tyre shine and washing of rubber floor mats. Your car will look like new.",
          },
          {
            title: "Interior Cleaning",
            description:
              "Ensure your driving comfort with a comprehensive interior cleaning. We offer vacuuming of the cabin and boot, cleaning of plastic parts, care of the cockpit and washing of the windows. Your car will regain its freshness and pleasant aroma.",
          },
          {
            title: "Upholstery Washing",
            description:
              "Professional washing of fabric upholstery removes stubborn stains and refreshes the interior of your vehicle. Thanks to our services, your upholstery will regain its original appearance and freshness.",
          },
          {
            title: "Cleaning And Impregnation Of Leather",
            description:
              "Take care of your leather interior with a specialised cleaning and impregnation. This service restores the leather's softness, suppleness and protects it from cracking and fading.",
          },
          {
            title: 'Washing Package "Complete"',
            description:
              "For complete satisfaction, we offer a package combining interior and exterior cleaning. This is a comprehensive detailing service that will ensure your vehicle looks pristine both inside and out.",
          },
        ],
      },
      pricing: {
        eyebrow: "Pricing",
        title: "Transparent pricing, no surprises",
        description: "Below you'll find our indicative prices. The exact amount is always confirmed after seeing the vehicle.",
        otherServicesTitle: "Other services",
        toBeDetermined: "To be determined",
        otherServices: [
          { name: "Upholstery Cleaning", price: "350 PLN" },
          { name: "Leather Cleaning with Conditioning", price: "To be determined" },
          { name: "Car Wrapping with PPF Film, headlights, windows, dechroming", price: "from 350 PLN" },
          { name: "Hand Waxing", price: "400 PLN" },
          { name: "Ceramic Coating Application", price: "To be determined" },
          { name: "Paint Correction, Polishing, Clay Bar Treatment", price: "To be determined" },
          { name: "Window and Headlight Tinting", price: "To be determined" },
          { name: "Colour Change / Dechroming", price: "from 350 PLN" },
        ],
        disclaimer:
          "Prices apply to compact cars (small). Medium-sized cars (station wagons, sedans): +10 PLN to the price. Large cars (SUVs, minivans): +30 PLN to the price. Services marked \"To be determined\" do not have a fixed price — the cost depends on the condition of the paint and the steps needed to achieve a satisfactory result.",
      },
      gallery: {
        eyebrow: "Gallery",
        title: "The results of our work",
        description: "Photos from our hall in Szczecin — hand washing, interior cleaning and detailing projects.",
      },
      about: {
        eyebrow: "About Us",
        title: "We take care of every detail of your car",
        description: "BORUCH Myjnia is a hand car wash and detailing studio run by Karol Bruch, in the very center of Szczecin.",
      },
      contact: {
        eyebrow: "Contact",
        title: "Come visit our hall",
        description: "Plac Rodła 8, PAZIM underground parking, level -2 — in the very center of Szczecin.",
      },
    },
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
        price: "ab 130 PLN*",
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
        price: "ab 110 PLN*",
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
        price: "ab 220 PLN*",
        note: "*abhängig von der Größe des Autos",
        detail: "Detailreinigung des Innenraums zusammen mit einem Außenreinigungspaket",
        discount: "Das Komplettpaket beinhaltet einen Rabatt auf sowohl Innen- als auch Außenreinigung.",
      },
      priceNote:
        "Preise gelten für Kompaktwagen. Aufpreis von 10 PLN für Mittelklassefahrzeuge (Kombis, Limousinen) und 30 PLN für große Fahrzeuge (SUVs, Minivan).",
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
    servicesCta: "Alle Angebote ansehen",
    pricingCta: "Preise ansehen",
    bookOnline: "Online buchen",
    pages: {
      services: {
        eyebrow: "Angebote",
        title: "Alles, was Ihr Auto braucht",
        description:
          "Von der täglichen Handwäsche bis zum kompletten Detailing: Keramikbeschichtungen, PPF-Folie, Lackkorrektur und Farbwechsel. Sehen Sie, was wir bei BORUCH Myjnia anbieten.",
        detailingLabel: "Detailing",
        detailingTitle: "Detailing-Studio",
        carwashLabel: "Autowäsche",
        carwashTitle: "Handwäsche",
        detailing: [
          {
            title: "Fahrzeugvollverklebung mit PPF-Folie",
            description:
              "Wir bieten eine professionelle Fahrzeugvollverklebung mit klarer PPF-Schutzfolie an, die den Lack über Jahre hinweg wirksam vor Absplitterungen, Kratzern und anderen mechanischen Beschädigungen schützt.",
          },
          {
            title: "Tönung von Fenstern und Lampen",
            description:
              "Verbessern Sie den Fahrkomfort und die Ästhetik Ihres Fahrzeugs durch Tönung der Scheiben und Lampen. Dieser Service verbessert nicht nur das Aussehen des Fahrzeugs, sondern schützt auch vor übermäßiger Aufheizung des Innenraums und UV-Strahlung.",
          },
          {
            title: "Keramische Beschichtung",
            description:
              "Schützen Sie den Lack Ihres Fahrzeugs auf Jahre hinaus mit einer Keramikbeschichtung. Sie bietet Schutz vor Witterungseinflüssen und Kratzern und macht es einfacher, sie sauber und glänzend zu halten.",
          },
          {
            title: "Lackkorrektur, Polieren",
            description:
              "Bringen Sie den Lack wieder auf Hochglanz, indem Sie kleine Kratzer und stumpfe Stellen entfernen. Das Verfahren umfasst Tonen, Polieren und Lackkorrekturen und verbessert die Ästhetik des Fahrzeugs erheblich.",
          },
          {
            title: "Farbwechsel, Entchromen",
            description:
              "Verändern Sie das Aussehen Ihres Autos mit einer Folie! Sie brauchen nicht zu lackieren. Wählen Sie zwischen matt, glänzend oder satiniert, und führen Sie auch eine Entchromung durch, bei der Chromteile in Schwarz oder eine andere Farbe umgewandelt werden. Ein modernes Aussehen und Schutz in einem!",
          },
          {
            title: "Wachsen des Autos von Hand",
            description:
              "Schützen Sie den Lack Ihres Fahrzeugs mit einer manuellen Wachsaufbereitung vor den Elementen. Dieser Service verleiht dem Lack Tiefe und Glanz und schützt die Karosserie vor kleinen Kratzern.",
          },
        ],
        carwash: [
          {
            title: "Detailing Autowäsche",
            description:
              "Stellen Sie den Glanz Ihrer Karosserie mit einer manuellen Vor- und Grundwäsche, dem Auftragen einer wasserabweisenden Beschichtung, einer gründlichen Trocknung, einer manuellen Felgenwäsche, einer Reifenwäsche und einer Wäsche der Gummifußmatten wieder her. Ihr Auto wird wie neu aussehen.",
          },
          {
            title: "Innenreinigung",
            description:
              "Sichern Sie sich Ihren Fahrkomfort mit einer umfassenden Innenreinigung. Wir bieten Staubsaugen des Innenraums und des Kofferraums, Reinigung von Kunststoffteilen, Pflege des Cockpits und Waschen der Scheiben. Ihr Auto wird seine Frische und sein angenehmes Aroma zurückgewinnen.",
          },
          {
            title: "Polsterung Waschen",
            description:
              "Die professionelle Wäsche von Stoffpolstern entfernt hartnäckige Flecken und frischt den Innenraum Ihres Fahrzeugs auf. Dank unserer Dienstleistungen erhalten Ihre Polster ihr ursprüngliches Aussehen und ihre Frische zurück.",
          },
          {
            title: "Reinigung und Imprägnierung von Leder",
            description:
              "Pflegen Sie Ihr Lederinterieur mit einer speziellen Reinigung und Imprägnierung. Dieser Service stellt die Weichheit und Geschmeidigkeit des Leders wieder her und schützt es vor Rissbildung und Ausbleichen.",
          },
          {
            title: "Paket Komplett",
            description:
              "Damit Sie rundum zufrieden sind, bieten wir Ihnen ein Paket aus Innen- und Außenreinigung an. Dies ist ein umfassender Reinigungsservice, der dafür sorgt, dass Ihr Fahrzeug sowohl innen als auch außen tadellos aussieht.",
          },
        ],
      },
      pricing: {
        eyebrow: "Preise",
        title: "Transparente Preise ohne Überraschungen",
        description: "Nachfolgend finden Sie unsere Richtpreise. Den genauen Betrag bestätigen wir immer nach Besichtigung des Fahrzeugs.",
        otherServicesTitle: "Weitere Dienstleistungen",
        toBeDetermined: "Nach Vereinbarung",
        otherServices: [
          { name: "Polsterreinigung", price: "350 PLN" },
          { name: "Lederreinigung mit Pflege", price: "Nach Vereinbarung" },
          { name: "Fahrzeugfolierung mit PPF-Folie, Scheinwerfer, Fenster, Dekromierung", price: "ab 350 PLN" },
          { name: "Handwachsbehandlung", price: "400 PLN" },
          { name: "Anwendung von Keramikbeschichtung", price: "Nach Vereinbarung" },
          { name: "Lackkorrektur, Polieren, Clay-Bar-Behandlung", price: "Nach Vereinbarung" },
          { name: "Tönung von Fenstern und Scheinwerfern", price: "Nach Vereinbarung" },
          { name: "Farbwechsel / Entchromen", price: "ab 350 PLN" },
        ],
        disclaimer:
          "Preise für Kompaktwagen. Aufpreis von 10 PLN für Mittelklassefahrzeuge und 30 PLN für große Fahrzeuge. Dienstleistungen „Nach Vereinbarung” haben keinen festen Preis — die Kosten werden basierend auf dem Zustand des Lacks und den erforderlichen Schritten zur Erreichung eines zufriedenstellenden Ergebnisses festgelegt.",
      },
      gallery: {
        eyebrow: "Galerie",
        title: "Die Ergebnisse unserer Arbeit",
        description: "Fotos aus unserer Halle in Stettin — Handwäsche, Innenreinigung und Detailing-Projekte.",
      },
      about: {
        eyebrow: "Über uns",
        title: "Wir kümmern uns um jedes Detail Ihres Autos",
        description: "BORUCH Myjnia ist eine Handwäsche und ein Detailing-Studio, geführt von Karol Bruch, im Zentrum von Stettin.",
      },
      contact: {
        eyebrow: "Kontakt",
        title: "Besuchen Sie unsere Halle",
        description: "Plac Rodła 8, PAZIM Tiefgarage, Ebene -2 — im Zentrum von Stettin.",
      },
    },
  },
  uk: {
    htmlLang: "uk",
    metaTitle: "BORUCH Ручна автомийка | Детейлінг та Догляд за автомобілями | Щецин",
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
        price: "від 130 PLN*",
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
        price: "від 110 PLN*",
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
        price: "від 220 PLN*",
        note: "*залежно від розміру автомобіля",
        detail: "Деталізація чищення інтер'єру разом з пакетом чищення екстер'єру",
        discount: "Повний пакет включає знижку на чищення інтер'єру та екстер'єру.",
      },
      priceNote:
        "Ціни діють для компактних авто. Середні авто (універсали, седани) +10 PLN. Великі авто (SUV, мінівени) +30 PLN.",
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
    servicesCta: "Переглянути всі послуги",
    pricingCta: "Переглянути ціни",
    bookOnline: "Забронювати онлайн",
    pages: {
      services: {
        eyebrow: "Послуги",
        title: "Все, що потрібно вашому автомобілю",
        description:
          "Від щоденного ручного миття до повного детейлінгу: керамічні покриття, плівка PPF, корекція лакофарбового покриття та зміна кольору. Дізнайтеся, що ми робимо в BORUCH Myjnia.",
        detailingLabel: "Детейлінг",
        detailingTitle: "Студія детейлінгу",
        carwashLabel: "Автомийка",
        carwashTitle: "Ручне миття",
        detailing: [
          {
            title: "Обгортання автомобілів плівкою PPF",
            description:
              "Ми пропонуємо професійне обклеювання автомобілів прозорою захисною плівкою PPF, яка ефективно захищає лакофарбове покриття від сколів, подряпин та інших механічних пошкоджень на довгі роки.",
          },
          {
            title: "Тонування вікон та ліхтарів",
            description:
              "Підвищіть комфорт водіння та естетичний вигляд вашого автомобіля, затонувавши вікна та ліхтарі. Ця послуга не тільки покращує зовнішній вигляд автомобіля, але й захищає від надмірного нагрівання салону та ультрафіолетового випромінювання.",
          },
          {
            title: "Нанесення керамічного покриття",
            description:
              "Захистіть лакофарбове покриття вашого автомобіля на довгі роки за допомогою керамічного покриття. Воно забезпечує захист від негоди, подряпин, а також дозволяє легко підтримувати чистоту та блиск.",
          },
          {
            title: "Корекція фарби, полірування",
            description:
              "Відновлення заводського блиску лакофарбового покриття шляхом усунення дрібних подряпин і тьмяності. Процес включає в себе глинування, полірування та корекцію фарби, що значно покращує естетичний вигляд автомобіля.",
          },
          {
            title: "Зміна кольору, дехромування",
            description:
              "Змініть зовнішній вигляд свого автомобіля за допомогою плівки! Не потрібно фарбувати. Обирайте матову, глянцеву або сатинову плівку, а також виконуйте дехромінг — заміну хромованих деталей на чорний або інший колір. Сучасний вигляд і захист в одному флаконі!",
          },
          {
            title: "Ручне воскування",
            description:
              "Захистіть лакофарбове покриття вашого автомобіля від впливу навколишнього середовища за допомогою ручного воскування. Ця послуга додає глибину кольору, блиск і захищає кузов від дрібних подряпин.",
          },
        ],
        carwash: [
          {
            title: "Детальна мийка автомобілів",
            description:
              "Відновіть блиск кузова за допомогою ручної попередньої та основної мийки, нанесення гідрофобного покриття, ретельного сушіння, ручного миття колісних дисків, блиску шин та миття гумових килимків. Ваш автомобіль буде виглядати як новий.",
          },
          {
            title: "Прибирання інтер'єру",
            description:
              "Забезпечте собі комфорт під час водіння за допомогою комплексного прибирання салону. Ми пропонуємо пилосос салону та багажника, чистку пластикових деталей, догляд за кабіною та миття вікон. Ваш автомобіль знову набуде свіжості та приємного аромату.",
          },
          {
            title: "Чистка автомобільної оббивки",
            description:
              "Професійне прання тканинної оббивки видаляє стійкі плями і освіжає салон вашого автомобіля. Завдяки нашим послугам ваша оббивка поверне собі первісний вигляд і свіжість.",
          },
          {
            title: "Очищення та просочення шкіри",
            description:
              "Подбайте про свій шкіряний салон за допомогою спеціалізованої чистки та просочення. Ця послуга повертає шкірі м'якість, еластичність і захищає її від розтріскування та вицвітання.",
          },
          {
            title: "Повний пакет",
            description:
              "Для повного задоволення ми пропонуємо пакет, що поєднує внутрішнє та зовнішнє очищення. Це комплексна послуга, яка забезпечить бездоганний вигляд вашого автомобіля як зовні, так і всередині.",
          },
        ],
      },
      pricing: {
        eyebrow: "Ціни",
        title: "Прозорі ціни без несподіванок",
        description: "Нижче наведено орієнтовні ціни на наші послуги. Точну суму ми завжди підтверджуємо після огляду автомобіля.",
        otherServicesTitle: "Інші послуги",
        toBeDetermined: "Ціна узгоджується",
        otherServices: [
          { name: "Чистка оббивки", price: "350 PLN" },
          { name: "Чистка шкіри з кондиціюванням", price: "Ціна узгоджується" },
          { name: "Обгортання автомобіля плівкою PPF, фари, вікна, декромування", price: "від 350 PLN" },
          { name: "Вощення вручну", price: "400 PLN" },
          { name: "Нанесення керамічного покриття", price: "Ціна узгоджується" },
          { name: "Корекція фарби, полірування, обробка глиною", price: "Ціна узгоджується" },
          { name: "Тонування вікон та фар", price: "Ціна узгоджується" },
          { name: "Зміна кольору / Дехромування", price: "від 350 PLN" },
        ],
        disclaimer:
          "Ціни для компактних автомобілів. Для середніх авто +10 PLN, для великих +30 PLN. Послуги «Ціна узгоджується» не мають фіксованої ціни — вартість визначається залежно від стану фарби та необхідних етапів для досягнення задовільного результату.",
      },
      gallery: {
        eyebrow: "Галерея",
        title: "Результати нашої роботи",
        description: "Фотографії з нашої зали в Щецині — ручне миття, чищення салону та проекти детейлінгу.",
      },
      about: {
        eyebrow: "Про нас",
        title: "Ми дбаємо про кожну деталь вашого автомобіля",
        description: "BORUCH Myjnia — це ручна автомийка та студія детейлінгу, якою керує Karol Bruch, у самому центрі Щецина.",
      },
      contact: {
        eyebrow: "Контакти",
        title: "Запрошуємо до нашої зали",
        description: "Plac Rodła 8, підземний паркінг PAZIM, рівень -2 — у самому центрі Щецина.",
      },
    },
  },
} as const

export type LocaleDictionary = (typeof localeDictionaries)[Locale]
