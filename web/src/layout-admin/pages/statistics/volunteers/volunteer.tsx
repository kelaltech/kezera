import React, { useEffect } from 'react'
import './volunteer.scss'
import { Block, Content, Flex, Title, Yoga } from 'gerami'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { curveCardinal } from 'd3-shape'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFetch } from '../../../hooks/Fetch'
import { ProgressBar } from '../../../components/progress-bar/progress-bar'
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'October',
  'September',
  'November',
  'December'
]
const data = [
  {
    name: 'January',
    Joined_Volunteers: 0
  },
  {
    name: 'February',
    Joined_Volunteers: 0
  },
  {
    name: 'March',
    Joined_Volunteers: 4
  },
  {
    name: 'April',
    Joined_Volunteers: 0
  },
  {
    name: 'May',
    Joined_Volunteers: 0
  },
  {
    name: 'June',
    Joined_Volunteers: 0
  },
  {
    name: 'July',
    Joined_Volunteers: 0
  },
  {
    name: 'August',
    Joined_Volunteers: 0
  },
  {
    name: 'October',
    Joined_Volunteers: 0
  },
  {
    name: 'September',
    Joined_Volunteers: 0
  },
  {
    name: 'November',
    Joined_Volunteers: 0
  },
  {
    name: 'December',
    Joined_Volunteers: 0
  }
]

const cardinal = curveCardinal.tension(0.2)

export default function Volunteer() {
  let stat: any = []
  let res = useFetch('/api/admin/volunteer/joined')
  let pop = async function() {
    for (let i = 0; i < months.length; i++) {
      stat[i] = {
        name: months[i],
        Joined_Volunteers: res[i]
      }
    }
    console.log(stat)
  }
  useEffect(() => {
    pop()
  })

  return (
    <Content transparent>
      <div className={''}>{data.length > 0 ? <Chart data={stat} /> : ''}</div>
      <Content>
        <Yoga maxCol={2}>
          <Total />
          <Location />
        </Yoga>
      </Content>
      <hr />
    </Content>
  )
}

let Chart = function(props: any) {
  return (
    <AreaChart width={950} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="Joined_Volunteers"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.2}
      />
    </AreaChart>
  )
}

let Total = function() {
  let volunteers = useFetch('/api/admin/volunteers')
  return (
    <Block className={'VolunteersDesc'}>
      <Block className={'center'}>
        <Title size={'XXL'}> {volunteers} </Title>
      </Block>
      <Block className={'center'}>
        <FontAwesomeIcon size={'4x'} icon={'users'} />
      </Block>
      <Block className={'center'}>
        <Title size={'XXL'}> Volunteers </Title>
      </Block>
    </Block>
  )
}

let Location = function() {
  let locations = [
    { percent: '38%', location: 'Addis Ababa' },
    { percent: '22%', location: 'Gondar' },
    { percent: '13%', location: 'Bahir dar' },
    { percent: '8%', location: 'Welega' },
    { percent: '6%', location: 'Mekele' },
    { percent: '5%', location: 'Harar' },
    { percent: '5%', location: 'Wollo' },
    { percent: '3%', location: 'Gambella' }
  ]
  return (
    <Content transparent className={'LocationListContainer'}>
      <Title>
        {' '}
        &emsp;&emsp; <b> #Location </b>
      </Title>
      {locations.map(location => (
        <Block>
          <Title>{location.location} </Title>
          <ProgressBar
            width={location.percent}
            color={'#1075ff'}
            fontSize={'10px'}
            height={'15px'}
          />
        </Block>
      ))}
    </Content>
  )
}
