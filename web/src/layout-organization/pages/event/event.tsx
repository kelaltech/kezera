import React, { useState } from 'react'
import { Page, Yoga, Title, Block, Button } from 'gerami'
import EventCard from '../../../shared/components/event-card/event-card'
import EventAdd from '../event-add/event-add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './event.scss'
import { useEventState } from '../../stores/events/events.provider'
import RichPage from '../../../shared/components/rich-page/rich-page'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

export default function AccountSettings() {
  let [open, setOpen] = useState(false)
  let { events } = useEventState()
  let [error, setError] = useState()
  const { loading, t } = useLocale(['event'])
  return (
    <RichPage
      error={error}
      title={t`events`}
      actions={[
        {
          onClick: () => setOpen(true),
          primary: true,
          children: (
            <>
              <FontAwesomeIcon icon="plus" /> &nbsp;{t`create event`}
            </>
          )
        }
      ]}
    >
      <>
        <EventAdd open={open} onClose={() => setOpen(!open)} />
        {events && events.length > 0 ? (
          <Yoga maxCol={3}>
            {events && events.map((e: any) => <EventCard event={e} />)}
          </Yoga>
        ) : (
          <Title size={'L'}> {t`no events found`}</Title>
        )}
      </>
    </RichPage>
  )
}
