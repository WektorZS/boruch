# Audyt treści i wdrożenia

Stan na 29.09.2026.

## Audyt wejściowy

- Typografia była zbyt kampanijna. Bardzo duże, szerokie i często wersalikowe nagłówki pojawiały się w prawie każdej sekcji, przez co znikała hierarchia.
- Większość podstron korzystała z podobnego schematu: mała etykieta, ogromny tytuł, cienka linia i fotografia. Strony miały inny tekst, ale ten sam rytm.
- Czerń dominowała niemal bez przerwy, ale bez wystarczającego zróżnicowania grafitu, bordo i głębokiej czerwieni. Sekcje zlewały się w jedną płaską powierzchnię.
- Lista usług była efektowna, ale na desktopie zbyt mocno opierała się na stanie aktywnym i dużej typografii. Katalog usług nie miał wystarczająco czytelnej hierarchii treści.
- Cennik był poprawny informacyjnie, ale pakiety nie tworzyły szybkiego porównania. Użytkownik musiał czytać długie wiersze zamiast trzech wyraźnych ofert.
- Galeria miała zbyt wiele różnych przesunięć i proporcji. Fotografie konkurowały ze sobą zamiast tworzyć uporządkowane portfolio.
- Strona `O nas` używała tekstów źródłowych jako kolejnych dużych manifestów. Brakowało spokojniejszego tempa i kontrastu między opowieścią a zdjęciami.
- `/booksy` pozostawało w starszym systemie komponentów i wizualnie odstawało od reszty serwisu.

## Kierunek wizualny

- Cały interfejs opiera się na czerni, antracycie, ciemnym bordo i kontrolowanej czerwieni. Nie ma jasnych sekcji ani mocnych białych powierzchni.
- Poszczególne bloki rozdzielają delikatne różnice tonalne, cienkie obramowania i fotografie, dzięki czemu strona pozostaje ciemna bez zlewania się sekcji.
- Wprowadzono zwężoną, mocną typografię inspirowaną branżą motoryzacyjną. Największe nagłówki pozostają w hero, a pozostałe poziomy mają wyraźną hierarchię.
- Numeracja została usunięta z kart usług, pakietów, sekcji i nagłówków. Zostaje wyłącznie tam, gdzie przekazuje kolejność, czyli w etapach usługi i liczniku zdjęć w podglądzie galerii.
- Zmniejszono liczbę przypadkowych offsetów. Układ opiera się na spójnej siatce 12 kolumn, stałych odstępach i kontrolowanych proporcjach zdjęć.
- Fotografie są większe, spokojniejsze i częściej pełnią konkretną rolę: otwarcie strony, dokumentacja realizacji, portret zespołu lub tło wezwania do działania.
- Ruch został ograniczony do wejścia hero, łagodnych odsłonięć sekcji, masek zdjęć, przejść galerii i informacji zwrotnej na przyciskach.

## Zakres przebudowy

- Strona główna została napisana od zera i nie korzysta ze wspólnego nagłówka ani stopki podstron.
- Nowy home ma asymetryczne hero, własną nawigację, manifest marki, wierszowy indeks usług, nowy układ realizacji, poziome porównanie pakietów, opowieść o zespole, moduł lokalizacji PAZIM -2, końcowe CTA i uproszczoną stopkę.
- Zachowano treści źródłowe, fotografie BORUCH, ceny, dane kontaktowe, Booksy i wszystkie odnośniki.
- Strona główna nie używa numeracji dekoracyjnej. Wartość -2 oznacza rzeczywisty poziom parkingu PAZIM.
- Przebudowano `/uslugi`, `/cennik`, `/galeria`, `/o-nas`, `/kontakt` oraz `/booksy`.
- Ujednolicono wszystkie polskie strony szczegółowych usług.
- Wszystkie podstawowe strony EN, DE i UA korzystają z tych samych szablonów, nagłówka, stopki, animacji, galerii i CTA co wersja polska.
- Sekcje każdej podstrony zostały zebrane w jednym pliku szablonu, aby późniejsza edycja wyglądu i kolejności nie wymagała przechodzenia między wieloma komponentami.
- Zachowano statyczny eksport Next.js oraz wszystkie istniejące adresy URL.

## Organizacja plików do edycji

- Strona główna: `components/home-page.tsx`.
- Usługi: `components/services-page.tsx`.
- Cennik: `components/pricing-page.tsx`.
- Galeria: `components/gallery-page.tsx`.
- O nas: `components/about-page.tsx`.
- Kontakt: `components/contact-page.tsx`.
- Wszystkie polskie strony pojedynczych usług: `components/service-page.tsx`.
- Booksy: `app/booksy/page.tsx`.
- Osobno pozostały tylko elementy wspólne dla całej witryny oraz interaktywny moduł galerii, który wymaga granicy klienta w Next.js.
- Usunięto poprzedni, nieużywany zestaw komponentów oraz stare pliki danych, które pozostały po wcześniejszej wersji witryny.
- Aktualna struktura odpowiada układowi projektu `golet`: trasy w `app`, kompletne strony i elementy wspólne w `components`, a dane w `lib`.

## Źródła treści

- Treści stron pochodzą z plików `lib/content/generated/pl.ts`, `en.ts`, `de.ts` i `uk.ts`.
- Polskie strony szczegółowych usług korzystają z `lib/content/generated/services-pl.ts`.
- Treści źródłowe nie zostały skrócone, parafrazowane ani zastąpione nowym tekstem marketingowym.
- Dane kontaktowe, Booksy, routing, języki i ceny pozostają scentralizowane.

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

- Fizyczne pliki ukraińskich tras w eksporcie pozostają zakodowane procentowo.
- Linki widoczne w przeglądarce zachowują właściwe ukraińskie adresy.
- Każda podstawowa strona ma jeden H1 i właściwy kontekst językowy.

## SEO i architektura

- Kanoniczna domena to `https://boruchmyjnia.pl`.
- Każda podstawowa strona ma własny tytuł, opis i canonical.
- Podstawowe odpowiedniki językowe mają `pl-PL`, `en`, `de`, `uk` oraz `x-default`.
- `x-default` prowadzi do polskiej wersji.
- Szczegółowe polskie strony usług nie otrzymały fałszywych odpowiedników językowych.
- Zachowano dane strukturalne firmy, breadcrumbs i dane usług.
- Zachowano `output: "export"`. Produkcyjny katalog `out/` nie wymaga serwera Node.js, API, middleware, SSR, ISR ani funkcji Vercel.

## Mobile, dostępność i ruch

- Menu mobilne działa jako pełnoekranowy panel, obsługuje Escape, przenosi fokus na przycisk zamknięcia i oddaje go po zamknięciu.
- Karty usług na telefonie mają własne zdjęcia, opis i cenę. Nie wymagają hovera.
- Galeria ma powtarzalny rytm czterech zdjęć, małe odstępy i dialogowy lightbox ze sterowaniem klawiaturą oraz gestem przesunięcia.
- Elementy z `data-reveal` obsługuje jeden `IntersectionObserver`.
- Dla `prefers-reduced-motion: reduce` animacje i przejścia są skracane, a treści pozostają widoczne.
- Długie niemieckie i ukraińskie nagłówki mieszczą się bez poziomego przewijania.

## Weryfikacja

- Sprawdzono kluczowe szablony i przejścia między wersjami PL, EN, DE i UA.
- Wizualnie sprawdzono stronę główną i cennik, w tym hero, kontrast, typografię, nawigację, sekcje treści oraz stopkę.
- Potwierdzono, że nieużywana numeracja nie wróciła do kart ani nagłówków.
- `tsc --noEmit` kończy się bez błędów.
- `pnpm build` kończy się poprawnie i generuje 42 statyczne wpisy.
- `git diff --check` kończy się bez błędów formatowania.

## Otwarte kwestie właścicielskie

- Grupowana pozycja dotycząca PPF, lamp, szyb i dechromingu pozostaje bez rozbijania na ceny pojedynczych usług.
- Nowe godziny otwarcia lub inne dane biznesowe należy dodać dopiero po potwierdzeniu przez właściciela.
