import Axios from 'axios'

import { Action } from './user-reducer'

export async function reloadUser(silentFail = false): Promise<Action> {
  try {
    const user = (await Axios.get('/api/user/me', {
      withCredentials: true
    })).data

    window.localStorage.setItem('user', JSON.stringify(user))
    return { type: 'set', user }
  } catch (e) {
    if (!silentFail) throw e
    return { type: 'unset' }
  }
}

export async function login(emailOrUsername: string, password: string): Promise<Action> {
  await Axios.post('/api/user/login', {
    emailOrUsername,
    password
  })
  return reloadUser()
}

export async function logout(): Promise<Action> {
  await Axios.post('/api/user/logout')

  window.localStorage.removeItem('user')
  return { type: 'unset' }
}
