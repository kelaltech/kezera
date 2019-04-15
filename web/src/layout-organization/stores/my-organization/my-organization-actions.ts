import Axios, { CancelTokenSource } from 'axios'

import { Action } from './my-organization-reducer'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'
import { organizationResponseToRequest } from '../../../apiv/filters/organization.filter'

let reloadMyOrganizationCancellation: CancelTokenSource | null = null
export function reloadMyOrganization(
  myOrganizationDispatch: (action: Action) => void,
  silentFail = false,
  myOrganization?: IOrganizationResponse
): void {
  if (reloadMyOrganizationCancellation !== null) reloadMyOrganizationCancellation.cancel()

  const reload = (myOrganization?: IOrganizationResponse): void => {
    if (!myOrganization) throw Error('My Organization not found.')
    if (!myOrganization._id) throw Error('Received My Organization data is malformed.')

    window.localStorage.setItem('my-organization', JSON.stringify(myOrganization))
    myOrganizationDispatch({ type: 'set', myOrganization })
  }

  if (myOrganization) {
    reload(myOrganization)
  } else {
    reloadMyOrganizationCancellation = Axios.CancelToken.source()
    Axios.get<IOrganizationResponse>('/api/organization/me', {
      withCredentials: true,
      cancelToken: reloadMyOrganizationCancellation.token
    })
      .then(response => response.data)
      .then(reload)
      .catch(e => {
        if (!silentFail) throw e
        myOrganizationDispatch({ type: 'unset' })
      })
  }
}

let updateMyOrganizationTimeout: NodeJS.Timeout | null = null
let updateMyOrganizationCancellation: CancelTokenSource | null = null
export function updateMyOrganization(
  myOrganizationDispatch: (action: Action) => void,
  myOrganization: IOrganizationResponse,
  timeout = 0
): void {
  if (updateMyOrganizationTimeout !== null) clearTimeout(updateMyOrganizationTimeout)
  if (updateMyOrganizationCancellation !== null) updateMyOrganizationCancellation.cancel()

  updateMyOrganizationTimeout = setTimeout(async () => {
    updateMyOrganizationCancellation = Axios.CancelToken.source()

    Axios.put(
      '/api/organization/edit-me',
      await organizationResponseToRequest(myOrganization),
      { withCredentials: true, cancelToken: updateMyOrganizationCancellation.token }
    )
      .then(response => response.data)
      .then(data => reloadMyOrganization(myOrganizationDispatch, false, data))
      .catch(err => {
        if (!Axios.isCancel(err)) {
          console.error(err)
          reloadMyOrganization(myOrganizationDispatch)
        }
      })

    updateMyOrganizationTimeout = null
  }, timeout)

  myOrganizationDispatch({ type: 'set', myOrganization })
}

export function clearMyOrganization(
  myOrganizationDispatch: (action: Action) => void
): void {
  window.localStorage.removeItem('my-organization')
  myOrganizationDispatch({ type: 'unset' })
}
