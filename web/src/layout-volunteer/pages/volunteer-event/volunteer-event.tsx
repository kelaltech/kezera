import React, { useEffect, useState } from 'react'
import { Block } from 'gerami'
import  VolunteerEventCard from '../../components/volunteer-event-card/volunteer-event-card'
import ProductSlider from '../../components/volunteer-product-slider/volunteer-product-slider'

import './volunteer-event.scss'
import axios from 'axios'
function VolunteerEvents() {
  const [events, setEvents] = useState([])

  useEffect(()=>{
    axios
      .get('/api/event/all')
      .then((events)=>{
        setEvents(events.data)
      })
      .catch(e=>console.log(e))
  },[])
  return (
    <div className={'events-container'}>
      <div className={'events-around-you'}>
        <h4>Events Near you</h4>
        <Block />
        {events.map((event:any)=>(
          <VolunteerEventCard
            description={event.description}
            title={event.title}
            comment={event.comment}
            endDate={event.endDate}
            going={event.goingVolunteers}
            img={`/api/event/${event._id}/picture`}
            likes={event.likes.length}
            location={event.location}
            startDate={event.startDate}
          />
        ))}
      </div>
      <div className={'events-list-container'}>
        <h4>Upcoming </h4>
        {events.map((event:any)=>(
          <VolunteerEventCard
            description={event.description}
            title={event.title}
            comment={event.comment}
            endDate={event.endDate}
            going={event.goingVolunteers}
            img={`/api/event/${event._id}/picture`}
            likes={event.likes.length}
            location={event.location}
            startDate={event.startDate}
          />
        ))}
      </div>
    </div>
  )
}

export default VolunteerEvents
