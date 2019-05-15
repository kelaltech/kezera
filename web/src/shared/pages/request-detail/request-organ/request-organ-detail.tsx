import React, { Component } from 'react'
import { Anchor, Block, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IOrganDetail {
  request: any
}

export default function RequestOrganDetail({ request }: IOrganDetail) {
  return (
    <div>
      <Title size={'L'} className={'bold center'}>
        {request.organ.type}
      </Title>
    </div>
  )
}
