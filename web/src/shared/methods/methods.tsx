import Axios from 'axios'

export function addActivity(data: string, link: string, type: any) {
  let body = new FormData()
  body.append('data', data)
  body.append('link', link)
  body.append('activityType', type)
  Axios.post('/api/activity/add', body)
    .then()
    .catch()
}
