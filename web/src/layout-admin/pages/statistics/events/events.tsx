import React from 'react'
import './events.scss'
import { Block, Content, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PieChart, Pie, Cell } from 'recharts'
import { useFetch } from '../../../hooks/Fetch'

const COLORS = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042']

export default function Events() {
  let news = useFetch('/api/admin/events')
  const data = [
    { name: 'Interested', value: useFetch('/api/admin/events/interested') },
    { name: 'Attended', value: useFetch('/api/admin/events/attended') },
    { name: 'Going', value: useFetch('/api/admin/events/going') }
  ]

  let comments = useFetch('/api/admin/events/comments')
  return (
    <Content transparent>
      <span className={'Events-Title'}>
        {' '}
        <FontAwesomeIcon icon={'calendar'} /> Events{' '}
      </span>
      <Block className={'center'}>
        <PieChart width={400} height={270}>
          <Pie
            data={data}
            innerRadius={120}
            outerRadius={135}
            cx={250}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <Legend />
      </Block>
    </Content>
  )
}

let Legend = function() {
  return (
    <Block>
      <Yoga maxCol={3}>
        <span>
          <div className={'Attend'} /> Attended
        </span>
        <span>
          <div className={'Going'} /> Going
        </span>
        <span>
          <div className={'Interest'} /> Interested
        </span>
      </Yoga>
    </Block>
  )
}

let Total = function(props: { total: any }) {
  return (
    <Block className={'TotalEvents'}>
      <Block className={'center'}>
        <Title size={'3XL'}>{props.total}</Title>
      </Block>
      <Block className={'center'}>
        <FontAwesomeIcon icon={'calendar'} size={'3x'} className={''} />
      </Block>
    </Block>
  )
}
