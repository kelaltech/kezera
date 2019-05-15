import React, { Component } from 'react'
import { Anchor, Block, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ITaskDetail {
  request: any
}

export default function RequestTaskDetail({ request }: ITaskDetail) {
  return (
    <div>
      <Title size={'L'} className={'bold center'}>
        {request.task.numberNeeded}
      </Title>
    </div>
  )
}
