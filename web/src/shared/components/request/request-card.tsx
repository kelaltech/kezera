import React, { Component } from 'react'
import { Anchor, Block, Button, Card, Content, Input, Page, Yoga } from 'gerami'

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
        <Block>
          <Card size={'M'} className={'top'}>
            <Block first className={'request-title'}>
              <h1>{title}</h1>
            </Block>
            <hr />
            <Block className={'request-image'}>
              <div
                className={'top donation-image'}
                style={{ backgroundImage: `url(${image})` }}
              />
            </Block>
            <Block className={'request-description'}>{description}</Block>

            <Yoga maxCol={3}>
              <Block>
                <label>{startDate}</label>
              </Block>
              <label>to</label>
              <Block>
                <label>{endDate}</label>
              </Block>
            </Yoga>

            <br />
            <Block className={'right'}>
              <Button type="submit" primary>
                Register
              </Button>
            </Block>
            <Block last className={'right'}>
              <Anchor className={'full-width'} to="/login">
                Login instead
              </Anchor>
            </Block>
          </Card>
        </Block>
      </Page>
    )
  }
}
