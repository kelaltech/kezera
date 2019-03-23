import axios from 'axios'
import * as qs from 'qs'

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status == 401) {
      window.location.replace(
        `/login?${qs.stringify(
          Object.assign(qs.parse(window.location.search, { ignoreQueryPrefix: true }), {
            continue: window.location.pathname
          })
        )}` // todo: a you need to login first message
      )
    }

    return Promise.reject(error.response.data)
  }
)
