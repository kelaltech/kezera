import { IAccountResponse } from '../../../apiv/account.apiv'

export type State = {
  readonly user?: IAccountResponse | null
}

const userStringFromStorage = window.localStorage.getItem('account')
export const initialState: State = {
  user: userStringFromStorage ? JSON.parse(userStringFromStorage) : null
}

export type Action =
  | { readonly type: 'set'; readonly account: IAccountResponse }
  | { readonly type: 'unset' }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return { ...state, user: action.account }
    case 'unset':
      return { ...state, user: null }
    default:
      throw Error('Unexpected action')
  }
}
