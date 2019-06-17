import React, { useState } from 'react'
import { Anchor, Block, Content, Flex } from 'gerami'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { LngLat } from 'mapbox-gl'

import useLocale from '../../hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../api/modules/organization/organization.apiv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useField from '../../hooks/use-field/use-field'
import { IOrganizationType } from '../../../../../api/models/organization/organization.model'
import LocationPickerDialog from '../location-picker-dialog/location-picker-dialog'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

const organizationTypes: IOrganizationType[] = [
  'NGO',
  'HOSPITAL',
  'GOVERNMENTAL',
  'PRIVATE'
] // todo: update these manually or go full dynamic

const parseGeo = (lngLat: LngLat): string => {
  const factor = 100000
  return `${Math.round(lngLat.lat * factor) / factor}° ${
    lngLat.lat > 0 ? 'N' : 'S'
  }, ${Math.round(lngLat.lng * factor) / factor}°  ${lngLat.lng > 0 ? 'E' : 'W'}`
}

function OrganizationFormAbout({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const type = useField(
    {
      initialValue: organization.type,
      setValueHook: async value => {
        emitChanges({ type: value })
      }
    },
    undefined,
    [organization.type]
  )

  // todo: temp
  const address = useField(
    {
      initialValue: organization.locations.length
        ? organization.locations[0].address
        : '',
      optional: true,
      setValueHook: async value => {
        emitChanges({ locations: value ? [{ address: value }] : [] })
      }
    },
    undefined,
    [organization.locations, organization.locations.length]
  )

  const [locationPickerOpen, setLocationPickerOpen] = useState(false)
  const [lngLat, setLngLatOnState] = useState<LngLat>()

  const setLngLat = (lngLat?: LngLat) => {
    setLngLatOnState(lngLat)
    emitChanges({
      locations: lngLat
        ? [
            {
              geo: { type: 'Point', coordinates: [lngLat.lng, lngLat.lat] },
              address: undefined
            }
          ]
        : []
    })
  }

  return (
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          About
        </Block>

        <hr />

        <Block>
          <Flex>
            <div style={{ margin: 'auto auto 6px 0', width: 40 }}>
              <FontAwesomeIcon icon={'question-circle'} />
            </div>
            <FormControl className={'full-width'}>
              <InputLabel htmlFor={'organization-type-input'} shrink>
                Organization Type
              </InputLabel>
              <Select
                value={organization.type}
                input={<MatInput id="organization-type-input" {...type.inputProps} />}
              >
                {organizationTypes.map((type, i) => (
                  <MenuItem key={i} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Flex>
        </Block>

        <Block last>
          <Flex>
            <div style={{ margin: 'auto 0 auto 0', width: 40 }}>
              <FontAwesomeIcon icon={'map-marker'} />
            </div>
            <div>
              <div className={'margin-top-normal'}>
                {!organization.locations.length ? (
                  <div className={'fg-blackish italic'}>
                    Location not selected. (Optional)
                  </div>
                ) : (
                  <div>
                    <Anchor
                      href={`https://www.google.com/maps?q=${organization.locations[0].geo.coordinates[1]},${organization.locations[0].geo.coordinates[0]}`}
                      target={'_blank'}
                      rel={'noopener'}
                    >
                      {parseGeo(
                        new LngLat(
                          organization.locations[0].geo.coordinates[0],
                          organization.locations[0].geo.coordinates[1]
                        )
                      )}
                    </Anchor>{' '}
                    (<Anchor onClick={() => setLngLat(undefined)}>&times;</Anchor>)
                    {organization.locations[0].address && (
                      <div>{organization.locations[0].address}</div>
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
          </Flex>
        </Block>
      </Content>
    )
  )
}

export default OrganizationFormAbout
