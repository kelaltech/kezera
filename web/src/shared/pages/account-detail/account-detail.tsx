import React from 'react'
import { Block, Content, Page } from 'gerami'

import useLocale from '../../hooks/use-locale/use-locale'
import AccountHead from '../../components/account-head/account-head'
import AccountGeneral from '../../components/account-general/account-general'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { updateAccount } from '../../../app/stores/account/account-actions'

function AccountDetail() {
  const { loading, t } = useLocale(['account'])

  const { account } = useAccountState()
  const dispatch = useAccountDispatch()

  const handleAccountChange = async (account: IAccountResponse) => {
    dispatch(await updateAccount(account))
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

          {/* todo: special cases */}
        </Content>
      </Page>
    ))
  )
}

export default AccountDetail
