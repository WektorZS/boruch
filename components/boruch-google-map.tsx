"use client"

import { useEffect, useRef } from "react"
import { importLibrary, setOptions } from "@googlemaps/js-api-loader"

const GOOGLE_MAPS_API_KEY = "AIzaSyAI4IGu6fbylowQS89deMLRKUnP8kTERiY"
const GOOGLE_MAPS_MAP_ID = "8ad23a51fb86cfb05286e9ce"

const BORUCH_POSITION = {
  lat: 53.43313691416123,
  lng: 14.555602179682984,
}

let loaderConfigured = false

export function BoruchGoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mapRef.current

    if (!container) return

    if (!loaderConfigured) {
      setOptions({
        key: GOOGLE_MAPS_API_KEY,
        v: "weekly",
      })

      loaderConfigured = true
    }

    let marker: google.maps.marker.AdvancedMarkerElement | null = null
    let cancelled = false

    async function initMap() {
      try {
        const { Map } = await importLibrary("maps")
        const { ColorScheme } = await importLibrary("core")
        const { AdvancedMarkerElement, PinElement } =
          await importLibrary("marker")

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
        })

        marker.append(pin)
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