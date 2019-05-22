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
import { Dialog, TextField } from '@material-ui/core'
import { useEventDispatch } from '../../stores/events/events.provider'
import { AddEvents } from '../../stores/events/events.action'
import useField from '../../../shared/hooks/use-field/use-field'
import { IOrganizationEventRequest } from '../../../apiv/event.apiv'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import LocationPickerDialog from '../../../shared/components/location-picker-dialog/location-picker-dialog'
import { LngLat } from 'mapbox-gl'

interface IEventAddProps {
  open: boolean
  onClose: () => void
}

export default function EventAdd(props: IEventAddProps) {
  const [lngLat, setLngLatOnState] = useState<LngLat>()
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
  let [event, setEvent] = useState({
    title: '',
    description: '',
    amountOfPeople: '',
    startDate: '',
    endDate: '',
    location: {
      geo: {
        type: 'Point',
        coordinates: []
      },
      address: ''
    }
  })
  let [locationPickerOpen, setLocationPickerOpen] = useState(false)
  const { loading, t } = useLocale(['event'])
  let eventDispatch = useEventDispatch()

  let HandleAdd = function(e: any) {
    e.preventDefault()
    let data = new FormData()
    data.append('event', JSON.stringify(event))
    data.append('image', e.target.image.files[0])
    AddEvents(data, eventDispatch)
    props.onClose()
  }
  const emitChanges = (eventChanges: any): void => {
    setEvent({ ...event, ...eventChanges })
  }
  const TitleInput = useField<HTMLInputElement>({
    minLength: 5,
    maxLength: 50,
    setValueHook: async value => {
      emitChanges({ title: value })
    }
  })

  const DescriptionInput = useField<HTMLInputElement>({
    minLength: 100,
    maxLength: 450,
    setValueHook: async value => {
      emitChanges({ description: value.trim() })
    }
  })
  const StartDateInput = useField<HTMLTimeElement>({
    minLength: 5,
    maxLength: 25,
    setValueHook: async value => {
      emitChanges({ startDate: value })
    }
  })

  const EndDateInput = useField<HTMLTimeElement>({
    minLength: 5,
    maxLength: 25,
    setValueHook: async value => {
      emitChanges({ endDate: value })
    }
  })

  const PeopleInput = useField<HTMLInputElement>({
    minLength: 1,
    maxLength: 10,
    setValueHook: async value => {
      emitChanges({ amountOfPeople: value })
    }
  })

  const LocationInput = useField<HTMLInputElement>({
    minLength: 3,
    maxLength: 200,
    setValueHook: async value => {
      emitChanges({ location: value })
    }
  })

  const parseGeo = (lngLat: LngLat): string => {
    const factor = 100000
    return `${Math.round(lngLat.lat * factor) / factor}° ${
      lngLat.lat > 0 ? 'N' : 'S'
    }, ${Math.round(lngLat.lng * factor) / factor}°  ${lngLat.lng > 0 ? 'E' : 'W'}`
  }

  const image = useField<HTMLInputElement>()

  const validationError = (error: string | null) =>
    error === null ? null : (
      <div
        className={'font-L bold fg-accent margin-left-normal margin-auto'}
        title={error}
        style={{ color: 'red', cursor: 'default' }}
      >
        !
      </div>
    )

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL"> {t`create event`} </Title>
      </Block>
      <Content size={'L'}>
        <form onSubmit={e => HandleAdd(e)} encType={'multipart/form-data'}>
          <Block first>
            <Flex>
              <ImageInput name={'image'} innerRef={image.ref} />
              <Input
                name="title"
                className={'margin-big full-width'}
                placeholder={t`name`}
                inputRef={TitleInput.ref}
                {...TitleInput.inputProps}
                required
              />
              {validationError(TitleInput.error)}
            </Flex>
          </Block>
          <Block>
            <TextField
              multiline={true}
              name="description"
              inputRef={DescriptionInput.ref}
              {...DescriptionInput.inputProps}
              className={'full-width'}
              placeholder={t`description` + `...`}
            />
            {validationError(DescriptionInput.error)}
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
                  inputRef={StartDateInput.ref}
                  {...StartDateInput.inputProps}
                  type="date"
                  defaultValue={Date.now()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
                {validationError(StartDateInput.error)}
              </label>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'map-marker'}
                />
                {/* <Input
                  name={'location'}
                  className="full-width"
                  placeholder={t`location`}
                  {...LocationInput.inputProps}
                  inputRef={LocationInput.ref}
                  required
                />
                {validationError(LocationInput.error)}*/}
                <div>
                  <div className={'margin-top-normal'}>
                    {!event.location.geo.coordinates.length ? (
                      <div className={'fg-blackish italic'}>Location not selected.</div>
                    ) : (
                      <div>
                        <Anchor
                          href={`https://www.google.com/maps?q=${
                            event.location.geo.coordinates[1]
                          },${event.location.geo.coordinates[0]}`}
                          target={'_blank'}
                          rel={'noopener'}
                        >
                          {parseGeo(
                            new LngLat(
                              event.location.geo.coordinates[0],
                              event.location.geo.coordinates[1]
                            )
                          )}
                        </Anchor>{' '}
                        (<Anchor onClick={() => setLngLat(undefined)}>&times;</Anchor>)
                        {event.location.address && <div>{event.location.address}</div>}
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
                  inputRef={EndDateInput.ref}
                  {...EndDateInput.inputProps}
                  defaultValue={Date.now()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
                {validationError(EndDateInput.error)}
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
                  inputRef={PeopleInput.ref}
                  {...PeopleInput.inputProps}
                  required
                />
                {validationError(PeopleInput.error)}
              </label>
            </Block>
          </Yoga>
          <Block last className={'right'}>
            <Button type={'submit'} onClick={() => {}} primary={true} className={''}>
              {t`create`}
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
