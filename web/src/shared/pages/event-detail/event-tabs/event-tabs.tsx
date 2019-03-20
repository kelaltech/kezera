import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Typography } from '@material-ui/core'
import { Block } from 'gerami'
import Comments from '../comments/comments'
import Likes from '../likes/likes'
import Interested from '../interested/interested'

export default function EventTabs(props: any) {
  let [value, setValue] = useState(0)
  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Likes"> One </Tab>
        <Tab label=" Comments"> Two </Tab>
        <Tab label="Interested people"> Three </Tab>
      </Tabs>
      {value === 0 && (
        <Block>
          <Likes />
        </Block>
      )}
      {value === 1 && (
        <Block>
          <Comments />
        </Block>
      )}
      {value === 2 && (
        <Block>
          <Interested />
        </Block>
      )}
    </div>
  )
}
