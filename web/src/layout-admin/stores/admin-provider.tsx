import React, { useReducer, useEffect, Dispatch, useContext } from 'react'
import { reducer, state, Action, State } from './admin-reducer'
import { FetchVerifiers } from './admin-action'

export const AdminContextState = React.createContext<State>(state)
export const AdminContextDispatch = React.createContext<Dispatch<Action>>(() => {})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  let [AdminState, dispatch] = useReducer(reducer, state)

  useEffect(() => {
    FetchVerifiers(dispatch)
  }, [])
  return (
    <AdminContextState.Provider value={AdminState}>
      <AdminContextDispatch.Provider value={dispatch}>
        {children}
      </AdminContextDispatch.Provider>
    </AdminContextState.Provider>
  )
}

export function useAdminState() {
  return useContext(AdminContextState)
}

export function useAdminDispatch() {
  return useContext(AdminContextDispatch)
}
