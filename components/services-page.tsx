import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { SiteShell } from "./site-shell"
import { Photo } from "./photo"
import { breadcrumbJsonLd, contact, routes, sources, ui, type Locale } from "@/lib/content"
import { serviceConfigs, servicePrice, type ServiceSlug } from "@/lib/content/services"

const clients = [
  { file: "radisson", name: "Radisson Blu" },
  { file: "avis", name: "Avis" },
  { file: "unity-line", name: "Unity Line" },
  { file: "baltica", name: "Baltica" },
  { file: "fitnessworld", name: "Fitness World" },
  { file: "mooveno", name: "Mooveno" },
  { file: "umwz", name: "Urząd Marszałkowski Województwa Zachodniopomorskiego" },
  { file: "logo-type", name: "Wilhelmsen" },
]

const pageCopy = {
  pl: { intro: "Pełny zakres pielęgnacji", introText: "Od regularnego mycia po zaawansowane zabezpieczenie lakieru. Wybierz zakres lub skontaktuj się z nami, a dobierzemy usługę do stanu auta.", trusted: "Zaufali nam", choose: "Wybierz zakres" },
  en: { intro: "Complete car care", introText: "From regular washing to advanced paint protection. Choose a service or contact us and we will match it to your car.", trusted: "Trusted by", choose: "Choose a service" },
  de: { intro: "Komplette Fahrzeugpflege", introText: "Von der regelmäßigen Wäsche bis zum hochwertigen Lackschutz. Wählen Sie eine Leistung oder lassen Sie sich beraten.", trusted: "Unsere Kunden", choose: "Leistung wählen" },
  uk: { intro: "Повний догляд за авто", introText: "Від регулярного миття до професійного захисту лаку. Оберіть послугу або зверніться до нас за порадою.", trusted: "Нам довіряють", choose: "Оберіть послугу" },
} satisfies Record<Locale, Record<string, string>>

export function ServicesPage({ locale }: { locale: Locale }) {
  const src = sources[locale]
  const t = ui[locale]
  const copy = pageCopy[locale]

  return (
    <SiteShell locale={locale} page="services">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: t.nav.home, path: routes[locale].home }, { name: t.nav.services, path: routes[locale].services }])) }} />

      <section aria-labelledby="page-title" className="relative isolate flex min-h-[680px] items-end overflow-hidden border-b border-white/10 pt-(--header-h)">
        <div className="enter-unmask absolute inset-0"><Photo id="p47" priority sizes="100vw" position="50% 65%" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,.98)_0%,rgba(6,6,7,.86)_48%,rgba(6,6,7,.3)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#080809] via-transparent to-[#080809]/45" />
        <div className="shell-wide relative z-10 grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-7">{copy.intro}</p>
            <h1 id="page-title" className="type-h1 max-w-[12ch] text-balance">{t.nav.services}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/62">{src.meta.services.description}</p>
          </div>
          <div className="border-l border-brand pl-6 lg:col-span-3 lg:col-start-10">
            <p className="type-label text-brand">{copy.choose}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{copy.introText}</p>
            <Link href={routes[locale].pricing} className="mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-white transition-colors hover:text-brand">{t.pricing}<ArrowRight className="size-4 text-brand" /></Link>
          </div>
        </div>
      </section>

      {src.services.groups.map((group, groupIndex) => (
        <section key={group.title} aria-labelledby={`group-${groupIndex}`} className={`border-b border-white/10 py-16 sm:py-20 lg:py-28 ${groupIndex % 2 === 0 ? "bg-[#0a0a0b]" : "bg-[#101011]"}`}>
          <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <p className="eyebrow">{t.nav.services}</p>
                <h2 id={`group-${groupIndex}`} className="mt-7 type-h1 max-w-[9ch]">{group.title}</h2>
                <p className="mt-7 max-w-sm text-sm leading-relaxed text-white/45">{copy.introText}</p>
              </div>
            </div>
            <ol className="border-b border-white/10 lg:col-span-8">
              {group.items.map((item, index) => {
                const config = serviceConfigs.find((service) => service.slug === item.slug)
                const slug = item.slug as ServiceSlug
                const href = locale === "pl" && config ? `/${slug}` : null
                const price = config ? servicePrice(locale, slug) : null
                const content = (
                  <>
                    <span className="mt-1 size-2 shrink-0 bg-brand" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <strong className="font-display text-[clamp(1.45rem,2.2vw,2rem)] font-bold uppercase leading-[1.08] tracking-[-.015em] text-white/90 transition-colors group-hover:text-white">{item.title}</strong>
                      <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-white/48">{item.text}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-5 self-end lg:self-center">
                      <span className="text-right"><span className="type-label block text-white/30">{t.priceLabel}</span><strong className="mt-1 block whitespace-nowrap text-sm font-semibold text-white/78">{price ?? t.individualQuote}</strong></span>
                      {href && <span className="grid size-11 place-items-center border border-white/12 text-white/55 transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white"><ArrowRight className="size-4" /></span>}
                    </span>
                  </>
                )
                const rowClass = "group flex flex-wrap items-start gap-5 border-t border-white/10 py-7 transition-colors hover:border-brand/40 sm:flex-nowrap lg:items-center lg:py-8"
                return <li key={item.slug} data-reveal="" style={{ "--d": index % 3 } as React.CSSProperties}>{href ? <Link href={href} className={rowClass}>{content}</Link> : <div className={rowClass}>{content}</div>}</li>
              })}
            </ol>
          </div>
        </section>
      ))}

      <section aria-labelledby="trusted-title" className="border-b border-white/10 bg-[#080809] py-14 sm:py-16">
        <div className="shell-wide">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">BORUCH</p><h2 id="trusted-title" className="mt-5 font-display text-3xl font-black uppercase tracking-[-.02em]">{src.services.trustedTitle}</h2></div>
            <p className="type-label text-white/35">{copy.trusted}</p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            {clients.map((client) => <li key={client.file} className="flex min-h-32 items-center justify-center border-b border-r border-white/8 p-5"><img src={`/images/clients/${client.file}.webp`} alt={client.name} loading="lazy" decoding="async" className="max-h-10 max-w-full object-contain opacity-45 grayscale invert transition duration-300 hover:opacity-90" /></li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="booking-title" className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10"><Photo id="p65" sizes="100vw" className="opacity-30" position="50% 60%" /><div className="absolute inset-0 bg-linear-to-r from-[#080809] via-[#080809]/90 to-[#270b0e]/70" /></div>
        <div className="shell-wide grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-28">
          <div className="lg:col-span-8"><p className="eyebrow">{t.book}</p><h2 id="booking-title" className="mt-7 type-h1 max-w-[12ch]">{src.home.contactTitle}</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/62">{src.home.contactText}</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end"><a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group min-h-14 px-7">{t.booksy}<ArrowUpRight className="size-4" /></a><a href={contact.phoneHref} className="btn btn-outline min-h-14 px-7"><Phone className="size-4 text-brand" />{contact.phone}</a></div>
        </div>
      </section>
    </SiteShell>
  )
}
