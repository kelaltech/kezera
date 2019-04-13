import React from 'react'
import { Block, Content, Flex } from 'gerami'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'

import useLocale from '../../hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../api/modules/organization/organization.apiv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useField from '../../hooks/use-field/use-field'
import { IOrganizationType } from '../../../../../api/models/organization/organization.model'

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

        {/* todo: accept array of locations */}
        <Block last>
          {/* todo: make use of latitude and longitude (and google maps) */}
          <Flex>
            <div style={{ margin: 'auto auto auto 0', width: 40 }}>
              <FontAwesomeIcon icon={'map-marker'} />
            </div>
            {/* todo: address may not be attached in request or addressed in the back-end, investigate! */}
            <TextField
              className={'margin-vertical-normal margin-auto full-width'}
              {...address.inputProps}
              label={`Address (Optional)`}
            />
          </Flex>
        </Block>
      </Content>
    )
  )
}

export default OrganizationFormAbout
