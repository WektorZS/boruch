import { Fragment, type ElementType } from "react"
import { cn } from "@/lib/utils"

interface RevealTextProps {
  as?: ElementType
  /** Pass explicit lines for display type, or a single string to reveal word by word. */
  text: string | string[]
  className?: string
  delay?: number
  id?: string
}

/** Heading whose lines (or words) slide up from their own clip when scrolled into view. */
export function RevealText({ as: Tag = "h2", text, className, delay = 0, id }: RevealTextProps) {
  const byLine = Array.isArray(text)
  const parts = byLine ? text : text.split(/\s+/).filter(Boolean)

  return (
    <Tag
      id={id}
      data-reveal=""
      style={{ "--d": delay } as React.CSSProperties}
      className={cn("lines", !byLine && "words", className)}
    >
      {parts.map((part, i) => (
        <Fragment key={`${part}-${i}`}>
          <span className="line">
            <span style={{ "--i": byLine ? i : Math.floor(i / 2) } as React.CSSProperties}>{part}</span>
          </span>
          {!byLine && i < parts.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}
