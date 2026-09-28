import Link from "next/link"
import { cn } from "@/lib/utils"

export function Wordmark({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <Link href={href} aria-label={label} className={cn("group flex items-center gap-3.5", className)}>
      <span
        aria-hidden="true"
        className="font-display text-[1.35rem] font-extrabold uppercase leading-none tracking-[-0.03em] [font-stretch:151%] [font-variation-settings:'wdth'_151]"
      >
        Boruch
      </span>
      <span aria-hidden="true" className="h-7 w-px bg-line-strong transition-colors duration-300 group-hover:bg-brand" />
      <span aria-hidden="true" className="type-label flex flex-col gap-0.5 text-[0.5625rem] leading-none text-ash">
        <span>Myjnia</span>
        <span>Detailing</span>
      </span>
    </Link>
  )
}
