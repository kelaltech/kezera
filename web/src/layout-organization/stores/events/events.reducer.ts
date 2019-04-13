import { IOrganizationEventResponse } from '../../../../../api/modules/event/event.apiv'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'

export type State = {
  events: IOrganizationEventResponse[]
  volunteers: IAccountResponse[]
}

export type Action =
  | { type: 'LIST_EVENTS'; events: IOrganizationEventResponse[] }
  | { type: 'GET_EVENT'; _id: string }
  | { type: 'DELETE_EVENT'; _id: string }
  | { type: 'GET_ATTENDED'; volunteers: IAccountResponse[] }
  | { type: 'GET_GOING'; volunteers: IAccountResponse[] }
  | { type: 'ADD_EVENT'; event: IOrganizationEventResponse }
  | { type: 'EDIT_EVENT'; event: IOrganizationEventResponse }

export const state: State = {
  events: [],
  volunteers: []
}

export const reducer = function(initialState = state, action: Action): State {
  switch (action.type) {
    case 'LIST_EVENTS':
      return { ...initialState, events: action.events }

    case 'DELETE_EVENT':
      initialState.events = initialState.events.filter(
        v => v._id.toString() !== action._id
      )
      return { ...initialState }

    case 'ADD_EVENT':
      return { ...initialState, events: initialState.events.concat(action.event) }

    case 'EDIT_EVENT':
      let events = initialState.events
      for (let i = 0; i < events.length; i++) {
        if (events[i]._id == action.event._id) {
          events[i] = action.event
        }
      }
      console.group('Events')
      console.log(events)
      return { ...initialState, events: events }

    case 'GET_EVENT':
      //return {...initialState,verifiers:initialState.verifiers.concat(action.verifier)}
      break

    case 'GET_ATTENDED':
      return { ...initialState, volunteers: action.volunteers }

    case 'GET_GOING':
    // return ;
    default:
      break
  }
  return initialState
}
