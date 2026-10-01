"use client"

import { useEffect, type RefObject } from "react"

const openModals: HTMLElement[] = []
let savedOverflow = ""

/** Shared keyboard, focus and background behaviour for the site's modal windows. */
export function useModalFocus(open: boolean, ref: RefObject<HTMLElement | null>, onClose?: () => void, contentKey?: string) {
  useEffect(() => {
    const dialog = ref.current
    if (!open || !dialog) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    if (openModals.length === 0) {
      savedOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
    }
    openModals.push(dialog)
    const background: Array<[HTMLElement, boolean]> = []
    let branch: HTMLElement = dialog
    while (branch.parentElement && branch !== document.body) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement && !["SCRIPT", "STYLE"].includes(sibling.tagName)) {
          background.push([sibling, sibling.inert])
          sibling.inert = true
        }
      }
      branch = branch.parentElement
    }
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')).filter(el => el.getClientRects().length && !el.closest("[inert]"))
    const onKey = (event: KeyboardEvent) => {
      if (openModals.at(-1) !== dialog) return
      if (event.key === "Escape" && onClose) { event.preventDefault(); onClose() }
      if (event.key !== "Tab") return
      const items = focusable()
      const first = items[0]
      const last = items.at(-1)
      if (!first || !last) { event.preventDefault(); return }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first.focus()
      }
    }
    const frame = requestAnimationFrame(() => focusable()[0]?.focus({ preventScroll: true }))
    document.addEventListener("keydown", onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("keydown", onKey)
      openModals.splice(openModals.indexOf(dialog), 1)
      for (const [element, wasInert] of background) element.inert = wasInert
      if (openModals.length === 0) document.body.style.overflow = savedOverflow
      if (previousFocus?.isConnected && !previousFocus.closest("[inert]")) previousFocus.focus({ preventScroll: true })
    }
  }, [open, ref, onClose, contentKey])
}
