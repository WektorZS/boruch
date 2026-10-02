/// <reference types="google.maps" />
"use client"

import { useEffect, useRef } from "react"

const GOOGLE_MAPS_API_KEY = "AIzaSyAI4IGu6fbylowQS89deMLRKUnP8kTERiY"
const GOOGLE_MAPS_MAP_ID = "8ad23a51fb86cfb05286e9ce"

const BORUCH_POSITION = {
  lat: 53.43313691416123,
  lng: 14.555602179682984,
}

declare global {
  interface Window {
    google?: typeof google
    __boruchGoogleMapsPromise?: Promise<void>
  }
}

function loadGoogleMaps() {
  if (window.google?.maps) {
    return Promise.resolve()
  }

  if (window.__boruchGoogleMapsPromise) {
    return window.__boruchGoogleMapsPromise
  }

  window.__boruchGoogleMapsPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-boruch-google-maps="true"]',
    )

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), {
        once: true,
      })

      existingScript.addEventListener(
        "error",
        () => reject(new Error("Nie udało się załadować Google Maps.")),
        { once: true },
      )

      return
    }

    const script = document.createElement("script")

    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        GOOGLE_MAPS_API_KEY,
      )}&v=weekly&libraries=marker&loading=async`

    script.async = true
    script.defer = true
    script.dataset.boruchGoogleMaps = "true"

    script.onload = () => resolve()

    script.onerror = () => {
      reject(new Error("Nie udało się załadować Google Maps."))
    }

    document.head.appendChild(script)
  })

  return window.__boruchGoogleMapsPromise
}

export function BoruchGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mapRef.current

    if (!container) return

    let marker: google.maps.marker.AdvancedMarkerElement | null = null
    let cancelled = false

    async function initMap() {
      try {
        await loadGoogleMaps()

        if (cancelled || !window.google?.maps) return

        const { Map, ColorScheme } =
          (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary

        const { AdvancedMarkerElement, PinElement } =
          (await google.maps.importLibrary(
            "marker",
          )) as google.maps.MarkerLibrary

        if (cancelled) return

        const map = new Map(container, {
          center: BORUCH_POSITION,
          zoom: 17,

          mapId: GOOGLE_MAPS_MAP_ID,
          mapTypeId: "roadmap",
          colorScheme: ColorScheme.DARK,

          disableDefaultUI: true,
          zoomControl: true,

          clickableIcons: false,
          gestureHandling: "cooperative",

          backgroundColor: "#0a0a0b",
        })

        const pin = new PinElement({
          background: "#d52b32",
          borderColor: "#971d23",
          glyphColor: "#ffffff",
          scale: 1.2,
        })

        marker = new AdvancedMarkerElement({
          map,
          position: BORUCH_POSITION,
          title: "BORUCH Myjnia Szczecin",
          content: pin.element,
        })
      } catch (error) {
        console.error("Nie udało się załadować Google Maps:", error)
      }
    }

    void initMap()

    return () => {
      cancelled = true

      if (marker) {
        marker.map = null
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="absolute inset-0 size-full"
      aria-label="Mapa lokalizacji BORUCH Myjnia Szczecin"
    />
  )
}