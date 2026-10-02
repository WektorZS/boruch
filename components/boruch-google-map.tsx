"use client"

import { useEffect, useRef } from "react"

const GOOGLE_MAPS_API_KEY = "AIzaSyAI4IGu6fbylowQS89deMLRKUnP8kTERiY"
const GOOGLE_MAPS_MAP_ID = "8ad23a51fb86cfb05286e9ce"

const BORUCH_POSITION = {
  lat: 53.43291636824182,
  lng: 14.55341617722408,
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

  const config = {
    key: GOOGLE_MAPS_API_KEY,
    v: "weekly",
  }

  const productName = "The Google Maps JavaScript API"
  const namespace = "google"
  const importLibraryName = "importLibrary"
  const callbackName = "__ib__"
  const documentRef = document
  const windowRef = window as any

  windowRef[namespace] = windowRef[namespace] || {}

  const maps =
    windowRef[namespace].maps ||
    (windowRef[namespace].maps = {})

  const requestedLibraries = new Set<string>()
  const params = new URLSearchParams()

  let loaderPromise: Promise<void> | undefined

  const load = () =>
    loaderPromise ||
    (loaderPromise = new Promise<void>((resolve, reject) => {
      const script = documentRef.createElement("script")

      params.set(
        "libraries",
        [...requestedLibraries].join(","),
      )

      for (const key in config) {
        params.set(
          key.replace(
            /[A-Z]/g,
            (letter) => `_${letter[0].toLowerCase()}`,
          ),
          String(config[key as keyof typeof config]),
        )
      }

      params.set(
        "callback",
        `${namespace}.maps.${callbackName}`,
      )

      script.src =
        `https://maps.${namespace}apis.com/maps/api/js?${params.toString()}`

      script.async = true
      script.defer = true

      maps[callbackName] = resolve

      script.onerror = () => {
        loaderPromise = undefined

        reject(
          new Error(
            `${productName} could not load.`,
          ),
        )
      }

      documentRef.head.appendChild(script)
    }))

  if (maps[importLibraryName]) {
    console.warn(
      `${productName} only loads once. Ignoring duplicate bootstrap.`,
    )
  } else {
    maps[importLibraryName] = (
      library: string,
      ...args: unknown[]
    ) => {
      requestedLibraries.add(library)

      return load().then(() =>
        maps[importLibraryName](
          library,
          ...args,
        ),
      )
    }
  }
}

function createBoruchMarker() {
  const marker = document.createElement("div")

  marker.innerHTML = `
    <div
      style="
        width:18px;
        height:18px;
        border-radius:9999px;
        background:#ef484e;
        border:3px solid #ffffff;
        box-shadow:0 0 0 5px rgba(239,72,78,.2),0 8px 20px rgba(0,0,0,.35);
      "
    ></div>
  `

  return marker
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

const ColorScheme =
  coreLibrary.ColorScheme

        const map = new Map(container, {
  center: BORUCH_POSITION,
  zoom: 17.3,

  mapId: GOOGLE_MAPS_MAP_ID,

  colorScheme:
    ColorScheme?.DARK ?? "DARK",

  disableDefaultUI: true,

  zoomControl: true,

  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,

  clickableIcons: false,

  gestureHandling: "cooperative",

  keyboardShortcuts: false,

  backgroundColor: "#080809",
})

        marker = new AdvancedMarkerElement({
          map,
          position: BORUCH_POSITION,
          title: "BORUCH Myjnia Szczecin",
          content: createBoruchMarker(),
          zIndex: 1000,
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