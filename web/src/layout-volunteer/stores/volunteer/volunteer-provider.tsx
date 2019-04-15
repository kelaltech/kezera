import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react'

import { Action, initialVolState, reducer, VolunteerState } from './volunteer-reducer'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { clearSubscriptions, reloadSubscriptions } from './volunteer-actions'

const contextForVolunteer = createContext<VolunteerState>(initialVolState)
const contextForVolunteerDispatch = createContext<Dispatch<Action>>(() => {})

export function VolunteerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialVolState)

  const { account } = useAccountState()
  useEffect(() => {
    if (account === null) {
      clearSubscriptions(dispatch)
    } else {
      console.log(state.subscriptions)
      reloadSubscriptions(
        dispatch,
        undefined,
        account === undefined && state.subscriptions ? state.subscriptions : undefined
      )
    }
  }, [account])

  return (
    <contextForVolunteer.Provider value={state}>
      <contextForVolunteerDispatch.Provider value={dispatch}>
        {children}
      </contextForVolunteerDispatch.Provider>
    </contextForVolunteer.Provider>
  )
}

export function useVolunteerState() {
  return useContext(contextForVolunteer)
}

export function useVolunteerDispatch() {
  return useContext(contextForVolunteerDispatch)
}
