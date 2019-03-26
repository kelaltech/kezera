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
import img1 from '../../../../assets/images/news-temp.jpg'
import { any } from 'prop-types'

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
    return (
      <Page>
        {this.state.requests.map((request, i) => {
          return (
            <Card size={'S'}>
              <Image
                src={`/api/request/${request._id}/picture`}
                placeholder={`${request.title}`}
              />
              <hr />
              {request.description}

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
                  <Anchor className={'full-width'} to={'/api/request/' + request._id}>
                    Details
                  </Anchor>
                </Block>
                <Button className={'right'} type="submit" primary>
                  Support the Cause
                </Button>
              </Yoga>
            </Card>
          )
        })}
      </Page>
    )
  }
}
