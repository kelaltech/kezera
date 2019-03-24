import React from 'react'
import './event-search-card.scss'
import { Content, Flex, Yoga, Image, Title, Block } from 'gerami'
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

export default function EventSearchCard(props: any) {
  return (
    <Content className={'EventSearchCard '} transparent>
      <Yoga maxCol={2} className={'flex '}>
        <Flex className={'full-width'}>
          <Image
            src={EventDescription.imageSrc}
            className={'EventSearchCardImage full-width'}
          />
        </Flex>
        <Flex className={'full-width'}>
          <Block>
            <span className={'Search-Title'}> {EventDescription.Title} </span>
          </Block>
          <Block className={'left eventDate'}>
            <span>Muday association</span>&emsp;
            <i>2/2/2018</i>
          </Block>
          <p className={'Search-Description'}>
            {EventDescription.Description.substr(0, 100)}...
          </p>
          <Block className={'right'}>
            <Link to={'/organization/event/someId'}>View more</Link>
          </Block>
        </Flex>
      </Yoga>
    </Content>
  )
}
