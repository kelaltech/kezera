import React from 'react'
import { Content } from 'gerami'

import useLocale from '../../hooks/use-locale/use-locale'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'

interface Props {
  account: IAccountResponse
  onChange: (account: IAccountResponse) => any
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountGeneral(props: Props) {
  const { loading, t } = useLocale(['account'])

  return loading || <Content>account-general</Content>
}

export default AccountGeneral
