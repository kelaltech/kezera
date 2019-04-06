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
  Title,
  Yoga
} from 'gerami'
import axios from 'axios'

export interface ITaskProps {
  request: any
}

export default function TaskCard({ request }: ITaskProps) {
  return (
    <Card imgSrc={request.picture}>
      <Title size={'L'} className={'center'}>
        {request.name}
      </Title>
      <hr />
      <Flex>
        <label>{new Date(request.startDate).toDateString()}</label>
        <FlexSpacer />
        <label>-</label>
        <FlexSpacer />
        <label>{new Date(request.endDate).toDateString()}</label>
      </Flex>
      <Flex>
        <label>{new Date(request.task.startTime).toDateString()}</label>
        <FlexSpacer />
        <label>{new Date(request.task.endTime).toDateString()}</label>
      </Flex>
      <h5>{request.type}</h5>
      <label>{request.task.numberNeeded}</label>
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
