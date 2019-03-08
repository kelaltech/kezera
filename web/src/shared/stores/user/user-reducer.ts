import { IUserResponse } from '../../../app/apiv/user-apiv'

export type State = {
  readonly user?: IUserResponse | null
}

const userStringFromStorage = window.localStorage.getItem('user')
export const initialState: State = {
  user: userStringFromStorage ? JSON.parse(userStringFromStorage) : null
}

export type Action =
  | { readonly type: 'set'; readonly user: IUserResponse }
  | { readonly type: 'unset' }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return { ...state, user: action.user }
    case 'unset':
      return { ...state, user: null }
    default:
      throw Error('Unexpected action')
  }
}
