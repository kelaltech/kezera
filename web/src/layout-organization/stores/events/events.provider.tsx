import React, { useReducer, useEffect, Dispatch, useContext } from 'react'
import { reducer, state, Action, State } from './events.reducer'
import { ListEvents } from './events.action'

export const EventContextState = React.createContext<State>(state)
export const EventContextDispatch = React.createContext<Dispatch<Action>>(() => {})

export function EventProvider({ children }: { children: React.ReactNode }) {
  let [EventState, dispatch] = useReducer(reducer, state)

  useEffect(() => {
    ListEvents(dispatch)
  }, [])
  return (
    <EventContextState.Provider value={EventState}>
      <EventContextDispatch.Provider value={dispatch}>
        {children}
      </EventContextDispatch.Provider>
    </EventContextState.Provider>
  )
}

export function useEventState() {
  return useContext(EventContextState)
}

export function useEventDispatch() {
  return useContext(EventContextDispatch)
}
