import React from 'react'
import { Block } from 'gerami'
import EventCard from '../../../shared/components/event-card/event-card'
import ProductSlider from '../../components/volunteer-product-slider/volunteer-product-slider'

import './volunteer-event.scss'

function VolunteerEvents() {
  return (
    <div className={'events-container'}>
      <div className={'events-around-you'}>
        <h4>Events Near you</h4>
        <EventCard />
        <Block />
        <EventCard />
      </div>
      <div className={'events-list-container'}>
        <h4>Upcoming </h4>
        <ProductSlider>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </ProductSlider>
        <div>
          <h4>Upcoming </h4>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  )
}

export default VolunteerEvents
