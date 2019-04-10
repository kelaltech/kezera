import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventCard from '../../../../../shared/components/event-card/event-card'

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
        setEvents(events)
      })
      .catch((e: any) => console.log(e))
  }, [])
  return (
    <div>
      <h1>Events Search result</h1>
      <div>
        {events.map((e: any) => (
          <EventCard event={e} />
        ))}
      </div>
    </div>
  )
}

export default EventsSearchResult
