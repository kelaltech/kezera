import React, { useEffect, useRef, useState } from 'react'
import {
  Anchor,
  Block,
  Button,
  Content,
  Flex,
  FlexSpacer,
  Image,
  Input,
  Loading,
  Page,
  Warning
} from 'gerami'
import qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { logout } from '../../../app/stores/account/account-actions'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import promo1 from '../../../assets/images/login/promo-1.jpg'
import './account-login.scss'

function AccountLogin() {
  const { loading, t } = useLocale(['common', 'account'])

  const userState = useAccountState()
  const userDispatch = useAccountDispatch()

  const [drama, setDrama] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true }) || {}

  useEffect(() => {
    setDrama(false)
    if (emailRef.current) emailRef.current.focus()
  }, [])

  const handleLogin = async (e: any): Promise<void> => {
    e.preventDefault()
    setSubmitting(true)
    e.target.submit()
  }

  const handleLogout = async (): Promise<void> => {
    setSubmitting(true)
    userDispatch(await logout())
    setSubmitting(false)
  }

  return (
    loading || (
      <Page bottom={'adaptive'}>
        {userState.account ? (
          <Content size={'XL'}>
            <Block first last>
              <Flex>
                <span>
                  {t`account:logged-in-as`}
                  <br />
                  <Anchor to="/login/account">
                    {userState.account.displayName} ({userState.account.phoneNumber})
                  </Anchor>
                </span>
                <FlexSpacer />
                {submitting ? (
                  <Loading className={'padding-none'} />
                ) : (
                  <Button onClick={handleLogout} disabled={submitting} primary>
                    {t`account:logout`}
                  </Button>
                )}
              </Flex>
            </Block>
          </Content>
        ) : (
          <>
            {query.success == 'false' &&
              (query.status == '401' || query.code == 'WRONG_CREDENTIALS') && (
                <Content size={'XL'} className={'margin-bottom-big'}>
                  <Warning shy problem={t`account:wrong-credentials`} />
                </Content>
              )}
            <Content size={'XL'}>
              <div className={'account-login-image-container'}>
                <Image
                  src={promo1}
                  className={`${(drama && 'account-login-image-drama') ||
                    ''} account-login-image`}
                />
              </div>
              <div className={'account-login-form-container'}>
                <form
                  method={'POST'}
                  action={`/api/account/login?${qs.stringify(query)}`}
                  onSubmit={handleLogin}
                >
                  <Block first>
                    <h1>{t`account:login`}</h1>
                  </Block>
                  <hr />

                  <Block first>
                    <Input
                      inputRef={emailRef}
                      className={'full-width'}
                      name={'email'}
                      type={'email'}
                      label={t`account:email`}
                      disabled={submitting}
                    />
                  </Block>
                  <Block>
                    <Input
                      className={'full-width'}
                      name={'password'}
                      type={'password'}
                      label={t`account:password`}
                      disabled={submitting}
                    />
                    <Anchor
                      className={'account-login-links font-S fg-blackish'}
                      to={`/login/reset?email=${(emailRef.current &&
                        emailRef.current.value) ||
                        ''}`}
                    >
                      {t`account:forgot-password`}
                    </Anchor>
                  </Block>

                  <Block last className={'padding-top-none'}>
                    <Flex>
                      <Anchor
                        className={'account-login-links'}
                        to={'/volunteer/register'}
                      >
                        {t`account:create-new-account`}
                      </Anchor>
                      <FlexSpacer />
                      {submitting ? (
                        <Loading className={'padding-none'} />
                      ) : (
                        <Button type={'submit'} disabled={submitting} primary>
                          {t`account:login`}
                        </Button>
                      )}
                    </Flex>
                  </Block>
                </form>
              </div>
            </Content>
          </>
        )}
      </Page>
    )
  )
}

export default AccountLogin
