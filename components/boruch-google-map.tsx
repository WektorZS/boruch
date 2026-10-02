"use client"

import { useEffect, useRef } from "react"

const GOOGLE_MAPS_API_KEY = "AIzaSyAI4IGu6fbylowQS89deMLRKUnP8kTERiY"
const GOOGLE_MAPS_MAP_ID = "8ad23a51fb86cfb05286e9ce"

const BORUCH_POSITION = {
  lat: 53.43313691416123,
  lng: 14.555602179682984,
}

type GoogleMapsWindow = Window & {
  google?: any
  __boruchGoogleMapsPromise?: Promise<void>
}

function getGoogleWindow() {
  return window as GoogleMapsWindow
}

function loadGoogleMaps() {
  const googleWindow = getGoogleWindow()

  if (googleWindow.google?.maps) {
    return Promise.resolve()
  }

  if (googleWindow.__boruchGoogleMapsPromise) {
    return googleWindow.__boruchGoogleMapsPromise
  }

  googleWindow.__boruchGoogleMapsPromise = new Promise<void>(
    (resolve, reject) => {
      const existingScript =
        document.querySelector<HTMLScriptElement>(
          'script[data-boruch-google-maps="true"]',
        )

      if (existingScript) {
        existingScript.addEventListener(
          "load",
          () => resolve(),
          { once: true },
        )

        existingScript.addEventListener(
          "error",
          () =>
            reject(
              new Error(
                "Nie udało się załadować Google Maps.",
              ),
            ),
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
        reject(
          new Error(
            "Nie udało się załadować Google Maps.",
          ),
        )
      }

      document.head.appendChild(script)
    },
  )

  return googleWindow.__boruchGoogleMapsPromise
}

export function BoruchGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mapRef.current

    if (!container) return

    let marker: any = null
    let cancelled = false

    async function initMap() {
      try {
        await loadGoogleMaps()

        const googleWindow = getGoogleWindow()
        const googleMaps = googleWindow.google?.maps

        if (
          cancelled ||
          !googleMaps ||
          !container
        ) {
          return
        }

        const mapsLibrary =
          await googleMaps.importLibrary("maps")

        const markerLibrary =
          await googleMaps.importLibrary("marker")

        const coreLibrary =
          await googleMaps.importLibrary("core")

        if (cancelled) return

        const Map = mapsLibrary.Map
        const AdvancedMarkerElement =
          markerLibrary.AdvancedMarkerElement
        const PinElement =
          markerLibrary.PinElement
        const ColorScheme =
          coreLibrary.ColorScheme

        const map = new Map(container, {
          center: BORUCH_POSITION,
          zoom: 17,

          mapId: GOOGLE_MAPS_MAP_ID,
          mapTypeId: "roadmap",

          colorScheme:
            ColorScheme?.DARK ?? "DARK",

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
          content: pin.element ?? pin,
        })
      } catch (error) {
        console.error(
          "Nie udało się załadować Google Maps:",
          error,
        )
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