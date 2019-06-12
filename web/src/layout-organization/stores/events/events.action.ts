import Axios from 'axios'
import { Action } from './events.reducer'
import { addActivity } from '../../../shared/methods/methods'
import { useAccountState } from '../../../app/stores/account/account-provider'

export function AddEvents(data: FormData, dispatch: (action: Action) => void) {
  Axios.post('/api/event/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  })
    .then(resp => {
      dispatch({ type: 'ADD_EVENT', event: resp.data })
      addActivity('Created an event', `/event/${resp.data._id}`)
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
      addActivity('Updated event description', `/event/${resp.data._id}`)
    })
    .catch()
}

export function HandleInterested(id: string, dispatch: (action: Action) => void) {
  Axios.put(`/api/event/${id}/interest`)
    .then(resp => {
      dispatch({ type: 'ADD_INTERESTED', event: resp.data })
      addActivity('You are interested to an event', `/event/${id}`)
    })
    .catch()
}

export function HandleLike(id: string, dispatch: (action: Action) => void) {
  Axios.put('/api/event/' + id + '/like')
    .then(resp => {
      dispatch({ type: 'ADD_LIKE', event: resp.data })
      addActivity('You reacted to an event', `/event/${id}`)
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
      addActivity('You deleted an event', `/event/${id}`)
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
