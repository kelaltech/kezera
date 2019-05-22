import React, { useState, useEffect } from 'react'
import { Content, Yoga } from 'gerami'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'
import RequestCard from '../../../components/request/request-card'
import RequestVolunteers from '../request-volunteers/request-volunteers'

function RequestGoing({ match }: RouteComponentProps<{ _id: string }>) {
  let [requests, setRequests] = useState<any[]>([])
  useEffect(() => {
    axios
      .get(`/api/request/list-request-volunteers/${match.params._id}`)
      .then(res => {
        setRequests(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  return (
    <Content>
      {requests.map((request, i) => (
        <RequestVolunteers request={request} key={i} />
      ))}
      <Yoga maxCol={5} />
    </Content>
  )
}
export default RequestGoing
