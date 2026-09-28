"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

const localePrefixes = ["/en", "/de", "/uk"]

// Locale home pages render their own translated header/footer, so the Polish chrome is suppressed there.
export function PlChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/"
  const isLocale = localePrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  if (isLocale) return null
  return <>{children}</>
}
