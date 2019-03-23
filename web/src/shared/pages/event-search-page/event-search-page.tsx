import React from 'react'
import './event-search-page.scss'
import { Block, Page, Title } from 'gerami'
import EventSearchCard from '../../components/event-search-card/event-search-card'

export default function EventSearchPage(props: any) {
  return (
    <Page className={'inline-block'}>
      <Title className="center" size={'3XL'}>
        {' '}
        Search result{' '}
      </Title>
      <Block className={'inline-block'} style={{ width: '250px' }} />
      <Block className={'inline-block'}>
        <EventSearchCard />
        <EventSearchCard />
        <EventSearchCard />
        <EventSearchCard />
      </Block>
    </Page>
  )
}
