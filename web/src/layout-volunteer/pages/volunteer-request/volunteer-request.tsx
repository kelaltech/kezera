import React, { useEffect, useState } from 'react'
import RequestCard from '../../../shared/components/request/request-card'
import axios from 'axios'
import './volunteer-request.scss'
import { Tabs } from '@material-ui/core'
import Tab from '@material-ui/core/es/Tab'
function VolunteerRequest() {
  const [value, setValue] = useState(0)
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
        setRequest([]) //todo uncomment the above
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <div>
      {requests.length !== 0 ? (
        <div>
           {requests.map(request => (
            <RequestCard {...request} />
          ))}
        </div>
      ) : (
        <div>
          <h4>No request !!</h4>
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
      setMaterial([]) //todo uncomment the above
    })
  }, [])

  return (
    <div>
      {material.length !== 0 ? (
        <div>
           {material.map(request => (
            <RequestCard {...request} />
          ))}
        </div>
      ) : (
        <div>
          <h4>No material request yet !!</h4>
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
      setFund([]) //todo uncomment the above
    })
  }, [])

  return (
    <div>
      {fund.length !== 0 ? (
        <div>
           {fund.map(request => (
            <RequestCard {...request} />
          ))}
        </div>
      ) : (
        <div>
          <h4>No Fundraising request !!</h4>
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
      setOrgan([]) //todo uncomment the above
    })
  }, [])

  return (
    <div>
      {organ.length !== 0 ? (
        <div>
           {organ.map(request => (
            <RequestCard {...request} />
          ))}
        </div>
      ) : (
        <div>
          <h4>No Organ request !!</h4>
        </div>
      )}
    </div>
  )
}

