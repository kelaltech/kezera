import React, { useState } from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Block, Content, Page, Yoga } from 'gerami'
import AccountRegister from '../../../shared/components/account-register/account-register'
import { IAccountRequest } from '../../../../../api/modules/account/account.apiv'

function OrganizationApply() {
  const { loading, t } = useLocale(['organization'])

  const [account, setAccount] = useState<IAccountRequest>({
    displayName: '',
    email: '',
    password: '',
    phoneNumber: null
  })

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
            <AccountRegister account={account} setAccount={setAccount} />

            <Content className={'top'}>todo</Content>
          </Yoga>
        </Content>
      </Page>
    )
  )
}

export default OrganizationApply
