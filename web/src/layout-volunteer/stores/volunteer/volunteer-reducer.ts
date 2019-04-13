import { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

export type VolunteerState = {
  readonly volunteer?: IVolunteerResponse | null
  readonly subscriptions: IOrganizationResponse[]
}

const volunteerStringFromStorage = window.localStorage.getItem('volunteer')

export const initialVolState: VolunteerState = {
  volunteer: volunteerStringFromStorage ? JSON.parse(volunteerStringFromStorage) : null,
  subscriptions: []
}

export type Action =
  | { readonly type: 'setting'; readonly volunteer: IVolunteerResponse }
  | { readonly type: 'removeSetting' }
  | { readonly type: 'SUBSCRIPTIONS'; readonly subscriptions: IOrganizationResponse[] }

export function reducer(state: VolunteerState, action: Action): VolunteerState {
  switch (action.type) {
    case 'setting':
      return { ...state, volunteer: action.volunteer }
    case 'removeSetting':
      return { ...state, volunteer: null }
    case 'SUBSCRIPTIONS':
      return { ...state, subscriptions: action.subscriptions }
    default:
      throw Error('Unknown Action')
  }
}
