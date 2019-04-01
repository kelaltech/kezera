import React from 'react'
import { Block, Content, Flex, Input } from 'gerami'

import useLocale from '../../../../../shared/hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../../../api/modules/organization/organization.apiv'
import useField from '../../../../../shared/hooks/use-field/use-field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationApplyBrand({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const motto = useField<HTMLInputElement>({
    initialValue: organization.motto,
    maxLength: 50,
    optional: true,
    setValueHook: async value => {
      emitChanges({ motto: value })
    }
  })
  const website = useField<HTMLInputElement>({
    initialValue: organization.website,
    validation: /\w+:(\/?\/?)[^\s]+/,
    validateOnChange: true,
    maxLength: 100,
    optional: true,
    setValueHook: async value => {
      emitChanges({ website: value })
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
          Brand
        </Block>

        <hr />

        <Block>logo: ...</Block>

        <Block>
          <Flex>
            <div style={{ margin: 'auto auto 12px 0', width: 40 }}>
              <FontAwesomeIcon icon={'user-tie'} />
            </div>
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              {...motto.inputProps}
              inputRef={motto.ref}
              label={`Motto (Optional)`}
              maxLength={50}
            />
            {validationError(motto.error)}
          </Flex>
        </Block>

        <Block>
          <Flex>
            <div style={{ margin: 'auto auto 12px 0', width: 40 }}>
              <FontAwesomeIcon icon={'globe-africa'} />
            </div>
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              type={'url'}
              {...website.inputProps}
              inputRef={website.ref}
              label={`Website (Optional)`}
              maxLength={100}
            />
            {validationError(website.error)}
          </Flex>
        </Block>
      </Content>
    )
  )
}

export default OrganizationApplyBrand
