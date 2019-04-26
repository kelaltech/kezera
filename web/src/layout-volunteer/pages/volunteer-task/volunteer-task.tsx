import React, { useEffect, useState } from 'react'
import './volunteer-task.scss'
import { url } from 'koa-router'
import RequestCard from '../../../shared/components/request/request-card'
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  MenuItem
} from '@material-ui/core'

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
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCertificate,
  faChevronCircleDown,
  faChild
} from '@fortawesome/free-solid-svg-icons'
import { Card, Yoga } from 'gerami'
function VolunteerTask() {
  const [expanded, setExpanded] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios
      .get('/api/task/list')
      .then(task => {
        setTasks(task.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  return (
    <div className={'tasks-list-container'}>
      <div className={'col-bar-container'}>
        <div className={'collapse-controller'}>
          <div className={'bar-before-expand'}>
            <span className={'expand-icon'} onClick={() => setExpanded(!expanded)}>
              <FontAwesomeIcon icon={faChevronCircleDown} />
            </span>
            <div className={'header-expand-bar'}>
              <Yoga maxCol={3}>
                <MenuItem>
                  <FontAwesomeIcon icon={faChild} />
                  Children & Youth
                </MenuItem>
                <MenuItem>
                  {/*<FontAwesomeIcon icon={faChevronCircleDown} />*/}
                  Education & Literacy
                </MenuItem>
                <MenuItem>
                  {/*<FontAwesomeIcon icon={faChevronCircleDown} />*/}
                  Environment
                </MenuItem>
              </Yoga>
            </div>
          </div>

          <div className={'bar-after-expanded'}>
            <Collapse in={expanded} timeout={'auto'} unmountOnExit>
              <Yoga style={{ padding: '20px' }} maxCol={3}>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Advocacy & Human Rights
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Animal
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Art & Culture
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Community
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Computer & Technology
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Crisis Support
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Disaster Relief
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Hunger
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Faith-Based
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Employment
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Emergency & Safety
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Media & Broadcasting
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  People with Disability
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Politics
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Women
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                  Sport & Recreation
                </MenuItem>
              </Yoga>
            </Collapse>
          </div>
        </div>
      </div>

      <div className={'task-label'}>
        <h3>Upcoming tasks</h3>
      </div>
      <div className={'vol-task-container'}>
        {/*tasks.map((t:any)=>(
            <RequestCard request={...t} />
          ))*/}
      </div>
    </div>
  )
}

export default VolunteerTask
