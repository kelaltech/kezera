import Axios from 'axios'

Axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (Axios.isCancel(error)) return Promise.reject(error)

    /*
    // todo: causing problems (e.g. can't access /organization/apply logged out)
    if (
      error.response.status == 401 &&
      !window.localStorage.getItem('account') &&
      window.location.pathname != '/login'
    ) {
      window.location.replace(
        `/login?${qs.stringify(
          Object.assign(qs.parse(window.location.search, { ignoreQueryPrefix: true }), {
            continue: window.location.pathname
          })
        )}` // todo: a you need to login first message
      )
    }
    */

    return Promise.reject(error.response ? error.response.data : error)
  }
)
