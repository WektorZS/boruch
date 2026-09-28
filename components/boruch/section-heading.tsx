import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  meta?: React.ReactNode
  action?: React.ReactNode
  as?: "h1" | "h2" | "p"
  size?: "page" | "section" | "compact"
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  meta,
  action,
  as: Tag = "h2",
  size = "section",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-7 lg:grid-cols-12 lg:gap-8", className)}>
      <div className="flex items-start justify-between gap-5 lg:col-span-3">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {meta && <div className="type-label ml-auto text-right text-ash lg:hidden">{meta}</div>}
      </div>
      <div className="flex min-w-0 flex-col gap-7 lg:col-span-8 lg:col-start-5">
        <Tag
          id={id}
          data-reveal=""
          className={cn(
            "max-w-[16ch] text-balance",
            size === "page" && "type-h1",
            size === "section" && "type-h2",
            size === "compact" && "type-h3",
          )}
        >
          {title}
        </Tag>
        {(intro || action) && (
          <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            {intro && <p className="type-lead max-w-2xl text-pretty text-bone/75">{intro}</p>}
            {action}
          </div>
        )}
      </div>
      {meta && <div className="type-label hidden text-right text-ash lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:block">{meta}</div>}
    </div>
  )
}
