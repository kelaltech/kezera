import React, { lazy } from 'react'
import { Block, Content, Page } from 'gerami'

import useLocale from '../../hooks/use-locale/use-locale'
import AccountHead from '../../components/account-head/account-head'
import AccountGeneral from '../../components/account-general/account-general'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import { updateAccount } from '../../../app/stores/account/account-actions'

const VolunteerSettings = lazy(() =>
  import('../../../layout-volunteer/components/volunteer-settings/volunteer-settings')
)

function AccountDetail() {
  const { loading, t } = useLocale(['account'])

  const { account } = useAccountState()
  const dispatch = useAccountDispatch()

  const handleAccountChange = async (data: any, timeout = 0) => {
    dispatch(
      await updateAccount(data, dispatch, timeout, data.currentPassword, data.newPassword)
    )
  }

  return (
    loading ||
    (!account ? (
      <>{t`account:you-are-already-logged-in`}</>
    ) : (
      <Page>
        <Content size={'XL'} transparent={true} style={{ overflow: 'visible' }}>
          <Block first last>
            <AccountHead account={account} onChange={handleAccountChange} />
          </Block>

          <Block>
            <AccountGeneral account={account} onChange={handleAccountChange} />
          </Block>

          {account && account.role === 'VOLUNTEER' && <VolunteerSettings />}
        </Content>
      </Page>
    ))
  )
}

export default AccountDetail
