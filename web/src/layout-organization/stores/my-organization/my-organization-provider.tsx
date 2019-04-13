import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react'

import { Action, initialState, reducer, State } from './my-organization-reducer'
import { clearMyOrganization, reloadMyOrganization } from './my-organization-actions'
import { useAccountState } from '../../../app/stores/account/account-provider'

const contextForState = createContext<State>(initialState)
const contextForDispatch = createContext<Dispatch<Action>>(() => {})

export function MyOrganizationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { account } = useAccountState()
  useEffect(() => {
    if (account === null) {
      clearMyOrganization(dispatch)
    } else {
      reloadMyOrganization(
        dispatch,
        undefined,
        account === undefined && state.myOrganization ? state.myOrganization : undefined
      )
    }
  }, [account])

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
