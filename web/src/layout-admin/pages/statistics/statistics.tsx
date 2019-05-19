import React from 'react'
import './style/statistics.scss'
import { Page, Block, Yoga, Title, Content } from 'gerami'
import Donation from './donations/donations'
import News from './news/news'
import Organization from './organization/organization'
import Events from './events/events'
import Volunteer from './volunteers/volunteer'
import Summary from './summary/summary'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

interface IStatistics {}
export default function Statistics(props: IStatistics) {
  let { t } = useLocale(['admin'])
  return (
    <Block className={'full-width'}>
      <div id={'#SUMMARY'} className={''}>
        <Summary />
        <div id={'ORGANIZATION'}>
          <Title> #{t`organizations`} </Title>
          <Organization />
        </div>
        <Block id={'VOLUNTEER'}>
          <Title> #{t`volunteers`} </Title>
          <Volunteer />
        </Block>
        <Block id={'DONATION'}>
          <Title> #{t`requests`} </Title>
          <Donation />
        </Block>
        <Block id={'NEWS'}>
          <Title>
            {' '}
            #{t`news`} & {t`events`}{' '}
          </Title>
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
