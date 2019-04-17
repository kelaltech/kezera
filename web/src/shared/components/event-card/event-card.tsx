import React, { useState } from 'react'
import { Content, Title, Image, Flex, Button, Block } from 'gerami'
import './event-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import EventEdit from '../../../layout-organization/pages/event-edit/event-edit'
import axios from 'axios'
import { IOrganizationEventResponse } from '../../../apiv/event.apiv'
import { useEventDispatch } from '../../../layout-organization/stores/events/events.provider'
import { DeleteEvent } from '../../../layout-organization/stores/events/events.action'
import { useAccountState } from '../../../app/stores/account/account-provider'

interface IEventProps {
  event: IOrganizationEventResponse
}

export default function EventCard(props: IEventProps) {
  let [open, setOpen] = useState(false)
  let account = useAccountState()
  let months = [
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
  let eventDispatch = useEventDispatch()

  let handleLike = function(id: any) {
    axios
      .put('/api/event/' + id + '/like')
      .then()
      .catch()
  }

  let handleInterested = function(id: any) {
    axios
      .put(`/api/event/${id}/interest`)
      .then()
      .catch()
  }

  let RemoveEvent = function(id: string) {
    if (window.confirm('Are you sure you want to delete this event?')) {
      DeleteEvent(id, eventDispatch)
    }
  }

  return (
    <Content className={'EventCard'}>
      <EventEdit open={open} onClose={() => setOpen(false)} event={props.event} />
      <div className={'EventCardImage'}>
        <div className={'BlurryImage'}>
          <Image className={'EventImage'} src={`/api/event/${props.event._id}/picture`} />
        </div>
        <div className={'EventDateContainer'}>
          {months[new Date(`${props.event.startDate}`).getMonth()]}
          <br /> {new Date(`${props.event.startDate}`).getDay()}
        </div>
      </div>
      <div className={'padding-horizontal-big'}>
        <Title className="EventTitle" size={'M'}>
          {' '}
          <Link className="EventTitle" to={`/organization/event/${props.event._id}`}>
            {props.event.title}
          </Link>{' '}
        </Title>
      </div>
      <div className={'EventDescriptionContainer'}>
        <p className={'EventDescription'}>
          {' '}
          {props.event.description.substr(0, 90)}...
          {/* //todo add id */}
          <Link to={`/organization/event/${props.event._id}`}>view</Link>{' '}
        </p>
      </div>
      <div className="EventField ">
        <FontAwesomeIcon icon={'calendar'} size={'sm'} /> &nbsp;
        <span>
          {months[new Date(`${props.event.startDate}`).getMonth()]}{' '}
          {new Date(`${props.event.startDate}`).getDay()}
          &nbsp; to &nbsp; {
            months[new Date(`${props.event.endDate}`).getMonth()]
          } &nbsp; {new Date(`${props.event.endDate}`).getDay()} &nbsp;{' '}
          {new Date(`${props.event.endDate}`).getFullYear()}
        </span>
      </div>
      <div className="EventField">
        <FontAwesomeIcon icon={'map-marker'} size={'sm'} /> &nbsp;{' '}
        <span> {props.event.location} </span>
      </div>
      <div className="EventField flex">
        <span className={'full-width flex'}>
          <Button
            onClick={() => handleInterested(props.event._id)}
            className={'ActionButton'}
          >
            <FontAwesomeIcon icon={'smile'} size={'1x'} className={'InterestedIcon'} />{' '}
            {props.event.interestedVolunteers.length == 0
              ? ''
              : props.event.interestedVolunteers.length}
          </Button>
        </span>
        <span className={'full-width flex'}>
          <Button onClick={() => handleLike(props.event._id)} className={'ActionButton'}>
            <FontAwesomeIcon icon={'heart'} size={'1x'} className="LikeIcon" />{' '}
            {props.event.likes.length == 0 ? '' : props.event.likes.length}
          </Button>
        </span>
        <span className={'full-width flex'}>
          <Link to={`/organization/event/${props.event._id}`}>
            {' '}
            <FontAwesomeIcon icon={['far', 'comment-alt']} />
          </Link>
        </span>
      </div>
      {account && account!.account!.role == 'ORGANIZATION' ? (
        <Block last className={'ActionContainer flex'}>
          <Flex className={'full-width '} />
          <Flex className={'full-width '} />
          <span className={'full-width flex '}>
            <Button onClick={() => setOpen(true)} className={'ActionButton'}>
              <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
            </Button>
          </span>
          <span className={'full-width flex'}>
            <Button
              onClick={() => RemoveEvent(props.event._id.toString())}
              className={'ActionButton '}
            >
              <FontAwesomeIcon icon={'trash'} className={'TrashIcon'} />
            </Button>
          </span>
        </Block>
      ) : (
        ''
      )}
    </Content>
  )
}
