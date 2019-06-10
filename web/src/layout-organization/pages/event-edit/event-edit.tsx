import React, { useState } from 'react'
import {
  Block,
  Button,
  Content,
  Flex,
  ImageInput,
  Input,
  TextArea,
  Yoga,
  Title,
  Anchor
} from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextField from '@material-ui/core/TextField'
import { Dialog } from '@material-ui/core'
import axios from 'axios'
import { IOrganizationEventResponse } from '../../../apiv/event.apiv'
import { Schema } from 'mongoose'
import useField from '../../../shared/hooks/use-field/use-field'
import { useEventDispatch } from '../../stores/events/events.provider'
import { EditEvent } from '../../stores/events/events.action'
import { string } from 'prop-types'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { LngLat } from 'mapbox-gl'
import LocationPickerDialog from '../../../shared/components/location-picker-dialog/location-picker-dialog'

interface IEventEditProps {
  event: IOrganizationEventResponse
  open: boolean
  onClose: () => void
}

export default function EventEdit(props: IEventEditProps) {
  const { loading, t } = useLocale(['event'])
  let [locationPickerOpen, setLocationPickerOpen] = useState(false)
  const [lngLat, setLngLatOnState] = useState<LngLat>()
  const parseGeo = (lngLat: LngLat): string => {
    const factor = 100000
    return `${Math.round(lngLat.lat * factor) / factor}° ${
      lngLat.lat > 0 ? 'N' : 'S'
    }, ${Math.round(lngLat.lng * factor) / factor}°  ${lngLat.lng > 0 ? 'E' : 'W'}`
  }

  let [newEvent, setNewEvent] = useState({
    title: props.event.title,
    description: props.event.description,
    amountOfPeople: props.event.amountOfPeople,
    startDate: props.event.startDate,
    endDate: props.event.endDate,
    location: {
      geo: {
        type: 'Point',
        coordinates: props.event.location.geo.coordinates
      },
      address: ''
    }
  })
  const emitChanges = (eventChanges: any): void => {
    setNewEvent({ ...event, ...eventChanges })
  }

  const setLngLat = (lngLat?: LngLat) => {
    setLngLatOnState(lngLat)
    emitChanges({
      location: {
        geo: {
          type: 'Point',
          coordinates: lngLat ? [lngLat.lng, lngLat.lat] : undefined
        },
        address: undefined
      }
    })
  }

  let eventDispatch = useEventDispatch()

  let HandleUpdate = function(e: any, id: string) {
    e.preventDefault()
    let body = new FormData()
    body.append('event', JSON.stringify(newEvent))
    if (e.target.image.files[0]) {
      body.append('image', e.target.image.files[0])
    }
    console.log(body)
    EditEvent(id, body, eventDispatch)
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL">
          {' '}
          {t`edit`} {t`event`}{' '}
        </Title>
      </Block>
      <Content size={'L'} style={{ overflow: 'visible' }}>
        <form
          onSubmit={e => HandleUpdate(e, props.event._id.toString())}
          encType={'multipart/form-data'}
        >
          <Block first>
            <Flex>
              <ImageInput name={'image'} src={`/api/event/${props.event._id}/picture`} />
              <Input
                name="title"
                className={'margin-big full-width'}
                placeholder={t`name`}
                required
                defaultValue={props.event.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Flex>
          </Block>
          <Block>
            <TextField
              multiline={true}
              name="description"
              className={'full-width'}
              placeholder={'Description...'}
              defaultValue={props.event.description}
              onChange={e =>
                setNewEvent({ ...newEvent, description: e.target.value.trim() })
              }
            />
          </Block>
          <Yoga maxCol={2}>
            <Block>
              <label className="flex">
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'calendar'}
                />
                <TextField
                  name="startDate"
                  className="full-width"
                  label={t`start date`}
                  type="date"
                  defaultValue={new Date().toLocaleDateString()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e =>
                    setNewEvent({ ...newEvent, startDate: new Date(e.target.value) })
                  }
                />
              </label>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'map-marker'}
                />
                {/*<Input
                  name={'location'}
                  className="full-width"
                  placeholder={t`location`}
                  defaultValue={props.event.location.address}
                  onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                />*/}
                <div>
                  <div className={'margin-top-normal'}>
                    {!newEvent.location.geo.coordinates.length ? (
                      <div className={'fg-blackish italic'}>Location not selected.</div>
                    ) : (
                      <div>
                        <Anchor
                          href={`https://www.google.com/maps?q=${
                            newEvent.location.geo.coordinates[1]
                          },${newEvent.location.geo.coordinates[0]}`}
                          target={'_blank'}
                          rel={'noopener'}
                        >
                          {parseGeo(
                            new LngLat(
                              newEvent.location.geo.coordinates[0],
                              newEvent.location.geo.coordinates[1]
                            )
                          )}
                        </Anchor>{' '}
                        (<Anchor onClick={() => setLngLat(undefined)}>&times;</Anchor>)
                        {newEvent.location.address && (
                          <div>{newEvent.location.address}</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className={'margin-top-normal'}>
                    <Anchor onClick={() => setLocationPickerOpen(!locationPickerOpen)}>
                      Pick a Location on Map
                    </Anchor>
                  </div>

                  <LocationPickerDialog
                    open={locationPickerOpen}
                    onClose={() => setLocationPickerOpen(!locationPickerOpen)}
                    lngLat={lngLat}
                    setLngLat={setLngLat}
                  />
                </div>
              </label>
            </Block>
            <Block>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'calendar'}
                />
                <TextField
                  name="endDate"
                  className="full-width"
                  label={t`end date`}
                  type="date"
                  defaultValue={new Date().toLocaleDateString()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e =>
                    setNewEvent({ ...newEvent, endDate: new Date(e.target.value) })
                  }
                />
              </label>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'user-circle'}
                />
                <Input
                  name="amountOfPeople"
                  className="full-width"
                  type={'number'}
                  placeholder={t`amount of people`}
                  defaultValue={'' + props.event.amountOfPeople}
                  onChange={e =>
                    setNewEvent({
                      ...newEvent,
                      amountOfPeople: Number.parseInt(e.target.value)
                    })
                  }
                  required
                />
              </label>
            </Block>
          </Yoga>
          <Block last className={'right'}>
            <Button
              type={'submit'}
              onClick={() => props.onClose()}
              primary={true}
              className={''}
            >
              {t`update`}
            </Button>
            &emsp;
            <Button onClick={() => props.onClose()} className={''}>
              {t`cancel`}
            </Button>
          </Block>
        </form>
      </Content>
    </Dialog>
  )
}
