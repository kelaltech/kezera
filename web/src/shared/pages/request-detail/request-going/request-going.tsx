import React, { useState, useEffect } from 'react'
import { Content, Yoga } from 'gerami'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'

function RequestGoing({ match }: RouteComponentProps<{ _id: string }>) {
  let [request, setRequest] = useState<any[]>([])
  let getGoing = function() {
    axios
      .get(`/api/request/list-request-volunteers/${match.params._id}`)
      .then((resp: any) => setRequest(resp.data))
      .catch(console.error)
  }
  useEffect(() => {
    getGoing()
  }, [])

  return (
    <Content>
      <Yoga maxCol={5} />
    </Content>
  )
}
export default RequestGoing
