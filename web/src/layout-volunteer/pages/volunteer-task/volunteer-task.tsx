import React, { useEffect, useState } from 'react'
import './volunteer-task.scss'
import { url } from 'koa-router'
import RequestCard from '../../../shared/components/request/request-card'
import { Checkbox, Collapse, FormControlLabel } from '@material-ui/core'

const taskTypes = [
  'Advocacy & Human Rights ',
  'Animal',
  'Art & Culture',
  'Children & Youth',
  'Community',
  'Computer & Technology',
  'Crisis Support',
  'Disaster Relief',
  'Education & Literacy',
  'Hunger',
  'Faith-Based',
  'Environment',
  'Employment',
  'Emergency & Safety',
  'Media & Broadcasting',
  'People with Disability',
  'Politics',
  'Women',
  'Sport & Recreation'
]
import axios from 'axios';
function VolunteerTask() {
  const [expanded, setExpanded] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    axios
      .get('/api/task/list')
      .then((task)=>{
        setTasks(task.data)
      })
      .catch(e=>{console.log(e)})
  },[])
  return (
    <div>
      <div className={'col-bar-container'}>
        <span onClick={()=>setExpanded(!expanded)}>
          expand
        </span>
       {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <FormControlLabel
            control={
              <Checkbox
                // checked={true}
                value="checkedG"
              />
            }
            label="Children"
          />
        </Collapse>*/}
      </div>

      <div className={'task-label'}>
        <h3>Upcoming tasks</h3>
      </div>
      <div className={'vol-task-container'}>
        {
          /*tasks.map((t:any)=>(
            <RequestCard request={...t} />
          ))*/
        }
      </div>
    </div>
  )
}
const request = {
  title: 'Help us Grow our organization',
  startDate: 1553683870882,
  endDate: 1553683870882,
  description: `VolunteerMatch is the most effective way to recruit highly qualified volunteers for your nonprofit. We match you with people who are passionate about and committed to your cause, and who can help when and where you need them.
      And because volunteers are often donors as well, we make it easy for them to contribute their time and money.`,
  image: 'https://source.unsplash.com/featured/1600x900?nature,mountain'
}
export default VolunteerTask
