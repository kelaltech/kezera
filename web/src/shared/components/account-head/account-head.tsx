import React from 'react'
import { Content, Flex, Input } from 'gerami'

import './account-head.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import AccountPhoto from '../account-photo/account-photo'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'

interface Props {
  account: IAccountResponse
  onChange?: (account: IAccountResponse, timeout?: number) => any
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountHead({ account, onChange, readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const emitChange = (accountChanges: any): void => {
    if (!readonly && onChange) onChange(Object.assign(account, accountChanges), 1000)
  }

  return (
    loading || (
      <Content transparent style={{ overflow: 'visible' }}>
        <Flex>
          <AccountPhoto
            account={account}
            onChange={emitChange /* todo */}
            readonly={readonly}
          />

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
