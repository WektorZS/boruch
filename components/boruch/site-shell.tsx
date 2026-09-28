import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { contact, localeLabels, localeOrder, routes, sources, ui, type Locale, type PageKey } from "@/lib/content"

const navOrder: PageKey[] = ["home", "services", "pricing", "gallery", "about", "contact"]

interface SiteShellProps {
  locale: Locale
  /** Active navigation item, if the page belongs to one. */
  page?: PageKey
  /** Language switcher targets. Defaults to the equivalent page in every locale. */
  alternates?: Record<Locale, string>
  children: React.ReactNode
}

export function SiteShell({ locale, page, alternates, children }: SiteShellProps) {
  const t = ui[locale]
  const targets =
    alternates ??
    (Object.fromEntries(localeOrder.map((code) => [code, routes[code][page ?? "home"]])) as Record<Locale, string>)

  return (
    <div id="top" lang={locale === "pl" ? undefined : localeLabels[locale].htmlLang} className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="type-label fixed left-4 top-4 z-(--z-skip) -translate-y-24 bg-bone px-4 py-3 text-ink transition-transform focus:translate-y-0"
      >
        {t.skip}
      </a>
      <SiteHeader
        homeHref={routes[locale].home}
        homeLabel={`BORUCH Myjnia — ${t.nav.home}`}
        nav={navOrder.map((key) => ({ key, label: t.nav[key], href: routes[locale][key], active: key === page }))}
        languages={localeOrder.map((code) => ({
          code,
          short: localeLabels[code].short,
          name: localeLabels[code].name,
          htmlLang: localeLabels[code].htmlLang,
          href: targets[code],
          active: code === locale,
        }))}
        labels={{
          book: t.book,
          menu: t.menu,
          close: t.close,
          language: t.language,
          navigation: t.navigation,
          level: t.level,
        }}
        bookingUrl={contact.bookingUrl}
        phone={contact.phone}
        phoneHref={contact.phoneHref}
        address={[sources[locale].address.lines[0], `PAZIM ${sources[locale].address.lines[2]}`]}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} alternates={targets} />
    </div>
  )
}
