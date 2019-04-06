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

import './fund-card.scss'

export interface IFundProps {
  request: any
}

export default function FundCard({ request }: IFundProps) {
  return (
    <Card className={'fund-card'} imgSrc={request.picture}>
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
      <h5>{request.type}</h5>
      <h5>{request.fundraising.amount}</h5>
      <hr />
      <Flex>
        <Anchor
          className={'margin-top-normal'}
          to={'/organization/request/' + request._id}
        >
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
