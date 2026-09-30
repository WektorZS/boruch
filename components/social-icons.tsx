import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.55 22v-9h3.02l.45-3.52h-3.47V7.24c0-1.02.28-1.71 1.74-1.71h1.86V2.38c-.32-.04-1.43-.14-2.72-.14-2.69 0-4.53 1.64-4.53 4.66v2.58H6.86V13H9.9v9h3.65Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.45" cy="6.65" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
