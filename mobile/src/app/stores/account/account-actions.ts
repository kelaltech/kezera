import AsyncStorage from '@react-native-community/async-storage'
import Axios, { CancelTokenSource } from 'axios'

import { Action } from './account-reducer'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { accountResponseToRequest } from '../../../apiv/filters/account.filter'

export function reloadAccount(
  accountDispatch: (action: Action) => void,
  silentFail = false,
  account?: IAccountResponse,
  onError?: (e: any) => void
): void {
  const reload = async (account?: IAccountResponse): Promise<void> => {
    if (!account) throw Error('Account not found.')
    if (!account._id) throw Error('Received account data is malformed.')

    await AsyncStorage.setItem('account', JSON.stringify(account))
    accountDispatch({ type: 'set', account })
  }

  if (account) {
    reload(account).catch(e => {
      if (!silentFail && onError) onError(e)
    })
  } else {
    Axios.get<IAccountResponse>('/api/account/me', { withCredentials: true })
      .then(response => reload(response.data))
      .catch(e => {
        if (!silentFail && onError && (e.response && e.response.status !== 401))
          onError(e)
        accountDispatch({ type: 'unset' })
      })
  }
}

let updateAccountTimeout: NodeJS.Timeout | null = null
let updateAccountCancellation: CancelTokenSource | null = null
export function updateAccount(
  accountDispatch: (action: Action) => void,
  account: IAccountResponse,
  timeout = 0,
  currentPassword?: string,
  newPassword?: string,
  onError?: (e: any) => void
): void {
  if (updateAccountTimeout !== null) clearTimeout(updateAccountTimeout)
  if (updateAccountCancellation !== null) updateAccountCancellation.cancel()

  updateAccountTimeout = setTimeout(async () => {
    updateAccountCancellation = Axios.CancelToken.source()

    Axios.put<IAccountResponse>(
      '/api/account/edit-me',
      await accountResponseToRequest(account, undefined, currentPassword, newPassword),
      { withCredentials: true, cancelToken: updateAccountCancellation.token }
    )
      .then(response => response.data)
      .then(data => reloadAccount(accountDispatch, false, data))
      .catch(e => {
        if (!Axios.isCancel(e)) {
          if (onError) onError(e)
          reloadAccount(accountDispatch)
        }
      })

    updateAccountTimeout = null
  }, timeout)

  accountDispatch({ type: 'set', account })
}

export function logout(
  accountDispatch: (action: Action) => void,
  onLogout?: () => void,
  onError?: (e: any) => void
): void {
  Axios.post<void>('/api/account/logout')
    .then(() => AsyncStorage.removeItem('account'))
    .then(() => {
      accountDispatch({ type: 'unset' })

      if (onLogout) onLogout()
    })
    .catch(e => {
      if (onError) onError(e)
    })
}
