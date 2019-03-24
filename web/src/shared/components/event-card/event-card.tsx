import React, { useState } from 'react'
import { Content, Title, Image, Flex, Button, Block } from 'gerami'
import './event-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import EventEdit from '../../../layout-organization/pages/event-edit/event-edit'

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
  let [open, setOpen] = useState(false)
  return (
    <Content className={'EventCard'}>
      <EventEdit open={open} onClose={() => setOpen(false)} event={EventDescription} />
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
        <Title className="EventTitle" size={'M'}>
          {' '}
          <Link className="EventTitle" to={'/organization/event/someId'}>
            {EventDescription.Title}
          </Link>{' '}
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
        <span className={'full-width flex'}>
          <FontAwesomeIcon icon={'smile'} size={'1x'} /> 1.2 K
        </span>
        <span className={'full-width flex'}>
          <FontAwesomeIcon icon={'heart'} size={'1x'} /> 2 K
        </span>
        <span className={'full-width flex'}>
          <Link to={'/organization/event/someId'}>
            {' '}
            <FontAwesomeIcon icon={['far', 'comment-alt']} />
          </Link>
        </span>
      </div>
      <Block last className={'ActionContainer flex'}>
        <Flex className={'full-width '} />
        <Flex className={'full-width '} />
        <span className={'full-width flex '}>
          <Button onClick={() => setOpen(true)} className={'ActionButton'}>
            <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
          </Button>
        </span>
        <span className={'full-width flex'}>
          <Button onClick={() => DeleteEvent(12)} className={'ActionButton '}>
            <FontAwesomeIcon icon={'trash'} className={'TrashIcon'} />
          </Button>
        </span>
      </Block>
    </Content>
  )
}
function DeleteEvent(id: any) {
  if (window.confirm('Are you sure you want to delete this event?')) {
    alert('deleted')
  }
}
