import React, { useEffect, useState } from 'react'
import { Block } from 'gerami'
import VolunteerEventCard from '../../components/volunteer-event-card/volunteer-event-card'
import ProductSlider from '../../components/volunteer-product-slider/volunteer-product-slider'

import './volunteer-event.scss'
import axios from 'axios'
import EventCard from '../../../shared/components/event-card/event-card'
function VolunteerEvents() {
  const [events, setEvents] = useState([])
  const [recentEvents, setRecentEvents] = useState([])

  useEffect(() => {
    axios
      .get('/api/event/all')
      .then(events => {
        setEvents(events.data)
      })
      .catch(e => console.log(e))

    axios
      .get('/api/event/recent') //todo change the api request
      .then(events => {
        setRecentEvents(events.data)
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <div className={'events-container'}>
      <div className={'events-around-you'}>
        <h4>Events Near you</h4>
        <Block />
        {events.map((event: any) => (
          <div>
            <Block />
            <EventCard event={event} role={'VOLUNTEER'} fetch={() => {}} />
            <Block />
          </div>
        ))}
        <Block />
      </div>
      <div className={'events-list-container'}>
        <h4>Coming up..! </h4>
        <div>
          <ProductSlider sliderWidth={events.length * 50 + '%'}>
            {events.map((event: any) => (
              <div
                style={{
                  padding: '0 13px'
                }}
              >
                <EventCard event={event} role={'VOLUNTEER'} fetch={() => {}} />
              </div>
            ))}
          </ProductSlider>
        </div>
      </div>
      <Block />
      <div className={'events-list-container'}>
        <h4>Upcoming </h4>
        {events.map((event: any) => (
          <Block>
            <EventCard event={event} role={'VOLUNTEER'} fetch={() => {}} />
          </Block>
        ))}
      </div>
    </div>
  )
}

export default VolunteerEvents
