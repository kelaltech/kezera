import React from 'react'
import './organization.scss'
import { Block, Content, Flex, Title, Yoga } from 'gerami'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFetch } from '../../../hooks/Fetch'
import { ProgressBar } from '../../../components/progress-bar/progress-bar'
import useLocale from '../../../../shared/hooks/use-locale/use-locale'

interface IOrganizationProps {}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Organization(props: IOrganizationProps) {
  let organization = useFetch('/api/admin/organization')
  return (
    <Block>
      <Content className={'padding-big'}>
        <Title>
          {' '}
          <FontAwesomeIcon icon={'hand-holding-heart'} /> &emsp; {organization}{' '}
        </Title>
        <Yoga maxCol={2}>
          <Types />
          <Location />
        </Yoga>
        <hr />
      </Content>
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
        {' '}
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

let Types = function() {
  let { t } = useLocale(['admin'])
  const data = [
    { name: t`non-Governmental`, value: useFetch('/api/admin/organization/ngo') },
    { name: t`private`, value: useFetch('/api/admin/organization/private') },
    { name: t`hospitals`, value: useFetch('/api/admin/organization/hospitals') },
    { name: t`governmental`, value: useFetch('/api/admin/organization/governmental') }
  ]

  return (
    <>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          startAngle={360}
          endAngle={0}
          data={data}
          outerRadius={75}
          fill="#6684d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className={'LocationsColors'}>
        <Yoga maxCol={2}>
          <span>
            <div className={'Gov'} /> {t`governmental`}
          </span>
          <span>
            <div className={'Non'} /> {t`non-governmental`}
          </span>
          <span>
            <div className={'Hos'} /> {t`hospitals`}
          </span>
          <span>
            <div className={'Pri'} /> {t`private`}
          </span>
        </Yoga>
      </div>
    </>
  )
}
