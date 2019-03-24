import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Page, Yoga, Title, Block, Button, Input } from 'gerami'
import EventCard from '../../../shared/components/event-card/event-card'
import EventAdd from '../event-add/event-add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './event.scss'

export default function AccountSettings() {
  let [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const num = 12
  // todo
  return (
    <Page>
      <EventAdd open={open} onClose={() => setOpen(!open)} />
      <Block className={'inline-block'}>
        <Block className={'inline-block'}>
          <Title size={'3XL'}> Events and Activities</Title>
        </Block>
      </Block>
      <Block className={'inline-block right-search-input'}>
        <form method={'GET'} action={'/organization/event/search'}>
          <Input placeholder={'Search event...'} name={'Search'} required />
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
      <Yoga maxCol={5}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </Yoga>
    </Page>
  )
}
