import React, { useEffect, useState } from 'react'
import { Content, Page, Yoga } from 'gerami'
import axios from 'axios'

import './request-card.scss'
import RequestCard from '../../../shared/components/request/request-card'
import promo from '../../../assets/images/login/promo-1.jpg'

export default function RequestList() {
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('/api/request/list')
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
    <Page>
      <Content transparent size={'3XL'}>
        <h1>Requests</h1>
      </Content>

      <Content transparent size={'3XL'}>
        <hr />
      </Content>

      {!requests.length && <Content size={'3XL'}>No requests found.</Content>}

      <Yoga size={'3XL'} maxCol={3} className={'request-list-yoga'}>
        {requests.map((request, i) => (
          <RequestCard key={i} request={request} />
        ))}
      </Yoga>
    </Page>
  )
}
