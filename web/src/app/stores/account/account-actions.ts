import Axios from 'axios'

import { Action } from './account-reducer'

export async function reloadAccount(silentFail = false): Promise<Action> {
  try {
    const account = (await Axios.get('/api/account/me', {
      withCredentials: true
    })).data

    window.localStorage.setItem('account', JSON.stringify(account))
    return { type: 'set', account }
  } catch (e) {
    if (!silentFail) throw e
    return { type: 'unset' }
  }
}

export async function login(emailOrUsername: string, password: string): Promise<Action> {
  await Axios.post('/api/account/login', {
    emailOrUsername,
    password
  })
  return reloadAccount()
}

export async function logout(): Promise<Action> {
  await Axios.post('/api/account/logout')

  window.localStorage.removeItem('account')
  return { type: 'unset' }
}
