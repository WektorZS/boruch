import { Photo } from "../photo"
import { RevealText } from "../reveal-text"
import { StepList } from "./step-list"
import { ui } from "@/lib/content"
import type { Service } from "@/lib/content/services"

/** Source process steps, split around a full-bleed photographic break. */
export function ServiceProcess({ service }: { service: Service }) {
  const t = ui.pl
  const { steps, processTitle } = service.source
  if (steps.length === 0) return null

  const split = steps.length > 3 ? Math.ceil(steps.length / 2) : steps.length
  const before = steps.slice(0, split)
  const after = steps.slice(split)

  return (
    <section aria-labelledby="process-title" className="border-t border-line">
      <div className="shell-wide section-lg">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16">
          <p className="eyebrow">{t.process}</p>
          <RevealText id="process-title" text={processTitle ?? t.process} className="type-display max-w-5xl" />
        </div>
        <StepList steps={before} stepLabel={t.step} />
      </div>

      {after.length > 0 && (
        <>
          <div data-reveal="mask" className="frame aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/8]">
            <Photo id={service.frames[1]} sizes="100vw" />
          </div>
          <div className="shell-wide section-lg">
            <StepList steps={after} start={split + 1} stepLabel={t.step} />
          </div>
        </>
      )}
    </section>
  )
}
