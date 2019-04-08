import React, { useEffect, useState } from 'react'
import { Image, Title, Block, Yoga, Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequestTabs from './request-tabs/request-tabs'
import axios from 'axios'

export default function RequestInformation() {
  const [request, setRequest] = useState<any>('')

  useEffect(() => {
    axios
      .get(`/api/request/${request._id}`)
      .then(res => {
        setRequest(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  return (
    <>
      <Content transparent size={'3XL'}>
        <RequestTabs />
      </Content>
    </>
  )
}
