import Axios from 'axios'
import { Action } from './events.reducer'

export function AddEvents(data: FormData, dispatch: (action: Action) => void) {
  Axios.post('/api/event/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  })
    .then(resp => {
      dispatch({ type: 'ADD_EVENT', event: resp.data })
    })
    .catch()
}

export function EditEvent(
  id: string,
  data: FormData,
  dispatch: (action: Action) => void
) {
  Axios.put(`/api/event/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  })
    .then(resp => {
      console.log(resp.data)
      dispatch({ type: 'EDIT_EVENT', event: resp.data })
    })
    .catch()
}

export function ListEvents(dispatch: (action: Action) => void) {
  Axios.get('/api/event/mine')
    .then(resp => dispatch({ type: 'LIST_EVENTS', events: resp.data }))
    .catch()
}

export function DeleteEvent(id: string, dispatch: (action: Action) => void) {
  Axios.delete(`/api/event/${id}`)
    .then(() => {
      dispatch({ type: 'DELETE_EVENT', _id: id })
    })
    .catch()
}

export function GetEvent(id: string) {
  Axios.get('')
    .then()
    .catch()
}

export function GetAttended(eventId: string, dispatch: (action: Action) => void) {
  Axios.get(`/api/event/${eventId}/attended`)
    .then(resp => {
      dispatch({ type: 'GET_ATTENDED', volunteers: resp.data })
    })
    .catch()
}

export function GetGoing(eventId: string) {
  Axios.get('')
    .then()
    .catch()
}
