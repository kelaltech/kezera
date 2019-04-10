import React, { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react'
import { Action, initialVolState, reducer, VolunteerState } from './volunteer-reducer'



const contextForVolunteer = createContext<VolunteerState>(initialVolState)
const contextForVolunteerDispatch = createContext<Dispatch<Action>>(()=>{})

export function VolunteerProvider({children}:{children: ReactNode}){
  const [state, dispatch] = useReducer(reducer, initialVolState)

  useEffect(()=>{

  },[])

  return(
    <contextForVolunteer.Provider value={state}>
      <contextForVolunteerDispatch.Provider value={dispatch}>
        {children}
      </contextForVolunteerDispatch.Provider>
    </contextForVolunteer.Provider>
  )
}

export function useVolunteerState () {
  return useContext(contextForVolunteer)
}

export function useVolunteerDispatch () {
  return useContext(contextForVolunteerDispatch)
}