# Audyt treści i wdrożenia

Stan na 30.09.2026.

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

- Tła sekcji wykorzystują wyłącznie czerń i ciemny grafit. Bordo oraz czerwień pełnią rolę koloru głównego w przyciskach, liniach, ikonach i wybranych fragmentach tekstu.
- Poszczególne bloki rozdzielają delikatne różnice tonalne, cienkie obramowania i fotografie, dzięki czemu strona pozostaje ciemna bez zlewania się sekcji.
- Wprowadzono zwężoną, mocną typografię inspirowaną branżą motoryzacyjną. Największe nagłówki pozostają w hero, a pozostałe poziomy mają wyraźną hierarchię.
- Numeracja została usunięta z kart usług, pakietów, sekcji i nagłówków. Zostaje wyłącznie tam, gdzie przekazuje kolejność, czyli w etapach usługi i liczniku zdjęć w podglądzie galerii.
- Zmniejszono liczbę przypadkowych offsetów. Układ opiera się na spójnej siatce 12 kolumn, stałych odstępach i kontrolowanych proporcjach zdjęć.
- Fotografie są większe, spokojniejsze i częściej pełnią konkretną rolę: otwarcie strony, dokumentacja realizacji, portret zespołu lub tło wezwania do działania.
- Ruch został ograniczony do wejścia hero, łagodnych odsłonięć sekcji, masek zdjęć, przejść galerii i informacji zwrotnej na przyciskach.

## Zakres przebudowy

- Strona główna została napisana od zera i nie korzysta ze wspólnego nagłówka ani stopki podstron.
- Nowy home ma poszerzone asymetryczne hero, własną nawigację, sekcję konkretnych korzyści, wierszowy indeks usług, pełną siatkę realizacji, trzy porównywalne pakiety, krótką opowieść o zespole, opinie klientów, FAQ, moduł lokalizacji PAZIM -2, formularz kontaktowy i uproszczoną stopkę.
- Usunięto powtórzony manifest o zespole, dekoracyjny moduł -2 z hero oraz ogólne hasła, które nie pomagały wybrać usługi.
- Zachowano treści źródłowe, fotografie BORUCH, ceny, dane kontaktowe, Booksy i wszystkie odnośniki.
- Uporządkowano odpowiedzialność stron: home pokazuje ceny tylko trzech głównych pakietów myjni, strona Usługi opisuje ofertę i prowadzi do kart szczegółowych, a pełna lista cen znajduje się wyłącznie w Cenniku.
- Strona główna nie używa numeracji dekoracyjnej. Wartość -2 oznacza rzeczywisty poziom parkingu PAZIM.
- Przebudowano `/uslugi`, `/cennik`, `/galeria`, `/o-nas`, `/kontakt` oraz `/booksy`.
- Ujednolicono wszystkie polskie strony szczegółowych usług.
- Wszystkie podstawowe strony EN, DE i UA korzystają z tych samych szablonów, nagłówka, stopki, animacji, galerii i CTA co wersja polska.
- Sekcje każdej podstrony zostały zebrane w jednym pliku szablonu, aby późniejsza edycja wyglądu i kolejności nie wymagała przechodzenia między wieloma komponentami.
- Zachowano statyczny eksport Next.js oraz wszystkie istniejące adresy URL. Formularz korzysta z osobnej funkcji Vercel, więc same strony nadal pozostają statyczne.

## Organizacja plików do edycji

- Strona główna: `components/home-page.tsx`.
- Interaktywna obsługa formularza strony głównej: `components/home-contact-form.tsx`.
- Bezpieczna wysyłka formularza przez Resend: `api/contact.ts`.
- Usługi: `components/services-page.tsx`.
- Cennik: `components/pricing-page.tsx`.
- Galeria: `components/gallery-page.tsx`.
- O nas: `components/about-page.tsx`.
- Kontakt: `components/contact-page.tsx`.
- Wszystkie polskie strony pojedynczych usług: `components/service-page.tsx`.
- Booksy: `app/booksy/page.tsx`.
- Osobno pozostały tylko elementy wspólne dla całej witryny oraz moduły interaktywne, które wymagają granicy klienta w Next.js. Układ i treść wszystkich sekcji strony głównej nadal znajdują się w jednym pliku `components/home-page.tsx`.
- Usunięto poprzedni, nieużywany zestaw komponentów oraz stare pliki danych, które pozostały po wcześniejszej wersji witryny.
- Aktualna struktura odpowiada układowi projektu `golet`: trasy w `app`, kompletne strony i elementy wspólne w `components`, a dane w `lib`.

## Źródła treści

- Treści stron pochodzą z plików `lib/content/generated/pl.ts`, `en.ts`, `de.ts` i `uk.ts`.
- Polskie strony szczegółowych usług korzystają z `lib/content/generated/services-pl.ts`.
- Treści źródłowe pozostają podstawą stron. Na stronie głównej dopisano krótkie, konkretne treści do opinii, FAQ i formularza.
- Dane kontaktowe, Booksy, routing, języki i ceny pozostają scentralizowane.

## Cennik

- Cennik korzysta z pełnej listy przekazanej z Booksy i pokazuje cenę początkową oraz szacunkowy czas wykonania każdej usługi.
- Mycie zewnętrzne: małe auto od 110 zł, średnie od 120 zł, duże od 140 zł. Szacunkowy czas: 1 godzina.
- Czyszczenie wnętrza: małe auto od 130 zł, średnie od 140 zł, duże od 160 zł. Szacunkowy czas: 1 godzina.
- Komplet: małe auto od 220 zł, średnie od 240 zł, duże od 260 zł. Szacunkowy czas: 2 godziny.
- Auto z dodatkową powłoką ochronną wymaga innych środków myjących. Do mycia zewnętrznego doliczane jest 20 zł.
- Dodano ręczne woskowanie, niewidzialną wycieraczkę, serwis powłoki ceramicznej, pranie tapicerki, czyszczenie skór, folie, korektę i polerowanie, powłoki oraz dechroming.
- Pakiet Sprzedaż Standard kosztuje od 1000 zł, a Premium z korektą lakieru od 1400 zł. Oba mają szacunkowy czas 4 godzin.
- Wszystkie kwoty są cenami od dla przeciętnie zabrudzonego auta. Przy ponadstandardowym zabrudzeniu klient otrzymuje informację o możliwej zmianie ceny przed rozpoczęciem pracy.
- Usługi oznaczone w Booksy jako zmienne pozostały wyceniane indywidualnie. Nie dodano do nich wymyślonych kwot.

## Dane firmy

- Adres: Plac Rodła 8, parking podziemny PAZIM, poziom -2, 70-419 Szczecin.
- Telefon: +48 534 095 265.
- E-mail: bruchkarol@gmail.com.
- Wszystkie przyciski rezerwacji prowadzą do jednego adresu Booksy z `lib/content/index.ts`.
- Sekcja opinii prezentuje oceny Booksy i Google oraz 16 zweryfikowanych opinii podanych przez właściciela. Opinie działają jako płynna, zapętlona karuzela z pełną treścią w oknie dialogowym.

## Formularz i Resend

- Formularz działa z czystego frontendu i wysyła dane do funkcji Vercel pod `/api/contact`.
- Klucz Resend nigdy nie trafia do kodu przeglądarki ani statycznego katalogu `out`.
- Endpoint sprawdza origin, typ i rozmiar żądania, waliduje każde pole, ogranicza długość danych, stosuje honeypot, minimalny czas wypełnienia, podstawowy limit żądań i klucz idempotencji Resend.
- Wiadomość jest wysyłana wyłącznie na adres z `CONTACT_NOTIFICATION_EMAIL`. Adres klienta trafia do bezpiecznego pola odpowiedzi `reply_to`.
- Wymagane zmienne środowiskowe są opisane w `.env.example` oraz `STATIC-HOSTING.md`.

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
- Zachowano `output: "export"`. Produkcyjny katalog `out/` nie wymaga stałego serwera Node.js, SSR ani ISR. Jedynym elementem wykonywanym po stronie serwera jest mała funkcja formularza, skalowana do zera przez Vercel.

## Mobile, dostępność i ruch

- Menu mobilne strony głównej i podstron korzysta z tego samego czytelnego przycisku `MENU / ZAMKNIJ`. Oba warianty otwierają pełnoekranowy, nieprześwitujący panel.
- Karty na stronie Usługi są opisowe i nie powielają cen z Cennika. Każda polska pozycja prowadzi do przygotowanej karty szczegółowej usługi.
- Galeria ma powtarzalny rytm czterech zdjęć, małe odstępy i dialogowy lightbox ze sterowaniem klawiaturą oraz gestem przesunięcia.
- Elementy z `data-reveal` obsługuje jeden `IntersectionObserver`.
- Dla `prefers-reduced-motion: reduce` animacje i przejścia są skracane, a treści pozostają widoczne.
- Długie niemieckie i ukraińskie nagłówki mieszczą się bez poziomego przewijania.
- Usunięto poziome przewijanie powodowane przez długi nagłówek sekcji na małym ekranie.
- Cookies, wybór języka i pływający kontakt są montowane globalnie, dlatego działają na stronie głównej, wszystkich podstronach oraz we wszystkich wersjach językowych.
- Linki do Facebooka i Instagrama korzystają z rozpoznawalnych ikon w hero, obu stopkach, sekcji O nas, podstronie O nas, Kontakcie i Galerii. Z hero usunięto dekoracyjne wskaźniki slajdów, pozostawiając automatyczną zmianę zdjęć.
- Kontakt i O nas otrzymały nowe układy od zera, a Usługi, Cennik, Galeria, Booksy i wszystkie strony szczegółowe usług zostały dopasowane do systemu strony głównej.
- Cennik korzysta z tej samej listy danych co strona Usługi i pokazuje wszystkie 11 pozycji w dwóch tradycyjnych tabelach: Myjnia i Detailing.
- Strona główna zachowuje trzy ceny potrzebne do szybkiego porównania: czyszczenie zewnętrzne, czyszczenie wnętrza i komplet.
- Podstrony mają jedno wspólne wezwanie do kontaktu w stopce. Usunięto powielone sekcje kontaktowe z treści stron.

## Weryfikacja

- Sprawdzono kluczowe szablony i przejścia między wersjami PL, EN, DE i UA.
- Wizualnie sprawdzono stronę główną, Usługi i Cennik, w tym hero, kontrast, typografię, nawigację, sekcje treści oraz stopkę.
- Na szerokości 390 px sprawdzono otwieranie pełnoekranowego menu na stronie głównej i podstronie Usługi.
- Sprawdzono nowe hero, opinie, FAQ i formularz na szerokości 1440 px oraz 390 px.
- Potwierdzono rozwijanie odpowiedzi w FAQ.
- Potwierdzono, że nieużywana numeracja nie wróciła do kart ani nagłówków.
- `tsc --noEmit` kończy się bez błędów.
- `pnpm build` kończy się poprawnie i generuje 42 statyczne wpisy.
- `git diff --check` kończy się bez błędów formatowania.

## Otwarte kwestie właścicielskie

- Grupowana pozycja dotycząca PPF, lamp, szyb i dechromingu pozostaje bez rozbijania na ceny pojedynczych usług.
- Nowe godziny otwarcia lub inne dane biznesowe należy dodać dopiero po potwierdzeniu przez właściciela.
- Przed uruchomieniem formularza na produkcji trzeba uzupełnić zmienne Resend w panelu Vercel i dodać regułę limitu dla ścieżki `/api/contact` w Vercel Firewall.
