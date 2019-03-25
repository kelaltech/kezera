import React from 'react'
import { Image, Title, Block, Yoga, Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequestTabs from './request-tabs/request-tabs'

export default function RequestInformation() {
  return (
    <>
      <Content transparent size={'3XL'}>
        <RequestTabs />
      </Content>
    </>
  )
}
