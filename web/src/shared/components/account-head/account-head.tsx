import React from 'react'
import { Content, Flex, Input } from 'gerami'

import './account-head.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import AccountPhoto from '../account-photo/account-photo'
import { updateAccount } from '../../../app/stores/account/account-actions'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'

interface Props {
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountHead({ readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const { account } = useAccountState()
  if (!account) return <>{t`account:you-are-logged-out`}</>
  const accountDispatch = useAccountDispatch()

  const emitChange = (accountChanges: any): void => {
    if (readonly) return
    const data = Object.assign(account, accountChanges)
    updateAccount(accountDispatch, data, 1000)
  }

  return (
    loading || (
      <Content transparent style={{ overflow: 'visible' }}>
        <Flex>
          <AccountPhoto readonly={readonly} />

          <label className={'account-head-display-name'}>
            <Input
              className={'account-head-display-name-input full-width'}
              label={readonly ? '' : t`account:display-name`}
              value={account.displayName}
              onChange={e => emitChange({ displayName: e.target.value })}
              readOnly={readonly}
              minLength={1}
              maxLength={50}
              required
            />
            <div className={'account-head-display-name-footnote'}>
              {t`account:changes-are-saved-automatically`}
              {/* todo: use this as saved/error notification */}
            </div>
          </label>
        </Flex>
      </Content>
    )
  )
}

export default AccountHead
