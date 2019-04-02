import React from 'react'
import './style/statistics.scss'
import { Page, Block, Yoga } from 'gerami'
import Donation from './donations/donations'
import News from './news/news'
import Organization from './organization/organization'
import Events from './events/events'
import Volunteer from './volunteers/volunteer'

interface IStatistics {}
export default function Statistics(props: IStatistics) {
  return (
    <Page>
      <Block>
        <Organization />
      </Block>
      <Block>
        <Yoga maxCol={2}>
          <Events />
          <News />
        </Yoga>
      </Block>
      <Block>
        <Donation />
      </Block>
      <Block>
        <Volunteer />
      </Block>
    </Page>
  )
}
