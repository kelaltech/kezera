import React, { useEffect, useState } from 'react'
import RequestCard from '../../../shared/components/request/request-card'
import axios from 'axios'
import './volunteer-request.scss'
import { Tabs } from '@material-ui/core'
import Tab from '@material-ui/core/es/Tab'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Yoga } from 'gerami'
function VolunteerRequest() {
  const { loading, t } = useLocale(['request'])
  const [value, setValue] = useState(0)
  const handleValueChange = ({}, newValue: any) => {
    setValue(newValue)
  }
  return (
    loading || (
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
            <Tab label={t`request:material`} />
            <Tab label={t`request:fundraising`} />
            <Tab label={t`request:organ`} />
          </Tabs>
          {value === 0 && <AllRequests />}
          {value === 1 && <MaterialRequest />}
          {value === 2 && <FundraisingRequest />}
          {value === 3 && <OrganRequest />}
        </div>
      </div>
    )
  )
}

export default VolunteerRequest

function AllRequests() {
  const [requests, setRequest] = useState([])

  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(request => {
        setRequest(request.data)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <div>
      {requests.length !== 0 ? (
        <Yoga maxCol={3}>
          {requests.map(request => (
            <RequestCard request={request} />
          ))}
        </Yoga>
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
    axios
      .get('/api/request/list/bytype?type=Material')
      .then((material: any) => {
        setMaterial(material.data)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <div>
      {material.length !== 0 ? (
        <Yoga maxCol={3}>
          {material.map(request => (
            <RequestCard request={request} />
          ))}
        </Yoga>
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
    axios
      .get('/api/request/list/bytype?type=Fundraising')
      .then((fund: any) => {
        setFund(fund.data)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <div>
      {fund.length !== 0 ? (
        <Yoga maxCol={3}>
          {fund.map(request => (
            <RequestCard request={request} />
          ))}
        </Yoga>
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
    axios.get('/api/request/list/bytype?type=Organ').then((organ: any) => {
      setOrgan(organ.data)
    })
  }, [])

  return (
    <div>
      {organ.length !== 0 ? (
        <Yoga maxCol={3}>
          {organ.map(request => (
            <RequestCard request={request} />
          ))}
        </Yoga>
      ) : (
        <div>
          <h4>No Organ request !!</h4>
        </div>
      )}
    </div>
  )
}
