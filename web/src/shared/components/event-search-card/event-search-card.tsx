import React from 'react'
import './event-search-card.scss'
import { Content, Flex, Yoga, Image, Title, Block } from 'gerami'
import { Link } from 'react-router-dom'

export default function EventSearchCard(props: any) {
  return (
    <Content className={'EventSearchCard '} transparent>
      <Yoga maxCol={2} className={'flex '}>
        <Flex className={'full-width'}>
          <Image
            src={`/api/event/${props.event._id}/picture`}
            className={'EventSearchCardImage full-width'}
          />
        </Flex>
        <Flex className={'full-width'}>
          <Block>
            <span className={'Search-Title'}> {props.event.title} </span>
          </Block>
          <Block className={'left eventDate'}>
            <span>Muday association</span>&emsp;
            <i>{props.event._at}</i>
          </Block>
          <p className={'Search-Description'}>
            {props.event.description.substr(0, 100)}...
          </p>
          <Block className={'right'}>
            <Link to={`/organization/event/${props.event._id}`}>View more</Link>
          </Block>
        </Flex>
      </Yoga>
    </Content>
  )
}
