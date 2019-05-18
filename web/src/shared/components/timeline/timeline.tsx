import React, { useEffect, useState } from 'react'
import './timeline.scss'
import { Anchor, Block, Title } from 'gerami'
import { useFetch } from '../../../layout-admin/hooks/Fetch'
import { IActivityResponse } from '../../../../../api/modules/activity/activity.apiv'
import Axios from 'axios'
import useLocale from '../../hooks/use-locale/use-locale'

interface IActivity {
  year: string
  month: string
  activity: string
}

interface ITimelineProps {
  user?: 'VOLUNTEER' | 'ORGANIZATION' | 'VERIFIER'
  title: string
  _id: string
}
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'October',
  'September',
  'November',
  'December'
]

function getDate(d: any) {
  var now = new Date()
  var date: any = new Date('' + d)
  var output = ''
  var difference = 0
  if (date.getFullYear() === now.getFullYear()) {
    if (date.getMonth() === now.getMonth()) {
      if (date.getDay() === now.getDay()) {
        if (date.getHours() === now.getHours()) {
          if (date.getMinutes() === now.getMinutes()) {
            output = now.getSeconds() + ' seconds ago'
          } else {
            difference = date.getMinutes() - now.getMinutes()
            output = (difference < 1 ? -1 * difference : difference) + ' minutes ago'
          }
        } else {
          difference = date.getHours() - now.getHours()
          output = (difference < 1 ? -1 * difference : difference) + ' hours ago'
        }
      } else {
        difference = date.getDate() - now.getDate()
        output = (difference < 1 ? -1 * difference : difference) + ' days ago'
      }
    } else {
      difference = date.getMonth() - now.getMonth()
      output = (difference < 1 ? -1 * difference : difference) + ' month ago'
    }
  } else {
    difference = date.getFullYear() - now.getFullYear()
    output = (difference < 1 ? -1 * difference : difference) + ' years ago'
  }
  console.log(output)
  return output
}

export function Timeline(props: ITimelineProps) {
  let { t } = useLocale(['activity'])
  let [activity, setActivity] = useState([])
  let fetchActivity = function() {
    Axios.get(`/api/activity/${props._id}/list`)
      .then(resp => {
        setActivity(resp.data)
      })
      .catch(console.error)
  }
  useEffect(() => {
    fetchActivity()
  }, [])
  return (
    <div className="timelineContainer">
      <div className="timelineHeader">
        <h1> {props.title} </h1>
      </div>
      {activity.length > 0 ? (
        <div className="timelineItem">
          <div id="timeline">
            <div>
              {activity.map((data: IActivityResponse) => (
                <section className="timelineYear">
                  <h3>{new Date(data._at).getUTCFullYear()}</h3>
                  <section>
                    <ul>
                      <li className={'list-decoration-none'}>{data.data}</li>
                      <li className={'list-decoration-none'}>
                        <Anchor to={data.link}> view </Anchor>
                      </li>
                    </ul>
                    <Block />
                    <h4> {getDate(data._at)}</h4>
                  </section>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Block className={'center padding-normal'}>
          <Block />
          <Title size={'L'}> {t`no activities done so far`} </Title>
        </Block>
      )}
    </div>
  )
}
