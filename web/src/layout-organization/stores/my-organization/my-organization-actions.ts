import Axios, { CancelTokenSource } from 'axios'

import { Action } from './my-organization-reducer'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'
import { organizationPrivateResponseToRequest } from '../../../apiv/filters/organization.filter'

export function reloadMyOrganization(
  myOrganizationDispatch: (action: Action) => void,
  silentFail = false,
  myOrganization?: IOrganizationResponse
): void {
  const reload = (myOrganization?: IOrganizationResponse): void => {
    if (!myOrganization) throw Error('My Organization not found.')
    if (!myOrganization._id) throw Error('Received My Organization data is malformed.')

    window.localStorage.setItem('my-organization', JSON.stringify(myOrganization))
    myOrganizationDispatch({ type: 'set', myOrganization })
  }

  if (myOrganization) {
    reload(myOrganization)
  } else {
    Axios.get('/api/organization/me', { withCredentials: true })
      .then(response => response.data)
      .then(reload)
      .catch(e => {
        if (!silentFail) throw e
        myOrganizationDispatch({ type: 'unset' })
      })
  }
}

let updateTimeout: NodeJS.Timeout | null = null
let updateCancellation: CancelTokenSource | null = null
export function updateMyOrganization(
  myOrganizationDispatch: (action: Action) => void,
  myOrganization: IOrganizationResponse,
  timeout = 0
): void {
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
      .then(data => reloadMyOrganization(myOrganizationDispatch, false, data))
      .catch(err => {
        if (!Axios.isCancel(err)) {
          console.error(err)
          reloadMyOrganization(myOrganizationDispatch)
        }
      })

    updateTimeout = null
  }, timeout)

  myOrganizationDispatch({ type: 'set', myOrganization })
}

export function clear(myOrganizationDispatch: (action: Action) => void): void {
  window.localStorage.removeItem('my-organization')
  myOrganizationDispatch({ type: 'unset' })
}
