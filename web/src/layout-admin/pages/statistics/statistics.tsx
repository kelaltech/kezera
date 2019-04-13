import React from 'react'
import './style/statistics.scss'
import { Page, Block, Yoga, Title, Content } from 'gerami'
import Donation from './donations/donations'
import News from './news/news'
import Organization from './organization/organization'
import Events from './events/events'
import Volunteer from './volunteers/volunteer'
import Summary from './summary/summary'

interface IStatistics {}
export default function Statistics(props: IStatistics) {
  return (
    <Block className={'full-width'}>
      <div id={'#SUMMARY'} className={''}>
        <Summary />
        <div id={'ORGANIZATION'}>
          <Title> #Organizations </Title>
          <Organization />
        </div>
        <Block id={'VOLUNTEER'}>
          <Title> #Volunteers </Title>
          <Volunteer />
        </Block>
        <Block id={'DONATION'}>
          <Title> #Donations </Title>
          <Donation />
        </Block>
        <Block id={'NEWS'}>
          <Title> #News & Events </Title>
          <Content>
            <Yoga maxCol={2}>
              <News />
              <Events />
            </Yoga>
          </Content>
        </Block>
      </div>
    </Block>
  )
}
