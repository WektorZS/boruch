import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StepList } from "./step-list"
import { routes, ui } from "@/lib/content"
import { servicePrice, type Service } from "@/lib/content/services"
import type { ServiceBlock, ServiceSection as Section } from "@/lib/content/types"

interface ServiceSectionProps {
  service: Service
  section: Section
  id: string
}

export function ServiceSection({ service, section, id }: ServiceSectionProps) {
  if (section.kind === "price") return <PriceSection service={service} section={section} id={id} />
  if (section.kind === "summary") return <SummarySection section={section} id={id} />
  return <ListSection section={section} id={id} />
}

function ListSection({ section, id }: { section: Section; id: string }) {
  return (
    <section aria-labelledby={id} className="section-md border-t border-line">
      <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id={id} data-reveal="" className="type-h2 max-w-[14ch] text-balance lg:sticky lg:top-[calc(var(--header-h)+2rem)]">{section.heading}</h2>
        </div>
        <div className="lg:col-span-7">
          {section.kind === "process" && section.steps ? (
            <StepList steps={section.steps} stepLabel={ui.pl.step} compact />
          ) : (
            <Blocks blocks={section.blocks} />
          )}
        </div>
      </div>
    </section>
  )
}

/** Renders source blocks in their original order: list items as ruled rows, prose as paragraphs. */
function Blocks({ blocks }: { blocks: ServiceBlock[] }) {
  const groups: { type: ServiceBlock["type"]; texts: string[] }[] = []
  for (const block of blocks) {
    const last = groups[groups.length - 1]
    if (last && last.type === block.type) last.texts.push(block.text)
    else groups.push({ type: block.type, texts: [block.text] })
  }

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group, g) =>
        group.type === "item" ? (
          <ul key={g} className="border-b border-line">
            {group.texts.map((text, i) => (
              <li
                key={i}
                data-reveal=""
                style={{ "--d": i % 4 } as React.CSSProperties}
                className="group flex items-start gap-5 border-t border-line py-5 transition-colors hover:bg-ink-warm/60 md:px-2"
              >
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-brand transition-transform group-hover:scale-150" />
                <span className="text-pretty text-lg leading-snug text-bone md:text-xl">{text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div key={g} className="flex max-w-2xl flex-col gap-4">
            {group.texts.map((text, i) => (
              <p key={i} data-reveal="" className="type-body text-pretty text-bone/75 md:text-lg md:leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        ),
      )}
    </div>
  )
}

function PriceSection({ service, section, id }: ServiceSectionProps) {
  const t = ui.pl
  const price = servicePrice("pl", service.slug)
  const linkText = section.blocks.find((b) => b.type === "text")?.text

  return (
    <section aria-labelledby={id} className="border-t border-line-wine bg-wine-deep/35">
      <div className="shell-wide section-md grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <p className="eyebrow">{t.priceLabel}</p>
          <h2 id={id} data-reveal="" className="type-h2 text-balance">{section.heading}</h2>
        </div>
        <div data-reveal="" className="flex min-w-0 flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:items-end lg:text-right">
          <p
            className={
              price
                ? "type-h1 [font-stretch:108%] [font-variation-settings:'wdth'_108]"
                : "type-h2 text-balance text-bone/90"
            }
          >
            {price ?? t.individualQuote}
          </p>
          {linkText && (
            <Link href={routes.pl.pricing} className="group flex w-fit items-center gap-4 text-bone">
              <span className="type-label link-draw">{linkText}</span>
              <ArrowRight className="arrow-shift size-5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

function SummarySection({ section, id }: { section: Section; id: string }) {
  const [first, ...rest] = section.blocks.map((b) => b.text)

  return (
    <section aria-labelledby={id} className="section-lg border-t border-line">
      <div className="shell-wide flex flex-col gap-10">
        <h2 id={id} className="eyebrow">
          {section.heading}
        </h2>
        <p data-reveal="" className="type-h2 max-w-4xl text-balance">
          {first}
        </p>
        {rest.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:ml-[33%]">
            {rest.map((text, i) => (
              <p
                key={i}
                data-reveal=""
                style={{ "--d": i + 1 } as React.CSSProperties}
                className="type-body text-pretty text-bone/75 md:text-lg md:leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
