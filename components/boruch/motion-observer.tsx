"use client"

import { useEffect } from "react"

const SELECTOR = "[data-reveal]:not(.is-in)"

/**
 * Single, page-wide IntersectionObserver for the reveal system.
 * Elements opt in with `data-reveal` (optionally `="mask"`) and a `--d` stagger index.
 * A MutationObserver picks up elements added after mount (client navigation, streamed or remounted content),
 * and anything already above the viewport is revealed immediately so it never stays hidden.
 */
export function MotionObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-in")

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const revealAll = () => document.querySelectorAll(SELECTOR).forEach(reveal)
      revealAll()
      const mo = new MutationObserver(revealAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    )

    const track = (root: ParentNode) => {
      if (root instanceof Element && root.matches(SELECTOR)) io.observe(root)
      root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el))
    }
    track(document)

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => n instanceof Element && track(n))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
