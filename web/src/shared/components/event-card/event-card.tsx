import React, { useState } from 'react'
import { Content, Title, Image, Flex, Button, Block, Anchor } from 'gerami'
import './event-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import EventEdit from '../../../layout-organization/pages/event-edit/event-edit'
import { IOrganizationEventResponse } from '../../../apiv/event.apiv'
import { useEventDispatch } from '../../../layout-organization/stores/events/events.provider'
import {
  DeleteEvent,
  HandleInterested,
  HandleLike
} from '../../../layout-organization/stores/events/events.action'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../hooks/use-locale/use-locale'
import { LngLat } from 'mapbox-gl'

interface IEventProps {
  event: IOrganizationEventResponse
}

export default function EventCard(props: IEventProps) {
  let [open, setOpen] = useState(false)
  let { account } = useAccountState()
  const { loading, t } = useLocale(['event'])
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
  const parseGeo = (lngLat: LngLat): string => {
    const factor = 100000
    return `${Math.round(lngLat.lat * factor) / factor}° ${
      lngLat.lat > 0 ? 'N' : 'S'
    }, ${Math.round(lngLat.lng * factor) / factor}°  ${lngLat.lng > 0 ? 'E' : 'W'}`
  }
  let eventDispatch = useEventDispatch()

  let RemoveEvent = function(id: string) {
    if (window.confirm('Are you sure you want to delete this event?')) {
      DeleteEvent(id, eventDispatch)
    }
  }

  return (
    <Content className={'EventCard'}>
      {account && account!.role == 'ORGANIZATION' ? (
        <>
          <EventEdit open={open} onClose={() => setOpen(false)} event={props.event} />
        </>
      ) : (
        ''
      )}
      <div className={'EventCardImage'}>
        <div className={'BlurryImage'}>
          <Image className={'EventImage'} src={`/api/event/${props.event._id}/picture`} />
        </div>
        <div className={'EventDateContainer'}>
          {months[new Date(`${props.event.startDate}`).getMonth()]}
          <br /> {new Date(`${props.event.startDate}`).getDate()}
        </div>
      </div>
      <div className={'padding-horizontal-big'}>
        <Title className="EventTitle" size={'M'}>
          {' '}
          <Link className="EventTitle" to={`/event/${props.event._id}`}>
            {props.event.title}
            {new Date(props.event.endDate).getTime() < Date.now() && (
              <span className={'bold font-S'} style={{ color: 'rgb(220,70,30)' }}>
                {' '}
                (PASSED)
              </span>
            )}
          </Link>{' '}
        </Title>
      </div>
      <div className={'EventDescriptionContainer'}>
        <p className={'EventDescription'}>
          {' '}
          {props.event.description.substr(0, 90)}...
          {/* //todo add id */}
          <Link to={`/event/${props.event._id}`}>{t`view more`}</Link>{' '}
        </p>
      </div>
      <div className="EventField ">
        <FontAwesomeIcon icon={'calendar'} size={'sm'} /> &nbsp;
        <span>
          {months[new Date(`${props.event.startDate}`).getMonth()]}{' '}
          {new Date(`${props.event.startDate}`).getDate()}
          &nbsp; to &nbsp; {
            months[new Date(`${props.event.endDate}`).getMonth()]
          } &nbsp; {new Date(`${props.event.endDate}`).getDate()} &nbsp;{' '}
          {new Date(`${props.event.endDate}`).getFullYear()}
        </span>
      </div>
      <div className="EventField">
        <FontAwesomeIcon icon={'map-marker'} size={'sm'} /> &nbsp;{' '}
        <span>
          <Anchor
            href={`https://www.google.com/maps?q=${props.event.location.geo.coordinates[1]},${props.event.location.geo.coordinates[0]}`}
            target={'_blank'}
            rel={'noopener'}
          >
            {props.event.location!.address
              ? props.event.location!.address
              : props.event.location!.geo.coordinates}
          </Anchor>
        </span>
      </div>
      <div className="EventField flex">
        <span className={'full-width flex'}>
          <Button
            onClick={() => HandleInterested(props.event._id.toString(), eventDispatch)}
            className={'ActionButton HoverState'}
          >
            <FontAwesomeIcon
              icon={'smile'}
              size={'1x'}
              className={'InterestedIcon'}
              title={'Interested'}
            />{' '}
            {props.event.interestedVolunteers.length == 0
              ? ''
              : props.event.interestedVolunteers.length}
          </Button>
        </span>
        <span className={'full-width flex'}>
          <Button
            onClick={() => HandleLike(props.event._id.toString(), eventDispatch)}
            className={'ActionButton HoverState'}
          >
            <FontAwesomeIcon
              icon={'heart'}
              size={'1x'}
              className="LikeIcon"
              title={'Like event'}
            />{' '}
            {props.event.likes.length == 0 ? '' : props.event.likes.length}
          </Button>
        </span>
        <span className={'full-width flex'}>
          <Link to={`/event/${props.event._id}`} className={'HoverState'}>
            {' '}
            <FontAwesomeIcon icon={['far', 'comment-alt']} />
          </Link>
        </span>
      </div>
      {account &&
      account!.role == 'ORGANIZATION' &&
      new Date(props.event.endDate).getTime() >= Date.now() ? (
        <Block last className={'ActionContainer flex'}>
          <Flex className={'full-width '} />
          <Flex className={'full-width '} />
          <span className={'full-width flex '}>
            <Button onClick={() => setOpen(true)} className={'ActionButton HoverState'}>
              <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
            </Button>
          </span>
          <span className={'full-width flex'}>
            <Button
              onClick={() => RemoveEvent(props.event._id.toString())}
              className={'ActionButton HoverState'}
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
