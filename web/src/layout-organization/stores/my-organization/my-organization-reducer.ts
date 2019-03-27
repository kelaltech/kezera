import { IOrganizationPrivateResponse } from '../../../apiv/organization.apiv'

export type State = {
  readonly myOrganization?: IOrganizationPrivateResponse | null
}

const myOrganizationStringFromStorage = window.localStorage.getItem('my-organization')
export const initialState: State = {
  myOrganization: myOrganizationStringFromStorage
    ? JSON.parse(myOrganizationStringFromStorage)
    : null
}

export type Action =
  | { readonly type: 'set'; readonly myOrganization: IOrganizationPrivateResponse }
  | { readonly type: 'unset' }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return { ...state, myOrganization: action.myOrganization }
    case 'unset':
      return { ...state, myOrganization: null }
    default:
      throw Error('Unexpected action')
  }
}
