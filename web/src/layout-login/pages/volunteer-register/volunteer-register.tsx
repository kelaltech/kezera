import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Block, Flex, FlexSpacer, Anchor } from 'gerami'
import axios from 'axios'
import * as qs from 'qs'

import AccountRegister from '../../../shared/components/account-register/account-register'
import { IAccountRequest } from '../../../../../api/modules/account/account.apiv'
import RichPage from '../../../shared/components/rich-page/rich-page'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

function VolunteerRegister({ history }: RouteComponentProps) {
  const { t, loading } = useLocale(['account'])

  const [account, setAccount] = useState<IAccountRequest>({
    displayName: '',
    email: '',
    password: '',
    phoneNumber: null
  })

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  useEffect(() => {
    if (query.email) {
      setAccount({ ...account, email: query.email })
    }
  }, [])

  const [error, setError] = useState()

  const handleRegister = (e: any): void => {
    e.preventDefault()
    setError(undefined)

    axios
      .post('/api/volunteer/register', account)
      .then(() => history.push('/volunteer/account'))
      .catch(setError)
  }

  return (
    loading || (
      <RichPage
        size={'XL'}
        documentTitle={t`register-as-volunteer`}
        title={t`register-as-volunteer`}
        error={error}
        onErrorClose={setError}
      >
        <form onSubmit={handleRegister}>
          <Block first className={'padding-horizontal-none'}>
            <AccountRegister
              account={account}
              setAccount={setAccount}
              showTitle={false}
            />
          </Block>

          <Block last className={'padding-horizontal-none right'}>
            <Flex>
              <Anchor className={'margin-vertical-auto left margin-right-normal'} to={'/login/apply'}>
                {t`account:are-you-an-organization`}
              </Anchor>

              <FlexSpacer />

              <Button type={'submit'} className={'margin-vertical-auto'}>
                {t`register-as-volunteer`}
              </Button>
            </Flex>
          </Block>
        </form>
      </RichPage>
    )
  )
}

export default VolunteerRegister
