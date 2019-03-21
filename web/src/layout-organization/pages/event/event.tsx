import React from 'react'
import { Page, Yoga, Title, Block } from 'gerami'
import EventCard from '../../../shared/components/event-card/event-card'
import EventVerification from '../event-verification/event-verification'

export default function AccountSettings() {
  const num = 12
  // todo
  return (
    <Page>
      {/* <Block className={"center"}>
          <Title size={"3XL"}> Events and Activities</Title>
        </Block>
        <Yoga maxCol={5}>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
        </Yoga> */}
      <EventVerification />
    </Page>
  )
}
