import { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

export type VolunteerState = {
  readonly volunteer?: IVolunteerResponse | null
  readonly subscriptions?: IOrganizationResponse[]
}

export const initialVolState: VolunteerState = {
  volunteer: undefined,
  subscriptions: undefined
}

export type Action =
  | { readonly type: 'setting'; readonly volunteer: IVolunteerResponse }
  | { readonly type: 'removeSetting' }
  | { readonly type: 'subscriptions'; readonly subscriptions: IOrganizationResponse[] }

export function reducer(state: VolunteerState, action: Action): VolunteerState {
  switch (action.type) {
    case 'setting':
      return { ...state, volunteer: action.volunteer }
    case 'removeSetting':
      return { ...state, volunteer: null }
    case 'subscriptions':
      return { ...state, subscriptions: action.subscriptions }
    default:
      throw Error('Unknown Action')
  }
}
