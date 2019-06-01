import Axios, { CancelTokenSource } from 'axios'

import { Action } from './account-reducer'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { accountResponseToRequest } from '../../../apiv/filters/account.filter'

export function reloadAccount(
  accountDispatch: (action: Action) => void,
  silentFail = false,
  account?: IAccountResponse,
  onReload?: () => void,
  onError?: (e: any) => void
): void {
  const reload = async (account?: IAccountResponse): Promise<void> => {
    if (!account) throw Error('Account not found.')
    if (!account._id) throw Error('Received account data is malformed.')

    window.localStorage.setItem('account', JSON.stringify(account))
    accountDispatch({ type: 'set', account })

    if (onReload) onReload()

    window.navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords
      Axios.put(
        '/api/account/set-last-location',
        { longitude, latitude },
        { withCredentials: true }
      ).catch(console.error)
    }, console.error)
  }

  if (account) {
    reload(account).catch(e => {
      if (!silentFail && onError) onError(e)
    })
  } else {
    Axios.get<IAccountResponse>('/api/account/me', { withCredentials: true })
      .then(response => reload(response.data))
      .catch(e => {
        const isLoggedOutErrorType = e === 'Unauthorized'

        if (isLoggedOutErrorType) accountDispatch({ type: 'unset' })
        if (!silentFail && onError && !isLoggedOutErrorType) onError(e)
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
  onUpdate?: () => void,
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
      .then(data => reloadAccount(accountDispatch, false, data, onUpdate, onError))
      .catch(e => {
        if (!Axios.isCancel(e)) {
          if (onError) onError(e)
          reloadAccount(accountDispatch, undefined, undefined, undefined, onError)
        }
      })

    updateAccountTimeout = null
  }, timeout)

  accountDispatch({ type: 'set', account })
}

export function login(
  accountDispatch: (action: Action) => void,
  data: { email: string; password: string },
  onLogin?: () => void,
  onError?: (e: any) => void
): void {
  Axios.post<void>('/api/account/login', data)
    .then(response => {
      const responseUrl: string = response.request.responseURL.toLowerCase()
      if (
        responseUrl.includes('success=false') &&
        responseUrl.includes('code=wrong_credentials')
      ) {
        if (onError) onError(new Error('WRONG_CREDENTIALS'))
      } else {
        // success
        reloadAccount(
          accountDispatch,
          undefined,
          undefined,
          () => {
            if (onLogin) onLogin()
          },
          onError
        )
      }
    })
    .catch(e => {
      if (onError) onError(e)
    })
}

export function logout(
  accountDispatch: (action: Action) => void,
  onLogout?: () => void,
  onError?: (e: any) => void
): void {
  clearAllCachedPrivateData()

  Axios.post<void>('/api/account/logout')
    .then(() => {
      clearAllCachedPrivateData()
      accountDispatch({ type: 'unset' })

      if (onLogout) onLogout()
    })
    .catch(e => {
      if (onError) onError(e)
    })
}

export function clearAllCachedPrivateData() {
  const keys = [
    // all
    'account',

    // volunteer
    'volunteer',
    'subscriptions',
    'mini',

    // organization
    'my-organization'
  ]

  for (const key of keys) window.localStorage.removeItem(key)
}
