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

import { Action, initialState, reducer, State } from './account-reducer'
import { reloadAccount } from './account-actions'
import { _ } from '../../../lib/language'

const contextForState = createContext<State>(initialState)
const contextForDispatch = createContext<Dispatch<Action>>(() => {})

export function AccountProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    AsyncStorage.getItem('account').then(accountFromStorage => {
      reloadAccount(
        dispatch,
        undefined,
        accountFromStorage && state.account === undefined
          ? JSON.parse(accountFromStorage)
          : undefined,
        e => Alert.alert(_`error`, e.message)
      )
    })
  }, [])

  return (
    <contextForState.Provider value={state}>
      <contextForDispatch.Provider value={dispatch}>
        {children}
      </contextForDispatch.Provider>
    </contextForState.Provider>
  )
}

export function useAccountState() {
  return useContext(contextForState)
}

export function useAccountDispatch() {
  return useContext(contextForDispatch)
}
