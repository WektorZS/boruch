"use client"

import type {
  MouseEvent,
  ReactNode,
} from "react"

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=BORUCH+Myjnia+R%C4%99czna+Plac+Rod%C5%82a+8+Szczecin"

const APPLE_MAPS_URL =
  "https://maps.apple.com/?q=BORUCH%20Myjnia%20Szczecin&ll=53.43287322323469,14.556013226121532"

function isAppleMapsDevice() {
  const isIOS =
    /iPhone|iPad|iPod/i.test(
      navigator.userAgent,
    )

  const isIPadOS =
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints > 1

  return isIOS || isIPadOS
}

export function SmartMapLink({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (!isAppleMapsDevice()) return

    event.preventDefault()

    window.open(
      APPLE_MAPS_URL,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  )
}