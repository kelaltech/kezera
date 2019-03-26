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
        <Tab label="Comments"> One </Tab>
        <Tab label="Likes"> Two </Tab>
        <Tab label="Interested people"> Three </Tab>
      </Tabs>
      {value === 0 && (
        <Block>
          <Comments />
        </Block>
      )}
      {value === 1 && (
        <Block>
          <Likes id={props.id} />
        </Block>
      )}
      {value === 2 && (
        <Block>
          <Interested id={props.id} />
        </Block>
      )}
    </div>
  )
}
