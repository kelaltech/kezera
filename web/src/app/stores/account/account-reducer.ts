import { IAccountResponse } from '../../../apiv/account.apiv'

export type State = {
  readonly account?: IAccountResponse | null
}

const userStringFromStorage = window.localStorage.getItem('account')
export const initialState: State = {
  account: userStringFromStorage ? JSON.parse(userStringFromStorage) : null
}

export type Action =
  | { readonly type: 'set'; readonly account: IAccountResponse }
  | { readonly type: 'unset' }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return { ...state, account: action.account }
    case 'unset':
      return { ...state, account: null }
    default:
      throw Error('Unexpected action')
  }
}
