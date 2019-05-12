import React, { useState } from 'react'
import { useEffect } from 'react'
import mapboxgl, { LngLat, Marker, Map } from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import './use-map-picker.scss'
import useMap, { IUseMapOptions } from '../../hooks/use-map/use-map'

const defaultContainerProps = { style: { width: '100%', height: '100vh' } }
const defaultMapOptions = {
  center: new LngLat(38.76272639655801, 9.010942435450318),
  zoom: 10
}

export type IUseMapPickerOptions = IUseMapOptions & {}

function useMapPicker({
  containerProps,
  mapOptions,
  ...useMapOptions
}: IUseMapPickerOptions): [JSX.Element, LngLat, Map?] {
  const [mapElement, map] = useMap({
    containerProps: {
      ...defaultContainerProps,
      ...containerProps
    },
    mapOptions: {
      ...defaultMapOptions,
      ...mapOptions,
      container: ''
    },
    ...useMapOptions
  })

  const [lngLat, setLngLat] = useState<LngLat>(defaultMapOptions.center)

  const handleChange = (newLngLat: LngLat): void => {
    setLngLat(newLngLat)
  }

  useEffect(() => {
    if (!map) return

    const marker = new Marker({ draggable: true })
      .setLngLat(defaultMapOptions.center)
      .addTo(map)
    marker.on('dragend', () => handleChange(marker.getLngLat()))

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

  return [mapElement, lngLat, map]
}

export default useMapPicker
