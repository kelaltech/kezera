import React, { useState, useEffect } from 'react'
import './event-search-page.scss'
import { Block, Page, Title } from 'gerami'
import EventSearchCard from '../../components/event-search-card/event-search-card'
import axios from 'axios'
export default function EventSearchPage(props: any) {
  let [event, setEvent] = useState([])
  useEffect(() => {
    axios
      .get('/api/event/search?term' + props.match.parmas.term)
      .then(resp => setEvent(resp.data))
  })
  return (
    <Page className={'inline-block'}>
      <Title className="center" size={'3XL'}>
        {' '}
        Search result{' '}
      </Title>
      <Block className={'inline-block'} style={{ width: '250px' }} />
      <Block className={'inline-block'}>
        {event.map(e => (
          <EventSearchCard event={e} />
        ))}
      </Block>
    </Page>
  )
}
