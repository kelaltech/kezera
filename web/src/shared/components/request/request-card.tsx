import React, { Component } from 'react'
import { Anchor, Block, Button, Card, Content, Input, Page, Yoga } from 'gerami'

import './request-card.scss'
import logo from '../../../assets/images/logo-128.png'

export interface IRequestCardProps {
  className?: string
  title: string
  startDate: Number
  endDate: Number
  description: string
  image: string
}

export default class requestCard extends Component<IRequestCardProps, {}> {
  render() {
    const { className, title, startDate, endDate, description, image } = this.props
    return (
      <Page>
        <Card size={'M'}>
          <Yoga maxCol={2}>
            <Block first className={'request-title'}>
              <h4>{title}</h4>
            </Block>
            <Block>
              <div
                className={'top request-card-image'}
                style={{ backgroundImage: `url(${image})` }}
              />
            </Block>
          </Yoga>
          <hr />
          <Block className={'request-image'}>
            <div
              className={'top donation-image'}
              style={{ backgroundImage: `url(${image})` }}
            />
          </Block>
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
              <Anchor className={'full-width'} to={'/detail'}>
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
