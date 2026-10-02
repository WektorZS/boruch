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
  __boruchGoogleMapsBootstrap?: boolean
}

function installGoogleMapsBootstrap() {
  const googleWindow = window as GoogleMapsWindow

  if (googleWindow.google?.maps?.importLibrary) {
    return
  }

  if (googleWindow.__boruchGoogleMapsBootstrap) {
    return
  }

  googleWindow.__boruchGoogleMapsBootstrap = true

  const g = {
    key: GOOGLE_MAPS_API_KEY,
    v: "weekly",
  }

  const p = "The Google Maps JavaScript API"
  const c = "google"
  const l = "importLibrary"
  const q = "__ib__"
  const m = document
  const b = window as any

  b[c] = b[c] || {}

  const d = b[c].maps || (b[c].maps = {})
  const r = new Set<string>()
  const e = new URLSearchParams()

  let h: Promise<void> | undefined
  let a: HTMLScriptElement

  const u = () =>
    h ||
    (h = new Promise<void>(async (resolve, reject) => {
      a = m.createElement("script")

      e.set("libraries", [...r].join(","))

      for (const key in g) {
        e.set(
          key.replace(
            /[A-Z]/g,
            (letter) => `_${letter[0].toLowerCase()}`,
          ),
          String(g[key as keyof typeof g]),
        )
      }

      e.set("callback", `${c}.maps.${q}`)

      a.src =
        `https://maps.${c}apis.com/maps/api/js?${e.toString()}`

      d[q] = resolve

      a.onerror = () => {
        h = undefined
        reject(
          new Error(
            `${p} could not load.`,
          ),
        )
      }

      m.head.appendChild(a)
    }))

  if (d[l]) {
    console.warn(
      `${p} only loads once. Ignoring duplicate bootstrap.`,
    )
  } else {
    d[l] = (
      library: string,
      ...args: unknown[]
    ) => {
      r.add(library)

      return u().then(() =>
        d[l](library, ...args),
      )
    }
  }
}

export function BoruchGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mapRef.current

    if (!container) return

    installGoogleMapsBootstrap()

    let marker: any = null
    let cancelled = false

    async function initMap() {
      try {
        const googleMaps =
          (window as GoogleMapsWindow).google?.maps

        if (!googleMaps?.importLibrary) {
          throw new Error(
            "google.maps.importLibrary nie zostało zainstalowane.",
          )
        }

        const mapsLibrary =
          await googleMaps.importLibrary("maps")

        const markerLibrary =
          await googleMaps.importLibrary("marker")

        const coreLibrary =
          await googleMaps.importLibrary("core")

        if (cancelled) return

        const Map =
          mapsLibrary.Map

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