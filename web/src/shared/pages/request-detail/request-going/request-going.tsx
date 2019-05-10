import React, { useState, useEffect } from 'react'
import { Content, Yoga } from 'gerami'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'

function RequestGoing({ match }: RouteComponentProps<{ _id: string }>) {
  let [volunteers, setVolunteers] = useState<any[]>([])
  let getGoing = function() {
    axios
      .get(`/api/request/list-request-volunteers/${match.params._id}`)
      .then((resp: any) => setVolunteers(resp.data))
      .catch(console.error)
  }
  useEffect(() => {
    getGoing()
  }, [])
  return !volunteers ? null : (
    <Content>
      <Yoga maxCol={5}>
        <div>
          <pre>{JSON.stringify(volunteers, undefined, 4)}</pre>
        </div>
      </Yoga>
    </Content>
  )
}
export default withRouter(RequestGoing)
