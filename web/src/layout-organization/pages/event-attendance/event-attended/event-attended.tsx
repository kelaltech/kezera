import React from 'react'
import { Yoga } from 'gerami'
import EventAttendedCard from '../../../../shared/components/event-attended-card/event-attended-card'

export default function EventAttended(props: any) {
  return (
    <Yoga maxCol={6}>
      <EventAttendedCard />
      <EventAttendedCard />
      <EventAttendedCard />
      <EventAttendedCard />
      <EventAttendedCard />
    </Yoga>
  )
}
