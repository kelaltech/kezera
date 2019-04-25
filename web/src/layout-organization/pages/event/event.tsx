import React, { useState } from 'react'
import { Page, Yoga, Title, Block, Button } from 'gerami'
import EventCard from '../../../shared/components/event-card/event-card'
import EventAdd from '../event-add/event-add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './event.scss'
import { useEventState } from '../../stores/events/events.provider'

export default function AccountSettings() {
  let [open, setOpen] = useState(false)
  let { events } = useEventState()

  return (
    <Page>
      <EventAdd open={open} onClose={() => setOpen(!open)} />
      <Block className={'inline-block'}>
        <Block className={'inline-block'}>
          <Title size={'3XL'}> Events and Activities</Title>
        </Block>
      </Block>
      <Block className="right right-search-input">
        <Button primary onClick={() => setOpen(true)}>
          {' '}
          <FontAwesomeIcon icon="plus" /> &nbsp;Create event{' '}
        </Button>
      </Block>
      {events && events.length > 0 ? (
        <Yoga maxCol={5}>
          {events && events.map((e: any) => <EventCard event={e} />)}
        </Yoga>
      ) : (
        <Title size={'L'}> No events found</Title>
      )}
    </Page>
  )
}
