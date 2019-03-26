import React from 'react'
import { Yoga } from 'gerami'
import EventCard from '../../../shared/components/event-card/event-card'
import ProductSlider from '../../components/volunteer-product-slider/volunteer-product-slider'
function VolunteerEvents() {
  return (
    <div
      style={{
        margin: '0 auto',
        width: '50%'
      }}
    >
      <ProductSlider>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </ProductSlider>
      <Yoga maxCol={1}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </Yoga>
    </div>
  )
}

export default VolunteerEvents
