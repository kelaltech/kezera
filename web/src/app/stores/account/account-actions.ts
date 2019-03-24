import Axios, { CancelTokenSource } from 'axios'

import { Action } from './account-reducer'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { accountResponseToRequest } from '../../../apiv/account.filter'

export async function reloadAccount(
  silentFail = false,
  account?: IAccountResponse
): Promise<Action> {
  try {
    if (!account)
      account = (await Axios.get('/api/account/me', {
        withCredentials: true
      })).data

    if (!account) throw Error('Account not found.')
    if (!account._id) throw Error('Received account data is malformed.')

    window.localStorage.setItem('account', JSON.stringify(account))
    return { type: 'set', account }
  } catch (e) {
    if (!silentFail) throw e
    return { type: 'unset' }
  }
}

let updateTimeout: NodeJS.Timeout | null = null
let updateCancellation: CancelTokenSource | null = null
export async function updateAccount(
  account: IAccountResponse,
  dispatch: (action: Action) => void,
  timeout = 0
): Promise<Action> {
  if (updateTimeout !== null) clearTimeout(updateTimeout)
  if (updateCancellation !== null) updateCancellation.cancel()

  updateTimeout = setTimeout(async () => {
    updateCancellation = Axios.CancelToken.source()

    Axios.put('/api/account/edit-me', await accountResponseToRequest(account), {
      withCredentials: true,
      cancelToken: updateCancellation.token
    })
      .then(response => response.data)
      .then(data => reloadAccount(false, data))
      .then(action => dispatch(action))
      .catch(err => {
        if (!Axios.isCancel(err)) {
          console.error(err)
          reloadAccount()
            .then(action => dispatch(action))
            .catch(console.error)
        }
      })

    updateTimeout = null
  }, timeout)

  return { type: 'set', account }
}

export async function logout(): Promise<Action> {
  await Axios.post('/api/account/logout')

  window.localStorage.removeItem('account')
  return { type: 'unset' }
}
