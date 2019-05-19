export interface ISidenav {
  mini: boolean
}

const miniStringFromStorage = window.localStorage.getItem('mini')
export const initialState: ISidenav = {
  mini: miniStringFromStorage ? JSON.parse(miniStringFromStorage) : false
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
