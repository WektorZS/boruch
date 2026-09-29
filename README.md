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

Pliki `gallery-portfolio.tsx`, `service-browser.tsx`, `site-header.tsx` i `motion-observer.tsx` pozostają osobno, ponieważ zawierają interakcje wykonywane w przeglądarce. Pozostałe sekcje każdej podstrony znajdują się w jednym pliku danej strony.

## Uruchomienie

```bash
pnpm install
pnpm dev
```

Wersja produkcyjna:

```bash
pnpm build
```
