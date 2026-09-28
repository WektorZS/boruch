# Audyt treści i wdrożenia

Stan na 28.09.2026.

## Zakres tej aktualizacji

- Przebudowano strony `/uslugi`, `/cennik`, `/galeria`, `/o-nas` i `/kontakt` na wspólnym systemie wizualnym BORUCH.
- Wszystkie podstawowe strony EN, DE i UA korzystają z tych samych szablonów, nagłówka, stopki, animacji, galerii i CTA co polska wersja.
- Zachowano statyczny eksport Next.js oraz istniejące adresy URL.
- Uzupełniono sitemapę o wszystkie podstawowe podstrony językowe.

## Źródła treści

- Treści stron pochodzą z plików `lib/content/generated/pl.ts`, `en.ts`, `de.ts` i `uk.ts`.
- Polskie strony szczegółowych usług korzystają z `lib/content/generated/services-pl.ts`.
- Treści źródłowe nie zostały skrócone ani zastąpione nowym tekstem marketingowym.
- Dane powtarzalne, w tym kontakt, Booksy, routing, języki i ceny usług, pozostają scentralizowane.

## Cennik

- Czyszczenie zewnętrzne: od 110 zł.
- Czyszczenie wnętrza: od 130 zł.
- Komplet: od 220 zł.
- Dopłata dla auta średniego: 10 zł.
- Dopłata dla dużego auta: 30 zł.
- Dopłaty za rozmiar są prezentowane przy pakietach mycia, a nie automatycznie przy każdej usłudze detailingowej.
- PPF, korekta lakieru, powłoka ceramiczna, przyciemnianie oraz zmiana koloru nie otrzymały wymyślonych cen indywidualnych.

## Dane firmy

- Adres: Plac Rodła 8, parking podziemny PAZIM, poziom -2, 70-419 Szczecin.
- Telefon: +48 534 095 265.
- E-mail: bruchkarol@gmail.com.
- Wszystkie przyciski rezerwacji prowadzą do jednego adresu Booksy z `lib/content/index.ts`.
- Nie dodano nowych godzin otwarcia, ocen, nagród, certyfikatów, gwarancji ani statystyk firmy.

## Routing i języki

| Wersja | Strona główna | Usługi | Cennik | Galeria | O nas | Kontakt |
| --- | --- | --- | --- | --- | --- | --- |
| PL | `/` | `/uslugi` | `/cennik` | `/galeria` | `/o-nas` | `/kontakt` |
| EN | `/en` | `/en/services` | `/en/pricing` | `/en/gallery` | `/en/about-us` | `/en/contact` |
| DE | `/de` | `/de/angebote` | `/de/preise` | `/de/galerie` | `/de/uber-uns` | `/de/kontakt` |
| UA | `/uk` | `/uk/послуги` | `/uk/ціни` | `/uk/галерея` | `/uk/про-нас` | `/uk/контакти` |

- Fizyczne katalogi ukraińskich tras pozostają zakodowane procentowo.
- Linki widoczne w przeglądarce zachowują właściwe ukraińskie adresy.
- Każda podstawowa strona ma jeden nagłówek H1 oraz właściwy kontekst językowy dla PL, EN, DE i UA.

## SEO

- Kanoniczna domena to `https://boruchmyjnia.pl`.
- Każda podstawowa strona korzysta ze wspólnego generatora metadanych i własnego tytułu oraz opisu.
- Podstawowe odpowiedniki językowe mają `pl-PL`, `en`, `de`, `uk` oraz `x-default`.
- `x-default` prowadzi do polskiej wersji.
- Szczegółowe polskie strony usług nie otrzymały fałszywych odpowiedników językowych.
- `sitemap.xml` obejmuje podstawowe strony wszystkich czterech języków, `/booksy` oraz szczegółowe polskie usługi.
- `robots.txt` wskazuje produkcyjną sitemapę i nie blokuje indeksowania.

## UI, dostępność i ruch

- Wszystkie przebudowane strony korzystają z jednego systemu kolorów, typografii, odstępów, przycisków i fotografii.
- Poprawiono zawijanie długich niemieckich i ukraińskich słów bez poziomego przewijania.
- Menu mobilne przenosi fokus na przycisk zamknięcia, zamyka się klawiszem Escape i oddaje fokus przyciskowi menu.
- Galeria ma dialogowy lightbox, sterowanie klawiaturą, przyciski poprzedniego i następnego zdjęcia oraz zamykanie klawiszem Escape.
- Elementy z `data-reveal` są obsługiwane przez jeden `IntersectionObserver`.
- Dla `prefers-reduced-motion: reduce` animacje i przejścia są skracane, a treści pozostają widoczne.

## Weryfikacja

- Sprawdzono 24 podstawowe trasy PL, EN, DE i UA.
- Sprawdzono H1, canonical, hreflang, aktywny system UI i brak poziomego przepełnienia.
- Sprawdzono szerokości 360, 390, 430, 768, 1024, 1440 i 1920 px.
- Łącznie wykonano 63 testy układu dla głównych szablonów i wersji językowych.
- Sprawdzono animacje po przewinięciu, menu mobilne oraz lightbox galerii.
- `tsc --noEmit` kończy się bez błędów.
- `pnpm build` kończy się poprawnie i generuje 42 statyczne wpisy w katalogu `out/`.
- Sitemapa zawiera 37 publicznych adresów produkcyjnych i nie zawiera domeny podglądowej Vercel.
- Produkcyjny katalog `out/` nie wymaga serwera Node.js.

## Otwarte kwestie właścicielskie

- Grupowana pozycja dotycząca PPF, lamp, szyb i dechromingu pozostaje bez rozbijania na ceny pojedynczych usług.
- Nowe godziny otwarcia lub inne dane biznesowe należy dodać dopiero po potwierdzeniu przez właściciela.
