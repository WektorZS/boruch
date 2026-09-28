import { Photo } from "../photo"
import type { Service } from "@/lib/content/services"

export function ServiceIntro({ service }: { service: Service }) {
  const [first, ...rest] = service.source.intro

  return (
    <section aria-label={service.navTitle} className="section-lg">
      <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-10 lg:col-span-7 lg:pt-8">
          <p className="eyebrow">{service.navTitle}</p>
          <p data-reveal="" className="type-lead max-w-3xl text-pretty text-bone/90">
            {first}
          </p>
          <div className="flex max-w-2xl flex-col gap-5 lg:ml-[16%]">
            {rest.map((para, i) => (
              <p
                key={i}
                data-reveal=""
                style={{ "--d": i + 1 } as React.CSSProperties}
                className="type-body text-pretty text-bone/70"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div data-reveal="mask" className="frame aspect-[3/4] lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Photo id={service.frames[0]} sizes="(min-width: 1024px) 33vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
