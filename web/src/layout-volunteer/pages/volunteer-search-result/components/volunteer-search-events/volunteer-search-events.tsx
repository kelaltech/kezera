import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventCard from '../../../../../shared/components/event-card/event-card'
import { Yoga } from 'gerami'

interface IEventResult {
  term?: string
}
function EventsSearchResult(props: IEventResult) {
  const { term } = props
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios
      .get('/api/event/search?term=' + term)
      .then((events: any) => {
        setEvents(events.data)
      })
      .catch((e: any) => console.log(e))
  }, [term])
  return events.length === 0 ? (
    <div className={'fg-blackish'}>can't find events with the term {term}</div>
  ) : (
    <div>
      <Yoga maxCol={2}>
        {events.map((e: any) => (
          <EventCard event={e} />
        ))}
      </Yoga>
    </div>
  )
}

export default EventsSearchResult
