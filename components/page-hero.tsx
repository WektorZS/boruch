import type { ReactNode } from "react"

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl text-balance font-heading text-4xl font-bold leading-[1.05] sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-background/75">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
