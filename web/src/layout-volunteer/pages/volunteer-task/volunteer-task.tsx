import React from 'react'
import './volunteer-task.scss'
import { url } from 'koa-router'
import RequestCard from '../../../shared/components/request/request-card'
function VolunteerTask() {
  return (
    <div>
      {/* <h1>Volunteer Task page</h1> */}

      <div className={'search-bar-container'}>
        <div className={'search-bar-img'} />
        <div className={'search-bar-img-overlay'} />

        <div className={'search-bar'} />
      </div>

      <div className={'vol-task-container'}>
        {/*todo <RequestCard
          _id={'sdfs'}
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

export default VolunteerTask
