import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Action, initialVolState, reducer, VolunteerState } from './volunteer-reducer'
import { useAccountState } from '../account/account-provider'
import {
  clearSubscriptions,
  reloadSubscriptions,
  reloadVolunteer
} from './volunteer-actions'
import { _ } from '../../../lib/language'

const contextForVolunteer = createContext<VolunteerState>(initialVolState)
const contextForVolunteerDispatch = createContext<Dispatch<Action>>(() => {})

export function VolunteerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialVolState)

  const { account } = useAccountState()
  useEffect(() => {
    if (account === null) {
      clearSubscriptions(dispatch)
    } else {
      AsyncStorage.getItem('volunteer').then(volunteerFromStorage => {
        reloadVolunteer(
          dispatch,
          undefined,
          account === undefined && volunteerFromStorage && state.volunteer === undefined
            ? JSON.parse(volunteerFromStorage)
            : undefined,
          () => {},
          e => Alert.alert(_`error`, e.message)
        )
      })

      AsyncStorage.getItem('subscriptions').then(subscriptionsFromStorage => {
        reloadSubscriptions(
          dispatch,
          undefined,
          account === undefined &&
            subscriptionsFromStorage &&
            state.subscriptions === undefined
            ? JSON.parse(subscriptionsFromStorage)
            : undefined,
          () => {},
          e => Alert.alert(_`error`, e.message)
        )
      })
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
