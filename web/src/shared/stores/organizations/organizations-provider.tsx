import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react'

import { Action, initialState, reducer, State } from './organizations-reducer'
import {} from './organizations-actions'

const contextForState = createContext<State>(initialState)
const contextForDispatch = createContext<Dispatch<Action>>(() => {})

export function OrganizationsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // todo
  }, [])

  return (
    <contextForState.Provider value={state}>
      <contextForDispatch.Provider value={dispatch}>
        {children}
      </contextForDispatch.Provider>
    </contextForState.Provider>
  )
}

export function useOrganizationsState() {
  return useContext(contextForState)
}

export function useOrganizationsDispatch() {
  return useContext(contextForDispatch)
}
