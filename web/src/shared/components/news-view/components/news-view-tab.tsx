import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Block } from 'gerami'
import Likes from '../../../pages/event-detail/likes/likes'
import Comments from '../../../pages/event-detail/comments/comments'

export default function NewsTabs(props: any) {
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
        <Tab label=" Likes"> Two </Tab>
      </Tabs>
      {value === 0 && (
        <Block>
          <Comments />
        </Block>
      )}
      {value === 1 && (
        <Block>
          <Likes />
        </Block>
      )}
    </div>
  )
}
