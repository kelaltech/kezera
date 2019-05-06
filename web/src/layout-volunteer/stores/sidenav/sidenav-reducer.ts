export interface ISidenav {
  mini: boolean
}

export const initialState: ISidenav = {
  mini: false
}

export type Action = { type: 'set' }

export function reducer(state: ISidenav, action: Action): ISidenav {
  switch (action.type) {
    case 'set':
      return { mini: !state.mini }
    default:
      return state
  }
}
