import React from 'react'
import { Image, Title, Block, Yoga, Content, Anchor } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EventTabs from './event-tabs/event-tabs'

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

export default function EventDetail() {
  return (
    <>
      <Image
        style={{ backgroundSize: 'cover', width: '100%', height: '40vh' }}
        src={EventDescription.imageSrc}
      />
      <Content transparent size={'3XL'}>
        <Block className="">
          <Title size={'XXL'} className="inline-block">
            {EventDescription.Title}
          </Title>
          <div className="inline-block" style={{ float: 'right' }}>
            <Anchor to="/organization/event/:_id/attendance/verify" button>
              <FontAwesomeIcon icon={['far', 'user-circle']} />
              &nbsp; Attendance{' '}
            </Anchor>
            &emsp;
            <Anchor to="/organization/event/:_id/attended" button>
              <FontAwesomeIcon icon={'check-circle'} /> &nbsp;Attended{' '}
            </Anchor>
          </div>
        </Block>
        <Block>
          <p>{EventDescription.Description}</p>
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
                From {EventDescription.StartDate} to {EventDescription.EndDate}{' '}
              </Content>
            </label>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'map-marker'}
              />
              <Content transparent> {EventDescription.location}</Content>
            </label>
          </Block>
          <Block>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'smile'}
              />
              <Content transparent className={'full-width'}>
                {EventDescription.Interested} peope interested{' '}
              </Content>
            </label>

            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={['far', 'user-circle']}
              />
              <Content className={'full-width'} transparent>
                {EventDescription.PeopleInvited} people invited{' '}
              </Content>
            </label>
          </Block>
        </Yoga>
        <EventTabs />
      </Content>
    </>
  )
}
