# BORUCH

Strona internetowa BORUCH Myjnia i Detailing w Szczecinie.

## Najważniejsze pliki do edycji

- Strona główna: `components/home-page.tsx`
- Usługi: `components/services-page.tsx`
- Cennik: `components/pricing-page.tsx`
- Galeria: `components/gallery-page.tsx`
- O nas: `components/about-page.tsx`
- Kontakt: `components/contact-page.tsx`
- Wszystkie strony pojedynczych usług: `components/service-page.tsx`
- Booksy: `app/booksy/page.tsx`
- Style całej witryny: `app/globals.css`
- Treści i tłumaczenia: `lib/content`
- Lista zdjęć: `lib/photos.ts`

## Organizacja projektu

- `app` zawiera trasy strony, metadane oraz pliki techniczne Next.js.
- `components` zawiera kompletne podstrony i wspólne elementy witryny.
- `components/ui` zawiera małe, uniwersalne elementy interfejsu.
- `lib/content` zawiera treści polskie, angielskie, niemieckie i ukraińskie.
- `public` zawiera zdjęcia, ikony i pozostałe pliki statyczne.

Pliki `gallery-portfolio.tsx`, `site-header.tsx` i `motion-observer.tsx` pozostają osobno, ponieważ zawierają interakcje wykonywane w przeglądarce. Pozostałe sekcje każdej podstrony znajdują się w jednym pliku danej strony.

## Uruchomienie

```bash
pnpm install
pnpm dev
```

Wersja produkcyjna:

```bash
pnpm build
```

## Hosting statyczny i przenoszenie

Projekt używa `output: 'export'` i `trailingSlash: true`. Po kompilacji cała witryna jest w katalogu `out`. Na hosting kopiujesz zawartość tego katalogu, razem z `_next`, `images` i `fonts`. Node.js jest potrzebny do budowania projektu, nie do serwowania strony. Nie uruchamiaj `next start` dla tego eksportu.

Hosting powinien obsługiwać `index.html` w podkatalogach, plik `404.html`, HTTPS oraz kompresję gzip lub Brotli dla HTML, CSS i JS. Nie konfiguruj wszystkich adresów jako przekierowania do głównego `index.html`. Każda podstrona ma własny plik HTML. Ukraińskie adresy również są eksportowane statycznie.

Fonty i fotografie są lokalne. Alex Brush Regular jest używany wyłącznie do podpisu „Karol Bruch”. Osadzona mapa korzysta z Google i wymaga połączenia z ich serwisem. Link do otwarcia lokalizacji działa niezależnie od widżetu.

Przy zmianie domeny zaktualizuj `sourceUrl` w `lib/site-config.ts`, dozwolone domeny formularza i ewentualny adres endpointu, a następnie wykonaj nowy build. Canonical, sitemap, robots i dane strukturalne korzystają z tej konfiguracji domeny.

## Formularz i Resend

Sam statyczny HTML nie może bezpiecznie wysyłać wiadomości przez Resend z tajnym kluczem API. Frontend jest statyczny, a wysyłkę obsługuje osobny endpoint. Obecny `api/contact.ts` jest funkcją Vercel. Nie znajduje się w `out` i nie zacznie działać po zwykłym skopiowaniu frontendu na hosting plików.

Możesz pozostawić endpoint na Vercel i przenieść frontend na dowolny hosting statyczny:

1. W środowisku budowania ustaw `NEXT_PUBLIC_CONTACT_ENDPOINT` na pełny publiczny adres endpointu, np. `https://twoje-api.example.com/api/contact`.
2. W środowisku endpointu ustaw `CONTACT_ALLOWED_ORIGINS` na dokładne adresy nowej strony, z protokołem, bez końcowego `/`. Kilka adresów rozdziel przecinkami.
3. Tylko w środowisku endpointu ustaw `RESEND_API_KEY`, `RESEND_FROM_EMAIL` i `CONTACT_NOTIFICATION_EMAIL`. Nigdy nie dodawaj klucza Resend do zmiennych `NEXT_PUBLIC_*` ani do plików wysyłanych z `out`.
4. Zbuduj frontend ponownie i sprawdź wysyłkę z nowej domeny.

Pusty `NEXT_PUBLIC_CONTACT_ENDPOINT` oznacza domyślny adres `/api/contact`. Zmienne publiczne są zapisywane w frontendzie podczas builda. Samo zmienienie konfiguracji hostingu bez ponownej kompilacji ich nie zaktualizuje.

Endpoint sprawdza pochodzenie żądania, typ i wielkość danych, zgodę użytkownika, pola formularza, honeypot i minimalny czas wypełniania. Obsługuje CORS tylko dla dozwolonych domen, limit żądań i klucz idempotencji Resend. Limit żądań jest lokalny dla instancji funkcji, nie jest globalnym zabezpieczeniem antyspamowym dla wielu instancji. Przy większym ruchu warto użyć wspólnego magazynu limitów lub dodatkowej weryfikacji po stronie endpointu.

## Kontrola jakości po zmianach

- `pnpm typecheck` sprawdza TypeScript.
- `pnpm build` sprawdza pełny eksport produkcyjny. Błędy TypeScript nie są ignorowane.
- Kopia wersji sprzed audytu: `.backups/boruch-before-ui-audit-2026-09-30-3e2e37b.zip`. Backup i pliki roboczych testów są pomijane przez Git.
- Widoki były sprawdzane na szerokościach 320, 390, 768, 1024, 1440 i 1920 px, dla wszystkich tras oraz czterech języków.
- Formularz był testowany z atrapą odpowiedzi endpointu, bez wysyłania wiadomości do właściciela. Przed przekazaniem klientowi trzeba wykonać prawdziwy test Resend w skonfigurowanym środowisku produkcyjnym.

Witryna ma widoczne breadcrumbs, dane `BreadcrumbList`, `AutoWash` i `Service`, adresy canonical, hreflang, sitemap oraz metadane do udostępniania. Dane strukturalne nie gwarantują rich results. Nie dodano ocen firmy do schematu tylko po to, żeby sztucznie uzyskać gwiazdki w wynikach wyszukiwania. Oceny i treści opinii na stronie są danymi przekazanymi przez właściciela, nie automatycznym odczytem z Google lub Booksy.

Wyniki Lighthouse są pomiarami laboratoryjnymi i zależą od hostingu, urządzenia, sieci oraz aktywnej analityki. Nie są gwarancją identycznego wyniku dla każdego odwiedzającego.

Pomiar z 30.09.2026 na lokalnym eksporcie statycznym z kompresją gzip, w mobilnym profilu Lighthouse, z odrzuconą analityką:

| Widok | Wydajność | Dostępność | Dobre praktyki | SEO |
| --- | ---: | ---: | ---: | ---: |
| Strona główna | 84 | 100 | 100 | 100 |
| Kontakt | 99 | 100 | 100 | 100 |
| Cennik | 100 | 100 | 100 | 100 |
| Galeria | 93 | 100 | 100 | 100 |
| O nas | 99 | 100 | 100 | 100 |
| Usługi | 99 | 100 | 100 | 100 |
| Oklejanie folią PPF | 97 | 100 | 100 | 100 |

Kontrola końcowa: 228 wariantów układu bez wykrytych przepełnień, uszkodzonych zdjęć i błędów JavaScript; 48 automatycznych kontroli dostępności bez zgłoszonych naruszeń; 48 kombinacji slajdów hero, języków i szerokości bez wyjścia nagłówka poza obszar; 42 unikalne wewnętrzne adresy działają w statycznym podglądzie. Osobno sprawdzono gesty pionowe i poziome opinii, przeciąganie myszką, zamykanie popupów, powrót fokusu, lightbox i doładowywanie galerii oraz cookies w czterech językach na małym i poziomym ekranie.

To testy przeglądarkowe z symulowanymi rozmiarami i gestami, nie certyfikat WCAG ani pomiar Core Web Vitals od rzeczywistych użytkowników. W tej sesji osadzona mapa Google nie odpowiedziała na zewnętrzne żądanie w podglądzie. Jej renderowanie trzeba dodatkowo potwierdzić na docelowym hostingu. Adres, osadzenie i link do Google Maps pozostały w kodzie.

## Optymalizacja po raporcie PageSpeed

Zdjęcia pierwszego ekranu i wybranych sekcji mają lżejsze wersje AVIF oraz rezerwowe WebP w `public/images/photos/optimized-v1`. Dodatkowe rozmiary 768 i 1280 px pozwalają przeglądarce dokładniej dobrać plik do ekranu. Kadry, proporcje i zdjęcia nie zostały zmienione. Nie ma optymalizacji zdjęć wymagającej serwera Node.js.

Mobilne warianty pierwszego zdjęcia hero (480, 768 i 960 px) mają dodatkową, delikatną kompresję w `public/images/photos/hero-v2`. Wariant 768 px zmniejszono z 43 116 do 31 039 bajtów. Karuzela opinii uruchamia pomiary i obsługę przesuwania dopiero 400 px przed wejściem sekcji w ekran. Treści opinii pozostają w statycznym HTML; zmiana nie wymaga serwera ani nie zmienia wyglądu kart. Przycisk języka w oknie cookies nie animuje obrysu klawiaturowego.

Polskie litery i podpis właściciela mają małe podzbiory tych samych czcionek. Pełne pliki pozostają jako rezerwa dla innych znaków. JetBrains Mono zawiera tylko używane grubości 400-500. CSS jest umieszczony w HTML podczas statycznego eksportu, przez obsługiwaną opcję Next.js `experimental.inlineCss`.

Fonty i zdjęcia z katalogów `optimized-v1` oraz `hero-v2` mają roczny cache. Przy zmianie zawartości takiego pliku użyj nowej nazwy lub nowego katalogu wersji i zaktualizuj odwołania oraz regułę w `vercel.json`. Nie nadpisuj zasobu oznaczonego `immutable` pod tym samym adresem. Na innym hostingu ustaw analogiczne nagłówki cache dla tych katalogów; sama strona będzie działać także bez nich.
