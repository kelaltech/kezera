import React from 'react'
import { Block, Content, Flex, Input, TextArea } from 'gerami'

import useLocale from '../../../../../shared/hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../../../api/modules/organization/organization.apiv'
import useField from '../../../../../shared/hooks/use-field/use-field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationApplyBio({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const bio = useField<HTMLInputElement>({
    initialValue: organization.bio,
    validateOnChange: true,
    maxLength: 10000,
    setValueHook: async value => {
      emitChanges({ bio: value })
    }
  })

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
            <TextArea
              rows={14}
              className={'margin-vertical-normal margin-auto full-width'}
              {...bio.textAreaProps}
              label={`Organization Bio`}
              maxLength={10000}
            />
            {validationError(bio.error)}
          </Flex>
          <div className={'right font-S light fg-blackish'}>
            {10000 - bio.value.length} / 10000
          </div>
        </Block>
      </Content>
    )
  )
}

export default OrganizationApplyBio
