import React, { useEffect, useState } from 'react'
import './volunteer-task.scss'
import { url } from 'koa-router'
import RequestCard from '../../../shared/components/request/request-card'
import { Collapse, MenuItem } from '@material-ui/core'

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
import { faChevronCircleDown, faChild } from '@fortawesome/free-solid-svg-icons'
import { Yoga } from 'gerami'
import RichPage from '../../../shared/components/rich-page/rich-page'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
function VolunteerTask() {
  const { loading, t } = useLocale(['task'])
  const [expanded, setExpanded] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(task => {
        setTasks(task.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const handleTaskFilter = (name: string) => () => {
    axios
      .get(`/api/task/search?term=${name}`)
      .then(task => {
        setTasks(task.data)
      })
      .catch(e => console.log(e))
  }
  return (
    loading || (
      <RichPage title={t`task:title`}>
        <div className={'tasks-list-container'}>
          <div className={'col-bar-container'}>
            <div className={'collapse-controller'}>
              <div className={'bar-before-expand'}>
                <span className={'expand-icon'} onClick={() => setExpanded(!expanded)}>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                </span>
                <div className={'header-expand-bar'}>
                  <Yoga maxCol={3}>
                    <MenuItem onClick={handleTaskFilter('children')}>
                      <FontAwesomeIcon icon={faChild} />
                      Children & Youth
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('education')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Education & Literacy
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('environment')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Environment
                    </MenuItem>
                  </Yoga>
                </div>
              </div>

              <div className={'bar-after-expanded'}>
                <Collapse in={expanded} timeout={'auto'} unmountOnExit>
                  <Yoga style={{ padding: '20px' }} maxCol={3}>
                    <MenuItem onClick={handleTaskFilter('Advocacy & Human Rights')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Advocacy & Human Rights
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Animal')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Animal
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Art & Culture')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Art & Culture
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Community')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Community
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Computer & Technology')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Computer & Technology
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Crisis Support')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Crisis Support
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Disaster Relief')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Disaster Relief
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Hunger')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Hunger
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Faith-Based')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Faith-Based
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Employment')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Employment
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Emergency & Safety')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Emergency & Safety
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Media & Broadcasting')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Media & Broadcasting
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('People with Disability')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      People with Disability
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Politics')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Politics
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Women')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Women
                    </MenuItem>
                    <MenuItem onClick={handleTaskFilter('Sport & Recreation')}>
                      <FontAwesomeIcon icon={faChevronCircleDown} />
                      Sport & Recreation
                    </MenuItem>
                  </Yoga>
                </Collapse>
              </div>
            </div>
          </div>

          <div className={'task-label'}>
            <h3>{t`task:upcoming-task`}</h3>
          </div>
          <Yoga maxCol={2} className={'vol-task-container'}>
            {tasks.map((t: any) => (
              <RequestCard request={t} />
            ))}
          </Yoga>
        </div>
      </RichPage>
    )
  )
}

export default VolunteerTask
