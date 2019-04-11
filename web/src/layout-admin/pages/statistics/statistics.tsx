import React from 'react'
import './style/statistics.scss'
import { Page, Block, Yoga, Title } from 'gerami'
import Donation from './donations/donations'
import News from './news/news'
import Organization from './organization/organization'
import Events from './events/events'
import Volunteer from './volunteers/volunteer'
import Summary from './summary/summary'

interface IStatistics {}
export default function Statistics(props: IStatistics) {
  return (
    <Page>
      <div className={''}>
        <Summary />
        <Block className={'center'}>
          <Title size="3XL"> Organizations </Title>
          <Organization />
        </Block>
        <Block>
          <Title size="3XL"> Volunteers </Title>
          <Volunteer />
        </Block>
        <Block>
          <Title size="3XL"> Donations </Title>
          <Donation />
        </Block>
        <Block>
          <Title size="3XL"> News & Events </Title>
          <Yoga maxCol={2}>
            <News />
            <Events />
          </Yoga>
        </Block>
      </div>
    </Page>
  )
}
