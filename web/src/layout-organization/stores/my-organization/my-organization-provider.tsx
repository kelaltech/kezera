import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react'

import { Action, initialState, reducer, State } from './my-organization-reducer'
import { reloadMyOrganization } from './my-organization-actions'

const contextForState = createContext<State>(initialState)
const contextForDispatch = createContext<Dispatch<Action>>(() => {})

export function MyOrganizationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // todo: re-enable: reloadMyOrganization(dispatch)
  }, [])

  return (
    <contextForState.Provider value={state}>
      <contextForDispatch.Provider value={dispatch}>
        {children}
      </contextForDispatch.Provider>
    </contextForState.Provider>
  )
}

export function useMyOrganizationState() {
  return useContext(contextForState)
}

export function useMyOrganizationDispatch() {
  return useContext(contextForDispatch)
}
