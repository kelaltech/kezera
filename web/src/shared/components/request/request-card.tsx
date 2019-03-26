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

export interface IRequestState {
  requests: any[]
}

export interface IRequestState {
  requests: any[]
}
import img3 from '../../../assets/images/login/promo-1.jpg'
import { any } from 'prop-types'
import { url } from 'inspector'

export default class RequestCard extends Component<any, IRequestState> {
  getRequest = () => {
    axios
      .get('/api/request/list')
      .then(data => this.setState({ requests: data.data }))
      .catch(console.error)
  }

  componentDidMount() {
    this.getRequest()
  }

  render() {
    const data = {
      name: 'dfsgfdsa',
      description: 'dfsgfdsa',
      startDate: 3123,
      endDate: 1234,
      image: img3
    }
    return (
      <Page>
        {/*
        {this.state.requests.map((request, i) => {
          return (*/}
        <Card size={'S'}>
          <Image
            src={`${data.image}`}
            className={'request-image'}
            placeholder={`${data.name}`}
          />
          <hr />
          xfagdyulgaejhfrlajsdfgasdfadsf sdfasdfasdfadfasdfasdf sdafadsfadsfadfadfadsfasd
          <Yoga maxCol={2}>
            <h5>Start Date/Time</h5>
            <h5>End Date/Time</h5>
          </Yoga>
          <Yoga maxCol={2}>
            <label>5/10/19</label>
            <label>5/10/19</label>
          </Yoga>
          <hr />
          <Yoga maxCol={2}>
            <Block last className={'left'}>
              <Anchor className={'full-width'} to={'/api/request/65'}>
                Details
              </Anchor>
            </Block>
            <Button className={'right'} type="submit" primary>
              Support the Cause
            </Button>
          </Yoga>
        </Card>
        {/*
          )
        })}*/}
      </Page>
    )
  }
}
