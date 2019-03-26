import React, { useEffect, useState } from 'react'
import { Image, Title, Block, Yoga, Content, Anchor, Button } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EventTabs from './event-tabs/event-tabs'
import axios from 'axios'
import { Switch } from '@material-ui/core'

export default function EventDetail(props: any) {
  let [event, setEvent] = useState()
  let [toggle, setToggle] = useState(false)
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
  let FetchDetail = function() {
    axios
      .get('/api/event/' + props.match.params._id)
      .then((resp: any) => {
        setEvent(resp.data)
        console.log(props.match.params._id)
      })
      .catch(console.error)
  }

  let handleGoing = function() {
    axios
      .put(`/api/event/${props.match.params._id}/going`)
      .then(resp => setToggle(!toggle))
      .catch(console.error)
  }
  let isGoing = function() {
    axios
      .get(`/api/event/${props.match.params._id}/isGoing`)
      .then(resp => setToggle(resp.data.going))
      .catch()
  }
  useEffect(() => {
    FetchDetail()
    isGoing()
  }, [])

  return (
    <>
      {event ? (
        <>
          <Image
            style={{ backgroundSize: 'cover', width: '100%', height: '40vh' }}
            src={`/api/event/${event._id}/picture`}
          />
          <Content transparent size={'3XL'}>
            <Block className="">
              <Title size={'XXL'} className="inline-block">
                {event.title}
              </Title>
              <div className="inline-block" style={{ float: 'right' }}>
                <label>
                  <Title className="inline-block">
                    {' '}
                    <b> I'm going </b>{' '}
                  </Title>
                  <Switch checked={toggle} onChange={() => handleGoing()} />
                </label>
                <Anchor
                  to={`/organization/event/${props.match.params._id}/attendance/verify`}
                  button
                >
                  <FontAwesomeIcon icon={['far', 'user-circle']} />
                  &nbsp; Attendance{' '}
                </Anchor>
                &emsp;
                <Anchor
                  to={`/organization/event/${props.match.params._id}/attended`}
                  button
                >
                  <FontAwesomeIcon icon={'check-circle'} /> &nbsp;Attended{' '}
                </Anchor>
              </div>
            </Block>
            <Block>
              <p>{event.description}</p>
            </Block>
            <Yoga maxCol={2}>
              <Block>
                <label className="flex padding-small">
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={'calendar'}
                  />
                  <Content transparent>
                    {' '}
                    From {months[new Date(`${event.startDate}`).getMonth()]}{' '}
                    {new Date(`${event.startDate}`).getDay()}
                    &nbsp; to &nbsp; {
                      months[new Date(`${event.endtDate}`).getMonth()]
                    }{' '}
                    &nbsp; {new Date(`${event.endDate}`).getDay()} &nbsp;{' '}
                    {new Date(`${event.endDate}`).getFullYear()}{' '}
                  </Content>
                </label>
                <label className={'flex padding-small'}>
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={'map-marker'}
                  />
                  <Content transparent> {event.location}</Content>
                </label>
              </Block>
              <Block>
                <label className={'flex padding-small'}>
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={'smile'}
                  />
                  <Content transparent className={'full-width'}>
                    {event.interestedVolunteers.length >= 0
                      ? event.interestedVolunteers.length
                      : 0}
                    &emsp;people interested{' '}
                  </Content>
                </label>

                <label className={'flex padding-small'}>
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={['far', 'user-circle']}
                  />
                  <Content className={'full-width'} transparent>
                    {event.amountOfPeople} people invited{' '}
                  </Content>
                </label>
              </Block>
            </Yoga>
            <EventTabs id={props.match.params._id} />
          </Content>
        </>
      ) : (
        <Title size={'3XL'}>Event doesn't exist </Title>
      )}
    </>
  )
}
