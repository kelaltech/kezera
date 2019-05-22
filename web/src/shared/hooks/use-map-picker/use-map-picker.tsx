import React, { useState } from 'react'
import { useEffect } from 'react'
import mapboxgl, { LngLat, Marker, Map, LngLatLike } from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import './use-map-picker.scss'

export type IUseMapPickerOptions = {
  center?: LngLat
  zoom?: number
  map?: Map
}

function useMapPicker({
  center = new LngLat(38.76272639655801, 9.010942435450318),
  zoom = 14,
  map
}: IUseMapPickerOptions): LngLat {
  const [lngLat, setLngLat] = useState<LngLat>(center)
  const [draggedOnce, setDraggedOnce] = useState(false)

  useEffect(() => {
    if (!map) return

    const marker = new Marker({ draggable: true }).setLngLat(lngLat).addTo(map)
    marker.on('dragend', () => {
      const coords = marker.getLngLat()
      setDraggedOnce(true)
      setLngLat(coords)
      map.flyTo({ center: coords })
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    })
    map.addControl(geocoder)

    map.on('load', () => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          if (!draggedOnce) {
            const coords = new LngLat(position.coords.longitude, position.coords.latitude)
            marker.setLngLat(coords)
            map.flyTo({ zoom, center: coords })
            setLngLat(coords)
          }
        },
        () => {
          map.flyTo({ zoom, center: lngLat })
        }
      )
    })

    return () => {
      map.removeControl(geocoder)
      marker && marker.remove()
    }
  }, [map])

  return lngLat
}

export default useMapPicker
