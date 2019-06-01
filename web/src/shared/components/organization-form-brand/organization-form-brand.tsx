import React, { MutableRefObject, RefObject, useEffect } from 'react'
import { Block, Content, Flex, ImageInput, Input } from 'gerami'

import useLocale from '../../hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../api/modules/organization/organization.apiv'
import useField from '../../hooks/use-field/use-field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
  setLogoRef?: (
    logoInput: MutableRefObject<HTMLInputElement> | RefObject<HTMLInputElement>
  ) => void
}

function OrganizationFormBrand({ organization, setOrganization, setLogoRef }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const logo = useField<HTMLInputElement>()
  const motto = useField<HTMLInputElement>(
    {
      initialValue: organization.motto,
      maxLength: 50,
      optional: true,
      setValueHook: async value => {
        emitChanges({ motto: value })
      }
    },
    undefined,
    [organization.motto]
  )
  const website = useField<HTMLInputElement>(
    {
      initialValue: organization.website,
      validation: /\w+:(\/?\/?)[^\s]+/,
      validateOnChange: true,
      maxLength: 100,
      optional: true,
      setValueHook: async value => {
        emitChanges({ website: value })
      }
    },
    undefined,
    [organization.website]
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

  useEffect(() => {
    if (setLogoRef) setLogoRef(logo.ref)
  }, [setLogoRef])

  return (
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          Brand
        </Block>

        <hr />

        {!setLogoRef ? null : (
          <Block>
            <Flex>
              <div style={{ margin: 'auto auto 12px 0', width: 40 }}>
                <FontAwesomeIcon icon={'image'} />
              </div>
              <Flex className={'full-width'}>
                <div
                  className={
                    'padding-right-big margin-top-auto margin-bottom-normal fg-blackish'
                  }
                >
                  <span className={'fg-primary'}>Logo</span> (Optional):
                </div>
                <ImageInput innerRef={logo.ref} />
              </Flex>
              {validationError(motto.error)}
            </Flex>
          </Block>
        )}

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

        <Block last>
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

export default OrganizationFormBrand
