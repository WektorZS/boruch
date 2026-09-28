import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground stripe-corner">
        <span className="font-heading text-base font-bold leading-none">B</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[15px] font-bold uppercase tracking-tight text-foreground">
          Boruch
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Myjnia &amp; Detailing
        </span>
      </span>
    </Link>
  )
}
