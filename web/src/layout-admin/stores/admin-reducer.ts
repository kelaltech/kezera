import { IAccountResponse } from '../../apiv/account.apiv'

export type State = {
  verifiers: IAccountResponse[]
}

export type Action =
  | { type: 'FETCH_VERIFIERS'; verifiers: IAccountResponse[] }
  | { type: 'DELETE_VERIFIERS'; _id: string }
  | { type: 'ADD_VERIFIER'; verifier: IAccountResponse }
  | { type: 'GET_VERIFIER'; verifier: IAccountResponse }

export const state: State = {
  verifiers: []
}

export const reducer = function(initialState = state, action: Action): State {
  switch (action.type) {
    case 'FETCH_VERIFIERS':
      return { ...initialState, verifiers: action.verifiers }

    case 'DELETE_VERIFIERS':
      initialState.verifiers = initialState.verifiers.filter(v => v._id !== action._id)
      return { ...initialState }

    case 'ADD_VERIFIER':
      return {
        ...initialState,
        verifiers: initialState.verifiers.concat(action.verifier)
      }

    case 'GET_VERIFIER':
      return { ...initialState }
    default:
      break
  }
  return initialState
}
