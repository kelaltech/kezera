import { IOrganizationEventResponse } from '../../../../../api/modules/event/event.apiv'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'

export type State = {
  events: IOrganizationEventResponse[]
  volunteers: IAccountResponse[]
}

export type Action =
  | { type: 'LIST_EVENTS'; events: IOrganizationEventResponse[] }
  | { type: 'GET_EVENT'; _id: string }
  | { type: 'ADD_INTERESTED'; event: IOrganizationEventResponse }
  | { type: 'ADD_LIKE'; event: IOrganizationEventResponse }

export const state: State = {
  events: [],
  volunteers: []
}

export const reducer = function(initialState = state, action: Action): State {
  switch (action.type) {
    case 'LIST_EVENTS':
      return { ...initialState, events: action.events }

    case 'ADD_INTERESTED':
      let e = initialState.events
      for (let i = 0; i < e.length; i++) {
        if (e[i]._id === action.event._id) {
          e[i] = action.event
        }
      }
      console.group('Events')
      console.log(e)
      return { ...initialState, events: e }

    case 'ADD_LIKE':
      let like = initialState.events
      for (let i = 0; i < like.length; i++) {
        if (like[i]._id === action.event._id) {
          like[i] = action.event
        }
      }
      console.group('Events')
      console.log(like)
      return { ...initialState, events: like }

    default:
      break
  }
  return initialState
}
