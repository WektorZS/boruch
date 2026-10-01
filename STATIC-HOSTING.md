# Hosting statyczny i przenoszenie strony

Frontend BORUCH jest statyczny. `next.config.mjs` używa `output: 'export'`, `trailingSlash: true` i `images.unoptimized: true`. Node.js jest potrzebny podczas instalacji zależności i budowania, ale nie do wyświetlania gotowej strony na hostingu. Dla tego eksportu nie uruchamiaj `next start`.

Formularz jest osobną sprawą: bezpieczna wysyłka przez Resend potrzebuje endpointu poza statycznym frontendem. Nie wymaga on stałego serwera Next.js. Obecnie działa jako funkcja Vercel w `api/contact.ts`.

## Budowanie

```bash
pnpm install
pnpm typecheck
pnpm build
```

`pnpm build` wykonuje `next build` i zapisuje gotową witrynę w `out`. Katalog zawiera HTML podstron we wszystkich czterech językach, `404.html`, `sitemap.xml`, `robots.txt`, fonty, fotografie i zasoby `_next`. Wszystkie trasy, także ukraińskie adresy i strony pojedynczych usług, są eksportowane podczas budowania.

## Obecne wdrożenie na Vercel

`vercel.json` wskazuje polecenie `pnpm build`, katalog publikacji `out` oraz osobną funkcję `api/contact.ts`, dostępną pod `/api/contact`. Frontend nie potrzebuje serwera Next.js ani optymalizacji obrazów wykonywanej na serwerze.

W ustawieniach funkcji ustaw:

```text
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=BORUCH <formularz@boruchmyjnia.pl>
CONTACT_NOTIFICATION_EMAIL=bruchkarol@gmail.com
CONTACT_ALLOWED_ORIGINS=https://boruchmyjnia.pl,https://www.boruchmyjnia.pl
```

Domena nadawcza musi być zweryfikowana w Resend. Powyższe wartości są przykładami konfiguracji. Tajny klucz API pozostaje wyłącznie po stronie funkcji, nigdy w `out`, repozytorium ani zmiennych `NEXT_PUBLIC_*`.

## Przenoszenie frontendu na inny hosting

Na hosting statyczny wgraj zawartość `out`, razem z `_next`, `images` i `fonts`. Nie wystarczy skopiować samego pliku `index.html`.

- Hosting powinien serwować `index.html` w podkatalogach. Przykładowo `/uslugi/` ma własny plik `out/uslugi/index.html`, a nie `uslugi.html`.
- Dla nieistniejącego adresu użyj `404.html` i statusu HTTP 404. Nie przekierowuj wszystkich adresów do głównego `index.html`.
- Włącz HTTPS oraz gzip lub Brotli dla HTML, CSS i JavaScript, jeśli hosting udostępnia te ustawienia.
- Zachowaj poprawne typy MIME dla `.avif`, `.webp` i `.woff2`.
- Ukraińskie nazwy katalogów powinny pozostać w UTF-8. Nie zamieniaj nazw ani nie podwójnie koduj URL.

Fotografie korzystają z lokalnych AVIF i WebP, dobranych przez `<picture>` oraz `srcset`. Nie potrzebują usługi optymalizacji obrazów. Fonty również są lokalne. Alex Brush Regular jest używany wyłącznie do podpisu Karol Bruch. Mapa Google wymaga dostępu do ich serwisu, natomiast adres i link do otwarcia lokalizacji są dostępne niezależnie od widżetu.

### Zmiana domeny

Przed ponownym buildem zaktualizuj `sourceUrl` w `lib/site-config.ts`. Canonical, hreflang, sitemap, robots oraz dane strukturalne korzystają z tej konfiguracji. W endpointcie formularza zaktualizuj również dozwolone domeny.

### Formularz po przeniesieniu

`api/contact.ts` nie znajduje się w `out`. Samo skopiowanie plików na inny hosting nie przenosi wysyłki wiadomości. Masz dwie możliwości:

1. Zostawić endpoint na Vercel, a przenieść tylko frontend. Podczas budowania ustaw `NEXT_PUBLIC_CONTACT_ENDPOINT` na pełny, publiczny adres funkcji, np. `https://twoje-api.example.com/api/contact`. W konfiguracji funkcji dodaj dokładny origin nowej strony do `CONTACT_ALLOWED_ORIGINS`, z protokołem i bez końcowego `/`.
2. Przenieść wysyłkę do funkcji lub backendu nowego hostingu. Adapter może być napisany w środowisku dostępnym na tym hostingu, bez serwera Next.js. Musi zachować kontrakt JSON obecnego formularza, odpowiedzi `{ "ok": true }` / `{ "ok": false }`, obsługę `POST` i w razie innej domeny `OPTIONS` oraz dozwolone nagłówki CORS. Należy przenieść walidację i zabezpieczenia, nie tylko wywołanie Resend.

Pusty `NEXT_PUBLIC_CONTACT_ENDPOINT` oznacza domyślny adres `/api/contact`. Zmienna publiczna jest zapisywana w frontendzie podczas builda, więc jej zmiana wymaga ponownej kompilacji.

Obecny endpoint kontroluje origin, typ i wielkość żądania, pola formularza, zgodę, honeypot oraz minimalny czas wypełnienia. Stosuje limit żądań i klucz idempotencji Resend. Limit jest lokalny dla instancji funkcji, nie gwarantuje wspólnego limitu dla wszystkich regionów i instancji. Przy większym ruchu zastosuj dodatkowy limit po stronie hostingu lub współdzielony magazyn limitów.

Po przeniesieniu sprawdź rzeczywistą wysyłkę z nowej domeny i odbiór wiadomości. Test formularza z atrapą odpowiedzi nie potwierdza konfiguracji Resend.

## Cache zasobów

Vercel ustawia roczny cache `immutable` dla fontów oraz zdjęć w `images/photos/optimized-v1` i `images/photos/hero-v2`. Pozostałe obrazy mają krótszy cache. Na innym hostingu można ustawić analogiczne nagłówki.

Nie nadpisuj zawartości pliku oznaczonego `immutable` pod tym samym adresem. Przy zmianie użyj nowej nazwy albo katalogu wersji i zaktualizuj odwołania oraz nagłówki. HTML powinien umożliwiać pobranie aktualnej wersji po publikacji.

## Kopie przed dopracowaniem z 1 października 2026

W lokalnym katalogu `.backups` znajdują się:

- `boruch-before-editorial-2026-10-01-78ce9de.zip` - kopia źródeł i zasobów sprzed zmian;
- `boruch-static-before-editorial-2026-10-01-78ce9de.zip` - gotowy wcześniejszy eksport w katalogu `out`, do szybkiego przywrócenia frontendu.

Archiwa są lokalne i pomijane przez Git. Nie są automatycznie publikowane na Vercel. Przed przywracaniem rozpakuj kopię do osobnego katalogu i zachowaj obecną wersję. Statyczna kopia nie zastępuje konfiguracji i sekretów funkcji kontaktowej na hostingu.

## Kontrola po publikacji

Sprawdź stronę główną i podstrony w PL, EN, DE oraz UK, menu mobilne, zdjęcia, galerię, cennik, cookies i formularz. Potwierdź prawidłowe odpowiedzi 404, canonical i działanie linków. Wyniki Lighthouse zależą od pomiaru, sieci i hostingu - sam eksport statyczny nie gwarantuje stałego wyniku 100/100.
