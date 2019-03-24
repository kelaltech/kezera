import React, { useEffect, useRef, useState } from 'react'
import { Warning, Loading, Block, Input, Button, Page, Content, Anchor } from 'gerami'
import axios from 'axios'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { IAccountResetFinishRequest } from '../../../../../api/modules/account/account.apiv'

function AccountResetFinish() {
  const { loading, t } = useLocale(['account'])

  const [status, setStatus] = useState<'INITIAL' | 'SENDING' | 'SENT'>('INITIAL')
  const [error, setError] = useState<string | null>(null)

  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const passwordRef = useRef<HTMLInputElement>(null)
  const repeatPasswordRef = useRef<HTMLInputElement>(null)

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const randomKey = query['randomKey']
  const email = query['email']

  useEffect(() => {
    if (!email) setError("Can't reset account password without email address.")
    if (!randomKey) setError("Can't reset account password without randomKey.")
  }, [])

  useEffect(() => {
    if (!loading && passwordRef.current) passwordRef.current.focus()
  }, [loading])

  const handleReset = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setStatus('SENDING')

    if (password !== repeatPassword) {
      setError('Passwords do not match.')
      setStatus('INITIAL')
      return
    }

    const data: IAccountResetFinishRequest = { randomKey, emailTo: email, password }
    try {
      await axios.post('/api/account/reset/finish', data)
      setStatus('SENT')
    } catch (e) {
      setError(e.prettyMessage || e.message || 'Unknown error.')
      setStatus('INITIAL')
      return
    }

    setStatus('SENT')
  }

  return (
    loading || (
      <Page>
        {error && (
          <Content size={'S'} className={'margin-bottom-big'}>
            <Warning shy={() => setError(null)} problem={error} />
          </Content>
        )}

        <Content size={'S'}>
          <Block first>
            <h1>{t`account:reset-account-password`}</h1>
          </Block>

          <hr />
          {status === 'SENT' && !error ? (
            <>
              <Block>{t`account:reset-account-password-confirmation`}</Block>
              <Block last>
                <Anchor to={'/login'}>{t`account:proceed-to-login`}</Anchor>
              </Block>
            </>
          ) : (
            <>
              <Block
                className={'fg-blackish font-S'}
              >{t`account:reset-finish-description`}</Block>

              <form onSubmit={handleReset}>
                <Block>
                  <Input
                    inputRef={passwordRef}
                    className={'full-width'}
                    type={'password'}
                    name={'password'}
                    label={t`account:password`}
                    tabIndex={1}
                    disabled={status === 'SENDING'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    minLength={8}
                    maxLength={72}
                    required={true}
                  />
                </Block>

                <Block>
                  <Input
                    inputRef={repeatPasswordRef}
                    className={'full-width'}
                    type={'password'}
                    label={t`account:repeat-password`}
                    tabIndex={2}
                    disabled={status === 'SENDING'}
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                    minLength={8}
                    maxLength={72}
                    required={true}
                  />
                </Block>

                <Block last>
                  {status === 'SENDING' ? (
                    <Loading className={'padding-none'} />
                  ) : (
                    <Button
                      className={'full-width'}
                      type={'submit'}
                      tabIndex={3}
                      disabled={!password || !repeatPassword}
                    >
                      {t`account:reset-account-password`}
                    </Button>
                  )}
                </Block>
              </form>
            </>
          )}
        </Content>
      </Page>
    )
  )
}

export default AccountResetFinish
