"use client"

import { useEffect, useRef } from "react"

const GOOGLE_MAPS_API_KEY = "AIzaSyAI4IGu6fbylowQS89deMLRKUnP8kTERiY"
const GOOGLE_MAPS_MAP_ID = "8ad23a51fb86cfb05286e9ce"

const BORUCH_POSITION = {
  lat: 53.43287322323469,
  lng: 14.556013226121532,
}

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=BORUCH+Myjnia+R%C4%99czna+Plac+Rod%C5%82a+8+Szczecin"

const APPLE_MAPS_URL =
  "https://maps.apple.com/?q=BORUCH+Myjnia+Szczecin&ll=53.43292196110834,14.555987074586804"

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

  marker.className = "boruch-map-marker"

  marker.innerHTML = `
    <div class="boruch-map-marker__card">
      <span class="boruch-map-marker__eyebrow">
        PLAC RODŁA 8
      </span>

      <span class="boruch-map-marker__name">
        Boruch Myjnia
      </span>

      <span class="boruch-map-marker__level">
        MYJNIA · DETAILING
      </span>
    </div>

    <div class="boruch-map-marker__pointer"></div>

    <div class="boruch-map-marker__target">
      <span class="boruch-map-marker__pulse"></span>
      <span class="boruch-map-marker__halo"></span>
      <span class="boruch-map-marker__dot"></span>
    </div>
  `

  return marker
}

export function BoruchGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<any>(null)

  function openDirections() {
    const isAppleDevice =
      /iPhone|iPad|iPod/i.test(navigator.userAgent)

    window.open(
      isAppleDevice
        ? APPLE_MAPS_URL
        : GOOGLE_MAPS_URL,
      "_blank",
      "noopener,noreferrer",
    )
  }

  useEffect(() => {
    const container = mapRef.current

    if (!container) return

    let marker: any = null
    let cancelled = false
    let initialized = false

    async function initMap() {
      if (
        initialized ||
        cancelled
      ) {
        return
      }

      initialized = true

      try {
        installGoogleMapsBootstrap()

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

        const RenderingType =
          mapsLibrary.RenderingType

        const AdvancedMarkerElement =
          markerLibrary.AdvancedMarkerElement

        const ColorScheme =
          coreLibrary.ColorScheme

        const map = new Map(container, {
          center: BORUCH_POSITION,
          zoom: 17,

          mapId: GOOGLE_MAPS_MAP_ID,

          renderingType:
            RenderingType?.VECTOR ?? "VECTOR",

          colorScheme:
            ColorScheme?.DARK ?? "DARK",

          isFractionalZoomEnabled: true,

          disableDefaultUI: true,

          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,

          clickableIcons: false,

          gestureHandling: "cooperative",

          keyboardShortcuts: false,

          heading: 0,
          tilt: 0,

          backgroundColor: "#080809",
        })

        googleMapRef.current = map

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

    let observer: IntersectionObserver | null = null

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const shouldLoad =
            entries.some(
              (entry) =>
                entry.isIntersecting,
            )

          if (!shouldLoad) {
            return
          }

          observer?.disconnect()

          void initMap()
        },
        {
          root: null,
          rootMargin: "500px 0px",
          threshold: 0,
        },
      )

      observer.observe(container)
    } else {
      void initMap()
    }

    return () => {
      cancelled = true

      observer?.disconnect()

      googleMapRef.current = null

      if (marker) {
        marker.map = null
      }
    }
  }, [])

  function zoomIn() {
    const map = googleMapRef.current

    if (!map) return

    const currentZoom =
      map.getZoom?.() ?? 17

    map.setZoom(currentZoom + 1)
  }

  function zoomOut() {
    const map = googleMapRef.current

    if (!map) return

    const currentZoom =
      map.getZoom?.() ?? 17

    map.setZoom(currentZoom - 1)
  }

  function resetMap() {
    const map = googleMapRef.current

    if (!map) return

    map.panTo(BORUCH_POSITION)
    map.setZoom(17)
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#080809]">
      <div
        ref={mapRef}
        className="absolute inset-0 size-full"
        aria-label="Mapa lokalizacji BORUCH Myjnia Szczecin"
      />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/32 to-transparent" />

        <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-black/16 to-transparent" />

        <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black/16 to-transparent" />
      </div>

      <div className="absolute right-3 top-3 z-20 flex flex-col overflow-hidden border border-white/10 bg-[#0b0b0c]/95 shadow-2xl backdrop-blur-md sm:right-4 sm:top-4">
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Przybliż mapę"
          className="grid size-9 place-items-center border-b border-white/10 text-lg font-light text-white/85 transition-colors hover:bg-white/8 hover:text-white sm:size-11 sm:text-xl"
        >
          +
        </button>

        <button
          type="button"
          onClick={zoomOut}
          aria-label="Oddal mapę"
          className="grid size-9 place-items-center border-b border-white/10 text-xl font-extralight text-white/85 transition-colors hover:bg-white/8 hover:text-white sm:size-11 sm:text-2xl"
        >
          −
        </button>

        <button
          type="button"
          onClick={resetMap}
          aria-label="Wycentruj mapę na BORUCH"
          className="grid size-9 place-items-center text-white/65 transition-colors hover:bg-white/8 hover:text-brand sm:size-11"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
            className="size-3.5 sm:size-4"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3" />
            <path d="M12 19v3" />
            <path d="M2 12h3" />
            <path d="M19 12h3" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2 sm:right-auto sm:max-w-[360px]">
        <button
  type="button"
  onClick={openDirections}
  className="flex min-h-12 w-full items-center justify-between border border-white/10 bg-[#0a0a0b]/95 px-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-brand/40 hover:text-brand"
>
  <span>Wyznacz trasę</span>

  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
    className="size-4"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
</button>
      </div>

      <style jsx global>{`
        .boruch-map-marker {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateY(-3px);
          pointer-events: none;
          user-select: none;
        }

        .boruch-map-marker__card {
          position: relative;
          display: flex;
          min-width: 154px;
          flex-direction: column;
          padding: 10px 12px 9px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(8, 8, 9, 0.96);
          box-shadow:
            0 18px 45px rgba(0, 0, 0, 0.46),
            inset 0 1px 0 rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(12px);
        }

        .boruch-map-marker__eyebrow {
          margin-bottom: 4px;
          color: rgba(239, 72, 78, 0.92);
          font-size: 7px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.18em;
        }

        .boruch-map-marker__name {
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: 0.08em;
        }

        .boruch-map-marker__level {
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.46);
          font-size: 7px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.1em;
        }

        .boruch-map-marker__pointer {
          width: 9px;
          height: 9px;
          margin-top: -5px;
          border-right: 1px solid rgba(255, 255, 255, 0.13);
          border-bottom: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(8, 8, 9, 0.96);
          transform: rotate(45deg);
        }

        .boruch-map-marker__target {
          position: relative;
          display: grid;
          width: 28px;
          height: 28px;
          margin-top: 5px;
          place-items: center;
        }

        .boruch-map-marker__pulse {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(239, 72, 78, 0.2);
          animation: boruch-map-pulse 2.2s ease-out infinite;
        }

        .boruch-map-marker__halo {
          position: absolute;
          width: 21px;
          height: 21px;
          border: 1px solid rgba(239, 72, 78, 0.42);
          border-radius: 9999px;
          background: rgba(239, 72, 78, 0.12);
        }

        .boruch-map-marker__dot {
          position: relative;
          z-index: 1;
          width: 11px;
          height: 11px;
          border: 2px solid #ffffff;
          border-radius: 9999px;
          background: #ef484e;
          box-shadow:
            0 0 0 4px rgba(239, 72, 78, 0.16),
            0 8px 18px rgba(0, 0, 0, 0.46);
        }

        @keyframes boruch-map-pulse {
          0% {
            transform: scale(0.85);
            opacity: 0.85;
          }

          72% {
            transform: scale(1.85);
            opacity: 0;
          }

          100% {
            transform: scale(1.85);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .boruch-map-marker__pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}