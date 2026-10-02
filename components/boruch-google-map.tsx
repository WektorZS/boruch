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

  marker.className = "boruch-premium-marker"

  marker.innerHTML = `
    <div class="boruch-premium-marker__label">
      <span class="boruch-premium-marker__brand">
        BORUCH
      </span>

      <span class="boruch-premium-marker__meta">
        MYJNIA · DETAILING
      </span>
    </div>

    <div class="boruch-premium-marker__pin">
      <span class="boruch-premium-marker__pulse"></span>
      <span class="boruch-premium-marker__ring"></span>
      <span class="boruch-premium-marker__core"></span>
    </div>
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
          zoom: 17.4,

          mapId: GOOGLE_MAPS_MAP_ID,
          mapTypeId: "roadmap",

          colorScheme:
            ColorScheme?.DARK ?? "DARK",

          disableDefaultUI: true,

          zoomControl: true,
          zoomControlOptions: {
            position:
              googleMaps.ControlPosition.RIGHT_BOTTOM,
          },

          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,

          clickableIcons: false,

          gestureHandling: "cooperative",

          keyboardShortcuts: false,

          backgroundColor: "#0a0a0b",
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
    <>
      <div
        ref={mapRef}
        className="absolute inset-0 size-full"
        aria-label="Mapa lokalizacji BORUCH Myjnia Szczecin"
      />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,.18)_100%)]" />

        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/22 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/25 to-transparent" />

        <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-black/18 to-transparent" />
      </div>

      <style jsx global>{`
        .boruch-premium-marker {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateY(-2px);
          user-select: none;
          pointer-events: none;
        }

        .boruch-premium-marker__label {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 112px;
          margin-bottom: 10px;
          padding: 8px 11px 7px;
          background: rgba(9, 9, 10, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 14px 36px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(10px);
        }

        .boruch-premium-marker__label::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -5px;
          width: 9px;
          height: 9px;
          background: rgba(9, 9, 10, 0.94);
          border-right: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          transform: translateX(-50%) rotate(45deg);
        }

        .boruch-premium-marker__brand {
          color: #f5f4f1;
          font-size: 11px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: 0.12em;
        }

        .boruch-premium-marker__meta {
          color: rgba(255, 255, 255, 0.46);
          font-size: 7px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0.12em;
        }

        .boruch-premium-marker__pin {
          position: relative;
          width: 26px;
          height: 26px;
          display: grid;
          place-items: center;
        }

        .boruch-premium-marker__pulse {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(239, 72, 78, 0.18);
          animation: boruch-map-pulse 2.2s ease-out infinite;
        }

        .boruch-premium-marker__ring {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          border: 1px solid rgba(239, 72, 78, 0.34);
          background: rgba(239, 72, 78, 0.08);
        }

        .boruch-premium-marker__core {
          position: relative;
          z-index: 2;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #ef484e;
          border: 2px solid #ffffff;
          box-shadow:
            0 0 0 3px rgba(239, 72, 78, 0.16),
            0 6px 16px rgba(0, 0, 0, 0.42);
        }

        @keyframes boruch-map-pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }

          70% {
            transform: scale(1.8);
            opacity: 0;
          }

          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .boruch-premium-marker__pulse {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}