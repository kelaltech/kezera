import React, { useEffect, useState } from 'react'
import { Block, Yoga } from 'gerami'
import ProductSlider from '../../components/volunteer-product-slider/volunteer-product-slider'

import './volunteer-event.scss'
import axios from 'axios'
import EventCard from '../../../shared/components/event-card/event-card'
import Slider from 'react-slick'
import RichPage from '../../../shared/components/rich-page/rich-page'

const settings = {
  infinite: true,
  slidesToShow: 4,
  speed: 500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
function VolunteerEvents() {
  const [events, setEvents] = useState([])
  const [nearEvents, setNearEvents] = useState([])

  useEffect(() => {
    axios
      .get('/api/event/all')
      .then(events => {
        console.log(events.data)
        setEvents(events.data)
      })
      .catch(e => console.log(e))
    /* axios
      .get('/api/event/around/me') //todo change the api request
      .then(events => {
        setNearEvents(events.data)
      })
      .catch(e => console.log(e))*/
  }, [])
  return (
    <div className={'events-container'}>
      <RichPage title={'Events'}>
        <div className={'e-slider events-list-container'}>
          <h2>Events around you </h2>
          <Slider {...settings}>
            {events.map((event: any) => (
              <div className={'slider-event-list'}>
                <EventCard event={event} />
              </div>
            ))}
            {/*   {nearEvents.map((event: any) => (//todo uncomment when map is done
              <div className={'slider-event-list'}>
                <EventCard  event={event}  />
              </div>
            ))}*/}
          </Slider>
        </div>
        <Block />
        <div className={'events-list-container'}>
          <h2>Upcoming events... </h2>
          <Yoga maxCol={2}>
            {events.map((event: any) => (
              <Block>
                <EventCard event={event} />
              </Block>
            ))}
          </Yoga>
        </div>
      </RichPage>
    </div>
  )
}

export default VolunteerEvents
