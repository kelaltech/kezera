import React, { useEffect } from 'react'
import { Block, Content, Flex, Input } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IAccountRequest } from '../../../../../api/modules/account/account.apiv'
import useLocale from '../../hooks/use-locale/use-locale'
import useField from '../../hooks/use-field/use-field'

interface Props {
  account: IAccountRequest
  setAccount: (account: IAccountRequest) => void
}

function AccountRegister({ account, setAccount }: Props) {
  const { loading, t } = useLocale(['account'])

  const emitChanges = (accountChanges: any): void => {
    setAccount({ ...account, ...accountChanges })
  }

  const displayName = useField<HTMLInputElement>({
    validateOnChange: true,
    minLength: [1, 'Required.'],
    maxLength: [50, 'Your display name cannot be longer than 50 characters.'],
    setValueHook: async value => {
      emitChanges({ displayName: value })
    }
  })
  const email = useField<HTMLInputElement>({
    validation: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    validateOnChange: true,
    setValueHook: async value => {
      emitChanges({ email: value })
    }
  })
  const password = useField<HTMLInputElement>({
    validation: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password needs to be at least 8 characters long and contain at least one of capital letters, small letters and numbers each.'
    ],
    validateOnChange: true,
    minLength: [8, 'Passwords need to be at least 8 characters long.'],
    maxLength: [72, 'Passwords cannot be more than 72 characters long.'],
    setValueHook: async value => {
      emitChanges({ password: value })
    }
  })
  const repeatPassword = useField<HTMLInputElement>(
    {
      validation: async value => value === password.value,
      validateOnChange: true
    },
    [password.value]
  )
  const phoneNumber = useField<HTMLInputElement>({
    validation: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
    validateOnChange: true,
    optional: true,
    setValueHook: async value => {
      emitChanges({ phoneNumber: value })
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

  useEffect(() => {
    displayName.ref.current && displayName.ref.current.focus()
  }, [loading])

  return (
    loading || (
      <Content className={'top margin-bottom-big'}>
        <Block first className={'bold'}>
          {t`account:account`}
        </Block>

        <hr />

        <Block>
          <Flex>
            <FontAwesomeIcon
              icon={['far', 'user-circle']}
              style={{ margin: 'auto auto 15px 0', width: 40 }}
            />
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              type={'text'}
              {...displayName.inputProps}
              inputRef={displayName.ref}
              label={t`account:display-name`}
            />
            {validationError(displayName.error)}
          </Flex>
        </Block>

        <Block>
          <Flex>
            <FontAwesomeIcon
              icon={'envelope'}
              style={{ margin: 'auto auto 15px 0', width: 40 }}
            />
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              type={'email'}
              {...email.inputProps}
              inputRef={email.ref}
              label={t`account:email`}
            />
            {validationError(email.error)}
          </Flex>
        </Block>

        <Block>
          <Flex>
            <FontAwesomeIcon
              icon={'user-secret'}
              style={{ margin: 'auto auto 15px 0', width: 40 }}
            />
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              type={'password'}
              {...password.inputProps}
              label={t`account:password`}
            />
            {validationError(password.error)}
          </Flex>
        </Block>

        <Block>
          <Flex>
            <FontAwesomeIcon
              icon={'user-secret'}
              style={{ margin: 'auto auto 15px 0', width: 40 }}
            />
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              type={'password'}
              {...repeatPassword.inputProps}
              label={t`account:repeat-password`}
            />
            {validationError(repeatPassword.error)}
          </Flex>
        </Block>

        <Block last>
          <Flex>
            <FontAwesomeIcon
              icon={'phone'}
              style={{ margin: 'auto auto 15px 0', width: 40 }}
            />
            <Input
              className={'margin-vertical-normal margin-auto full-width'}
              type={'phone'}
              {...phoneNumber.inputProps}
              label={t`account:phone-number` + ' (' + t`account:optional` + ')'}
            />
            {validationError(phoneNumber.error)}
          </Flex>
        </Block>
      </Content>
    )
  )
}

export default AccountRegister
