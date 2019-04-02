import React from 'react'
import './volunteer-task.scss'
import { url } from 'koa-router'
import RequestCard from '../../../shared/components/request/request-card'
function VolunteerTask() {
  return (
    <div>
      <div className={'search-bar-container'}>
        <div className={'search-bar-img'} />
        <div className={'search-bar-img-overlay'} />

        <div className={'search-bar'} />
      </div>

      <div className={'task-label'}>
        <h3>Upcoming tasks</h3>
      </div>
      <div className={'vol-task-container'}>
        <RequestCard request={request}/>
     {/*    <RequestCard
          title={'Help us Grow our organization'}
          startDate={1553683870882}
          endDate={1553683870882}
          description={`VolunteerMatch is the most effective way to recruit highly qualified volunteers for your nonprofit. We match you with people who are passionate about and committed to your cause, and who can help when and where you need them.
      And because volunteers are often donors as well, we make it easy for them to contribute their time and money.`}
          image={'https://source.unsplash.com/featured/1600x900?nature,mountain'}
        />*/}
      </div>
    </div>
  )
}
const request = {
  title:'Help us Grow our organization',
  startDate:1553683870882,
  endDate:1553683870882,
  description:`VolunteerMatch is the most effective way to recruit highly qualified volunteers for your nonprofit. We match you with people who are passionate about and committed to your cause, and who can help when and where you need them.
      And because volunteers are often donors as well, we make it easy for them to contribute their time and money.`,
image:'https://source.unsplash.com/featured/1600x900?nature,mountain'
}
export default VolunteerTask
