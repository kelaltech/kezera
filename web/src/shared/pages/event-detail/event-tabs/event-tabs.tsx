import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Block } from 'gerami'
import Comments from '../comments/comments'
import Likes from '../likes/likes'
import Interested from '../interested/interested'
import useLocale from '../../../hooks/use-locale/use-locale'
import CommentComponent from '../../../components/comment/comment'

export default function EventTabs(props: any) {
  let [value, setValue] = useState(0)
  let { t } = useLocale(['event'])
  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={t`comments`}> One </Tab>
        <Tab label={t`likes`}> Two </Tab>
        <Tab label={t`interested people`}> Three </Tab>
      </Tabs>
      {value === 0 && (
        <Block>
          <CommentComponent _id={props.id} />
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
