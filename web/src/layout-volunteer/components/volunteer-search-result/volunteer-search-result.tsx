import React, { useState } from 'react'
import { Tabs } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import { Block } from 'gerami'
function VolunteerSearchResult() {
  let [value, setValue] = useState(0)
  return (
    <div>
      <div>
        <h4>Filter</h4>
      </div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor={'primary'}
        textColor={'primary'}
      >
        <Tab label={'All'} />
        <Tab label={'News'} />
        <Tab label={'Event'} />
        <Tab label={'Task'} />
        <Tab label={'Donations'} />
        <Tab label={'Organization'} />
        <Tab label={'Volunteer'} />
      </Tabs>
      {value === 0 && <Block>All</Block>}
      {value === 1 && <Block>News</Block>}
      {value === 2 && <Block>Event</Block>}
      {value === 3 && <Block>Task</Block>}
      {value === 4 && <Block>Organization</Block>}
      {value === 5 && <Block>Volunteer</Block>}
    </div>
  )
}

export default VolunteerSearchResult
