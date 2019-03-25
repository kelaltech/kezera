import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Page, Yoga, Title, Block, Button, Input } from 'gerami'
import EventCard from '../../../shared/components/event-card/event-card'
import EventAdd from '../event-add/event-add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './event.scss'
import axios from 'axios'

export default function AccountSettings() {
  let [open, setOpen] = useState(false)
  let [event, setEvent] = useState([])
  const { t } = useTranslation()
  const num = 12
  // todo

  useEffect(() => {
    axios
      .get('/api/event/all')
      .then((response: any) => {
        setEvent(response.data)
      })
      .catch(console.error)
  }, [event])

  return (
    <Page>
      <EventAdd open={open} onClose={() => setOpen(!open)} />
      <Block className={'inline-block'}>
        <Block className={'inline-block'}>
          <Title size={'3XL'}> Events and Activities</Title>
        </Block>
      </Block>
      <Block className={'inline-block right-search-input'}>
        <form action={'/organization/event/search'} method={'GET'}>
          <Input type="search" name={'term'} placeholder={'Search event...'} required />
          <Button className={'SearchButton'} type={'submit'}>
            <FontAwesomeIcon icon={'search'} className={'SearchIcon'} />
          </Button>
        </form>
      </Block>
      <Block className="right">
        <Button primary onClick={() => setOpen(true)}>
          {' '}
          <FontAwesomeIcon icon="plus" /> &nbsp;Create event{' '}
        </Button>
      </Block>
      {event.length > 0 ? (
        <Yoga maxCol={5}>
          {event.map(e => (
            <EventCard event={e} />
          ))}
        </Yoga>
      ) : (
        <Title size={'3XL'}> No events found</Title>
      )}
    </Page>
  )
}
