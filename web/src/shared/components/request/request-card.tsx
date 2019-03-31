import React, { Component } from 'react'
import {
  Anchor,
  Block,
  Button,
  Card,
  Flex,
  FlexSpacer,
  Image,
  Loading,
  Page,
  SlideShow,
  Yoga
} from 'gerami'
import axios from 'axios'

import './request-card.scss'

export interface IRequestProps {
  request: any
}

export default function RequestCard({ request }: IRequestProps) {
  return (
    <Card imgSrc={request.picture}>
      <div>{request.name}</div>
      <hr />
      <Yoga maxCol={2}>
        <h5>Start Date/Time</h5>
        <h5>End Date/Time</h5>
      </Yoga>
      <Yoga maxCol={2}>
        <label>{new Date(request.startDate).toDateString()}</label>
        <label>{new Date(request.endDate).toDateString()}</label>
      </Yoga>
      <hr />
      <Flex>
        <Anchor className={'margin-top-normal'} to={'/api/request/' + request._id}>
          Details
        </Anchor>
        <FlexSpacer />
        <Button type="submit" primary>
          Support
        </Button>
      </Flex>
    </Card>
  )
}
