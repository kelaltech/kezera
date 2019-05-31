import Axios, { CancelTokenSource } from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import { Action } from './volunteer-reducer'
import { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

export function reloadVolunteer(
  volunteerDispatch: (action: Action) => void,
  silentFail = false,
  volunteer?: IVolunteerResponse,
  onReload?: () => void,
  onError?: (e: any) => void
): void {
  const reload = async (volunteer?: IVolunteerResponse): Promise<void> => {
    if (!volunteer) return onError && onError(new Error('Volunteer not found.'))
    if (!volunteer.account)
      return onError && onError(new Error('Received volunteer data is malformed.'))

    await AsyncStorage.setItem('volunteer', JSON.stringify(volunteer))
    volunteerDispatch({ type: 'setting', volunteer })

    if (onReload) onReload()
  }

  if (volunteer) {
    reload(volunteer).catch(e => {
      if (!silentFail && onError) onError(e)
    })
  } else {
    Axios.get<IVolunteerResponse>('/api/volunteer/me', { withCredentials: true })
      .then(response => reload(response.data))
      .catch(e => {
        volunteerDispatch({ type: 'removeSetting' })
        if (!silentFail && onError && (e.response && e.response.status !== 401))
          onError(e)
      })
  }
}

let updateSettingTimeout: NodeJS.Timeout | number | null = null
let updateSettingCancellation: CancelTokenSource | null = null
export function updateSetting(
  volunteerDispatch: (action: Action) => void,
  volunteer: IVolunteerResponse,
  timeout = 0,
  onUpdate?: () => void,
  onError?: (e: any) => void
): void {
  if (updateSettingTimeout !== null) clearTimeout(updateSettingTimeout as number)
  if (updateSettingCancellation !== null) updateSettingCancellation.cancel()

  updateSettingTimeout = setTimeout(async () => {
    updateSettingCancellation = Axios.CancelToken.source()

    Axios.put<IVolunteerResponse>(
      '/api/volunteer/edit',
      volunteer /* todo: a front-end filter should turn this to IVolunteerRequest type */,
      {
        withCredentials: true,
        cancelToken: updateSettingCancellation.token
      }
    )
      .then(res => res.data)
      .then(data => reloadVolunteer(volunteerDispatch, false, data, onUpdate, onError))
      .catch(e => {
        if (!Axios.isCancel(e)) {
          if (onError) onError(e)
          reloadVolunteer(volunteerDispatch, undefined, undefined, undefined, onError)
        }
      })

    updateSettingTimeout = null
  }, timeout)

  volunteerDispatch({ type: 'setting', volunteer })
}

let reloadSubscriptionsCancellation: CancelTokenSource | null = null
export function reloadSubscriptions(
  volunteerDispatch: (action: Action) => void,
  silentFail = false,
  subscriptions?: IOrganizationResponse[],
  onReload?: () => void,
  onError?: (e: any) => void
): void {
  if (reloadSubscriptionsCancellation !== null) reloadSubscriptionsCancellation.cancel()

  const reload = async (subscriptions?: IOrganizationResponse[]): Promise<void> => {
    if (!subscriptions) return onError && onError(new Error('Subscriptions not found.'))
    if (!Array.isArray(subscriptions))
      return onError && onError(new Error('Received subscriptions data is malformed.'))

    await AsyncStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    volunteerDispatch({ type: 'subscriptions', subscriptions })

    if (onReload) onReload()
  }

  if (subscriptions) {
    reload(subscriptions).catch(e => {
      if (!silentFail && onError) onError(e)
    })
  } else {
    reloadSubscriptionsCancellation = Axios.CancelToken.source()
    Axios.get<IOrganizationResponse[]>('/api/organization/subscriptions', {
      withCredentials: true,
      cancelToken: reloadSubscriptionsCancellation.token
    })
      .then(res => reload(res.data))
      .catch(e => {
        volunteerDispatch({ type: 'subscriptions', subscriptions: [] })
        if (!silentFail && onError && (e.response && e.response.status !== 401))
          onError(e)
      })
  }
}

export function clearSubscriptions(
  volunteerDispatch: (action: Action) => void,
  onClear?: () => void,
  onError?: (e: any) => void
): void {
  AsyncStorage.removeItem('subscriptions')
    .then(() => {
      volunteerDispatch({ type: 'subscriptions', subscriptions: [] })

      if (onClear) onClear()
    })
    .catch(e => {
      if (onError) onError(e)
    })
}
