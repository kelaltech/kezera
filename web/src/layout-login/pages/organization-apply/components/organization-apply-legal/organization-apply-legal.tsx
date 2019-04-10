import React from 'react'
import { Anchor, Block, Button, Content, Flex, Input } from 'gerami'

import './organization-apply-legal.scss'
import useLocale from '../../../../../shared/hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../../../api/modules/organization/organization.apiv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useField from '../../../../../shared/hooks/use-field/use-field'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationApplyLegal({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const licensedNamesInput = useField<HTMLInputElement>({ maxLength: 50 })
  const removeLicensedName = (index: number): void => {
    emitChanges({
      licensedNames: organization.licensedNames.filter((n, i) => i !== index)
    })
  }
  const addLicensedName = (): void => {
    if (!licensedNamesInput.value) return

    emitChanges({
      licensedNames: organization.licensedNames.concat([licensedNamesInput.value])
    })

    licensedNamesInput.setValue('', false)

    if (licensedNamesInput.ref.current) licensedNamesInput.ref.current.focus()
  }

  const registrationTypeInput = useField<HTMLInputElement>({ maxLength: 50 })
  const registrationIdInput = useField<HTMLInputElement>({ maxLength: 50 })
  const registrationIssuerInput = useField<HTMLInputElement>({ maxLength: 50 })
  const removeRegistration = (index: number): void => {
    emitChanges({
      registrations: organization.registrations.filter((n, i) => i !== index)
    })
  }
  const addRegistration = (): void => {
    if (
      !registrationTypeInput.value ||
      !registrationIdInput.value ||
      !registrationIssuerInput.value
    )
      return

    emitChanges({
      registrations: organization.registrations.concat([
        {
          type: registrationTypeInput.value,
          id: registrationIdInput.value,
          issuer: registrationIssuerInput.value
        }
      ])
    })

    registrationTypeInput.setValue('', false)
    registrationIdInput.setValue('', false)
    registrationIssuerInput.setValue('', false)

    if (registrationTypeInput.ref.current) registrationTypeInput.ref.current.focus()
  }

  return (
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          Legal
        </Block>

        <hr />

        <Block>
          <Flex>
            <div style={{ margin: 'auto auto auto 0', width: 40 }}>
              <FontAwesomeIcon icon={'balance-scale'} />
            </div>
            <div className={'full-width'}>
              <div className={'font-S'}>
                <div className={'fg-primary'}>
                  Licensed Names
                  {!organization.licensedNames.length ? null : (
                    <span className={'italic fg-blackish'}>
                      {' '}
                      (double click to remove)
                    </span>
                  )}
                  :{' '}
                </div>
                <ul className={'padding-left-big margin-vertical-none'}>
                  {organization.licensedNames.map((name, i) => (
                    <li key={i} className={'top margin-vertical-normal'}>
                      <Anchor
                        className={'fg-accent'}
                        onDoubleClick={() => removeLicensedName(i)}
                      >
                        {name}
                      </Anchor>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault()
                  addLicensedName()
                }}
              >
                <Content className={'organization-apply-legal-add-content'}>
                  <div className={'font-S fg-blackish'}>Add Licensed Name:</div>
                  <Input
                    className={'block margin-vertical-normal margin-auto full-width'}
                    {...licensedNamesInput.inputProps}
                    label={`Licensed Name`}
                  />
                  <div className={'right'}>
                    <Button
                      type={'submit'}
                      className={
                        'margin-auto margin-left-normal padding-vertical-small padding-horizontal-normal font-S'
                      }
                      title={'Add licensed name'}
                      disabled={!licensedNamesInput.value}
                    >
                      <FontAwesomeIcon icon={'plus'} />
                    </Button>
                  </div>
                </Content>
              </form>
            </div>
          </Flex>
        </Block>

        <Block last>
          <Flex>
            <div style={{ margin: 'auto auto auto 0', width: 40 }}>
              <FontAwesomeIcon icon={'file-contract'} />
            </div>
            <div className={'full-width'}>
              <div className={'font-S'}>
                <div className={'fg-primary'}>
                  Registrations
                  {!organization.registrations.length ? null : (
                    <span className={'italic fg-blackish'}>
                      {' '}
                      (double click to remove)
                    </span>
                  )}
                  :{' '}
                </div>
                <ul className={'padding-left-big margin-vertical-none'}>
                  {organization.registrations.map((registration, i) => (
                    <li key={i} className={'top margin-vertical-normal'}>
                      <Anchor
                        className={'fg-accent'}
                        onDoubleClick={() => removeRegistration(i)}
                      >
                        {registration.type}: {registration.id} ({registration.issuer})
                      </Anchor>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault()
                  addRegistration()
                }}
              >
                <Content className={'organization-apply-legal-add-content'}>
                  <div className={'font-S fg-blackish'}>Add Registration:</div>
                  <Input
                    className={'block margin-vertical-normal margin-auto full-width'}
                    {...registrationTypeInput.inputProps}
                    inputRef={registrationTypeInput.ref}
                    label={`Registration Type`}
                  />
                  <Input
                    className={'block margin-vertical-normal margin-auto full-width'}
                    {...registrationIdInput.inputProps}
                    label={`ID or Number`}
                  />
                  <Input
                    className={'block margin-vertical-normal margin-auto full-width'}
                    {...registrationIssuerInput.inputProps}
                    label={`Issuer Institution`}
                  />
                  <div className={'right'}>
                    <Button
                      type={'submit'}
                      className={
                        'margin-auto margin-left-normal padding-vertical-small padding-horizontal-normal font-S'
                      }
                      title={'Add licensed name'}
                      disabled={
                        !registrationTypeInput.value ||
                        !registrationIdInput.value ||
                        !registrationIssuerInput.value
                      }
                    >
                      <FontAwesomeIcon icon={'plus'} />
                    </Button>
                  </div>
                </Content>
              </form>
            </div>
          </Flex>
        </Block>
      </Content>
    )
  )
}

export default OrganizationApplyLegal
