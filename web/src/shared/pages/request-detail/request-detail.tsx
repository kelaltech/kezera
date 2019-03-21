import React from 'react'
import { Image, Title, Block, Yoga, Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequestTabs from './request-tabs/request-tabs'

const RequestInfo = {
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

export default function RequestDetail() {
  return (
    <>
      <Image
        style={{ backgroundSize: 'cover', width: '100%', height: '40vh' }}
        src={RequestInfo.imageSrc}
      />
      <Content transparent size={'3XL'}>
        <RequestTabs />
        <Block className="">
          <Title size={'XXL'}>{RequestInfo.Title}</Title>
        </Block>
        <Block>
          <p>{RequestInfo.Description}</p>
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
                From {RequestInfo.StartDate} to {RequestInfo.EndDate}{' '}
              </Content>
            </label>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'map-marker'}
              />
              <Content transparent> {RequestInfo.location}</Content>
            </label>
          </Block>
          <Block>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'smile'}
              />
              <Content transparent className={'full-width'}>
                {RequestInfo.Interested} peope interested{' '}
              </Content>
            </label>

            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={['far', 'user-circle']}
              />
              <Content className={'full-width'} transparent>
                {RequestInfo.PeopleInvited} people invited{' '}
              </Content>
            </label>
          </Block>
        </Yoga>
      </Content>
    </>
  )
}
