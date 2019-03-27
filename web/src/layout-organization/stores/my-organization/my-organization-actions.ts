import Axios, { CancelTokenSource } from 'axios'

import { Action } from './my-organization-reducer'
import { IOrganizationPrivateResponse } from '../../../../../api/modules/organization/organization.apiv'
import { organizationPrivateResponseToRequest } from '../../../apiv/filters/organization.filter'

export async function reloadMyOrganization(
  silentFail = false,
  myOrganization?: IOrganizationPrivateResponse
): Promise<Action> {
  try {
    if (!myOrganization)
      myOrganization = (await Axios.get('/api/organization/me', {
        withCredentials: true
      })).data

    if (!myOrganization) throw Error('My Organization not found.')
    if (!myOrganization._id) throw Error('Received My Organization data is malformed.')

    window.localStorage.setItem('my-organization', JSON.stringify(myOrganization))
    return { type: 'set', myOrganization }
  } catch (e) {
    if (!silentFail) throw e
    return { type: 'unset' }
  }
}

let updateTimeout: NodeJS.Timeout | null = null
let updateCancellation: CancelTokenSource | null = null
export async function updateMyOrganization(
  myOrganization: IOrganizationPrivateResponse,
  dispatch: (action: Action) => void,
  timeout = 0
): Promise<Action> {
  if (updateTimeout !== null) clearTimeout(updateTimeout)
  if (updateCancellation !== null) updateCancellation.cancel()

  updateTimeout = setTimeout(async () => {
    updateCancellation = Axios.CancelToken.source()

    Axios.put(
      '/api/organization/edit-me',
      await organizationPrivateResponseToRequest(myOrganization),
      { withCredentials: true, cancelToken: updateCancellation.token }
    )
      .then(response => response.data)
      .then(data => reloadMyOrganization(false, data))
      .then(action => dispatch(action))
      .catch(err => {
        if (!Axios.isCancel(err)) {
          console.error(err)
          reloadMyOrganization()
            .then(action => dispatch(action))
            .catch(console.error)
        }
      })

    updateTimeout = null
  }, timeout)

  return { type: 'set', myOrganization }
}

export async function clear(): Promise<Action> {
  window.localStorage.removeItem('my-organization')
  return { type: 'unset' }
}
