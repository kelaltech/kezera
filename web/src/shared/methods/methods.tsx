import Axios from 'axios'
import { useAccountState } from '../../app/stores/account/account-provider'

export function addActivity(displayData: string, link: string) {
  let body = new FormData()
  body.append('data', displayData)
  body.append('link', link)

  Axios.post('/api/activity/add', body)
    .then()
    .catch()
}
