import Axios from 'axios'
import { Action } from './admin-reducer'

export function FetchVerifiers(dispatch: (action: Action) => void) {
  Axios.get('/api/admin/verifier/list')
    .then(resp => {
      dispatch({ type: 'FETCH_VERIFIERS', verifiers: resp.data })
    })
    .catch(console.error)
}

export function AddVerifier(dispatch: (action: Action) => void, verifier: FormData) {
  Axios.post('/api/admin/verifier/add', verifier, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  })
    .then(resp => {
      dispatch({ type: 'ADD_VERIFIER', verifier: resp.data })
    })
    .catch(console.error)
}

export function DeleteVerifiers(id: string, dispatch: (action: Action) => void) {
  Axios.delete(`/api/admin/verifier/${id}`)
    .then(() => {
      dispatch({ type: 'DELETE_VERIFIERS', _id: id })
    })
    .catch()
}

export function GetVerifier(id: string, dispatch: (action: Action) => void) {
  Axios.get(`/api/admin/verifier/${id}`)
    .then(resp => dispatch({ type: 'GET_VERIFIER', verifier: resp.data }))
    .catch(console.error)
}
