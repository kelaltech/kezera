import Axios, { CancelTokenSource } from 'axios'

import { Action } from './volunteer-reducer'
import { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

export function reloadVolunteer(
  volunteerDispatch: (action: Action) => void,
  silentFail = false,
  volunteer?: IVolunteerResponse
): void {
  const reload = (volunteer?: IVolunteerResponse): void => {
    if (!volunteer) throw Error('Volunteer Not Found')
    if (!volunteer.account) throw Error('Volunteer Information is Incorrect')

    window.localStorage.setItem('volunteer', JSON.stringify(volunteer))
    volunteerDispatch({ type: 'setting', volunteer })
  }

  if (volunteer) {
    reload(volunteer)
  } else {
    Axios.get('/api/volunteer/me', { withCredentials: true })
      .then(res => res.data)
      .then(reload)
      .catch(e => {
        if (!silentFail) throw e
        volunteerDispatch({ type: 'removeSetting' })
      })
  }
}

let updateTimeout: NodeJS.Timeout | null = null
let updateCancellation: CancelTokenSource | null = null
export function updateSetting(
  volunteerDispatch: (action: Action) => void,
  volunteer: IVolunteerResponse,
  timeout = 0
): void {
  if (updateTimeout !== null) clearTimeout(updateTimeout)
  if (updateCancellation !== null) updateCancellation.cancel()

  updateTimeout = setTimeout(async () => {
    updateCancellation = Axios.CancelToken.source()

    Axios.put('/api/volunteer/edit', volunteer)
      .then(res => res.data)
      .then(data => reloadVolunteer(volunteerDispatch, false, data))
      .catch(err => {
        if (!Axios.isCancel(err)) {
          reloadVolunteer(volunteerDispatch)
        }
      })

    updateTimeout = null
  }, timeout)
  volunteerDispatch({ type: 'setting', volunteer })
}

let reloadSubscriptionsCancellation: CancelTokenSource | null = null
export function reloadSubscriptions(
  volunteerDispatch: (action: Action) => void,
  silentFail = false,
  subscriptions?: IOrganizationResponse[]
): void {
  if (reloadSubscriptionsCancellation !== null) reloadSubscriptionsCancellation.cancel()

  const reload = (subscriptions?: IOrganizationResponse[]): void => {
    if (!subscriptions) throw Error('Subscriptions not found.')
    if (!Array.isArray(subscriptions))
      throw Error('Received subscriptions data is malformed.')

    window.localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    volunteerDispatch({ type: 'subscriptions', subscriptions })
  }

  if (subscriptions) {
    reload(subscriptions)
  } else {
    reloadSubscriptionsCancellation = Axios.CancelToken.source()
    Axios.get<IOrganizationResponse[]>('/api/organization/subscriptions', {
      withCredentials: true,
      cancelToken: reloadSubscriptionsCancellation.token
    })
      .then(res => res.data)
      .then(reload)
      .catch(e => {
        if (!silentFail) throw e
        volunteerDispatch({ type: 'subscriptions', subscriptions: [] })
      })
  }
}

export function clearSubscriptions(volunteerDispatch: (action: Action) => void): void {
  window.localStorage.removeItem('my-organization')
  volunteerDispatch({ type: 'subscriptions', subscriptions: [] })
}
