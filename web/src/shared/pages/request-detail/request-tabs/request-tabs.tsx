import React, { useEffect, useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Block, Yoga } from 'gerami'

import Report from '../request-report/request-report'
import Contact from '../request-contact/request-contact'
import Detail from '../request-detail/request-detail'
import Going from '../request-going/request-going'
import Images from '../request-images/request-images'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'

function RequestTabs({ match }: RouteComponentProps<{ _id: string }>) {
  let [value, setValue] = useState(0)

  const [request, setRequest] = useState<any>()

  useEffect(() => {
    axios
      .get(`/api/request/ + ${match.params._id}`)
      .then(res => {
        setRequest(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  return (
    <div>
      <Tabs
        style={{ position: 'initial' }}
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab label="Details"> 1 </Tab>
        <Tab label=" Reports"> 2 </Tab>
        <Tab label="Going"> 3 </Tab>
        <Tab label="Images"> 4 </Tab>
        <Tab label="Related News and Events"> 5 </Tab>
        <Tab label="Contact Information"> 6 </Tab>
      </Tabs>
      {value === 0 && (
        <Block>
          <Detail request={request} />
        </Block>
      )}
      {value === 1 && (
        <Block>
          <Report />
        </Block>
      )}
      {value === 2 && (
        <Block>
          <Going />
        </Block>
      )}
      {value === 3 && (
        <Block>
          <Images />
        </Block>
      )}
      {value === 4 && (
        <Block>
          <Contact />
        </Block>
      )}
      {value === 5 && (
        <Block>
          <Contact />
        </Block>
      )}
    </div>
  )
}
export default withRouter(RequestTabs)
