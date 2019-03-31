import { IOrganizationResponse } from '../../../apiv/organization.apiv'

export type State = {
  // todo
}

export const initialState: State = {
  // todo
}

export type Action = { type: never }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    default:
      throw Error('Unexpected action')
  }
}
