import React, { useEffect, useState } from 'react'
import { Image, Title, Block, Yoga, Content, Anchor } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EventTabs from './event-tabs/event-tabs'
import axios from 'axios'

export default function EventDetail(props: any) {
  let [event, setEvent] = useState()

  useEffect(() => {
    axios
      .get('/api/event/' + props.match.params._id)
      .then((resp: any) => {
        setEvent(resp.data)
        console.log(props.match.params._id)
      })
      .catch(console.error)
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
                    From {event.startDate} to {event.endDate}{' '}
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
                    {event.interestedVolunteers > 0 ? event.interestedVolunteers : 0}
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
            <EventTabs />
          </Content>
        </>
      ) : (
        <Title size={'3XL'}>Event doesn't exist </Title>
      )}
    </>
  )
}
