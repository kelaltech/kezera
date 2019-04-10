import  { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'

export type VolunteerState = {
  readonly volunteer?:IVolunteerResponse | null
}

const volunteerStringFromStorage = window.localStorage.getItem('volunteer')

export const initialVolState:VolunteerState = {
  volunteer: volunteerStringFromStorage?JSON.parse(volunteerStringFromStorage): null
}

export type Action =
  | {readonly type: 'setting'; readonly volunteer: IVolunteerResponse}
  |{ readonly type: 'removeSetting'}


export function reducer (state: VolunteerState, action: Action): VolunteerState {
  switch (action.type) {
    case 'setting':
      return {...state, volunteer: action.volunteer}
    case 'removeSetting':
      return {...state, volunteer: null}
    default:
      throw Error('Unknown Action')
  }
}