import React, { useEffect, useRef, useState } from 'react'
import { Block, Button, Content, Input, Loading, Page, Warning } from 'gerami'
import axios from 'axios'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { IAccountResetStartRequest } from '../../../apiv/account.apiv'

function AccountResetStart() {
  const { loading, t } = useLocale(['account'])

  const [status, setStatus] = useState<'INITIAL' | 'SENDING' | 'SENT'>('INITIAL')
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState(
    qs.parse(window.location.search, { ignoreQueryPrefix: true })['email'] || ''
  )

  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!loading && emailRef.current) emailRef.current.focus()
  }, [loading])

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('SENDING')

    const data: IAccountResetStartRequest = { emailTo: email }
    try {
      await axios.post('/api/account/reset/start', data)
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
            <Warning shy problem={error} />
          </Content>
        )}

        <Content size={'S'}>
          <Block first>
            <h1>{t`account:reset-account-password`}</h1>
          </Block>

          <hr />

          {status === 'SENT' && !error ? (
            <>
              <Block last>{t`reset-email-sent-confirmation`}</Block>
            </>
          ) : (
            <>
              <Block className={'fg-blackish font-S'}>{t`reset-start-description`}</Block>

              <form onSubmit={handleSend}>
                <Block>
                  <Input
                    inputRef={emailRef}
                    className={'full-width'}
                    type={'email'}
                    label={t`email`}
                    tabIndex={1}
                    disabled={status === 'SENDING'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                      tabIndex={2}
                      disabled={!email}
                    >
                      {t`email-reset-link`}
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

export default AccountResetStart
