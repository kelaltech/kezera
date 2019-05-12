import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RequestCard from '../../components/request/request-card'

interface ISearch {
  term?: string
}
function RequestSearch(props: ISearch) {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    axios
      .get('/api/request/search?term=' + props.term)
      .then((requests: any) => {
        setRequests(requests.data)
      })
      .catch((e: any) => console.log(e))
  }, [])

  return (
    <div>
      <h1>Requests Search result</h1>
      <div>
        {requests.map((r: any) => (
          <RequestCard request={r} />
        ))}
      </div>
    </div>
  )
}

export default RequestSearch
