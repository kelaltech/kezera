import React, { Component } from 'react'
import { Anchor, Block, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IMaterialDetail {
  request: any
}

export default function RequestMaterialDetail({ request }: IMaterialDetail) {
  return (
    <div>
      <Yoga maxCol={2}>
        <Title size={'L'} className={'bold center'}>
          {request.material.status}
        </Title>
        <Title size={'L'} className={'bold center'}>
          {request.material.materialType}
        </Title>
      </Yoga>
    </div>
  )
}
