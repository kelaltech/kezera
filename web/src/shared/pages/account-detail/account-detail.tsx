import React, { lazy } from 'react'
import { Block, Content, Page } from 'gerami'

import useLocale from '../../hooks/use-locale/use-locale'
import AccountHead from './components/account-head/account-head'
import AccountGeneral from './components/account-general/account-general'
import { useAccountState } from '../../../app/stores/account/account-provider'

const VolunteerSettings = lazy(() =>
  import('../../../layout-volunteer/components/volunteer-settings/volunteer-settings')
)

function AccountDetail() {
  const { loading, t } = useLocale(['account'])

  const { account } = useAccountState()

  return (
    loading || (
      <Page>
        <Content size={'XL'} transparent={true} style={{ overflow: 'visible' }}>
          <Block first last>
            <AccountHead />
          </Block>

          <Block>
            <AccountGeneral />
          </Block>

          {account && account.role === 'VOLUNTEER' && <VolunteerSettings />}
        </Content>
      </Page>
    )
  )
}

export default AccountDetail
