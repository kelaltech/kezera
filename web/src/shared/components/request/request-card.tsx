import React, { Component } from 'react'
import {
  Anchor,
  Block,
  Button,
  Card,
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
    <Page>
      <Card size={'S'}>
        <Image
          src={`${request.image}`}
          className={'request-image'}
          placeholder={`${name}`}
        />
        <hr />
        <Yoga maxCol={2}>
          <h5>Start Date/Time</h5>
          <h5>End Date/Time</h5>
        </Yoga>
        <Yoga maxCol={2}>
          <label>{request.startDate}</label>
          <label>{request.endDate}</label>
        </Yoga>
        <hr />
        <Yoga maxCol={2}>
          <Block last className={'left'}>
            <Anchor className={'full-width'} to={'/api/request' + request._id}>
              Details
            </Anchor>
          </Block>
          <Button className={'right'} type="submit" primary>
            Support the Cause
          </Button>
        </Yoga>
      </Card>
    </Page>
  )
}
