import React from 'react'
import './timeline.scss'
import { Block } from 'gerami'
import { useFetch } from '../../../layout-admin/hooks/Fetch'
import { IActivityResponse } from '../../../../../api/modules/activity/activity.apiv'

interface IActivity {
  year: string
  month: string
  activity: string
}

interface ITimelineProps {
  user?: 'VOLUNTEER' | 'ORGANIZATION' | 'VERIFIER'
  title: string
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

const data = [
  {
    year: '2015',
    description:
      'here goes some description about the timeline.here goes some description about the timeline.' +
      'here goes some description about the timeline.here goes some description about the timeline.' +
      'here goes some description about the timeline.here goes some description about the timeline.',
    month: 'December'
  },
  {
    year: '2016',
    description:
      'here goes some description about the timeline.here goes some description about the timeline.',
    month: 'December'
  },
  {
    year: '2017',
    description: 'Here is the description.here goes some description about the timeline.',
    month: 'December'
  },
  {
    year: '2018',
    description: 'Here is the description.here goes some description about the timeline.',
    month: 'December'
  }
]

export function Timeline(props: any) {
  let activity = useFetch('/api/activity/5c965ddae024d54218e9defe/list')
  return (
    <div className="timelineContainer">
      <div className="timelineHeader">
        <h1> Timeline </h1>
      </div>
      <div className="timelineItem">
        <div id="timeline">
          <div>
            {activity.map((data: IActivityResponse) => (
              <section className="timelineYear">
                <h3>{new Date(data._at).getUTCFullYear()}</h3>
                <section>
                  <ul>
                    <li>{data.data}</li>
                  </ul>
                  <Block />
                  <h4>
                    {' '}
                    {months[new Date(data._at).getMonth()]}&nbsp;
                    {new Date(data._at).getDate()}
                  </h4>
                </section>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
