import React from 'react'
import { Block, Content, Flex } from 'gerami'
import { TextField } from '@material-ui/core'

import useLocale from '../../hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../api/modules/organization/organization.apiv'
import useField from '../../hooks/use-field/use-field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationFormBio({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const bio = useField<HTMLInputElement>(
    {
      initialValue: organization.bio,
      validateOnChange: true,
      maxLength: 5000,
      setValueHook: async value => {
        emitChanges({ bio: value })
      }
    },
    undefined,
    [organization.bio]
  )

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
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          Bio
        </Block>

        <hr />

        <Block last>
          <Flex>
            <div style={{ margin: 'auto auto auto 0', width: 40 }}>
              <FontAwesomeIcon icon={'info-circle'} />
            </div>
            <TextField
              multiline
              className={'margin-vertical-normal margin-auto full-width'}
              {...bio.inputProps}
              label={`Organization Bio`}
            />
            {validationError(bio.error)}
          </Flex>
          <div className={'right font-S light fg-blackish'}>
            {Number(bio.config.maxLength) - bio.value.length} / {bio.config.maxLength}
          </div>
        </Block>
      </Content>
    )
  )
}

export default OrganizationFormBio
