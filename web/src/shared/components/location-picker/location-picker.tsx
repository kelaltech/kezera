import React, { useEffect, useRef } from 'react'
import { Block, Button, Content } from 'gerami'
import { IContentProps } from 'gerami/src/components/Content/Content'
import { LngLat, Map } from 'mapbox-gl'

import './location-picker.scss'
import '../../../assets/styles/mapbox-gl.scss'
import useMapPicker from '../../hooks/use-map-picker/use-map-picker'

type Props = IContentProps & {
  center?: LngLat
  setLngLat?: (lngLat: LngLat) => void
}

function LocationPicker({ className, center, setLngLat, ...contentProps }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>()

  const lngLat = useMapPicker({ center, map: mapRef.current })

  useEffect(() => {
    if (!mapContainerRef.current) return

    mapRef.current = new Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11'
    })

    return () => mapRef.current && mapRef.current.remove()
  }, [mapContainerRef.current])

  const handleSelect = () => {
    setLngLat && setLngLat(lngLat)
  }

  return (
    <Content {...contentProps}>
      <Block first>
        <h4>Pick a Location</h4>
      </Block>

      <div style={{ width: `100vh` }} />
      <div className={'location-picker-map-container'}>
        <div ref={mapContainerRef} className={'location-picker-map bg-whitish'} />
      </div>

      <div className={'padding-big right'}>
        <Button primary onClick={handleSelect}>
          Select
        </Button>
      </div>
    </Content>
  )
}

export default LocationPicker
