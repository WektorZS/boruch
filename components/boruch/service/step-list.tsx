import { formatIndex } from "@/lib/content/services"
import type { ServiceStep } from "@/lib/content/types"
import { cn } from "@/lib/utils"

interface StepListProps {
  steps: ServiceStep[]
  /** Index of the first step, so a list split around a photo keeps counting. */
  start?: number
  stepLabel: string
  compact?: boolean
}

/** Numbered process rows: index, source step title, source step body. */
export function StepList({ steps, start = 1, stepLabel, compact = false }: StepListProps) {
  return (
    <ol className="border-b border-line">
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal=""
          style={{ "--d": i % 3 } as React.CSSProperties}
          className={cn(
            "group grid gap-4 border-t border-line transition-colors hover:border-line-strong md:grid-cols-12 md:gap-8",
            compact ? "py-7" : "py-9 lg:py-12",
          )}
        >
          <p className="flex items-baseline gap-3 md:col-span-2 md:flex-col md:gap-2">
            <span className="type-index text-3xl text-bone transition-colors group-hover:text-highlight lg:text-4xl">
              {formatIndex(start + i)}
            </span>
            <span className="type-label text-ash">{stepLabel}</span>
          </p>
          <h3 className={cn("text-pretty md:col-span-4", compact ? "type-h3" : "type-h3 lg:text-[1.75rem] lg:leading-tight")}>
            {step.title}
          </h3>
          <div className="flex flex-col gap-4 md:col-span-6">
            {step.body.map((para, j) => (
              <p key={j} className="type-body text-pretty text-bone/75">
                {para}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  )
}
