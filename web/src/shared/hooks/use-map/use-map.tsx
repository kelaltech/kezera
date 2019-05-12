import React, { useEffect, useRef, useState } from 'react'
import { Map, MapboxOptions } from 'mapbox-gl'

import './use-map.scss'

export type IUseMapOptions = {
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  /**
   * Note: .container is ignored
   */
  mapOptions?: MapboxOptions
}

function useMap({ containerProps, mapOptions }: IUseMapOptions): [JSX.Element, Map?] {
  const [map, setMap] = useState<Map>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMap(
      new Map({
        style: 'mapbox://styles/mapbox/streets-v11',
        ...mapOptions,
        container: containerRef.current!
      })
    )

    return () => {
      map && map.remove()
    }
  }, [])

  return [<div {...containerProps} ref={containerRef} />, map]
}

export default useMap
