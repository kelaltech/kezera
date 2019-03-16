import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react'

import { Action, initialState, reducer, State } from './user-reducer'

const contextForState = createContext<State>(initialState)
const contextForDispatch = createContext<Dispatch<Action>>(() => {})

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <contextForState.Provider value={state}>
      <contextForDispatch.Provider value={dispatch}>
        {children}
      </contextForDispatch.Provider>
    </contextForState.Provider>
  )
}

export function useUserState() {
  return useContext(contextForState)
}

export function useUserDispatch() {
  return useContext(contextForDispatch)
}
