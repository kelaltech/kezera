import React, { useEffect, useState } from 'react'
import RequestCard from '../../../shared/components/request/request-card'
import promo from '../../../assets/images/login/promo-1.jpg'
import { Yoga } from 'gerami'
import axios from 'axios'
import './volunteer-request.scss'
import { Tabs } from '@material-ui/core'
import Tab from '@material-ui/core/es/Tab'
function VolunteerRequest() {
  const [request, setRequest] = useState([])
  const [value, setValue] = useState(0)
  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(request => {
        setRequest(request.data)
      })
      .catch(e => console.log(e))
  }, [])

  const handleValueChange = ({}, newValue: any) => {
    setValue(newValue)
  }
  return (
    <div>
      <div className={'request-list-container'}>
        <Tabs
          value={value}
          onChange={handleValueChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
        >
          <Tab label={'All'} />
          <Tab label="Material" />
          <Tab label="Fundraising" />
          <Tab label="Organ" />
        </Tabs>
        {value === 0 && <AllRequests />}
        {value === 1 && <MaterialRequest />}
        {value === 2 && <FundraisingRequest />}
        {value === 3 && <OrganRequest />}
      </div>
    </div>
  )
}

export default VolunteerRequest

function AllRequests() {
  const [requests, setRequest] = useState([])

  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(request => {
        // setRequest(request.data)
        setRequest([])
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <div>
      {requests.length !== 0 ? (
        <div>
          {/* {requests.map(request => (
            <RequestCard {...request} />
          ))}*/}
          <h5>coming soon!!</h5>
        </div>
      ) : (
        <div>
          <h1>No request !!</h1>
        </div>
      )}
    </div>
  )
}

function MaterialRequest() {
  const [material, setMaterial] = useState([])

  useEffect(() => {
    axios.get('/api/request/material/list').then((material: any) => {
      // setMaterial(material.data)
      setMaterial([])
    })
  }, [])

  return (
    <div>
      {material.length !== 0 ? (
        <div>
          {/* {requests.map(request => (
            <RequestCard {...request} />
          ))}*/}
          <h5>Material request: coming soon!!</h5>
        </div>
      ) : (
        <div>
          <h1>No material request !!</h1>
        </div>
      )}
    </div>
  )
}

function FundraisingRequest() {
  const [fund, setFund] = useState([])

  useEffect(() => {
    axios.get('/api/request/fundraising/list').then((fund: any) => {
      // setMaterial(material.data)
      setFund([])
    })
  }, [])

  return (
    <div>
      {fund.length !== 0 ? (
        <div>
          {/* {requests.map(request => (
            <RequestCard {...request} />
          ))}*/}
          <h5>Fundraising request: coming soon!!</h5>
        </div>
      ) : (
        <div>
          <h1>No Fundraising request !!</h1>
        </div>
      )}
    </div>
  )
}

function OrganRequest() {
  const [organ, setOrgan] = useState([])

  useEffect(() => {
    axios.get('/api/request/organ/list').then((organ: any) => {
      // setMaterial(material.data)
      setOrgan([])
    })
  }, [])

  return (
    <div>
      {organ.length !== 0 ? (
        <div>
          {/* {requests.map(request => (
            <RequestCard {...request} />
          ))}*/}
          <h5>Organ request: coming soon!!</h5>
        </div>
      ) : (
        <div>
          <h1>No Organ request !!</h1>
        </div>
      )}
    </div>
  )
}

const data = [
  {
    _id: '1',
    title: 'Teaching of Disabled Children',
    description:
      'The president has promise decade, but a new' +
      '               without a big infrastructure bill, more' +
      '              tax cuts and additional deregulation, the House.',
    image: `${promo}`,
    startDate: 2019,
    endDate: 2021
  },
  {
    _id: '2',
    title: 'Teaching of Disabled Children',
    description:
      'The president has promise decade, but a new' +
      '               without a big infrastructure bill, more' +
      '              tax cuts and additional deregulation, the House.',
    image: `${promo}`,
    startDate: 2019,
    endDate: 2021
  },
  {
    _id: '3',
    title: 'Teaching of Disabled Children',
    description:
      'The president has promise decade, but a new' +
      '               without a big infrastructure bill, more' +
      '              tax cuts and additional deregulation, the House.',
    image: `${promo}`,
    startDate: 2019,
    endDate: 2021
  },
  {
    _id: '4',
    title: 'Teaching of Disabled Children',
    description:
      'The president has promise decade, but a new' +
      '               without a big infrastructure bill, more' +
      '              tax cuts and additional deregulation, the House.',
    image: promo,
    startDate: 2019,
    endDate: 2021
  }
]
