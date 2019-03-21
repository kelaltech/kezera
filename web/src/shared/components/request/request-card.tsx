import React, { Component } from 'react'
import { Anchor, Block, Button, Card, Image, Page, Yoga } from 'gerami'

import './request-card.scss'

export interface IRequestCardProps {
  _id: string
  className?: string
  title: string
  startDate: Number
  endDate: Number
  description: string
  image: string
}

export default class RequestCard extends Component<IRequestCardProps, {}> {
  render() {
    const { _id, className, title, startDate, endDate, description, image } = this.props
    return (
      <Page>
        <Card size={'M'}>
          <Yoga maxCol={2}>
            <Block first className={'request-title'}>
              <h4>{title}</h4>
            </Block>
            <Block>
              <Image src={image} className={'request-card-image'} />
            </Block>
          </Yoga>
          <hr />
          <Block className={'request-description'}>{description}</Block>

          <hr />
          <Yoga maxCol={2}>
            <Block>
              <h5>Start Date/Time</h5>
            </Block>
            <Block>
              <h5>End Date/Time</h5>
            </Block>
          </Yoga>

          <Yoga maxCol={2}>
            <Block>
              <label>{startDate}</label>
            </Block>
            <Block>
              <label>{endDate}</label>
            </Block>
          </Yoga>
          <hr />
          <Yoga maxCol={2}>
            <Block last className={'left'}>
              <Anchor className={'full-width'} to={'/organization/request/' + _id}>
                Details
              </Anchor>
            </Block>
            <Block className={'right'}>
              <Button type="submit" primary>
                Donate
              </Button>
            </Block>
          </Yoga>
        </Card>
      </Page>
    )
  }
}
