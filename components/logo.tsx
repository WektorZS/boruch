import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="BORUCH Myjnia & Detailing — strona główna" className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "stripe-corner flex h-9 w-9 shrink-0 items-center justify-center",
          inverted ? "bg-background text-foreground" : "bg-foreground text-background",
        )}
        aria-hidden="true"
      >
        <span className="font-heading text-base font-bold leading-none">B</span>
      </span>
      <span className="flex flex-col gap-1 leading-none" aria-hidden="true">
        <span
          className={cn(
            "font-heading text-[15px] font-bold uppercase tracking-[0.08em]",
            inverted ? "text-background" : "text-foreground",
          )}
        >
          Boruch
        </span>
        <span
          className={cn(
            "text-[9px] font-medium uppercase tracking-[0.3em]",
            inverted ? "text-background/55" : "text-muted-foreground",
          )}
        >
          Myjnia &amp; Detailing
        </span>
      </span>
    </Link>
  )
}
