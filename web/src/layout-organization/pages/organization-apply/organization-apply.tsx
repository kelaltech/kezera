import React, { useEffect } from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Block, Content, Flex, Input, Page, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useField from '../../../shared/hooks/use-field/use-field'

function OrganizationApply() {
  const { loading, t } = useLocale(['organization', 'account'])

  const email = useField<HTMLInputElement>({
    validation: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    validateOnChange: true
  })
  const password = useField<HTMLInputElement>({
    validation: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    validateOnChange: true,
    minLength: [8, 'Passwords need to be at least 8 characters long.'],
    maxLength: [72, 'Passwords cannot be more than 72 characters long.']
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
    optional: true
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
    email.ref.current && email.ref.current.focus()
  }, [loading])

  return (
    loading || (
      <Page>
        <Content size={'XL'} transparent>
          <Block first className={'padding-horizontal-normal'}>
            <h1>Organization Application</h1>
          </Block>

          <hr />

          <Block last className={'padding-horizontal-normal font-S fg-blackish'}>
            Fill in your organization's information and submit this form. We will review,
            cross-check and verify your information to register you on the system. We will
            send you an email, right after submission of this form and when we finish
            reviewing your application.
          </Block>

          <Yoga maxCol={2}>
            {/* todo: refactor into a new shared/components/account-register */}
            <Content className={'top margin-bottom-normal'}>
              <Block first className={'bold'}>
                {t`account:account`}
              </Block>

              <hr />

              <Block>
                <Flex>
                  <FontAwesomeIcon
                    className={'margin-right-big margin-auto'}
                    icon={'envelope'}
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
                    className={'margin-right-big margin-auto'}
                    icon={'user-secret'}
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
                    className={'margin-right-big margin-auto'}
                    icon={'user-secret'}
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
                    className={'margin-right-big margin-auto'}
                    icon={'phone'}
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

            <Content className={'top'}>todo</Content>
          </Yoga>
        </Content>
      </Page>
    )
  )
}

export default OrganizationApply
