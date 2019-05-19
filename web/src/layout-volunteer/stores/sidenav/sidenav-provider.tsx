import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { Action, initialState, ISidenav, reducer } from './sidenav-reducer'

const contextForSidenav = createContext<ISidenav>(initialState)
const contextForSidenavDispatch = createContext<Dispatch<Action>>(() => {})
export function SidenavProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'set' })
    window.localStorage.setItem('mini', JSON.stringify(state.mini))
  }, [])
  return (
    <contextForSidenav.Provider value={state}>
      <contextForSidenavDispatch.Provider value={dispatch}>
        {children}
      </contextForSidenavDispatch.Provider>
    </contextForSidenav.Provider>
  )
}

export function useSidenavState() {
  return useContext(contextForSidenav)
}

export function useSidenavDispatch() {
  return useContext(contextForSidenavDispatch)
}
