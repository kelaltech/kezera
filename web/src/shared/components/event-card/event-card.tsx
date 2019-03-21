import React from 'react'
import { Content, Title, Image } from 'gerami'
import './event-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
const EventDescription = {
  imageSrc: 'https://d2g8igdw686xgo.cloudfront.net/31848636_1533268089320317_r.jpeg',
  Title: 'Some Title',
  Description:
    'Here goes some description. Here goes some description. Here goes some description.' +
    'Here goes some description.Here goes some description.Here goes some description.Here goes some description.Here goes some description.Here goes some description.Here goes some description.Here goes some description.Here goes some description.Here goes some description. ',
  StartDate: '2/12/2018',
  EndDate: '28/12/2018',
  location: 'Kotebe, Addis Ababa',
  PeopleInvited: '25842',
  Interested: '2221'
}
export default function EventCard() {
  return (
    <Content className={'EventCard'}>
      <div className={'EventCardImage'}>
        <div className={'BlurryImage'}>
          <Image className={'EventImage'} src={EventDescription.imageSrc} />
        </div>
        <div className={'EventDateContainer'}>
          Dec.
          <br /> 15
        </div>
      </div>
      <div className={'padding-horizontal-big'}>
        <Title size={'M'}>
          {' '}
          <b>{EventDescription.Title}</b>{' '}
        </Title>
      </div>
      <div className={'EventDescriptionContainer'}>
        <p className={'EventDescription'}>
          {' '}
          {EventDescription.Description.substr(0, 90)}...
          {/* //todo add id */}
          <Link to="/organization/event/someId">view</Link>{' '}
        </p>
      </div>
      <div className="EventField ">
        <FontAwesomeIcon icon={'calendar'} size={'sm'} /> &nbsp; <span> 2/12/2019 </span>
      </div>
      <div className="EventField">
        <FontAwesomeIcon icon={'map-marker'} size={'sm'} /> &nbsp;{' '}
        <span> Kotebe,Addis Ababa </span>
      </div>
      <div className="EventField flex">
        <span className={'full-width'}>
          <FontAwesomeIcon icon={'smile'} size={'1x'} /> 1.2 K &emsp;&emsp;
        </span>
        <span className={'full-width'}>
          <FontAwesomeIcon icon={'heart'} size={'1x'} /> 2 K &emsp;&emsp;
        </span>
        <span className={'full-width'}>
          <FontAwesomeIcon icon={'comment'} size={'1x'} /> &emsp;&emsp;
        </span>
      </div>
    </Content>
  )
}
