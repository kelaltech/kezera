import Axios, { CancelTokenSource } from 'axios'

import { Action } from './account-reducer'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { accountResponseToRequest } from '../../../apiv/filters/account.filter'

export function reloadAccount(
  accountDispatch: (action: Action) => void,
  silentFail = false,
  account?: IAccountResponse
): void {
  const reload = (account?: IAccountResponse): void => {
    if (!account) throw Error('Account not found.')
    if (!account._id) throw Error('Received account data is malformed.')

    window.localStorage.setItem('account', JSON.stringify(account))
    accountDispatch({ type: 'set', account })
  }

  if (account) {
    reload(account)
  } else {
    Axios.get('/api/account/me', { withCredentials: true })
      .then(response => response.data)
      .then(reload)
      .catch(e => {
        if (!silentFail) throw e
        accountDispatch({ type: 'unset' })
      })
  }
}

let updateTimeout: NodeJS.Timeout | null = null
let updateCancellation: CancelTokenSource | null = null
export function updateAccount(
  accountDispatch: (action: Action) => void,
  account: IAccountResponse,
  timeout = 0,
  currentPassword?: string,
  newPassword?: string
): void {
  if (updateTimeout !== null) clearTimeout(updateTimeout)
  if (updateCancellation !== null) updateCancellation.cancel()

  updateTimeout = setTimeout(async () => {
    updateCancellation = Axios.CancelToken.source()

    Axios.put(
      '/api/account/edit-me',
      await accountResponseToRequest(account, undefined, currentPassword, newPassword),
      { withCredentials: true, cancelToken: updateCancellation.token }
    )
      .then(response => response.data)
      .then(data => reloadAccount(accountDispatch, false, data))
      .catch(err => {
        if (!Axios.isCancel(err)) {
          console.error(err)
          reloadAccount(accountDispatch)
        }
      })

    updateTimeout = null
  }, timeout)

  accountDispatch({ type: 'set', account })
}

export function logout(accountDispatch: (action: Action) => void): void {
  Axios.post('/api/account/logout').then(() => {
    window.localStorage.removeItem('account')
    accountDispatch({ type: 'unset' })
  })
}
