import Axios from 'axios'
import { Action } from './events.reducer'

export function HandleInterested(id: string, dispatch: (action: Action) => void) {
  Axios.put(`/api/event/${id}/interest`)
    .then(resp => {
      dispatch({ type: 'ADD_INTERESTED', event: resp.data })
    })
    .catch()
}

export function HandleLike(id: string, dispatch: (action: Action) => void) {
  Axios.put('/api/event/' + id + '/like')
    .then(resp => {
      dispatch({ type: 'ADD_LIKE', event: resp.data })
    })
    .catch()
}

export function ListEvents(dispatch: (action: Action) => void) {
  Axios.get('/api/event/mine')
    .then(resp => dispatch({ type: 'LIST_EVENTS', events: resp.data }))
    .catch()
}

export function GetEvent(id: string) {
  Axios.get('')
    .then()
    .catch()
}
