import React from 'react'
import { Dialog } from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'
import { LngLat } from 'mapbox-gl'

import './location-picker-dialog.scss'
import LocationPicker from '../location-picker/location-picker'

type Props = DialogProps & {
  lngLat?: LngLat
  setLngLat?: (lngLat: LngLat) => void
}

function LocationPickerDialog({ className, lngLat, setLngLat, ...dialogProps }: Props) {
  const handleSelect = (lngLat: LngLat): void => {
    setLngLat && setLngLat(lngLat)
    dialogProps.onClose && dialogProps.onClose(undefined as any)
  }

  return (
    <Dialog {...dialogProps} className={`${className || ''} location-picker-dialog`}>
      <LocationPicker {...{ lngLat, setLngLat: handleSelect }} />
    </Dialog>
  )
}

export default LocationPickerDialog
