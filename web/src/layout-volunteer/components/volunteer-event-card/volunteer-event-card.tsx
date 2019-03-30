import React from 'react'
import './volunteer-event-card.scss'
import { Image } from 'gerami'
import tempImage from '../../../assets/images/news-temp.jpg'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendarCheck, faHandRock} from '@fortawesome/free-solid-svg-icons'
interface VolunteerEventprops {
  startDate: Date
  endDate: Date
  title: string
  description: string
  going: Number
  location: string
  likes: number
  comment: number
  img : string
}
const Month = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May.',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.'
]

function VolunteerEventCard(props:VolunteerEventprops) {
  const {comment,description,endDate,going,img,likes,location,startDate,title} = props
  const EventDate = {
    endDate:{
      year: new Date(endDate).getFullYear(),
      month: Month[new Date(endDate).getMonth()],
      day: new Date(endDate).getDate()
    },
    startDate: {
      year: new Date(startDate).getFullYear(),
      month: Month[new Date(startDate).getMonth()],
      day: new Date(startDate).getDate()
    }
  }
  return (
    <div>
      <div className={'vol-event-card-container'} >
        <div className={'event-card-top'}>
          <div className={'event-card-image'} style={{
            backgroundImage: `url(${img})`
          }}/>
          <div className={'event-card-date'}>
            <span>{EventDate.startDate.month}</span>
            <span>{EventDate.startDate.day}</span>
          </div>
        </div>
        <div className={'event-card-middle'}>
            <span className={'event-card-title'}>{title}</span>
          <hr/>
          <p className={'event-card-desc'}>
            {description}
          </p>
        </div>
        <div className={'event-card-bottom'}>
          <div className={'b-date'}>
            <span className={'b-date-from'}>
              <FontAwesomeIcon icon={faCalendarCheck}/>
                    From: {EventDate.startDate.day} {EventDate.startDate.month} {EventDate.startDate.year}
            </span>
            <span className={'b-date-to'}>
              To:{EventDate.endDate.day} {EventDate.endDate.month} {EventDate.endDate.year}
            </span>
          </div>
          <div className={'b-stat'}>
            <span>
              <FontAwesomeIcon icon={faHandRock}/>going 23
            </span>
            <span>
              <FontAwesomeIcon icon={faHandRock}/>interested 23
            </span>
          </div>
          <div className={'b-social'}>
            <span>Like</span>
            <span>Comment</span>
            <span>Share</span>
          </div>
        </div>
      </div>

      </div>
  )
}

export default VolunteerEventCard
