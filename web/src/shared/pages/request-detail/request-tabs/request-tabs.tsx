import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Block } from 'gerami'

import Detail from '../request-detail/request-detail'

export default function RequestTabs(props: any) {
  let [value, setValue] = useState(0)
  return (
    <div>
      <Tabs
        style={{ position: 'initial' }}
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Details"> 1 </Tab>
        <Tab label=" Reports"> 2 </Tab>
        <Tab label="Going"> 3 </Tab>
        <Tab label="Related News"> 3 </Tab>
        <Tab label="Related Events"> 3 </Tab>
        <Tab label="Contact Information"> 3 </Tab>
      </Tabs>
      {value === 0 && (
        <Block>
          <Detail />
        </Block>
      )}
      {value === 1 && (
        <Block>
          <Detail />
        </Block>
      )}
      {value === 2 && (
        <Block>
          <Detail />
        </Block>
      )}
    </div>
  )
}
