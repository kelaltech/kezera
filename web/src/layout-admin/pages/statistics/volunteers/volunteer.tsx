import React, { useEffect, useState } from 'react'
import './volunteer.scss'
import { Block, Content, Flex, Title, Yoga } from 'gerami'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { curveCardinal } from 'd3-shape'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFetch } from '../../../hooks/Fetch'
import { ProgressBar } from '../../../components/progress-bar/progress-bar'
import Axios from 'axios'
import useLocale from '../../../../shared/hooks/use-locale/use-locale'
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
  return (
    <Content transparent>
      <div className={''}>{data.length > 0 ? <Chart /> : ''}</div>
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

interface IJoinedVolunteer {
  name?: string
  Joined_Volunteers: number
}
let Chart = function(props: any) {
  let statistics: IJoinedVolunteer[] = []
  let [stat, setStat] = useState([])
  let { t } = useLocale(['admin'])

  useEffect(() => {
    Axios.get('/api/admin/volunteer/joined')
      .then(resp => {
        for (let i = 0; i < months.length; i++) {
          statistics[i] = {
            name: months[i],
            Joined_Volunteers: resp.data[i]
          }
        }
        // @ts-ignore
        setStat(statistics)
        console.log(stat)
      })
      .catch()
  }, [])
  return (
    <>
      {stat.length > 0 ? (
        <>
          <AreaChart width={950} height={400} data={stat}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={`Joined_Volunteers`}
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.2}
            />
          </AreaChart>
        </>
      ) : (
        ''
      )}
    </>
  )
}

let Total = function() {
  let { t } = useLocale(['admin'])
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
        <Title size={'XXL'}> {t`volunteers`} </Title>
      </Block>
    </Block>
  )
}

let Location = function() {
  let { t } = useLocale(['admin'])
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
        &emsp;&emsp; <b> #{t`location`} </b>
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
