import React, { useEffect, useState } from 'react'
import './summary.scss'
import { Content, Yoga, Block, Title, Flex } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFetch } from '../../../hooks/Fetch'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Axios from 'axios'

interface IconProps {
  icon: IconProp
}

let icons: IconProps[] = [
  { icon: 'hand-holding-heart' },
  { icon: 'users' },
  { icon: 'newspaper' },
  { icon: 'calendar' },
  { icon: 'tshirt' },
  { icon: 'money-bill' },
  { icon: 'heart' },
  { icon: 'tasks' }
]

export default function Summary() {
  let organ = useFetch('/api/admin/donations/organ')
  let funds = useFetch('/api/admin/donations/fundraising')
  let material = useFetch('/api/admin/donations/material')
  let task = useFetch('/api/admin/donations/task')
  let organization = useFetch('/api/admin/organization')
  let volunteers = useFetch('/api/admin/volunteers')
  let news = useFetch('/api/admin/news')
  let events = useFetch('/api/admin/events')
  let text = [
    'Organizations',
    'Volunteers',
    'News',
    'Events',
    'Material requested',
    'Funds requested',
    'Organ requested',
    'Task requested'
  ]
  let stateValues = [organization, volunteers, news, events, material, funds, organ, task]

  return (
    <Block className={''}>
      <span className={'Dashoard'}> #Dashboard </span>
      <Yoga maxCol={4}>
        {stateValues.map((val, index: number) => (
          <Content className={'SummaryCard'}>
            <div className="center">
              <span className={'CardText'}> Total {text[index]} </span>
            </div>
            <hr />
            <Block className={'center flex'}>
              <Flex className={'full-width middle padding-top-normal'}>
                <FontAwesomeIcon icon={icons[index].icon} size={'2x'} /> &emsp;
              </Flex>
              <Flex className={'full-width middle'}>
                <Title size="XL" className="num">
                  {' '}
                  {val}{' '}
                </Title>
              </Flex>
            </Block>
          </Content>
        ))}
      </Yoga>
      <hr />
    </Block>
  )
}
