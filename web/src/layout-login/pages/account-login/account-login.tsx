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
import * as qs from 'qs'

import './account-login.scss'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { logout } from '../../../app/stores/account/account-actions'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import promo1 from '../../../assets/images/login/promo-1.jpg'
import { RouteComponentProps, withRouter } from 'react-router'

function AccountLogin({ history }: RouteComponentProps<{}>) {
  const { loading, t } = useLocale(['account'])

  const { account } = useAccountState()
  const accountDispatch = useAccountDispatch()

  const [drama, setDrama] = useState(true)
  // const [error, setError] = useState<string>()
  const [sending, setSending] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailRef = useRef<HTMLInputElement>(null)

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true }) || {}

  useEffect(() => {
    if (account && query['continue']) history.replace(query['continue'])
  }, [])

  useEffect(() => {
    if (!loading) {
      setDrama(false)
      if (emailRef.current) emailRef.current.focus()
    }
  }, [loading])

  const handleLogin = async (e: any): Promise<void> => {
    e.preventDefault()
    setSending(true)
    e.target.submit()
  }

  /*
  const handleLogin = (e: any): void => {
    e.preventDefault()
    setSending(true)

    const data = { email, password }

    login(
      accountDispatch,
      data,
      () => {
        setPassword('')
        setSending(false)
        alert('hi')
        history.push('/')
      },
      e => {
        setError(
          e.message === 'WRONG_CREDENTIALS'
            ? t`account:wrong-credentials`
            : e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
        setSending(false)
      }
    )
  }
  */

  const handleLogout = async (): Promise<void> => {
    setSending(true)
    logout(accountDispatch)
  }

  return (
    loading || (
      <Page top={'adaptive'} bottom={'adaptive'}>
        {account ? (
          <Content size={'XL'}>
            <Block first last>
              <Flex>
                <span>
                  {t`account:logged-in-as`}
                  <br />
                  <Anchor to="/login/redirect/account">
                    {account.displayName} ({account.email})
                  </Anchor>
                </span>
                <FlexSpacer />
                {sending ? (
                  <Loading className={'padding-none'} />
                ) : (
                  <Button onClick={handleLogout} disabled={sending} primary>
                    {t`account:logout`}
                  </Button>
                )}
              </Flex>
            </Block>
          </Content>
        ) : (
          <>
            {/*
              error && (
                <Content size={'XL'} className={'margin-bottom-big'}>
                  <Warning shy problem={error} />
                </Content>
              )
              */
            query.success == 'false' &&
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
                      disabled={sending}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      tabIndex={1}
                      required={true}
                    />
                  </Block>
                  <Block>
                    <Input
                      className={'full-width'}
                      name={'password'}
                      type={'password'}
                      label={t`account:password`}
                      disabled={sending}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      tabIndex={2}
                      minLength={8}
                      maxLength={72}
                      required={true}
                    />
                    <Anchor
                      className={'account-login-links font-S fg-blackish'}
                      to={`/login/reset/start?${qs.stringify({ email })}`}
                      tabIndex={5}
                    >
                      {t`account:forgot-password`}
                    </Anchor>
                  </Block>

                  <Block last className={'padding-top-none'}>
                    <Flex>
                      <Anchor
                        className={'account-login-links margin-right-normal'}
                        to={`/login/register?${qs.stringify({ email })}`}
                        tabIndex={4}
                      >
                        {t`account:create-new-account`}
                      </Anchor>
                      <FlexSpacer />
                      {sending ? (
                        <Loading className={'padding-none'} />
                      ) : (
                        <Button
                          type={'submit'}
                          disabled={!email || !password}
                          tabIndex={3}
                          primary
                        >
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

export default withRouter(AccountLogin)
