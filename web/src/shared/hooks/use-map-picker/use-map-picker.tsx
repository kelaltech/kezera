import React, { useState } from 'react'
import { useEffect } from 'react'
import mapboxgl, { LngLat, Marker, Map, LngLatLike } from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import './use-map-picker.scss'

export type IUseMapPickerOptions = {
  center?: LngLat
  map?: Map
}

function useMapPicker({
  center = new LngLat(38.76272639655801, 9.010942435450318),
  map
}: IUseMapPickerOptions): LngLat {
  const [lngLat, setLngLat] = useState<LngLat>(center)

  useEffect(() => {
    if (!map) return

    const marker = new Marker({ draggable: true }).setLngLat(lngLat).addTo(map)
    marker.on('dragend', () => setLngLat(marker.getLngLat()))

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    })
    map.addControl(geocoder)

    return () => {
      map.removeControl(geocoder)
      marker && marker.remove()
    }
  }, [map])

  return lngLat
}

export default useMapPicker
