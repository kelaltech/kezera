import React, { useEffect, useState } from 'react'
import { Page, Yoga } from 'gerami'
import axios from 'axios'

import RequestCard from '../../../shared/components/request/request-card'
import promo from '../../../assets/images/login/promo-1.jpg'

export default function RequestList() {
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(res => {
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <Page>
      <Yoga maxCol={2}>
        {requests.map((request, i) => {
          return <RequestCard key={i} request={request} />
        })}
      </Yoga>
    </Page>
  )
}
