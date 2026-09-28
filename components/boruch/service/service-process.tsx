import { Photo } from "../photo"
import { SectionHeading } from "../section-heading"
import { StepList } from "./step-list"
import { ui } from "@/lib/content"
import type { Service } from "@/lib/content/services"

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
        <div className="mb-12 lg:mb-16">
          <SectionHeading id="process-title" eyebrow={t.process} title={processTitle ?? t.process} />
        </div>
        <StepList steps={before} stepLabel={t.step} />
      </div>

      {after.length > 0 && (
        <>
          <div data-reveal="mask" className="frame aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2/1]">
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
