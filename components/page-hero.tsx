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
    <section className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-balance font-heading text-4xl font-bold leading-[1.02] sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-background/70 sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
