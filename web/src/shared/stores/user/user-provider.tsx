import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react'

import { Action, initialState, reducer, State } from './user-reducer'

const context = createContext<[State, Dispatch<Action>]>([initialState, () => {}])

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <context.Provider value={useReducer(reducer, initialState)}>
      {children}
    </context.Provider>
  )
}

export function useUserReducer() {
  return useContext(context)
}
