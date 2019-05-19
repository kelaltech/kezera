import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Block } from 'gerami'
import Likes from '../../../components/news-view/components/like-tab/like-tab'
import Comments from '../../../components/news-view/components/comment-tab/comment-tab'

import './news-view-tab.scss'
interface INewsTab {
  _id: string
}
export default function NewsTabs({ _id }: INewsTab) {
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
        <Tab label=" Likes" className={'like-tab-style'}>
          Two
        </Tab>
      </Tabs>
      {value === 0 && <Comments _id={_id} />}
      {value === 1 && <Likes />}
    </div>
  )
}
