import React from 'react'
import { Block, Content, Flex, Input } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './organization-form-funding.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import { IOrganizationRequest } from '../../../../../api/modules/organization/organization.apiv'
import useField from '../../hooks/use-field/use-field'

interface Props {
  organization: IOrganizationRequest
  setOrganization: (organization: IOrganizationRequest) => void
}

function OrganizationFormFunding({ organization, setOrganization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const emitChanges = (organizationChanges: any): void => {
    setOrganization({ ...organization, ...organizationChanges })
  }

  const bankName = useField<HTMLInputElement>(
    {
      initialValue: organization.funding.bankAccount
        ? organization.funding.bankAccount.bankName
        : '',
      maxLength: 50,
      optional: true,
      setValueHook: async value => {
        emitChanges({
          funding: {
            ...organization.funding,
            bankAccount: {
              ...organization.funding.bankAccount,
              bankName: value
            }
          }
        })
      }
    },
    undefined,
    [organization.funding.bankAccount]
  )
  const bankCountry = useField<HTMLInputElement>(
    {
      initialValue: organization.funding.bankAccount
        ? organization.funding.bankAccount.bankCountry
        : '',
      maxLength: 50,
      optional: true,
      setValueHook: async value => {
        emitChanges({
          funding: {
            ...organization.funding,
            bankAccount: {
              ...organization.funding.bankAccount,
              bankCountry: value
            }
          }
        })
      }
    },
    undefined,
    [organization.funding.bankAccount]
  )
  const accountHolder = useField<HTMLInputElement>(
    {
      initialValue: organization.funding.bankAccount
        ? organization.funding.bankAccount.accountHolder
        : '',
      maxLength: 50,
      optional: true,
      setValueHook: async value => {
        emitChanges({
          funding: {
            ...organization.funding,
            bankAccount: {
              ...organization.funding.bankAccount,
              accountHolder: value
            }
          }
        })
      }
    },
    undefined,
    [organization.funding.bankAccount]
  )
  const accountNumber = useField<HTMLInputElement>(
    {
      initialValue: organization.funding.bankAccount
        ? organization.funding.bankAccount.accountNumber
        : '',
      maxLength: 50,
      optional: true,
      setValueHook: async value => {
        emitChanges({
          funding: {
            ...organization.funding,
            bankAccount: {
              ...organization.funding.bankAccount,
              accountNumber: value
            }
          }
        })
      }
    },
    undefined,
    [organization.funding.bankAccount]
  )

  const payPalMeId = useField<HTMLInputElement>(
    {
      initialValue: organization.funding.payPalMeId,
      validateOnChange: true,
      maxLength: 50,
      optional: true,
      setValueHook: async value => {
        const newValue = value.replace(
          /(\s|^\/|^paypal.me\/|^www.paypal.me\/|^http:\/\/paypal.me\/|^http:\/\/www.paypal.me\/|^https:\/\/paypal.me\/|^https:\/\/www.paypal.me\/)/i,
          ''
        )
        emitChanges({
          funding: {
            ...organization.funding,
            payPalMeId: newValue
          }
        })
        return newValue
      }
    },
    undefined,
    [organization.funding.payPalMeId]
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
          Funding
        </Block>

        <hr />

        <Block>
          <Flex>
            <div style={{ margin: 'auto auto auto 0', width: 40 }}>
              <FontAwesomeIcon icon={'piggy-bank'} />
            </div>
            <Content className={'organization-form-funding-bank-account-content'}>
              <div className={'font-S fg-blackish'}>Bank Account (Optional)</div>
              <Input
                className={'block margin-vertical-normal margin-auto full-width'}
                {...bankName.inputProps}
                label={`Bank Name${
                  bankCountry.value || accountHolder.value || accountNumber.value
                    ? ''
                    : ' (Optional)'
                }`}
                maxLength={50}
              />
              <Input
                className={'block margin-vertical-normal margin-auto full-width'}
                {...bankCountry.inputProps}
                label={`Bank Country${
                  bankName.value || accountHolder.value || accountNumber.value
                    ? ''
                    : ' (Optional)'
                }`}
                maxLength={50}
              />
              <Input
                className={'block margin-vertical-normal margin-auto full-width'}
                {...accountHolder.inputProps}
                label={`Account Holder${
                  bankName.value || bankCountry.value || accountNumber.value
                    ? ''
                    : ' (Optional)'
                }`}
                maxLength={50}
              />
              <Input
                className={'block margin-vertical-normal margin-auto full-width'}
                {...accountNumber.inputProps}
                label={`Account Number${
                  bankName.value || bankCountry.value || accountHolder.value
                    ? ''
                    : ' (Optional)'
                }`}
                maxLength={50}
              />
            </Content>
            {validationError(
              bankName.error ||
                bankCountry.error ||
                accountHolder.error ||
                accountNumber.error
            )}
          </Flex>
        </Block>

        <Block last>
          <Flex>
            <div style={{ margin: 'auto auto 12px 0', width: 40 }}>
              <FontAwesomeIcon icon={['fab', 'paypal']} />
            </div>
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              type={'url'}
              {...payPalMeId.inputProps}
              inputRef={payPalMeId.ref}
              label={`PayPal.me ID (Optional)`}
              maxLength={100}
            />
            {validationError(payPalMeId.error)}
          </Flex>
        </Block>
      </Content>
    )
  )
}

export default OrganizationFormFunding
