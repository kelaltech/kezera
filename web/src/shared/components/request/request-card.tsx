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

export interface IRequestCardProps {
  _id: string
  title: string
  startDate: Number
  endDate: Number
  description: string
  image: string
}

export interface IRequestState {
  loading: boolean
  requests: any[]
}
import img3 from '../../../assets/images/login/promo-1.jpg'
import img1 from '../../../../assets/images/news-temp.jpg'
import { any } from 'prop-types'

export default class RequestCard extends Component<IRequestCardProps, IRequestState> {
  state: IRequestState = {
    loading: true,
    requests: []
  }
  props: IRequestCardProps = {
    _id: '',
    title: '',
    startDate: 1,
    endDate: 2,
    description: '',
    image: ''
  }

  render() {
    const { _id, title, startDate, endDate, description, image } = this.props
    return (
      <Page>
        {this.state.loading ? (
          <Loading />
        ) : this.state.requests.length === 0 ? (
          <Block first last className={'center'}>
            There are no Requests.
          </Block>
        ) : (
          this.state.requests.map((r, i) => {
            return (
              <Card size={'S'}>
                <Image src={`${r.image}`} placeholder={`${r.title}`} />
                <hr />
                {r.description}

                <Yoga maxCol={2}>
                  <h5>Start Date/Time</h5>
                  <h5>End Date/Time</h5>
                </Yoga>

                <Yoga maxCol={2}>
                  <label>{r.startDate}</label>
                  <label>{r.endDate}</label>
                </Yoga>
                <hr />
                <Yoga maxCol={2}>
                  <Block last className={'left'}>
                    <Anchor className={'full-width'} to={'/organization/request/' + _id}>
                      Details
                    </Anchor>
                  </Block>
                  <Button className={'right'} type="submit" primary>
                    Support the Cause
                  </Button>
                </Yoga>
              </Card>
            )
          })
        )}
      </Page>
    )
  }
}
